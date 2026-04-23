import { readFile, readdir, stat } from 'fs/promises'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.join(__dirname, '..')

async function validate() {
  const errors = []
  const warnings = []

  // Validate blocks directory
  const blocksDir = path.join(rootDir, 'prompts/blocks')
  await validateBlocks(blocksDir, errors, warnings)

  // Validate stacks
  const stacksFile = path.join(rootDir, 'stacks')
  await validateStacks(stacksFile, errors, warnings)

  // Validate build output
  const siteData = path.join(rootDir, 'site-data.js')
  await validateSiteData(siteData, errors, warnings)

  // Return results
  if (errors.length > 0) {
    console.error('\n❌ VALIDATION FAILED\n')
    errors.forEach((e, i) => console.error(`  ${i + 1}. ${e}`))
    console.error(`\n${warnings.length} warning(s)\n`)
    process.exit(1)
  } else {
    console.log('\n✅ VALIDATION PASSED\n')
    if (warnings.length > 0) {
      warnings.forEach((w, i) => console.log(`  ${i + 1}. ${w}`))
      console.log()
    }
    process.exit(0)
  }
}

async function validateBlocks(dir, errors, warnings) {
  const items = await readdir(dir, { withFileTypes: true })

  for (const item of items) {
    if (!item.isDirectory()) continue

    const blockDir = path.join(dir, item.name)
    const readmeFile = path.join(blockDir, 'README.md')

    try {
      const content = await readFile(readmeFile, 'utf-8')

      // Check required sections
      const required = ['## Purpose', '## Use when', '## Expects', '## Adds']
      for (const section of required) {
        if (!content.includes(section)) {
          errors.push(`Block "${item.name}" missing required section: ${section}`)
        }
      }

      // Check metadata
      if (!content.includes('Metadata:') && !content.includes('type:')) {
        errors.push(`Block "${item.name}" missing metadata section`)
      }
    } catch (err) {
      errors.push(`Block "${item.name}" missing README.md`)
    }
  }
}

async function validateStacks(dir, errors, warnings) {
  const items = await readdir(dir, { withFileRemarks: false })

  for (const file of items) {
    if (!file.endsWith('.md')) continue

    const filePath = path.join(dir, file)
    const content = await readFile(filePath, 'utf-8')

    // Check required sections
    if (!content.includes('## Composition notes')) {
      warnings.push(`Stack "${file}" missing composition notes`)
    }
    if (!content.includes('## Minimum blocks')) {
      warnings.push(`Stack "${file}" missing minimum blocks`)
    }
    if (!content.includes('## Full sequence')) {
      warnings.push(`Stack "${file}" missing full sequence`)
    }
  }
}

async function validateSiteData(file) {
  try {
    const content = await readFile(file, 'utf-8')

    if (!content.includes('globalThis.SITE_DATA')) {
      errors.push('site-data.js is not properly generated')
    }

    // Check for basic structure
    if (content.indexOf('"blocks":') === -1 || content.indexOf('"stacks":') === -1) {
      errors.push('site-data.js missing blocks or stacks data')
    }
  } catch (err) {
    errors.push('site-data.js not found or unreadable')
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await validate()
}

export { validate }
