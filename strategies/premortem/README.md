# strategy.premortem

## Purpose
Generate a prioritized risk inventory by assuming a plan has already failed and working backward to find the most plausible causes.

## Use when
A plan seems plausible but failure would be costly. Use before committing to a plan where you want risk visibility without waiting for a full adversarial review.

## Expects
A plan, proposal, or recommendation that is being considered for execution.

## Adds
A forward-looking failure analysis: assume failure, enumerate the most plausible causes, prioritize by likelihood and impact, and generate targeted mitigations.

## Returns
- assumed failure scenario
- most plausible failure causes (prioritized)
- highest-leverage risks
- suggested mitigations

## Pairs with
`mode.critique`, `strategy.red_team`, `guardrail.assumption-audit`, `guardrail.uncertainty`

## Avoid when
The plan is still being explored — premortem requires a concrete plan to fail. Use `mode.explore` first if the plan is not formed yet.

---

## Metadata
- type: strategy
- stage: critique
- strength: medium

---

## Helps prevent

- optimism bias
- hidden execution risks
- plans that look fine on first read but fail in practice

## How to use it

1. assume the plan failed
2. list the most plausible reasons why
3. prioritize the highest-leverage risks
4. add mitigations before execution

## Quick invocation

```text
Apply the PREMORTEM strategy.
Assume this plan failed. List the most plausible reasons why, prioritize the biggest risks, and suggest mitigations that would materially improve the plan before execution.
```

Domain tags:
- adversarial planning
- risk identification
- prospective hindsight
