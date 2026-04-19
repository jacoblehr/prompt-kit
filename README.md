# Prompt Kit

Prompt Kit is a lightweight library for composing prompt blocks by hand and saving the combinations that actually work.

The surfaced taxonomy is intentionally small:

- `Blocks` — reusable prompt units, typed by role
- `Stacks` — saved combinations of blocks for real tasks

Open `index.html` first if you want the fastest browsing experience. The browser catalog is generated from the markdown source files into `site-data.js`, which is checked in so the site still opens directly with no setup.

The canonical rules are documented in [docs/ONTOLOGY.md](./docs/ONTOLOGY.md).

## What This Repo Is For

- better framing (including finding the real job behind a request)
- better option generation and ideation
- better decisions and goal-setting
- better plans with measurable outcomes
- better critique and assumption pressure-testing
- better reflection and after-action learning
- better prompt repair and engineering
- better prioritisation under constraints
- better de-risking and threat modelling
- better stakeholder alignment and negotiation
- better foresight and scenario thinking
- better process and workflow analysis
- better statistical reasoning and experiment design
- better research synthesis and evidence evaluation
- better software engineering (design, review, debugging, security)

## What This Repo Is Not

- a formal asset registry
- a packaging system
- a schema-heavy prompt platform
- an automated execution engine

That overhead can come later if the assets prove useful. For now, the repo is optimized for fast manual testing.

## How To Use It

1. Start with a saved stack from `stacks/` if one already fits. Stacks are grouped by family — browse the family that matches your task.
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

- `modes/` — mode blocks: explore, decide, critique, and reflect
- `strategies/` — strategy blocks: problem splitting, premortem, steelman, inversion, red team
- `prompts/blocks/` — compact core blocks: framing, guardrails, and output schemas
- `prompts/snippets/` — full-task snippets for focused families including framing, decisions, research, writing, prompt craft, and developer workflows (75 snippets)
- `prompts/concepts/` — lens blocks drawn from game theory, psychology, computer science, economics, systems thinking, philosophy, statistics, and design (27 lens blocks)
- `stacks/` — saved combinations of blocks for practical use cases, grouped by family (64 stacks across nine families)
- `rubrics/` — rubric blocks for judging output quality
- `docs/` — guidance, not framework machinery

## Good First Compositions

Start with a lightweight stack if the task is fuzzy:

- `mode.critique` + `core.guardrail.uncertainty` (quick sense-check)
- `mode.explore` + `core.brainstorm-angles` (fast ideation)
- `mode.reflect` + `core.extract-insights` + `core.plan-next-actions` (capture and act)
- `mode.explore` + `core.clarify-task` + `core.frame.success-criteria` (frame the ask)
- `mode.explore` + `core.cause-mapping` + `lens.incentive-audit` (map adoption blockers)

Or go deeper with a full sequence:

- `mode.decide` + `core.compare-options` + `core.assumption.audit` + `core.schema.decision-memo` + `rubric.decision-quality`
- `mode.decide` + `core.define-success-metrics` + `core.design-cheap-test` + `rubric.plan-quality`
- `mode.critique` + `core.argument-structure` + `lens.confidence-calibration` (audit an argument)
- `mode.critique` + `strategy.premortem` + `core.guardrail.uncertainty`
- `mode.critique` + `core.prompt-critique` + `core.prompt-rewrite` + `rubric.prompt-quality`
- `mode.explore` + `lens.incentive-audit` + `core.frame.success-criteria`
- `mode.explore` + `core.hypothesis-generation` + `core.design-cheap-test`
- `mode.explore` + `lens.jobs-to-be-done` + `lens.user-mental-model` + `lens.constraint-mapping`
- `mode.explore` + `core.codepath-walkthrough` + `lens.invariant-check`
- `mode.reflect` + `lens.bias-check` + `core.decision-journal-entry`
- `mode.reflect` + `core.cause-mapping` + `core.extract-insights` + `core.plan-next-actions`
- `mode.decide` + `core.explore-exploit-decision` + `core.guardrail.uncertainty`
- `mode.decide` + `core.prioritize-opportunities` + `core.schema.execution-brief`
- `mode.decide` + `core.stakeholder-map` + `core.negotiation-prep` + `lens.incentive-audit`
- `mode.explore` + `core.scenario-planning` + `core.trend-analysis` + `lens.leverage-points`
- `mode.critique` + `lens.survivorship-bias` + `lens.base-rate-check` + `rubric.decision-quality`
- `mode.explore` + `core.synthesize-sources` + `lens.survivorship-bias` + `core.extract-insights`
- `mode.critique` + `core.security-review` + `lens.failure-mode-analysis` + `core.risk-register`
- `mode.critique` + `core.change-impact-review` + `core.release-readiness`
- `mode.decide` + `core.experiment-design` + `core.statistical-significance-check` + `core.extract-insights`
- `mode.explore` + `core.prompt-decompose` + `core.prompt-rewrite` + `core.prompt-compare`

Start small. Keep only the pieces that measurably improve your results.
