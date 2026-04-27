# Stack: debug

Diagnose a fault systematically before attempting a fix.

Blocks:
1. `mode.explore`
2. `frame.task`
3. `mode.critique`
4. `frame.cause-mapping`
5. `schema.plan-next-actions`

Expected output: Root cause identified, highest-value next experiment named, and fix validated as addressing cause not symptom.

## Composition notes

`mode.explore` prevents premature fixation on a single hypothesis. `frame.task` scopes the specific fault being investigated. `mode.critique` switches to adversarial evaluation of candidate causes. `frame.cause-mapping` traces the fault to its structural origin. `schema.plan-next-actions` converts the diagnosis into a concrete experiment sequence.

**Minimum blocks:** `frame.task` + `frame.cause-mapping`
