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

function extractSectionText(md, heading) {
  const lines = md.split("\n");
  const headingRegex = new RegExp(`^#{1,6}\\s+${heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*$`, "i");
  let start = -1;

  for (let i = 0; i < lines.length; i += 1) {
    if (headingRegex.test(lines[i].trim())) {
      start = i + 1;
      break;
    }
  }

  if (start === -1) return "";

  const sectionLines = [];
  for (let i = start; i < lines.length; i += 1) {
    const line = lines[i];
    const trimmed = line.trim();
    if (/^#{1,6}\s+/.test(trimmed)) break;
    if (/^---+$/.test(trimmed)) break;
    sectionLines.push(line);
  }

  return sectionLines.join("\n").trim();
}

function firstSentence(text = "") {
  const trimmed = text.replace(/\s+/g, " ").trim();
  if (!trimmed) return "";
  const match = trimmed.match(/^.*?[.!?](?:\s|$)/);
  return match ? match[0].trim() : trimmed;
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

function extractHeadingItems(md, heading) {
  const text = extractSectionText(md, heading);
  if (!text) return [];

  const items = [];
  text.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) return;
    const bullet = trimmed.match(/^[-*]\s+(.*)$/);
    if (bullet) {
      items.push(bullet[1].trim());
      return;
    }
    const numbered = trimmed.match(/^\d+\.\s+(.*)$/);
    if (numbered) {
      items.push(numbered[1].trim());
    }
  });

  return items;
}

