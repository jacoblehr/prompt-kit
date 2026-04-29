import { describe, test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { JSDOM } from 'jsdom'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

function loadBrowserApp() {
  const html = readFileSync(path.join(ROOT, 'index.html'), 'utf8')
  const dom = new JSDOM(html, {
    url: 'http://localhost/',
    runScripts: 'dangerously',
    pretendToBeVisual: true,
  })

  dom.window.HTMLElement.prototype.scrollIntoView = function scrollIntoView() {}
  Object.defineProperty(dom.window.navigator, 'clipboard', {
    configurable: true,
    value: { writeText: async () => {} },
  })

  for (const file of ['site-data.js', 'site.js', 'site-builder.js', 'site-init.js']) {
    const script = dom.window.document.createElement('script')
    script.textContent = readFileSync(path.join(ROOT, file), 'utf8')
    dom.window.document.body.appendChild(script)
  }

  return dom
}

describe('browser smoke', () => {
  test('renders catalog cards and filters from the search box', () => {
    const dom = loadBrowserApp()
    const { document, Event } = dom.window

    const allCards = document.querySelectorAll('.card.searchable')
    assert.ok(allCards.length > 0, 'expected catalog cards to render')

    const search = document.getElementById('search')
    search.value = 'qqqqqqqq'
    search.dispatchEvent(new Event('input', { bubbles: true }))
    dom.window.PromptKit.applyFilters()

    const visibleCards = [...document.querySelectorAll('.card.searchable')]
      .filter((card) => !card.classList.contains('hidden'))

    assert.ok(visibleCards.length < allCards.length, 'expected search to hide non-matching cards')
  })

  test('adds a block to the builder and renders a prompt preview', () => {
    const dom = loadBrowserApp()
    const { document } = dom.window

    const frameTaskCard = document.querySelector('.card[data-title="frame.task"]')
    assert.ok(frameTaskCard, 'expected frame.task card to exist')

    frameTaskCard.querySelector('.add-btn').click()
    frameTaskCard.querySelector('[data-section-target="instruction"]')?.click()

    assert.equal(document.getElementById('builder-badge').textContent, '1')
    assert.match(document.getElementById('builder-run-output').textContent, /context:/)
  })
})
