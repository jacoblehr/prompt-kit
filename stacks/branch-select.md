# Stack: branch-select

Generate competing paths, select the best one, and discard the rest before refining.

Blocks:
1. `frame.task`
2. `recurse.branch-prune`
3. `recurse.evaluate`
4. `recurse.refine`
5. `guardrail.bounded-recursion`

Expected output: Single polished output on the winning branch; all other branches explicitly pruned with rationale.

## Composition notes

`recurse.branch-prune` generates and eliminates weak options early, preventing effort being wasted on inferior branches. `recurse.evaluate` applies criteria across survivors. `recurse.refine` deepens the winning branch. `guardrail.bounded-recursion` enforces an exit to prevent over-iteration.

**Minimum blocks:** `recurse.branch-prune` + `recurse.evaluate`
