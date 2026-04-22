# Stack: Safe Migration

Use when a schema, API, config, or state model needs to change in production without downtime, corruption, or one-way mistakes.

Useful inputs:

- the current and target state
- traffic shape, rollout constraints, and data sensitivity
- known dependencies, consumers, and rollback limitations

Suggested blocks:

1. `mode.decide`
2. `frame.codepath-walkthrough`
3. `frame.migration-plan`
4. `lens.abstraction-boundary`
5. `lens.failure-mode-analysis`
6. `guardrail.release-readiness`
7. `schema.rollout-plan`

Expected outcome:

- all major read and write paths mapped before migration design begins
- migration strategy chosen explicitly rather than implied
- boundary leaks and hidden consumers surfaced before rollout
- failure modes reviewed for partial deploys, stale readers, and rollback attempts
- release verdict and staged rollout plan defined with stop conditions

Domain tags:
- software engineering
- migration
- rollout
- risk management

---

## Composition notes

**Minimum blocks:** `mode.decide`, `frame.codepath-walkthrough`, `frame.migration-plan`

**Why this order works:** Decide mode commits to a migration strategy rather than exploring alternatives mid-migration. Codepath-walkthrough maps all read and write paths before the migration is designed — unexpected consumers cause the most migration failures. Migration-plan selects the strategy explicitly. Abstraction-boundary surfaces boundary leaks and hidden couplings. Failure-mode-analysis reviews partial-deploy and rollback risks. Release-readiness and rollout-plan close with a staged deployment and stop conditions.

**Common swaps:** Swap `lens.abstraction-boundary` for `lens.interface-contract-review` when the migration involves API or protocol changes. Swap `schema.rollout-plan` for `schema.plan-next-actions` for smaller, lower-risk migrations.

**Common failure mode:** Discovering consumers during the migration. Unmapped consumers cause mid-migration rollbacks that are more disruptive than the migration itself.
