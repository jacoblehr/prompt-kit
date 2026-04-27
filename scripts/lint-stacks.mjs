/**
 * Simulate the site's analyzePrompt linter against every assembled stack.
 * Outputs which stacks trigger which rules and why.
 */
import { readFile } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')

// ── Linter rules (mirrors site-builder.js) ───────────────────────────────────

const LINTER_VAGUE = /\b(improve|vague|enhance|optimize|better|good|things like|etc\.|something like|sort of|kind of|more effective|more useful)\b/gi
const LINTER_OUTPUT = /\b(return|output|format|respond with|give me a list|in json|in markdown|as a table|as bullets?|as numbered|structure your)\b/i
const WORD_LIMIT = 700
const REPEAT_THRESHOLD = 4

function analyzePrompt(text) {
  if (!text || !text.trim()) return { hints: [], wordCount: 0 }

  const hints = []
  const wordCount = text.trim().split(/\s+/).length

  const vagueHits = text.match(LINTER_VAGUE) || []
  if (vagueHits.length >= 2) {
    hints.push({ type: 'vague', text: `Vague language (${vagueHits.join(', ')})` })
  }

  if (!LINTER_OUTPUT.test(text)) {
    hints.push({ type: 'format', text: 'No output format specified' })
  }

  if (wordCount > WORD_LIMIT) {
    hints.push({ type: 'length', text: `~${wordCount} words (>${WORD_LIMIT})` })
  }

  const tokens = text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean)
  const grams = new Map()
  for (let i = 0; i < tokens.length - 1; i++) {
    const gram = `${tokens[i]} ${tokens[i + 1]}`
    if (gram.length >= 7) grams.set(gram, (grams.get(gram) || 0) + 1)
  }
  const hotGrams = [...grams.entries()].filter(([, c]) => c >= REPEAT_THRESHOLD).sort((a, b) => b[1] - a[1])
  if (hotGrams.length > 0) {
    hints.push({ type: 'repetition', text: `Repeated 2-grams: ${hotGrams.slice(0, 3).map(([g, c]) => `"${g}" ×${c}`).join(', ')}` })
  }

  return { hints, wordCount }
}

// ── Load site data ────────────────────────────────────────────────────────────

const siteDataPath = path.join(ROOT, 'site-data.js')
const siteDataRaw = await readFile(siteDataPath, 'utf-8')
// site-data.js does globalThis.SITE_DATA = {...}
const match = siteDataRaw.match(/globalThis\.SITE_DATA\s*=\s*(\{[\s\S]*\});?\s*$/)
if (!match) throw new Error('Could not parse site-data.js')
const siteData = JSON.parse(match[1])

const { blocks, stacks } = siteData

// ── Build block copy index ────────────────────────────────────────────────────

const blockByKey = new Map()
const blockByAlias = new Map()

for (const block of blocks) {
  if (block.key) blockByKey.set(block.key.toLowerCase(), block)
  if (Array.isArray(block.aliases)) {
    for (const alias of block.aliases) {
      blockByAlias.set(alias.toLowerCase(), block)
    }
  }
}

function resolveBlock(ref) {
  const norm = ref.trim().toLowerCase().replace(/[`'"]/g, '')
  return blockByAlias.get(norm) || blockByKey.get(norm) || null
}

// ── Assemble stack prompt (mirrors builderState.assemble) ────────────────────

function assembleStackPrompt(stack) {
  const parts = []
  for (const ref of stack.contract.fullSequence) {
    const block = resolveBlock(ref)
    if (!block?.copy?.trim()) continue
    parts.push(`### ${block.title}\n${block.copy.trim()}`)
  }
  return parts.join('\n\n---\n\n')
}

// ── Run linter on each stack ──────────────────────────────────────────────────

let clean = 0
let flagged = 0

console.log('\nLinter check — assembled stack prompts\n' + '─'.repeat(52))

for (const stack of stacks) {
  const text = assembleStackPrompt(stack)
  const { hints, wordCount } = analyzePrompt(text)

  if (hints.length > 0) {
    flagged++
    console.log(`\n⚠  ${stack.title} (${wordCount} words)`)
    for (const h of hints) {
      console.log(`   [${h.type}] ${h.text}`)
    }
  } else {
    clean++
  }
}

console.log(`\n${'─'.repeat(52)}`)
console.log(`Clean: ${clean}   Flagged: ${flagged}`)
