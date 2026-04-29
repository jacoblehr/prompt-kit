import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  assembleFlatPrompt,
  assembleStructuredPrompt
} from '../scripts/catalog/prompt-utils.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

await import(path.join(ROOT, 'site-data.js'))
const { stacks } = globalThis.SITE_DATA

describe('compose prompt assembly', () => {
  test('flat assembly concatenates resolved block copy without section wrappers', () => {
    const items = [
      { copy: 'Investigate {context} carefully.' },
      { copy: 'Return a decision memo for {context}.' }
    ]

    const output = assembleFlatPrompt(items, { '{context}': 'the outage' })

    assert.equal(
      output,
      'Investigate the outage carefully.\n\nReturn a decision memo for the outage.'
    )
    assert.ok(!output.includes('## '), 'flat mode should not emit section headers')
  })

  test('structured assembly preserves section and block headings', () => {
    const output = assembleStructuredPrompt([
      {
        label: 'Instruction',
        items: [{ title: 'Task', copy: 'Frame {context}.' }]
      },
      {
        label: 'Checks',
        items: [{ title: 'Execution Brief', copy: 'Return next steps for {context}.' }]
      }
    ], { '{context}': 'the migration' })

    assert.ok(output.includes('## Instruction'))
    assert.ok(output.includes('### Task'))
    assert.ok(output.includes('Frame the migration.'))
    assert.ok(output.includes('## Checks'))
    assert.ok(output.includes('### Execution Brief'))
    assert.ok(output.includes('Return next steps for the migration.'))
    assert.ok(output.includes('\n\n---\n\n'), 'structured mode should separate non-empty sections')
  })

  test('empty items are skipped in both output modes', () => {
    const flat = assembleFlatPrompt([
      { copy: 'Use this.' },
      { copy: '   ' },
      { copy: '' }
    ])
    const structured = assembleStructuredPrompt([
      { label: 'Instruction', items: [{ title: 'Task', copy: 'Use this.' }] },
      { label: 'Checks', items: [{ title: 'Empty', copy: '   ' }] }
    ])

    assert.equal(flat, 'Use this.')
    assert.equal(structured, '## Instruction\n\n### Task\nUse this.')
  })
})

describe('compose-only stack metadata', () => {
  test('all stacks can be rendered without flow selection', () => {
    const failures = []
    for (const stack of stacks) {
      if (!Array.isArray(stack.contract?.fullSequence) || stack.contract.fullSequence.length === 0) {
        failures.push(`stack "${stack.key}" is missing a full sequence`)
      }
      if (Object.prototype.hasOwnProperty.call(stack, 'flow')) {
        failures.push(`stack "${stack.key}" should not expose flow metadata`)
      }
    }
    assert.deepEqual(failures, [])
  })
})
