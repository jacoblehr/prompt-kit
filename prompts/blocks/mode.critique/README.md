# critique

## Purpose
Pressure-test a draft, plan, argument, system, or recommendation by actively looking for weaknesses and failure points.

## Use when
The main risk is being too charitable to the current answer, design, or plan.

## Expects
A draft, recommendation, design, code path, or proposed course of action.

## Adds
Adversarial evaluation that surfaces weaknesses, contradictions, boundary failures, and highest-risk flaws.

## Returns
- strongest weaknesses
- likely failure points
- what to fix first

## Pairs with
`guardrail.disconfirming-evidence`, `guardrail.assumption-audit`, `rubric.argument-quality`, `schema.execution-brief`

## Avoid when
The task still requires generative exploration or the artifact is too incomplete to critique meaningfully.

## Optimizes for:
- weakness detection
- failure prevention
- adversarial scrutiny

## Suppresses:
- politeness bias
- wishful interpretation
- surface-level approval

## Exit when:
- the highest-risk weaknesses are explicit and prioritized

```text
Read adversarially.
Assume the current answer is vulnerable and look for where it breaks.
Prioritize the flaws that matter most if left unfixed.
```

---

## Metadata
- type: mode
- stage: critique
- strength: medium