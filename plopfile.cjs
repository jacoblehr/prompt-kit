const path = require('path')
const fs = require('fs')

module.exports = function (plop) {
  const blocksDir = path.join(__dirname, 'prompts')
  const stacksDir = path.join(__dirname, 'stacks')

  // Helper to get existing categories for selection
  const getBlockCategories = () => {
    const categories = []
    const blocksPath = path.join(blocksDir, 'blocks')
    if (fs.existsSync(blocksPath)) {
      fs.readdirSync(blocksPath).forEach((dir) => {
        if (fs.statSync(path.join(blocksPath, dir)).isDirectory()) {
          categories.push(dir)
        }
      })
    }
    return categories
  }

  const getConceptCategories = () => {
    const categories = []
    const conceptsPath = path.join(blocksDir, 'concepts')
    if (fs.existsSync(conceptsPath)) {
      fs.readdirSync(conceptsPath).forEach((dir) => {
        if (fs.statSync(path.join(conceptsPath, dir)).isDirectory()) {
          categories.push(dir)
        }
      })
    }
    return categories
  }

  const getDomains = () => {
    const domains = []
    const conceptsPath = path.join(blocksDir, 'concepts')
    const domainPath = path.join(conceptsPath, '{{category}}')
    if (fs.existsSync(domainPath)) {
      fs.readdirSync(domainPath).forEach((file) => {
        if (file.endsWith('.md')) {
          domains.push(file.replace('.md', ''))
        }
      })
    }
    return domains
  }

  plop.setGenerator('block', {
    description: 'Create a new prompt block',
    prompting: function (answers) {
      return plop.prompt([
        {
          type: 'list',
          name: 'type',
          message: 'What type of block?',
          choices: ['frame', 'mode', 'strategy', 'lens', 'guardrail', 'schema', 'rubric'],
        },
        {
          type: 'input',
          name: 'name',
          message: 'Block name (kebab-case):',
          validate: function (input) {
            return (input && /^[a-z][a-z0-9-]*$/.test(input)) || 'use kebab-case'
          },
        },
        {
          type: 'input',
          name: 'purpose',
          message: 'Purpose:',
        },
        {
          type: 'input',
          name: 'useWhen',
          message: 'Use when:',
        },
        {
          type: 'input',
          name: 'expects',
          message: 'Expects:',
        },
        {
          type: 'input',
          name: 'adds',
          message: 'Adds:',
        },
        {
          type: 'input',
          name: 'returns',
          message: 'Returns (comma-separated):',
          default: 'Transformed input',
        },
        {
          type: 'input',
          name: 'pairsWith',
          message: 'Pairs with (comma-separated):',
          default: '',
        },
        {
          type: 'input',
          name: 'avoidWhen',
          message: 'Avoid when:',
          default: '',
        },
      ])
    },
    writing: function (answers) {
      const template = plop.readFileString('plop-templates/blocks/' + answers.type + '.hbs')
      var content = plop.renderString(template, answers)
      var dir = path.join(blocksDir, 'blocks', answers.name)
      var file = path.join(dir, 'README.md')
      fs.ensureDirSync(dir)
      fs.writeFileSync(file, content)
      return 'Created block at ' + file
    },
  })

  plop.setGenerator('snippet', {
    description: 'Create a new prompt snippet',
    prompting: function (answers) {
      return plop.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Snippet name (kebab-case):',
          validate: function (input) {
            return input && /^[a-z][a-z0-9-]*$/.test(input)
          },
        },
        {
          type: 'input',
          name: 'type',
          message: 'Block type (frame/mode/strategy/lens/guardrail/schema/rubric):',
          default: 'frame',
        },
        {
          type: 'input',
          name: 'purpose',
          message: 'Purpose:',
        },
        {
          type: 'input',
          name: 'useWhen',
          message: 'Use when:',
        },
        {
          type: 'input',
          name: 'expects',
          message: 'Expects:',
        },
        {
          type: 'input',
          name: 'adds',
          message: 'Adds:',
        },
        {
          type: 'input',
          name: 'returns',
          message: 'Returns (comma-separated):',
          default: 'Transformed input',
        },
        {
          type: 'input',
          name: 'pairsWith',
          message: 'Pairs with (comma-separated):',
          default: '',
        },
        {
          type: 'input',
          name: 'avoidWhen',
          message: 'Avoid when:',
          default: '',
        },
      ])
    },
    writing: function (answers) {
      var template = plop.readFileString('plop-templates/blocks/snippet.hbs')
      var content = plop.renderString(template, answers)
      var file = path.join(blocksDir, 'snippets', answers.name + '.md')
      fs.writeFileSync(file, content)
      return 'Created snippet at ' + file
    },
  })

  plop.setGenerator('stack', {
    description: 'Create a new stack',
    prompting: function (answers) {
      return plop.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Stack name (kebab-case):',
          validate: function (input) {
            return input && /^[a-z][a-z0-9-]*$/.test(input)
          },
        },
        {
          type: 'input',
          name: 'job',
          message: 'Job description:',
        },
      ])
    },
    writing: function (answers) {
      var template = [
        '# Stack: ' + answers.name,
        '',
        'Use when',
        '',
        '## Composition notes',
        '',
        '**Minimum blocks:**',
        '',
        '**Full sequence:**',
        '',
        '## Block order rationale',
        '',
        '## Common swaps',
        '',
        '## Common failure mode',
        '',
      ].join('\n')
      var file = path.join(stacksDir, answers.name + '.md')
      fs.writeFileSync(file, template)
      return 'Created stack at ' + file
    },
  })
}
