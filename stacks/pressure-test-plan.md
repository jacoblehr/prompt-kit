# Stack: Pressure Test Plan

Use when you have a plan and want to stress it before committing.

Useful inputs:

- the current plan, recommendation, or proposal
- the intended outcome and constraints
- any assumptions that already feel shaky

Suggested blocks:

1. `mode.critique`
2. `strategy.premortem`
3. `strategy.red_team`
4. `guardrail.assumption-audit`
5. `guardrail.stress-test-assumptions`

Expected outcome:

- prioritized risks
- exposed assumptions
- hardest-to-dismiss objections
- concrete mitigations

Domain tags:
- risk management
- critical thinking
- planning

---

## Composition notes

**Minimum blocks:** `mode.critique`, `strategy.premortem`

**Why this order works:** Critique mode sets the adversarial stance before any structured attack begins. Premortem generates the most plausible failure causes by assuming failure has already happened. Red-team argues against the plan as a hostile opponent. Assumption-audit surfaces the hidden premises. Stress-test-assumptions closes by testing the premises that would most damage the plan if false.

**Common swaps:** Swap `strategy.red_team` for `strategy.inversion` when the goal is finding structural failure modes rather than credible attacks. Swap `guardrail.assumption-audit` for `guardrail.disconfirming-evidence` when the plan is built around a preferred conclusion.

**Common failure mode:** Running a premortem without setting a critical stance first. Without `mode.critique`, premortem exercises tend to generate a list of risks rather than a genuine adversarial challenge.
