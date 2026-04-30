# Recursive Prompting Primitives

A minimal set of composable blocks for recursive reasoning patterns: decomposition, evaluation, refinement, and branching.

These blocks compose like lego — stack them, nest them, or use them standalone. No execution engine. Composition is prompt expansion: copy the block prompts in order, substitute parameters, and pass as a single prompt or sequential messages.

---

## Primitives

| Block | Type | Stage | Purpose |
|---|---|---|---|
| `recurse.decompose` | recurse | analyze | Break problems into structured subproblem hierarchies |
| `recurse.evaluate` | recurse | critique | Assess output against explicit criteria with per-criterion verdicts |
| `recurse.refine` | recurse | refine | Improve output through bounded critique-and-revise loops |
| `guardrail.bounded-recursion` | guardrail | any | Enforce explicit exits before every recursive step |
| `recurse.branch-prune` | recurse | explore | Generate, evaluate, and prune multiple reasoning paths |

---

## When to use each

**`recurse.decompose`** — when a problem cannot be solved in one step and the path requires structural breakdown first. Start at max_depth=2; increase only if leaves are still too complex to solve directly.

**`recurse.evaluate`** — when you need a structured quality verdict before deciding to refine, accept, or discard. Always supply explicit, falsifiable criteria. Always act on the verdict.

**`recurse.refine`** — when a first-pass output exists and quality matters enough to warrant improvement rounds. Always pair with defined criteria and an iteration_limit. Never run without both.

**`guardrail.bounded-recursion`** — always pair with any recursive block. Declare it before the first recursive step. Sets the hard ceiling for depth and iterations.

**`recurse.branch-prune`** — when multiple paths are genuinely plausible and selecting the best path before committing resources matters. Hard cap at branch_count=3. Use `mode.explore` for broad exploration instead.

---

## Composition syntax

Reference blocks inline using backticks: `` `recurse.decompose` ``.

To compose, list blocks in sequence with their parameters in a prompt:

```text
[recurse.decompose]
max_depth: 2
max_subproblems: 3

[recurse.evaluate]
criteria: correctness, completeness

[recurse.refine]
iteration_limit: 2
criteria: correctness, completeness
```

For nesting — where an inner block runs inside an outer loop — indent the inner block:

```text
[recurse.refine]
iteration_limit: 2
criteria: correctness, completeness

  [recurse.evaluate]
  criteria: correctness, completeness
```

Parameters use plain key: value pairs. All parameters shown in `{braces}` in prompt.md files are required substitution points — replace them before sending.

---

## Example compositions

### 1. Decompose and solve

Break a complex problem into a subproblem tree and synthesize a final answer.

```text
[guardrail.bounded-recursion]
max_depth: 2
max_iterations: 9
exit: all subproblems directly solvable

[recurse.decompose]
max_depth: 2
max_subproblems: 3

[recurse.evaluate]
criteria: covers all subproblems, synthesis is coherent, no unexplained gaps

Problem: {paste problem}
```

See stack: `recursive-decompose-and-solve`

---

### 2. Evaluate–refine loop

Assess a draft against explicit criteria and improve it in bounded passes.

```text
[recurse.evaluate]
criteria: accuracy, completeness, conciseness

[recurse.refine]
iteration_limit: 2
criteria: accuracy, completeness, conciseness

[guardrail.bounded-recursion]
max_depth: 1
max_iterations: 2
exit: all criteria pass

Output to improve: {paste initial output}
```

See stack: `evaluate-refine-loop`

---

### 3. Branch + evaluate + select + refine

Generate distinct paths, prune to one winner, then refine it to a polished output.

```text
[recurse.branch-prune]
branch_count: 3
selection_criterion: highest expected accuracy with least complexity

[recurse.evaluate]
criteria: accuracy, feasibility, completeness

[recurse.refine]
iteration_limit: 2
criteria: accuracy, feasibility, completeness

[guardrail.bounded-recursion]
max_depth: 1
max_iterations: 2
exit: all refine criteria pass

Problem: {paste problem or task}
```

See stack: `branch-evaluate-select`

---

## Anti-patterns

**Over-decomposition** — setting max_depth > 3 for tasks solvable at depth 1. Always test the direct answer first before adding recursion.

**Underdefined criteria** — running `recurse.refine` or `recurse.evaluate` with "improve quality" as a criterion. Criteria must be specific enough that a pass/fail verdict is unambiguous.

**Branching when unnecessary** — using `recurse.branch-prune` when one path is obviously best. Branching costs tokens; only use it when paths are genuinely distinct.

**Merging pruned branches** — after `recurse.branch-prune`, continuing on multiple branches defeats the pruning step. Exactly one branch continues.

**Uncapped loops** — running `recurse.refine` without an iteration_limit or omitting `guardrail.bounded-recursion` from any composition with recursive blocks.

**Agent-like prompting** — using these blocks to model tool calls, multi-step planning loops, or state machines. These blocks are prompt expansion only. No execution, no state, no tool use.

---

## Guardrails enforced by these blocks

- all recursion is explicit and bounded (no implicit loops)
- every evaluative step requires falsifiable criteria
- pruning always produces exactly one active branch
- stopping reasons are always explicit and machine-readable
- final outputs are clean (no reasoning leakage unless requested)

## What these blocks do NOT support

- autonomous execution
- state tracking across sessions or turns
- tool use or planning loops
- implicit or open-ended recursion
- result diffing or run histories
