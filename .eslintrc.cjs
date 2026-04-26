module.exports = {
  env: {
    node: true,
    es2022: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  extends: ['eslint:recommended'],
  rules: {
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
  },
  overrides: [
    {
      // site.js: classic script, defines the shared globals consumed by site-builder.js.
      // Top-level vars are intentional browser globals (exported to other scripts),
      // so no-unused-vars must ignore the outermost scope.
      files: ['site.js'],
      env: {
        browser: true,
        node: false,
        es2022: true,
      },
      parserOptions: {
        sourceType: 'script',
      },
      rules: {
        'no-unused-vars': ['error', {
          vars: 'local',
          args: 'after-used',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        }],
        // Empty catch {} is an intentional error-swallowing pattern (e.g. localStorage)
        'no-empty': ['error', { allowEmptyCatch: true }],
      },
      globals: {
        // Consumed from site-builder.js
        closeBuilder: 'readonly',
        openBuilder: 'readonly',
        renderBuilder: 'readonly',
        showBuilderToast: 'readonly',
        syncAddButtons: 'readonly',
      },
    },
    {
      // site-builder.js: classic script, consumes globals defined in site.js.
      files: ['site-builder.js'],
      env: {
        browser: true,
        node: false,
        es2022: true,
      },
      parserOptions: {
        sourceType: 'script',
      },
      rules: {
        'no-unused-vars': ['error', {
          vars: 'local',
          args: 'after-used',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        }],
        'no-empty': ['error', { allowEmptyCatch: true }],
      },
      globals: {
        // Consumed from site.js
        applyFilters: 'readonly',
        blocks: 'readonly',
        blockTypeLabel: 'readonly',
        BLOCK_TYPE_RANK: 'readonly',
        builderItemKey: 'readonly',
        BUILDER_SECTION_ORDER: 'readonly',
        builderState: 'readonly',
        defaultBuilderSectionForItem: 'readonly',
        escHtml: 'readonly',
        extractPlaceholders: 'readonly',
        fillPromptTemplate: 'readonly',
        filterState: 'readonly',
        getBuilderSection: 'readonly',
        getExistingBuilderItem: 'readonly',
        humanizeBlockTitle: 'readonly',
        isValidBuilderSection: 'readonly',
        loadedStackKey: 'writable',
        matchesFuzzySearch: 'readonly',
        normalizeBuilderInputLabel: 'readonly',
        renderRecentItems: 'readonly',
        resolveRef: 'readonly',
        stacks: 'readonly',
        summarizeBuilderSection: 'readonly',
      },
    },
    {
      // site-init.js: classic browser script, only calls globals from site.js and site-builder.js.
      files: ['site-init.js'],
      env: {
        browser: true,
        node: false,
        es2022: true,
      },
      parserOptions: {
        sourceType: 'script',
      },
      globals: {
        applyFilters: 'readonly',
        builderState: 'readonly',
        openBuilder: 'readonly',
        renderBuilder: 'readonly',
        renderCards: 'readonly',
        renderFilterGroups: 'readonly',
        renderRecentItems: 'readonly',
        syncAddButtons: 'readonly',
        updateNavCounts: 'readonly',
      },
    },
    {
      files: ['plopfile.cjs'],
      rules: {
        strict: 'off',
        'n/no-missing-require': 'off',
        'n/no-unpublished-require': 'off',
      },
    },
  ],
}
