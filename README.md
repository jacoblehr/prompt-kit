# Prompt Kit

Prompt Kit is a small cognitive composition system for building strong prompts quickly.

The surfaced taxonomy is intentionally small:

- `Blocks` — reusable cognitive units, typed by role
- `Stacks` — named assemblies of blocks for recurring jobs

Open `index.html` first if you want the fastest browsing experience. The browser catalog is generated from the markdown source files into `site-data.js`, which is checked in so the site still opens directly with no setup.

The canonical rules are documented in [docs/ONTOLOGY.md](./docs/ONTOLOGY.md).
The composition rules are in [docs/COMPOSITION.md](./docs/COMPOSITION.md).

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

### Start here

| What you need | Start with |
|---------------|-----------|
| Clarify a vague task | `frame.task` block |
| Open up the problem space | `mode.explore` block |
| Structured reasoning | add one `strategy` block |
| Prevent a specific failure | add a `guardrail` block |
| Consistent output format | add a `schema` block |
| Recurring workflow | find a matching `stack` |
| Evaluate the output | add a `rubric` block |

### Full workflow

1. Start with a saved stack from `stacks/` if one already fits.
2. Otherwise start with a `frame` block to clarify the task.
3. Add a `mode` block to set the cognitive stance.
4. Add a `strategy` or `lens` block if the task needs a specific reasoning move (1–2 max).
5. Add a `guardrail` block if a specific failure mode is likely.
6. Add a `schema` block if the output format matters.
7. Add a `rubric` block if the stakes justify explicit evaluation criteria.

See [docs/COMPOSITION.md](./docs/COMPOSITION.md) for the full assembly rules.

## Updating The Site

If you change markdown content and want the browser view to match, run:

`node scripts/build-site-data.mjs`

That regenerates `site-data.js` from the markdown assets. `index.html` still works without running that command because the generated file is committed.

## Repo Shape

These folders are implementation details for the source library. The browse surface presents them as typed blocks and stacks.

- `modes/` — mode blocks: explore, decide, critique, and reflect
- `strategies/` — strategy blocks: problem splitting, premortem, steelman, inversion, red team
- `prompts/blocks/` — compact blocks: frame, guardrail, and schema blocks
- `prompts/snippets/` — full-task blocks for common families including framing, decisions, research, writing, prompt craft, and developer workflows (75 blocks)
- `prompts/concepts/` — lens blocks drawn from game theory, psychology, computer science, economics, systems thinking, philosophy, statistics, and design (27 lens blocks)
- `stacks/` — named assemblies of blocks for practical use cases, grouped by family (64 stacks across nine families)
- `rubrics/` — rubric blocks for judging output quality
- `docs/` — guidance, not framework machinery

## Good First Compositions

Start with a lightweight stack if the task is fuzzy:

- `mode.critique` + `guardrail.uncertainty` (quick sense-check)
- `mode.explore` + `frame.brainstorm-angles` (fast ideation)
- `mode.reflect` + `frame.extract-insights` + `frame.plan-next-actions` (capture and act)
- `mode.explore` + `frame.task` + `frame.success-criteria` (frame the ask)
- `mode.explore` + `frame.cause-mapping` + `lens.incentive-audit` (map adoption blockers)

Or go deeper with a full sequence:

- `mode.decide` + `frame.compare-options` + `guardrail.assumption-audit` + `schema.decision-memo` + `rubric.decision-quality`
- `mode.decide` + `frame.success-criteria` + `frame.design-cheap-test` + `rubric.plan-quality`
- `mode.critique` + `frame.argument-structure` + `lens.confidence-calibration` (audit an argument)
- `mode.critique` + `strategy.premortem` + `guardrail.uncertainty`
- `mode.critique` + `frame.prompt-critique` + `frame.prompt-rewrite` + `rubric.prompt-quality`
- `mode.explore` + `lens.incentive-audit` + `frame.success-criteria`
- `mode.explore` + `frame.hypothesis-generation` + `frame.design-cheap-test`
- `mode.explore` + `lens.jobs-to-be-done` + `lens.user-mental-model` + `lens.constraint-mapping`
- `mode.explore` + `frame.codepath-walkthrough` + `lens.invariant-check`
- `mode.reflect` + `lens.bias-check` + `frame.decision-journal-entry`
- `mode.reflect` + `frame.cause-mapping` + `frame.extract-insights` + `frame.plan-next-actions`
- `mode.decide` + `frame.explore-exploit-decision` + `guardrail.uncertainty`
- `mode.decide` + `frame.prioritize-opportunities` + `schema.execution-brief`
- `mode.decide` + `frame.stakeholder-map` + `frame.negotiation-prep` + `lens.incentive-audit`
- `mode.explore` + `frame.scenario-planning` + `frame.trend-analysis` + `lens.leverage-points`
- `mode.critique` + `lens.survivorship-bias` + `lens.base-rate-check` + `rubric.decision-quality`
- `mode.explore` + `frame.synthesize-sources` + `lens.survivorship-bias` + `frame.extract-insights`
- `mode.critique` + `frame.security-review` + `lens.failure-mode-analysis` + `frame.risk-register`
- `mode.critique` + `frame.change-impact-review` + `frame.release-readiness`
- `mode.decide` + `frame.experiment-design` + `frame.statistical-significance-check` + `frame.extract-insights`
- `mode.explore` + `frame.prompt-decompose` + `frame.prompt-rewrite` + `frame.prompt-compare`

Start small. Keep only the pieces that measurably improve your results.
