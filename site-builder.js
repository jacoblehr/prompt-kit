// @ts-check

function openBuilder() {
  document.querySelector(".shell").classList.add("builder-open");
  document.getElementById("builder-toggle").setAttribute("aria-expanded", "true");
}

function closeBuilder() {
  document.querySelector(".shell").classList.remove("builder-open");
  document.getElementById("builder-toggle").setAttribute("aria-expanded", "false");
}

/**
 * Keep browse-pane add buttons in sync with the live builder so cards can show
 * whether they are already represented in the composition. Multi-target blocks
 * remain clickable because the action can move them between valid sections.
 */
function syncAddButtons() {
  document.querySelectorAll(".add-btn[data-key]").forEach((btn) => {
    const isAdded = builderState.items.some((item) => builderItemKey(item) === btn.dataset.key);
    const addChooser = btn.closest(".card")?.querySelector(".card-add-chooser");
    const hasMultipleTargets = !!(addChooser && addChooser.children.length > 1);
    btn.dataset.added = isAdded ? "true" : "false";
    btn.textContent = isAdded ? (hasMultipleTargets ? "Move" : "Added") : "+ Add";
    btn.setAttribute("aria-pressed", String(isAdded));
    btn.disabled = isAdded && !hasMultipleTargets;
  });

  document.querySelectorAll(".add-btn[data-stack-steps]").forEach((btn) => {
    if (btn.dataset.stackFlashing === "1") return;
    const stepKeys = (btn.dataset.stackSteps || "").split(",").filter(Boolean);
    const total = stepKeys.length;
    if (total === 0) return;
    const addedCount = stepKeys.filter((key) => builderState.items.some((item) => builderItemKey(item) === key)).length;
    if (addedCount >= total) {
      btn.dataset.stackLoaded = "full";
    } else if (addedCount > 0) {
      btn.dataset.stackLoaded = "partial";
    } else {
      btn.dataset.stackLoaded = "none";
    }
  });
}

const BUILDER_WIDTH_STORAGE_KEY = "prompt-kit-builder-width";
let draggedBuilderKey = "";
let draggedLibraryRef = "";
let builderToastTimer = 0;
let builderLastRemoved = null;
let isResizingBuilder = false;
let resizeStartX = 0;
let resizeStartWidth = 0;

/**
 * Builder warnings model the minimum viable prompt stack. Some are blocking and
 * prevent execution, while others stay advisory so the user can iterate quickly.
 */
function getBuilderWarnings() {
  return {
    blocking: builderState.getSectionItems("instruction").length === 0
      ? ["Add an Instruction block to define the task."]
      : []
  };
}

function estimateTokens(text = "") {
  const words = String(text || "").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(0, Math.ceil(words * 1.35));
}

