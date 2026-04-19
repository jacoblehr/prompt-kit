# Incident Post-Mortem

Use when a system incident or significant failure has occurred and you need a structured, blame-free analysis.

```text
Facilitate a structured post-mortem for the following incident.

Incident summary: {incident_summary}

Impact: {impact}

Duration: {duration}

Work through:
1. Timeline — reconstruct key events: detection, escalation, diagnosis, resolution
2. Root cause — the deepest systemic cause (apply five-whys or equivalent reasoning)
3. Contributing factors — conditions that made the root cause possible or made the impact worse
4. What went well — detection speed, communication, or response actions that worked
5. What to fix — specific, actionable remediation items with suggested owners and urgency
6. Prevention — at least one structural change that reduces this class of incident, not just this instance

Avoid blame. Focus on system conditions, not individual mistakes.
```

Domain tags:
- software engineering
- incident management
- reliability
- learning

---

Metadata:
- type: schema
- stage: conclude
- strength: heavy
- pairs with: `mode.reflect`, `frame.cause-mapping`, `frame.plan-next-actions`
