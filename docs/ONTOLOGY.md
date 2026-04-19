# Ontology

This repo uses the smallest useful taxonomy.

## Canonical Hierarchy

1. **Blocks**
2. **Stacks**

That is the entire surfaced system.

## Blocks

A block is any reusable prompt fragment or instruction unit.

Blocks are typed by role through metadata instead of being split into many top-level ontology concepts.

Current block types:

- `core` - task, objective, constraints, output shape, or ready-to-use task prompt
- `lens` - reusable perspective or angle
- `mode` - overarching stance or direction
- `strategy` - execution mechanic or reasoning pattern
- `style` - tone, verbosity, or formatting guidance
- `rubric` - evaluation criteria

Practical rule set:

- A block should be reusable.
- A block should be small to medium in scope.
- A block should be understandable on its own.
- A block should be typed by role.

## Stacks

A stack is a saved combination of blocks for a real task or repeatable use case.

Practical rule set:

- A stack should solve a concrete use case.
- A stack should combine multiple blocks.
- A stack should be easy to tweak.
- A stack should be named by outcome or use case.

## Mapping From The Source Folders

The repo still stores source material in a few implementation folders, but those folders all map into the simpler surfaced taxonomy:

- `modes/` -> blocks with `type=mode`
- `strategies/` -> blocks with `type=strategy`
- `prompts/blocks/` -> blocks with `type=core`
- `prompts/snippets/` -> blocks with `type=core`
- `prompts/concepts/` -> blocks with `type=lens`
- `rubrics/` -> blocks with `type=rubric`
- `stacks/` -> stacks

Snippet families, lens groups, and similar distinctions are browsing metadata, not top-level ontology layers.

## Decision Rules

Use these rules to decide where a new asset belongs:

- If it is reusable on its own, it is a `Block`.
- If it mainly changes stance, mark it `type=mode`.
- If it mainly changes reasoning mechanics, mark it `type=strategy`.
- If it mainly provides prompt structure, task framing, or output shape, mark it `type=core`.
- If it mainly reframes the problem through a discipline or perspective, mark it `type=lens`.
- If it mainly checks output quality, mark it `type=rubric`.
- If it is a saved combination of blocks for a repeatable use case, it is a `Stack`.

## Canonical Examples

- `mode.explore` as a mode block for breadth
- `strategy.problem-split` as a strategy block for decomposition
- `core.frame.task` as a core block for problem framing
- `core.prompt-compare` as a task-ready core block
- `lens.incentive-audit` as a lens block
- `rubric.decision-quality` as a rubric block
- `stack.explore-to-decision` as a saved stack

## Non-Goals

- This repo does not need formal execution graphs.
- It does not need a hand-maintained asset registry as the source of truth.
- It does not need every prompt to fit one schema.
- It does not need taxonomy theater.
