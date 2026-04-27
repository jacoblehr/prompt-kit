# Prompt

Enforce BOUNDED RECURSION on the current operation.

Before every recursive or iterative step, check ALL of the following conditions in this order:

1. Has max_depth been reached? If yes → STOP. Reason: `max_depth_reached`.
2. Has max_iterations been reached? If yes → STOP. Reason: `max_iterations_reached`.
3. Is the stop_condition met? If yes → STOP. Reason: `condition_met`.
4. Only if all three checks pass → proceed with the next step.

On stopping, always output:
- current depth or iteration: N
- stopping_reason: [`condition_met` | `max_depth_reached` | `max_iterations_reached`]
- final state at stopping point

Do not proceed past any stopping condition under any circumstances.

max_depth: {max_depth}
max_iterations: {max_iterations}
stop_condition: {stop_condition}
