const siteData = window.SITE_DATA || globalThis.SITE_DATA;

if (!siteData) {
  throw new Error("site-data.js must be loaded before site.js");
}

const {
  blocks = [],
  stacks = []
} = siteData;

const BLOCK_TYPE_ORDER = ["core", "lens", "mode", "strategy", "style", "rubric"];
const BLOCK_TYPE_LABELS = {
  core: "Core",
  lens: "Lens",
  mode: "Mode",
  strategy: "Strategy",
  style: "Style",
  rubric: "Rubric"
};

function titleCase(text = "") {
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : "";
}

function slugify(text = "") {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function normalizeRef(ref = "") {
  return ref.trim().toLowerCase().replace(/_/g, "-");
}

function normalizeSection(item) {
  if (item.section === "Stack") return "stack";
  return (item.blockType || item.section || "").toLowerCase();
}

function blockTypeLabel(blockType = "") {
  return BLOCK_TYPE_LABELS[blockType] || titleCase(blockType);
}

const BLOCK_TYPE_DESCRIPTIONS = {
  core: "Task-ready prompt units, structural constraints, schemas, and reusable prompt building blocks.",
  lens: "Perspective blocks that reframe a situation through a discipline, model, or angle.",
  mode: "Stance-setting blocks that define how the model should approach the session.",
  strategy: "Reasoning-mechanic blocks that introduce a specific analytical move.",
  style: "Tone, verbosity, and formatting blocks.",
  rubric: "Evaluation blocks for checking whether the result is actually good enough."
};

// ─── Builder state ────────────────────────────────────────────────────────────
const builderState = (() => {
  const STORAGE_KEY = "agent-library-builder";
  let items = [];

  function itemKey(item) {
    return `${item.section}:${item.title}`;
  }

  function migrateLegacyItem(item) {
    if (!item || item.section === "Block") return item;

    const legacyMap = {
      Mode: { section: "Block", blockType: "mode", sourceKind: "Mode" },
      Strategy: { section: "Block", blockType: "strategy", sourceKind: "Strategy" },
      Atom: { section: "Block", blockType: "core", sourceKind: "Prompt Block" },
      Snippet: { section: "Block", blockType: "core", sourceKind: "Snippet" },
      Lens: { section: "Block", blockType: "lens", sourceKind: "Lens" },
      Rubric: { section: "Block", blockType: "rubric", sourceKind: "Rubric" }
    };

    if (!legacyMap[item.section]) return item;

    return {
      ...item,
      ...legacyMap[item.section],
      chains: item.chains || {}
    };
  }

  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch {}
  }

  return {
    get items() { return items; },
    load() {
      try {
        items = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
          .map((item) => migrateLegacyItem(item));
        items.forEach((i) => { if (!i.chains) i.chains = {}; });
        items.forEach((item, idx) => {
          Object.entries(item.chains).forEach(([ph, source]) => {
            if (typeof source === "number") {
              if (source >= 0 && source < idx && items[source]) {
                item.chains[ph] = itemKey(items[source]);
              } else {
                delete item.chains[ph];
              }
            } else if (typeof source !== "string") {
              delete item.chains[ph];
            }
          });
        });
      } catch {
        items = [];
      }
    },
    has(item) {
      return items.some((i) => itemKey(i) === itemKey(item));
    },
    add(item) {
      if (this.has(item)) return false;
      items.push({
        section: item.section,
        blockType: item.blockType || "",
        sourceKind: item.sourceKind || "",
        family: item.family || "",
        group: item.group || "",
        title: item.title,
        summary: item.summary || "",
        copy: item.copy || bodyCopy(item),
        chains: {}
      });
      save();
      return true;
    },
    remove(k) {
      items = items.filter((i) => itemKey(i) !== k);
      save();
    },
    move(k, dir) {
      const idx = items.findIndex((i) => itemKey(i) === k);
      if (idx < 0) return;
      const next = idx + dir;
      if (next < 0 || next >= items.length) return;
      [items[idx], items[next]] = [items[next], items[idx]];
      save();
    },
    clear() {
      items = [];
      save();
    },
    reorder(srcKey, tgtKey) {
      const srcIdx = items.findIndex((i) => itemKey(i) === srcKey);
      const tgtIdx = items.findIndex((i) => itemKey(i) === tgtKey);
      if (srcIdx < 0 || tgtIdx < 0 || srcIdx === tgtIdx) return;
      const [moved] = items.splice(srcIdx, 1);
      items.splice(tgtIdx, 0, moved);
      save();
    },
    setChain(itemKeyValue, ph, srcIdx) {
      const item = items.find((i) => `${i.section}:${i.title}` === itemKeyValue);
      if (!item) return;
      if (!item.chains) item.chains = {};
      if (srcIdx === null || srcIdx === undefined || srcIdx < 0) {
        delete item.chains[ph];
      } else {
        const sourceItem = items[srcIdx];
        if (!sourceItem) {
          delete item.chains[ph];
        } else {
          item.chains[ph] = itemKey(sourceItem);
        }
      }
      save();
    },
    assemble() {
      return items
        .filter((i) => i.copy && i.copy.trim())
        .map((i, idx) => formatStackBlock(i, idx, items))
        .join("\n\n---\n\n");
    }
  };
})();

const sectionCounts = {
  blocks: blocks.length,
  stacks: stacks.length
};

// ─── Item registry (for stack step resolution) ───────────────────────────────

function registerRef(map, ref, item) {
  if (!ref) return;
  map.set(normalizeRef(ref), item);
}

