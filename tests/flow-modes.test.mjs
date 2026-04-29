import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

// Load generated site data
await import(path.join(ROOT, 'site-data.js'))
const { stacks } = globalThis.SITE_DATA

// ---------------------------------------------------------------------------
// Pure execution helper functions under test.
// These mirror the logic in site.js and must stay in sync.
// ---------------------------------------------------------------------------

const VALID_FLOW_MODES = ['chain', 'batch']
const FLOW_MODE_DEFAULT = 'batch'

const BATCH_STEP_WRAPPER = `You are executing one independent step in a batch prompt stack.

Apply this prompt only to the original user input.
Do not reference or depend on outputs from other steps.
Do not explain the prompt.
Return only the requested output.
Your output will be collected alongside other independent analyses for final synthesis.

Original input:
{original_input}`

const BATCH_SYNTHESIS_PROMPT = `You are synthesizing multiple independent analyses of the same original input.

Original input:
{original_input}

Step outputs:
{step_outputs}

Task:
Combine the outputs into the smallest useful unified result.

Rules:
- remove duplication
- preserve useful distinctions
- surface contradictions only if they matter
- do not add unrelated analysis
- do not explain stack mechanics
- produce a practical final answer

Return the final synthesized output.`

/**
 * Generate a position-aware wrapper for a single chain step.
 */
function makeChainStepWrapper(stepNum, total, inputValue) {
  const isFirst = stepNum === 1
  const isLast = stepNum === total

  const positionNote = isFirst
    ? `This is step ${stepNum} of ${total} \u2014 first step. The input is the original task.`
    : isLast
    ? `This is step ${stepNum} of ${total} \u2014 final step. The input is the output from step ${stepNum - 1}.`
    : `This is step ${stepNum} of ${total}. The input is the output from step ${stepNum - 1}.`

  const bridgeNote = !isFirst
    ? `\n\nNote: where the prompt below references {artifact} or {context}, use the Input above.`
    : ''

  return `You are executing one step in a sequential prompt chain.\n\n${positionNote}\n\nApply the prompt to the input. Do not explain the prompt. Return only the requested output.\n\nInput:\n${inputValue}${bridgeNote}`
}

/**
 * Assemble steps in chain mode.
 * Step 1 receives the task input; subsequent steps receive {input} as placeholder.
 */
function assembleChainSteps(items, taskInput = '') {
  if (items.length === 0) return ''
  const total = items.length

  const preamble = [
    `# Prompt Chain \u2014 ${total} Step${total !== 1 ? 's' : ''}`,
    '',
    'Run each step in order. Copy the output from each step and paste it as the Input for the next step.',
    '',
    items.map((item, i) => `${i + 1}. ${item.title}`).join('\n'),
  ].join('\n')

  const steps = items.map((item, index) => {
    const inputValue = index === 0
      ? (taskInput.trim() || '{input}')
      : '{input}'
    const wrapper = makeChainStepWrapper(index + 1, total, inputValue)
    const stepPrompt = `${wrapper}\n\n---\n\n${item.copy.trim()}`
    return `## Step ${index + 1} of ${total}: ${item.title}\n\n${stepPrompt}`
  })

  return [preamble, ...steps].join('\n\n---\n\n')
}

/**
 * Assemble steps in batch mode.
 * Each step receives the original input.
 * Synthesis is appended only when there are multiple steps.
 */
function assembleBatchSteps(items, taskInput = '') {
  if (items.length === 0) return ''
  const originalInput = taskInput.trim() || '{original_input}'
  const hasSynthesis = items.length > 1
  const total = items.length + (hasSynthesis ? 1 : 0)

  const steps = items.map((item, index) => {
    const wrapper = BATCH_STEP_WRAPPER.replace('{original_input}', originalInput)
    const stepPrompt = `${wrapper}\n\n---\n\n${item.copy.trim()}`
    return `## Step ${index + 1} of ${total}: ${item.title}\n\n${stepPrompt}`
  })

  if (hasSynthesis) {
    const synthesis = BATCH_SYNTHESIS_PROMPT.replace(/{original_input}/g, originalInput)
    steps.push(`## Step ${total} of ${total}: Synthesis\n\n${synthesis}`)
  }

  return steps.join('\n\n---\n\n')
}

