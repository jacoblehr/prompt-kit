# Stack: refine-loop

Iteratively improve output against explicit criteria until all pass or iteration limit is reached.

Blocks:
1. `recurse.evaluate`
2. `recurse.refine`
3. `guardrail.bounded-recursion`

Optional add-ons:
- `frame.task` when scope or non-goals need to be made explicit.

Expected output: Final output with all criteria passing, iteration count, and stopping reason stated.

## Composition notes

`recurse.evaluate` checks the current output against stated criteria and produces a gap list. `recurse.refine` iterates on each gap. `guardrail.bounded-recursion` enforces an exit condition to prevent over-polishing. All three blocks are required for this stack to function correctly.

**Minimum blocks:** `recurse.evaluate` + `recurse.refine` + `guardrail.bounded-recursion`
