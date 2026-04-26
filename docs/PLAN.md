# Plan

## Current State (April 2026)

The core content library is in good shape: 127 blocks, 64 stacks with full composition rationale, a working browser app, and a CLI.

The primary risk is that all four automated quality pipelines are currently broken — producing false positives or crashing — which makes `npm run verify` unreliable and blocks the contribution workflow. Fix these before adding new content.

---

## Quick Fixes (single session each)

These are the highest-value changes by impact/effort ratio. Do them in order — each one unblocks the next.

1. **~~Fix ESLint config~~** ✓ — Fixed `.eslintrc.cjs`: added `ecmaVersion: 'latest'`, split browser overrides for `site.js`, `site-builder.js`, and `site-init.js` (separate browser env + cross-file globals + `vars: 'local'` + `allowEmptyCatch`). Removed duplicate `strict` rule. Also fixed one real bug: `\"` → `"` in a template literal in `site-builder.js`. Browser files now lint with zero false positives.

2. **~~Fix `plopfile.js` → `plopfile.cjs`~~** ✓ — Renamed to `plopfile.cjs`; updated `files` pattern in `.eslintrc.cjs`. Plop auto-discovers the `.cjs` file; `node -e "require('./plopfile.cjs')"` confirms clean CJS load.

3. **~~Fix validator for actual stack format~~** ✓ — `validateStacks()` checked for `## Minimum blocks` and `## Full sequence` headings (neither exist in any stack). Changed to `**Minimum blocks:**` (the actual bold-text format) and removed the `## Full sequence` check entirely. Eliminated all 128 false-positive warnings; `npm run validate` now passes clean.

4. **~~Generate `copy` text for rubrics~~** ✓ — `makeRubric()` now synthesizes a copyable prompt: heading + use-when line + questions as a bullet list. All 8 rubrics have non-empty `copy` in `site-data.js`; the browser's copy action works correctly.

5. **~~Add `site-data.js` to `.gitignore`~~** ✓ — Added to `.gitignore`. The 13,620-line generated file will no longer be tracked or appear in PR diffs.

6. **~~Rename `scope.frame/` → `frame.scope/`~~** ✓ — Renamed `prompts/blocks/scope.frame/` to `prompts/blocks/frame.scope/`. Updated `"scope.frame"` → `"frame.scope"` in `promptBlockOrder` in `build-site-data.mjs`. Fixed broken ref `frame.scope.frame` → `frame.scope` in `stacks/orient-before-acting.md`.

7. **~~Standardize strategy directory names~~** ✓ — Renamed `problem_split/` → `problem-split/` and `red_team/` → `red-team/` in `strategies/`. Updated `strategyOrder` in `build-site-data.mjs` and all 11 cross-references across stacks, modes, strategies, and docs.

---

## Strategic Work (after quick fixes land)

8. **~~Write tests for the build pipeline~~** ✓ — Created `tests/build-pipeline.test.mjs` with 14 tests across 4 suites: site-data output shape, block contract completeness (including rubric/prompt-block copy), stack ref integrity (minimumBlocks + fullSequence + featuredStacks), and CLI output format. Also fixed a pre-existing CLI bug: `program.command('list blocks')` / `program.command('list stacks')` conflicted in Commander v14 — refactored to use a parent `list` command with subcommands. All 14 tests pass.

9. **~~Consolidate `modes/`, `strategies/`, `rubrics/` into `prompts/blocks/`~~** ✓ — Moved 17 block files: 4 modes → `prompts/blocks/mode.*/`, 5 strategies → `prompts/blocks/strategy.*/`, 8 rubrics (flat files → directories) → `prompts/blocks/rubric.*/`. Updated `build-site-data.mjs`: paths in `makeMode`/`makeStrategy`/`makeRubric`; listing calls now filter `allBlockDirs` by prefix; `promptBlocks` listing excludes `mode.*`/`strategy.*`/`rubric.*`. Updated validator to apply prompt-block required sections only to `frame.*`/`guardrail.*`/`schema.*`/`assumption.*` dirs, and rubric `Questions:` check to `rubric.*` dirs. Updated `docs/ONTOLOGY.md`. Build produces 206 entries; all 14 tests pass.

---

## Maintenance Rule

If a file is only useful for managing the library rather than improving your thinking, it is probably overhead.
