#!/usr/bin/env node
import { Command } from 'commander'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.join(__dirname, '..')

async function loadCatalog() {
  await import(path.join(rootDir, 'site-data.js'))
  const data = globalThis.SITE_DATA || {}
  return {
    blocks: Array.isArray(data.blocks) ? data.blocks : [],
    stacks: Array.isArray(data.stacks) ? data.stacks : [],
  }
}

function truncate(text = '', length = 80) {
  const normalized = String(text || '').replace(/\s+/g, ' ').trim()
  if (normalized.length <= length) return normalized || 'N/A'
  return `${normalized.slice(0, length - 3)}...`
}

function searchableText(item = {}) {
  return [
    item.title,
    item.key,
    item.summary,
    item.family,
    item.group,
    item.job,
    item.useWhen,
    item.copy,
    ...(item.tags || []),
    ...(item.aliases || []),
    ...(item.body || []).flat(),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
}

const program = new Command()

program
  .name('prompt-kit')
  .description('CLI for Prompt Kit - browse blocks and stacks')
  .version('1.0.0')

const listCmd = program.command('list').description('List blocks or stacks')

listCmd
  .command('blocks')
  .description('List all prompt blocks')
  .action(async () => {
    const { blocks } = await loadCatalog()

    console.log(`\n${blocks.length} block(s) found:\n`)
    blocks.forEach((block) => {
      const type = block.blockType ? `[${block.blockType}] ` : ''
      console.log(`  ${type}${block.key || block.title} - ${truncate(block.summary)}`)
    })
  })

listCmd
  .command('stacks')
  .description('List all stacks')
  .action(async () => {
    const { stacks } = await loadCatalog()

    console.log(`\n${stacks.length} stack(s) found:\n`)
    stacks.forEach((stack) => {
      const count = stack.contract?.fullSequence?.length || 0
      const optionalCount = stack.contract?.optionalBlocks?.length || 0
      const suffix = optionalCount > 0 ? `, ${optionalCount} optional` : ''
      console.log(`  ${stack.job || stack.title} - ${truncate(stack.summary, 64)} (${count} default blocks${suffix})`)
    })
  })

program
  .command('search <query>')
  .description('Search blocks and stacks')
  .action(async (query) => {
    const { blocks, stacks } = await loadCatalog()
    const needle = query.toLowerCase()
    const results = [
      ...blocks
        .filter((block) => searchableText(block).includes(needle))
        .map((block) => ({
          type: 'block',
          name: block.key || block.title,
          snippet: truncate(block.summary || block.copy, 120),
        })),
      ...stacks
        .filter((stack) => searchableText(stack).includes(needle))
        .map((stack) => ({
          type: 'stack',
          name: stack.job || stack.title,
          snippet: truncate(stack.summary || stack.useWhen, 120),
        })),
    ]

    if (results.length === 0) {
      console.log(`No results found for "${query}"`)
      return
    }

    console.log(`\n${results.length} result(s) for "${query}":\n`)
    results.forEach((result) => {
      console.log(`  ${result.type}: ${result.name}`)
      console.log(`    ${result.snippet}\n`)
    })
  })

program
  .command('stats')
  .description('Show repository statistics')
  .action(async () => {
    const { blocks, stacks } = await loadCatalog()
    const blockTypes = blocks.reduce((counts, block) => {
      const type = block.blockType || 'unknown'
      counts[type] = (counts[type] || 0) + 1
      return counts
    }, {})

    console.log('\nRepository Statistics:\n')
    console.log(`  Blocks: ${blocks.length}`)
    console.log(`  Stacks: ${stacks.length}`)
    console.log('\n  Block types:')
    Object.entries(blockTypes)
      .sort(([a], [b]) => a.localeCompare(b))
      .forEach(([type, count]) => {
        console.log(`    ${type}: ${count}`)
      })
    console.log('')
  })

program.parse(process.argv)
