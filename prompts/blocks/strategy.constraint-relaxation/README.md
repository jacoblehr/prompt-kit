# constraint-relaxation

## Purpose
Challenge which constraints are real, flexible, inherited, or self-imposed so a stuck plan can be simplified or reframed.

## Use when
A solution space feels cramped, expensive, slow, or overcomplicated because constraints have been accepted without inspection.

## Expects
A plan, problem, feature, process, prompt, or strategy with stated or implied constraints.

## Adds
A constraint inventory that tests what can be removed, relaxed, sequenced later, traded off, or replaced with a simpler condition.

## Returns
- stated constraints
- implied constraints
- hard constraints
- flexible constraints
- constraints to challenge
- simpler path if relaxed
- risk of relaxing

## Pairs with
`frame.task`, `frame.current-state`, `mode.explore`, `guardrail.scope-creep`, `schema.execution-brief`

## Avoid when
Constraints are legal, safety-critical, contractual, or already validated as non-negotiable.

## Helps prevent:
- inherited complexity
- false requirements
- overbuilding
- treating preferences as constraints

## How to use:
- list both explicit and implied constraints
- classify each as hard, flexible, unknown, or self-imposed
- test what changes if the constraint is removed, delayed, or narrowed
- preserve constraints whose removal creates unacceptable risk

```text
For the supplied problem or plan, list the explicit and implied constraints.
Classify each as hard, flexible, unknown, or inherited.
Return the constraint inventory, the simpler path created by relaxing a non-hard limit, the risk created, and the smallest relaxation worth trying.
```

---

## Metadata
- type: strategy
- stage: explore
- strength: medium
