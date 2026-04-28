# recurse.branch-prune

## Purpose
Generate multiple candidate branches, compare them quickly, and prune weak ones before deeper refinement begins.

## Use when
You need competing approaches, but want to spend effort only on the strongest survivors.

## Expects
A problem or prompt that could reasonably branch into more than one viable approach.

## Adds
An early branching checkpoint that produces alternatives, keeps the strongest few, and discards the rest with rationale.

## Returns
- candidate branches
- branches kept
- branches pruned with rationale

## Pairs with
`recurse.evaluate`, `recurse.refine`, `guardrail.bounded-recursion`

## Avoid when
There is only one viable direction or branching would be theatrical rather than useful.

---

## Metadata
- type: recurse
- stage: analyze
- strength: medium