# Stack: security-threat-model

Enumerate, prioritize, and plan mitigations for threats before a system ships or changes.

Blocks:
1. `mode.critique`
2. `guardrail.assumption-audit`
3. `strategy.red-team`
4. `schema.execution-brief`

Expected output: Threat inventory ranked by impact, with mitigations assigned and highest-risk items flagged for immediate action.

## Composition notes

`mode.critique` opens the system to adversarial evaluation. `guardrail.assumption-audit` surfaces security assumptions baked into the design. `strategy.red-team` generates active attack paths the design does not currently prevent. `schema.execution-brief` produces a risk-ranked mitigation backlog.

**Minimum blocks:** `mode.critique` + `strategy.red-team`
