# Stack: Ship a Feature

Use when a feature is ready for design-to-delivery and you want to move from requirement to rollout without skipping safety steps.

Useful inputs:

- the feature brief or user need
- the existing system it will be built into
- any hard deadlines or constraints

Suggested blocks:

1. `mode.decide`
2. `frame.requirements-decomposition`
3. `frame.success-criteria`
4. `frame.test-strategy`
5. `lens.failure-mode-analysis`
6. `guardrail.release-readiness`
7. `schema.rollout-plan`
8. `rubric.plan-quality`

Expected outcome:

- feature decomposed into independently testable stories with acceptance criteria
- success criteria set before implementation begins
- test strategy covering risk-weighted coverage gaps
- failure modes identified and resilience gaps flagged
- release verdict made explicit: ship now, ship behind guardrails, or fix before ship
- rollout sequenced with go/no-go criteria and a rollback path
- plan quality assessed before committing

Domain tags:
- software engineering
- planning
- risk management

---

## Composition notes

**Minimum blocks:** `mode.decide`, `frame.requirements-decomposition`, `frame.test-strategy`

**Why this order works:** Decide mode commits to the shipping path rather than continuing to explore design options. Requirements-decomposition produces independently testable stories. Success-criteria defines done before implementation begins. Test-strategy covers risk-weighted gaps. Failure-mode-analysis surfaces resilience requirements. Release-readiness makes the ship/no-ship verdict explicit. Rollout-plan stages deployment with go/no-go criteria. Plan-quality rubric is the final gate.

**Common swaps:** Swap `frame.requirements-decomposition` for `frame.clarify-task` when the feature brief is still fuzzy. Swap `schema.rollout-plan` for `schema.plan-next-actions` for internal tooling where staged rollout is unnecessary.

**Common failure mode:** Beginning implementation before success criteria and test strategy are defined. Features without upfront success criteria are tested retroactively against criteria that were reverse-engineered to match what was built.
