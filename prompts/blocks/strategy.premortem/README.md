# premortem

## Purpose
Assume the plan has already failed and reason backward to expose the most plausible causes before committing.

## Use when
The plan feels too smooth, stakes are meaningful, or hidden risks are likely to surface only after execution begins.

## Expects
A plan, decision, or proposed course of action.

## Adds
A failure-first analysis that identifies likely break points, causal chains, and the preventive moves worth making now.

## Returns
- failure causes
- early warning signs
- mitigations or prevention moves

## Pairs with
`guardrail.assumption-audit`, `mode.critique`, `schema.execution-brief`

## Avoid when
The task is already in live incident response and the immediate need is stabilization, not pre-commit risk analysis.

## Helps prevent:
- optimism bias
- generic risk lists
- silent breakage during execution

## How to use:
- treat failure as an established fact, not a hypothesis
- trace backward from failure to plausible causes and preventive moves

```text
For the supplied plan, assume it is one year from now and the plan failed.
Treat that as the starting fact.
Return the most plausible failure causes, early warning signs, prevention moves, and the owner or checkpoint for each prevention move.
```

---

## Metadata
- type: strategy
- stage: critique
- strength: medium
