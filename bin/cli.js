#!/usr/bin/env node
import { Command } from 'commander'
import { readdir, readFile } from 'fs/promises'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.join(__dirname, '..')

const program = new Command()

program
  .name('prompt-kit')
  .description('CLI for Prompt Kit - Manage blocks and stacks')
  .version('1.0.0')

program
  .command('list blocks')
  .description('List all prompt blocks')
  .action(async () => {
    const blocksDir = path.join(rootDir, 'prompts/blocks')
    const items = await readdir(blocksDir, { withFileTypes: true })

    const blocks = []
    for (const item of items) {
      if (!item.isDirectory()) continue

      const blockDir = path.join(blocksDir, item.name)
      const readmeFile = path.join(blockDir, 'README.md')

      try {
        const content = await readFile(readmeFile, 'utf-8')
        const typeMatch = content.match(/^## Purpose/)
        const purpose = content.match(/^## Purpose\n\n(.+?)(?:\n##|$)/)?.[1]?.trim() || 'N/A'

        blocks.push({
          name: item.name,
          type: typeMatch ? 'block' : 'unknown',
          purpose: purpose.substring(0, 80) + (purpose.length > 80 ? '...' : ''),
        })
      } catch {
        // Skip unreadable blocks
      }
    }

    console.log(`\n${blocks.length} block(s) found:\n`)
    blocks.forEach((b) => {
      console.log(`  ${b.name} — ${b.purpose}`)
    })
  })

program
  .command('list stacks')
  .description('List all stacks')
  .action(async () => {
    const stacksDir = path.join(rootDir, 'stacks')
    const files = await readdir(stacksDir)

    const stacks = []
    for (const file of files) {
      if (!file.endsWith('.md')) continue

      const filePath = path.join(stacksDir, file)
      const content = await readFile(filePath, 'utf-8')
      const purpose =
        content.match(/^# Stack: (.+)$/m)?.[1] ||
        content.match(/^## Purpose\n\n(.+?)(?:\n##|$)/m)?.[1]?.trim() ||
        file.replace('.md', '')

      const blocks = content.match(/^\d+\. \`(.+?)\`/gm)?.map((m) => m.replace(/^\d+\. /, '')) || []

      stacks.push({
        name: file.replace('.md', ''),
        purpose: purpose.substring(0, 60) + (purpose.length > 60 ? '...' : ''),
        blocks: blocks.length,
      })
    }

    console.log(`\n${stacks.length} stack(s) found:\n`)
    stacks.forEach((s) => {
      console.log(`  ${s.name} — ${s.purpose} (${s.blocks} blocks)`)
    })
  })

program
  .command('search <query>')
  .description('Search blocks and stacks')
  .action(async (query) => {
    const blocksDir = path.join(rootDir, 'prompts/blocks')
    const stacksDir = path.join(rootDir, 'stacks')

    const items = await readdir(blocksDir, { withFileTypes: true })
    const results = []

    for (const item of items) {
      if (!item.isDirectory()) continue

      const blockDir = path.join(blocksDir, item.name)
      const readmeFile = path.join(blockDir, 'README.md')

      try {
        const content = await readFile(readmeFile, 'utf-8')
        if (content.toLowerCase().includes(query.toLowerCase())) {
          const typeMatch = content.match(/^## Purpose/)
          results.push({
            type: 'block',
            name: item.name,
            snippet: content.substring(0, 200),
          })
        }
      } catch {}
    }

    const stackFiles = await readdir(stacksDir)
    for (const file of stackFiles) {
      if (!file.endsWith('.md')) continue

      const filePath = path.join(stacksDir, file)
      const content = await readFile(filePath, 'utf-8')

      if (content.toLowerCase().includes(query.toLowerCase())) {
        results.push({
          type: 'stack',
          name: file.replace('.md', ''),
          snippet: content.substring(0, 200),
        })
      }
    }

    if (results.length === 0) {
      console.log(`No results found for "${query}"`)
      return
    }

    console.log(`\n${results.length} result(s) for "${query}":\n`)
    results.forEach((r) => {
      console.log(`  ${r.type === 'block' ? '🔹' : '📋'} ${r.name}`)
      console.log(`    ${r.snippet}...\n`)
    })
  })

program
  .command('stats')
  .description('Show repository statistics')
  .action(async () => {
    const blocksDir = path.join(rootDir, 'prompts/blocks')
    const stacksDir = path.join(rootDir, 'stacks')

    const blockItems = await readdir(blocksDir, { withFileTypes: true })
    let blockCount = 0
    const blockTypes = {}

    for (const item of blockItems) {
      if (!item.isDirectory()) continue

      const blockDir = path.join(blocksDir, item.name)
      const readmeFile = path.join(blockDir, 'README.md')

      try {
        const content = await readFile(readmeFile, 'utf-8')
        const typeMatch = content.match(/^## Purpose/)
        if (typeMatch) {
          blockCount++
          const type = content.match(/^## Purpose\n\n(.+?)(?:\n##|$)/)?.[1]?.trim() || 'unknown'
          blockTypes[type] = (blockTypes[type] || 0) + 1
        }
      } catch {}
    }

    const stackFiles = await readdir(stacksDir)
    const stackCount = stackFiles.filter((f) => f.endsWith('.md')).length

    console.log('\n📊 Repository Statistics:\n')
    console.log(`  Blocks: ${blockCount}`)
    console.log(`  Stacks: ${stackCount}`)
    console.log(`\n  Block types:`)
    for (const [type, count] of Object.entries(blockTypes)) {
      console.log(`    ${type}: ${count}`)
    }
    console.log('')
  })

program.parse(process.argv)
