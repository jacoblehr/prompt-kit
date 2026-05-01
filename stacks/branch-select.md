# Stack: branch-select

Generate competing paths, select the best one, and discard the rest before refining.

Blocks:
1. `frame.task`
2. `recurse.branch-prune`
3. `guardrail.bounded-recursion`

Optional add-ons:
- `recurse.evaluate` when each branch or draft needs an explicit stop or continue verdict.
- `recurse.refine` when one more bounded improvement pass is useful.

Expected output: Single polished output on the winning branch; all other branches explicitly pruned with rationale.

## Composition notes

`recurse.branch-prune` generates and eliminates weak options early, preventing effort being wasted on inferior branches. `recurse.evaluate` applies criteria across survivors. `recurse.refine` deepens the winning branch. `guardrail.bounded-recursion` enforces an exit to prevent over-iteration.

**Minimum blocks:** `frame.task` + `recurse.branch-prune` + `guardrail.bounded-recursion`
