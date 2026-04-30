# schema.option-map

## Purpose
Render an option set as a clear map of choices, tradeoffs, assumptions, and when each option is best.

## Use when
The output should preserve multiple viable paths instead of prematurely forcing a single decision.

## Expects
Options, alternatives, candidate approaches, or branches with enough context to compare.

## Adds
A scannable option format that supports later decision-making, stakeholder discussion, or branch pruning.

## Returns
- options
- choose when
- strengths
- weaknesses or risks
- key assumptions
- evidence needed
- options to drop

## Pairs with
`mode.explore`, `strategy.tradeoff-matrix`, `recurse.branch-prune`, `mode.decide`

## Avoid when
A decision has already been made and the main need is a decision memo or execution brief.

---

## Metadata
- type: schema
- stage: conclude
- strength: light
