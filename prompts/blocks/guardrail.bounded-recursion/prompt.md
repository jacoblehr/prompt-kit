# Prompt

Enforce BOUNDED RECURSION on this operation.

Before every recursive or iterative step, check these limits in order:

1. Max depth reached (> {depth})? → STOP.
2. Iteration limit reached (> {iterations})? → STOP.
3. Exit criterion met ({exit})? → STOP.
4. Only if all three checks pass → proceed with the next step.

Return:
- current depth or iteration: N
- stopping reason: criteria met | depth exceeded | iterations exceeded
- final state at stopping point

Do not proceed after any limit is reached.

---
depth: {depth}
iterations: {iterations}
exit: {exit}
