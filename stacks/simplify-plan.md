# Stack: simplify-plan

Reduce an overcomplicated plan, prompt, process, or feature scope to the smallest version that still achieves the objective.

Blocks:
1. `frame.task`
2. `strategy.constraint-relaxation`
3. `mode.critique`
4. `guardrail.scope-creep`
5. `schema.execution-brief`

Expected output: Simplified plan with real constraints preserved, false constraints challenged, creep removed, and the next version sequenced.

## Composition notes

`frame.task` anchors the objective and scope before simplification begins. `strategy.constraint-relaxation` tests which constraints are hard, flexible, or self-imposed. `mode.critique` looks for complexity that does not materially improve the outcome. `guardrail.scope-creep` separates essentials from deferred or removable work. `schema.execution-brief` turns the simplified version into an actionable sequence.

**Choose instead when:** use `pressure-test` when the plan is risky and needs stronger adversarial review rather than simplification.

**Common swaps:** Use `schema.requirements-brief` instead of `schema.execution-brief` when the simplified output should become requirements rather than an action sequence.

**Common failure mode:** Cutting visible effort while accidentally removing the constraints or checks that made the plan safe.

**Minimum blocks:** `strategy.constraint-relaxation` + `guardrail.scope-creep` + `schema.execution-brief`
