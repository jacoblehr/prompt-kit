import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  BLOCK_TYPE_ORDER,
  CATALOG_META,
  FEATURED_STACKS,
  MODE_ORDER,
  PROMPT_BLOCK_ORDER,
  RUBRIC_ORDER,
  STACK_FAMILY_ORDER,
  STACK_META,
  STACK_ORDER,
  STACK_OUTPUT_KIND_ORDER,
  STACK_STAGE_ORDER,
  STACK_STAKES_ORDER,
  STOP_WORDS,
  STRATEGY_ORDER
} from "./config.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let ROOT = path.resolve(__dirname, "../..");

function read(relPath) {
  return fs.readFileSync(path.join(ROOT, relPath), "utf8").replace(/\r\n/g, "\n");
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

function blockTypeFromRef(ref = "") {
  const prefix = String(ref).split(".")[0];
  if (BLOCK_TYPE_ORDER.includes(prefix)) {
    return prefix;
  }
  return "";
}

function makeCompositionProfile(refs = []) {
  const refTypes = refs.map((ref) => [ref, blockTypeFromRef(ref)]).filter(([, type]) => type);
  const typeCounts = refTypes.reduce((counts, [, type]) => {
    counts[type] = (counts[type] || 0) + 1;
    return counts;
  }, {});
  const modeRefs = refTypes.filter(([, type]) => type === "mode").map(([ref]) => ref);
  const recurseRefs = refTypes.filter(([, type]) => type === "recurse").map(([ref]) => ref);
  const hasSchema = Boolean(typeCounts.schema);
  const hasQualityGate = Boolean(typeCounts.guardrail || typeCounts.rubric);
  const hasBoundedRecursion = refs.includes("guardrail.bounded-recursion");
  const needsModeHandoff = modeRefs.length > 1;
  const needsRecursionBoundary = recurseRefs.length > 0 && !hasBoundedRecursion;
  const phaseOrder = refTypes
    .map(([ref, type]) => `${type}:${ref.split(".").slice(1).join(".") || ref}`)
    .join(" -> ");
  const strengths = [
    modeRefs.length > 0 ? "stance" : "",
    typeCounts.frame ? "framing" : "",
    (typeCounts.strategy || typeCounts.recurse) ? "reasoning" : "",
    hasQualityGate ? "checks" : "",
    hasSchema ? "output" : ""
  ].filter(Boolean);

  return {
    phaseOrder,
    primaryMode: modeRefs[0] || "",
    modeRefs,
    hasSchema,
    hasQualityGate,
    hasBoundedRecursion,
    needsModeHandoff,
    needsRecursionBoundary,
    strengths
  };
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
  const relPath = `prompts/blocks/mode.${dirName}/README.md`;
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
  const relPath = `prompts/blocks/strategy.${dirName}/README.md`;
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

function stackEffortFromCount(count) {
  if (count <= 3) return "quick";
  if (count <= 5) return "standard";
  return "deep";
}

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
    if (!STACK_STAGE_ORDER.includes(meta.stage)) {
      throw new Error(`Invalid stack stage "${meta.stage}" for ${name}.`);
    }
    if (!STACK_OUTPUT_KIND_ORDER.includes(meta.outputKind)) {
      throw new Error(`Invalid stack outputKind "${meta.outputKind}" for ${name}.`);
    }
    if (!STACK_STAKES_ORDER.includes(meta.stakes)) {
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
  const sequence = extractSectionItems(md, ["Blocks:", "Suggested blocks:", "Suggested sequence:"]);
  const outputs = extractSectionItems(md, ["Expected outcome:", "Expected output:"]);
  const minimumBlocksMatch = md.match(/^\*\*Minimum blocks:\*\*\s*(.+)$/m);
  const whyMatch = md.match(/^\*\*Why this order works:\*\*\s*(.+)$/m);
  const swapsMatch = md.match(/^\*\*Common swaps:\*\*\s*(.+)$/m);
  const failureMatch = md.match(/^\*\*Common failure mode:\*\*\s*(.+)$/m);
  const chooseInsteadMatch = md.match(/^\*\*Choose instead when:\*\*\s*(.+)$/m);

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
    commonFailureMode: failureMatch?.[1]?.trim() || "",
    chooseInsteadWhen: chooseInsteadMatch?.[1]?.trim() || ""
  };
  const io = {};
  if (inputs.length > 0) io.usefulInputs = inputs;
  if (outputs.length > 0) io.expectedOutputs = outputs;
  const sequenceRefs = sequence.flatMap((item) => parseInlineRefs(item));
  const composition = makeCompositionProfile(sequenceRefs);

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
    composition,
    body: bodyFromEntries([
      ["Job", contract.job],
      ["Use when", contract.useWhen],
      ["Composition profile", composition.phaseOrder],
      ["Stage", stage],
      ["Output kind", outputKind],
      ["Effort", effort],
      ["Stakes", stakes],
      ["Useful inputs", inputs],
      ["Minimum blocks", contract.minimumBlocks],
      ["Suggested blocks", sequence.join(" -> ")],
      ["Why this order works", contract.blockOrderRationale],
      ["Choose instead when", contract.chooseInsteadWhen],
      ["Common swaps", contract.commonSwaps],
      ["Common failure mode", contract.commonFailureMode],
      ["Expected outcome", outputs]
    ]),
    sourcePath: relPath
  };
}

