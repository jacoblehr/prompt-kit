# Stack: tech-debt-triage

Prioritize technical debt by risk and leverage so the right debt gets paid first.

Blocks:
1. `mode.critique`
2. `guardrail.assumption-audit`
3. `mode.decide`
4. `schema.execution-brief`

Expected output: Debt inventory ranked by risk and leverage with a sequenced remediation plan.

## Composition notes

`mode.critique` opens the debt inventory without bias toward paying or deferring. `guardrail.assumption-audit` surfaces what risk estimates depend on. `mode.decide` applies an explicit priority criterion and closes to a ranked order. `schema.execution-brief` sequences the remediation plan.

**Minimum blocks:** `mode.critique` + `mode.decide`
