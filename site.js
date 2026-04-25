// @ts-check

/** @type {PromptKitSiteData | undefined} */
const siteData = window.SITE_DATA || globalThis.SITE_DATA;

if (!siteData) {
  throw new Error("site-data.js must be loaded before site.js");
}

const {
  blocks = [],
  stacks = []
} = siteData;

/** @type {PromptKitBlockType[]} */
const BLOCK_TYPE_ORDER = ["frame", "mode", "strategy", "lens", "guardrail", "schema", "rubric"];
const BLOCK_TYPE_LABELS = {
  frame: "Frame",
  mode: "Mode",
  strategy: "Strategy",
  lens: "Lens",
  guardrail: "Guardrail",
  schema: "Schema",
  rubric: "Rubric"
};

const BLOCK_TYPE_RANK = Object.fromEntries(BLOCK_TYPE_ORDER.map((type, index) => [type, index]));

/**
 * The builder is a structured composition surface rather than a freeform editor.
 * These sections define the only valid drop zones and drive filtering, picker
 * options, warnings, and assembly order.
 */
const BUILDER_SECTION_ORDER = ["instruction", "context", "reasoning", "harness"];
const BUILDER_SECTIONS = [
  {
    key: "instruction",
    label: "Instruction",
    description: "Roles, goals, and task-defining directives.",
    emptyLabel: "Start with a frame block",
    emptyPrompt: "Define the job, goal, and boundaries before anything else.",
    starterRefs: ["frame.task", "frame.success-criteria"],
    required: true,
    validBlockTypes: ["frame"]
  },
  {
    key: "context",
    label: "Context",
    description: "Constraints, references, domain knowledge, and perspective.",
    emptyLabel: "Add supporting context if the task needs it",
    emptyPrompt: "Bring in constraints, requirements, or a lens when they will materially change the answer.",
    starterRefs: ["frame.requirements-decomposition", "lens.user-mental-model"],
    required: false,
    validBlockTypes: ["frame", "lens"]
  },
  {
    key: "reasoning",
    label: "Reasoning",
    description: "How the system should think through the job.",
    emptyLabel: "Choose how the prompt should reason",
    emptyPrompt: "A mode sets the stance. A strategy adds a deliberate reasoning move.",
    starterRefs: ["mode.explore", "mode.decide", "strategy.problem-split"],
    required: false,
    validBlockTypes: ["mode", "strategy", "lens"]
  },
  {
    key: "harness",
    label: "Checks",
    description: "Validation, output contracts, and final quality checks.",
    emptyLabel: "Add checks when the stakes justify them",
    emptyPrompt: "Use guardrails, schemas, and rubrics to make the output safer and easier to evaluate.",
    starterRefs: ["guardrail.uncertainty", "schema.execution-brief", "rubric.prompt-quality"],
    required: false,
    validBlockTypes: ["guardrail", "schema", "rubric"]
  }
];

function titleCase(text = "") {
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : "";
}

function titleCaseWords(text = "") {
  return String(text || "")
    .split(/[-\s]+/g)
    .filter(Boolean)
    .map((part) => titleCase(part))
    .join(" ");
}

function slugify(text = "") {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function normalizeRef(ref = "") {
  return ref.trim().toLowerCase().replace(/_/g, "-");
}

const PLACEHOLDER_RE = /\{[^}\n]{1,80}\}/g;

function extractPlaceholders(text = "") {
  return [...new Set(String(text || "").match(PLACEHOLDER_RE) || [])];
}

