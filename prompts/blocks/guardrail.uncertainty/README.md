# guardrail.uncertainty

## Purpose
Force explicit acknowledgment of uncertainty so the model cannot hide low confidence behind fluent prose.

## Use when
The model may be presenting uncertain conclusions as settled facts. Use after exploration, before decisions, during critique, and whenever the output might be obscuring gaps in knowledge.

## Expects
A current analysis, recommendation, or draft.

## Adds
An explicit uncertainty map: facts separated from interpretations, assumptions named, unknowns surfaced, and the update that would most change the answer identified.

## Returns
- facts relied on
- assumptions
- unknowns
- confidence level
- what to verify next
- what would most change the conclusion

## Pairs with
`mode.explore`, `mode.critique`, `mode.decide`, `guardrail.assumption-audit`

## Avoid when
The task is deliberately generative and early uncertainty mapping would interrupt useful exploration.

---

## Metadata
- type: guardrail
- stage: critique
- strength: light
