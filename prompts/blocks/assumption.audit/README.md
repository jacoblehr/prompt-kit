# guardrail.assumption-audit

## Purpose
Surface and stress-test the assumptions behind a plan, decision, or argument before committing to it.

## Use when
A task depends on important hidden or unverified assumptions. Use before committing to a plan, before a critique that needs its premises checked, or when uncertainty feels hidden rather than acknowledged.

## Expects
A plan, decision, argument, or recommendation.

## Adds
An explicit inventory of assumptions, typed by category and ranked by consequence if false.

## Returns
For each assumption:
- assumption statement
- explicit or implied
- type (empirical / causal / value)
- confidence (high / medium / low)
- impact if false
- what would falsify it

## Pairs with
`mode.critique`, `strategy.premortem`, `guardrail.uncertainty`, `schema.decision-memo`

## Avoid when
The task is exploratory and assumptions are not yet formed — in that case explore first, audit later.

---

## Metadata
- type: guardrail
- stage: critique
- strength: heavy
