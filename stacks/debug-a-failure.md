# Stack: Debug A Failure

Use when a bug, incident, or broken workflow needs a structured diagnosis instead of random guessing.

Useful inputs:

- expected behavior versus actual behavior
- reproduction steps, logs, or error evidence
- the system boundary or component most likely involved

Suggested blocks:

1. `mode.critique`
2. `frame.bug-reproduction-brief`
3. `lens.debugger-loop`
4. `lens.interface-contract-review`
5. `lens.invariant-check`
6. `schema.plan-next-actions`

Expected outcome:

- a reproducible investigation target
- a tighter failure hypothesis
- the highest-value next experiment
- likely boundary or invariant break
- a practical next-step plan

Domain tags:
- diagnostics
- root cause analysis
- engineering

---

## Composition notes

**Minimum blocks:** `mode.critique`, `frame.bug-reproduction-brief`, `lens.debugger-loop`

**Why this order works:** Critique mode sets the defect-finding stance before investigation begins. Bug-reproduction-brief forces a precise failure target before any debugging steps — this is the single biggest lever for debugging efficiency. Debugger-loop then provides the iterative measurement structure. Interface-contract-review and invariant-check cover the categories of bugs most likely to cause the kind of failure being investigated. Plan-next-actions closes with a concrete fix path.

**Common swaps:** Swap `lens.interface-contract-review` for `guardrail.change-impact-review` when a recent deployment is the suspected cause. Swap `lens.invariant-check` for `lens.failure-mode-analysis` when the failure is in an external integration.

**Common failure mode:** Skipping the reproduction brief and going directly to hypothesis. Without a reliable reproduction target, debugging devolves into random experiments that confirm or rule out nothing systematically.
