# recurse.decompose

## Purpose
Break a problem into a structured hierarchy of subproblems recursively, stopping when subproblems are directly solvable.

## Use when
A problem is too large or complex to address directly. Use when the path to a solution requires understanding structure first.

## Expects
- problem: the problem or task to decompose
- max_depth: how many recursive levels to allow (1–4; default 2)
- max_subproblems: max subproblems per level (2–5; default 3)

## Adds
A directive to enumerate subproblems, check for direct solvability at each node, and stop recursing when a subproblem can be resolved directly or depth/count limits are reached.

## Returns
- structured hierarchy of subproblems (numbered tree)
- leaf-level direct answers where available
- stopping reason per branch: `solved` | `depth_reached` | `not_decomposable`
- final synthesis of leaf answers

## Pairs with
`recurse.evaluate`, `recurse.refine`, `guardrail.bounded-recursion`, `strategy.problem-split`

## Avoid when
The problem is already well-scoped — decomposition adds noise when a direct approach suffices. Test depth 1 first.

---

## Metadata
- type: recurse
- stage: analyze
- strength: medium

---

## Stopping conditions
- subproblem is directly solvable: stop and solve immediately
- max_depth reached: solve the remaining subproblem directly even if imperfect
- max_subproblems reached at a level: do not generate additional subproblems

## Anti-patterns
- setting max_depth > 4 (produces unmanageable hierarchies for most tasks)
- decomposing without a direct-solvability check at each node (produces infinite descent)
- synthesizing before all branches are resolved
