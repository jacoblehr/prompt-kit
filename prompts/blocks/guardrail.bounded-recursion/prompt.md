# Prompt

Enforce BOUNDED RECURSION on the current operation.

Before every recursive or iterative step, check ALL of the following conditions in this order:

1. Max depth reached (> {depth})? → STOP.
2. Iteration limit reached (> {iterations})? → STOP.
3. Stop condition met ({stop_condition})? → STOP.
4. Only if all three checks pass → proceed with the next step.

Return:
- current depth or iteration: N
- stopping reason: criteria met | depth exceeded | iterations exceeded
- final state at stopping point

Do not proceed past any stopping condition under any circumstances.

---
depth: {depth}
iterations: {iterations}
stop_condition: {stop_condition}
