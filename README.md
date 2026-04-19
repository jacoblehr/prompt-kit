# Prompt Kit

Prompt Kit is a lightweight library for composing prompt blocks by hand and saving the combinations that actually work.

The surfaced taxonomy is intentionally small:

- `Blocks` - reusable prompt units, typed by role
- `Stacks` - saved combinations of blocks for real tasks

Open `index.html` first if you want the fastest browsing experience. The browser catalog is generated from the markdown source files into `site-data.js`, which is checked in so the site still opens directly with no setup.

The canonical rules are documented in [docs/ONTOLOGY.md](./docs/ONTOLOGY.md).

## What This Repo Is For

- better framing
- better option generation
- better decisions
- better plans
- better critique
- better reflection
- better prompt repair
- better prioritization
- better de-risking
- better stakeholder alignment

## What This Repo Is Not

- a formal asset registry
- a packaging system
- a schema-heavy prompt platform
- an automated execution engine

That overhead can come later if the assets prove useful. For now, the repo is optimized for fast manual testing.

## How To Use It

1. Start with a saved stack from `stacks/` if one already fits.
2. Otherwise pick a mode block from `modes/`.
3. Add a strategy block from `strategies/` if the task needs a specific reasoning move.
4. Add one or two core or lens blocks from `prompts/`.
5. If the output matters, finish with a rubric block from `rubrics/`.

## Updating The Site

If you change markdown content and want the browser view to match, run:

`node scripts/build-site-data.mjs`

That regenerates `site-data.js` from the markdown assets. `index.html` still works without running that command because the generated file is committed.

## Repo Shape

These folders are implementation details for the source library. The browse surface still presents them as typed blocks and stacks.

- `modes/` - mode blocks like explore, decide, critique, and reflect
- `strategies/` - strategy blocks like problem splitting and premortem
- `prompts/blocks/` - compact core blocks such as framing, guardrails, and output schemas
- `prompts/snippets/` - broader core blocks for common tasks
- `prompts/concepts/` - lens blocks like game theory, psychology, and computer science
- `stacks/` - saved combinations of blocks for practical use cases
- `rubrics/` - rubric blocks for judging output quality
- `docs/` - guidance, not framework machinery

## Good First Compositions

- `mode.explore` + `strategy.problem_split` + `core.frame.task`
- `mode.decide` + `core.frame.success-criteria` + `core.schema.decision-memo`
- `mode.critique` + `strategy.premortem` + `core.guardrail.uncertainty`
- `mode.critique` + `core.prompt-critique` + `core.prompt-rewrite` + `rubric.prompt-quality`
- `mode.explore` + `lens.incentive-audit` + `core.frame.success-criteria`
- `mode.reflect` + `lens.bias-check` + `core.decision-journal-entry`
- `mode.reflect` + `core.weekly-review` + `core.decision-journal-entry`
- `mode.decide` + `core.explore-exploit-decision` + `core.guardrail.uncertainty`
- `mode.decide` + `core.prioritize-opportunities` + `core.schema.execution-brief`
- `mode.decide` + `core.design-cheap-test` + `core.guardrail.uncertainty`
- `mode.explore` + `core.stakeholder-map` + `lens.coordination-plan`

Start small. Keep only the pieces that measurably improve your results.
