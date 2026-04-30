// @ts-check

function openBuilder() {
  document.querySelector(".shell").classList.add("builder-open");
  document.getElementById("builder-toggle").setAttribute("aria-expanded", "true");
  if (window.innerWidth <= 980) {
    document.body.style.overflow = "hidden";
  }
}

function closeBuilder() {
  document.querySelector(".shell").classList.remove("builder-open");
  document.getElementById("builder-toggle").setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
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
const BUILDER_EXECUTION_HEIGHT_STORAGE_KEY = "prompt-kit-builder-execution-height";
let draggedBuilderKey = "";
let draggedLibraryRef = "";
let builderToastTimer = 0;
let builderLastRemoved = null;
let isResizingBuilder = false;
let resizeStartX = 0;
let resizeStartWidth = 0;
let isResizingBuilderExecution = false;
let resizeExecutionStartY = 0;
let resizeExecutionStartHeight = 0;
let outputMode = "structured";
let cmdPaletteSectionHint = "";
let cmdPaletteSelected = 0;
let livePromptDebounceTimer = 0;

/**
 * Builder warnings model the minimum viable prompt stack. Some are blocking and
 * prevent execution, while others stay advisory so the user can iterate quickly.
 */
function getBuilderWarnings() {
  const instructionCount = builderState.getSectionItems("instruction").length;
  const reasoningItems = builderState.getSectionItems("reasoning");
  const harnessItems = builderState.getSectionItems("harness");
  const inputPlan = getBuilderInputPlan();
  const missingCustomInputs = inputPlan.slots.filter((slot) => slot.source === "custom" && !slot.customValue.trim());
  const modeCount = reasoningItems.filter((item) => item.blockType === "mode").length;
  const recurseCount = reasoningItems.filter((item) => item.blockType === "recurse").length;
  const hasBoundedRecursion = builderState.items.some((item) => item.key === "guardrail.bounded-recursion" || item.title === "guardrail.bounded-recursion");
  const hasSchema = harnessItems.some((item) => item.blockType === "schema");
  const hasQualityGate = harnessItems.some((item) => item.blockType === "guardrail" || item.blockType === "rubric");
  const advisory = [];

  if (builderState.items.length >= 3 && !hasSchema) {
    advisory.push("Add an output schema if the final response needs to be easy to use.");
  }
  if (builderState.items.length >= 3 && !hasQualityGate) {
    advisory.push("Add a targeted guardrail or rubric when stakes or ambiguity are high.");
  }
  if (modeCount > 1 && !loadedStackKey) {
    advisory.push("Multiple modes can conflict; keep one primary mode or make the handoff explicit.");
  }
  if (recurseCount > 0 && !hasBoundedRecursion) {
    advisory.push("Recursive blocks work best with bounded-recursion so the one-shot prompt has a stopping rule.");
  }
  if (missingCustomInputs.length > 0) {
    advisory.push("A custom step input is selected but empty.");
  }

  return {
    blocking: instructionCount === 0
      ? ["Add an Instruction block to define the task."]
      : [],
    advisory
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
  const value = String(placeholder || "").toLowerCase();
  if (!value) return false;
  if (/(constraints|non-goals|audience|goal|owner|timescale|deadline|framework|language|background|who asked|why|context \(.*\)|what it does|depth|iterations|stop_condition|stop condition|purpose|impact|duration|original[_\s-]*prompt|revised[_\s-]*prompt)/.test(value)) {
    return false;
  }
  if (totalInputs === 1) return true;
  return /(request|situation|task|question|problem|topic|prompt|artifact|draft|plan|decision context|text|argument|thesis|position|input|raw request|problem statement|challenge|code_or_design|system_description|codebase_description)/.test(value);
}

const BUILDER_INPUT_SOURCES = ["previous", "original", "custom"];

function getOrderedBuilderPromptItems() {
  return BUILDER_SECTION_ORDER.flatMap((sectionKey) => builderState.getSectionItems(sectionKey));
}

function builderInputSlotKey(itemKey, placeholder) {
  return `${itemKey}::${placeholder}`;
}

function normalizeBuilderInputBinding(binding, defaultSource = "original") {
  if (binding && typeof binding === "object" && !Array.isArray(binding)) {
    const source = BUILDER_INPUT_SOURCES.includes(binding.source) ? binding.source : defaultSource;
    return {
      source,
      customValue: typeof binding.customValue === "string" ? binding.customValue : ""
    };
  }

  if (typeof binding === "string" && binding.trim()) {
    return {
      source: "custom",
      customValue: binding
    };
  }

  return {
    source: defaultSource,
    customValue: ""
  };
}

function getBuilderInputPlan() {
  const orderedItems = getOrderedBuilderPromptItems();
  const allPlaceholders = [...new Set(orderedItems.flatMap((item) => extractPlaceholders(item.copy || "")))];
  const slots = [];
  let taskLikeCount = 0;

  orderedItems.forEach((item, itemIndex) => {
    const itemKey = builderItemKey(item);
    const previousItem = orderedItems
      .slice(0, itemIndex)
      .reverse()
      .find((entry) => entry.copy && entry.copy.trim()) || null;
    extractPlaceholders(item.copy || "").forEach((placeholder) => {
      if (!isTaskLikePlaceholder(placeholder, allPlaceholders.length)) return;
      const isFirstTaskInput = taskLikeCount === 0;
      const defaultSource = isFirstTaskInput ? "original" : "previous";
      const binding = normalizeBuilderInputBinding(item.inputs?.[placeholder], defaultSource);
      const source = isFirstTaskInput && binding.source === "previous" ? "original" : binding.source;
      slots.push({
        key: builderInputSlotKey(itemKey, placeholder),
        itemKey,
        item,
        previousItem,
        placeholder,
        label: normalizeBuilderInputLabel(placeholder),
        blockLabel: humanizeBlockTitle(item.title),
        previousLabel: previousItem ? humanizeBlockTitle(previousItem.title) : "previous step",
        isFirstTaskInput,
        defaultSource,
        source,
        customValue: binding.customValue
      });
      taskLikeCount += 1;
    });
  });

  return {
    slots,
    slotMap: new Map(slots.map((slot) => [slot.key, slot]))
  };
}

function buildPreviousStepSnippet(slot) {
  const previous = slot.previousLabel || "previous step";
  return `Use the output from the previous step (${previous}). If that output has multiple sections, use only the sections relevant to this step.`;
}

function getChainedBuilderInputSlots(inputPlan) {
  return (inputPlan?.slots || []).filter((slot) => slot.source === "previous" && !slot.isFirstTaskInput);
}

function getBuilderInputDefinitions() {
  const map = new Map();
  const chainPlaceholders = new Set(getBuilderInputPlan().slots.map((slot) => slot.placeholder));

  builderState.items.forEach((item) => {
    const placeholders = extractPlaceholders(item.copy || "");
    placeholders.forEach((placeholder) => {
      if (chainPlaceholders.has(placeholder)) return;
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
    definition.manualValue = builderState.promptInputs?.[definition.placeholder] || "";
    definition.effectiveValue = definition.manualValue.trim();
  });

  return definitions;
}

function getEffectiveBuilderVariableInputs() {
  return Object.fromEntries(
    getBuilderInputDefinitions()
      .filter((definition) => definition.effectiveValue)
      .map((definition) => [definition.placeholder, definition.effectiveValue])
  );
}

function resolveBuilderInputSlotValue(slot) {
  if (!slot) return "";
  if (slot.source === "previous") return buildPreviousStepSnippet(slot);
  if (slot.source === "custom") return (slot.customValue || "").trim();
  return (builderState.taskInput || "").trim();
}

function fillBuilderItemPromptTemplate(item, inputPlan, variableValues = {}) {
  const itemKey = builderItemKey(item);
  let next = String(item.copy || "");
  extractPlaceholders(next).forEach((placeholder) => {
    const slot = inputPlan.slotMap.get(builderInputSlotKey(itemKey, placeholder));
    const value = slot ? resolveBuilderInputSlotValue(slot) : variableValues?.[placeholder];
    if (typeof value !== "string" || !value.trim()) return;
    next = next.split(placeholder).join(value.trim());
  });
  return next;
}

function assembleBuilderPrompt(options = {}) {
  const structured = options.structured !== false;
  const inputPlan = options.inputPlan || getBuilderInputPlan();
  const variableValues = getEffectiveBuilderVariableInputs();

  if (!structured) {
    return getOrderedBuilderPromptItems()
      .filter((item) => item.copy && item.copy.trim())
      .map((item) => fillBuilderItemPromptTemplate(item, inputPlan, variableValues).trim())
      .join("\n\n");
  }

  const parts = BUILDER_SECTION_ORDER
    .map((sectionKey) => {
      const section = getBuilderSection(sectionKey);
      const items = builderState.getSectionItems(sectionKey).filter((item) => item.copy && item.copy.trim());
      if (items.length === 0) return "";
      return `## ${section.label}\n\n${items.map((item) => `### ${humanizeBlockTitle(item.title)}\n${fillBuilderItemPromptTemplate(item, inputPlan, variableValues).trim()}`).join("\n\n")}`;
    })
    .filter(Boolean);

  return parts.join("\n\n---\n\n");
}

function renderBuilderAlerts(warnings) {
  const alerts = document.getElementById("builder-alerts");
  if (!alerts) return;
  const blocking = warnings.blocking || [];
  const advisory = warnings.advisory || [];
  alerts.hidden = blocking.length === 0 && advisory.length === 0;
  alerts.innerHTML = [
    ...blocking.map((text) => `<div class="builder-alert builder-alert--blocking">${escHtml(text)}</div>`),
    ...advisory.map((text) => `<div class="builder-alert builder-alert--advisory">${escHtml(text)}</div>`)
  ].join("");
}

function renderBuilderInputs() {
  const mount = document.getElementById("builder-inputs");
  if (!mount) return;
  const pane = mount.closest(".builder-pane--inputs");

  // The pane is visible whenever the builder has items — the task input is
  // always useful regardless of whether blocks have {placeholder} variables.
  const hasItems = builderState.items.length > 0;
  if (pane) pane.hidden = !hasItems;

  const paneLabel = pane?.querySelector(".builder-pane-label");
  if (paneLabel) {
    paneLabel.textContent = "Inputs";
  }

  const paneCopy = pane?.querySelector(".builder-pane-copy");
  if (paneCopy) {
    paneCopy.textContent = "Fill the task above. Step inputs are wired forward by default.";
  }

  const taskLabel = pane?.querySelector(".builder-run-label");
  if (taskLabel) {
    taskLabel.textContent = "Task";
  }

  const inputPlan = getBuilderInputPlan();
  const definitions = getBuilderInputDefinitions();
  const taskFilled = !!builderState.taskInput.trim();
  const stepSlots = inputPlan.slots;
  const visibleDefinitions = definitions;

  const resolvedFromTask = taskFilled
    ? inputPlan.slots.filter((slot) => slot.source === "original")
    : [];
  const resolvedFromPrevious = getChainedBuilderInputSlots(inputPlan);

  const resolvedHtml = resolvedFromTask.length > 0
    ? `<div class="builder-inputs-resolved">
        <span class="builder-inputs-resolved-label">From task</span>
        ${resolvedFromTask.map((slot) => `<span class="builder-inputs-resolved-chip">${escHtml(slot.blockLabel)}</span>`).join("")}
      </div>`
    : "";

  const chainedHtml = stepSlots.length > 0
    ? `<div class="builder-inputs-divider">Step inputs</div>` +
      `<div class="builder-inputs-list builder-inputs-list--compact">` +
      stepSlots.map((slot) => {
        const customOpen = slot.source === "custom";
        const sourceHelp = slot.source === "previous"
          ? `From ${slot.previousLabel}`
          : slot.source === "original"
            ? "From Task"
            : "Custom value";
        return `
          <div class="builder-input-field">
            <span class="builder-input-label-row">
              <span class="builder-input-label">${escHtml(slot.blockLabel)} ${escHtml(slot.label)}</span>
              <select
                class="builder-input-select"
                data-action="builder-input-source"
                data-item-key="${escHtml(slot.itemKey)}"
                data-placeholder-key="${escHtml(slot.placeholder)}"
                aria-label="${escHtml(slot.blockLabel)} ${escHtml(slot.label)} source"
              >
                <option value="original"${slot.source === "original" ? " selected" : ""}>Original input</option>
                ${slot.isFirstTaskInput ? "" : `<option value="previous"${slot.source === "previous" ? " selected" : ""}>Previous output</option>`}
                <option value="custom"${slot.source === "custom" ? " selected" : ""}>Custom</option>
              </select>
            </span>
            <span class="builder-input-help">${escHtml(sourceHelp)}</span>
            ${customOpen ? `
              <textarea
                class="builder-input-textarea"
                data-action="builder-input-custom"
                data-max-height="220"
                data-item-key="${escHtml(slot.itemKey)}"
                data-placeholder-key="${escHtml(slot.placeholder)}"
                spellcheck="false"
                rows="2"
                placeholder="${escHtml(slot.placeholder)}"
              >${escHtml(slot.customValue)}</textarea>
            ` : ""}
          </div>
        `;
      }).join("") + `</div>`
    : "";

  const previousHtml = resolvedFromPrevious.length > 0
    ? `<div class="builder-inputs-resolved">
        <span class="builder-inputs-resolved-label">Previous output</span>
        ${resolvedFromPrevious.map((slot) => `<span class="builder-inputs-resolved-chip">${escHtml(slot.blockLabel)}</span>`).join("")}
      </div>`
    : "";

  const variablesHtml = visibleDefinitions.length > 0
    ? `<div class="builder-inputs-divider">Variables</div>` +
      `<div class="builder-inputs-list">` +
      visibleDefinitions.map((definition) => {
        const helpText = definition.help
          ? definition.help.length > 160 ? definition.help.slice(0, 160) + "\u2026" : definition.help
          : "";
        return `
          <label class="builder-input-field">
            <span class="builder-input-label-row">
              <span class="builder-input-label">${escHtml(definition.label)}</span>
            </span>
            <textarea
              class="builder-input-textarea"
              data-action="builder-input"
              data-max-height="220"
              data-placeholder-key="${escHtml(definition.placeholder)}"
              spellcheck="false"
              rows="2"
              placeholder="${escHtml(definition.placeholder)}"
            >${escHtml(definition.manualValue)}</textarea>
            ${helpText ? `<span class="builder-input-help">${escHtml(helpText)}</span>` : ""}
          </label>
        `;
      }).join("") + `</div>`
    : "";

  if (!resolvedHtml && !previousHtml && !chainedHtml && !variablesHtml) {
    mount.hidden = true;
    mount.innerHTML = "";
    return;
  }

  mount.hidden = false;
  mount.innerHTML = resolvedHtml + previousHtml + chainedHtml + variablesHtml;
}

function renderPromptPreview(prompt) {
  return escHtml(prompt).replace(/\{[^}\n]{1,80}\}/g, (match) => `<span class="var-token">${match}</span>`);
}

function getLoadedStackItem() {
  if (!loadedStackKey) return null;
  return stacks.find((stack) => stack.key === loadedStackKey) || null;
}

function asSentenceList(items = []) {
  return items.filter(Boolean).map((item) => `- ${item}`).join("\n");
}

function labelize(text = "") {
  return String(text || "")
    .split(/[-\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function buildBuilderCompositionBrief(stack, inputPlan, orderedItems = []) {
  const promptItems = orderedItems.filter((item) => item.copy && item.copy.trim());
  const handoffSlots = getChainedBuilderInputSlots(inputPlan);
  const shouldRender = !!stack || promptItems.length > 1 || handoffSlots.length > 0;
  if (!shouldRender) return "";

  const lines = [
    "# One-shot prompt",
    "",
    "Use the blocks below as ordered phases inside a single response. Do not treat them as separate turns or wait for permission between phases.",
    "Use intermediate phases to improve the answer, but return the expected final artifact unless the user explicitly asks to see the phase work."
  ];

  if (promptItems.length > 1) {
    lines.push("", "Phase order:", promptItems.map((item, index) => `${index + 1}. ${humanizeBlockTitle(item.title)}`).join("\n"));
  }

  if (handoffSlots.length > 0) {
    lines.push("", "Input handoffs:");
    handoffSlots.forEach((slot) => {
      lines.push(`- ${slot.blockLabel} ${slot.label}: use the output from ${slot.previousLabel}.`);
    });
  }

  if (stack) {
    lines.push("", "## Stack brief", "", `Stack: ${stack.job || stack.title}`, `Goal: ${stack.summary || stack.useWhen || "Complete the requested task."}`);

    if (stack.composition?.phaseOrder) {
      lines.push(`Composition: ${stack.composition.phaseOrder}`);
    }
    if (stack.composition?.needsModeHandoff) {
      lines.push("Mode handoff: apply the modes sequentially as phases; do not blend them into one simultaneous stance.");
    }
    if (stack.composition?.needsRecursionBoundary) {
      lines.push("Recursion boundary: keep recursive reasoning bounded and stop when the requested output is directly actionable.");
    }
    if (stack.io?.usefulInputs?.length) {
      lines.push("", "Useful inputs:", asSentenceList(stack.io.usefulInputs));
    }
    if (stack.io?.expectedOutputs?.length) {
      lines.push("", "Expected output:", asSentenceList(stack.io.expectedOutputs));
    }
    if (stack.contract?.blockOrderRationale) {
      lines.push("", "Why this order works:", stack.contract.blockOrderRationale);
    }
  }
  return lines.join("\n");
}

function getActiveBuilderPrompt() {
  const inputPlan = getBuilderInputPlan();
  const orderedItems = getOrderedBuilderPromptItems();
  const stackBrief = buildBuilderCompositionBrief(getLoadedStackItem(), inputPlan, orderedItems);
  const prompt = assembleBuilderPrompt({ structured: outputMode !== "flat", inputPlan });

  return [stackBrief, prompt].filter(Boolean).join("\n\n---\n\n");
}

function renderLivePrompt() {
  const prompt = getActiveBuilderPrompt();

  const output = document.getElementById("builder-run-output");
  const tokenCount = document.getElementById("builder-token-count");
  const copyButton = document.getElementById("builder-copy-prompt");
  const outputModeBtn = document.getElementById("builder-output-mode");

  if (outputModeBtn) {
    outputModeBtn.hidden = false;
  }

  if (output) {
    if (prompt) {
      output.innerHTML = renderPromptPreview(prompt);
      output.classList.remove("is-placeholder");
    } else {
      output.textContent = "Add blocks to assemble your one-shot prompt.";
      output.classList.add("is-placeholder");
    }
  }
  if (tokenCount) {
    const tokens = estimateTokens(prompt || "");
    tokenCount.textContent = tokens > 0 ? `~${tokens.toLocaleString()} tokens` : "";
  }
  if (copyButton) copyButton.disabled = !prompt;
  renderPromptAnalysis(analyzePrompt(prompt || ""));
}

// ─── Prompt linter + pattern detection ───────────────────────────────────────
//
// Purely assistive — no scoring, no enforcement, no rewriting.
// The linter surfaces common issues; the pattern strip shows what is present.

const LINTER_VAGUE = /\b(improve|vague|enhance|optimize|better|good|things like|etc\.|something like|sort of|kind of|more effective|more useful)\b/gi;
const LINTER_OUTPUT = /\b(return|output|format|respond with|give me a list|in json|in markdown|as a table|as bullets?|as numbered|structure your)\b/i;
const LINTER_ROLE = /\b(act as|you are (?:a|an)|as (?:a|an) (?:senior|expert|experienced)|your role is|imagine you are|you're (?:a|an))\b/i;
const LINTER_TASK = /\b(analyze|summarize|write|create|identify|find|explain|evaluate|review|generate|compare|describe|list|draft|assess|outline)\b/i;
const LINTER_CONSTRAINT = /\b(don'?t|do not|never|always|must|limit to?|avoid(?!ance)|only (?!if)|without|no more than|keep it|restrict|exclude|at most)\b/i;
const LINTER_EXAMPLE = /\b(for example|e\.g\.|such as|example:|for instance|here is an example|sample:)\b/i;

function analyzePrompt(text) {
  if (!text || !text.trim()) return { hints: [], patterns: [] };

  const hints = [];
  const wordCount = text.trim().split(/\s+/).length;

  // Vague language — require 2+ hits to reduce noise on legitimate uses
  const vagueHits = text.match(LINTER_VAGUE) || [];
  if (vagueHits.length >= 2) {
    hints.push({ type: "vague", text: "Vague language detected — be specific about what you want." });
  }

  // Missing output format
  if (!LINTER_OUTPUT.test(text)) {
    hints.push({ type: "format", text: "No output format specified — say what you want returned." });
  }

  // Very long prompt
  if (wordCount > 700) {
    hints.push({ type: "length", text: `Long prompt (~${wordCount} words) — cut anything redundant.` });
  }

  // Repetition: 2-grams appearing 3+ times
  const tokens = text.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean);
  const grams = new Map();
  for (let i = 0; i < tokens.length - 1; i++) {
    const gram = `${tokens[i]} ${tokens[i + 1]}`;
    if (gram.length >= 7) grams.set(gram, (grams.get(gram) || 0) + 1);
  }
  if ([...grams.values()].some((c) => c >= 4)) {
    hints.push({ type: "repetition", text: "Repeated phrases found — check for redundancy." });
  }

  // Pattern annotations (non-enforcing — shows what is present, not what is missing)
  const patterns = [];
  if (LINTER_ROLE.test(text)) patterns.push("Role");
  if (LINTER_TASK.test(text)) patterns.push("Task");
  if (LINTER_CONSTRAINT.test(text)) patterns.push("Constraints");
  if (LINTER_OUTPUT.test(text)) patterns.push("Output format");
  if (LINTER_EXAMPLE.test(text)) patterns.push("Examples");

  return { hints: hints.slice(0, 3), patterns };
}

function renderPromptAnalysis(analysis) {
  const mount = document.getElementById("prompt-analysis");
  if (!mount) return;
  const { hints = [], patterns = [] } = analysis;
  if (hints.length === 0 && patterns.length === 0) {
    mount.hidden = true;
    return;
  }
  mount.hidden = false;
  const patternsHtml = patterns.length > 0
    ? `<div class="prompt-patterns"><span class="prompt-patterns-label">Detected</span>${patterns.map((p) => `<span class="prompt-pattern-pill">${escHtml(p)}</span>`).join("")}</div>`
    : "";
  const hintsHtml = hints.length > 0
    ? `<ul class="prompt-hints">${hints.map((h) => `<li class="prompt-hint prompt-hint--${escHtml(h.type)}">${escHtml(h.text)}</li>`).join("")}</ul>`
    : "";
  mount.innerHTML = patternsHtml + hintsHtml;
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
  const managed = item.managedBy ? ` · <span class="pb-block-managed">${escHtml(item.managedBy === "mode" ? "Mode" : "Lens")} link</span>` : "";
  const placeholders = extractPlaceholders(item.copy || "");
  const varChips = placeholders.length > 0
    ? `<div class="pb-block-vars">${placeholders.map((p) => `<span class="pb-block-var-chip">${escHtml(p)}</span>`).join("")}</div>`
    : "";

  return `
    <article class="pb-block${expanded ? " is-expanded" : ""}" data-key="${escHtml(key)}" data-block-type="${escHtml(item.blockType)}" draggable="true">
      <div class="pb-block-compact">
        <button type="button" class="pb-block-drag" aria-label="Drag ${escHtml(item.title)}">⠿</button>
        <div class="pb-block-main">
          <button type="button" class="pb-block-summary" data-action="toggle-block" data-key="${escHtml(key)}" aria-expanded="${expanded ? "true" : "false"}">
            <span class="pb-block-title">${escHtml(humanizeBlockTitle(item.title))}</span>
            <span class="pb-block-meta">${escHtml(blockTypeLabel(item.blockType))}${managed}</span>
          </button>
          ${varChips}
        </div>
        <button type="button" class="pb-block-remove" data-action="remove-block" data-key="${escHtml(key)}" aria-label="Remove ${escHtml(item.title)}">&times;</button>
      </div>
      ${expanded ? `
        <div class="pb-block-expanded">
          <div class="pb-block-expanded-title">${escHtml(humanizeBlockTitle(item.title))}</div>
          <textarea class="pb-block-textarea" data-action="edit-copy" data-key="${escHtml(key)}" data-max-height="380" spellcheck="false">${escHtml(item.copy || "")}</textarea>
          ${useWhen ? `<div class="pb-block-note"><span>Use when:</span> ${escHtml(useWhen)}</div>` : ""}
          ${adds ? `<div class="pb-block-note"><span>Adds:</span> ${escHtml(adds)}</div>` : ""}
        </div>
      ` : ""}
    </article>
  `;
}

function renderSection(sectionKey, uiState) {
  const section = getBuilderSection(sectionKey);
  const stepNumber = BUILDER_SECTION_ORDER.indexOf(sectionKey) + 1;
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
              <span class="pb-section-step" aria-hidden="true">${stepNumber}</span>
              <span class="pb-section-title">${escHtml(section.label)}</span>
              ${items.length > 0 ? `<span class="pb-section-count">${items.length}</span>` : ""}
              ${stateMarkup}
            </span>
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
            <button type="button" class="pb-add-block" data-action="open-cmd-palette" data-section="${escHtml(sectionKey)}">+ Add block</button>
          </div>
        </div>
      `}
    </section>
  `;
}

function renderLoadedStackGuide() {
  const stack = getLoadedStackItem();
  if (!stack) return "";
  const strengths = stack.composition?.strengths?.length
    ? stack.composition.strengths.map((item) => `<span>${escHtml(labelize(item))}</span>`).join("")
    : "";
  const handoff = stack.composition?.needsModeHandoff
    ? `<p>Modes are sequenced as phases in the generated prompt, so the model explores before it critiques or decides.</p>`
    : "";
  const expected = stack.io?.expectedOutputs?.length
    ? `<p><strong>Expected:</strong> ${escHtml(stack.io.expectedOutputs.join(", "))}</p>`
    : "";

  return `
    <div class="builder-stack-guide">
      <div class="builder-stack-guide-main">
        <span class="builder-stack-guide-label">Loaded stack</span>
        <strong>${escHtml(stack.title)}</strong>
        <p>${escHtml(stack.summary || stack.useWhen || "")}</p>
        ${handoff}
        ${expected}
      </div>
      ${strengths ? `<div class="builder-stack-guide-pills">${strengths}</div>` : ""}
    </div>
  `;
}

function renderComposition() {
  const mount = document.getElementById("builder-composition");
  if (!mount) return;
  const uiState = builderState.ui;

  // Show a quick-start panel when the builder is empty — faster than the per-section empty states
  if (builderState.items.length === 0) {
    const QUICK_START_BLOCKS = [
      { ref: "frame.task", label: "Define a task" },
      { ref: "frame.success-criteria", label: "Define success" },
      { ref: "mode.explore", label: "Explore a topic" },
      { ref: "mode.decide", label: "Make a decision" },
      { ref: "recurse.decompose", label: "Decompose work" },
      { ref: "guardrail.uncertainty", label: "Handle uncertainty" },
      { ref: "schema.execution-brief", label: "Structure the output" }
    ];
    const chips = QUICK_START_BLOCKS
      .map(({ ref, label }) => {
        const item = resolveRef(ref);
        if (!item) return "";
        const section = defaultBuilderSectionForItem(item, []);
        return `<button type="button" class="qs-chip" data-action="pick-starter" data-section="${escHtml(section)}" data-ref="${escHtml(item.key || item.title)}">${escHtml(label)}</button>`;
      })
      .filter(Boolean)
      .join("");

    mount.innerHTML = `
      <div class="builder-quick-start">
        <div class="builder-qs-label">Quick start</div>
        <div class="builder-qs-chips">${chips}</div>
        <button type="button" class="builder-qs-browse" data-action="open-cmd-palette">Browse all blocks&hellip;</button>
      </div>
      ${BUILDER_SECTION_ORDER.map((sectionKey) => renderSection(sectionKey, uiState)).join("")}
    `;
  } else {
    mount.innerHTML = renderLoadedStackGuide() + BUILDER_SECTION_ORDER.map((sectionKey) => renderSection(sectionKey, uiState)).join("");
  }

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

  const runtime = builderState.runtime;
  const runInput = document.getElementById("builder-run-input");
  if (runInput && runInput.value !== runtime.lastInput) {
    runInput.value = runtime.lastInput || "";
  }

  autoSizeBuilderTextareas(document.getElementById("builder-panel") || document.body);

  const modeBtn = document.getElementById("builder-output-mode");
  if (modeBtn) {
    modeBtn.setAttribute("aria-pressed", String(outputMode === "structured"));
    modeBtn.title = outputMode === "flat" ? "Show section headers" : "Hide section headers";
  }

  if (typeof renderRecentItems === "function") renderRecentItems();
}

const BUILDER_TEXTAREA_SELECTOR = ".builder-input-textarea, .builder-run-input, .pb-block-textarea";

function autoSizeBuilderTextarea(textarea) {
  if (!(textarea instanceof HTMLTextAreaElement)) return;

  const maxHeight = Number(textarea.dataset.maxHeight || 0);
  textarea.style.height = "auto";

  const nextHeight = textarea.scrollHeight;
  if (maxHeight > 0 && nextHeight > maxHeight) {
    textarea.style.height = `${maxHeight}px`;
    textarea.style.overflowY = "auto";
    return;
  }

  textarea.style.height = `${Math.max(nextHeight, textarea.clientHeight)}px`;
  textarea.style.overflowY = "hidden";
}

/**
 * @param {ParentNode} [root]
 */
function autoSizeBuilderTextareas(root = document) {
  root.querySelectorAll(BUILDER_TEXTAREA_SELECTOR).forEach((element) => {
    autoSizeBuilderTextarea(element);
  });
}

function getNearestScrollableParent(element) {
  let current = element.parentElement;
  while (current) {
    const style = window.getComputedStyle(current);
    if ((style.overflowY === "auto" || style.overflowY === "scroll") && current.scrollHeight > current.clientHeight + 1) {
      return current;
    }
    current = current.parentElement;
  }
  return null;
}

function getBuilderExecutionElement() {
  return document.getElementById("builder-execution");
}

function getBuilderExecutionHeightBounds() {
  const minHeight = window.innerWidth <= 980 ? 240 : 300;
  const maxHeight = Math.max(minHeight, Math.min(Math.floor(window.innerHeight * 0.82), window.innerHeight - 120));
  return { minHeight, maxHeight };
}

function applyStoredBuilderExecutionHeight() {
  const execution = getBuilderExecutionElement();
  if (!(execution instanceof HTMLElement)) return;
  const { minHeight, maxHeight } = getBuilderExecutionHeightBounds();
  const raw = window.localStorage.getItem(BUILDER_EXECUTION_HEIGHT_STORAGE_KEY);
  const storedHeight = Number(raw || 0);
  if (!Number.isFinite(storedHeight) || storedHeight <= 0) {
    execution.style.removeProperty("height");
    return;
  }
  const clampedHeight = Math.max(minHeight, Math.min(maxHeight, storedHeight));
  execution.style.height = `${clampedHeight}px`;
}

function handoffBuilderTextareaWheel(event) {
  const target = event.target;
  if (!(target instanceof HTMLTextAreaElement)) return;
  if (!target.matches(BUILDER_TEXTAREA_SELECTOR)) return;
  if (!event.deltaY) return;

  const canScrollSelf = target.scrollHeight > target.clientHeight + 1;
  const atTop = target.scrollTop <= 0;
  const atBottom = target.scrollTop + target.clientHeight >= target.scrollHeight - 1;
  const shouldTransfer = !canScrollSelf || (event.deltaY < 0 && atTop) || (event.deltaY > 0 && atBottom);

  if (!shouldTransfer) return;

  const scrollParent = getNearestScrollableParent(target);
  if (!scrollParent) return;

  scrollParent.scrollTop += event.deltaY;
  event.preventDefault();
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
  }, 10000);
}

function openPicker(sectionKey) {
  openCmdPalette(sectionKey);
}

function openPickerFromShortcut() {
  openCmdPalette();
}

function openCmdPalette(sectionHint = "") {
  cmdPaletteSectionHint = sectionHint;
  cmdPaletteSelected = 0;
  const overlay = document.getElementById("cmd-palette");
  const input = document.getElementById("cmd-palette-input");
  const hint = document.getElementById("cmd-palette-hint");
  if (!overlay) return;
  overlay.hidden = false;
  if (input) {
    input.value = "";
    input.focus();
  }
  if (hint) {
    const section = sectionHint ? getBuilderSection(sectionHint) : null;
    hint.textContent = section ? `Adding to ${section.label}` : "Adding to best-fit section";
    hint.hidden = false;
  }
  renderCmdPaletteResults("");
}

function closeCmdPalette() {
  const overlay = document.getElementById("cmd-palette");
  if (overlay) overlay.hidden = true;
}

/**
 * Returns a Set of block keys that are "suggested swaps" for the currently
 * loaded stack — parsed from that stack's `contract.commonSwaps` text.
 */
function getLoadedStackSwapKeys() {
  if (!loadedStackKey) return new Set();
  const stackItem = stacks.find((s) => s.key === loadedStackKey);
  const contract = stackItem?.contract;
  const commonSwaps = contract && "commonSwaps" in contract ? contract.commonSwaps : "";
  if (!commonSwaps) return new Set();
  const keys = new Set();
  const matches = commonSwaps.matchAll(/`([a-z][a-z0-9.+-]+)`/g);
  for (const m of matches) {
    const resolved = resolveRef(m[1]);
    if (resolved) keys.add(resolved.key || resolved.title);
  }
  return keys;
}

function getCmdPaletteCandidates(query = "") {
  const q = query.trim().toLowerCase();
  const validTypes = cmdPaletteSectionHint
    ? (getBuilderSection(cmdPaletteSectionHint).validBlockTypes || [])
    : null;
  const swapKeys = getLoadedStackSwapKeys();
  return blocks
    .filter((item) => {
      if (validTypes && !validTypes.includes(item.blockType)) return false;
      if (!q) return true;
      const searchText = [
        item.title,
        item.summary,
        item.group,
        item.family,
        ...(item.tags || [])
      ].join(" ").toLowerCase();
      return matchesFuzzySearch(searchText, q);
    })
    .sort((a, b) => {
      const aSwap = swapKeys.has(a.key || a.title);
      const bSwap = swapKeys.has(b.key || b.title);
      if (aSwap !== bSwap) return aSwap ? -1 : 1;
      if (!q) {
        const rankDiff = (BLOCK_TYPE_RANK[a.blockType] ?? 99) - (BLOCK_TYPE_RANK[b.blockType] ?? 99);
        return rankDiff !== 0 ? rankDiff : a.title.localeCompare(b.title);
      }
      return a.title.localeCompare(b.title);
    })
    .slice(0, 12);
}

function renderCmdPaletteResults(query = "") {
  const list = document.getElementById("cmd-palette-list");
  if (!list) return;
  const candidates = getCmdPaletteCandidates(query);
  if (candidates.length === 0) {
    list.innerHTML = '<div class="cmd-palette-empty">No matching blocks</div>';
    return;
  }
  const swapKeys = getLoadedStackSwapKeys();
  list.innerHTML = candidates.map((item, index) => {
    const existingItem = getExistingBuilderItem(item);
    const key = item.key || item.title;
    const isSwapSuggestion = swapKeys.has(key);
    const sectionForItem = cmdPaletteSectionHint && isValidBuilderSection(cmdPaletteSectionHint, item.blockType)
      ? cmdPaletteSectionHint
      : defaultBuilderSectionForItem(item, builderState.items);
    const sectionLabel = getBuilderSection(sectionForItem).label;
    const isAdded = !!existingItem && existingItem.builderSection === sectionForItem;
    const tagsHtml = (item.tags && item.tags.length)
      ? item.tags.slice(0, 3).map(t => `<span class="cmd-palette-item-tag">${escHtml(t)}</span>`).join("")
      : "";
    const summaryHtml = item.summary
      ? `<span class="cmd-palette-item-summary">${escHtml(item.summary)}</span>`
      : "";
    const itemClasses = [
      "cmd-palette-item",
      index === cmdPaletteSelected ? "is-selected" : "",
      isAdded ? "is-added" : "",
      isSwapSuggestion && !isAdded ? "is-swap-suggestion" : ""
    ].filter(Boolean).join(" ");
    return `
      <button
        type="button"
        class="${itemClasses}"
        role="option"
        data-cmd-ref="${escHtml(key)}"
        data-cmd-section="${escHtml(sectionForItem)}"
        data-cmd-index="${index}"
      >
        <span class="cmd-palette-item-accent" data-block-type="${escHtml(item.blockType)}"></span>
        <span class="cmd-palette-item-body">
          <span class="cmd-palette-item-title">${escHtml(humanizeBlockTitle(item.title))}</span>
          <span class="cmd-palette-item-meta">${escHtml(blockTypeLabel(item.blockType))} · ${escHtml(sectionLabel)}${isAdded ? " · Added" : ""}</span>
          ${summaryHtml}
          ${tagsHtml ? `<span class="cmd-palette-item-tags">${tagsHtml}</span>` : ""}
        </span>
        ${isAdded
          ? '<span class="cmd-palette-item-added-badge">✓</span>'
          : isSwapSuggestion
            ? '<span class="cmd-palette-item-swap-badge">★ Suggested</span>'
            : '<span class="cmd-palette-item-action">Add</span>'
        }
      </button>
    `;
  }).join("");
}

function addBlockFromCmdPalette(ref, sectionKey) {
  const item = resolveRef(ref);
  if (!item) return;
  const resolvedSection = sectionKey && isValidBuilderSection(sectionKey, item.blockType)
    ? sectionKey
    : defaultBuilderSectionForItem(item, builderState.items);
  const existingItem = getExistingBuilderItem(item);
  if (existingItem) {
    builderState.moveToSection(builderItemKey(existingItem), resolvedSection);
  } else {
    builderState.add(item, { section: resolvedSection });
  }
  renderBuilder();
  syncAddButtons();
  const inputEl = document.getElementById("cmd-palette-input");
  renderCmdPaletteResults(inputEl ? inputEl.value : "");
}

function debouncedRenderLivePrompt() {
  clearTimeout(livePromptDebounceTimer);
  livePromptDebounceTimer = window.setTimeout(renderLivePrompt, 150);
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
  const snapshotItems = JSON.parse(JSON.stringify(builderState.items));
  const snapshotName = builderState.stackName;
  const snapshotLoadedStackKey = loadedStackKey;
  builderState.clear();
  loadedStackKey = "";
  renderBuilder();
  syncAddButtons();
  showBuilderToast("Builder cleared", "Undo", () => {
    builderState.restore(snapshotItems, { stackName: snapshotName });
    loadedStackKey = snapshotLoadedStackKey;
    renderBuilder();
    syncAddButtons();
  });
});

document.getElementById("builder-stack-name").addEventListener("input", (event) => {
  builderState.setStackName(event.target.value);
});

document.getElementById("builder-run-input")?.addEventListener("input", (event) => {
  autoSizeBuilderTextarea(event.target);
  builderState.setTaskInput(event.target.value);
  renderBuilderInputs();
  debouncedRenderLivePrompt();
});

document.getElementById("builder-copy-prompt").addEventListener("click", async () => {
  const prompt = getActiveBuilderPrompt();
  if (!prompt) return;
  try {
    await navigator.clipboard.writeText(prompt);
    showBuilderToast("Prompt copied");
  } catch {
    showBuilderToast("Copy failed");
  }
});

document.getElementById("builder-inputs").addEventListener("input", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLTextAreaElement)) return;
  autoSizeBuilderTextarea(target);
  if (target.dataset.action === "builder-input") {
    builderState.setPromptInput(target.dataset.placeholderKey || "", target.value || "");
  }
  if (target.dataset.action === "builder-input-custom") {
    builderState.setInputBinding(target.dataset.itemKey || "", target.dataset.placeholderKey || "", {
      source: "custom",
      customValue: target.value || ""
    });
  }
  debouncedRenderLivePrompt();
});

document.getElementById("builder-inputs").addEventListener("change", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLSelectElement)) return;
  if (target.dataset.action !== "builder-input-source") return;
  builderState.setInputBinding(target.dataset.itemKey || "", target.dataset.placeholderKey || "", {
    source: target.value
  });
  renderBuilderInputs();
  debouncedRenderLivePrompt();
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

  if (action === "open-picker" || action === "open-cmd-palette") {
    openCmdPalette(sectionKey);
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
    const expanded = !(builderState.ui.expandedBlocks || []).includes(key);
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
    autoSizeBuilderTextarea(target);
    builderState.updateBlockCopy(target.dataset.key || "", target.value || "");
    renderBuilderInputs();
    debouncedRenderLivePrompt();
  }
});

