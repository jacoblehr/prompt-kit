# decide

## Purpose
Close from multiple plausible paths to a committed choice with explicit tradeoffs and next action.

## Use when
Options exist and the task now requires commitment rather than further exploration.

## Expects
An option set, decision criteria, or a choice that needs to be made traceable.

## Adds
Decision-first reasoning that makes the chosen option, rationale, tradeoff, and next action explicit.

## Returns
- chosen option
- rationale
- key tradeoff
- next action

## Pairs with
`frame.success-criteria`, `guardrail.assumption-audit`, `schema.decision-memo`, `schema.execution-brief`

## Avoid when
The task still needs broad exploration or new options generated.

## Optimizes for:
- commitment
- traceability
- execution readiness

## Suppresses:
- endless comparison
- hedged recommendations
- post-hoc drift

## Exit when:
- one option is chosen and justified clearly enough to act

```text
For the supplied decision, choose the best option first, then justify it.
Return the choice, criteria, key tradeoff, risks, confidence, and action that follows.
If the evidence is not decision-ready, state the deciding evidence still needed.
```

---

## Metadata
- type: mode
- stage: decide
- strength: medium
