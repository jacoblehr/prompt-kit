# Plan

## Current State (May 2026)

The active catalog contains 50 blocks, 48 stacks, and 10 featured stack recipes. The source library is intentionally compact: all active blocks live under `prompts/blocks/`, stacks live under `stacks/`, and the browser catalog is generated into `site-data.js`.

The quality pipeline is now the source of truth for contribution readiness:

- `npm run validate` checks source asset structure.
- `npm run build:check` confirms `site-data.js` is current without rewriting it.
- `npm run lint` checks JavaScript and build scripts.
- `npm run typecheck` checks the browser JavaScript with `tsc`.
- `npm test` covers catalog contracts, CLI behavior, prompt assembly, generated-data determinism, and static browser wiring.

## Architecture Direction

Prompt Kit stays a no-bundler static app. `index.html` loads classic scripts in this order: `site-data.js`, `site.js`, `site-builder.js`, and `site-init.js`.

Catalog rules live in `scripts/catalog/config.mjs`; catalog generation is exposed through `buildCatalog({ root })` in `scripts/catalog/build-catalog.mjs`; shared prompt assembly and prompt analysis live in `scripts/catalog/prompt-utils.mjs`.

`prompts/snippets/` and `prompts/concepts/` are inactive extension paths. They should stay out of docs and generated data unless the build pipeline is deliberately extended again.

## Maintenance Rule

If a file is only useful for managing the library rather than improving your thinking, it is probably overhead. Keep new content small, composable, validated, and covered by `npm run verify`.
