# Prompt

Enforce BOUNDED RECURSION on the current operation.

Before every recursive or iterative step, check ALL of the following conditions in this order:

1. Max depth reached? → STOP.
2. Iteration limit reached? → STOP.
3. Stop condition met? → STOP.
4. Only if all three checks pass → proceed with the next step.

Return:
- current depth or iteration: N
- stopping reason: criteria met | depth exceeded | iterations exceeded
- final state at stopping point

Do not proceed past any stopping condition under any circumstances.

---
depth: [max depth]
iterations: [max iterations]
stop_condition: [condition to stop on]
