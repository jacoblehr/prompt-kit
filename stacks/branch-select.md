# Stack: branch-select

Generate competing paths, select the best one, and discard the rest before refining.

Blocks:
1. `recurse.branch-prune`
2. `recurse.evaluate`
3. `recurse.refine`
4. `guardrail.bounded-recursion`

Expected output: Single polished output on the winning branch; all other branches explicitly pruned with rationale.
