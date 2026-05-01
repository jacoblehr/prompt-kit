# Stack: critique

Surface weaknesses, blind spots, and revision targets in any artifact.

Blocks:
1. `mode.critique`
2. `guardrail.assumption-audit`
3. `schema.findings-brief`

Optional add-ons:
- `frame.task` when scope or non-goals need to be made explicit.
- `guardrail.disconfirming-evidence` when confirmation bias is a material risk.

Expected output: Prioritized defects with concrete revision advice and strongest opposing case considered.

## Composition notes

`frame.task` scopes what kind of critique is useful. `mode.critique` establishes the adversarial lens upfront. `guardrail.assumption-audit` finds what the artifact depends on being true. `guardrail.disconfirming-evidence` requires finding the strongest objection before flagging defects. `schema.findings-brief` turns the critique into prioritized revision targets.

**Common swaps:** Use `rubric.argument-quality` instead of `schema.findings-brief` when the artifact is specifically an argument and you need a pass/fail quality gate.

**Common failure mode:** Producing clever objections without ranking which defects matter most or how to fix them.

**Minimum blocks:** `mode.critique` + `guardrail.assumption-audit` + `schema.findings-brief`
