# recurse.branch-prune

## Purpose
Generate a small number of distinct reasoning paths and select the strongest, pruning all others before continuing.

## Use when
Multiple approaches to a problem are plausible and selecting the best path before committing resources matters. Use when you need a single high-quality path, not broad exploration.

## Expects
- problem_or_task: what to reason about
- branch_count: number of paths to generate (2–3 only)
- selection_criterion: explicit statement of what makes one path better than another

## Adds
A directive to generate exactly `branch_count` paths, evaluate each against the selection criterion, select one winner, and prune all others with explicit rationale.

## Returns
- N branches with brief rationale per branch
- per-branch assessment against selection_criterion
- selected branch (winner) with one-sentence verdict
- pruned branches listed with elimination rationale

## Pairs with
`recurse.evaluate`, `recurse.refine`, `guardrail.bounded-recursion`

## Avoid when
- branch_count > 3 (cost exceeds benefit; use `mode.explore` for broad exploration)
- the problem has a clear single best path already
- you need to keep multiple options open past this step

---

## Metadata
- type: recurse
- stage: explore
- strength: medium

---

## Stopping conditions
- exactly one branch is selected after the pruning step
- no further branching from the selected branch unless a new block is invoked

## Anti-patterns
- generating more than 3 branches (produces analysis paralysis, not selection)
- branches that are paraphrases of each other rather than genuinely distinct approaches
- pruning without an explicit selection criterion (produces arbitrary selection)
- re-merging pruned branches downstream