function normalizeBuilderInputLabel(placeholder = "") {
  const raw = String(placeholder || "").replace(/^\{|\}$/g, "").trim();
  if (!raw) return "Input";
  const cleaned = raw
    .replace(/^paste\s+/i, "")
    .replace(/[()]/g, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return titleCaseWords(cleaned) || "Input";
}

function fillPromptTemplate(text = "", inputValues = {}) {
  let next = String(text || "");
  extractPlaceholders(next).forEach((placeholder) => {
    const value = inputValues?.[placeholder];
    if (typeof value !== "string" || !value.trim()) return;
    next = next.split(placeholder).join(value.trim());
  });
  return next;
}

function normalizeSection(item) {
  if (item.section === "Stack") return "stack";
  return (item.blockType || item.section || "").toLowerCase();
}

function blockTypeLabel(blockType = "") {
  return BLOCK_TYPE_LABELS[blockType] || titleCase(blockType);
}

const BLOCK_TYPE_DESCRIPTIONS = {
  frame: "Task-defining blocks that set the problem, scope, objective, or approach before reasoning begins.",
  mode: "Stance-setting blocks that define how the model should approach the session.",
  strategy: "Reasoning-mechanic blocks that introduce a specific analytical method or move.",
  lens: "Perspective blocks that reframe a situation through a discipline, model, or framework.",
  guardrail: "Validation blocks that prevent common failure modes and reasoning errors.",
  schema: "Output-shaping blocks that define the structure and format of the response.",
  rubric: "Evaluation blocks for checking whether the result is actually good enough."
};

const STACK_FAMILY_ORDER = [
  "Thinking & Framing",
  "Deciding & Prioritising",
  "Research & Analysis",
  "Writing & Communication",
  "Planning & Execution",
  "Critique & Review",
  "Prompt Craft",
  "Developer Workflows",
  "Reflection & Learning"
];

const STACK_STAGE_ORDER = ["frame", "explore", "analyze", "decide", "critique", "refine", "conclude"];
const STACK_OUTPUT_KIND_ORDER = ["clarity", "options", "decision", "plan", "brief", "summary", "critique", "diagnosis", "draft", "retrospective", "prompt"];
const STACK_EFFORT_ORDER = ["quick", "standard", "deep"];
const STACK_STAKES_ORDER = ["low", "medium", "high"];

const STACK_STAGE_LABELS = Object.fromEntries(STACK_STAGE_ORDER.map((value) => [value, titleCase(value)]));
const STACK_OUTPUT_KIND_LABELS = Object.fromEntries(STACK_OUTPUT_KIND_ORDER.map((value) => [value, titleCaseWords(value)]));
const STACK_EFFORT_LABELS = {
  quick: "Quick",
  standard: "Standard",
  deep: "Deep"
};
const STACK_STAKES_LABELS = {
  low: "Low",
  medium: "Medium",
  high: "High"
};

const STACK_FILTER_DEFS = [
  { key: "stackStage", label: "Stage", values: STACK_STAGE_ORDER, labels: STACK_STAGE_LABELS, dataKey: "stackStage", itemKey: "stage" },
  { key: "stackOutputKind", label: "Output", values: STACK_OUTPUT_KIND_ORDER, labels: STACK_OUTPUT_KIND_LABELS, dataKey: "stackOutputKind", itemKey: "outputKind" },
  { key: "stackEffort", label: "Effort", values: STACK_EFFORT_ORDER, labels: STACK_EFFORT_LABELS, dataKey: "stackEffort", itemKey: "effort" },
  { key: "stackStakes", label: "Stakes", values: STACK_STAKES_ORDER, labels: STACK_STAKES_LABELS, dataKey: "stackStakes", itemKey: "stakes" }
];

function getStackBlockCount(item) {
  const seqEntry = (item.body || []).find(([l]) => l === "Suggested blocks");
  return seqEntry ? (seqEntry[1].match(/`([^`]+)`/g) || []).length : 0;
}

function getStackEffort(item = {}) {
  if (item.effort) return item.effort;
  const count = getStackBlockCount(item);
  if (count <= 3) return "quick";
  if (count <= 5) return "standard";
  return "deep";
}

function humanizeBlockTitle(title = "") {
  if (!title.includes(".")) return title;
  return title
    .split(".")
    .slice(1)
    .join(" ")
    .split(/[-_]/g)
    .map((part) => titleCase(part))
    .join(" ");
}

function getBuilderSection(sectionKey = "") {
  return BUILDER_SECTIONS.find((section) => section.key === sectionKey) || BUILDER_SECTIONS[0];
}

function isValidBuilderSection(sectionKey = "", blockType = "") {
  return getBuilderSection(sectionKey).validBlockTypes.includes(blockType);
}

function createBuilderUiState() {
  return {
    collapsed: Object.fromEntries(BUILDER_SECTION_ORDER.map((sectionKey) => [sectionKey, false])),
    expandedBlocks: [],
    pickerSection: "",
    pickerQuery: "",
    lastActiveSection: "instruction"
  };
}

function createBuilderRuntimeState() {
  return {
    lastInput: "",
    promptInputs: {}
  };
}

function createBuilderWorkingState(seed = {}) {
  return {
    items: Array.isArray(seed.items) ? seed.items : [],
    modeKey: typeof seed.modeKey === "string" ? seed.modeKey : "",
    lensKey: typeof seed.lensKey === "string" ? seed.lensKey : "",
    ui: {
      ...createBuilderUiState(),
      ...(seed.ui || {}),
      collapsed: {
        ...createBuilderUiState().collapsed,
        ...((seed.ui && seed.ui.collapsed) || {})
      }
    },
    runtime: {
      ...createBuilderRuntimeState(),
      ...(seed.runtime || {})
    }
  };
}

function cloneBuilderStateValue(value) {
  return JSON.parse(JSON.stringify(value));
}

function builderItemKey(item = {}) {
  return `${item.section}:${item.title}`;
}

function getExistingBuilderItem(item = {}) {
  return builderState.items.find((entry) => builderItemKey(entry) === builderItemKey(item)) || null;
}

function getBuilderSectionItems(items = [], sectionKey = "") {
  return items.filter((item) => item.builderSection === sectionKey);
}

function summarizeBuilderSection(items = [], sectionKey = "") {
  const sectionItems = getBuilderSectionItems(items, sectionKey);
  if (sectionItems.length === 0) return "No blocks yet";
  return sectionItems.slice(0, 3).map((item) => humanizeBlockTitle(item.title)).join(", ");
}

/**
 * Choose the default section for a block when the user adds it without an
 * explicit target. Frame and lens blocks can legally live in more than one
 * section, so we bias toward the most product-readable placement.
 */
function defaultBuilderSectionForItem(item, currentItems = []) {
  const blockType = item?.blockType || "";
  if (blockType === "guardrail" || blockType === "schema" || blockType === "rubric") return "harness";
  if (blockType === "mode" || blockType === "strategy") return "reasoning";
  if (blockType === "lens") return currentItems.some((entry) => entry.builderSection === "context") ? "reasoning" : "context";
  if (blockType === "frame") {
    const title = String(item.title || "").toLowerCase();
    if (!currentItems.some((entry) => entry.builderSection === "instruction")) return "instruction";
    if (/(task|clarify|scope|success|objective|goal|role|requirements|brief|prompt)/.test(title)) return "instruction";
    return "context";
  }
  return "instruction";
}

function getBuilderInsertIndex(items = [], sectionKey = "", indexInSection = null) {
  const sectionsBefore = BUILDER_SECTION_ORDER.slice(0, BUILDER_SECTION_ORDER.indexOf(sectionKey));
  let absoluteIndex = 0;

  items.forEach((item, index) => {
    if (sectionsBefore.includes(item.builderSection)) {
      absoluteIndex = index + 1;
    }
  });

  if (indexInSection === null || indexInSection === undefined) {
    items.forEach((item, index) => {
      if (item.builderSection === sectionKey) {
        absoluteIndex = index + 1;
      }
    });
    return absoluteIndex;
  }

  const sectionItems = getBuilderSectionItems(items, sectionKey);
  if (sectionItems.length === 0) return absoluteIndex;
  const clampedIndex = Math.max(0, Math.min(indexInSection, sectionItems.length));
  if (clampedIndex === sectionItems.length) {
    const lastSectionItem = sectionItems[sectionItems.length - 1];
    return items.findIndex((item) => builderItemKey(item) === builderItemKey(lastSectionItem)) + 1;
  }
  const targetItem = sectionItems[clampedIndex];
  return items.findIndex((item) => builderItemKey(item) === builderItemKey(targetItem));
}

function getDiscoveryRole(item = {}) {
  if (item.section === "Stack") return "";
  return defaultBuilderSectionForItem(item, []);
}

function getDiscoveryFamily(item = {}) {
  const raw = [
    item.family,
    item.group,
    item.job,
    item.sourceKind
  ].filter(Boolean).join(" ").toLowerCase();

  if (/developer|software|code|security|performance|debug|api|migration/.test(raw)) return "dev";
  if (/writing|communication|proposal|story|brief|feedback/.test(raw)) return "writing";
  if (/decid|prioriti|tradeoff|portfolio|forecast|negotia/.test(raw)) return "decision";
  if (/research|analysis|study|evidence|statistics|synthesis/.test(raw)) return "research";
  if (/planning|execution|rollout|measure|deliver|ship/.test(raw)) return "planning";
  if (/reflect|review|retro|learning/.test(raw)) return "reflection";
  if (/prompt/.test(raw)) return "prompt";
  return "thinking";
}

function getDiscoveryStage(item = {}) {
  const raw = [item.stage, item.title, item.summary, item.job].filter(Boolean).join(" ").toLowerCase();
  if (/decide|decision|prioriti|commit|choose/.test(raw)) return "decide";
  if (/explore|brainstorm|generate|ideat|discover/.test(raw)) return "explore";
  return "analyze";
}

function normalizeFilterTag(tag = "") {
  return slugify(String(tag || ""));
}

function getItemTagKeys(item = {}) {
  return (item.tags || []).map((tag) => normalizeFilterTag(tag)).filter(Boolean);
}

/**
 * Manual add targets define where a library card can insert or move a block from
 * the browse pane. This keeps the right pane fast without exposing invalid drops.
 */
function getManualAddTargets(item = {}) {
  const validSections = BUILDER_SECTIONS
    .filter((section) => section.validBlockTypes.includes(item.blockType))
    .map((section) => section.key);

  if (item.blockType === "frame") return ["instruction", "context"];
  if (item.blockType === "lens") return ["context", "reasoning"];
  return validSections;
}

function matchesFuzzySearch(haystack = "", query = "") {
  if (!query) return true;
  const text = haystack.toLowerCase();
  const needle = query.toLowerCase().trim();
  if (!needle) return true;
  if (text.includes(needle)) return true;

  let pointer = 0;
  for (const char of text) {
    if (char === needle[pointer]) pointer += 1;
    if (pointer >= needle.length) return true;
  }
  return false;
}

// ─── Builder state ────────────────────────────────────────────────────────────
//
// The current UI edits a single working composition, but we still persist it
// inside a one-active-version wrapper for backwards compatibility with older
// localStorage payloads and exports. That lets us migrate prior builder data
// without silently dropping user state.
const builderState = (() => {
  const STORAGE_KEY = "agent-library-builder";
  let stackName = "untitled-stack";
  let workingState = createBuilderWorkingState();

  function getWorkingState() {
    return workingState;
  }

  function isManagedSelectionBlock(item = {}, managedBy = "") {
    return item.managedBy === managedBy;
  }

  function normalizeStoredItem(item = {}, currentItems = []) {
    if (!item || !item.title) return null;
    const resolved = item.key ? resolveRef(item.key) : null;
    const source = resolved || item;
    const builderSection = isValidBuilderSection(item.builderSection, source.blockType || item.blockType || "")
      ? item.builderSection
      : defaultBuilderSectionForItem(source, currentItems);
    return {
      section: source.section || item.section || "Block",
      key: source.key || item.key || "",
      blockType: source.blockType || item.blockType || "",
      sourceKind: source.sourceKind || item.sourceKind || "",
      family: source.family || item.family || "",
      group: source.group || item.group || "",
      title: source.title || item.title || "",
      summary: source.summary || item.summary || "",
      copy: item.copy || source.copy || bodyCopy(source),
      contract: source.contract || item.contract || null,
      useWhen: source.useWhen || item.useWhen || "",
      builderSection,
      managedBy: item.managedBy || "",
      chains: item.chains || {},
      inputs: item.inputs || {}
    };
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        version: 5,
        stackName,
        ...cloneBuilderStateValue(workingState)
      }));
    } catch {}
  }

  function migrateLegacyItem(item, currentItems = []) {
    if (!item) return null;
    const legacyMap = {
      Mode: { section: "Block", blockType: "mode", sourceKind: "Mode" },
      Strategy: { section: "Block", blockType: "strategy", sourceKind: "Strategy" },
      Atom: { section: "Block", blockType: "frame", sourceKind: "Prompt Block" },
      Snippet: { section: "Block", blockType: "frame", sourceKind: "Snippet" },
      Core: { section: "Block", blockType: "frame", sourceKind: "Prompt Block" },
      Lens: { section: "Block", blockType: "lens", sourceKind: "Lens" },
      Rubric: { section: "Block", blockType: "rubric", sourceKind: "Rubric" }
    };
    const base = legacyMap[item.section] ? { ...item, ...legacyMap[item.section] } : item;
    const normalized = normalizeStoredItem({
      ...base,
      builderSection: defaultBuilderSectionForItem(base, currentItems)
    }, currentItems);
    if (normalized) currentItems.push(normalized);
    return normalized;
  }

  function updateManagedSelections() {
    const working = getWorkingState();
    const managedMode = working.items.find((item) => isManagedSelectionBlock(item, "mode"));
    const managedLens = working.items.find((item) => isManagedSelectionBlock(item, "lens"));
    working.modeKey = managedMode?.key || managedMode?.title || "";
    working.lensKey = managedLens?.key || managedLens?.title || "";
  }

  function withWorkingItems(mutator) {
    const working = getWorkingState();
    mutator(working.items, working);
    updateManagedSelections();
    save();
  }

  function applyManagedSelection(kind, nextKey) {
    const blockType = kind === "mode" ? "mode" : "lens";
    const targetSection = kind === "mode" ? "reasoning" : "context";
    const working = getWorkingState();
    working.items = working.items.filter((item) => {
      if (kind === "mode" && item.blockType === "mode") return false;
      return !(item.blockType === blockType && item.managedBy === kind);
    });
    if (!nextKey) {
      if (kind === "mode") working.modeKey = "";
      if (kind === "lens") working.lensKey = "";
      save();
      return;
    }

    const resolved = resolveRef(nextKey);
    if (!resolved || resolved.blockType !== blockType) {
      save();
      return;
    }

    const normalized = normalizeStoredItem({
      ...resolved,
      builderSection: targetSection,
      managedBy: kind
    }, working.items);

    if (normalized) {
      const insertAt = getBuilderInsertIndex(working.items, targetSection, 0);
      working.items.splice(insertAt, 0, normalized);
      if (kind === "mode") working.modeKey = normalized.key || normalized.title;
      if (kind === "lens") working.lensKey = normalized.key || normalized.title;
    }
    save();
  }

  return {
    get items() { return getWorkingState().items; },
    get taskInput() { return getWorkingState().runtime.lastInput || ""; },
    get promptInputs() { return getWorkingState().runtime.promptInputs || {}; },
    get startMode() { return "free"; },
    get stackName() { return stackName; },
    get ui() { return getWorkingState().ui; },
    get runtime() { return getWorkingState().runtime; },
    get modeKey() { return getWorkingState().modeKey || ""; },
    get lensKey() { return getWorkingState().lensKey || ""; },
    load() {
      try {
        const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");

        if (raw && raw.version === 5) {
          stackName = typeof raw.stackName === "string" && raw.stackName.trim() ? raw.stackName : "untitled-stack";
          workingState = createBuilderWorkingState({
            ...raw,
            items: (raw.items || []).map((item) => normalizeStoredItem(item)).filter(Boolean)
          });
          save();
          return;
        }

        // Migrate from v4 (versions array format)
        if (raw && raw.version >= 4 && Array.isArray(raw.versions)) {
          stackName = typeof raw.stackName === "string" && raw.stackName.trim() ? raw.stackName : "untitled-stack";
          const activeV = raw.versions.find((v) => v.id === raw.activeVersionId) || raw.versions[0];
          const ws = activeV?.workingState || {};
          workingState = createBuilderWorkingState({
            ...ws,
            items: (ws.items || []).map((item) => normalizeStoredItem(item)).filter(Boolean)
          });
          save();
          return;
        }

        // Migrate legacy (pre-v4)
        const legacyItems = [];
        const storedItems = Array.isArray(raw) ? raw : (Array.isArray(raw?.items) ? raw.items : []);
        storedItems.forEach((item) => migrateLegacyItem(item, legacyItems));
        stackName = "untitled-stack";
        workingState = createBuilderWorkingState({
          items: legacyItems.filter(Boolean),
          runtime: {
            ...createBuilderRuntimeState(),
            lastInput: typeof raw?.taskInput === "string" ? raw.taskInput : ""
          }
        });
        save();
      } catch {
        stackName = "untitled-stack";
        workingState = createBuilderWorkingState();
        save();
      }
    },
    has(item) {
      return this.items.some((entry) => builderItemKey(entry) === builderItemKey(item));
    },
    getSectionItems(sectionKey) {
      return getBuilderSectionItems(this.items, sectionKey);
    },
    add(item, options = {}) {
      if (!item || !item.title) return false;
      if (this.has(item)) return false;
      const working = getWorkingState();
      const nextSection = options.section && isValidBuilderSection(options.section, item.blockType || "")
        ? options.section
        : defaultBuilderSectionForItem(item, working.items);
      const nextItem = normalizeStoredItem({
        ...item,
        builderSection: nextSection,
        managedBy: options.managedBy || ""
      }, working.items);
      if (!nextItem) return false;
      const insertAt = getBuilderInsertIndex(working.items, nextSection);
      working.items.splice(insertAt, 0, nextItem);
      if (nextItem.managedBy === "mode") working.modeKey = nextItem.key || nextItem.title;
      if (nextItem.managedBy === "lens") working.lensKey = nextItem.key || nextItem.title;
      if (Array.isArray(working.ui.expandedBlocks) && !working.ui.expandedBlocks.includes(builderItemKey(nextItem))) {
        working.ui.expandedBlocks.push(builderItemKey(nextItem));
      }
      working.ui.lastActiveSection = nextSection;
      save();
      return true;
    },
    setStackName(value) {
      stackName = (value || "").trim() || "untitled-stack";
      save();
    },
    setTaskInput(value) {
      getWorkingState().runtime.lastInput = value || "";
      save();
    },
    setPromptInput(placeholder, value) {
      const runtime = getWorkingState().runtime;
      if (!runtime.promptInputs || typeof runtime.promptInputs !== "object") {
        runtime.promptInputs = {};
      }
      if (!placeholder) return;
      if (value && value.trim()) {
        runtime.promptInputs[placeholder] = value;
      } else {
        delete runtime.promptInputs[placeholder];
      }
      save();
    },
    setStartMode() {},
    setModeKey(value) {
      applyManagedSelection("mode", value);
    },
    setLensKey(value) {
      applyManagedSelection("lens", value);
    },
    setPickerState(sectionKey = "", query = "") {
      const working = getWorkingState();
      working.ui.pickerSection = sectionKey;
      working.ui.pickerQuery = query;
      if (sectionKey) working.ui.lastActiveSection = sectionKey;
      save();
    },
    toggleSection(sectionKey) {
      const working = getWorkingState();
      working.ui.collapsed[sectionKey] = !working.ui.collapsed[sectionKey];
      save();
    },
    setBlockExpanded(key, expanded) {
      const working = getWorkingState();
      const expandedBlocks = new Set(working.ui.expandedBlocks || []);
      if (expanded) expandedBlocks.add(key);
      else expandedBlocks.delete(key);
      working.ui.expandedBlocks = [...expandedBlocks];
      save();
    },
    updateBlockCopy(key, value) {
      withWorkingItems((items, working) => {
        const item = items.find((entry) => builderItemKey(entry) === key);
        if (!item) return;
        item.copy = value;
        working.ui.expandedBlocks = Array.from(new Set([...(working.ui.expandedBlocks || []), key]));
      });
    },
    remove(key) {
      let removed = null;
      withWorkingItems((items, working) => {
        const index = items.findIndex((entry) => builderItemKey(entry) === key);
        if (index < 0) return;
        removed = {
          item: cloneBuilderStateValue(items[index]),
          section: items[index].builderSection,
          indexInSection: getBuilderSectionItems(items, items[index].builderSection)
            .findIndex((entry) => builderItemKey(entry) === key)
        };
        items.splice(index, 1);
        working.ui.expandedBlocks = (working.ui.expandedBlocks || []).filter((entryKey) => entryKey !== key);
      });
      return removed;
    },
    restoreRemoved(snapshot) {
      if (!snapshot?.item) return false;
      const working = getWorkingState();
      const item = normalizeStoredItem(snapshot.item, working.items);
      if (!item) return false;
      const insertAt = getBuilderInsertIndex(working.items, snapshot.section || item.builderSection, snapshot.indexInSection ?? null);
      item.builderSection = snapshot.section || item.builderSection;
      working.items.splice(insertAt, 0, item);
      save();
      return true;
    },
    clear() {
      const working = getWorkingState();
      working.items = [];
      working.modeKey = "";
      working.lensKey = "";
      working.ui = createBuilderUiState();
      working.runtime = {
        ...createBuilderRuntimeState(),
        lastInput: working.runtime.lastInput || ""
      };
      save();
    },
    move(key, dir) {
      const item = this.items.find((entry) => builderItemKey(entry) === key);
      if (!item) return;
      const sectionItems = this.getSectionItems(item.builderSection);
      const sectionIndex = sectionItems.findIndex((entry) => builderItemKey(entry) === key);
      if (sectionIndex < 0) return;
      this.moveToSection(key, item.builderSection, sectionIndex + dir);
    },
    moveToSection(key, sectionKey, indexInSection = null) {
      const working = getWorkingState();
      const srcIndex = working.items.findIndex((entry) => builderItemKey(entry) === key);
      if (srcIndex < 0) return false;
      const movingItem = working.items[srcIndex];
      if (!isValidBuilderSection(sectionKey, movingItem.blockType || "")) return false;
      const [item] = working.items.splice(srcIndex, 1);
      item.builderSection = sectionKey;
      const insertAt = getBuilderInsertIndex(working.items, sectionKey, indexInSection);
      working.items.splice(insertAt, 0, item);
      working.ui.lastActiveSection = sectionKey;
      save();
      return true;
    },
    reorder(srcKey, tgtKey) {
      const target = this.items.find((entry) => builderItemKey(entry) === tgtKey);
      if (!target) return false;
      const sectionItems = this.getSectionItems(target.builderSection);
      const indexInSection = sectionItems.findIndex((entry) => builderItemKey(entry) === tgtKey);
      return this.moveToSection(srcKey, target.builderSection, indexInSection);
    },
    setChain() {},
    setInput() {},
    restore(newItems, meta = {}) {
      workingState = createBuilderWorkingState({
        items: (Array.isArray(newItems) ? newItems : [])
          .map((item) => normalizeStoredItem(item))
          .filter(Boolean),
        runtime: {
          ...createBuilderRuntimeState(),
          lastInput: typeof meta.taskInput === "string" ? meta.taskInput : ""
        }
      });
      if (typeof meta.stackName === "string" && meta.stackName.trim()) {
        stackName = meta.stackName.trim();
      }
      save();
    },
    assemble(options = {}) {
      const resolveInputs = !!options.resolveInputs;
      const inputValues = resolveInputs ? (options.inputValues || {}) : {};
      const parts = BUILDER_SECTION_ORDER
        .map((sectionKey) => {
          const section = getBuilderSection(sectionKey);
          const items = this.getSectionItems(sectionKey).filter((item) => item.copy && item.copy.trim());
          if (items.length === 0) return "";
          return `## ${section.label}\n\n${items.map((item) => `### ${humanizeBlockTitle(item.title)}\n${resolveInputs ? fillPromptTemplate(item.copy.trim(), inputValues) : item.copy.trim()}`).join("\n\n")}`;
        })
        .filter(Boolean);
      return parts.join("\n\n---\n\n");
    }
  };
})();

