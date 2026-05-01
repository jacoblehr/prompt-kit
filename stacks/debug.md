# Stack: debug

Diagnose a fault systematically before attempting a fix.

Blocks:
1. `frame.task`
2. `frame.cause-mapping`
3. `schema.execution-brief`

Optional add-ons:
- `mode.explore` when premature convergence is a real risk.
- `mode.critique` when candidate answers need adversarial review.

Expected output: Root cause identified, highest-value next experiment named, and fix validated as addressing cause not symptom.

## Composition notes

`frame.task` scopes the specific fault being investigated before hypotheses expand. `mode.explore` prevents premature fixation on a single cause. `mode.critique` switches to adversarial evaluation of candidate causes. `frame.cause-mapping` traces the fault to its structural origin. `schema.execution-brief` converts the diagnosis into a concrete experiment sequence.

Performance variant:

- drop `frame.task` when the bottleneck is already scoped to one path or subsystem
- keep `mode.explore` -> `mode.critique` -> `frame.cause-mapping` -> `schema.execution-brief`
- use this variant when the main job is ranking optimization work rather than proving what is broken

**Common failure mode:** Jumping to a fix before the candidate cause has survived critique and causal mapping.

**Minimum blocks:** `frame.task` + `frame.cause-mapping` + `schema.execution-brief`
