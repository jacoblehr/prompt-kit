import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

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

function read(relPath) {
  return fs.readFileSync(path.join(ROOT, relPath), "utf8").replace(/\r\n/g, "\n");
}

function write(relPath, content) {
  fs.writeFileSync(path.join(ROOT, relPath), content);
}

function list(relPath) {
  return fs.readdirSync(path.join(ROOT, relPath)).sort((a, b) => a.localeCompare(b));
}

function listDirs(relPath) {
  return list(relPath).filter((name) => fs.statSync(path.join(ROOT, relPath, name)).isDirectory());
}

function orderNames(names, preferredOrder) {
  const order = new Map(preferredOrder.map((name, index) => [name, index]));
  return [...names].sort((a, b) => {
    const aRank = order.has(a) ? order.get(a) : Number.MAX_SAFE_INTEGER;
    const bRank = order.has(b) ? order.get(b) : Number.MAX_SAFE_INTEGER;
    if (aRank !== bRank) return aRank - bRank;
    return a.localeCompare(b);
  });
}

function slugify(text = "") {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function ensureSentence(text = "") {
  const trimmed = text.trim();
  if (!trimmed) return "";
  return /[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`;
}

function firstHeading(md) {
  const match = md.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : "";
}

function stripFirstHeading(md) {
  const lines = md.split("\n");
  const firstHeadingIndex = lines.findIndex((line) => /^#\s+/.test(line));
  return lines.slice(firstHeadingIndex + 1).join("\n").trim();
}

function extractLeadLine(md) {
  const lines = md.split("\n");
  const start = lines.findIndex((line) => /^#\s+/.test(line));
  for (let i = start + 1; i < lines.length; i += 1) {
    const line = lines[i].trim();
    if (!line) continue;
    if (line.endsWith(":")) continue;
    if (line.startsWith("```")) continue;
    return line;
  }
  return "";
}

function extractCodeBlock(md) {
  const match = md.match(/```(?:[a-z]+)?\n([\s\S]*?)```/i);
  return match ? match[1].trim() : "";
}

function extractSectionItems(md, labelOptions) {
  const labels = new Set((Array.isArray(labelOptions) ? labelOptions : [labelOptions]).map((label) => label.toLowerCase()));
  const lines = md.split("\n");
  let start = -1;

  for (let i = 0; i < lines.length; i += 1) {
    if (labels.has(lines[i].trim().toLowerCase())) {
      start = i + 1;
      break;
    }
  }

  if (start === -1) return [];

  const items = [];
  for (let i = start; i < lines.length; i += 1) {
    const line = lines[i].trim();
    if (!line) continue;
    if (/^```/.test(line)) break;
    if (/^#+\s+/.test(line)) break;
    if (/^[A-Za-z][A-Za-z /-]+:$/.test(line)) break;

    const bullet = line.match(/^[-*]\s+(.*)$/);
    if (bullet) {
      items.push(bullet[1].trim());
      continue;
    }

    const numbered = line.match(/^\d+\.\s+(.*)$/);
    if (numbered) {
      items.push(numbered[1].trim());
    }
  }

  return items;
}

function joinItems(items) {
  return items.join(", ");
}

function makeTags(...parts) {
  const words = parts
    .join(" ")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter((word) => word && word.length > 2 && !STOP_WORDS.has(word));
  return unique(words).slice(0, 5);
}

function makeBlock({
  blockType,
  key,
  title,
  summary,
  tags,
  copy = "",
  body = [],
  family = "",
  group = "",
  sourceKind = "",
  aliases = [],
  sourcePath = ""
}) {
  return {
    section: "Block",
    blockType,
    sourceKind,
    key,
    aliases: unique(aliases),
    title,
    summary,
    tags,
    copy,
    body,
    family,
    group,
    sourcePath
  };
}

function extractDomainTags(md) {
  return extractSectionItems(md, "domain tags:");
}

function resolvedTags(md, ...fallbackParts) {
  const domain = extractDomainTags(md);
  return domain.length > 0 ? unique(domain).slice(0, 5) : makeTags(...fallbackParts);
}

function makeMode(dirName) {
  const relPath = `modes/${dirName}/README.md`;
  const md = read(relPath);
  const title = firstHeading(md).replace(/\s+Mode$/, "");
  const useWhen = extractSectionItems(md, "Use when:");
  const optimizes = extractSectionItems(md, "Optimizes for:");
  const suppresses = extractSectionItems(md, "Suppresses:");
  const exitWhen = extractSectionItems(md, "Exit when:");

  return makeBlock({
    blockType: "mode",
    sourceKind: "Mode",
    key: `mode.${slugify(title)}`,
    title,
    summary: ensureSentence(`Use when ${useWhen[0] || title.toLowerCase()}`),
    tags: resolvedTags(md, title),
    copy: extractCodeBlock(md),
    body: [
      ["Use when", joinItems(useWhen)],
      ["Optimizes for", joinItems(optimizes)],
      ["Suppresses", joinItems(suppresses)],
      ["Exit when", joinItems(exitWhen)]
    ].filter(([, text]) => text),
    sourcePath: relPath
  });
}

function makeStrategy(dirName) {
  const relPath = `strategies/${dirName}/README.md`;
  const md = read(relPath);
  const title = firstHeading(md);
  const useWhen = extractSectionItems(md, "Use when:");
  const prevents = extractSectionItems(md, "Helps prevent:");
  const howToUse = extractSectionItems(md, ["How to use it:", "How to use:"]);

  return makeBlock({
    blockType: "strategy",
    sourceKind: "Strategy",
    key: `strategy.${slugify(title)}`,
    aliases: [`strategy.${dirName}`],
    title,
    summary: ensureSentence(`Use when ${useWhen[0] || title.toLowerCase()}`),
    tags: resolvedTags(md, title),
    copy: extractCodeBlock(md),
    body: [
      ["Use when", joinItems(useWhen)],
      ["Helps prevent", joinItems(prevents)],
      ["How to use", joinItems(howToUse)]
    ].filter(([, text]) => text),
    sourcePath: relPath
  });
}

function makePromptBlock(dirName) {
  const readmePath = `prompts/blocks/${dirName}/README.md`;
  const promptPath = `prompts/blocks/${dirName}/prompt.md`;
  const readme = read(readmePath);
  const prompt = read(promptPath);
  const title = firstHeading(readme).replace(/\s+Block$/, "");
  const bestUse = extractSectionItems(readme, "Best use:");
  const hyphenAlias = dirName.includes(".") ? dirName.replace(/\./g, "-") : "";

  return makeBlock({
    blockType: "core",
    sourceKind: "Prompt Block",
    key: `core.${dirName}`,
    aliases: hyphenAlias ? [`core.${hyphenAlias}`] : [],
    title,
    summary: ensureSentence(extractLeadLine(readme)),
    tags: resolvedTags(readme, title, dirName),
    copy: stripFirstHeading(prompt),
    body: bestUse.length > 0 ? [["Best use", joinItems(bestUse)]] : [],
    sourcePath: promptPath
  });
}

const SNIPPET_FAMILY = {
  // Thinking & Framing
  "generate-options":              "Thinking & Framing",
  "brainstorm-angles":             "Thinking & Framing",
  "reframe-the-problem":           "Thinking & Framing",
  "analogical-reasoning":          "Thinking & Framing",
  "hypothesis-generation":         "Thinking & Framing",
  "clarify-task":                  "Thinking & Framing",
  "define-success-metrics":        "Thinking & Framing",
  "argument-structure":            "Thinking & Framing",
  // Deciding & Prioritising
  "compare-options":               "Deciding & Prioritising",
  "choose-under-uncertainty":      "Deciding & Prioritising",
  "explore-exploit-decision":      "Deciding & Prioritising",
  "prioritize-opportunities":      "Deciding & Prioritising",
  "scenario-planning":             "Deciding & Prioritising",
  "trend-analysis":                "Deciding & Prioritising",
  "second-order-effects":          "Deciding & Prioritising",
  "design-cheap-test":             "Deciding & Prioritising",
  "risk-register":                 "Deciding & Prioritising",
  "stress-test-assumptions":       "Deciding & Prioritising",
  "forecast":                      "Deciding & Prioritising",
  // Planning & Execution
  "plan-next-actions":             "Planning & Execution",
  "process-audit":                 "Planning & Execution",
  "rollout-plan":                  "Planning & Execution",
  "delegation-brief":              "Planning & Execution",
  "dependency-map":                "Planning & Execution",
  "milestone-design":              "Planning & Execution",
  // Writing & Communication
  "write-first-draft":             "Writing & Communication",
  "rewrite-for-clarity":           "Writing & Communication",
  "critique-argument":             "Writing & Communication",
  "position-draft":                "Writing & Communication",
  "feedback-request":              "Writing & Communication",
  "negotiation-prep":              "Writing & Communication",
  "communication-brief":           "Writing & Communication",
  "executive-summary":             "Writing & Communication",
  "persuasion-audit":              "Writing & Communication",
  // Research & Synthesis
  "summarize-source":              "Research & Synthesis",
  "synthesize-sources":            "Research & Synthesis",
  "extract-insights":              "Research & Synthesis",
  "cause-mapping":                 "Research & Synthesis",
  "research-questions":            "Research & Synthesis",
  "gap-analysis":                  "Research & Synthesis",
  "competitive-analysis":          "Research & Synthesis",
  "interview-synthesis":           "Research & Synthesis",
  // Review & Reflection
  "blind-spot-check":              "Review & Reflection",
  "stakeholder-map":               "Review & Reflection",
  "meeting-prep":                  "Review & Reflection",
  "debug-confusion":               "Review & Reflection",
  "decision-journal-entry":        "Review & Reflection",
  "weekly-review":                 "Review & Reflection",
  // Software Engineering
  "code-review":                   "Software Engineering",
  "refactor-plan":                 "Software Engineering",
  "test-strategy":                 "Software Engineering",
  "requirements-decomposition":    "Software Engineering",
  "incident-postmortem":           "Software Engineering",
  "security-review":               "Software Engineering",
  "api-design":                    "Software Engineering",
  "performance-analysis":          "Software Engineering",
  "database-design":               "Software Engineering",
  "onboarding-audit":              "Software Engineering",
  // Statistics
  "statistical-significance-check": "Statistics",
  "correlation-vs-causation":      "Statistics",
  "experiment-design":             "Statistics",
  "data-quality-check":            "Statistics",
  "metric-design":                 "Statistics",
  "interpret-regression":          "Statistics",
  // Prompt Craft
  "prompt-critique":               "Prompt Craft",
  "prompt-rewrite":                "Prompt Craft",
  "prompt-compare":                "Prompt Craft",
  "prompt-decompose":              "Prompt Craft",
  "prompt-chain-design":           "Prompt Craft"
};

function makeSnippetBlock(fileName) {
  const relPath = `prompts/snippets/${fileName}`;
  const md = read(relPath);
  const baseName = fileName.replace(/\.md$/, "");
  const title = firstHeading(md);
  const family = SNIPPET_FAMILY[baseName] || "";

  return makeBlock({
    blockType: "snippet",
    sourceKind: "Snippet",
    key: `core.${baseName}`,
    aliases: [`snippet.${slugify(title)}`],
    title,
    summary: ensureSentence(extractLeadLine(md)),
    tags: resolvedTags(md, title, family, baseName),
    copy: extractCodeBlock(md),
    body: [],
    family,
    sourcePath: relPath
  });
}

function makeLensBlock(group, fileName) {
  const relPath = `prompts/concepts/${group}/${fileName}`;
  const md = read(relPath);
  const title = firstHeading(md);
  const titleWithoutPrefix = title.replace(/^[^:]+:\s*/, "");
  const groupLabel = group
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

  return makeBlock({
    blockType: "lens",
    sourceKind: "Lens",
    key: `lens.${slugify(titleWithoutPrefix)}`,
    aliases: [`lens.${slugify(title)}`],
    title: titleWithoutPrefix,
    summary: ensureSentence(extractLeadLine(md)),
    tags: resolvedTags(md, titleWithoutPrefix, groupLabel, fileName.replace(/\.md$/, "")),
    copy: extractCodeBlock(md),
    body: [],
    group: groupLabel,
    sourcePath: relPath
  });
}

const STACK_FAMILY = {
  // Thinking & Framing
  "clarify-the-real-job":           "Thinking & Framing",
  "ethical-review":                 "Thinking & Framing",
  "fast-ideation":                  "Thinking & Framing",
  "frame-the-ask":                  "Thinking & Framing",
  "orient-before-acting":           "Thinking & Framing",
  "problem-framing":                "Thinking & Framing",
  "prompt-repair":                  "Thinking & Framing",
  "quick-sense-check":              "Thinking & Framing",
  "scenario-futures":               "Thinking & Framing",
  "unblock-stuck-problem":          "Thinking & Framing",
  // Deciding & Prioritising
  "de-risk-with-test":              "Deciding & Prioritising",
  "explore-to-decision":            "Deciding & Prioritising",
  "explore-vs-exploit":             "Deciding & Prioritising",
  "full-decision-process":          "Deciding & Prioritising",
  "prioritize-portfolio":           "Deciding & Prioritising",
  // Planning & Execution
  "define-and-measure":             "Planning & Execution",
  "design-for-outcomes":            "Planning & Execution",
  "map-adoption-blockers":          "Planning & Execution",
  "pressure-test-plan":             "Planning & Execution",
  "product-design-sprint":          "Planning & Execution",
  "ship-a-feature":                 "Planning & Execution",
  // Research & Synthesis
  "audit-the-argument":             "Research & Synthesis",
  "deep-research-synthesis":        "Research & Synthesis",
  "evidence-to-decision":           "Research & Synthesis",
  "interpret-an-experiment":        "Research & Synthesis",
  "learn-from-content":             "Research & Synthesis",
  "source-to-brief":                "Research & Synthesis",
  // Writing & Communication
  "communicate-a-change":           "Writing & Communication",
  "negotiate-a-deal":               "Writing & Communication",
  "stakeholder-alignment":          "Writing & Communication",
  "write-critique-rewrite":         "Writing & Communication",
  // Review & Reflection
  "after-action-review":            "Review & Reflection",
  "capture-and-act":                "Review & Reflection",
  "decision-review":                "Review & Reflection",
  "project-retrospective":          "Review & Reflection",
  "weekly-review":                  "Review & Reflection",
  // Software Engineering
  "code-review":                    "Software Engineering",
  "debug-a-failure":                "Software Engineering",
  "debug-a-system":                 "Software Engineering",
  "feature-design":                 "Software Engineering",
  "hypothesis-driven-development":  "Software Engineering",
  "incident-response":              "Software Engineering",
  "performance-investigation":      "Software Engineering",
  "security-threat-model":          "Software Engineering",
  "technical-architecture-review":  "Software Engineering",
  "technical-debt-triage":          "Software Engineering",
  // Statistics
  "causal-inference":               "Statistics",
  "data-to-story":                  "Statistics",
  "design-a-study":                 "Statistics",
  "forecast-and-decide":            "Statistics",
  "measure-feature-impact":         "Statistics",
  // Writing & Communication
  "deliver-feedback":               "Writing & Communication",
  "develop-a-position":             "Writing & Communication",
  "write-a-proposal":               "Writing & Communication",
  // Deciding & Prioritising
  "prioritise-under-constraints":   "Deciding & Prioritising",
  "risk-informed-decision":         "Deciding & Prioritising",
  // Prompt Craft
  "ai-workflow-design":             "Prompt Craft",
  "build-a-system-prompt":          "Prompt Craft",
  "evaluate-model-output":          "Prompt Craft",
  "prompt-engineering-sprint":      "Prompt Craft"
};

function makeStack(fileName) {
  const relPath = `stacks/${fileName}`;
  const md = read(relPath);
  const title = firstHeading(md).replace(/^Stack:\s*/, "");
  const useWhen = extractLeadLine(md);
  const inputs = extractSectionItems(md, "Useful inputs:");
  const sequence = extractSectionItems(md, ["Suggested blocks:", "Suggested sequence:"]);
  const outputs = extractSectionItems(md, ["Expected outcome:", "Expected output:"]);

  const baseName = fileName.replace(/\.md$/, "");
  const family = STACK_FAMILY[baseName] || "";

  return {
    section: "Stack",
    key: `stack.${slugify(title)}`,
    title,
    family,
    summary: ensureSentence(useWhen),
    tags: resolvedTags(md, title, baseName),
    body: [
      ["Useful inputs", joinItems(inputs)],
      ["Suggested blocks", sequence.join(" -> ")],
      ["Expected outcome", joinItems(outputs)]
    ].filter(([, text]) => text),
    sourcePath: relPath
  };
}

function makeRubric(fileName) {
  const relPath = `rubrics/${fileName}`;
  const md = read(relPath);
  const title = firstHeading(md);
  const questions = extractSectionItems(md, "Questions:");

  return makeBlock({
    blockType: "rubric",
    sourceKind: "Rubric",
    key: `rubric.${slugify(title)}`,
    title,
    summary: ensureSentence(extractLeadLine(md)),
    tags: resolvedTags(md, title, fileName.replace(/\.md$/, "")),
    body: questions.length > 0 ? [["Questions", joinItems(questions)]] : [],
    sourcePath: relPath
  });
}

const modeOrder = ["explore", "decide", "critique", "reflect"];
const strategyOrder = ["problem_split", "premortem", "steelman", "inversion", "red_team"];
const promptBlockOrder = [
  "frame.task",
  "frame.success-criteria",
  "guardrail.uncertainty",
  "guardrail.disconfirming-evidence",
  "assumption.audit",
  "scope.frame",
  "schema.decision-memo",
  "schema.execution-brief"
];
const snippetOrder = [
  // Ideation & generation
  "generate-options.md",
  "brainstorm-angles.md",
  "reframe-the-problem.md",
  "analogical-reasoning.md",
  "hypothesis-generation.md",
  // Framing & clarification
  "clarify-task.md",
  "define-success-metrics.md",
  "argument-structure.md",
  // Decision & prioritisation
  "compare-options.md",
  "choose-under-uncertainty.md",
  "explore-exploit-decision.md",
  "prioritize-opportunities.md",
  // Foresight & risk
  "scenario-planning.md",
  "trend-analysis.md",
  "second-order-effects.md",
  "design-cheap-test.md",
  "risk-register.md",
  "stress-test-assumptions.md",
  // Planning & execution
  "plan-next-actions.md",
  "process-audit.md",
  "rollout-plan.md",
  "delegation-brief.md",
  // Writing & communication
  "write-first-draft.md",
  "rewrite-for-clarity.md",
  "critique-argument.md",
  "position-draft.md",
  "feedback-request.md",
  "negotiation-prep.md",
  "communication-brief.md",
  // Research & synthesis
  "summarize-source.md",
  "synthesize-sources.md",
  "extract-insights.md",
  "cause-mapping.md",
  "research-questions.md",
  // Reflection & review
  "blind-spot-check.md",
  "stakeholder-map.md",
  "meeting-prep.md",
  "debug-confusion.md",
  "decision-journal-entry.md",
  "weekly-review.md",
  // Software engineering
  "code-review.md",
  "refactor-plan.md",
  "test-strategy.md",
  "requirements-decomposition.md",
  // Statistics
  "statistical-significance-check.md",
  "correlation-vs-causation.md",
  // Prompt engineering
  "prompt-critique.md",
  "prompt-rewrite.md",
  "prompt-compare.md"
];
const stackOrder = [
  // Small (≤3) — quick-start stacks
  "quick-sense-check.md",
  "fast-ideation.md",
  "frame-the-ask.md",
  "capture-and-act.md",
  "audit-the-argument.md",
  "orient-before-acting.md",
  "clarify-the-real-job.md",
  "design-for-outcomes.md",
  "map-adoption-blockers.md",
  // Medium (4–5) — focused workflows
  "problem-framing.md",
  "define-and-measure.md",
  "unblock-stuck-problem.md",
  "scenario-futures.md",
  "ethical-review.md",
  "communicate-a-change.md",
  "explore-vs-exploit.md",
  "de-risk-with-test.md",
  "pressure-test-plan.md",
  "prioritize-portfolio.md",
  "code-review.md",
  "debug-a-failure.md",
  "debug-a-system.md",
  "interpret-an-experiment.md",
  "technical-architecture-review.md",
  "source-to-brief.md",
  "learn-from-content.md",
  "after-action-review.md",
  "negotiate-a-deal.md",
  "write-critique-rewrite.md",
  "weekly-review.md",
  // Large (6+) — deep end-to-end sequences
  "ship-a-feature.md",
  "full-decision-process.md",
  "product-design-sprint.md",
  "deep-research-synthesis.md",
  "stakeholder-alignment.md",
  "prompt-repair.md",
  "explore-to-decision.md",
];
const rubricOrder = [
  "decision-quality.md",
  "argument-quality.md",
  "strategy-quality.md",
  "plan-quality.md",
  "research-quality.md",
  "writing-quality.md",
  "reflection-quality.md",
  "prompt-quality.md"
];

const modes = orderNames(listDirs("modes"), modeOrder).map((dirName) => makeMode(dirName));
const strategies = orderNames(listDirs("strategies"), strategyOrder).map((dirName) => makeStrategy(dirName));
const promptBlocks = orderNames(listDirs("prompts/blocks"), promptBlockOrder).map((dirName) => makePromptBlock(dirName));
const snippetBlocks = orderNames(list("prompts/snippets"), snippetOrder)
  .filter((fileName) => fileName.endsWith(".md") && fileName !== "README.md")
  .map((fileName) => makeSnippetBlock(fileName));
const lensBlocks = [
  ...list("prompts/concepts/game-theory").filter((fileName) => fileName.endsWith(".md")).map((fileName) => makeLensBlock("game-theory", fileName)),
  ...list("prompts/concepts/psychology").filter((fileName) => fileName.endsWith(".md")).map((fileName) => makeLensBlock("psychology", fileName)),
  ...list("prompts/concepts/computer-science").filter((fileName) => fileName.endsWith(".md")).map((fileName) => makeLensBlock("computer-science", fileName)),
  ...list("prompts/concepts/economics").filter((fileName) => fileName.endsWith(".md")).map((fileName) => makeLensBlock("economics", fileName)),
  ...list("prompts/concepts/systems-thinking").filter((fileName) => fileName.endsWith(".md")).map((fileName) => makeLensBlock("systems-thinking", fileName)),
  ...list("prompts/concepts/philosophy").filter((fileName) => fileName.endsWith(".md")).map((fileName) => makeLensBlock("philosophy", fileName)),
  ...list("prompts/concepts/statistics").filter((fileName) => fileName.endsWith(".md")).map((fileName) => makeLensBlock("statistics", fileName)),
  ...list("prompts/concepts/design").filter((fileName) => fileName.endsWith(".md")).map((fileName) => makeLensBlock("design", fileName))
];
const rubricBlocks = orderNames(list("rubrics"), rubricOrder)
  .filter((fileName) => fileName.endsWith(".md") && fileName !== "README.md")
  .map((fileName) => makeRubric(fileName));
const stacks = orderNames(list("stacks"), stackOrder)
  .filter((fileName) => fileName.endsWith(".md") && fileName !== "README.md")
  .map((fileName) => makeStack(fileName));

const blocks = [
  ...modes,
  ...strategies,
  ...promptBlocks,
  ...snippetBlocks,
  ...lensBlocks,
  ...rubricBlocks
];

const featuredStacks = [
  {
    title: "Frame an Unknown Problem",
    description: "When you are not sure what you are actually solving. Explores breadth, frames the task, decomposes it, and surfaces uncertainty before any commitment.",
    tags: ["framing", "clarity", "explore"],
    refs: ["mode.explore", "core.frame.task", "strategy.problem-split", "core.scope.frame", "core.guardrail.uncertainty"]
  },
  {
    title: "Make a Risky Decision",
    description: "When real options exist and the stakes matter. Sets criteria, steelmans alternatives, audits assumptions, and captures the final choice.",
    tags: ["decide", "rigor", "high-stakes"],
    refs: ["mode.decide", "core.frame.success-criteria", "strategy.steelman", "core.assumption.audit", "core.schema.decision-memo"]
  },
  {
    title: "Explore or Exploit",
    description: "When the real question is whether to keep searching or commit now. Forces the tradeoff between additional information and the cost of delay, then turns the answer into an immediate move.",
    tags: ["decision", "exploration", "timing"],
    refs: ["mode.decide", "core.frame.success-criteria", "core.explore-exploit-decision", "core.guardrail.uncertainty", "core.schema.execution-brief"]
  },
  {
    title: "Prioritize a Portfolio",
    description: "When several good-looking bets compete for scarce resources. Defines criteria, ranks the field, and turns the winner into an execution brief.",
    tags: ["prioritization", "portfolio", "focus"],
    refs: ["mode.decide", "core.frame.success-criteria", "core.prioritize-opportunities", "core.schema.execution-brief", "core.guardrail.uncertainty"]
  },
  {
    title: "De-Risk Before Committing",
    description: "When a direction looks promising but the real blocker is uncertainty. Designs the cheapest credible test and makes the next checkpoint explicit.",
    tags: ["experiment", "de-risk", "execution"],
    refs: ["mode.decide", "core.frame.success-criteria", "core.design-cheap-test", "core.schema.execution-brief", "core.guardrail.uncertainty"]
  },
  {
    title: "Pressure Test a Plan",
    description: "Before committing to execution. Runs adversarial critique, premortem, and stress test to surface the plan's biggest vulnerabilities.",
    tags: ["critique", "risk", "pre-commit"],
    refs: ["mode.critique", "strategy.premortem", "strategy.red-team", "core.assumption.audit", "core.stress-test-assumptions"]
  },
  {
    title: "Debug a Failure",
    description: "When a bug, incident, or broken workflow needs a structured diagnosis. Localizes the failure, checks the boundary, and turns the next move into a concrete debug plan.",
    tags: ["debugging", "incident", "diagnosis"],
    refs: ["mode.critique", "lens.debugger-loop", "lens.interface-contract-review", "lens.invariant-check", "core.plan-next-actions"]
  },
  {
    title: "Write and Sharpen",
    description: "For content that needs to be good, not just done. Drafts fast, then critiques rigorously, then rewrites for clarity.",
    tags: ["writing", "critique", "revision"],
    refs: ["core.write-first-draft", "mode.critique", "core.critique-argument", "core.rewrite-for-clarity", "rubric.writing-quality"]
  },
  {
    title: "After-Action Review",
    description: "When an outcome exists and the risk is repeating the same mistake. Maps causes, records the decision, and checks that reflection was actually useful.",
    tags: ["reflect", "learning", "retrospective"],
    refs: ["mode.reflect", "core.cause-mapping", "core.decision-journal-entry", "rubric.reflection-quality"]
  },
  {
    title: "Improve a Prompt",
    description: "When a prompt is underperforming. Critiques the current version, rewrites it, compares variants, and checks against a quality rubric.",
    tags: ["prompting", "iteration", "repair"],
    refs: ["mode.critique", "core.prompt-critique", "core.prompt-rewrite", "core.prompt-compare", "rubric.prompt-quality"]
  },
  {
    title: "Map Incentives",
    description: "When behavior is not making sense or you are designing for a multi-player situation. Audits incentives, checks signals, and captures the analysis.",
    tags: ["game theory", "incentives", "analysis"],
    refs: ["mode.explore", "lens.incentive-audit", "lens.signaling-check", "core.schema.decision-memo"]
  },
  {
    title: "Align Stakeholders",
    description: "When the technical answer is not enough and alignment is the actual bottleneck. Maps stakeholders, checks coordination dynamics, and prepares the next conversation.",
    tags: ["alignment", "stakeholders", "coordination"],
    refs: ["mode.explore", "core.stakeholder-map", "lens.coordination-plan", "lens.signaling-check", "core.meeting-prep", "core.schema.execution-brief"]
  },
  {
    title: "Turn Sources Into Action",
    description: "When notes, transcripts, or dense source material need to become something decision-useful quickly. Distills the source, extracts what matters, and maps the next investigation or action.",
    tags: ["research", "synthesis", "briefing"],
    refs: ["mode.explore", "core.summarize-source", "core.extract-insights", "core.research-questions", "core.plan-next-actions"]
  },
  {
    title: "Check for Bias",
    description: "When a judgment or decision may be distorted. Reviews cognitive biases, steelmans alternatives, and guardrails against false certainty.",
    tags: ["psychology", "bias", "rigor"],
    refs: ["mode.critique", "lens.bias-check", "strategy.steelman", "core.guardrail.disconfirming-evidence", "core.guardrail.uncertainty"]
  }
];

const data = {
  blocks,
  stacks,
  featuredStacks
};

const output = `// Generated by scripts/build-site-data.mjs. Do not edit by hand.\nglobalThis.SITE_DATA = ${JSON.stringify(data, null, 2)};\n`;

write("site-data.js", output);
console.log(`Wrote site-data.js with ${blocks.length + stacks.length + featuredStacks.length} entries.`);
