# Stack: Incident Response

Use when a system incident or significant failure is being diagnosed, or has just been resolved and needs a structured debrief.

Useful inputs:

- timeline of events and observed symptoms
- affected systems and impact scope
- any initial hypotheses about cause

Suggested blocks:

1. `core.debug-confusion`
2. `core.cause-mapping`
3. `core.incident-postmortem`
4. `core.plan-next-actions`

Expected outcome:

- confusion about what is happening cleared before deeper investigation begins
- causal chain traced from symptom back to root cause
- structured post-mortem capturing timeline, contributing factors, and remediation
- concrete action plan with owners and urgency for follow-through

Domain tags:
- software engineering
- incident management
- debugging
- reliability
