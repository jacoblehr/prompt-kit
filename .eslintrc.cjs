module.exports = {
  env: {
    node: true,
    es2022: true,
  },
  parserOptions: {
    sourceType: 'module',
  },
  extends: ['eslint:recommended'],
  rules: {
    // Strict mode
    strict: ['error', 'global'],

    // Allow unused args for plop handlers (conventional prefix)
    'no-unused-vars': [
      'error',
      {
        args: 'after-used',
        argsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],

    // Allow require-based imports in plopfile
    'n/no-missing-require': 'off',
    'n/no-unpublished-require': 'off',

    // Use global 'use strict'
    strict: ['error', 'global'],
  },
  overrides: [
    {
      files: ['plopfile.js'],
      rules: {
        strict: 'off',
        'n/no-missing-require': 'off',
        'n/no-unpublished-require': 'off',
      },
    },
  ],
}
