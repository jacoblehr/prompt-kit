type PromptKitBlockType =
  | "frame"
  | "mode"
  | "strategy"
  | "recurse"
  | "guardrail"
  | "schema"
  | "rubric";

type PromptKitBlockForm =
  | "compact"
  | "full_task"
  | "concept"
  | "rubric"
  | "mode"
  | "strategy"
  | "recurse";

type PromptKitStage =
  | "frame"
  | "explore"
  | "analyze"
  | "decide"
  | "critique"
  | "refine"
  | "conclude";

type PromptKitStrength = "light" | "medium" | "heavy";
type PromptKitStackFamily =
  | "Thinking & Framing"
  | "Deciding & Prioritising"
  | "Research & Analysis"
  | "Writing & Communication"
  | "Planning & Execution"
  | "Critique & Review"
  | "Prompt Craft"
  | "Developer Workflows";
type PromptKitStackOutputKind =
  | "clarity"
  | "options"
  | "decision"
  | "plan"
  | "brief"
  | "summary"
  | "critique"
  | "diagnosis"
  | "draft"
  | "retrospective"
  | "prompt";
type PromptKitStackEffort = "quick" | "standard" | "deep";
type PromptKitStackStakes = "low" | "medium" | "high";

type BuilderView = "simple" | "advanced";
type BuilderStartMode = "free" | "guided";

type PromptKitBodyEntry = [string, string];

interface PromptKitBlockContract {
  purpose?: string;
  useWhen?: string;
  expects?: string;
  adds?: string;
  returns?: string[];
  pairsWith?: string[];
  avoidWhen?: string;
}

interface PromptKitStackContract {
  job?: string;
  useWhen?: string;
  minimumBlocks?: string[];
  fullSequence?: string[];
  blockOrderRationale?: string;
  commonSwaps?: string;
  commonFailureMode?: string;
  chooseInsteadWhen?: string;
}

interface PromptKitStackIO {
  usefulInputs?: string[];
  expectedOutputs?: string[];
}

interface PromptKitStackComposition {
  phaseOrder?: string;
  primaryMode?: string;
  modeRefs?: string[];
  hasSchema?: boolean;
  hasQualityGate?: boolean;
  hasBoundedRecursion?: boolean;
  needsModeHandoff?: boolean;
  needsRecursionBoundary?: boolean;
  strengths?: string[];
}

interface PromptKitItem {
  section: string;
  canonicalType?: PromptKitBlockType | string;
  blockType?: PromptKitBlockType | string;
  form?: PromptKitBlockForm | string;
  sourceKind?: string;
  stage?: PromptKitStage | string;
  strength?: PromptKitStrength | string;
  contract?: PromptKitBlockContract | PromptKitStackContract;
  io?: PromptKitStackIO;
  composition?: PromptKitStackComposition;
  job?: string;
  useWhen?: string;
  outputKind?: PromptKitStackOutputKind | string;
  effort?: PromptKitStackEffort | string;
  stakes?: PromptKitStackStakes | string;
  key?: string;
  aliases?: string[];
  title: string;
  summary?: string;
  tags?: string[];
  copy?: string;
  body?: PromptKitBodyEntry[];
  family?: PromptKitStackFamily | string;
  group?: string;
  sourcePath?: string;
}

interface PromptKitBuilderItem {
  section: string;
  key?: string;
  blockType: PromptKitBlockType | string;
  sourceKind: string;
  family: string;
  group: string;
  title: string;
  summary: string;
  copy: string;
  contract?: PromptKitBlockContract | PromptKitStackContract | null;
  useWhen?: string;
  builderSection?: "instruction" | "reasoning" | "output" | "checks" | string;
  managedBy?: "mode" | "lens" | "" | string;
  chains: Record<string, string>;
  inputs: Record<string, string | { source?: "previous" | "original" | "custom" | string; customValue?: string }>;
}

interface PromptKitSiteData {
  blocks: PromptKitItem[];
  stacks: PromptKitItem[];
  featuredStacks?: Array<{
    title: string;
    description: string;
    tags: string[];
    refs: string[];
  }>;
  meta: {
    blockTypeOrder?: PromptKitBlockType[];
    blockTypeLabels?: Record<string, string>;
    stackFamilyOrder?: string[];
    stackStageOrder?: string[];
    stackOutputKindOrder?: string[];
    stackEffortOrder?: string[];
    stackStakesOrder?: string[];
  };
}

interface BuilderSlotDefinition {
  key: PromptKitBlockType;
  label: string;
  optional: boolean;
  help: string;
}

interface BuilderSectionDefinition {
  key: string;
  label: string;
  description: string;
  emptyLabel: string;
  emptyPrompt: string;
  starterRefs: string[];
  required: boolean;
  validBlockTypes: string[];
}

interface Element {
  dataset: DOMStringMap;
  value: string;
  files: FileList | null;
  disabled: boolean;
  hidden: boolean;
  showModal(): void;
  close(): void;
  focus(): void;
  content: DocumentFragment;
  style: CSSStyleDeclaration;
  offsetHeight: number;
}

interface EventTarget {
  closest(selectors: string): Element | null;
  matches(selectors: string): boolean;
  value: string;
  files: FileList | null;
  dataset: DOMStringMap;
  disabled: boolean;
  focus(): void;
  close(): void;
}

interface Event {
  clientX: number;
  clientY: number;
}

interface PromptKitApp {
  catalog?: PromptKitSiteData;
  meta: PromptKitSiteData["meta"];
  applyFilters(): void;
  blockTypeLabel(blockType?: string): string;
  builderItemKey(item?: Partial<PromptKitItem>): string;
  builderState: {
    items: PromptKitBuilderItem[];
    load(): void;
    has(item: PromptKitItem | PromptKitBuilderItem): boolean;
    add(item: PromptKitItem | PromptKitBuilderItem, options?: Record<string, string>): boolean;
  };
  assembleBuilderPrompt(options?: { structured?: boolean; inputPlan?: unknown }): string;
  closeBuilder(): void;
  defaultBuilderSectionForItem(item: Partial<PromptKitItem>, _currentItems?: PromptKitBuilderItem[]): string;
  escHtml(str?: string): string;
  extractPlaceholders(text?: string): string[];
  getBuilderSection(sectionKey?: string): BuilderSectionDefinition;
  getExistingBuilderItem(item?: Partial<PromptKitItem>): PromptKitBuilderItem | null;
  humanizeBlockTitle(title?: string): string;
  isValidBuilderSection(sectionKey?: string, blockType?: string): boolean;
  matchesFuzzySearch(haystack?: string, query?: string): boolean;
  normalizeBuilderInputLabel(placeholder?: string): string;
  openBuilder(): void;
  renderBuilder(): void;
  renderCards(): void;
  renderFilterGroups(): void;
  renderRecentItems(): void;
  resolveRef(ref?: string): PromptKitItem | null;
  showBuilderToast(message: string, actionLabel?: string, onAction?: (() => void) | null): void;
  syncAddButtons(): void;
  syncFilterUi(): void;
  updateNavCounts(): void;
  [key: string]: unknown;
}

interface Window {
  PromptKit: PromptKitApp;
}

declare var SITE_DATA: PromptKitSiteData | undefined;