const itemRegistry = (() => {
  const map = new Map();
  blocks.forEach((item) => {
    registerRef(map, item.key, item);
    (item.aliases || []).forEach((alias) => registerRef(map, alias, item));
    if (item.key && item.key.startsWith("core.")) {
      const suffix = item.key.slice(5);
      registerRef(map, `core.${suffix.replace(/\./g, "-")}`, item);
    }
    registerRef(map, `${slugify(item.section)}.${slugify(item.title)}`, item);
  });
  return map;
})();

function resolveRef(ref = "") {
  return itemRegistry.get(normalizeRef(ref)) || null;
}

function renderBodyText(text = "") {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/`([^`]+)`/g, "<code>$1</code>");
}

function renderBody(body = []) {
  return body
    .map(([label, text]) => `<p><strong>${label}:</strong> ${renderBodyText(text)}</p>`)
    .join("");
}

function renderPromptMarkup(text = "") {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\{([^}]+)\}/g, '<span class="ph">{$1}</span>');
}

function getOntologyPath(item) {
  if (item.section === "Stack") {
    return ["Stack"];
  }

  const path = ["Block", blockTypeLabel(item.blockType)];
  if (item.blockType === "core" && item.sourceKind === "Prompt Block") {
    path.push("Prompt Block");
  } else if (item.blockType === "core" && item.sourceKind === "Snippet") {
    path.push("Snippet");
  }
  if (item.group) path.push(item.group);
  if (item.family && !path.includes(item.family)) path.push(item.family);
  return path;
}

function getOntologyLabel(item) {
  return getOntologyPath(item).join(" / ");
}

function getChainSourceIndex(source, items = [], beforeIndex = items.length) {
  if (typeof source === "number") {
    return source >= 0 && source < beforeIndex ? source : -1;
  }
  if (typeof source === "string") {
    const idx = items.findIndex((item) => `${item.section}:${item.title}` === source);
    return idx >= 0 && idx < beforeIndex ? idx : -1;
  }
  return -1;
}

function buildChainGlue(item, itemIndex = -1, items = []) {
  const chains = Object.entries(item.chains || {})
    .map(([ph, source]) => {
      const srcIdx = getChainSourceIndex(source, items, itemIndex);
      if (srcIdx < 0) return null;
      const srcItem = items[srcIdx];
      return `- \`${ph}\`: use the relevant output from Step ${srcIdx + 1} (${srcItem.title}).`;
    })
    .filter(Boolean);

  if (chains.length === 0) return "";

  return `Input wiring:\n${chains.join("\n")}\n\n`;
}

function formatStackBlock(item, itemIndex = -1, items = []) {
  const label = getOntologyLabel(item);
  const glue = buildChainGlue(item, itemIndex, items);
  return `## ${item.title}\n_${label}_\n\n${glue}${item.copy}`;
}

