# Stack: refine-loop

Iteratively improve output against explicit criteria until all pass or iteration limit is reached.

Blocks:
1. `frame.task`
2. `recurse.evaluate`
3. `recurse.refine`
4. `guardrail.bounded-recursion`

Expected output: Final output with all criteria passing, iteration count, and stopping reason stated.

## Composition notes

`recurse.evaluate` checks the current output against stated criteria and produces a gap list. `recurse.refine` iterates on each gap. `guardrail.bounded-recursion` enforces an exit condition to prevent over-polishing. All three blocks are required for this stack to function correctly.

**Flow:** chain

**Minimum blocks:** `recurse.evaluate` + `recurse.refine` + `guardrail.bounded-recursion`