function extractMetadata(md) {
  const lines = md.split("\n");
  let start = -1;

  for (let i = 0; i < lines.length; i += 1) {
    const trimmed = lines[i].trim().toLowerCase();
    if (trimmed === "## metadata" || trimmed === "metadata:") {
      start = i + 1;
      break;
    }
  }

  if (start === -1) return {};

  const metadata = {};
  for (let i = start; i < lines.length; i += 1) {
    const trimmed = lines[i].trim();
    if (!trimmed) continue;
    if (/^---+$/.test(trimmed) || /^#{1,6}\s+/.test(trimmed)) break;
    const match = trimmed.match(/^-\s+([^:]+):\s*(.*)$/);
    if (!match) continue;
    metadata[match[1].trim().toLowerCase()] = match[2].trim();
  }

  return metadata;
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

function parseInlineRefs(text = "") {
  return [...text.matchAll(/`([^`]+)`/g)].map((match) => match[1].trim());
}

function inferFormFromSourceKind(sourceKind = "") {
  switch (sourceKind) {
    case "Prompt Block": return "compact";
    case "Snippet": return "full_task";
    case "Lens": return "concept";
    case "Rubric": return "rubric";
    case "Mode": return "mode";
    case "Strategy": return "strategy";
    default: return "";
  }
}

function bodyFromEntries(entries = []) {
  return entries.filter(([, value]) => {
    if (Array.isArray(value)) return value.length > 0;
    return Boolean(value);
  }).map(([label, value]) => [label, Array.isArray(value) ? joinItems(value) : value]);
}

function makeContractFields({
  purpose = "",
  useWhen = "",
  expects = "",
  adds = "",
  returns = [],
  pairsWith = [],
  avoidWhen = ""
} = {}) {
  const contract = {};
  if (purpose) contract.purpose = purpose;
  if (useWhen) contract.useWhen = useWhen;
  if (expects) contract.expects = expects;
  if (adds) contract.adds = adds;
  if (returns.length > 0) contract.returns = returns;
  if (pairsWith.length > 0) contract.pairsWith = pairsWith;
  if (avoidWhen) contract.avoidWhen = avoidWhen;
  return contract;
}

function makeBlock({
  canonicalType,
  blockType = canonicalType,
  key,
  title,
  summary,
  tags,
  copy = "",
  body = [],
  family = "",
  group = "",
  form = "",
  sourceKind = "",
  stage = "",
  strength = "",
  contract = {},
  aliases = [],
  sourcePath = ""
}) {
  return {
    section: "Block",
    canonicalType,
    blockType,
    form,
    sourceKind,
    stage,
    strength,
    contract,
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
  const metadata = extractMetadata(md);
  const title = firstHeading(md).replace(/\s+Mode$/, "");
  const purpose = extractSectionText(md, "Purpose");
  const useWhen = extractSectionText(md, "Use when");
  const expects = extractSectionText(md, "Expects");
  const adds = extractSectionText(md, "Adds");
  const returns = extractHeadingItems(md, "Returns");
  const pairsWith = parseInlineRefs(extractSectionText(md, "Pairs with"));
  const avoidWhen = extractSectionText(md, "Avoid when");
  const optimizes = extractSectionItems(md, "Optimizes for:");
  const suppresses = extractSectionItems(md, "Suppresses:");
  const exitWhen = extractSectionItems(md, "Exit when:");
  const canonicalType = metadata.type || "mode";
  const contract = makeContractFields({ purpose, useWhen, expects, adds, returns, pairsWith, avoidWhen });

  return makeBlock({
    canonicalType,
    form: inferFormFromSourceKind("Mode"),
    sourceKind: "Mode",
    key: title,
    aliases: [`mode.${dirName}`],
    title,
    summary: ensureSentence(firstSentence(purpose || useWhen || `Use when ${title.toLowerCase()}`)),
    tags: resolvedTags(md, title),
    copy: extractCodeBlock(md),
    stage: metadata.stage || "",
    strength: metadata.strength || "",
    contract,
    body: bodyFromEntries([
      ["Purpose", contract.purpose],
      ["Use when", contract.useWhen],
      ["Expects", contract.expects],
      ["Adds", contract.adds],
      ["Returns", contract.returns],
      ["Pairs with", contract.pairsWith],
      ["Avoid when", contract.avoidWhen],
      ["Optimizes for", joinItems(optimizes)],
      ["Suppresses", joinItems(suppresses)],
      ["Exit when", joinItems(exitWhen)]
    ]),
    sourcePath: relPath
  });
}

function makeStrategy(dirName) {
  const relPath = `strategies/${dirName}/README.md`;
  const md = read(relPath);
  const metadata = extractMetadata(md);
  const title = firstHeading(md);
  const purpose = extractSectionText(md, "Purpose");
  const useWhen = extractSectionText(md, "Use when");
  const expects = extractSectionText(md, "Expects");
  const adds = extractSectionText(md, "Adds");
  const returns = extractHeadingItems(md, "Returns");
  const pairsWith = parseInlineRefs(extractSectionText(md, "Pairs with"));
  const avoidWhen = extractSectionText(md, "Avoid when");
  const prevents = extractSectionItems(md, "Helps prevent:");
  const howToUse = extractSectionItems(md, ["How to use it:", "How to use:"]);
  const canonicalType = metadata.type || "strategy";
  const contract = makeContractFields({ purpose, useWhen, expects, adds, returns, pairsWith, avoidWhen });

  return makeBlock({
    canonicalType,
    form: inferFormFromSourceKind("Strategy"),
    sourceKind: "Strategy",
    key: title,
    aliases: [`strategy.${dirName}`],
    title,
    summary: ensureSentence(firstSentence(purpose || useWhen || title)),
    tags: resolvedTags(md, title),
    copy: extractCodeBlock(md),
    stage: metadata.stage || "",
    strength: metadata.strength || "",
    contract,
    body: bodyFromEntries([
      ["Purpose", contract.purpose],
      ["Use when", contract.useWhen],
      ["Expects", contract.expects],
      ["Adds", contract.adds],
      ["Returns", contract.returns],
      ["Pairs with", contract.pairsWith],
      ["Avoid when", contract.avoidWhen],
      ["Helps prevent", joinItems(prevents)],
      ["How to use", joinItems(howToUse)]
    ]),
    sourcePath: relPath
  });
}

function makePromptBlock(dirName) {
  const readmePath = `prompts/blocks/${dirName}/README.md`;
  const promptPath = `prompts/blocks/${dirName}/prompt.md`;
  const readme = read(readmePath);
  const prompt = read(promptPath);
  const metadata = extractMetadata(readme);
  const title = firstHeading(readme).replace(/\s+Block$/, "");
  const canonicalType = metadata.type || title.split(".")[0] || "frame";
  const purpose = extractSectionText(readme, "Purpose");
  const useWhen = extractSectionText(readme, "Use when");
  const expects = extractSectionText(readme, "Expects");
  const adds = extractSectionText(readme, "Adds");
  const returns = extractHeadingItems(readme, "Returns");
  const pairsWith = parseInlineRefs(extractSectionText(readme, "Pairs with"));
  const avoidWhen = extractSectionText(readme, "Avoid when");
  const hyphenAlias = dirName.includes(".") ? dirName.replace(/\./g, "-") : "";
  const contract = makeContractFields({ purpose, useWhen, expects, adds, returns, pairsWith, avoidWhen });

  return makeBlock({
    canonicalType,
    form: inferFormFromSourceKind("Prompt Block"),
    sourceKind: "Prompt Block",
    key: title,
    aliases: [
      `core.${dirName}`,
      hyphenAlias ? `core.${hyphenAlias}` : ""
    ].filter(Boolean),
    title,
    family: canonicalType === "frame" ? "Prompt Blocks" : "",
    summary: ensureSentence(firstSentence(purpose || useWhen || title)),
    tags: resolvedTags(readme, title, dirName),
    copy: stripFirstHeading(prompt),
    stage: metadata.stage || "",
    strength: metadata.strength || "",
    contract,
    body: bodyFromEntries([
      ["Purpose", contract.purpose],
      ["Use when", contract.useWhen],
      ["Expects", contract.expects],
      ["Adds", contract.adds],
      ["Returns", contract.returns],
      ["Pairs with", contract.pairsWith],
      ["Avoid when", contract.avoidWhen]
    ]),
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
  "brief-to-draft":                "Writing & Communication",
  "rewrite-for-clarity":           "Writing & Communication",
  "critique-argument":             "Writing & Communication",
  "position-draft":                "Writing & Communication",
  "feedback-request":              "Writing & Communication",
  "negotiation-prep":              "Writing & Communication",
  "communication-brief":           "Writing & Communication",
  "alignment-conversation-plan":   "Writing & Communication",
  "executive-summary":             "Writing & Communication",
  "persuasion-audit":              "Writing & Communication",
  // Research & Synthesis
  "summarize-source":              "Research & Synthesis",
  "synthesize-sources":            "Research & Synthesis",
  "extract-insights":              "Research & Synthesis",
  "cause-mapping":                 "Research & Synthesis",
  "research-questions":            "Research & Synthesis",
  "competitive-analysis":          "Research & Synthesis",
  "interview-synthesis":           "Research & Synthesis",
  // Review & Reflection
  "blind-spot-check":              "Review & Reflection",
  "stakeholder-map":               "Review & Reflection",
  "triage-the-unknown":            "Review & Reflection",
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
  "bug-reproduction-brief":        "Software Engineering",
  "change-impact-review":          "Software Engineering",
  "codepath-walkthrough":          "Software Engineering",
  "log-triage":                    "Software Engineering",
  "migration-plan":                "Software Engineering",
  "release-readiness":             "Software Engineering",
  "test-case-design":              "Software Engineering",
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
  const metadata = extractMetadata(md);
  const baseName = fileName.replace(/\.md$/, "");
  const family = SNIPPET_FAMILY[baseName] || "";
  const canonicalType = metadata.type || "frame";
  const title = `${canonicalType}.${baseName}`;
  const useWhen = extractLeadLine(md);
  const returns = extractSectionItems(extractCodeBlock(md), ["Return:", "Returns:", "Then return:", "Produce:", "Output:", "Outputs:"]);
  const pairsWith = parseInlineRefs(metadata["pairs with"] || "");
  const expects = extractCodeBlock(md)
    ? extractCodeBlock(md)
      .split("\n")
      .filter((line) => /\{[^}]+\}/.test(line))
      .map((line) => line.replace(/\{[^}]+\}/g, "").replace(/^[-*]\s*/, "").replace(/:\s*$/, "").trim())
      .filter(Boolean)
    : [];
  const contract = makeContractFields({
    useWhen,
    expects: expects.length > 0 ? joinItems(expects) : "",
    returns,
    pairsWith
  });

  return makeBlock({
    canonicalType,
    form: inferFormFromSourceKind("Snippet"),
    sourceKind: "Snippet",
    key: title,
    aliases: [`core.${baseName}`],
    title,
    summary: ensureSentence(firstSentence(useWhen || title)),
    tags: resolvedTags(md, baseName, family),
    copy: extractCodeBlock(md),
    stage: metadata.stage || "",
    strength: metadata.strength || "",
    contract,
    body: bodyFromEntries([
      ["Use when", contract.useWhen],
      ["Expects", contract.expects],
      ["Returns", contract.returns],
      ["Pairs with", contract.pairsWith]
    ]),
    family,
    sourcePath: relPath
  });
}

function makeLensBlock(group, fileName) {
  const relPath = `prompts/concepts/${group}/${fileName}`;
  const md = read(relPath);
  const metadata = extractMetadata(md);
  const title = firstHeading(md);
  const titleWithoutPrefix = title.replace(/^[^:]+:\s*/, "");
  const groupLabel = group
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
  const useWhen = extractLeadLine(md);
  const returns = extractSectionItems(extractCodeBlock(md), ["Return:", "Returns:", "Then return:", "Produce:", "Output:", "Outputs:"]);
  const pairsWith = parseInlineRefs(metadata["pairs with"] || "");
  const contract = makeContractFields({
    useWhen,
    returns,
    pairsWith
  });

  return makeBlock({
    canonicalType: metadata.type || "lens",
    form: inferFormFromSourceKind("Lens"),
    sourceKind: "Lens",
    key: `lens.${slugify(titleWithoutPrefix)}`,
    aliases: [`lens.${slugify(title)}`],
    title: titleWithoutPrefix,
    summary: ensureSentence(firstSentence(useWhen || titleWithoutPrefix)),
    tags: resolvedTags(md, titleWithoutPrefix, groupLabel, fileName.replace(/\.md$/, "")),
    copy: extractCodeBlock(md),
    stage: metadata.stage || "",
    strength: metadata.strength || "",
    contract,
    body: bodyFromEntries([
      ["Use when", contract.useWhen],
      ["Returns", contract.returns],
      ["Pairs with", contract.pairsWith]
    ]),
    group: groupLabel,
    sourcePath: relPath
  });
}

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

const STACK_STAGE_VALUES = ["frame", "explore", "analyze", "decide", "critique", "refine", "conclude"];
const STACK_OUTPUT_KIND_VALUES = ["clarity", "options", "decision", "plan", "brief", "summary", "critique", "diagnosis", "draft", "retrospective", "prompt"];
const STACK_EFFORT_VALUES = ["quick", "standard", "deep"];
const STACK_STAKES_VALUES = ["low", "medium", "high"];

function stackEffortFromCount(count) {
  if (count <= 3) return "quick";
  if (count <= 5) return "standard";
  return "deep";
}

const STACK_META = {
  // Thinking & Framing
  "fast-ideation": { family: "Thinking & Framing", stage: "explore", outputKind: "options", stakes: "low" },
  "frame-the-ask": { family: "Thinking & Framing", stage: "frame", outputKind: "clarity", stakes: "low" },
  "orient-before-acting": { family: "Thinking & Framing", stage: "frame", outputKind: "clarity", stakes: "low" },
  "clarify-the-real-job": { family: "Thinking & Framing", stage: "frame", outputKind: "clarity", stakes: "low" },
  "problem-framing": { family: "Thinking & Framing", stage: "frame", outputKind: "clarity", stakes: "low" },
  "unblock-stuck-problem": { family: "Thinking & Framing", stage: "explore", outputKind: "options", stakes: "low" },
  "scenario-futures": { family: "Thinking & Framing", stage: "explore", outputKind: "options", stakes: "medium" },
  // Deciding & Prioritising
  "explore-vs-exploit": { family: "Deciding & Prioritising", stage: "decide", outputKind: "decision", stakes: "high" },
  "de-risk-with-test": { family: "Deciding & Prioritising", stage: "decide", outputKind: "plan", stakes: "medium" },
  "prioritize-portfolio": { family: "Deciding & Prioritising", stage: "decide", outputKind: "decision", stakes: "high" },
  "full-decision-process": { family: "Deciding & Prioritising", stage: "decide", outputKind: "decision", stakes: "high" },
  "explore-to-decision": { family: "Deciding & Prioritising", stage: "decide", outputKind: "decision", stakes: "medium" },
  "prioritise-under-constraints": { family: "Deciding & Prioritising", stage: "decide", outputKind: "decision", stakes: "high" },
  "risk-informed-decision": { family: "Deciding & Prioritising", stage: "decide", outputKind: "decision", stakes: "high" },
  "forecast-and-decide": { family: "Deciding & Prioritising", stage: "decide", outputKind: "decision", stakes: "high" },
  "evidence-to-decision": { family: "Deciding & Prioritising", stage: "decide", outputKind: "decision", stakes: "high" },
  // Research & Analysis
  "map-adoption-blockers": { family: "Research & Analysis", stage: "analyze", outputKind: "brief", stakes: "medium" },
  "source-to-brief": { family: "Research & Analysis", stage: "analyze", outputKind: "brief", stakes: "medium" },
  "learn-from-content": { family: "Research & Analysis", stage: "conclude", outputKind: "summary", stakes: "medium" },
  "deep-research-synthesis": { family: "Research & Analysis", stage: "analyze", outputKind: "summary", stakes: "medium" },
  "causal-inference": { family: "Research & Analysis", stage: "analyze", outputKind: "brief", stakes: "high" },
  "data-to-story": { family: "Research & Analysis", stage: "conclude", outputKind: "draft", stakes: "medium" },
  "design-a-study": { family: "Research & Analysis", stage: "frame", outputKind: "plan", stakes: "medium" },
  "interpret-an-experiment": { family: "Research & Analysis", stage: "critique", outputKind: "summary", stakes: "medium" },
  "measure-feature-impact": { family: "Research & Analysis", stage: "analyze", outputKind: "brief", stakes: "medium" },
  // Writing & Communication
  "communicate-a-change": { family: "Writing & Communication", stage: "conclude", outputKind: "brief", stakes: "medium" },
  "negotiate-a-deal": { family: "Writing & Communication", stage: "decide", outputKind: "brief", stakes: "high" },
  "write-critique-rewrite": { family: "Writing & Communication", stage: "refine", outputKind: "draft", stakes: "medium" },
  "stakeholder-alignment": { family: "Writing & Communication", stage: "decide", outputKind: "plan", stakes: "medium" },
  "deliver-feedback": { family: "Writing & Communication", stage: "refine", outputKind: "draft", stakes: "low" },
  "develop-a-position": { family: "Writing & Communication", stage: "refine", outputKind: "draft", stakes: "medium" },
  "write-a-proposal": { family: "Writing & Communication", stage: "refine", outputKind: "draft", stakes: "medium" },
  // Planning & Execution
  "design-for-outcomes": { family: "Planning & Execution", stage: "frame", outputKind: "plan", stakes: "medium" },
  "define-and-measure": { family: "Planning & Execution", stage: "frame", outputKind: "plan", stakes: "medium" },
  "product-design-sprint": { family: "Planning & Execution", stage: "decide", outputKind: "plan", stakes: "medium" },
  "ship-a-feature": { family: "Planning & Execution", stage: "decide", outputKind: "plan", stakes: "high" },
  // Critique & Review
  "quick-sense-check": { family: "Critique & Review", stage: "critique", outputKind: "critique", stakes: "low" },
  "audit-the-argument": { family: "Critique & Review", stage: "critique", outputKind: "critique", stakes: "medium" },
  "ethical-review": { family: "Critique & Review", stage: "critique", outputKind: "critique", stakes: "high" },
  "pressure-test-plan": { family: "Critique & Review", stage: "critique", outputKind: "critique", stakes: "high" },
  // Prompt Craft
  "prompt-repair": { family: "Prompt Craft", stage: "refine", outputKind: "prompt", stakes: "medium" },
  "ai-workflow-design": { family: "Prompt Craft", stage: "frame", outputKind: "plan", stakes: "medium" },
  "build-a-system-prompt": { family: "Prompt Craft", stage: "frame", outputKind: "prompt", stakes: "medium" },
  "evaluate-model-output": { family: "Prompt Craft", stage: "critique", outputKind: "critique", stakes: "medium" },
  "prompt-engineering-sprint": { family: "Prompt Craft", stage: "refine", outputKind: "prompt", stakes: "medium" },
  // Developer Workflows
  "code-review": { family: "Developer Workflows", stage: "critique", outputKind: "critique", stakes: "high" },
  "debug-a-failure": { family: "Developer Workflows", stage: "analyze", outputKind: "diagnosis", stakes: "high" },
  "debug-a-system": { family: "Developer Workflows", stage: "analyze", outputKind: "diagnosis", stakes: "high" },
  "technical-architecture-review": { family: "Developer Workflows", stage: "critique", outputKind: "critique", stakes: "high" },
  "break-a-recurring-incident": { family: "Developer Workflows", stage: "conclude", outputKind: "plan", stakes: "high" },
  "feature-design": { family: "Developer Workflows", stage: "frame", outputKind: "plan", stakes: "high" },
  "hypothesis-driven-development": { family: "Developer Workflows", stage: "analyze", outputKind: "plan", stakes: "high" },
  "incident-response": { family: "Developer Workflows", stage: "analyze", outputKind: "plan", stakes: "high" },
  "performance-investigation": { family: "Developer Workflows", stage: "analyze", outputKind: "diagnosis", stakes: "high" },
  "read-before-change": { family: "Developer Workflows", stage: "analyze", outputKind: "diagnosis", stakes: "high" },
  "safe-migration": { family: "Developer Workflows", stage: "decide", outputKind: "plan", stakes: "high" },
  "security-threat-model": { family: "Developer Workflows", stage: "critique", outputKind: "critique", stakes: "high" },
  "technical-debt-triage": { family: "Developer Workflows", stage: "decide", outputKind: "decision", stakes: "high" },
  "trace-to-fix": { family: "Developer Workflows", stage: "analyze", outputKind: "diagnosis", stakes: "high" },
  // Reflection & Learning
  "capture-and-act": { family: "Reflection & Learning", stage: "conclude", outputKind: "plan", stakes: "low" },
  "after-action-review": { family: "Reflection & Learning", stage: "conclude", outputKind: "retrospective", stakes: "low" },
  "weekly-review": { family: "Reflection & Learning", stage: "conclude", outputKind: "retrospective", stakes: "low" },
  "decision-review": { family: "Reflection & Learning", stage: "conclude", outputKind: "retrospective", stakes: "medium" },
  "project-retrospective": { family: "Reflection & Learning", stage: "conclude", outputKind: "retrospective", stakes: "low" }
};

function validateStackMeta(baseNames) {
  const metaNames = Object.keys(STACK_META).sort();
  const stackNames = [...baseNames].sort();
  const missing = stackNames.filter((name) => !metaNames.includes(name));
  const extra = metaNames.filter((name) => !stackNames.includes(name));

  if (missing.length > 0 || extra.length > 0) {
    throw new Error(`STACK_META mismatch. Missing: ${missing.join(", ") || "none"}. Extra: ${extra.join(", ") || "none"}.`);
  }

  stackNames.forEach((name) => {
    const meta = STACK_META[name];
    if (!meta?.family || !meta?.stage || !meta?.outputKind || !meta?.stakes) {
      throw new Error(`STACK_META is incomplete for ${name}.`);
    }
    if (!STACK_FAMILY_ORDER.includes(meta.family)) {
      throw new Error(`Invalid stack family "${meta.family}" for ${name}.`);
    }
    if (!STACK_STAGE_VALUES.includes(meta.stage)) {
      throw new Error(`Invalid stack stage "${meta.stage}" for ${name}.`);
    }
    if (!STACK_OUTPUT_KIND_VALUES.includes(meta.outputKind)) {
      throw new Error(`Invalid stack outputKind "${meta.outputKind}" for ${name}.`);
    }
    if (!STACK_STAKES_VALUES.includes(meta.stakes)) {
      throw new Error(`Invalid stack stakes "${meta.stakes}" for ${name}.`);
    }
  });
}

function makeStack(fileName) {
  const relPath = `stacks/${fileName}`;
  const md = read(relPath);
  const title = firstHeading(md).replace(/^Stack:\s*/, "");
  const useWhen = extractLeadLine(md);
  const inputs = extractSectionItems(md, "Useful inputs:");
  const sequence = extractSectionItems(md, ["Suggested blocks:", "Suggested sequence:"]);
  const outputs = extractSectionItems(md, ["Expected outcome:", "Expected output:"]);
  const minimumBlocksMatch = md.match(/^\*\*Minimum blocks:\*\*\s*(.+)$/m);
  const whyMatch = md.match(/^\*\*Why this order works:\*\*\s*(.+)$/m);
  const swapsMatch = md.match(/^\*\*Common swaps:\*\*\s*(.+)$/m);
  const failureMatch = md.match(/^\*\*Common failure mode:\*\*\s*(.+)$/m);

  const baseName = fileName.replace(/\.md$/, "");
  const meta = STACK_META[baseName];
  if (!meta) {
    throw new Error(`Missing STACK_META entry for ${baseName}.`);
  }
  const family = meta.family;
  const job = baseName;
  const stage = meta.stage;
  const outputKind = meta.outputKind;
  const effort = stackEffortFromCount(sequence.length);
  const stakes = meta.stakes;
  const contract = {
    job,
    useWhen,
    minimumBlocks: parseInlineRefs(minimumBlocksMatch?.[1] || ""),
    fullSequence: sequence,
    blockOrderRationale: whyMatch?.[1]?.trim() || "",
    commonSwaps: swapsMatch?.[1]?.trim() || "",
    commonFailureMode: failureMatch?.[1]?.trim() || ""
  };
  const io = {};
  if (inputs.length > 0) io.usefulInputs = inputs;
  if (outputs.length > 0) io.expectedOutputs = outputs;

  return {
    section: "Stack",
    key: `stack.${slugify(title)}`,
    title,
    family,
    job,
    useWhen,
    stage,
    outputKind,
    effort,
    stakes,
    summary: ensureSentence(useWhen),
    tags: resolvedTags(md, title, baseName),
    contract,
    io,
    body: bodyFromEntries([
      ["Job", contract.job],
      ["Use when", contract.useWhen],
      ["Stage", stage],
      ["Output kind", outputKind],
      ["Effort", effort],
      ["Stakes", stakes],
      ["Useful inputs", inputs],
      ["Minimum blocks", contract.minimumBlocks],
      ["Suggested blocks", sequence.join(" -> ")],
      ["Why this order works", contract.blockOrderRationale],
      ["Common swaps", contract.commonSwaps],
      ["Common failure mode", contract.commonFailureMode],
      ["Expected outcome", outputs]
    ]),
    sourcePath: relPath
  };
}

function makeRubric(fileName) {
  const relPath = `rubrics/${fileName}`;
  const md = read(relPath);
  const metadata = extractMetadata(md);
  const title = firstHeading(md);
  const useWhen = extractLeadLine(md);
  const questions = extractSectionItems(md, "Questions:");
  const pairsWith = parseInlineRefs(md.match(/^Pairs with:\s*(.+)$/m)?.[1] || "");
  const contract = makeContractFields({
    useWhen,
    returns: questions,
    pairsWith
  });

  return makeBlock({
    canonicalType: metadata.type || "rubric",
    form: inferFormFromSourceKind("Rubric"),
    sourceKind: "Rubric",
    key: title,
    aliases: [`rubric.${fileName.replace(/\.md$/, "")}`],
    title,
    summary: ensureSentence(firstSentence(useWhen || title)),
    tags: resolvedTags(md, title, fileName.replace(/\.md$/, "")),
    stage: metadata.stage || "",
    strength: metadata.strength || "",
    contract,
    body: bodyFromEntries([
      ["Use when", contract.useWhen],
      ["Questions", questions],
      ["Pairs with", contract.pairsWith]
    ]),
    sourcePath: relPath
  });
}

const modeOrder = ["explore", "decide", "critique", "reflect"];
const strategyOrder = ["problem-split", "premortem", "steelman", "inversion", "red-team"];
const promptBlockOrder = [
  "frame.task",
  "frame.success-criteria",
  "guardrail.uncertainty",
  "guardrail.disconfirming-evidence",
  "assumption.audit",
  "frame.scope",
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
  "brief-to-draft.md",
  "rewrite-for-clarity.md",
  "critique-argument.md",
  "position-draft.md",
  "feedback-request.md",
  "negotiation-prep.md",
  "communication-brief.md",
  "alignment-conversation-plan.md",
  // Research & synthesis
  "summarize-source.md",
  "synthesize-sources.md",
  "extract-insights.md",
  "cause-mapping.md",
  "research-questions.md",
  // Reflection & review
  "blind-spot-check.md",
  "stakeholder-map.md",
  "triage-the-unknown.md",
  "decision-journal-entry.md",
  "weekly-review.md",
  // Software engineering
  "code-review.md",
  "bug-reproduction-brief.md",
  "log-triage.md",
  "codepath-walkthrough.md",
  "change-impact-review.md",
  "migration-plan.md",
  "release-readiness.md",
  "refactor-plan.md",
  "test-case-design.md",
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
const stackFiles = orderNames(list("stacks"), stackOrder)
  .filter((fileName) => fileName.endsWith(".md") && fileName !== "README.md");
validateStackMeta(stackFiles.map((fileName) => fileName.replace(/\.md$/, "")));
const stacks = stackFiles.map((fileName) => makeStack(fileName));

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
    refs: ["mode.explore", "frame.task", "strategy.problem-split", "frame.scope", "guardrail.uncertainty"]
  },
  {
    title: "Make a Risky Decision",
    description: "When real options exist and the stakes matter. Sets criteria, steelmans alternatives, audits assumptions, and captures the final choice.",
    tags: ["decide", "rigor", "high-stakes"],
    refs: ["mode.decide", "frame.success-criteria", "strategy.steelman", "guardrail.assumption-audit", "schema.decision-memo"]
  },
  {
    title: "Explore or Exploit",
    description: "When the real question is whether to keep searching or commit now. Forces the tradeoff between additional information and the cost of delay, then turns the answer into an immediate move.",
    tags: ["decision", "exploration", "timing"],
    refs: ["mode.decide", "frame.success-criteria", "frame.explore-exploit-decision", "guardrail.uncertainty", "schema.execution-brief"]
  },
  {
    title: "Prioritize a Portfolio",
    description: "When several good-looking bets compete for scarce resources. Defines criteria, ranks the field, and turns the winner into an execution brief.",
    tags: ["prioritization", "portfolio", "focus"],
    refs: ["mode.decide", "frame.success-criteria", "frame.prioritize-opportunities", "schema.execution-brief", "guardrail.uncertainty"]
  },
  {
    title: "De-Risk Before Committing",
    description: "When a direction looks promising but the real blocker is uncertainty. Designs the cheapest credible test and makes the next checkpoint explicit.",
    tags: ["experiment", "de-risk", "execution"],
    refs: ["mode.decide", "frame.success-criteria", "frame.design-cheap-test", "schema.execution-brief", "guardrail.uncertainty"]
  },
  {
    title: "Pressure Test a Plan",
    description: "Before committing to execution. Runs adversarial critique, premortem, and stress test to surface the plan's biggest vulnerabilities.",
    tags: ["critique", "risk", "pre-commit"],
    refs: ["mode.critique", "strategy.premortem", "strategy.red-team", "guardrail.assumption-audit", "guardrail.stress-test-assumptions"]
  },
  {
    title: "Debug a Failure",
    description: "When a bug, incident, or broken workflow needs a structured diagnosis. Starts with a reproducible target, checks the boundary, and turns the next move into a concrete debug plan.",
    tags: ["debugging", "incident", "diagnosis"],
    refs: ["mode.critique", "frame.bug-reproduction-brief", "lens.debugger-loop", "lens.interface-contract-review", "lens.invariant-check", "schema.plan-next-actions"]
  },
  {
    title: "Write and Sharpen",
    description: "For content that needs to be good, not just done. Turns a brief into a real draft, critiques it rigorously, then rewrites for clarity.",
    tags: ["writing", "critique", "revision"],
    refs: ["frame.brief-to-draft", "mode.critique", "frame.critique-argument", "frame.rewrite-for-clarity", "rubric.writing-quality"]
  },
  {
    title: "After-Action Review",
    description: "When an outcome exists and the risk is repeating the same mistake. Maps causes, records the decision, and checks that reflection was actually useful.",
    tags: ["reflect", "learning", "retrospective"],
    refs: ["mode.reflect", "frame.cause-mapping", "schema.decision-journal-entry", "rubric.reflection-quality"]
  },
  {
    title: "Improve a Prompt",
    description: "When a prompt is underperforming. Critiques the current version, rewrites it, compares variants, and checks against a quality rubric.",
    tags: ["prompting", "iteration", "repair"],
    refs: ["mode.critique", "frame.prompt-critique", "frame.prompt-rewrite", "frame.prompt-compare", "rubric.prompt-quality"]
  },
  {
    title: "Map Incentives",
    description: "When behavior is not making sense or you are designing for a multi-player situation. Audits incentives, checks signals, and captures the analysis.",
    tags: ["game theory", "incentives", "analysis"],
    refs: ["mode.explore", "lens.incentive-audit", "lens.signaling-check", "schema.decision-memo"]
  },
  {
    title: "Align Stakeholders",
    description: "When the technical answer is not enough and alignment is the actual bottleneck. Maps stakeholders, checks coordination dynamics, and prepares the next conversation.",
    tags: ["alignment", "stakeholders", "coordination"],
    refs: ["mode.explore", "frame.stakeholder-map", "lens.coordination-plan", "lens.signaling-check", "frame.alignment-conversation-plan", "schema.execution-brief"]
  },
  {
    title: "Read Before Changing",
    description: "When a change looks simple but the surrounding codebase is unfamiliar. Maps the active code path, surfaces invariants, and checks blast radius before editing.",
    tags: ["software engineering", "code reading", "change safety"],
    refs: ["mode.explore", "frame.codepath-walkthrough", "lens.invariant-check", "lens.interface-contract-review", "guardrail.change-impact-review"]
  },
  {
    title: "Turn Sources Into Action",
    description: "When notes, transcripts, or dense source material need to become something decision-useful quickly. Distills the source, extracts what matters, and maps the next investigation or action.",
    tags: ["research", "synthesis", "briefing"],
    refs: ["mode.explore", "frame.summarize-source", "frame.extract-insights", "frame.research-questions", "schema.plan-next-actions"]
  },
  {
    title: "Check for Bias",
    description: "When a judgment or decision may be distorted. Reviews cognitive biases, steelmans alternatives, and guardrails against false certainty.",
    tags: ["psychology", "bias", "rigor"],
    refs: ["mode.critique", "lens.bias-check", "strategy.steelman", "guardrail.disconfirming-evidence", "guardrail.uncertainty"]
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
