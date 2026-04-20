# Release Readiness

Use when deciding whether a change is actually ready to ship, not just feature-complete.

```text
Assess whether this change is ready to release.

Check:
1. Correctness confidence - what evidence says the change works in the cases that matter most?
2. Operational visibility - what metrics, logs, traces, or alerts will show success or failure quickly?
3. Rollback path - can this be reversed safely and quickly if needed?
4. Dependency readiness - what external systems, migrations, support steps, or stakeholders must be ready first?
5. User and operator readiness - what docs, runbooks, support notes, or comms should exist before ship?
6. Control mechanisms - feature flag, kill switch, circuit breaker, rate limit, or staged rollout options
7. Known unknowns - what is still unproven and how dangerous is it?

Return:
- release verdict: ship now / ship behind guardrails / fix before ship
- blockers
- watch items
- first 30 minutes monitoring plan
- trigger to halt or rollback

Change or release candidate:
{paste the feature, fix, or release summary}

Known evidence:
{paste test results, rollout constraints, operational context, and open risks}
```

Domain tags:
- software engineering
- release engineering
- operations
- risk management

---

Metadata:
- type: guardrail
- stage: critique
- strength: medium
- pairs with: `mode.decide`, `frame.test-strategy`, `frame.rollout-plan`
