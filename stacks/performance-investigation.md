# Stack: Performance Investigation

Use when a system is slow or resource-constrained and you need to move from symptom to root cause before reaching for optimisations.

Useful inputs:

- description of the performance symptoms (latency, throughput, memory, CPU)
- available data: profiler output, metrics, traces, or logs
- the system under investigation

Suggested blocks:

1. `guardrail.triage-the-unknown`
2. `frame.codepath-walkthrough`
3. `lens.debugger-loop`
4. `frame.performance-analysis`
5. `frame.refactor-plan`

Expected outcome:

- ambiguity about what is actually slow cleared before any optimisation
- the live code path mapped so measurement happens in the right place
- systematic measurement cycle applied to isolate the real bottleneck
- performance problem fully characterised: location, cause, and why it exists
- targeted refactor or optimisation plan addressing the confirmed root cause

Domain tags:
- software engineering
- performance
- debugging
- systems

---

## Composition notes

**Minimum blocks:** `frame.triage-the-unknown`, `frame.codepath-walkthrough`, `lens.debugger-loop`

**Why this order works:** Triage-the-unknown prevents optimization in the wrong place. Codepath-walkthrough maps the live execution path so profiling happens at the right location. Debugger-loop provides the iterative measurement structure. Performance-analysis characterizes the bottleneck fully. Refactor-plan scopes the fix to the confirmed root cause.

**Common swaps:** Swap `frame.codepath-walkthrough` for `frame.log-triage` when profiler data is available upfront. Swap `frame.refactor-plan` for `frame.plan-next-actions` for smaller, more targeted fixes.

**Common failure mode:** Optimizing without profiling. Intuition-based performance optimization almost always targets the wrong bottleneck.