function getPickerCandidates(sectionKey, query = "") {
  const section = getBuilderSection(sectionKey);
  const q = query.trim().toLowerCase();
  return blocks
    .filter((item) => section.validBlockTypes.includes(item.blockType))
    .filter((item) => {
      if (!q) return true;
      const searchText = [
        item.title,
        item.summary,
        item.group,
        item.family,
        item.sourceKind,
        ...(item.tags || [])
      ].join(" ").toLowerCase();
      return searchText.includes(q);
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}

function isTaskLikePlaceholder(placeholder = "", totalInputs = 1) {
  if (totalInputs === 1) return true;
  const value = String(placeholder || "").toLowerCase();
  if (!value) return false;
  if (/(constraints|non-goals|audience|goal|owner|timescale|deadline|framework|language|background|who asked|why|context \(.*\)|what it does)/.test(value)) {
    return false;
  }
  return /(request|situation|task|question|problem|topic|prompt|artifact|draft|plan|decision context|text|argument|thesis|position|input|raw request|problem statement|challenge|code_or_design|system_description|codebase_description)/.test(value);
}

function getBuilderInputDefinitions() {
  const map = new Map();

  builderState.items.forEach((item) => {
    const placeholders = extractPlaceholders(item.copy || "");
    placeholders.forEach((placeholder) => {
      if (!map.has(placeholder)) {
        map.set(placeholder, {
          placeholder,
          label: normalizeBuilderInputLabel(placeholder),
          help: item.contract?.expects || item.summary || item.useWhen || "",
          sources: []
        });
      }
      map.get(placeholder).sources.push(humanizeBlockTitle(item.title));
    });
  });

  const definitions = [...map.values()];
  definitions.forEach((definition) => {
    definition.usesTaskInput = isTaskLikePlaceholder(definition.placeholder, definitions.length);
    definition.manualValue = builderState.promptInputs?.[definition.placeholder] || "";
    definition.effectiveValue = definition.manualValue.trim() || (definition.usesTaskInput ? (builderState.taskInput || "").trim() : "");
  });

  return definitions.sort((a, b) => {
    if (a.usesTaskInput !== b.usesTaskInput) return a.usesTaskInput ? -1 : 1;
    return a.label.localeCompare(b.label);
  });
}

function getEffectiveBuilderPromptInputs() {
  return Object.fromEntries(
    getBuilderInputDefinitions()
      .filter((definition) => definition.effectiveValue)
      .map((definition) => [definition.placeholder, definition.effectiveValue])
  );
}

function renderBuilderAlerts(warnings) {
  const alerts = document.getElementById("builder-alerts");
  if (!alerts) return;
  alerts.hidden = warnings.blocking.length === 0;
  alerts.innerHTML = warnings.blocking
    .map((text) => `<div class="builder-alert builder-alert--blocking">${escHtml(text)}</div>`)
    .join("");
}

function renderBuilderInputs() {
  const mount = document.getElementById("builder-inputs");
  if (!mount) return;

  const definitions = getBuilderInputDefinitions();
  if (definitions.length === 0) {
    mount.hidden = true;
    mount.innerHTML = "";
    return;
  }

  mount.hidden = false;
  mount.innerHTML = definitions.map((definition) => `
    <label class="builder-input-field">
      <span class="builder-input-label-row">
        <span class="builder-input-label">${escHtml(definition.label)}</span>
        ${definition.usesTaskInput && !definition.manualValue && builderState.taskInput.trim()
          ? '<span class="builder-input-badge">From task</span>'
          : ''}
      </span>
      <textarea
        class="builder-input-textarea"
        data-action="builder-input"
        data-placeholder-key="${escHtml(definition.placeholder)}"
        spellcheck="false"
        rows="2"
        placeholder="${escHtml(definition.placeholder)}"
      >${escHtml(definition.manualValue)}</textarea>
    </label>
  `).join("");
}

function renderLivePrompt() {
  const prompt = builderState.assemble({ resolveInputs: true, inputValues: getEffectiveBuilderPromptInputs() });
  const output = document.getElementById("builder-run-output");
  const tokenCount = document.getElementById("builder-token-count");
  const copyButton = document.getElementById("builder-copy-prompt");

  if (output) {
    if (prompt) {
      output.textContent = prompt;
      output.classList.remove("is-placeholder");
    } else {
      output.textContent = "Add blocks to assemble your prompt.";
      output.classList.add("is-placeholder");
    }
  }
  if (tokenCount) {
    const tokens = estimateTokens(prompt || "");
    tokenCount.textContent = tokens > 0 ? `~${tokens.toLocaleString()} tokens` : "";
  }
  if (copyButton) copyButton.disabled = !prompt;
}

function renderHeaderControls() {
  const nameInput = document.getElementById("builder-stack-name");
  const clearBtn = document.getElementById("builder-clear");

  if (nameInput && nameInput.value !== builderState.stackName) {
    nameInput.value = builderState.stackName;
  }

  if (clearBtn) clearBtn.hidden = builderState.items.length === 0;
}

function renderSectionEmptyState(section) {
  const starters = (section.starterRefs || [])
    .map((ref) => resolveRef(ref))
    .filter(Boolean)
    .map((item) => `
      <button type="button" class="pb-starter-chip" data-action="pick-starter" data-section="${escHtml(section.key)}" data-ref="${escHtml(item.key || item.title)}">
        ${escHtml(humanizeBlockTitle(item.title))}
      </button>
    `)
    .join("");

  return `
    <div class="pb-section-empty">
      <div class="pb-section-empty-title">${escHtml(section.emptyLabel)}</div>
      <div class="pb-section-empty-copy">${escHtml(section.emptyPrompt || section.description)}</div>
      ${starters ? `<div class="pb-section-starters">${starters}</div>` : ""}
    </div>
  `;
}

function renderPicker(sectionKey, uiState) {
  const open = uiState.pickerSection === sectionKey;
  if (!open) return "";
  const candidates = getPickerCandidates(sectionKey, uiState.pickerQuery);
  const candidateMarkup = candidates.length > 0
    ? candidates.slice(0, 8).map((item) => {
        const key = item.key || item.title;
        const existingItem = getExistingBuilderItem(item);
        const isAdded = !!existingItem;
        const isInTargetSection = existingItem?.builderSection === sectionKey;
        const actionLabel = isAdded && !isInTargetSection ? "[Move]" : "[+]";
        return `
          <button type="button" class="pb-picker-item${isInTargetSection ? " is-disabled" : ""}" data-action="pick-block" data-section="${escHtml(sectionKey)}" data-ref="${escHtml(key)}"${isInTargetSection ? " disabled" : ""}>
            <span class="pb-picker-item-main">
              <span class="pb-picker-item-title">${escHtml(humanizeBlockTitle(item.title))}</span>
              <span class="pb-picker-item-copy">${escHtml(item.summary || blockTypeLabel(item.blockType))}</span>
            </span>
            <span class="pb-picker-item-add">${actionLabel}</span>
          </button>
        `;
      }).join("") + (candidates.length > 8 ? `<div class="pb-picker-more">Showing 8 of ${candidates.length} — type to narrow</div>` : "")
    : '<div class="pb-picker-empty">No matching blocks in this section.</div>';

  return `
    <div class="pb-picker" data-picker-section="${escHtml(sectionKey)}">
      <div class="pb-picker-head">Add Block to ${escHtml(getBuilderSection(sectionKey).label)}</div>
      <input type="search" class="pb-picker-search" data-action="picker-search" data-section="${escHtml(sectionKey)}" value="${escHtml(uiState.pickerQuery || "")}" placeholder="Search…">
      <div class="pb-picker-list">${candidateMarkup}</div>
      <div class="pb-picker-footer">
        <button type="button" class="pb-picker-browse" data-action="browse-all" data-section="${escHtml(sectionKey)}">Browse All &#8594;</button>
        <button type="button" class="pb-picker-close" data-action="close-picker">Close</button>
      </div>
    </div>
  `;
}

function renderBlockCard(item, index, uiState) {
  const key = builderItemKey(item);
  const expanded = (uiState.expandedBlocks || []).includes(key);
  const useWhen = item.contract?.useWhen || item.useWhen || item.summary || "";
  const adds = item.contract?.adds || item.contract?.purpose || "";
  const managed = item.managedBy ? `<span class="pb-block-managed">${escHtml(item.managedBy === "mode" ? "Mode" : "Lens")} link</span>` : "";

  return `
    <article class="pb-block${expanded ? " is-expanded" : ""}" data-key="${escHtml(key)}" draggable="true">
      <div class="pb-block-compact">
        <button type="button" class="pb-block-drag" aria-label="Drag ${escHtml(item.title)}">⠿</button>
        <button type="button" class="pb-block-summary" data-action="toggle-block" data-key="${escHtml(key)}" aria-expanded="${expanded ? "true" : "false"}">
          <span class="pb-block-title">${escHtml(humanizeBlockTitle(item.title))}</span>
          <span class="pb-block-meta">${escHtml(blockTypeLabel(item.blockType))}</span>
          ${managed}
        </button>
        <button type="button" class="pb-block-remove" data-action="remove-block" data-key="${escHtml(key)}" aria-label="Remove ${escHtml(item.title)}">&times;</button>
      </div>
      ${expanded ? `
        <div class="pb-block-expanded">
          <div class="pb-block-expanded-title">${escHtml(humanizeBlockTitle(item.title))}</div>
          <textarea class="pb-block-textarea" data-action="edit-copy" data-key="${escHtml(key)}" spellcheck="false">${escHtml(item.copy || "")}</textarea>
          ${useWhen ? `<div class="pb-block-note"><span>Use when:</span> ${escHtml(useWhen)}</div>` : ""}
          ${adds ? `<div class="pb-block-note"><span>Adds:</span> ${escHtml(adds)}</div>` : ""}
        </div>
      ` : ""}
    </article>
  `;
}

function renderSection(sectionKey, uiState) {
  const section = getBuilderSection(sectionKey);
  const items = builderState.getSectionItems(sectionKey);
  const collapsed = !!uiState.collapsed?.[sectionKey];
  const summary = summarizeBuilderSection(builderState.items, sectionKey);
  const stateLabel = items.length === 0 ? (section.required ? "Required" : "Optional") : "";
  const stateMarkup = stateLabel ? `<span class="pb-section-state${section.required ? " is-required" : ""}">${stateLabel}</span>` : "";
  return `
    <section class="pb-section${collapsed ? " is-collapsed" : ""}" data-section="${escHtml(sectionKey)}">
      <div class="pb-section-head">
        <button type="button" class="pb-section-toggle" data-action="toggle-section" data-section="${escHtml(sectionKey)}" aria-expanded="${collapsed ? "false" : "true"}">
          <span class="pb-section-toggle-main">
            <span class="pb-section-title-row">
              <span class="pb-section-title">${escHtml(section.label)}</span>
              ${stateMarkup}
            </span>
            <span class="pb-section-count">${items.length > 0 ? items.length : ""}</span>
          </span>
          <span class="pb-section-chevron" aria-hidden="true">${collapsed ? "▸" : "▾"}</span>
        </button>
        ${collapsed && items.length > 0 ? `<div class="pb-section-copy">${escHtml(summary)}</div>` : ""}
      </div>
      ${collapsed ? "" : `
        <div class="pb-section-body">
          <div class="pb-section-dropzone" data-section-drop="${escHtml(sectionKey)}">
            ${items.length > 0
              ? items.map((item, index) => renderBlockCard(item, index, uiState)).join("")
              : renderSectionEmptyState(section)
            }
          </div>
          <div class="pb-section-actions">
            <button type="button" class="pb-add-block" data-action="open-picker" data-section="${escHtml(sectionKey)}">+ Add block</button>
          </div>
          ${renderPicker(sectionKey, uiState)}
        </div>
      `}
    </section>
  `;
}

function renderComposition() {
  const mount = document.getElementById("builder-composition");
  if (!mount) return;
  const uiState = builderState.activeVersion.workingState.ui;
  mount.innerHTML = BUILDER_SECTION_ORDER.map((sectionKey) => renderSection(sectionKey, uiState)).join("");

  const activePicker = mount.querySelector(".pb-picker-search");
  if (activePicker) activePicker.focus();
}

function renderBuilder() {
  const warnings = getBuilderWarnings();
  const badge = document.getElementById("builder-badge");
  renderHeaderControls();
  renderBuilderAlerts(warnings);
  renderBuilderInputs();
  renderComposition();
  renderLivePrompt();

  if (badge) {
    badge.textContent = String(builderState.items.length);
    badge.hidden = builderState.items.length === 0;
  }

  const runtime = builderState.activeVersion.workingState.runtime;
  const runInput = document.getElementById("builder-run-input");
  if (runInput && runInput.value !== runtime.lastInput) {
    runInput.value = runtime.lastInput || "";
  }
}

function showBuilderToast(message, actionLabel = "", onAction = null) {
  const toast = document.getElementById("builder-toast");
  if (!toast) return;
  window.clearTimeout(builderToastTimer);
  toast.hidden = false;
  toast.innerHTML = `
    <span>${escHtml(message)}</span>
    ${actionLabel ? `<button type="button" class="builder-toast-action">${escHtml(actionLabel)}</button>` : ""}
  `;
  const actionButton = toast.querySelector(".builder-toast-action");
  if (actionButton && onAction) {
    actionButton.addEventListener("click", () => {
      onAction();
      toast.hidden = true;
    }, { once: true });
  }
  builderToastTimer = window.setTimeout(() => {
    toast.hidden = true;
  }, 4200);
}

function openPicker(sectionKey) {
  builderState.setPickerState(sectionKey, "");
  renderBuilder();
}

function openPickerFromShortcut() {
  const uiState = builderState.activeVersion.workingState.ui;
  const preferred = uiState.lastActiveSection || BUILDER_SECTION_ORDER.find((sectionKey) => builderState.getSectionItems(sectionKey).length === 0) || "instruction";
  openPicker(preferred);
}

function browseAll(sectionKey) {
  const searchInput = document.getElementById("search");
  filterState.itemTypes = ["block"];
  filterState.blockRoles = [sectionKey];
  filterState.families = [];
  filterState.stages = [];
  filterState.tags = [];
  if (searchInput) searchInput.value = "";
  filterState.text = "";
  applyFilters();
  builderState.setPickerState("", "");
  renderBuilder();
  document.getElementById("blocks")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

document.getElementById("builder-toggle").addEventListener("click", (event) => {
  event.preventDefault();
  if (document.querySelector(".shell").classList.contains("builder-open")) {
    closeBuilder();
  } else {
    openBuilder();
  }
});

document.getElementById("builder-close").addEventListener("click", () => {
  closeBuilder();
});

document.getElementById("builder-clear").addEventListener("click", () => {
  if (builderState.items.length === 0) return;
  if (!window.confirm("Clear all blocks from the builder?")) return;
  builderState.clear();
  renderBuilder();
  syncAddButtons();
  showBuilderToast("Builder cleared");
});

document.getElementById("builder-stack-name").addEventListener("input", (event) => {
  builderState.setStackName(event.target.value);
});

document.getElementById("builder-run-input").addEventListener("input", (event) => {
  builderState.setTaskInput(event.target.value);
  renderBuilderInputs();
  renderLivePrompt();
});

document.getElementById("builder-copy-prompt").addEventListener("click", async () => {
  const definitions = getBuilderInputDefinitions();
  const prompt = builderState.assemble({ resolveInputs: true, inputValues: getEffectiveBuilderPromptInputs() });
  if (!prompt) return;
  try {
    await navigator.clipboard.writeText(prompt);
    showBuilderToast(definitions.length > 0 ? "Filled prompt copied" : "Prompt copied");
  } catch {
    showBuilderToast("Copy failed");
  }
});

document.getElementById("builder-inputs").addEventListener("input", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLTextAreaElement)) return;
  if (target.dataset.action !== "builder-input") return;
  builderState.setPromptInput(target.dataset.placeholderKey || "", target.value || "");
  renderLivePrompt();
});

