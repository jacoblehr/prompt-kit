# Stack: architecture-review

Evaluate a system design for structural soundness before committing to it.

Blocks:
1. `frame.task`
2. `mode.critique`
3. `guardrail.assumption-audit`
4. `strategy.premortem`
5. `schema.findings-brief`

Expected output: Structural risks ranked, hidden assumptions tested, and failure paths named with concrete fixes before any decision is committed.

## Composition notes

`frame.task` scopes the design under review. `mode.critique` opens an adversarial structural lens. `guardrail.assumption-audit` surfaces the design beliefs being tested. `strategy.premortem` simulates failure before commitment. `schema.findings-brief` makes risks concrete enough to fix or accept deliberately.

**Common failure mode:** Judging architectural elegance instead of naming the failure paths that would change the decision.

**Minimum blocks:** `mode.critique` + `guardrail.assumption-audit`
