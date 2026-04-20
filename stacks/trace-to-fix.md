# Stack: Trace To Fix

Use when you have logs, traces, or a production symptom and need to move from noisy signals to a high-confidence fix path.

Useful inputs:

- logs, traces, metrics, or error events tied to the failure
- expected versus actual behavior
- any recent deploys, config changes, or incident notes

Suggested blocks:

1. `mode.critique`
2. `guardrail.triage-the-unknown`
3. `frame.log-triage`
4. `frame.bug-reproduction-brief`
5. `lens.debugger-loop`
6. `lens.interface-contract-review`
7. `guardrail.change-impact-review`

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

---

## Composition notes

**Minimum blocks:** `mode.critique`, `frame.triage-the-unknown`, `frame.bug-reproduction-brief`

**Why this order works:** Critique mode sets the skeptical stance before any log is read. Triage-the-unknown clears noise and confusion before deeper investigation. Log-triage separates symptoms from causes in the available telemetry. Bug-reproduction-brief converts the most likely hypothesis into a tight reproduction target. Debugger-loop provides the systematic isolation cycle. Interface-contract-review checks boundary failures. Change-impact-review scopes the fix safely.

**Common swaps:** Swap `lens.debugger-loop` for `lens.failure-mode-analysis` when the failure is in an integration boundary rather than internal logic. Swap `frame.change-impact-review` for `frame.release-readiness` when the fix needs formal release gates.

**Common failure mode:** Jumping to a fix before the failure is reproduced. Fixes without a reliable reproduction target often address symptoms rather than causes.