document.getElementById("builder-composition").addEventListener("click", (event) => {
  const actionEl = event.target.closest("[data-action]");
  if (!actionEl) return;
  const action = actionEl.dataset.action;
  const key = actionEl.dataset.key || "";
  const sectionKey = actionEl.dataset.section || "";

  if (action === "toggle-section") {
    builderState.toggleSection(sectionKey);
    renderBuilder();
    return;
  }

  if (action === "open-picker") {
    openPicker(sectionKey);
    return;
  }

  if (action === "close-picker") {
    builderState.setPickerState("", "");
    renderBuilder();
    return;
  }

  if (action === "pick-block") {
    const ref = actionEl.dataset.ref || "";
    const item = resolveRef(ref);
    if (!item) return;
    const existingItem = getExistingBuilderItem(item);
    if (existingItem) {
      builderState.moveToSection(builderItemKey(existingItem), sectionKey);
    } else {
      builderState.add(item, { section: sectionKey });
    }
    builderState.setPickerState("", "");
    renderBuilder();
    syncAddButtons();
    return;
  }

  if (action === "pick-starter") {
    const ref = actionEl.dataset.ref || "";
    const item = resolveRef(ref);
    if (!item) return;
    const existingItem = getExistingBuilderItem(item);
    if (existingItem) {
      builderState.moveToSection(builderItemKey(existingItem), sectionKey);
    } else {
      builderState.add(item, { section: sectionKey });
    }
    renderBuilder();
    syncAddButtons();
    return;
  }

  if (action === "browse-all") {
    browseAll(sectionKey);
    return;
  }

  if (action === "toggle-block") {
    const expanded = !(builderState.activeVersion.workingState.ui.expandedBlocks || []).includes(key);
    builderState.setBlockExpanded(key, expanded);
    renderBuilder();
    return;
  }

  if (action === "remove-block") {
    builderLastRemoved = builderState.remove(key);
    renderBuilder();
    syncAddButtons();
    showBuilderToast("Block removed", "Undo", () => {
      if (!builderLastRemoved) return;
      builderState.restoreRemoved(builderLastRemoved);
      builderLastRemoved = null;
      renderBuilder();
      syncAddButtons();
    });
  }
});

