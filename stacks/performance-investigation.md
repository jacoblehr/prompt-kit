# Stack: Performance Investigation

Use when a system is slow or resource-constrained and you need to move from symptom to root cause before reaching for optimisations.

Useful inputs:

- description of the performance symptoms (latency, throughput, memory, CPU)
- available data: profiler output, metrics, traces, or logs
- the system under investigation

Suggested blocks:

1. `core.debug-confusion`
2. `lens.debugger-loop`
3. `core.cause-mapping`
4. `core.performance-analysis`
5. `core.refactor-plan`

Expected outcome:

- ambiguity about what is actually slow cleared before any optimisation
- systematic measurement cycle applied to isolate the real bottleneck
- causal chain traced from symptom to structural root cause
- performance problem fully characterised: location, cause, and why it exists
- targeted refactor or optimisation plan addressing the confirmed root cause

Domain tags:
- software engineering
- performance
- debugging
- systems
