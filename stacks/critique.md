# Stack: critique

Surface weaknesses, blind spots, and revision targets in any artifact.

Blocks:
1. `frame.task`
2. `mode.critique`
3. `guardrail.assumption-audit`
4. `guardrail.disconfirming-evidence`
5. `schema.findings-brief`

Expected output: Prioritized defects with concrete revision advice and strongest opposing case considered.

## Composition notes

`frame.task` scopes what kind of critique is useful. `mode.critique` establishes the adversarial lens upfront. `guardrail.assumption-audit` finds what the artifact depends on being true. `guardrail.disconfirming-evidence` requires finding the strongest objection before flagging defects. `schema.findings-brief` turns the critique into prioritized revision targets.

**Common swaps:** Use `rubric.argument-quality` instead of `schema.findings-brief` when the artifact is specifically an argument and you need a pass/fail quality gate.

**Common failure mode:** Producing clever objections without ranking which defects matter most or how to fix them.

**Minimum blocks:** `mode.critique` + `schema.findings-brief`