function makeRubric(baseName) {
  const relPath = `prompts/blocks/rubric.${baseName}/README.md`;
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

  const copy = [title, "", useWhen ? useWhen + "\n" : "", ...questions.map((q) => `- ${q}`)].join("\n").trim();

  return makeBlock({
    canonicalType: metadata.type || "rubric",
    form: inferFormFromSourceKind("Rubric"),
    sourceKind: "Rubric",
    key: title,
    aliases: [`rubric.${baseName}`],
    title,
    summary: ensureSentence(firstSentence(useWhen || title)),
    tags: resolvedTags(md, title, baseName),
    copy,
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

function validateCatalog({ blocks, stacks, featuredStacks }) {
  const errors = [];
  const blockRefs = new Map();

  blocks.forEach((block) => {
    if (!block.key) errors.push(`Block missing key: ${block.title || "(untitled)"}`);
    if (!BLOCK_TYPE_ORDER.includes(block.blockType)) errors.push(`${block.key}: unknown block type "${block.blockType}"`);
    if (block.stage && !STACK_STAGE_ORDER.includes(block.stage)) errors.push(`${block.key}: unknown stage "${block.stage}"`);

    unique([block.key, ...(block.aliases || [])]).filter(Boolean).forEach((ref) => {
      const norm = ref.toLowerCase();
      if (blockRefs.has(norm) && blockRefs.get(norm) !== block) {
        errors.push(`Duplicate block ref "${ref}" used by ${blockRefs.get(norm).key} and ${block.key}`);
      } else {
        blockRefs.set(norm, block);
      }
    });
  });

  stacks.forEach((stack) => {
    if (!stack.key) errors.push(`Stack missing key: ${stack.title || "(untitled)"}`);
    if (!STACK_FAMILY_ORDER.includes(stack.family)) errors.push(`${stack.key}: unknown family "${stack.family}"`);
    if (!STACK_STAGE_ORDER.includes(stack.stage)) errors.push(`${stack.key}: unknown stage "${stack.stage}"`);
    if (!STACK_OUTPUT_KIND_ORDER.includes(stack.outputKind)) errors.push(`${stack.key}: unknown output kind "${stack.outputKind}"`);
    if (!STACK_STAKES_ORDER.includes(stack.stakes)) errors.push(`${stack.key}: unknown stakes "${stack.stakes}"`);

    for (const ref of stack.contract?.minimumBlocks || []) {
      if (!blockRefs.has(ref.toLowerCase())) errors.push(`${stack.key}: minimumBlocks ref "${ref}" not found`);
    }

    for (const item of stack.contract?.fullSequence || []) {
      for (const ref of parseInlineRefs(item)) {
        if (!blockRefs.has(ref.toLowerCase())) errors.push(`${stack.key}: fullSequence ref "${ref}" not found`);
      }
    }
  });

  featuredStacks.forEach((stack) => {
    for (const ref of stack.refs || []) {
      if (!blockRefs.has(ref.toLowerCase())) errors.push(`Featured stack "${stack.title}": ref "${ref}" not found`);
    }
  });

  if (errors.length > 0) {
    throw new Error(`Catalog validation failed:\n- ${errors.join("\n- ")}`);
  }
}

function buildCatalog({ root = path.resolve(__dirname, "../..") } = {}) {
  ROOT = root;

  const allBlockDirs = listDirs("prompts/blocks");
  const modes = orderNames(allBlockDirs.filter(d => d.startsWith("mode.")).map(d => d.slice(5)), MODE_ORDER).map((dirName) => makeMode(dirName));
  const strategies = orderNames(allBlockDirs.filter(d => d.startsWith("strategy.")).map(d => d.slice(9)), STRATEGY_ORDER).map((dirName) => makeStrategy(dirName));
  const promptBlocks = orderNames(allBlockDirs.filter(d => !d.startsWith("mode.") && !d.startsWith("strategy.") && !d.startsWith("rubric.")), PROMPT_BLOCK_ORDER).map((dirName) => makePromptBlock(dirName));
  const rubricBlocks = orderNames(allBlockDirs.filter(d => d.startsWith("rubric.")).map(d => d.slice(7)), RUBRIC_ORDER)
    .map((baseName) => makeRubric(baseName));
  const stackFiles = orderNames(list("stacks"), STACK_ORDER)
    .filter((fileName) => fileName.endsWith(".md") && fileName !== "README.md");
  validateStackMeta(stackFiles.map((fileName) => fileName.replace(/\.md$/, "")));
  const stacks = stackFiles.map((fileName) => makeStack(fileName));

  const blocks = [
    ...modes,
    ...strategies,
    ...promptBlocks,
    ...rubricBlocks
  ];

  validateCatalog({ blocks, stacks, featuredStacks: FEATURED_STACKS });

  return {
    blocks,
    stacks,
    featuredStacks: FEATURED_STACKS,
    meta: CATALOG_META,
    diagnostics: {
      root,
      blockCount: blocks.length,
      stackCount: stacks.length,
      featuredStackCount: FEATURED_STACKS.length,
      inactiveContentPaths: ["prompts/snippets", "prompts/concepts"]
    }
  };
}

function renderSiteData(catalog) {
  const { diagnostics: _diagnostics, ...data } = catalog;
  return `// Generated by scripts/build-site-data.mjs. Do not edit by hand.\nglobalThis.SITE_DATA = ${JSON.stringify(data, null, 2)};\n`;
}

export { buildCatalog, renderSiteData };
