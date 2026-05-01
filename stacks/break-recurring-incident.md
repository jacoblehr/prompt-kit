# Stack: break-recurring-incident

Break a socio-technical loop that keeps recreating the same class of incident.

Blocks:
1. `frame.cause-mapping`
2. `strategy.premortem`
3. `schema.execution-brief`

Optional add-ons:
- `mode.reflect` when learning from prior action matters.

Expected output: Reinforcing loop exposed, structural prevention identified, and action plan focused on breaking the loop not cleaning up the latest failure.

## Composition notes

`mode.reflect` holds space for structural analysis before blame. `frame.cause-mapping` traces the reinforcing loop driving recurrence. `strategy.premortem` treats recurrence as a committed fact and forces specific structural causes rather than generic risk lists. `schema.execution-brief` converts the finding into concrete prevention steps.

**Minimum blocks:** `frame.cause-mapping` + `strategy.premortem` + `schema.execution-brief`
