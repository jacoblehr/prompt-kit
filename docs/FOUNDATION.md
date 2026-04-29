# Foundation

This repository is a personal lab for reusable reasoning assets.

The operating model is manual:

- you compose assets by hand
- you test them in real tasks
- you keep what helps
- you delete what adds friction

## Ontology

The canonical ontology lives in [docs/ONTOLOGY.md](./ONTOLOGY.md).
The composition rules live in [docs/COMPOSITION.md](./COMPOSITION.md).

At a glance, the surfaced system uses two concepts:

1. Blocks
2. Stacks

## Differentiation

Follow the canonical decision rules in [docs/ONTOLOGY.md](./ONTOLOGY.md).

## Design Rules

1. Blocks stay reusable and understandable on their own.
2. Block types clarify role — they do not multiply ontology layers.
3. Mode blocks are reasoning stances, not writing styles.
4. Strategy blocks are methods of thought, not personalities.
5. Lens blocks are conceptual frames, not task completions.
6. Guardrail blocks target a specific failure mode — they are not decoration.
7. Schema blocks define output shape — they come after reasoning instructions.
8. Structured outputs beat eloquent vagueness.
9. Critique and reflection matter more than completeness theater.

## Working Model

Use this repo like a workshop bench, not a software platform.

Typical flow:

1. frame the task
2. choose a stack if one already fits
3. otherwise choose a mode block
4. add a strategy, recurse, guardrail, or schema block as needed
5. inspect the result
6. keep, revise, or discard the pieces

## What We Removed On Purpose

- machine-readable asset manifests
- schema and packaging machinery
- per-asset eval scaffolding
- generic prompts any LLM handles without guidance (email replies, basic learning prompts)
- snippets that substantially overlap with existing compact prompt blocks
- prompt helpers that were redundant with the main browse set
- `frame.scope` — merged into `frame.task` (scope boundary is part of task framing)
- `schema.plan-next-actions` — merged into `schema.execution-brief` (strict subset of richer block)
- `strategy.inversion` — deleted (premortem is the same strategy with stronger framing)
- Six thin stacks: `deliver-feedback`, `explore-vs-exploit`, `reflect-act`, `prioritize`, `data-to-story`, `tech-debt-triage` — each was a 2–4 block subset of an existing stack or trivially assembled from minimum blocks
