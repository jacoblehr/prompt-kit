# Stack: Safe Migration

Use when a schema, API, config, or state model needs to change in production without downtime, corruption, or one-way mistakes.

Useful inputs:

- the current and target state
- traffic shape, rollout constraints, and data sensitivity
- known dependencies, consumers, and rollback limitations

Suggested blocks:

1. `mode.decide`
2. `core.codepath-walkthrough`
3. `core.migration-plan`
4. `lens.abstraction-boundary`
5. `lens.failure-mode-analysis`
6. `core.release-readiness`
7. `core.rollout-plan`

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
