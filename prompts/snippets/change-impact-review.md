# Change Impact Review

Use when a code change seems local but might have a larger blast radius across contracts, state, or operations.

```text
Assess the blast radius of this proposed change before it ships.

Review:
1. Directly affected components - what code paths are being changed on purpose?
2. Indirectly affected components - what depends on those paths, contracts, schemas, caches, queues, or permissions?
3. Boundary risk - what external callers, background jobs, or operators could experience breakage first?
4. Partial rollout risk - what fails if this change is only partly deployed, behind a flag, or rolled back?
5. Test implications - what must be covered before merge to trust the change?
6. Observability implications - what should be monitored immediately after rollout?

Return:
- directly affected components
- indirectly affected components
- highest-risk edge case
- most likely user-visible failure if the change is wrong
- pre-merge checks
- post-release monitoring plan

Change description or diff summary:
{paste the proposed change}

System context:
{paste architecture notes, relevant services, or module boundaries}
```

Domain tags:
- software engineering
- change management
- risk management
- code review
