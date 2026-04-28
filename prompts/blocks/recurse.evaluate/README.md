# recurse.evaluate

## Purpose
Evaluate the current branch or draft in a recursive workflow so weak branches can be pruned and strong ones refined.

## Use when
An iterative or branching workflow needs a checkpoint before another refinement step.

## Expects
The current branch, draft, or partial output plus any criteria being used to judge progress.

## Adds
A compact checkpoint that records what passes, what fails, and whether the branch should continue, refine, or stop.

## Returns
- passes
- gaps
- continue / prune / stop decision

## Pairs with
`recurse.refine`, `recurse.branch-prune`, `guardrail.bounded-recursion`

## Avoid when
There are no criteria yet and the job is still open-ended generation.

---

## Metadata
- type: recurse
- stage: critique
- strength: medium