// ---------------------------------------------------------------------------
// 1. Execution: chain passes original input to first step only
// ---------------------------------------------------------------------------

describe('chain execution', () => {
  const items = [
    { title: 'step-a', copy: 'Do step A.' },
    { title: 'step-b', copy: 'Do step B.' },
    { title: 'step-c', copy: 'Do step C.' }
  ]

  test('step 1 receives the original task input', () => {
    const taskInput = 'my task'
    const output = assembleChainSteps(items, taskInput)
    // The preamble is at index 0; step 1 content comes after it.
    const step1 = output.split('\n\n---\n\n').find(p => p.includes('## Step 1 of'))
    assert.ok(step1, 'Step 1 block should exist')
    assert.ok(
      step1.includes('my task'),
      'Step 1 should contain the task input'
    )
  })

  test('step 2 has position context referencing step 1 output', () => {
    const output = assembleChainSteps(items, 'my task')
    const step2 = output.split('\n\n---\n\n').find(p => p.includes('## Step 2 of'))
    assert.ok(step2, 'Step 2 block should exist')
    assert.ok(
      step2.includes('output from step 1'),
      'Step 2 wrapper should reference step 1 output'
    )
  })

  test('step 2+ include bridge note for {artifact}/{context}', () => {
    const output = assembleChainSteps(items, 'my task')
    const step2 = output.split('\n\n---\n\n').find(p => p.includes('## Step 2 of'))
    assert.ok(step2.includes('where the prompt below references {artifact} or {context}'))
  })

  test('assembled chain output includes sequence preamble', () => {
    const output = assembleChainSteps(items, 'my task')
    const preamble = output.split('\n\n---\n\n')[0]
    assert.ok(preamble.includes('# Prompt Chain'))
    assert.ok(preamble.includes('Run each step in order'))
    assert.ok(preamble.includes('step-a'))
    assert.ok(preamble.includes('step-b'))
  })

  test('all step prompts contain the block copy', () => {
    const output = assembleChainSteps(items, '')
    assert.ok(output.includes('Do step A.'))
    assert.ok(output.includes('Do step B.'))
    assert.ok(output.includes('Do step C.'))
  })

  test('produces N steps for N items', () => {
    const output = assembleChainSteps(items, '')
    for (let i = 1; i <= items.length; i++) {
      assert.ok(output.includes(`## Step ${i} of ${items.length}:`))
    }
  })

  test('wraps each step with the chain wrapper', () => {
    const output = assembleChainSteps(items, '')
    assert.ok(output.includes('You are executing one step in a sequential prompt chain.'))
  })
})

// ---------------------------------------------------------------------------
// 2. Execution: batch passes original input to every step
// ---------------------------------------------------------------------------

