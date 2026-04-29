/**
 * Simulate the site's analyzePrompt linter against every assembled stack.
 * Outputs which stacks trigger which rules and why.
 */
import path from 'path'
import { fileURLToPath } from 'url'
import { buildCatalog } from './catalog/build-catalog.mjs'
import { analyzePrompt } from './catalog/prompt-utils.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')

// ── Load site data ────────────────────────────────────────────────────────────

const { blocks, stacks } = buildCatalog({ root: ROOT })

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
