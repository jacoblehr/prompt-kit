# Stack: Incident Response

Use when a system incident or significant failure is being diagnosed, or has just been resolved and needs a structured debrief.

Useful inputs:

- timeline of events and observed symptoms
- affected systems and impact scope
- any initial hypotheses about cause

Suggested blocks:

1. `core.triage-the-unknown`
2. `core.log-triage`
3. `core.cause-mapping`
4. `core.incident-postmortem`
5. `core.plan-next-actions`

Expected outcome:

- confusion about what is happening cleared before deeper investigation begins
- logs or traces separated into symptoms, causes, and missing telemetry
- causal chain traced from symptom back to root cause
- structured post-mortem capturing timeline, contributing factors, and remediation
- concrete action plan with owners and urgency for follow-through

Domain tags:
- software engineering
- incident management
- debugging
- reliability
