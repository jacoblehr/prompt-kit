const PLACEHOLDER_RE = /\{[^}\n]{1,80}\}/g;
const LINTER_VAGUE = /\b(improve|vague|enhance|optimize|better|good|things like|etc\.|something like|sort of|kind of|more effective|more useful)\b/gi;
const LINTER_OUTPUT = /\b(return|output|format|respond with|give me a list|in json|in markdown|as a table|as bullets?|as numbered|structure your)\b/i;
const WORD_LIMIT = 700;
const REPEAT_THRESHOLD = 4;

function extractPlaceholders(text = "") {
  return [...new Set(String(text || "").match(PLACEHOLDER_RE) || [])];
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

function assembleFlatPrompt(items, inputValues = {}) {
  return items
    .filter((item) => item.copy && item.copy.trim())
    .map((item) => fillPromptTemplate(item.copy.trim(), inputValues))
    .join("\n\n");
}

function assembleStructuredPrompt(sections, inputValues = {}) {
  const parts = sections
    .map((section) => {
      const items = section.items.filter((item) => item.copy && item.copy.trim());
      if (items.length === 0) return "";
      return `## ${section.label}\n\n${items.map((item) => `### ${item.title}\n${fillPromptTemplate(item.copy.trim(), inputValues)}`).join("\n\n")}`;
    })
    .filter(Boolean);

  return parts.join("\n\n---\n\n");
}

function estimateTokens(text = "") {
  const words = String(text || "").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words * 1.33));
}

function analyzePrompt(text = "") {
  if (!text || !text.trim()) return { hints: [], wordCount: 0, estimatedTokens: 0 };

  const hints = [];
  const wordCount = text.trim().split(/\s+/).length;

  const vagueHits = text.match(LINTER_VAGUE) || [];
  if (vagueHits.length >= 2) {
    hints.push({ type: "vague", text: `Vague language (${vagueHits.join(", ")})` });
  }

  if (!LINTER_OUTPUT.test(text)) {
    hints.push({ type: "format", text: "No output format specified" });
  }

  if (wordCount > WORD_LIMIT) {
    hints.push({ type: "length", text: `~${wordCount} words (>${WORD_LIMIT})` });
  }

  const tokens = text.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean);
  const grams = new Map();
  for (let i = 0; i < tokens.length - 1; i += 1) {
    const gram = `${tokens[i]} ${tokens[i + 1]}`;
    if (gram.length >= 7) grams.set(gram, (grams.get(gram) || 0) + 1);
  }
  const hotGrams = [...grams.entries()].filter(([, count]) => count >= REPEAT_THRESHOLD).sort((a, b) => b[1] - a[1]);
  if (hotGrams.length > 0) {
    hints.push({
      type: "repetition",
      text: `Repeated 2-grams: ${hotGrams.slice(0, 3).map(([gram, count]) => `"${gram}" x${count}`).join(", ")}`
    });
  }

  return { hints, wordCount, estimatedTokens: estimateTokens(text) };
}

export {
  analyzePrompt,
  assembleFlatPrompt,
  assembleStructuredPrompt,
  estimateTokens,
  extractPlaceholders,
  fillPromptTemplate
};
