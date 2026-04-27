# Stack: incident-response

Contain and diagnose an active incident, then close with a written post-mortem and action plan.

Blocks:
1. `mode.explore`
2. `frame.cause-mapping`
3. `mode.decide`
4. `schema.incident-postmortem`
5. `schema.execution-brief`

Expected output: Root cause identified, post-mortem written, corrective actions assigned with owners and urgency.

## Composition notes

`mode.explore` prevents tunnel-vision diagnosis during active incidents. `frame.cause-mapping` traces the failure chain systematically. `mode.decide` closes to a containment action before the full analysis is complete. `schema.incident-postmortem` documents the timeline and root cause. `schema.execution-brief` produces assignable corrective work.

**Minimum blocks:** `frame.cause-mapping` + `schema.incident-postmortem`
