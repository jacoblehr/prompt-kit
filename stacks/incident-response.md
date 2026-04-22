# Stack: Incident Response

Use when a system incident or significant failure is being diagnosed, or has just been resolved and needs a structured debrief.

Useful inputs:

- timeline of events and observed symptoms
- affected systems and impact scope
- any initial hypotheses about cause

Suggested blocks:

1. `guardrail.triage-the-unknown`
2. `frame.log-triage`
3. `frame.cause-mapping`
4. `schema.incident-postmortem`
5. `schema.plan-next-actions`

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

---

## Composition notes

**Minimum blocks:** `guardrail.triage-the-unknown`, `frame.log-triage`, `frame.cause-mapping`

**Why this order works:** Triage-the-unknown clears confusion about what is actually happening before investigation begins — it is the fastest path to a shared understanding under pressure. Log-triage then separates symptoms from causes and identifies missing telemetry. Cause-mapping traces the causal chain from symptom to root cause. Incident-postmortem structures the full debrief. Plan-next-actions closes with owners and urgency for follow-through.

**Common swaps:** Swap `frame.cause-mapping` for `frame.hypothesis-generation` when the failure has multiple plausible root causes that need to be distinguished before investigation. Swap `schema.incident-postmortem` for `frame.extract-insights` for a lighter debrief on smaller incidents.

**Common failure mode:** Jumping to fix before the failure is understood. The fastest path to a correct fix is a clear reproduction target and a confident root cause, not the first plausible intervention.
