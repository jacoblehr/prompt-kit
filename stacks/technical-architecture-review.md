# Stack: Technical Architecture Review

Use when a software design, system architecture, or technical approach needs rigorous pre-commit review.

Useful inputs:

- the architecture diagram, design doc, or technical proposal
- the intended behaviour and scale requirements
- the main technical risks or open questions

Suggested blocks:

1. `mode.critique`
2. `lens.interface-contract-review`
3. `lens.invariant-check`
4. `lens.complexity-tradeoff`
5. `rubric.decision-quality`

Expected outcome:

- boundary and contract weaknesses exposed
- invariants and correctness risks surfaced
- complexity and maintainability costs assessed
- clear decision on whether to proceed, revise, or reject

Domain tags:
- software engineering
- systems design
- technical review
- architecture

---

## Composition notes

**Minimum blocks:** `mode.critique`, `lens.interface-contract-review`, `lens.invariant-check`

**Why this order works:** Critique mode sets the adversarial stance for the review. Interface-contract-review maps boundary assumptions and potential contract violations. Invariant-check surfaces correctness properties that the design must maintain. Complexity-tradeoff evaluates the maintainability and cognitive cost of the design. Decision-quality rubric closes by assessing whether the architectural choice is defensible and documented.

**Common swaps:** Swap `lens.complexity-tradeoff` for `lens.abstraction-boundary` when the review is focused on modularity and boundary design. Add `strategy.premortem` when the design is complex enough that anticipating failure modes is valuable.

**Common failure mode:** Reviewing architecture for elegance rather than correctness. Elegant architectures that violate invariants or leave contract assumptions unverified fail in production in ways that are hard to diagnose.
