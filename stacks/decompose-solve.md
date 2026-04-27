# Stack: decompose-solve

Recursively decompose a complex problem into leaf-level solutions, then synthesize.

Blocks:
1. `frame.task`
2. `recurse.decompose`
3. `recurse.evaluate`
4. `guardrail.bounded-recursion`

Expected output: Numbered solution tree with each node either solved or decomposed further; final synthesis at the root.
