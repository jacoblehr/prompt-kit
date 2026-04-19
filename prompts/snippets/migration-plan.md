# Migration Plan

Use when a schema, API, storage model, config shape, or workflow must change without breaking live traffic or corrupting state.

```text
Plan a safe migration for this change.

Return:
- source state and target state
- compatibility strategy: expand-contract, dual read, dual write, backfill, version bridge, or other
- invariants that must stay true throughout the migration
- phased migration plan
- verification points after each phase
- rollback or stop conditions
- cleanup step to reach the final simplified end state
- biggest irreversible risk

Migration target:
{paste the schema, API, config, or state change}

Operational context:
{paste traffic patterns, dependencies, release constraints, and data sensitivity}
```

Domain tags:
- software engineering
- migration
- rollout
- risk management

---

Metadata:
- type: frame
- stage: analyze
- strength: heavy
- pairs with: `mode.decide`, `lens.abstraction-boundary`, `lens.failure-mode-analysis`
