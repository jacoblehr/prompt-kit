# Stack: Evaluate–Refine Loop

Use when a first-pass output exists and needs structured improvement through bounded critique-and-revise cycles.

Useful inputs:

- the initial output
- explicit evaluation criteria (required — do not run this stack without them)
- iteration_limit (recommended: 2–3)

Suggested blocks:

1. `recurse.evaluate`
2. `recurse.refine`
3. `guardrail.bounded-recursion`

Expected outcome:

- a per-criterion quality verdict on the initial output
- a refined output addressing the identified gaps
- an explicit stopping reason confirming the loop terminated correctly

Domain tags:
- iterative improvement
- output quality
- critique-refine

---

## Composition notes

**Minimum blocks:** `recurse.evaluate`, `recurse.refine`

**Why this order works:** `recurse.evaluate` runs first and produces a structured gap map — refine without this produces stylistic churn rather than quality improvement. `recurse.refine` applies only fixes tied to identified gaps. `guardrail.bounded-recursion` enforces the iteration cap so the loop cannot compound indefinitely.

**Parameters:**
- `recurse.evaluate`: criteria must match exactly the criteria used in `recurse.refine`
- `recurse.refine`: iteration_limit=2 for most tasks; increase to 3 only for complex outputs
- `guardrail.bounded-recursion`: max_iterations should equal `recurse.refine` iteration_limit; stop_condition="all criteria pass"

**Common swaps:** Replace `recurse.evaluate` with a domain-specific `rubric.*` block when one exists. Add `mode.critique` before `recurse.evaluate` when the output is a written argument or plan rather than a structured artifact.

**Common failure mode:** Undefined or vague criteria. "Improve quality" is not a criterion. Criteria must be specific enough that a pass/fail verdict is unambiguous — e.g., "claims are supported by evidence", "steps are in executable order", "response is under 300 words".

---

## Minimal composed prompt

```text
[recurse.evaluate]
criteria: accuracy, completeness, conciseness

[recurse.refine]
iteration_limit: 2
criteria: accuracy, completeness, conciseness

[guardrail.bounded-recursion]
max_depth: 1
max_iterations: 2
stop_condition: all criteria pass

Output to improve: {paste initial output}
```
