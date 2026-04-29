const BLOCK_TYPE_ORDER = ["frame", "mode", "strategy", "recurse", "guardrail", "schema", "rubric"];

const BLOCK_TYPE_LABELS = {
  frame: "Frame",
  mode: "Mode",
  strategy: "Strategy",
  recurse: "Recurse",
  guardrail: "Guardrail",
  schema: "Schema",
  rubric: "Rubric"
};

const STACK_FAMILY_ORDER = [
  "Thinking & Framing",
  "Deciding & Prioritising",
  "Research & Analysis",
  "Writing & Communication",
  "Planning & Execution",
  "Critique & Review",
  "Prompt Craft",
  "Developer Workflows"
];

const STACK_STAGE_ORDER = ["frame", "explore", "analyze", "decide", "critique", "refine", "conclude"];
const STACK_OUTPUT_KIND_ORDER = ["clarity", "options", "decision", "plan", "brief", "summary", "critique", "diagnosis", "draft", "retrospective", "prompt"];
const STACK_EFFORT_ORDER = ["quick", "standard", "deep"];
const STACK_STAKES_ORDER = ["low", "medium", "high"];

const STOP_WORDS = new Set([
  "and",
  "are",
  "block",
  "blocks",
  "check",
  "for",
  "from",
  "into",
  "mode",
  "prompt",
  "schema",
  "stack",
  "strategy",
  "the",
  "this",
  "use",
  "when",
  "with",
  "you",
  "your"
]);

const STACK_META = {
  "frame-problem": { family: "Thinking & Framing", stage: "frame", outputKind: "clarity", stakes: "low" },
  "branch-select": { family: "Thinking & Framing", stage: "explore", outputKind: "options", stakes: "medium" },
  "decompose-solve": { family: "Thinking & Framing", stage: "analyze", outputKind: "plan", stakes: "medium" },
  "refine-loop": { family: "Thinking & Framing", stage: "refine", outputKind: "plan", stakes: "medium" },
  "decide": { family: "Deciding & Prioritising", stage: "decide", outputKind: "decision", stakes: "high" },
  "review-decision": { family: "Deciding & Prioritising", stage: "conclude", outputKind: "retrospective", stakes: "medium" },
  "risk-decision": { family: "Deciding & Prioritising", stage: "decide", outputKind: "decision", stakes: "high" },
  "research": { family: "Research & Analysis", stage: "analyze", outputKind: "summary", stakes: "medium" },
  "hypothesis-test": { family: "Research & Analysis", stage: "analyze", outputKind: "brief", stakes: "high" },
  "align-stakeholders": { family: "Writing & Communication", stage: "decide", outputKind: "plan", stakes: "medium" },
  "develop-position": { family: "Writing & Communication", stage: "refine", outputKind: "draft", stakes: "medium" },
  "negotiate": { family: "Writing & Communication", stage: "decide", outputKind: "brief", stakes: "high" },
  "feature-design": { family: "Planning & Execution", stage: "frame", outputKind: "plan", stakes: "high" },
  "ship-feature": { family: "Planning & Execution", stage: "decide", outputKind: "plan", stakes: "high" },
  "critique": { family: "Critique & Review", stage: "critique", outputKind: "critique", stakes: "medium" },
  "ethical-review": { family: "Critique & Review", stage: "critique", outputKind: "critique", stakes: "high" },
  "pressure-test": { family: "Critique & Review", stage: "critique", outputKind: "critique", stakes: "high" },
  "improve-prompt": { family: "Prompt Craft", stage: "refine", outputKind: "prompt", stakes: "medium" },
  "build-system-prompt": { family: "Prompt Craft", stage: "frame", outputKind: "prompt", stakes: "medium" },
  "debug": { family: "Developer Workflows", stage: "analyze", outputKind: "diagnosis", stakes: "high" },
  "implement-change": { family: "Developer Workflows", stage: "decide", outputKind: "plan", stakes: "high" },
  "review-code": { family: "Developer Workflows", stage: "critique", outputKind: "critique", stakes: "high" },
  "architecture-review": { family: "Developer Workflows", stage: "critique", outputKind: "critique", stakes: "high" },
  "incident-response": { family: "Developer Workflows", stage: "analyze", outputKind: "plan", stakes: "high" },
  "break-recurring-incident": { family: "Developer Workflows", stage: "conclude", outputKind: "plan", stakes: "high" },
  "safe-migration": { family: "Developer Workflows", stage: "decide", outputKind: "plan", stakes: "high" },
  "security-threat-model": { family: "Developer Workflows", stage: "critique", outputKind: "critique", stakes: "high" }
};

const MODE_ORDER = ["explore", "decide", "critique", "reflect"];
const STRATEGY_ORDER = ["problem-split", "premortem", "steelman", "red-team"];
const PROMPT_BLOCK_ORDER = [
  "frame.task",
  "frame.success-criteria",
  "guardrail.uncertainty",
  "guardrail.disconfirming-evidence",
  "guardrail.assumption-audit",
  "schema.decision-memo",
  "schema.execution-brief"
];
const RUBRIC_ORDER = [
  "decision-quality",
  "argument-quality",
  "plan-quality",
  "research-method",
  "research-quality",
  "writing-quality"
];

