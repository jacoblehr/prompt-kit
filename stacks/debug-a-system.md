# Stack: Debug a System

Use when a system, service, or integration is behaving unexpectedly and you need to isolate the fault before attempting a fix.

Useful inputs:

- the symptom and the conditions under which it appears
- what changed recently (deployment, config, traffic pattern)
- system architecture or service dependencies

Suggested blocks:

1. `mode.explore`
2. `frame.hypothesis-generation`
3. `lens.debugger-loop`
4. `lens.failure-mode-analysis`
5. `frame.cause-mapping`

Expected outcome:

- competing hypotheses for the cause generated before investigation begins
- systematic isolation steps defined to confirm or rule out each hypothesis
- failure mode of each component in the call chain assessed
- root cause identified and distinguished from contributing factors
- fix confirmed as addressing cause, not symptom

Domain tags:
- software engineering
- causal reasoning
- systems thinking

---

## Composition notes

**Minimum blocks:** `mode.explore`, `frame.hypothesis-generation`, `lens.debugger-loop`

**Why this order works:** Explore mode prevents premature convergence on a single hypothesis before the failure space has been mapped. Hypothesis-generation creates multiple competing candidates to test in parallel. Debugger-loop provides the iterative isolation structure. Failure-mode-analysis covers component-level failure modes that hypothesis generation might miss. Cause-mapping closes by distinguishing root cause from contributing factors.

**Common swaps:** Swap `lens.failure-mode-analysis` for `lens.interface-contract-review` when boundary failures are more likely than internal logic failures. Add `frame.log-triage` before the debugger loop when telemetry is available.

**Common failure mode:** Beginning with a single hypothesis and building an investigation around confirming it. The single-hypothesis approach is fast when the guess is correct and catastrophically slow when it is not.
