# Stack: Trace To Fix

Use when you have logs, traces, or a production symptom and need to move from noisy signals to a high-confidence fix path.

Useful inputs:

- logs, traces, metrics, or error events tied to the failure
- expected versus actual behavior
- any recent deploys, config changes, or incident notes

Suggested blocks:

1. `mode.critique`
2. `core.triage-the-unknown`
3. `core.log-triage`
4. `core.bug-reproduction-brief`
5. `lens.debugger-loop`
6. `lens.interface-contract-review`
7. `core.change-impact-review`

Expected outcome:

- ambiguity reduced before anyone reaches for a fix
- earliest anomalous signal and strongest hypotheses separated from noise
- smallest reliable reproduction target identified
- boundary failures checked before blaming internal logic
- blast radius reviewed so the eventual fix can be scoped and released safely

Domain tags:
- software engineering
- debugging
- observability
- incident response
