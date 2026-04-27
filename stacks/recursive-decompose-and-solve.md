# Stack: Recursive Decompose and Solve

Use when a problem is too complex to solve directly and needs structural breakdown first.

Useful inputs:

- the problem or task
- max_depth (recommended: 2–3)
- max_subproblems per level (recommended: 2–4)

Suggested blocks:

1. `frame.task`
2. `guardrail.bounded-recursion`
3. `recurse.decompose`
4. `recurse.evaluate`

Expected outcome:

- a structured hierarchy of subproblems
- leaf-level direct solutions at each terminal node
- a synthesized final answer
- an overall quality assessment confirming the synthesis covers the original problem

Domain tags:
- decomposition
- problem solving
- recursive reasoning

---

## Composition notes

**Minimum blocks:** `guardrail.bounded-recursion`, `recurse.decompose`

**Why this order works:** `frame.task` ensures the problem is well-specified before decomposition begins — vague inputs produce incoherent subproblems. `guardrail.bounded-recursion` sets hard limits before any recursive step. `recurse.decompose` executes the breakdown. `recurse.evaluate` provides a quality check on the final synthesis.

**Parameters:**
- `guardrail.bounded-recursion`: set `max_depth` to match `recurse.decompose` max_depth; set `stop_condition` to "all subproblems directly solvable"
- `recurse.decompose`: max_depth=2, max_subproblems=3 for most tasks
- `recurse.evaluate`: criteria="covers all subproblems, synthesis is coherent, no gaps"

**Common swaps:** Skip `frame.task` when the problem is already tightly scoped. Add `recurse.refine` after `recurse.evaluate` when the synthesis verdict is `refine` rather than `accept`.

**Common failure mode:** Setting max_depth too high. Depth 2–3 handles most real problems. Deeper decompositions rarely add resolution and quickly become unmanageable.

---

## Minimal composed prompt

```text
[guardrail.bounded-recursion]
max_depth: 2
max_iterations: 9
stop_condition: all subproblems directly solvable

[recurse.decompose]
max_depth: 2
max_subproblems: 3

[recurse.evaluate]
criteria: covers all subproblems, synthesis is coherent, no unexplained gaps

Problem: {paste problem}
```