function bodyCopy(item) {
  if (item.copy) return item.copy;
  return (item.body || [])
    .map(([label, text]) => `${label}:\n${text.replace(/`([^`]+)`/g, "$1")}`)
    .join("\n\n");
}

function resolveStackSteps(sequence) {
  const refs = (sequence.match(/`([^`]+)`/g) || []).map((s) => s.slice(1, -1).trim());
  return refs.map((ref) => resolveRef(ref)).filter(Boolean);
}

function escHtml(str = "") {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function createCard(item) {
  const template = document.getElementById("card-template");
  const card = template.content.firstElementChild.cloneNode(true);
  const label = getOntologyLabel(item);
  const searchText = [
    item.section,
    item.blockType,
    item.sourceKind,
    item.family,
    item.group,
    item.title,
    item.summary,
    ...(item.tags || []),
    ...(item.body || []).flat(),
    item.copy || ""
  ].join(" ").toLowerCase();

  card.dataset.search = searchText;
  card.dataset.path = label.toLowerCase();
  card.dataset.title = item.title.toLowerCase();
  card.dataset.section = normalizeSection(item);
  card.querySelector(".card-meta").textContent = label;
  card.querySelector(".card-meta").dataset.section = item.section;

  card.querySelector("h3").textContent = item.title;
  card.querySelector(".card-summary").textContent = item.summary;
  const cardDetails = card.querySelector(".card-details");
  const bodyEl = card.querySelector(".card-body");
  const promptEl = card.querySelector(".prompt");
  const detailsId = `details-${slugify(`${item.section}-${item.title}`)}`;
  cardDetails.id = detailsId;
  const seqEntry = item.section === "Stack"
    ? (item.body || []).find(([labelText]) => labelText === "Suggested blocks")
    : null;
  const stackRefs = seqEntry
    ? (seqEntry[1].match(/`([^`]+)`/g) || []).map((s) => s.slice(1, -1).trim())
    : [];

  if (item.section === "Stack") {
    const countBadge = document.createElement("span");
    countBadge.className = "stack-size-badge";
    countBadge.textContent = `${stackRefs.length} block${stackRefs.length !== 1 ? "s" : ""}`;
    card.querySelector(".card-meta").appendChild(countBadge);
  }

  if (item.section === "Stack") {
    bodyEl.innerHTML = (item.body || []).map(([labelText, text]) => {
      if (labelText === "Suggested blocks") {
        const pills = stackRefs.map((ref) => {
          const stepItem = resolveRef(ref);
          if (stepItem) {
            const stepKey = stepItem.key || `${stepItem.blockType}.${slugify(stepItem.title)}`;
            return `<span class="wf-step-pill" tabindex="0" role="button" data-key="${escHtml(stepKey)}">${escHtml(stepItem.title)}</span>`;
          }
          return `<span class="wf-step-pill">${escHtml(ref)}</span>`;
        });
        const sep = '<span class="wf-step-arrow" aria-hidden="true">›</span>';
        return `<p><strong>${renderBodyText(labelText)}:</strong></p><div class="wf-steps-row">${pills.join(sep)}</div>`;
      }
      return `<p><strong>${renderBodyText(labelText)}:</strong> ${renderBodyText(text)}</p>`;
    }).join("");
  } else {
    bodyEl.innerHTML = renderBody(item.body);
  }

  promptEl.innerHTML = renderPromptMarkup(item.copy || "");
  if (!item.copy) promptEl.hidden = true;

  const tagsEl = card.querySelector(".tags");
  const tags = item.tags || [];
  if (tags.length === 0) {
    tagsEl.hidden = true;
  }
  tags.forEach((tag) => {
    const span = document.createElement("span");
    span.className = "tag";
    span.textContent = tag;
    span.addEventListener("click", () => setFilter(tag));
    tagsEl.appendChild(span);
  });

  const addBtn = card.querySelector(".add-btn");
  const detailsBtn = card.querySelector(".details-btn");

  if (item.section === "Stack") {
    const steps = stackRefs.map((ref) => resolveRef(ref)).filter(Boolean);
    addBtn.textContent = "Add blocks";
    addBtn.removeAttribute("aria-pressed");
    addBtn.addEventListener("click", () => {
      const added = steps.reduce((count, step) => {
        if (!builderState.has(step)) {
          builderState.add(step);
          return count + 1;
        }
        return count;
      }, 0);
      if (!document.querySelector(".shell").classList.contains("builder-open")) openBuilder();
      renderBuilder();
      syncAddButtons();
      addBtn.textContent = added > 0 ? `Added ${added}` : "Up to date";
      setTimeout(() => { addBtn.textContent = "Add blocks"; }, 1500);
    });
    card.querySelector(".copy-btn").remove();
  } else {
    const hasBuilderContent = !!(item.copy || (item.body && item.body.length > 0));
    if (hasBuilderContent) {
      const itemKey = `${item.section}:${item.title}`;
      addBtn.dataset.key = itemKey;
      addBtn.addEventListener("click", () => {
        if (builderState.has(item)) {
          builderState.remove(itemKey);
          renderBuilder();
        } else {
          builderState.add(item);
          if (!document.querySelector(".shell").classList.contains("builder-open")) {
            openBuilder();
          }
          renderBuilder(itemKey);
        }
        syncAddButtons();
      });
      if (item.copy) {
        card.querySelector(".copy-btn").addEventListener("click", async () => {
          try {
            await navigator.clipboard.writeText(item.copy);
            const btn = card.querySelector(".copy-btn");
            const original = btn.textContent;
            btn.textContent = "Copied";
            setTimeout(() => { btn.textContent = original; }, 1200);
          } catch {
            window.alert("Copy failed. Select and copy manually.");
          }
        });
      } else {
        card.querySelector(".copy-btn").remove();
      }
    } else {
      addBtn.remove();
      card.querySelector(".copy-btn").remove();
    }
  }

  const hasExpandable = !!(item.copy || (item.body && item.body.length > 0));
  if (hasExpandable) {
    detailsBtn.setAttribute("aria-controls", detailsId);
    detailsBtn.addEventListener("click", () => {
      const open = card.classList.toggle("expanded");
      cardDetails.hidden = !open;
      detailsBtn.setAttribute("aria-expanded", String(open));
      detailsBtn.textContent = open ? "Hide" : "Details";
    });
  } else {
    detailsBtn.remove();
  }

  return card;
}

// ─── Builder helpers ──────────────────────────────────────────────────────────

function openBuilder() {
  document.querySelector(".shell").classList.add("builder-open");
  document.getElementById("builder-toggle").setAttribute("aria-expanded", "true");
}

function closeBuilder() {
  document.querySelector(".shell").classList.remove("builder-open");
  document.getElementById("builder-toggle").setAttribute("aria-expanded", "false");
}

function syncAddButtons() {
  document.querySelectorAll(".add-btn[data-key]").forEach((btn) => {
    const isAdded = builderState.items.some((i) => `${i.section}:${i.title}` === btn.dataset.key);
    btn.dataset.added = isAdded ? "true" : "false";
    btn.textContent = isAdded ? "Added" : "Add";
    btn.setAttribute("aria-pressed", String(isAdded));
  });
}

let builderDraftDirty = false;

function updateBuilderStateNote() {
  const note = document.getElementById("builder-state-note");
  const output = document.getElementById("builder-output");
  if (!note || !output) return;
  if (builderDraftDirty) {
    note.hidden = false;
    note.textContent = "Draft edited. Rebuild from cards to resync the stack.";
    output.classList.add("is-dirty");
  } else {
    note.hidden = true;
    note.textContent = "";
    output.classList.remove("is-dirty");
  }
}

function syncBuilderOutput(force = false) {
  const output = document.getElementById("builder-output");
  if (!output) return "";
  const assembled = builderState.assemble();
  if (force || !builderDraftDirty) {
    output.value = assembled;
    builderDraftDirty = false;
  }
  updateBuilderStateNote();
  updateStats();
  updateVarButton();
  return assembled;
}

function renderBuilder(flashKey = null) {
  const list = document.getElementById("builder-list");
  const empty = document.getElementById("builder-empty");
  const footer = document.getElementById("builder-footer");
  const output = document.getElementById("builder-output");
  const badge = document.getElementById("builder-badge");
  const splitHandle = document.querySelector(".builder-section-resize-handle");

  const items = builderState.items;
  const count = items.length;
  const footerVisible = !(count === 0 && !(builderDraftDirty || output.value.trim().length > 0));

  badge.textContent = count;
  badge.hidden = count === 0;

  empty.hidden = count > 0;
  list.hidden = count === 0;
  footer.hidden = !footerVisible;
  if (splitHandle) splitHandle.hidden = !footerVisible;

  list.innerHTML = "";
  if (items.length > 0) {
    const header = document.createElement("div");
    header.className = "bi-list-header";
    header.innerHTML = `<span class="bi-list-count">${items.length} step${items.length !== 1 ? "s" : ""}</span><button class="bi-clear-btn" type="button">Clear all</button>`;
    header.querySelector(".bi-clear-btn").addEventListener("click", () => {
      builderState.clear();
      builderDraftDirty = false;
      renderBuilder();
      syncAddButtons();
    });
    list.appendChild(header);
  }

  items.forEach((item, idx) => {
    const key = `${item.section}:${item.title}`;
    const metaLabel = getOntologyLabel(item);
    const el = document.createElement("div");
    el.className = "builder-item" + (key === flashKey ? " bi-entering" : "");
    el.dataset.key = key;
    el.draggable = true;
    const preview = item.summary ? `<div class="bi-preview">${escHtml(item.summary)}</div>` : "";
    const phs = [...new Set((item.copy || "").match(/\{[^}\n]{1,80}\}/g) || [])];
    const chains = item.chains || {};
    let chainHtml = "";

    if (phs.length > 0 && idx > 0) {
      const chainRows = phs.map((ph) => {
        const srcIdx = getChainSourceIndex(chains[ph], items, idx);
        const options = [
          `<option value=""${srcIdx < 0 ? " selected" : ""}>manual</option>`,
          ...items.slice(0, idx).map((prevItem, prevIndex) => {
            const short = prevItem.title.length > 24 ? prevItem.title.slice(0, 24) + "…" : prevItem.title;
            return `<option value="${prevIndex}"${srcIdx === prevIndex ? " selected" : ""}>← Step ${prevIndex + 1}: ${escHtml(short)}</option>`;
          })
        ].join("");
        return `<div class="bi-chain-row"><code class="bi-chain-ph">${escHtml(ph)}</code><select class="bi-chain-select" data-ph="${escHtml(ph)}">${options}</select></div>`;
      }).join("");
      chainHtml = `<div class="bi-chains">${chainRows}</div>`;
    }

    el.innerHTML = `
      <div class="bi-meta">${escHtml(metaLabel)}</div>
      <div class="bi-title"><span class="bi-step">${idx + 1}</span>${escHtml(item.title)}</div>
      ${preview}
      <div class="bi-controls">
        <button class="bi-btn" data-action="up" title="Move up" aria-label="Move ${escHtml(item.title)} up"${idx === 0 ? " disabled" : ""}>&#8593;</button>
        <button class="bi-btn" data-action="down" title="Move down" aria-label="Move ${escHtml(item.title)} down"${idx === items.length - 1 ? " disabled" : ""}>&#8595;</button>
        <button class="bi-btn bi-remove" data-action="remove" title="Remove" aria-label="Remove ${escHtml(item.title)}">&times;</button>
      </div>
      ${chainHtml}
    `;
    list.appendChild(el);
  });

  syncBuilderOutput();
}

function updateStats() {
  const output = document.getElementById("builder-output");
  const statsEl = document.getElementById("builder-stats");
  if (!statsEl) return;
  const text = output.value;
  if (!text) {
    statsEl.hidden = true;
    return;
  }
  statsEl.hidden = false;
  const chars = text.length;
  const placeholders = (text.match(/\{[^}]+\}/g) || []).length;
  const items = builderState.items.length;
  const charStr = `${chars.toLocaleString()} chars`;
  const itemStr = `${items} item${items !== 1 ? "s" : ""}`;
  const phStr = placeholders > 0
    ? `<button class="stat-ph-btn" type="button">${placeholders} placeholder${placeholders !== 1 ? "s" : ""} to fill</button>`
    : '<span class="stat-ok">Ready to copy</span>';
  statsEl.innerHTML = `<span>${itemStr}</span><span>${charStr}</span>${phStr}`;
}

function updateVarButton() {
  const output = document.getElementById("builder-output");
  const btn = document.getElementById("fill-placeholders");
  if (!btn || !output) return;
  const unique = new Set((output.value.match(/\{[^}\n]{1,80}\}/g) || []));
  if (unique.size > 0) {
    btn.hidden = false;
    btn.textContent = `Fill in (${unique.size})`;
  } else {
    btn.hidden = true;
  }
}

function openVarsModal() {
  const output = document.getElementById("builder-output");
  const text = output.value;
  const allMatches = text.match(/\{[^}\n]{1,80}\}/g);
  if (!allMatches) return;

  const modal = document.getElementById("vars-modal");
  const body = document.getElementById("vm-body");
  const seen = new Set();
  const groups = [];
  const ungrouped = [];
  const liveItems = builderState.items.filter((i) => i.copy && i.copy.trim());

  liveItems.forEach((item, idx) => {
    const phs = (item.copy || "").match(/\{[^}\n]{1,80}\}/g) || [];
    if (phs.length === 0) return;
    const unique = [...new Set(phs)].filter((p) => !seen.has(p));
    if (unique.length === 0) return;
    unique.forEach((p) => seen.add(p));
    groups.push({
      stepNum: idx + 1,
      title: item.title,
      label: getOntologyLabel(item),
      placeholders: unique.map((ph) => ({ ph }))
    });
  });

  [...new Set(allMatches)].filter((p) => !seen.has(p)).forEach((ph) => {
    ungrouped.push({ ph });
  });

  body.innerHTML = "";

  groups.forEach((group) => {
    const section = document.createElement("div");
    section.className = "vm-group";
    section.innerHTML = `<div class="vm-group-header"><span class="vm-step">${group.stepNum}</span><span class="vm-group-title">${escHtml(group.title)}</span><span class="vm-group-label">${escHtml(group.label)}</span></div>`;
    const srcItem = liveItems[group.stepNum - 1];
    const srcChains = (srcItem && srcItem.chains) ? srcItem.chains : {};
    const itemKey = srcItem ? `${srcItem.section}:${srcItem.title}` : "";
    group.placeholders.forEach(({ ph }) => {
      const chainSrcIdx = getChainSourceIndex(srcChains[ph], liveItems, group.stepNum - 1);
      section.appendChild(buildVmField({
        ph,
        itemKey,
        stepIndex: group.stepNum - 1,
        chainSrcIdx,
        liveItems
      }));
    });
    body.appendChild(section);
  });

  if (ungrouped.length > 0) {
    const section = document.createElement("div");
    section.className = "vm-group";
    section.innerHTML = '<div class="vm-group-header"><span class="vm-group-title">Other</span></div>';
    ungrouped.forEach(({ ph }) => {
      section.appendChild(buildVmField({ ph, liveItems }));
    });
    body.appendChild(section);
  }

  modal.showModal();
  const first = body.querySelector(".vm-chain-select, .vm-input");
  if (first) setTimeout(() => first.focus(), 40);
}

function buildVmField({ ph, itemKey = "", stepIndex = -1, chainSrcIdx = -1, liveItems = [] }) {
  const item = document.createElement("div");
  item.className = "vm-field";
  const canChain = stepIndex > 0;
  const chainOptions = canChain
    ? [
        `<option value=""${chainSrcIdx < 0 ? " selected" : ""}>Manual entry</option>`,
        ...liveItems.slice(0, stepIndex).map((prevItem, prevIndex) => {
          const selected = chainSrcIdx === prevIndex ? " selected" : "";
          return `<option value="${prevIndex}"${selected}>← Step ${prevIndex + 1}: ${escHtml(prevItem.title)}</option>`;
        })
      ].join("")
    : "";
  const chainControl = canChain
    ? `
      <label class="vm-chain-row">
        <span class="vm-chain-label">Source</span>
        <select class="vm-chain-select" data-item-key="${escHtml(itemKey)}" data-placeholder="${escHtml(ph)}">
          ${chainOptions}
        </select>
      </label>
    `
    : "";
  item.innerHTML = `
    <div class="vm-field-head"><code class="vm-ph">${escHtml(ph)}</code></div>
    ${chainControl}
    <textarea class="vm-input" data-placeholder="${escHtml(ph)}" spellcheck="false" placeholder="Type or paste your value…"></textarea>
  `;
  return item;
}

function applyVarModal() {
  const modal = document.getElementById("vars-modal");
  const output = document.getElementById("builder-output");
  const manualOverrides = [];

  modal.querySelectorAll(".vm-field").forEach((field) => {
    const input = field.querySelector(".vm-input");
    const select = field.querySelector(".vm-chain-select");
    if (!input) return;
    const ph = input.dataset.placeholder;
    const manualValue = input.value;

    if (manualValue !== "") {
      if (select) {
        builderState.setChain(select.dataset.itemKey, ph, null);
      }
      manualOverrides.push({ ph, value: manualValue });
      return;
    }

    if (select) {
      const srcIdx = select.value === "" ? null : parseInt(select.value, 10);
      builderState.setChain(select.dataset.itemKey, ph, srcIdx);
    }
  });

  builderDraftDirty = false;
  renderBuilder();

  if (manualOverrides.length > 0) {
    let text = output.value;
    manualOverrides.forEach(({ ph, value }) => {
      text = text.split(ph).join(value);
    });
    output.value = text;
    builderDraftDirty = true;
    updateBuilderStateNote();
    updateStats();
    updateVarButton();
  }

  modal.close();
}

const search = document.getElementById("search");
const filterCount = document.getElementById("filter-count");
const filterClear = document.getElementById("filter-clear");

// ─── Filter state & logic ─────────────────────────────────────────────────────

const filterState = {
  text: "",
  section: ""
};

const SECTION_CHIPS = [
  { label: "Stacks", value: "stack" },
  ...BLOCK_TYPE_ORDER
    .filter((type) => blocks.some((item) => item.blockType === type))
    .map((type) => ({ label: blockTypeLabel(type), value: type }))
];

function applyFilters() {
  const q = filterState.text.toLowerCase();
  const section = filterState.section;
  let visible = 0;
  const all = document.querySelectorAll(".searchable");

  all.forEach((card) => {
    let show = true;
    if (q && !card.dataset.search.includes(q)) show = false;
    if (section && card.dataset.section !== section) show = false;
    card.classList.toggle("hidden", !show);
    if (show) visible += 1;
  });

  document.querySelectorAll(".block-type-section").forEach((sectionEl) => {
    const cards = sectionEl.querySelectorAll(".searchable");
    const hasVisibleCard = [...cards].some((card) => !card.classList.contains("hidden"));
    sectionEl.classList.toggle("hidden", !hasVisibleCard);
  });

  const hasFilter = !!(q || section);
  if (filterCount) {
    filterCount.textContent = `${visible} of ${all.length} shown`;
    filterCount.hidden = !hasFilter;
  }
  syncFilterUi();
}

function syncFilterUi() {
  const hasFilter = !!(filterState.text || filterState.section);
  if (filterClear) filterClear.hidden = !hasFilter;
  document.querySelectorAll(".filter-chip[data-section]").forEach((chip) => {
    chip.classList.toggle("active", chip.dataset.section === filterState.section);
  });
}

function renderFilterChips() {
  const mount = document.getElementById("filter-chips");
  if (!mount) return;
  mount.innerHTML = "";
  SECTION_CHIPS.forEach(({ label, value }) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "filter-chip";
    btn.dataset.section = value;
    btn.textContent = label;
    btn.addEventListener("click", () => {
      filterState.section = filterState.section === value ? "" : value;
      applyFilters();
    });
    mount.appendChild(btn);
  });
}

function renderGroupedBlocks() {
  const mount = document.getElementById("blocks-groups");
  if (!mount) return;
  mount.innerHTML = "";

  BLOCK_TYPE_ORDER
    .filter((type) => blocks.some((item) => item.blockType === type))
    .forEach((type) => {
      const items = blocks.filter((item) => item.blockType === type);
      const section = document.createElement("section");
      section.className = "block-type-section";
      section.dataset.blockType = type;

      const head = document.createElement("div");
      head.className = "block-type-head";
      head.innerHTML = `
        <div class="block-type-meta">
          <div class="eyebrow">Block Type</div>
          <h3>${escHtml(blockTypeLabel(type))}</h3>
          <p class="block-type-copy">${escHtml(BLOCK_TYPE_DESCRIPTIONS[type] || "")}</p>
        </div>
        <div class="block-type-count">${items.length} block${items.length !== 1 ? "s" : ""}</div>
      `;

      const grid = document.createElement("div");
      grid.className = "card-grid";
      grid.dataset.blockTypeGrid = type;
      items.forEach((item) => grid.appendChild(createCard(item)));

      section.appendChild(head);
      section.appendChild(grid);
      mount.appendChild(section);
    });
}

function renderCards() {
  const stacksMount = document.getElementById("stacks-grid");
  if (stacksMount) {
    stacksMount.innerHTML = "";
    stacks.forEach((item) => stacksMount.appendChild(createCard(item)));
  }

  renderGroupedBlocks();
}

search.addEventListener("input", () => {
  filterState.text = search.value.trim();
  applyFilters();
});

function setFilter(value) {
  const next = (value || "").trim();
  if (filterState.text.toLowerCase() === next.toLowerCase()) {
    filterState.text = "";
  } else {
    filterState.text = next;
  }
  search.value = filterState.text;
  applyFilters();
  if (!filterState.text) search.blur();
}

if (filterClear) {
  filterClear.addEventListener("click", () => {
    filterState.text = "";
    filterState.section = "";
    search.value = "";
    applyFilters();
    search.focus();
  });
}

function updateNavCounts() {
  const blocksLink = document.querySelector('.nav a[href="#blocks"]');
  if (blocksLink && !blocksLink.querySelector(".nav-count")) {
    const countEl = document.createElement("span");
    countEl.className = "nav-count";
    countEl.textContent = sectionCounts.blocks;
    blocksLink.appendChild(countEl);
  }

  const stacksLink = document.querySelector('.nav a[href="#stacks"]');
  if (stacksLink && !stacksLink.querySelector(".nav-count")) {
    const countEl = document.createElement("span");
    countEl.className = "nav-count";
    countEl.textContent = sectionCounts.stacks;
    stacksLink.appendChild(countEl);
  }
}

// Keyboard shortcuts: / focuses search, Esc clears, b toggles builder
document.addEventListener("keydown", (e) => {
  const active = document.activeElement;
  const inInput = active && (active.tagName === "INPUT" || active.tagName === "TEXTAREA");
  if (e.key === "/" && !inInput) {
    e.preventDefault();
    search.focus();
  }
  if (e.key === "Escape" && active === search) {
    search.value = "";
    search.dispatchEvent(new Event("input"));
    search.blur();
  }
  if (e.key === "b" && !inInput && !e.metaKey && !e.ctrlKey) {
    if (document.querySelector(".shell").classList.contains("builder-open")) {
      closeBuilder();
    } else {
      openBuilder();
    }
  }
  if ((e.metaKey || e.ctrlKey) && e.key === "Enter" && active === document.getElementById("builder-output")) {
    e.preventDefault();
    document.getElementById("copy-assembled").click();
  }
});

// Active nav highlight via IntersectionObserver
if ("IntersectionObserver" in window) {
  const sectionEls = document.querySelectorAll("section[id]");
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const link = document.querySelector(`.nav a[href="#${entry.target.id}"]`);
      if (link) link.classList.toggle("active", entry.isIntersecting);
    });
  }, { rootMargin: "-15% 0px -65% 0px" });
  sectionEls.forEach((section) => obs.observe(section));
}

// ─── Builder init & events ────────────────────────────────────────────────────

builderState.load();
renderCards();
renderBuilder();
syncAddButtons();
updateNavCounts();
renderFilterChips();
if (builderState.items.length > 0) {
  openBuilder();
}

document.getElementById("builder-toggle").addEventListener("click", (e) => {
  e.preventDefault();
  if (document.querySelector(".shell").classList.contains("builder-open")) {
    closeBuilder();
  } else {
    openBuilder();
  }
});

document.getElementById("builder-close").addEventListener("click", () => {
  closeBuilder();
});

document.getElementById("rebuild-builder").addEventListener("click", () => {
  syncBuilderOutput(true);
});

const builderList = document.getElementById("builder-list");

builderList.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-action]");
  if (!btn) return;
  const itemEl = btn.closest(".builder-item");
  if (!itemEl) return;
  const key = itemEl.dataset.key;
  const action = btn.dataset.action;
  if (action === "remove") {
    builderState.remove(key);
  } else if (action === "up") {
    builderState.move(key, -1);
  } else if (action === "down") {
    builderState.move(key, 1);
  }
  renderBuilder();
  syncAddButtons();
});

let dragSrcKey = null;

builderList.addEventListener("dragstart", (e) => {
  const item = e.target.closest(".builder-item");
  if (!item) return;
  dragSrcKey = item.dataset.key;
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/plain", dragSrcKey);
  requestAnimationFrame(() => item.classList.add("dragging"));
});

builderList.addEventListener("dragend", () => {
  builderList.querySelectorAll(".builder-item").forEach((el) => {
    el.classList.remove("dragging", "drag-over");
  });
  dragSrcKey = null;
});

builderList.addEventListener("dragover", (e) => {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
  const item = e.target.closest(".builder-item");
  if (!item || item.dataset.key === dragSrcKey) return;
  builderList.querySelectorAll(".builder-item.drag-over").forEach((el) => el.classList.remove("drag-over"));
  item.classList.add("drag-over");
});

builderList.addEventListener("dragleave", (e) => {
  const item = e.target.closest(".builder-item");
  if (item && !item.contains(e.relatedTarget)) {
    item.classList.remove("drag-over");
  }
});

builderList.addEventListener("drop", (e) => {
  e.preventDefault();
  const targetItem = e.target.closest(".builder-item");
  if (!targetItem || !dragSrcKey || targetItem.dataset.key === dragSrcKey) return;
  builderState.reorder(dragSrcKey, targetItem.dataset.key);
  renderBuilder();
  syncAddButtons();
  dragSrcKey = null;
});

builderList.addEventListener("change", (e) => {
  const select = e.target.closest(".bi-chain-select");
  if (!select) return;
  const itemEl = select.closest(".builder-item");
  if (!itemEl) return;
  const key = itemEl.dataset.key;
  const ph = select.dataset.ph;
  const srcIdx = select.value === "" ? null : parseInt(select.value, 10);
  builderState.setChain(key, ph, srcIdx);
});

document.getElementById("copy-assembled").addEventListener("click", async () => {
  const text = document.getElementById("builder-output").value;
  if (!text) return;
  const btn = document.getElementById("copy-assembled");
  try {
    await navigator.clipboard.writeText(text);
    const orig = btn.textContent;
    btn.textContent = "Copied!";
    setTimeout(() => { btn.textContent = orig; }, 1400);
  } catch {
    window.alert("Copy failed - select and copy from the text area manually.");
  }
});

document.getElementById("download-assembled").addEventListener("click", () => {
  const text = document.getElementById("builder-output").value;
  if (!text) return;
  const blob = new Blob([text], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "stack.md";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});

document.getElementById("clear-builder").addEventListener("click", () => {
  if (builderState.items.length === 0) return;
  builderState.clear();
  builderDraftDirty = false;
  renderBuilder();
  syncAddButtons();
});

document.getElementById("builder-output").addEventListener("input", () => {
  const output = document.getElementById("builder-output");
  builderDraftDirty = output.value !== builderState.assemble();
  updateBuilderStateNote();
  updateStats();
  updateVarButton();
});

// ─── Variable fill-in modal ───────────────────────────────────────────────────

document.getElementById("fill-placeholders").addEventListener("click", openVarsModal);

document.getElementById("builder-stats").addEventListener("click", (e) => {
  if (e.target.matches(".stat-ph-btn")) openVarsModal();
});

document.getElementById("vm-apply").addEventListener("click", applyVarModal);
document.getElementById("vm-cancel").addEventListener("click", () => {
  document.getElementById("vars-modal").close();
});
document.getElementById("vm-close").addEventListener("click", () => {
  document.getElementById("vars-modal").close();
});
document.getElementById("vars-modal").addEventListener("click", (e) => {
  if (e.target === e.currentTarget) e.currentTarget.close();
});

document.getElementById("vm-body").addEventListener("keydown", (e) => {
  if (e.key !== "Enter" || e.shiftKey || !e.target.matches(".vm-input")) return;
  const inputs = [...document.querySelectorAll("#vm-body .vm-input")];
  const idx = inputs.indexOf(e.target);
  if (idx < inputs.length - 1) {
    e.preventDefault();
    inputs[idx + 1].focus();
  }
});

// ─── Builder panel resize ─────────────────────────────────────────────────────

const builderResizeHandle = document.querySelector(".builder-resize-handle");
let isResizingBuilder = false;
let resizeStartX = 0;
let resizeStartWidth = 0;

builderResizeHandle.addEventListener("mousedown", (e) => {
  isResizingBuilder = true;
  resizeStartX = e.clientX;
  resizeStartWidth = document.getElementById("builder-panel").offsetWidth;
  builderResizeHandle.classList.add("dragging");
  document.body.style.cursor = "col-resize";
  document.body.style.userSelect = "none";
  e.preventDefault();
});

document.addEventListener("mousemove", (e) => {
  if (!isResizingBuilder) return;
  const dx = resizeStartX - e.clientX;
  const newWidth = Math.max(320, Math.min(Math.floor(window.innerWidth * 0.6), resizeStartWidth + dx));
  document.querySelector(".shell").style.setProperty("--builder-width", `${newWidth}px`);
});

document.addEventListener("mouseup", () => {
  if (!isResizingBuilder) return;
  isResizingBuilder = false;
  builderResizeHandle.classList.remove("dragging");
  document.body.style.cursor = "";
  document.body.style.userSelect = "";
});

const builderSectionResizeHandle = document.querySelector(".builder-section-resize-handle");
let isResizingBuilderSections = false;
let resizeStartY = 0;
let resizeStartFooterHeight = 0;

builderSectionResizeHandle.addEventListener("mousedown", (e) => {
  const footer = document.getElementById("builder-footer");
  if (!footer || footer.hidden) return;
  isResizingBuilderSections = true;
  resizeStartY = e.clientY;
  resizeStartFooterHeight = footer.offsetHeight;
  builderSectionResizeHandle.classList.add("dragging");
  document.body.style.cursor = "row-resize";
  document.body.style.userSelect = "none";
  e.preventDefault();
});

document.addEventListener("mousemove", (e) => {
  if (!isResizingBuilderSections) return;
  const panel = document.getElementById("builder-panel");
  const footer = document.getElementById("builder-footer");
  if (!panel || !footer) return;
  const handleHeight = builderSectionResizeHandle.offsetHeight || 10;
  const minFooter = 220;
  const minScroll = 150;
  const panelHeight = panel.offsetHeight;
  const maxFooter = Math.max(minFooter, panelHeight - minScroll - handleHeight);
  const nextHeight = Math.max(minFooter, Math.min(maxFooter, resizeStartFooterHeight + (resizeStartY - e.clientY)));
  panel.style.setProperty("--builder-footer-height", `${nextHeight}px`);
});

document.addEventListener("mouseup", () => {
  if (!isResizingBuilderSections) return;
  isResizingBuilderSections = false;
  builderSectionResizeHandle.classList.remove("dragging");
  document.body.style.cursor = "";
  document.body.style.userSelect = "";
});

// ─── Stack step popovers ──────────────────────────────────────────────────────

const stepPopoverEl = document.getElementById("step-popover");
let spHideTimer = null;

function showStepPopover(pill) {
  const key = pill.dataset.key;
  if (!key) return;
  const item = resolveRef(key);
  if (!item) return;
  clearTimeout(spHideTimer);
  const label = getOntologyLabel(item);
  stepPopoverEl.innerHTML = `
    <div class="sp-label">${escHtml(label)}</div>
    <div class="sp-title">${escHtml(item.title)}</div>
    ${item.summary ? `<div class="sp-summary">${escHtml(item.summary)}</div>` : ""}
    <button class="sp-view-btn" type="button">View block</button>
  `;
  stepPopoverEl.hidden = false;
  stepPopoverEl.querySelector(".sp-view-btn").addEventListener("click", () => {
    hideStepPopoverNow();
    scrollToCard(item);
  });
  positionStepPopover(pill);
}

function positionStepPopover(pill) {
  const rect = pill.getBoundingClientRect();
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  stepPopoverEl.style.top = "-9999px";
  stepPopoverEl.style.left = "-9999px";
  const pw = stepPopoverEl.offsetWidth || 240;
  const ph = stepPopoverEl.offsetHeight || 100;
  let top = rect.bottom + 8;
  let left = rect.left;
  if (top + ph > vh - 16) top = rect.top - ph - 8;
  if (left + pw > vw - 16) left = vw - pw - 16;
  if (left < 16) left = 16;
  stepPopoverEl.style.top = `${top}px`;
  stepPopoverEl.style.left = `${left}px`;
}

function hideStepPopover() {
  spHideTimer = setTimeout(hideStepPopoverNow, 180);
}

function hideStepPopoverNow() {
  clearTimeout(spHideTimer);
  stepPopoverEl.hidden = true;
}

function scrollToCard(item) {
  const section = normalizeSection(item);
  const title = (item.title || "").toLowerCase();
  const card = document.querySelector(`.card[data-section="${section}"][data-title="${title}"]`);
  if (!card) return;
  card.scrollIntoView({ behavior: "smooth", block: "center" });
  card.classList.add("card-highlight");
  setTimeout(() => card.classList.remove("card-highlight"), 1400);
}

document.addEventListener("mouseover", (e) => {
  const pill = e.target.closest(".wf-step-pill[data-key]");
  if (pill) showStepPopover(pill);
});

document.addEventListener("mouseout", (e) => {
  const pill = e.target.closest(".wf-step-pill[data-key]");
  if (pill && !pill.contains(e.relatedTarget)) hideStepPopover();
});

document.addEventListener("focusin", (e) => {
  const pill = e.target.closest(".wf-step-pill[data-key]");
  if (pill) showStepPopover(pill);
});

document.addEventListener("focusout", (e) => {
  const pill = e.target.closest(".wf-step-pill[data-key]");
  if (pill) setTimeout(hideStepPopoverNow, 100);
});

stepPopoverEl.addEventListener("mouseenter", () => clearTimeout(spHideTimer));
stepPopoverEl.addEventListener("mouseleave", hideStepPopoverNow);