document.getElementById("builder-composition").addEventListener("input", (event) => {
  const target = event.target;
  if (target.matches(".pb-picker-search")) {
    builderState.setPickerState(target.dataset.section || "", target.value || "");
    renderBuilder();
    return;
  }

  if (target.matches(".pb-block-textarea")) {
    builderState.updateBlockCopy(target.dataset.key || "", target.value || "");
    renderLivePrompt();
  }
});

document.addEventListener("dragstart", (event) => {
  const builderBlock = event.target.closest(".pb-block");
  if (builderBlock) {
    draggedBuilderKey = builderBlock.dataset.key || "";
    draggedLibraryRef = "";
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", draggedBuilderKey);
    requestAnimationFrame(() => builderBlock.classList.add("is-dragging"));
    return;
  }

  const libraryCard = event.target.closest(".card[data-builder-ref]");
  if (libraryCard) {
    draggedLibraryRef = libraryCard.dataset.builderRef || "";
    draggedBuilderKey = "";
    event.dataTransfer.effectAllowed = "copy";
    event.dataTransfer.setData("text/plain", draggedLibraryRef);
  }
});

document.addEventListener("dragend", () => {
  document.querySelectorAll(".pb-block.is-dragging").forEach((element) => element.classList.remove("is-dragging"));
  document.querySelectorAll(".pb-section.is-drop-target").forEach((element) => element.classList.remove("is-drop-target"));
  draggedBuilderKey = "";
  draggedLibraryRef = "";
});

