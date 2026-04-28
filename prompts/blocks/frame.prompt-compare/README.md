# frame.prompt-compare

## Purpose
Compare an original prompt and a revised prompt so real improvements are preserved and regressions are visible before testing.

## Use when
After rewriting or tightening a prompt, especially when the new version is clearer but may have dropped task coverage, constraints, or useful flexibility.

## Expects
The original prompt, the revised prompt, and any success criteria or non-goals the rewrite was meant to preserve.

## Adds
A structured before-vs-after comparison that separates structural improvement from style polish and flags capability loss before the prompt is treated as ready.

## Returns
- original prompt job
- revised prompt job
- structural improvements kept
- regressions or capability loss
- unresolved ambiguities
- verdict: ready to test / revise again
- next revision move

## Pairs with
`frame.success-criteria`, `mode.critique`, `rubric.writing-quality`, `schema.execution-brief`

## Avoid when
There is no meaningful baseline to compare against, or when you are generating a prompt from scratch rather than revising an existing one.

---

## Metadata
- type: frame
- stage: critique
- strength: medium