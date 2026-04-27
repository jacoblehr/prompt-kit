# Stack: break-recurring-incident

Break a socio-technical loop that keeps recreating the same class of incident.

Blocks:
1. `mode.reflect`
2. `frame.cause-mapping`
3. `strategy.inversion`
4. `schema.plan-next-actions`

Expected output: Reinforcing loop exposed, structural prevention identified, and action plan focused on breaking the loop not cleaning up the latest failure.

## Composition notes

`mode.reflect` holds space for structural analysis before blame. `frame.cause-mapping` traces the reinforcing loop driving recurrence. `strategy.inversion` asks what you would do to guarantee it recurs — this surfaces structural causes. `schema.plan-next-actions` converts the finding into concrete prevention steps.

**Minimum blocks:** `frame.cause-mapping` + `schema.plan-next-actions`
