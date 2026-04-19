# Stack: Read Before Change

Use when you need to modify unfamiliar code and want to understand the safest place to intervene before making edits.

Useful inputs:

- the behavior you need to change or the bug you need to fix
- any known file paths, services, or recent changes nearby
- the risk profile of getting the change wrong

Suggested blocks:

1. `mode.explore`
2. `core.codepath-walkthrough`
3. `lens.invariant-check`
4. `lens.interface-contract-review`
5. `core.change-impact-review`
6. `core.test-case-design`

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
