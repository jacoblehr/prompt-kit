# Stack: Debug A Failure

Use when a bug, incident, or broken workflow needs a structured diagnosis instead of random guessing.

Useful inputs:

- expected behavior versus actual behavior
- reproduction steps, logs, or error evidence
- the system boundary or component most likely involved

Suggested blocks:

1. `mode.critique`
2. `lens.debugger-loop`
3. `lens.interface-contract-review`
4. `lens.invariant-check`
5. `core.plan-next-actions`

Expected outcome:

- a tighter failure hypothesis
- the highest-value next experiment
- likely boundary or invariant break
- a practical next-step plan

Domain tags:
- diagnostics
- root cause analysis
- engineering
