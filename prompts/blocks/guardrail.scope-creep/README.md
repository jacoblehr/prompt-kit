# guardrail.scope-creep

## Purpose
Prevent a plan, prompt, or recommendation from expanding beyond the objective, capacity, or decision it is meant to serve.

## Use when
The work is starting to accumulate extra goals, checks, features, audiences, or implementation details that may dilute the main outcome.

## Expects
A draft plan, scope, roadmap, prompt, feature, or recommendation plus the original objective or constraint.

## Adds
A scope control pass that separates essential work from optional, deferred, or distracting additions.

## Returns
- core objective
- in-scope items
- scope creep candidates
- deferred items
- items to remove
- smallest useful next version

## Pairs with
`frame.task`, `frame.success-criteria`, `mode.critique`, `schema.execution-brief`, `schema.rollout-plan`

## Avoid when
The task is deliberately divergent exploration and narrowing scope would interrupt useful idea generation.

---

## Metadata
- type: guardrail
- stage: critique
- strength: medium
