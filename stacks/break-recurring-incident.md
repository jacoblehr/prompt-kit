# Stack: break-recurring-incident

Break a socio-technical loop that keeps recreating the same class of incident.

Blocks:
1. `mode.reflect`
2. `frame.cause-mapping`
3. `strategy.premortem`
4. `schema.execution-brief`

Expected output: Reinforcing loop exposed, structural prevention identified, and action plan focused on breaking the loop not cleaning up the latest failure.

## Composition notes

`mode.reflect` holds space for structural analysis before blame. `frame.cause-mapping` traces the reinforcing loop driving recurrence. `strategy.premortem` treats recurrence as a committed fact and forces specific structural causes rather than generic risk lists. `schema.execution-brief` converts the finding into concrete prevention steps.

**Minimum blocks:** `frame.cause-mapping` + `schema.execution-brief`
