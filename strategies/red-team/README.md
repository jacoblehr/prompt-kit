# strategy.red-team

## Purpose
Apply a fully adversarial frame to a plan — the goal is to defeat it, not improve it.

## Use when
You have a plan you are inclined to proceed with, you want to surface objections before committing, or you suspect motivated reasoning is shaping your evaluation.

## Expects
A plan, proposal, or recommendation to attack.

## Adds
An adversarial attack frame: generates the most damaging, credible objections with the explicit goal of defeating the plan, not fixing it.

## Returns
- most damaging credible attacks (prioritized by how hard they are to dismiss)
- post-attack verdict: which attacks require a real response before proceeding

## Pairs with
`mode.critique`, `strategy.premortem`, `strategy.steelman`, `guardrail.assumption-audit`

## Avoid when
The plan is still forming — red team requires a concrete plan to attack.

---

## Metadata
- type: strategy
- stage: critique
- strength: heavy

---

## Helps prevent

- motivated reasoning
- premature commitment
- plans that have not been genuinely challenged

## How to use it

1. shift to an adversarial frame — your goal is to defeat the plan, not improve it
2. generate the most damaging, credible attacks you can
3. prioritize attacks that are hard to dismiss
4. only after the attack is complete, judge which require a real response before proceeding

Note: Red Team differs from Critique in that Critique looks for weaknesses in an artifact; Red Team
argues as a hostile opponent whose goal is to make the plan fail. The adversarial frame matters.

## Quick invocation

```text
Apply the RED TEAM strategy.
Shift to a fully adversarial frame — your goal is to defeat this plan, not improve it.
Work through the plan point by point and identify the most credible, damaging attacks.
Prioritize arguments that are both credible and hard to dismiss.
Do not soften the critique or suggest fixes until the attack is complete.
```

Domain tags:
- adversarial review
- critical thinking
- stress testing
