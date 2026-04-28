# recurse.refine

## Purpose
Improve the current branch or draft using the latest evaluation gaps without reopening the whole problem.

## Use when
You already know what the current output is missing and want the next recursive step to tighten that specific gap list.

## Expects
The current output plus the gaps or revision targets from the last evaluation pass.

## Adds
A focused refinement pass that preserves what already works and changes only what the evaluation says is weak.

## Returns
- revised output
- gaps addressed
- remaining open gaps

## Pairs with
`recurse.evaluate`, `guardrail.bounded-recursion`

## Avoid when
The main problem is still choosing direction rather than improving a chosen branch.

---

## Metadata
- type: recurse
- stage: revise
- strength: medium