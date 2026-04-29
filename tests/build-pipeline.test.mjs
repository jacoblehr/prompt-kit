import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

// Load generated site data (side-effect import populates globalThis.SITE_DATA)
await import(path.join(ROOT, 'site-data.js'))
const { blocks, stacks, featuredStacks } = globalThis.SITE_DATA

// ---------------------------------------------------------------------------
// 1. Site-data output shape
// ---------------------------------------------------------------------------

describe('site-data output shape', () => {
  test('has blocks, stacks, and featuredStacks arrays', () => {
    assert.ok(Array.isArray(blocks), 'blocks should be an array')
    assert.ok(Array.isArray(stacks), 'stacks should be an array')
    assert.ok(Array.isArray(featuredStacks), 'featuredStacks should be an array')
  })

  test('blocks array is non-empty', () => {
    assert.ok(blocks.length > 0)
  })

  test('stacks array is non-empty', () => {
    assert.ok(stacks.length > 0)
  })

  test('featuredStacks array is non-empty', () => {
    assert.ok(featuredStacks.length > 0)
  })
})

// ---------------------------------------------------------------------------
// 2. Block contract completeness
// ---------------------------------------------------------------------------

describe('block contract completeness', () => {
  test('every block has key, title, summary, and body array', () => {
    const failures = []
    for (const block of blocks) {
      if (!block.key) failures.push(`block missing key: ${block.title ?? '(untitled)'}`)
      if (!block.title) failures.push(`block "${block.key}" missing title`)
      if (!block.summary) failures.push(`block "${block.key}" missing summary`)
      if (!Array.isArray(block.body)) failures.push(`block "${block.key}" body should be an array`)
    }
    assert.deepEqual(failures, [])
  })

  test('every block has a contract object', () => {
    const failures = []
    for (const block of blocks) {
      if (typeof block.contract !== 'object' || block.contract === null) {
        failures.push(`block "${block.key}" has missing or invalid contract`)
      }
    }
    assert.deepEqual(failures, [])
  })

  test('all Rubric blocks have non-empty copy', () => {
    const rubrics = blocks.filter((b) => b.sourceKind === 'Rubric')
    assert.ok(rubrics.length > 0, 'expected at least one Rubric block')
    const failures = rubrics
      .filter((b) => !b.copy?.length)
      .map((b) => b.key)
    assert.deepEqual(failures, [], `These rubrics have empty copy: ${failures.join(', ')}`)
  })

  test('all Prompt Blocks have non-empty copy', () => {
    const promptBlocks = blocks.filter((b) => b.sourceKind === 'Prompt Block')
    assert.ok(promptBlocks.length > 0, 'expected at least one Prompt Block')
    const failures = promptBlocks
      .filter((b) => !b.copy?.length)
      .map((b) => b.key)
    assert.deepEqual(failures, [], `These prompt blocks have empty copy: ${failures.join(', ')}`)
  })
})

// ---------------------------------------------------------------------------
// 3. Stack ref integrity
// ---------------------------------------------------------------------------