document.getElementById("builder-panel")?.addEventListener("wheel", handoffBuilderTextareaWheel, { passive: false });

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
  const active = document.activeElement;
  const inField = active && (active.tagName === "INPUT" || active.tagName === "TEXTAREA" || active.tagName === "SELECT");

  // Cmd/Ctrl+K — open command palette (always available)
  if ((event.metaKey || event.ctrlKey) && event.key === "k") {
    event.preventDefault();
    openCmdPalette();
    return;
  }

  // Cmd/Ctrl+Enter — copy assembled prompt
  if ((event.metaKey || event.ctrlKey) && event.key === "Enter" && builderOpen) {
    const copyBtn = document.getElementById("builder-copy-prompt");
    if (copyBtn && !copyBtn.disabled) {
      event.preventDefault();
      copyBtn.click();
      return;
    }
  }

  if (!builderOpen) return;

  // "/" — open command palette when not in a text field
  if (event.key === "/" && !inField) {
    event.preventDefault();
    openCmdPalette();
    return;
  }

  // Block-focused keyboard shortcuts
  const focusedBlock = active ? active.closest(".pb-block") : null;
  const inBlockTextarea = active && active.tagName === "TEXTAREA" && active.closest(".pb-block");

  if (focusedBlock && !inBlockTextarea) {
    const key = focusedBlock.dataset.key;
    if (key) {
      if ((event.key === "Delete" || event.key === "Backspace") && !inField) {
        event.preventDefault();
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
        return;
      }
      if (event.altKey && event.key === "ArrowUp" && !inField) {
        event.preventDefault();
        builderState.move(key, -1);
        renderBuilder();
        return;
      }
      if (event.altKey && event.key === "ArrowDown" && !inField) {
        event.preventDefault();
        builderState.move(key, 1);
        renderBuilder();
        return;
      }
    }
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
const builderExecutionResizeHandle = document.getElementById("builder-execution-resize");

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

if (builderExecutionResizeHandle) {
  builderExecutionResizeHandle.addEventListener("mousedown", (event) => {
    const execution = getBuilderExecutionElement();
    if (!(execution instanceof HTMLElement)) return;
    isResizingBuilderExecution = true;
    resizeExecutionStartY = event.clientY;
    resizeExecutionStartHeight = execution.offsetHeight;
    builderExecutionResizeHandle.classList.add("dragging");
    document.body.style.cursor = "row-resize";
    document.body.style.userSelect = "none";
    event.preventDefault();
  });

  builderExecutionResizeHandle.addEventListener("dblclick", () => {
    const execution = getBuilderExecutionElement();
    if (!(execution instanceof HTMLElement)) return;
    execution.style.removeProperty("height");
    window.localStorage.removeItem(BUILDER_EXECUTION_HEIGHT_STORAGE_KEY);
  });
}

document.addEventListener("mousemove", (event) => {
  if (isResizingBuilder) {
    const dx = resizeStartX - event.clientX;
    const minWidth = 420;
    const maxWidth = Math.max(minWidth, Math.min(Math.floor(window.innerWidth * 0.62), window.innerWidth - 380));
    const nextWidth = Math.max(minWidth, Math.min(maxWidth, resizeStartWidth + dx));
    document.querySelector(".shell").style.setProperty("--builder-width", `${nextWidth}px`);
  }

  if (isResizingBuilderExecution) {
    const execution = getBuilderExecutionElement();
    if (!(execution instanceof HTMLElement)) return;
    const { minHeight, maxHeight } = getBuilderExecutionHeightBounds();
    const dy = resizeExecutionStartY - event.clientY;
    const nextHeight = Math.max(minHeight, Math.min(maxHeight, resizeExecutionStartHeight + dy));
    execution.style.height = `${nextHeight}px`;
  }
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

document.addEventListener("mouseup", () => {
  if (!isResizingBuilderExecution) return;
  const execution = getBuilderExecutionElement();
  if (execution instanceof HTMLElement) {
    window.localStorage.setItem(BUILDER_EXECUTION_HEIGHT_STORAGE_KEY, String(execution.offsetHeight));
  }
  isResizingBuilderExecution = false;
  builderExecutionResizeHandle?.classList.remove("dragging");
  document.body.style.cursor = "";
  document.body.style.userSelect = "";
});

applyStoredBuilderWidth();
applyStoredBuilderExecutionHeight();

window.addEventListener("resize", () => {
  if (window.innerWidth > 980) applyStoredBuilderWidth();
  applyStoredBuilderExecutionHeight();
});

// ─── Output mode toggle ───────────────────────────────────────────────────────

document.getElementById("builder-output-mode")?.addEventListener("click", () => {
  outputMode = outputMode === "flat" ? "structured" : "flat";
  renderLivePrompt();
  const modeBtn = document.getElementById("builder-output-mode");
  if (modeBtn) {
    modeBtn.setAttribute("aria-pressed", String(outputMode === "structured"));
    modeBtn.title = outputMode === "flat" ? "Show section headers" : "Hide section headers";
  }
});

// ─── Command palette ──────────────────────────────────────────────────────────

document.getElementById("cmd-palette")?.addEventListener("click", (event) => {
  if (event.target.closest(".cmd-palette-backdrop")) {
    closeCmdPalette();
    return;
  }
  const itemEl = event.target.closest(".cmd-palette-item");
  if (itemEl) {
    addBlockFromCmdPalette(itemEl.dataset.cmdRef || "", itemEl.dataset.cmdSection || "");
  }
});

document.getElementById("cmd-palette-input")?.addEventListener("input", (event) => {
  cmdPaletteSelected = 0;
  renderCmdPaletteResults(event.target.value || "");
});

document.getElementById("cmd-palette-input")?.addEventListener("keydown", (event) => {
  const list = document.getElementById("cmd-palette-list");
  const items = list ? list.querySelectorAll(".cmd-palette-item") : [];

  if (event.key === "ArrowDown") {
    event.preventDefault();
    if (items.length === 0) return;
    items[cmdPaletteSelected]?.classList.remove("is-selected");
    cmdPaletteSelected = Math.min(cmdPaletteSelected + 1, items.length - 1);
    items[cmdPaletteSelected]?.classList.add("is-selected");
    items[cmdPaletteSelected]?.scrollIntoView({ block: "nearest" });
    return;
  }
  if (event.key === "ArrowUp") {
    event.preventDefault();
    if (items.length === 0) return;
    items[cmdPaletteSelected]?.classList.remove("is-selected");
    cmdPaletteSelected = Math.max(cmdPaletteSelected - 1, 0);
    items[cmdPaletteSelected]?.classList.add("is-selected");
    items[cmdPaletteSelected]?.scrollIntoView({ block: "nearest" });
    return;
  }
  if (event.key === "Enter") {
    event.preventDefault();
    const selected = items[cmdPaletteSelected];
    if (selected) addBlockFromCmdPalette(selected.dataset.cmdRef || "", selected.dataset.cmdSection || "");
    return;
  }
  if (event.key === "Escape") {
    closeCmdPalette();
    return;
  }
});

// ─── Load composition from file ──────────────────────────────────────────────

document.getElementById("builder-load")?.addEventListener("click", () => {
  document.getElementById("load-stack-input")?.click();
});

document.getElementById("load-stack-input")?.addEventListener("change", (event) => {
  const input = event.target instanceof HTMLInputElement ? event.target : null;
  const file = input?.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(typeof e.target?.result === "string" ? e.target.result : "null");
      const items = Array.isArray(data?.items) ? data.items : Array.isArray(data) ? data : [];
      const meta = {
        stackName: typeof data?.stackName === "string" ? data.stackName : file.name.replace(/\.json$/, ""),
        taskInput: typeof data?.taskInput === "string" ? data.taskInput : ""
      };
      builderState.restore(items, meta);
      renderBuilder();
      syncAddButtons();
      openBuilder();
      showBuilderToast(`Loaded "${meta.stackName}"`);
    } catch {
      showBuilderToast("Could not load file — invalid or unsupported format");
    }
    if (input) input.value = "";
  };
  reader.readAsText(file);
});

window.PromptKit = window.PromptKit || {};
Object.assign(window.PromptKit, {
  assembleBuilderPrompt,
  closeBuilder,
  openBuilder,
  renderBuilder,
  showBuilderToast,
  syncAddButtons
});