const STACK_ORDER = [
  "frame-problem.md",
  "branch-select.md",
  "decompose-solve.md",
  "refine-loop.md",
  "decide.md",
  "review-decision.md",
  "risk-decision.md",
  "research.md",
  "hypothesis-test.md",
  "align-stakeholders.md",
  "develop-position.md",
  "negotiate.md",
  "feature-design.md",
  "ship-feature.md",
  "critique.md",
  "ethical-review.md",
  "pressure-test.md",
  "improve-prompt.md",
  "build-system-prompt.md",
  "debug.md",
  "implement-change.md",
  "review-code.md",
  "architecture-review.md",
  "incident-response.md",
  "break-recurring-incident.md",
  "safe-migration.md",
  "security-threat-model.md"
];

const FEATURED_STACKS = [
  {
    title: "Frame an Unknown Problem",
    description: "When you are not sure what you are actually solving. Explores breadth, frames the task, decomposes it, and surfaces uncertainty before any commitment.",
    tags: ["framing", "clarity", "explore"],
    refs: ["mode.explore", "frame.task", "strategy.problem-split", "guardrail.uncertainty"]
  },
  {
    title: "Make a Risky Decision",
    description: "When real options exist and the stakes matter. Sets criteria, steelmans alternatives, audits assumptions, and captures the final choice.",
    tags: ["decide", "rigor", "high-stakes"],
    refs: ["mode.decide", "frame.success-criteria", "strategy.steelman", "guardrail.assumption-audit", "schema.decision-memo"]
  },
  {
    title: "Explore or Exploit",
    description: "When the real question is whether to keep searching or commit now. Forces the tradeoff between additional information and the cost of delay.",
    tags: ["decision", "exploration", "timing"],
    refs: ["mode.decide", "frame.success-criteria", "guardrail.uncertainty", "guardrail.disconfirming-evidence", "schema.execution-brief"]
  },
  {
    title: "Prioritize and Execute",
    description: "When several good-looking bets compete for scarce resources. Defines criteria, ranks the field, and turns the winner into an execution brief.",
    tags: ["prioritization", "portfolio", "focus"],
    refs: ["mode.decide", "frame.success-criteria", "guardrail.assumption-audit", "schema.execution-brief"]
  },
  {
    title: "Pressure Test a Plan",
    description: "Before committing to execution. Runs adversarial critique, premortem, and red-team to surface the plan's biggest vulnerabilities.",
    tags: ["critique", "risk", "pre-commit"],
    refs: ["mode.critique", "strategy.premortem", "strategy.red-team", "guardrail.assumption-audit", "guardrail.disconfirming-evidence"]
  },
  {
    title: "Debug a Failure",
    description: "When a bug, incident, or broken workflow needs a structured diagnosis. Starts with task framing, critiques likely causes, maps causal chain, and turns the next move into a concrete plan.",
    tags: ["debugging", "incident", "diagnosis"],
    refs: ["mode.explore", "frame.task", "mode.critique", "frame.cause-mapping", "schema.execution-brief"]
  },
  {
    title: "After-Action Review",
    description: "When an outcome exists and the risk is repeating the same mistake. Maps causes, extracts reusable lessons, and assigns follow-on actions.",
    tags: ["reflect", "learning", "retrospective"],
    refs: ["mode.reflect", "frame.cause-mapping", "frame.extract-insights", "schema.execution-brief"]
  },
  {
    title: "Improve a Prompt",
    description: "When a prompt is underperforming. Frames the task, critiques the current version, audits for uncertainty, and rewrites against a quality rubric.",
    tags: ["prompting", "iteration", "repair"],
    refs: ["frame.task", "mode.critique", "guardrail.uncertainty", "rubric.writing-quality"]
  },
  {
    title: "Decompose and Solve",
    description: "When a problem is too large to solve directly. Breaks it recursively into leaf-level problems, evaluates each answer, and synthesizes the result.",
    tags: ["recursion", "decomposition", "problem-solving"],
    refs: ["frame.task", "recurse.decompose", "recurse.evaluate", "guardrail.bounded-recursion"]
  },
  {
    title: "Research to Decision",
    description: "When you need a well-grounded view before deciding. Extracts insights, forces disconfirmation, maps causes, and checks research quality.",
    tags: ["research", "synthesis", "briefing"],
    refs: ["mode.explore", "frame.extract-insights", "guardrail.disconfirming-evidence", "frame.cause-mapping", "rubric.research-quality"]
  }
];

const CATALOG_META = {
  blockTypeOrder: BLOCK_TYPE_ORDER,
  blockTypeLabels: BLOCK_TYPE_LABELS,
  stackFamilyOrder: STACK_FAMILY_ORDER,
  stackStageOrder: STACK_STAGE_ORDER,
  stackOutputKindOrder: STACK_OUTPUT_KIND_ORDER,
  stackEffortOrder: STACK_EFFORT_ORDER,
  stackStakesOrder: STACK_STAKES_ORDER
};

export {
  BLOCK_TYPE_LABELS,
  BLOCK_TYPE_ORDER,
  CATALOG_META,
  FEATURED_STACKS,
  MODE_ORDER,
  PROMPT_BLOCK_ORDER,
  RUBRIC_ORDER,
  STACK_EFFORT_ORDER,
  STACK_FAMILY_ORDER,
  STACK_META,
  STACK_ORDER,
  STACK_OUTPUT_KIND_ORDER,
  STACK_STAGE_ORDER,
  STACK_STAKES_ORDER,
  STOP_WORDS,
  STRATEGY_ORDER
};
