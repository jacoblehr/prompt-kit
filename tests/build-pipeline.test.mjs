import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import { execSync } from 'node:child_process'
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
  })

  test('list stacks outputs a stack count line', () => {
    const output = execSync('node bin/cli.js list stacks', {
      cwd: ROOT,
      encoding: 'utf-8',
      stdio: 'pipe',
    })
    assert.match(output, /\d+ stack\(s\) found/)
  })

  test('search returns results for a known keyword', () => {
    const output = execSync('node bin/cli.js search critique', {
      cwd: ROOT,
      encoding: 'utf-8',
      stdio: 'pipe',
    })
    assert.match(output, /result\(s\) for/)
  })
})

// ---------------------------------------------------------------------------
// 5. Stack flow field integrity
// ---------------------------------------------------------------------------

describe('stack flow field', () => {
  const VALID_FLOW_MODES = ['chain', 'batch']
  const FLOW_MODE_DEFAULT = 'batch'

  test('every stack has a flow field that is "chain" or "batch"', () => {
    const failures = []
    for (const stack of stacks) {
      if (!VALID_FLOW_MODES.includes(stack.flow)) {
        failures.push(`stack "${stack.key}" has invalid or missing flow: "${stack.flow}"`)
      }
    }
    assert.deepEqual(failures, [])
  })

  test('stacks without explicit **Flow:** marker default to batch', () => {
    // All stacks not explicitly marked chain should resolve to batch
    const nonChainStacks = stacks.filter((s) => s.flow !== 'chain')
    for (const stack of nonChainStacks) {
      assert.equal(
        stack.flow,
        FLOW_MODE_DEFAULT,
        `stack "${stack.key}" should default to batch, got "${stack.flow}"`
      )
    }
  })

  test('refine-loop stack is marked as chain', () => {
    const stack = stacks.find((s) => s.job === 'refine-loop')
    assert.ok(stack, 'refine-loop stack should exist in site-data')
    assert.equal(stack.flow, 'chain', 'refine-loop should have flow: chain')
  })

  test('research stack defaults to batch', () => {
    const stack = stacks.find((s) => s.job === 'research')
    assert.ok(stack, 'research stack should exist in site-data')
    assert.equal(stack.flow, 'batch')
  })
})
