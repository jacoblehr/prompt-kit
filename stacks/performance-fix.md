# Stack: performance-fix

Isolate a performance bottleneck and prescribe the highest-leverage fix.

Blocks:
1. `mode.explore`
2. `frame.cause-mapping`
3. `mode.critique`
4. `schema.execution-brief`

Expected output: Bottleneck localized in the call path, root cause separated from symptoms, fix ordered by leverage.

## Composition notes

`mode.explore` surveys the whole call path before profiling any single layer. `frame.cause-mapping` traces the bottleneck to its structural origin rather than its symptom. `mode.critique` evaluates fix candidates by leverage versus complexity. `schema.execution-brief` sequences the highest-ROI changes first.

**Minimum blocks:** `frame.cause-mapping` + `schema.execution-brief`