describe('batch execution', () => {
  const items = [
    { title: 'step-a', copy: 'Do step A.' },
    { title: 'step-b', copy: 'Do step B.' }
  ]

  test('every step receives the original task input', () => {
    const taskInput = 'analyse this'
    const output = assembleBatchSteps(items, taskInput)
    const parts = output.split('\n\n---\n\n')
    const stepBlocks = parts.filter(p => /^## Step \d+ of \d+/.test(p))
    // First N steps are analysis steps (not synthesis)
    const analysisSteps = stepBlocks.slice(0, items.length)
    for (const block of analysisSteps) {
      assert.ok(
        block.includes('analyse this'),
        `Step block should include original input: ${block.slice(0, 80)}`
      )
    }
  })

  test('wraps each step with the batch wrapper', () => {
    const output = assembleBatchSteps(items, '')
    assert.ok(output.includes('You are executing one independent step in a batch prompt stack.'))
  })

  test('appends a synthesis step after all analysis steps', () => {
    const output = assembleBatchSteps(items, 'input here')
    const total = items.length + 1
    assert.ok(
      output.includes(`## Step ${total} of ${total}: Synthesis`),
      'Should contain a Synthesis step as the last step'
    )
    assert.ok(
      output.includes('You are synthesizing multiple independent analyses'),
      'Synthesis step should include the synthesis prompt'
    )
  })

  test('synthesis step contains the original input', () => {
    const taskInput = 'specific input'
    const output = assembleBatchSteps(items, taskInput)
    const synthStart = output.indexOf('## Step')
    const lastStep = output.slice(output.lastIndexOf('## Step'))
    assert.ok(
      lastStep.includes('specific input'),
      'Synthesis step should include the original input'
    )
  })

  test('synthesis step contains {step_outputs} placeholder', () => {
    const output = assembleBatchSteps(items, 'something')
    const lastStep = output.slice(output.lastIndexOf('## Step'))
    assert.ok(
      lastStep.includes('{step_outputs}'),
      'Synthesis step should contain {step_outputs} placeholder'
    )
  })

  test('skips synthesis step when there is only one item', () => {
    const singleItem = [{ title: 'solo-step', copy: 'Do it.' }]
    const output = assembleBatchSteps(singleItem, 'my input')
    assert.ok(!output.includes('Synthesis'), 'Should not include a Synthesis step for a single item')
    assert.ok(output.includes('## Step 1 of 1:'), 'Should label the step as 1 of 1')
  })

  test('produces N+1 total steps for N items (N analysis + 1 synthesis)', () => {
    const output = assembleBatchSteps(items, '')
    for (let i = 1; i <= items.length + 1; i++) {
      assert.ok(output.includes(`## Step ${i} of ${items.length + 1}:`))
    }
  })
})

// ---------------------------------------------------------------------------
// 3. Flow defaulting
// ---------------------------------------------------------------------------

describe('flow mode defaults', () => {
  test('stacks with explicit flow have a valid flow value', () => {
    const failures = []
    for (const stack of stacks) {
      if (stack.flow !== undefined) {
        if (!VALID_FLOW_MODES.includes(stack.flow)) {
          failures.push(`stack "${stack.key}" has invalid flow: "${stack.flow}"`)
        }
      }
    }
    assert.deepEqual(failures, [])
  })

  test('stacks without explicit flow are treated as batch (default)', () => {
    // All stacks should either have no flow field, or have it set to "batch" or "chain"
    const failures = []
    for (const stack of stacks) {
      const effective = stack.flow ?? FLOW_MODE_DEFAULT
      if (!VALID_FLOW_MODES.includes(effective)) {
        failures.push(`stack "${stack.key}" resolves to invalid flow: "${effective}"`)
      }
    }
    assert.deepEqual(failures, [])
  })

  test('missing flow resolves to batch', () => {
    // Simulate the defaulting logic used by the builder
    function resolveFlow(flow) {
      if (typeof flow === 'string' && VALID_FLOW_MODES.includes(flow)) return flow
      return FLOW_MODE_DEFAULT
    }
    assert.equal(resolveFlow(undefined), 'batch')
    assert.equal(resolveFlow(null), 'batch')
    assert.equal(resolveFlow(''), 'batch')
    assert.equal(resolveFlow('unknown'), 'batch')
    assert.equal(resolveFlow('chain'), 'chain')
    assert.equal(resolveFlow('batch'), 'batch')
  })
})

// ---------------------------------------------------------------------------
// 4. Invalid flow values are rejected
// ---------------------------------------------------------------------------

describe('flow validation', () => {
  test('only "chain" and "batch" are valid flow modes', () => {
    const invalid = ['dag', 'sequential', 'parallel', 'pipe', 'Chain', 'Batch', '']
    for (const value of invalid) {
      assert.ok(
        !VALID_FLOW_MODES.includes(value),
        `"${value}" should not be a valid flow mode`
      )
    }
  })

  test('refine-loop stack is marked as chain', () => {
    const stack = stacks.find(s => s.job === 'refine-loop')
    assert.ok(stack, 'refine-loop stack should exist')
    assert.equal(stack.flow, 'chain', 'refine-loop should have flow: chain')
  })

  test('research stack defaults to batch', () => {
    const stack = stacks.find(s => s.job === 'research')
    assert.ok(stack, 'research stack should exist')
    const effective = stack.flow ?? FLOW_MODE_DEFAULT
    assert.equal(effective, 'batch', 'research stack should default to batch')
  })
})
