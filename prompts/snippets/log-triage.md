# Log Triage

Use when you have logs, traces, or event streams but do not yet know which signals are symptoms, causes, or noise.

```text
Triage these logs or traces without jumping to a fix.

Work through:
1. Timeline - what happened first, what changed next, and what happened immediately before the visible failure?
2. Signal separation - which entries are likely symptoms, cause candidates, retries, or secondary fallout?
3. Last known good state - what appears to have been working before the anomaly?
4. First anomalous event - what is the earliest event that meaningfully departs from normal behavior?
5. Missing telemetry - what key observation is absent and prevents confident diagnosis?
6. Hypotheses - generate two to four plausible explanations, with supporting evidence and contradictions for each

Return:
- timeline summary
- first anomalous event
- top hypotheses
- missing telemetry
- highest-information next check
- what should not yet be concluded

Logs, traces, or events:
{paste the relevant signals}

System context and recent changes:
{paste architecture context, deploys, config changes, or traffic shifts}
```

Domain tags:
- software engineering
- observability
- debugging
- incident response