document.getElementById("builder-composition").addEventListener("dragover", (event) => {
  const sectionEl = event.target.closest(".pb-section");
  if (!sectionEl) return;
  const sectionKey = sectionEl.dataset.section || "";
  let blockType = "";

  if (draggedBuilderKey) {
    const moving = builderState.items.find((item) => builderItemKey(item) === draggedBuilderKey);
    blockType = moving?.blockType || "";
  } else if (draggedLibraryRef) {
    blockType = resolveRef(draggedLibraryRef)?.blockType || "";
  }

  if (!isValidBuilderSection(sectionKey, blockType)) return;
  event.preventDefault();
  event.dataTransfer.dropEffect = draggedBuilderKey ? "move" : "copy";
  document.querySelectorAll(".pb-section.is-drop-target").forEach((element) => element.classList.remove("is-drop-target"));
  sectionEl.classList.add("is-drop-target");
});

document.getElementById("builder-composition").addEventListener("dragleave", (event) => {
  const sectionEl = event.target.closest(".pb-section");
  const related = event.relatedTarget instanceof Element ? event.relatedTarget : null;
  if (sectionEl && !(related && sectionEl.contains(related))) {
    sectionEl.classList.remove("is-drop-target");
  }
});

document.getElementById("builder-composition").addEventListener("drop", (event) => {
  const sectionEl = event.target.closest(".pb-section");
  if (!sectionEl) return;
  const sectionKey = sectionEl.dataset.section || "";
  const sectionItems = builderState.getSectionItems(sectionKey);
  const targetBlock = event.target.closest(".pb-block");
  const targetIndex = targetBlock
    ? sectionItems.findIndex((item) => builderItemKey(item) === targetBlock.dataset.key)
    : null;

  if (draggedBuilderKey) {
    const moving = builderState.items.find((item) => builderItemKey(item) === draggedBuilderKey);
    if (!moving || !isValidBuilderSection(sectionKey, moving.blockType)) return;
    event.preventDefault();
    builderState.moveToSection(draggedBuilderKey, sectionKey, targetIndex);
    renderBuilder();
    syncAddButtons();
    return;
  }

  if (draggedLibraryRef) {
    const item = resolveRef(draggedLibraryRef);
    if (!item || !isValidBuilderSection(sectionKey, item.blockType)) return;
    event.preventDefault();
    const existingItem = getExistingBuilderItem(item);
    if (existingItem) {
      builderState.moveToSection(builderItemKey(existingItem), sectionKey, targetIndex);
    } else {
      builderState.add(item, { section: sectionKey });
    }
    renderBuilder();
    syncAddButtons();
  }
});

