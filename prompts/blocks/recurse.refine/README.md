# recurse.refine

## Purpose
Improve an output through bounded critique-and-revise loops, stopping when all criteria pass or the iteration limit is reached.

## Use when
A first-pass output exists and quality matters enough to warrant structured improvement. Always pair with explicit criteria and an iteration limit.

## Expects
- initial_output: the output to refine
- iteration_limit: number of refinement rounds allowed (1–5; default 2)
- criteria: an explicit comma-separated list of evaluation criteria (required)

## Adds
A directive to critique against criteria each round, apply only fixes tied to specific gaps, and stop when criteria are met or the limit is reached.

## Returns
- final refined output only (no intermediate reasoning unless requested)
- iteration count: N of {iteration_limit}
- stopping reason: `criteria_met` | `limit_reached`

## Pairs with
`recurse.evaluate`, `guardrail.bounded-recursion`, `mode.critique`, `rubric.*`

## Avoid when
Criteria are not defined — vague refinement loops produce stylistic drift, not quality improvement.

---

## Metadata
- type: recurse
- stage: refine
- strength: medium

---

## Stopping conditions
- all criteria pass: stop early, do not consume remaining iterations
- iteration_limit reached: stop regardless of remaining gaps

## Anti-patterns
- running refine without explicit criteria (produces churn, not improvement)
- setting iteration_limit > 5 for most tasks (diminishing returns after 2–3)
- making changes not tied to a specific criterion gap (scope creep)
- leaking intermediate reasoning into the output by default
