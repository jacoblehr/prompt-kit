# schema.findings-brief

## Purpose
Render critique, review, or threat-model output as a ranked findings brief that is easy to act on.

## Use when
After reviewing a plan, code change, design, argument, or system and the main output should be prioritized issues rather than a general narrative.

## Expects
A critique, review notes, risk analysis, or threat model.

## Adds
A compact finding format that ties each issue to evidence, impact, fix, and confidence.

## Returns
- finding
- severity
- evidence
- impact
- recommended fix
- confidence

## Pairs with
`mode.critique`, `strategy.red-team`, `guardrail.assumption-audit`, `rubric.argument-quality`

## Avoid when
The main need is sequencing work after a decision. Use `schema.execution-brief` for plans, milestones, dependencies, and escalation triggers.

---

## Metadata
- type: schema
- stage: conclude
- strength: light
