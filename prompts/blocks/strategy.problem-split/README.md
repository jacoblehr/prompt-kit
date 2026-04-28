# problem-split

## Purpose
Break a large or tangled problem into smaller parts that can be understood, assigned, or solved more cleanly.

## Use when
The task is too broad to reason about directly and progress depends on separating independent subproblems.

## Expects
A complex problem, objective, or request with multiple moving parts.

## Adds
A decomposition that isolates subproblems, dependencies, and the best order for tackling them.

## Returns
- subproblems
- dependencies between them
- recommended order of attack

## Pairs with
`frame.task`, `mode.explore`, `schema.execution-brief`

## Avoid when
The problem is already tightly scoped and splitting it would add ceremony without clarity.

## Helps prevent:
- muddled reasoning
- hidden dependencies
- tackling the wrong slice first

## How to use:
- decompose until each part has one clear job
- stop before the parts become trivial administrative fragments

```text
Split the problem into the smallest useful parts.
Name the dependencies between them and suggest the order that reduces coordination or risk.
```

---

## Metadata
- type: strategy
- stage: analyze
- strength: medium