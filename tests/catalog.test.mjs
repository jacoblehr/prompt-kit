import { describe, test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  BLOCK_TYPE_ORDER,
  FEATURED_STACKS,
  STACK_ORDER
} from '../scripts/catalog/config.mjs'
import { buildCatalog, renderSiteData } from '../scripts/catalog/build-catalog.mjs'
import {
  analyzePrompt,
  estimateTokens,
  extractPlaceholders,
  fillPromptTemplate
} from '../scripts/catalog/prompt-utils.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

describe('catalog build API', () => {
  test('buildCatalog returns generated data plus diagnostics without writing', () => {
    const catalog = buildCatalog({ root: ROOT })

    assert.equal(catalog.blocks.length, 40)
    assert.equal(catalog.stacks.length, 34)
    assert.equal(catalog.featuredStacks.length, 10)
    assert.equal(catalog.diagnostics.blockCount, catalog.blocks.length)
    assert.deepEqual(catalog.meta.blockTypeOrder, BLOCK_TYPE_ORDER)
  })

  test('site-data.js is deterministic from source catalog', () => {
    const expected = renderSiteData(buildCatalog({ root: ROOT }))
    const actual = readFileSync(path.join(ROOT, 'site-data.js'), 'utf8')

    assert.equal(actual, expected)
  })

  test('stack order config covers every stack source file exactly once', () => {
    const catalog = buildCatalog({ root: ROOT })
    const sourceFiles = catalog.stacks.map((stack) => path.basename(stack.sourcePath))

    assert.deepEqual(sourceFiles, STACK_ORDER)
  })

  test('featured stacks are centralized in config and emitted unchanged', () => {
    const catalog = buildCatalog({ root: ROOT })

    assert.deepEqual(catalog.featuredStacks, FEATURED_STACKS)
  })
})

describe('prompt utilities', () => {
  test('placeholder extraction and filling are shared utilities', () => {
    const template = 'Review {artifact} using {criteria}. Then return {artifact}.'

    assert.deepEqual(extractPlaceholders(template), ['{artifact}', '{criteria}'])
    assert.equal(
      fillPromptTemplate(template, { '{artifact}': 'the draft', '{criteria}': 'clarity' }),
      'Review the draft using clarity. Then return the draft.'
    )
  })

  test('prompt analysis reports missing output format and token estimate', () => {
    const analysis = analyzePrompt('Think carefully about this vague thing and make it better.')

    assert.equal(analysis.wordCount, 10)
    assert.equal(analysis.estimatedTokens, estimateTokens('Think carefully about this vague thing and make it better.'))
    assert.ok(analysis.hints.some((hint) => hint.type === 'vague'))
    assert.ok(analysis.hints.some((hint) => hint.type === 'format'))
  })
})

describe('static browser wiring', () => {
  test('index keeps direct classic-script loading order', () => {
    const html = readFileSync(path.join(ROOT, 'index.html'), 'utf8')
    const scripts = [...html.matchAll(/<script src="([^"]+)"><\/script>/g)].map((match) => match[1])

    assert.deepEqual(scripts, ['site-data.js', 'site.js', 'site-builder.js', 'site-init.js'])
  })

  test('browser scripts publish the PromptKit namespace used by init', () => {
    const siteJs = readFileSync(path.join(ROOT, 'site.js'), 'utf8')
    const builderJs = readFileSync(path.join(ROOT, 'site-builder.js'), 'utf8')
    const initJs = readFileSync(path.join(ROOT, 'site-init.js'), 'utf8')

    assert.match(siteJs, /window\.PromptKit = window\.PromptKit \|\| \{\}/)
    assert.match(builderJs, /Object\.assign\(window\.PromptKit/)
    assert.match(initJs, /const app = window\.PromptKit/)
  })
})
