# Stack: decompose-solve

Recursively decompose a complex problem into leaf-level solutions, then synthesize.

Blocks:
1. `frame.task`
2. `recurse.decompose`
3. `guardrail.bounded-recursion`

Optional add-ons:
- `recurse.evaluate` when each branch or draft needs an explicit stop or continue verdict.

Expected output: Numbered solution tree with each node either solved or decomposed further; final synthesis at the root.

## Composition notes

`frame.task` roots the decomposition before any splitting occurs. `recurse.decompose` splits the problem until leaves are solvable in a single step. `recurse.evaluate` validates each node before accepting its solution. `guardrail.bounded-recursion` prevents infinite regress.

**Minimum blocks:** `frame.task` + `recurse.decompose` + `guardrail.bounded-recursion`
