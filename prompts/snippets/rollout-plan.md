# Rollout Plan

Use when you have a decision or design and need a concrete, sequenced plan for releasing, deploying, or implementing it.

```text
Create a rollout plan for this initiative.

Structure the plan as:

1. Pre-launch: what must be true before rollout begins
   - dependencies that must be resolved
   - stakeholders who need to be informed or aligned
   - the minimum viable version of the thing being released

2. Rollout sequence: the ordered steps, with the rationale for that order
   - which steps are sequential (one must complete before the next starts)?
   - which can happen in parallel?
   - what is the single most fragile step?

3. Go/no-go criteria: what would cause you to pause or abort?

4. Monitoring: how will you know the rollout is going well?
   - leading signal of success
   - early signal of a problem

5. Rollback: if you had to reverse this, how would you do it?

Initiative or change:
{paste what you are rolling out}
```

Domain tags:
- planning
- risk management
- process improvement
- execution

---

Metadata:
- type: schema
- stage: conclude
- strength: medium
- pairs with: `mode.decide`, `guardrail.release-readiness`, `frame.migration-plan`
