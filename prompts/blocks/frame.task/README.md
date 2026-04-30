# frame.task

## Purpose
Turn a messy, underspecified request into a clean problem frame before reasoning begins.

## Use when
The request is vague, broad, or likely to drift. Use at the start of a stack before selecting a strategy or generating options.

## Expects
A raw request, situation description, or problem statement.

## Adds
A structured frame with the stated ask separated from the likely objective, explicit constraints, surfaced unknowns, and a recommended next reasoning step.

## Returns
- stated ask
- likely objective (with note if inferred)
- constraints
- knowns
- unknowns
- decision or action this frame supports
- recommended next reasoning step

## Pairs with
`mode.explore`, `strategy.problem-split`, `frame.success-criteria`, `guardrail.uncertainty`

## Avoid when
The task is already tightly specified and a restatement would add noise.

---

## Metadata
- type: frame
- stage: frame
- strength: medium