document.addEventListener("keydown", (event) => {
  const builderOpen = document.querySelector(".shell").classList.contains("builder-open");
  if (!builderOpen) return;

  const active = document.activeElement;
  const inField = active && (active.tagName === "INPUT" || active.tagName === "TEXTAREA" || active.tagName === "SELECT");

  if (event.key === "/" && !inField) {
    event.preventDefault();
    openPickerFromShortcut();
  }
});

/**
 * Persisted resize keeps the builder feeling like a docked product surface
 * instead of a temporary modal. Width is clamped on every restore so the panel
 * stays usable across viewport changes.
 */
function applyStoredBuilderWidth() {
  const raw = window.localStorage.getItem(BUILDER_WIDTH_STORAGE_KEY);
  const width = Number(raw || 0);
  if (!Number.isFinite(width) || width <= 0) return;
  const minWidth = 420;
  const maxWidth = Math.max(minWidth, Math.min(Math.floor(window.innerWidth * 0.62), window.innerWidth - 380));
  const clampedWidth = Math.max(minWidth, Math.min(maxWidth, width));
  document.querySelector(".shell").style.setProperty("--builder-width", `${clampedWidth}px`);
}

const builderResizeHandle = document.querySelector(".builder-resize-handle");

if (builderResizeHandle) {
  builderResizeHandle.addEventListener("mousedown", (event) => {
    if (window.innerWidth <= 980) return;
    const panel = document.getElementById("builder-panel");
    if (!panel) return;
    isResizingBuilder = true;
    resizeStartX = event.clientX;
    resizeStartWidth = panel.offsetWidth;
    builderResizeHandle.classList.add("dragging");
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    event.preventDefault();
  });

  builderResizeHandle.addEventListener("dblclick", () => {
    document.querySelector(".shell").style.removeProperty("--builder-width");
    window.localStorage.removeItem(BUILDER_WIDTH_STORAGE_KEY);
  });
}

document.addEventListener("mousemove", (event) => {
  if (!isResizingBuilder) return;
  const dx = resizeStartX - event.clientX;
  const minWidth = 420;
  const maxWidth = Math.max(minWidth, Math.min(Math.floor(window.innerWidth * 0.62), window.innerWidth - 380));
  const nextWidth = Math.max(minWidth, Math.min(maxWidth, resizeStartWidth + dx));
  document.querySelector(".shell").style.setProperty("--builder-width", `${nextWidth}px`);
});

document.addEventListener("mouseup", () => {
  if (!isResizingBuilder) return;
  isResizingBuilder = false;
  builderResizeHandle?.classList.remove("dragging");
  document.body.style.cursor = "";
  document.body.style.userSelect = "";
  const panel = document.getElementById("builder-panel");
  if (!panel) return;
  window.localStorage.setItem(BUILDER_WIDTH_STORAGE_KEY, String(panel.offsetWidth));
});

applyStoredBuilderWidth();

window.addEventListener("resize", () => {
  if (window.innerWidth <= 980) return;
  applyStoredBuilderWidth();
});
