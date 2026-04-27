# Stack: architecture-review

Evaluate a system design for structural soundness before committing to it.

Blocks:
1. `mode.critique`
2. `guardrail.assumption-audit`
3. `strategy.premortem`
4. `rubric.decision-quality`

Expected output: Structural risks ranked, hidden assumptions tested, and failure paths named before any decision is committed.

## Composition notes

`mode.critique` opens an adversarial structural lens. `guardrail.assumption-audit` surfaces the design beliefs being tested. `strategy.premortem` simulates failure before commitment. `rubric.decision-quality` applies a consistent evaluation standard across all findings.

**Minimum blocks:** `mode.critique` + `guardrail.assumption-audit`
