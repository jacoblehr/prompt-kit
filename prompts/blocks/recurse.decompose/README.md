# recurse.decompose

## Purpose
Recursively break a problem into smaller solvable units until the remaining pieces are small enough to act on directly.

## Use when
The problem is too large or layered for a single-pass solution and decomposition is the only way to make progress.

## Expects
A problem statement plus any depth limit or stop condition that should bound recursion.

## Adds
A decomposition tree that shows parent-child relationships, leaf tasks, and where recursion should stop.

## Returns
- decomposition tree
- current depth
- leaf tasks or stop point

## Pairs with
`recurse.evaluate`, `guardrail.bounded-recursion`, `schema.execution-brief`

## Avoid when
The task is already atomic and recursion would only add overhead.

---

## Metadata
- type: recurse
- stage: analyze
- strength: medium