describe('stack ref integrity', () => {
  // Build a lookup set of every known block key and alias
  const knownRefs = new Set()
  for (const block of blocks) {
    if (block.key) knownRefs.add(block.key)
    for (const alias of block.aliases ?? []) knownRefs.add(alias)
  }

  test('all stack minimumBlocks refs resolve to a known block', () => {
    const failures = []
    for (const stack of stacks) {
      for (const ref of stack.contract?.minimumBlocks ?? []) {
        if (!knownRefs.has(ref)) {
          failures.push(`${stack.key}: minimumBlocks ref "${ref}" not found`)
        }
      }
    }
    assert.deepEqual(failures, [])
  })

  test('all stack fullSequence refs resolve to a known block', () => {
    const failures = []
    for (const stack of stacks) {
      for (const item of stack.contract?.fullSequence ?? []) {
        // Each item may include trailing descriptive text; extract only backtick-quoted refs
        const refs = [...item.matchAll(/`([^`]+)`/g)].map((m) => m[1].trim())
        for (const ref of refs) {
          if (!knownRefs.has(ref)) {
            failures.push(`${stack.key}: fullSequence ref "${ref}" not found`)
          }
        }
      }
    }
    assert.deepEqual(failures, [])
  })

  test('all featuredStacks refs resolve to a known block', () => {
    const failures = []
    for (const fs of featuredStacks) {
      for (const ref of fs.refs ?? []) {
        if (!knownRefs.has(ref)) {
          failures.push(`featuredStack "${fs.title}": ref "${ref}" not found`)
        }
      }
    }
    assert.deepEqual(failures, [])
  })

  test('all stacks expose composition profiles for one-shot assembly', () => {
    const failures = []
    for (const stack of stacks) {
      if (!stack.composition?.phaseOrder) {
        failures.push(`${stack.key}: missing composition phase order`)
      }
      if (!Array.isArray(stack.composition?.strengths) || stack.composition.strengths.length === 0) {
        failures.push(`${stack.key}: missing composition strengths`)
      }
    }
    assert.deepEqual(failures, [])
  })

  test('multi-mode stacks declare an explicit phase handoff need', () => {
    const failures = []
    for (const stack of stacks) {
      const modeRefs = stack.composition?.modeRefs || []
      if (modeRefs.length > 1 && !stack.composition?.needsModeHandoff) {
        failures.push(`${stack.key}: multiple modes without handoff flag`)
      }
    }
    assert.deepEqual(failures, [])
  })
})

// ---------------------------------------------------------------------------
// 4. CLI output format
// ---------------------------------------------------------------------------

describe('CLI output format', () => {
  test('list blocks outputs a block count line', () => {
    const output = execSync('node bin/cli.js list blocks', {
      cwd: ROOT,
      encoding: 'utf-8',
      stdio: 'pipe',
    })
    assert.match(output, /\d+ block\(s\) found/)
    assert.match(output, new RegExp(`${blocks.length} block\\(s\\) found`))
    assert.match(output, /frame\.task/)
  })

  test('list stacks outputs a stack count line', () => {
    const output = execSync('node bin/cli.js list stacks', {
      cwd: ROOT,
      encoding: 'utf-8',
      stdio: 'pipe',
    })
    assert.match(output, /\d+ stack\(s\) found/)
    assert.match(output, new RegExp(`${stacks.length} stack\\(s\\) found`))
    assert.doesNotMatch(output, /^\s+README\s+-/m)
  })

  test('search returns results for a known keyword', () => {
    const output = execSync('node bin/cli.js search critique', {
      cwd: ROOT,
      encoding: 'utf-8',
      stdio: 'pipe',
    })
    assert.match(output, /result\(s\) for/)
  })

  test('stats reports generated catalog counts and block types', () => {
    const output = execSync('node bin/cli.js stats', {
      cwd: ROOT,
      encoding: 'utf-8',
      stdio: 'pipe',
    })
    assert.match(output, new RegExp(`Blocks: ${blocks.length}`))
    assert.match(output, new RegExp(`Stacks: ${stacks.length}`))
    assert.match(output, /frame:/)
    assert.match(output, /recurse:/)
  })
})

// ---------------------------------------------------------------------------
// 5. Browser builder reference coverage
// ---------------------------------------------------------------------------

describe('browser builder reference coverage', () => {
  const siteJs = readFileSync(path.join(ROOT, 'site.js'), 'utf-8')
  const knownRefs = new Set()
  for (const block of blocks) {
    if (block.key) knownRefs.add(block.key)
    for (const alias of block.aliases ?? []) knownRefs.add(alias)
  }

  test('all builder starter refs resolve to known blocks', () => {
    const refs = [...siteJs.matchAll(/starterRefs:\s*\[([^\]]*)\]/g)]
      .flatMap((match) => [...match[1].matchAll(/"([^"]+)"/g)].map((refMatch) => refMatch[1]))

    const failures = refs.filter((ref) => !knownRefs.has(ref))
    assert.deepEqual(failures, [])
  })

  test('all generated block types are known by the browser builder', () => {
    assert.match(siteJs, /meta\.blockTypeOrder/, 'site.js should read block type order from catalog metadata')
    const uiTypes = new Set(globalThis.SITE_DATA.meta.blockTypeOrder)
    const generatedTypes = new Set(blocks.map((block) => block.blockType).filter(Boolean))

    const failures = [...generatedTypes].filter((type) => !uiTypes.has(type))
    assert.deepEqual(failures, [])
  })
})

// ---------------------------------------------------------------------------
// 6. Compose-only stack metadata
// ---------------------------------------------------------------------------

describe('compose-only stack metadata', () => {
  test('stacks no longer expose flow metadata', () => {
    const failures = []
    for (const stack of stacks) {
      if (Object.prototype.hasOwnProperty.call(stack, 'flow')) {
        failures.push(`stack "${stack.key}" should not expose flow metadata`)
      }
    }
    assert.deepEqual(failures, [])
  })

  test('refine-loop remains a valid stack without special execution metadata', () => {
    const stack = stacks.find((s) => s.job === 'refine-loop')
    assert.ok(stack, 'refine-loop stack should exist in site-data')
    assert.ok(Array.isArray(stack.contract?.fullSequence))
    assert.ok(stack.contract.fullSequence.includes('`recurse.refine`'))
  })
})
