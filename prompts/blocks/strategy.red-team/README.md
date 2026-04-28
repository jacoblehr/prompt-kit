# red-team

## Purpose
Simulate adversarial pressure against a system, plan, or position to find exploitable weaknesses before others do.

## Use when
Security, abuse, competitive attack, or adversarial misuse is a real risk.

## Expects
A design, plan, product, policy, or argument that could be attacked or exploited.

## Adds
Attack-minded reasoning that enumerates plausible offensive paths, weak boundaries, and the most damaging failure sequences.

## Returns
- plausible attack paths
- weakest boundaries
- highest-priority mitigations

## Pairs with
`mode.critique`, `guardrail.assumption-audit`, `schema.execution-brief`

## Avoid when
The task is cooperative design exploration with no meaningful adversarial threat model.

## Helps prevent:
- naive trust assumptions
- under-scoped threat models
- missing abuse cases

## How to use:
- reason like a motivated attacker or opponent
- prioritize the attacks that are both plausible and damaging

```text
Think like an adversary with real incentives.
Identify the most plausible attack paths, the weakest boundaries, and the mitigations that matter first.
```

---

## Metadata
- type: strategy
- stage: critique
- strength: medium