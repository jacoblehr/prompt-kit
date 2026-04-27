# guardrail.disconfirming-evidence

## Purpose
Counter confirmation bias by forcing an active search for the strongest case against the current conclusion.

## Use when
A conclusion feels too smooth or a recommendation feels too aligned with what was hoped for. Use before a high-stakes decision, after a persuasive draft, or when the reasoning path looks suspiciously clean.

## Expects
A conclusion, recommendation, or preferred option.

## Adds
An adversarial check: the strongest real opposing evidence or argument, a test of what would be true if the conclusion were wrong, and an honest verdict on whether the conclusion survives.

## Returns
- conclusion under review
- strongest opposing evidence or argument
- what would be true if the conclusion were wrong
- whether it still stands and why

## Pairs with
`mode.critique`, `strategy.steelman`, `strategy.red-team`, `guardrail.assumption-audit`

## Avoid when
The task is exploratory with no fixed conclusion yet — this guardrail targets an existing preferred answer.

---

## Metadata
- type: guardrail
- stage: critique
- strength: medium
