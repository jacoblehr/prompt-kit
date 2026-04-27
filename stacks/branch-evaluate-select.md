# Stack: Branch–Evaluate–Select–Refine

Use when multiple solution paths are plausible, selecting the best path before investing in refinement matters, and only one polished answer is needed.

Useful inputs:

- the problem or decision
- branch_count (2–3 only)
- selection_criterion: what makes one path better
- refinement criteria

Suggested blocks:

1. `recurse.branch-prune`
2. `recurse.evaluate`
3. `recurse.refine`
4. `guardrail.bounded-recursion`

Expected outcome:

- N distinct approaches generated and evaluated
- a single winner selected with explicit pruning rationale for all other branches
- the selected path refined to meet explicit quality criteria
- one final polished output

Domain tags:
- option generation
- path selection
- tree-of-thought

---

## Composition notes

**Minimum blocks:** `recurse.branch-prune`, `recurse.refine`

**Why this order works:** `recurse.branch-prune` explores the solution space and forces a selection decision before any refinement resources are spent. `recurse.evaluate` provides a structured basis for the pruning decision and a post-selection quality check. `guardrail.bounded-recursion` prevents the refine loop from compounding. `recurse.refine` polishes only the selected branch.

**Parameters:**
- `recurse.branch-prune`: branch_count=2 for most tasks; 3 only when approaches are genuinely different in kind
- `recurse.evaluate`: run once on the selected branch pre-refine; criteria should match refine criteria
- `recurse.refine`: iteration_limit=2; criteria should match evaluate criteria
- `guardrail.bounded-recursion`: max_iterations=2; stop_condition="all refine criteria pass"

**Common swaps:** Skip `recurse.evaluate` and embed the selection criterion directly in `recurse.branch-prune` when the selection decision is straightforward. Replace `recurse.refine` with a direct answer when the selected branch is already high quality.

**Common failure mode:** Generating more than 3 branches. Beyond 3, the pruning step becomes expensive and the marginal value of additional branches drops sharply. Use `mode.explore` for broad exploration instead.

**Second common failure mode:** Using `recurse.branch-prune` when the problem already has an obvious best path. Branching adds cost without benefit in that case — go directly to `recurse.refine`.

---

## Minimal composed prompt

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
stop_condition: all refine criteria pass

Problem: {paste problem or task}
```
