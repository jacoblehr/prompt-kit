# Stack: Code Review

Use when reviewing a pull request or piece of code and you want thorough, structured feedback that covers correctness, security, and maintainability.

Useful inputs:

- the code diff or full file under review
- the language, framework, and context
- any specific concerns already in mind

Suggested blocks:

1. `mode.critique`
2. `frame.code-review`
3. `guardrail.change-impact-review`
4. `lens.invariant-check`
5. `lens.interface-contract-review`

Expected outcome:

- correctness, security, and maintainability issues identified and localised
- change blast radius made explicit before small-looking edits are approved
- invariants that the code must preserve — and whether they hold — made explicit
- boundary contracts checked for leaks or violations
- a prioritised list of issues and suggested fixes

Domain tags:
- software engineering
- critical thinking
- quality

---

## Composition notes

**Minimum blocks:** `mode.critique`, `frame.code-review`, `lens.invariant-check`

**Why this order works:** Critique mode sets the defect-finding stance first so the review is adversarial rather than confirmatory. Code-review provides the structured inspection surface. Change-impact-review widens the blast radius assessment before edge cases are evaluated. Invariant-check and interface-contract-review catch the class of bugs that basic code review misses — things that are locally correct but globally broken.

**Common swaps:** Swap `lens.interface-contract-review` for `lens.failure-mode-analysis` when the code has complex failure paths or external integrations. Add `guardrail.assumption-audit` when the review involves a significant design decision embedded in the diff.

**Common failure mode:** Reviewing the diff without mapping the change impact first. Small-looking edits regularly have disproportionate blast radii that are invisible without the change-impact check.
