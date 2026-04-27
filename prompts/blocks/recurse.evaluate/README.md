# recurse.evaluate

## Purpose
Critically assess a candidate output against explicit criteria and return a structured per-criterion verdict.

## Use when
A candidate output needs to be assessed before deciding whether to refine, accept, or discard it. Always supply explicit criteria.

## Expects
- candidate_output: the output to assess
- criteria: an explicit comma-separated list of evaluation criteria

## Adds
A directive to map each criterion to a `pass | partial | fail` verdict with specific gaps, risks, and the highest-leverage fix per failing item.

## Returns
- per-criterion verdict table: `pass | partial | fail`
- specific gap and risk per `partial` or `fail`
- highest-leverage fix per `partial` or `fail`
- overall verdict: `accept | refine | reject`

## Pairs with
`recurse.refine`, `recurse.decompose`, `guardrail.bounded-recursion`, `rubric.*`, `mode.critique`

## Avoid when
Criteria are not defined — evaluation without explicit criteria produces impressionistic opinions, not actionable verdicts.

---

## Metadata
- type: recurse
- stage: critique
- strength: medium

---

## Output guarantees
- one row per criterion
- no filler praise or softening
- fixes are concrete and tied to specific gaps
- overall verdict follows directly from the per-criterion table

## Anti-patterns
- criteria like "good quality" or "improve it" (too vague to be falsifiable)
- running evaluate without acting on the verdict (evaluate is always a prelude to a decision: accept, refine, or reject)
