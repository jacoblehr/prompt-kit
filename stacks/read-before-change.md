# Stack: Read Before Change

Use when you need to modify unfamiliar code and want to understand the safest place to intervene before making edits.

Useful inputs:

- the behavior you need to change or the bug you need to fix
- any known file paths, services, or recent changes nearby
- the risk profile of getting the change wrong

Suggested blocks:

1. `mode.explore`
2. `frame.codepath-walkthrough`
3. `lens.invariant-check`
4. `lens.interface-contract-review`
5. `guardrail.change-impact-review`
6. `frame.test-case-design`

Expected outcome:

- the active code path mapped before any edits are made
- invariants and boundary contracts surfaced so the change does not accidentally break them
- blast radius reviewed: which callers, workers, or state transitions are riskier than they first appear?
- minimal, high-value test set designed around the actual risk of the change

Domain tags:
- software engineering
- code comprehension
- debugging
- change safety

---

## Composition notes

**Minimum blocks:** `mode.explore`, `frame.codepath-walkthrough`, `lens.invariant-check`

**Why this order works:** Explore mode prevents the assumption that the code does what it looks like it does. Codepath-walkthrough maps the live execution path before any change plan is formed. Invariant-check surfaces the correctness properties the code must preserve. Interface-contract-review catches boundary violations. Change-impact-review assesses blast radius. Test-case-design closes by designing the right tests around the actual risk of the change.

**Common swaps:** Swap `lens.interface-contract-review` for `lens.failure-mode-analysis` when the change touches external integrations. Swap `frame.test-case-design` for `frame.test-strategy` for larger changes that need a full test plan.

**Common failure mode:** Making the change before understanding the impact. The most common source of regressions is a change whose blast radius was underestimated.
