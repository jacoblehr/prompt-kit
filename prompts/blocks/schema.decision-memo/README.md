# schema.decision-memo

## Purpose
Render a chosen direction as a structured decision memo that makes the actual choice, rationale, and next action explicit.

## Use when
After a decision has been reached and needs to be recorded, communicated, or handed off clearly. Use after choosing, before execution planning, and when you want later reflection to be easier.

## Expects
A chosen option or decision context.

## Adds
A consistent, scannable memo format that separates decision from rationale and flags the risks and tradeoffs that matter to execution.

## Returns
- decision
- rationale
- tradeoffs
- risks
- confidence
- next action

## Pairs with
`mode.decide`, `frame.success-criteria`, `guardrail.assumption-audit`, `rubric.decision-quality`

## Avoid when
No decision has actually been made yet — this schema captures a decision, it does not help make one.

---

## Metadata
- type: schema
- stage: conclude
- strength: light
