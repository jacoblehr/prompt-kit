# Stack: Debug a System

Use when a system, service, or integration is behaving unexpectedly and you need to isolate the fault before attempting a fix.

Useful inputs:

- the symptom and the conditions under which it appears
- what changed recently (deployment, config, traffic pattern)
- system architecture or service dependencies

Suggested blocks:

1. `mode.explore`
2. `core.hypothesis-generation`
3. `lens.debugger-loop`
4. `lens.failure-mode-analysis`
5. `core.cause-mapping`

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