/** Tracks the key of the last stack loaded into the builder ("" when none). */
let loadedStackKey = "";

/** @type {{ blocks: number; stacks: number }} */
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
    const path = ["Stack"];
    if (item.family) path.push(item.family);
    return path;
  }

  const path = ["Block", blockTypeLabel(item.blockType)];
  if (item.group) path.push(item.group);
  if (item.family && !path.includes(item.family)) path.push(item.family);
  return path;
}

function getOntologyLabel(item) {
  return getOntologyPath(item).join(" / ");
}

function bodyCopy(item) {
  if (item.copy) return item.copy;
  return (item.body || [])
    .map(([label, text]) => `${label}:\n${text.replace(/`([^`]+)`/g, "$1")}`)
    .join("\n\n");
}
function escHtml(str = "") {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/**
 * @param {PromptKitItem} item
 */
function createCard(item) {
  /** @type {HTMLTemplateElement} */
  const template = /** @type {HTMLTemplateElement} */ (document.getElementById("card-template"));
  /** @type {HTMLElement} */
  const card = /** @type {HTMLElement} */ (template.content.firstElementChild.cloneNode(true));
  const label = getOntologyLabel(item);
  const searchText = [
    item.section,
    item.blockType,
    item.sourceKind,
    item.family,
    item.job,
    item.useWhen,
    item.stage,
    item.outputKind,
    item.effort,
    item.stakes,
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
  card.dataset.itemType = item.section === "Stack" ? "stack" : "block";
  card.dataset.discoveryRole = getDiscoveryRole(item);
  card.dataset.familyGroup = getDiscoveryFamily(item);
  card.dataset.stageGroup = getDiscoveryStage(item);
  card.dataset.tagKeys = getItemTagKeys(item).join(",");
  card.dataset.stackFamily = item.family || "";
  card.dataset.stackStage = item.stage || "";
  card.dataset.stackOutputKind = item.outputKind || "";
  card.dataset.stackEffort = item.effort || "";
  card.dataset.stackStakes = item.stakes || "";
  card.querySelector(".card-meta").textContent = label;
  card.querySelector(".card-meta").dataset.section = item.section;

  card.querySelector("h3").textContent = item.title;
  card.querySelector(".card-summary").textContent = item.summary;
  const cardSubmeta = card.querySelector(".card-submeta");
  const cardDetails = card.querySelector(".card-details");
  const addChooser = card.querySelector(".card-add-chooser");
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
    card.dataset.stackEffort = item.effort || getStackEffort(item);
    const countBadge = document.createElement("span");
    countBadge.className = "stack-size-badge";
    countBadge.textContent = `${stackRefs.length} block${stackRefs.length !== 1 ? "s" : ""}`;
    card.querySelector(".card-meta").appendChild(countBadge);

    if (cardSubmeta) {
      const metaPills = [
        item.job ? `Job: ${item.job}` : "",
        item.stage ? `Stage: ${STACK_STAGE_LABELS[item.stage] || titleCaseWords(item.stage)}` : "",
        item.outputKind ? `Output: ${STACK_OUTPUT_KIND_LABELS[item.outputKind] || titleCaseWords(item.outputKind)}` : "",
        (item.effort || getStackEffort(item)) ? `Effort: ${STACK_EFFORT_LABELS[item.effort || getStackEffort(item)] || titleCaseWords(item.effort || getStackEffort(item))}` : "",
        item.stakes ? `Stakes: ${STACK_STAKES_LABELS[item.stakes] || titleCaseWords(item.stakes)}` : ""
      ].filter(Boolean);

      if (metaPills.length > 0) {
        cardSubmeta.hidden = false;
        cardSubmeta.innerHTML = metaPills.map((text) => `<span class="meta-pill">${escHtml(text)}</span>`).join("");
      } else {
        cardSubmeta.hidden = true;
      }
    }
  } else if (cardSubmeta) {
    cardSubmeta.hidden = true;
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
    addBtn.textContent = "Load Stack";
    addBtn.removeAttribute("aria-pressed");
    addBtn.dataset.stackSteps = steps.map((s) => `${s.section}:${s.title}`).join(",");
    addBtn.addEventListener("click", () => {
      const prevItems = builderState.items.map((i) => ({ ...i }));
      const prevStack = builderState.stackName;
      const prevLoadedStackKey = loadedStackKey;
      builderState.clear();
      builderState.setStackName(item.job || slugify(item.title) || "loaded-stack");
      steps.forEach((step) => builderState.add(step));
      loadedStackKey = item.key;
      if (!document.querySelector(".shell").classList.contains("builder-open")) openBuilder();
      renderBuilder();
      addBtn.dataset.stackFlashing = "1";
      addBtn.textContent = "Loaded";
      setTimeout(() => {
        delete addBtn.dataset.stackFlashing;
        addBtn.textContent = "Load Stack";
        syncAddButtons();
      }, 1500);
      syncAddButtons();
      if (typeof showBuilderToast === "function") {
        showBuilderToast(`Loaded "${item.title}"`, "Undo", () => {
          builderState.restore(prevItems, { stackName: prevStack });
          loadedStackKey = prevLoadedStackKey;
          renderBuilder();
          syncAddButtons();
        });
      }
    });
  } else {
    const hasBuilderContent = !!(item.copy || (item.body && item.body.length > 0));
    if (hasBuilderContent) {
      const itemKey = `${item.section}:${item.title}`;
      card.draggable = true;
      card.dataset.builderRef = item.key || `${item.blockType}.${slugify(item.title)}`;
      addBtn.dataset.key = itemKey;
      addBtn.addEventListener("click", () => {
        const existingItem = getExistingBuilderItem(item);
        const validTargets = getManualAddTargets(item);
        if (validTargets.length <= 1) {
          const targetSection = validTargets[0] || defaultBuilderSectionForItem(item);
          if (existingItem) {
            builderState.moveToSection(builderItemKey(existingItem), targetSection);
          } else {
            builderState.add(item, { section: targetSection });
          }
          if (!document.querySelector(".shell").classList.contains("builder-open")) openBuilder();
          renderBuilder();
          syncAddButtons();
          return;
        }
        addChooser.hidden = !addChooser.hidden;
      });
      if (addChooser) {
        const targets = getManualAddTargets(item);
        addChooser.innerHTML = targets.map((sectionKey) => `
          <button type="button" class="card-add-target" data-section-target="${escHtml(sectionKey)}">${escHtml(getBuilderSection(sectionKey).label)}</button>
        `).join("");
        addChooser.querySelectorAll("[data-section-target]").forEach((btn) => {
          btn.addEventListener("click", () => {
            const targetSection = btn.dataset.sectionTarget || defaultBuilderSectionForItem(item);
            const existingItem = getExistingBuilderItem(item);
            if (existingItem) {
              builderState.moveToSection(builderItemKey(existingItem), targetSection);
            } else {
              builderState.add(item, { section: targetSection });
            }
            addChooser.hidden = true;
            if (!document.querySelector(".shell").classList.contains("builder-open")) openBuilder();
            renderBuilder();
            syncAddButtons();
          });
        });
      }
    } else {
      addBtn.remove();
    }
  }

  const hasExpandable = !!(item.copy || (item.body && item.body.length > 0));
  if (hasExpandable) {
    detailsBtn.setAttribute("aria-controls", detailsId);
    detailsBtn.addEventListener("click", () => {
      const open = card.classList.toggle("expanded");
      cardDetails.hidden = !open;
      if (addChooser) addChooser.hidden = true;
      detailsBtn.setAttribute("aria-expanded", String(open));
      detailsBtn.textContent = open ? "Close" : "Preview";
    });
  } else {
    detailsBtn.remove();
  }

  return card;
}

/** @type {HTMLInputElement} */
const search = /** @type {HTMLInputElement} */ (document.getElementById("search"));
const filterCount = document.getElementById("filter-count");
const filterClear = document.getElementById("filter-clear");

// ─── Filter state & logic ─────────────────────────────────────────────────────

/** @type {{ text: string; itemTypes: string[]; blockRoles: string[]; families: string[]; stages: string[]; tags: string[] }} */
const filterState = {
  text: "",
  itemTypes: [],
  blockRoles: [],
  families: [],
  stages: [],
  tags: []
};

const FILTER_GROUPS = [
  {
    key: "itemTypes",
    label: "Type",
    chips: [
      { label: "Blocks", value: "block" },
      { label: "Stacks", value: "stack" }
    ]
  },
  {
    key: "blockRoles",
    label: "Block Type",
    chips: BUILDER_SECTIONS.map((section) => ({ label: section.label, value: section.key }))
  },
  {
    key: "families",
    label: "Family",
    chips: [
      { label: "Thinking", value: "thinking" },
      { label: "Decision", value: "decision" },
      { label: "Research", value: "research" },
      { label: "Writing", value: "writing" },
      { label: "Planning", value: "planning" },
      { label: "Dev", value: "dev" },
      { label: "Reflection", value: "reflection" },
      { label: "Prompt", value: "prompt" }
    ]
  },
  {
    key: "stages",
    label: "Stage",
    chips: [
      { label: "Explore", value: "explore" },
      { label: "Analyze", value: "analyze" },
      { label: "Decide", value: "decide" }
    ]
  },
  {
    key: "tags",
    label: "Tags",
    chips: []
  }
];

function getAllFilterTags() {
  const counts = new Map();
  [...blocks, ...stacks].forEach((item) => {
    (item.tags || []).forEach((tag) => {
      if (!tag) return;
      counts.set(tag, (counts.get(tag) || 0) + 1);
    });
  });
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([tag]) => ({ label: tag, value: normalizeFilterTag(tag) }));
}

function getTopFilterTags(limit = 10) {
  return getAllFilterTags().slice(0, limit);
}

function applyFilters() {
  const q = filterState.text.toLowerCase();
  const hasFilter = !!(
    q
    || filterState.itemTypes.length
    || filterState.blockRoles.length
    || filterState.families.length
    || filterState.stages.length
    || filterState.tags.length
  );
  let visible = 0;
  const all = document.querySelectorAll(".searchable");

  all.forEach((card) => {
    let show = true;
    if (q && !matchesFuzzySearch(card.dataset.search || "", q)) show = false;
    if (filterState.itemTypes.length > 0 && !filterState.itemTypes.includes(card.dataset.itemType || "")) show = false;
    if (filterState.blockRoles.length > 0) {
      if (card.dataset.itemType !== "block" || !filterState.blockRoles.includes(card.dataset.discoveryRole || "")) show = false;
    }
    if (filterState.families.length > 0 && !filterState.families.includes(card.dataset.familyGroup || "")) show = false;
    if (filterState.stages.length > 0 && !filterState.stages.includes(card.dataset.stageGroup || "")) show = false;
    if (filterState.tags.length > 0) {
      const tagKeys = (card.dataset.tagKeys || "").split(",").filter(Boolean);
      if (!filterState.tags.some((tag) => tagKeys.includes(tag))) show = false;
    }
    card.classList.toggle("hidden", !show);
    if (show) visible += 1;
  });

  document.querySelectorAll(".block-type-section").forEach((sectionEl) => {
    const cards = sectionEl.querySelectorAll(".searchable");
    const hasVisibleCard = [...cards].some((card) => !card.classList.contains("hidden"));
    sectionEl.classList.toggle("hidden", !hasVisibleCard);
  });

  document.querySelectorAll(".stack-family-group").forEach((groupEl) => {
    const cards = groupEl.querySelectorAll(".searchable");
    const hasVisibleCard = [...cards].some((card) => !card.classList.contains("hidden"));
    groupEl.classList.toggle("hidden", !hasVisibleCard);
  });

  if (filterCount) {
    filterCount.textContent = `${visible} of ${all.length} shown`;
    filterCount.hidden = !hasFilter;
  }
  const noResultsEl = document.getElementById("no-results");
  if (noResultsEl) noResultsEl.hidden = visible > 0 || !hasFilter;
  syncFilterUi();
}

function syncFilterUi() {
  const hasFilter = !!(
    filterState.text
    || filterState.itemTypes.length
    || filterState.blockRoles.length
    || filterState.families.length
    || filterState.stages.length
    || filterState.tags.length
  );
  if (filterClear) filterClear.hidden = !hasFilter;
  FILTER_GROUPS.forEach(({ key }) => {
    document.querySelectorAll(`.filter-chip[data-group="${key}"]`).forEach((chip) => {
      chip.classList.toggle("active", filterState[key].includes(chip.dataset.value || ""));
    });
  });
  renderActiveFilters();
}

function toggleFilterValue(groupKey, value) {
  const values = new Set(filterState[groupKey]);
  if (values.has(value)) values.delete(value);
  else values.add(value);
  filterState[groupKey] = [...values];
  applyFilters();
}

function renderFilterGroups() {
  const mount = document.getElementById("filter-groups");
  if (!mount) return;
  FILTER_GROUPS.find((group) => group.key === "tags").chips = getTopFilterTags();
  mount.innerHTML = FILTER_GROUPS.map((group) => {
    const chips = group.chips.map((chip) => `
      <button
        type="button"
        class="filter-chip"
        data-group="${escHtml(group.key)}"
        data-value="${escHtml(chip.value)}"
      >${escHtml(chip.label)}</button>
    `).join("");
    return `
      <div class="filter-group">
        <div class="filter-group-label">${escHtml(group.label)}</div>
        <div class="filter-chips">${chips}</div>
      </div>
    `;
  }).join("");

  mount.querySelectorAll(".filter-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      toggleFilterValue(chip.dataset.group || "", chip.dataset.value || "");
    });
  });
}

function renderActiveFilters() {
  const mount = document.getElementById("active-filters");
  if (!mount) return;
  const active = [];

  FILTER_GROUPS.forEach((group) => {
    const chips = group.key === "tags" ? getAllFilterTags() : group.chips;
    const labels = new Map(chips.map((chip) => [chip.value, chip.label]));
    filterState[group.key].forEach((value) => {
      active.push({
        key: group.key,
        value,
        label: labels.get(value) || value
      });
    });
  });

  mount.hidden = active.length === 0;
  mount.innerHTML = active.length > 0
    ? `
      <div class="active-filters-label">Active:</div>
      ${active.map((entry) => `
        <button type="button" class="active-filter-chip" data-group="${escHtml(entry.key)}" data-value="${escHtml(entry.value)}">
          ${escHtml(entry.label)} <span aria-hidden="true">&times;</span>
        </button>
      `).join("")}
    `
    : "";

  mount.querySelectorAll(".active-filter-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      toggleFilterValue(chip.dataset.group || "", chip.dataset.value || "");
    });
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
      section.appendChild(head);

      const grid = document.createElement("div");
      grid.className = "card-grid";
      grid.dataset.blockTypeGrid = type;
      items.forEach((item) => grid.appendChild(createCard(item)));
      section.appendChild(grid);

      mount.appendChild(section);
    });
}

function renderCards() {
  const stacksMount = document.getElementById("stacks-grid");
  if (stacksMount) {
    stacksMount.innerHTML = "";
    const EFFORT_RANK = Object.fromEntries(STACK_EFFORT_ORDER.map((value, index) => [value, index]));
    const seen = new Set();
    const familyOrder = [
      ...STACK_FAMILY_ORDER.filter((f) => stacks.some((s) => s.family === f)),
      ...stacks.map((s) => s.family || "Other").filter((f) => { if (!seen.has(f) && !STACK_FAMILY_ORDER.includes(f)) { seen.add(f); return true; } return false; })
    ];
    familyOrder.forEach((familyName) => {
      const familyItems = stacks
        .filter((item) => (item.family || "Other") === familyName)
        .sort((a, b) => {
          const ca = getStackBlockCount(a);
          const cb = getStackBlockCount(b);
          const ea = EFFORT_RANK[getStackEffort(a)] ?? 99;
          const eb = EFFORT_RANK[getStackEffort(b)] ?? 99;
          return ea !== eb ? ea - eb : ca - cb;
        });
      if (familyItems.length === 0) return;
      const group = document.createElement("div");
      group.className = "stack-family-group";
      const head = document.createElement("div");
      head.className = "block-subgroup-head";
      head.innerHTML = `<span class="block-subgroup-label">${escHtml(familyName)}</span><span class="block-subgroup-count">${familyItems.length}</span>`;
      const grid = document.createElement("div");
      grid.className = "card-grid";
      familyItems.forEach((item) => grid.appendChild(createCard(item)));
      group.appendChild(head);
      group.appendChild(grid);
      stacksMount.appendChild(group);
    });
  }

  renderGroupedBlocks();
}

search.addEventListener("input", () => {
  filterState.text = search.value.trim();
  applyFilters();
});

function setFilter(value) {
  const next = (value || "").trim();
  const normalizedTag = normalizeFilterTag(next);
  const knownTag = getAllFilterTags().some((chip) => chip.value === normalizedTag);
  if (knownTag) {
    toggleFilterValue("tags", normalizedTag);
    return;
  }
  if (filterState.text.toLowerCase() === next.toLowerCase()) {
    filterState.text = "";
  } else {
    filterState.text = next;
  }
  search.value = filterState.text;
  applyFilters();
  if (!filterState.text) search.blur();
}

document.addEventListener("click", (event) => {
  const chooser = event.target.closest(".card-add-chooser");
  const addButton = event.target.closest(".add-btn");
  if (chooser || addButton) return;
  document.querySelectorAll(".card-add-chooser").forEach((element) => {
    element.hidden = true;
  });
});

if (filterClear) {
  filterClear.addEventListener("click", () => {
    filterState.text = "";
    filterState.itemTypes = [];
    filterState.blockRoles = [];
    filterState.families = [];
    filterState.stages = [];
    filterState.tags = [];
    search.value = "";
    applyFilters();
    search.focus();
  });
}

const noResultsClear = document.getElementById("no-results-clear");
if (noResultsClear) {
  noResultsClear.addEventListener("click", () => {
    filterState.text = "";
    filterState.itemTypes = [];
    filterState.blockRoles = [];
    filterState.families = [];
    filterState.stages = [];
    filterState.tags = [];
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
    countEl.textContent = String(sectionCounts.blocks);
    blocksLink.appendChild(countEl);
  }

  const stacksLink = document.querySelector('.nav a[href="#stacks"]');
  if (stacksLink && !stacksLink.querySelector(".nav-count")) {
    const countEl = document.createElement("span");
    countEl.className = "nav-count";
    countEl.textContent = String(sectionCounts.stacks);
    stacksLink.appendChild(countEl);
  }
}

// Keyboard shortcuts: / focuses search, Esc clears, b toggles builder
document.addEventListener("keydown", (e) => {
  const active = document.activeElement;
  const inInput = active && (active.tagName === "INPUT" || active.tagName === "TEXTAREA");
  const builderOpen = document.querySelector(".shell").classList.contains("builder-open");
  if (e.key === "/" && !inInput && !builderOpen) {
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
  const hasContent = !!(item.copy || (item.body && item.body.length > 0));
  const inBuilder = builderState.has(item);
  stepPopoverEl.innerHTML = `
    <div class="sp-label">${escHtml(label)}</div>
    <div class="sp-title">${escHtml(item.title)}</div>
    ${item.summary ? `<div class="sp-summary">${escHtml(item.summary)}</div>` : ""}
    <div class="sp-actions">
      <button class="sp-view-btn" type="button">View block</button>
      ${hasContent ? `<button class="sp-add-btn" type="button"${inBuilder ? " disabled" : ""}>${inBuilder ? "In builder" : "Add"}</button>` : ""}
    </div>
  `;
  stepPopoverEl.hidden = false;
  stepPopoverEl.querySelector(".sp-view-btn").addEventListener("click", () => {
    hideStepPopoverNow();
    scrollToCard(item);
  });
  const spAddBtn = stepPopoverEl.querySelector(".sp-add-btn");
  if (spAddBtn) {
    spAddBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (builderState.has(item)) return;
      builderState.add(item);
      if (!document.querySelector(".shell").classList.contains("builder-open")) openBuilder();
      renderBuilder();
      syncAddButtons();
      spAddBtn.textContent = "In builder";
      spAddBtn.disabled = true;
    });
  }
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
  const related = e.relatedTarget instanceof Element ? e.relatedTarget : null;
  if (pill && !(related && pill.contains(related))) hideStepPopover();
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
