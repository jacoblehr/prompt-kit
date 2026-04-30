# Stack: security-threat-model

Enumerate, prioritize, and plan mitigations for threats before a system ships or changes.

Blocks:
1. `frame.task`
2. `mode.critique`
3. `guardrail.assumption-audit`
4. `strategy.red-team`
5. `schema.findings-brief`

Expected output: Threat inventory ranked by impact, with mitigations assigned and highest-risk items flagged for immediate action.

## Composition notes

`frame.task` scopes the system, trust boundaries, and change under review. `mode.critique` opens the system to adversarial evaluation. `guardrail.assumption-audit` surfaces security assumptions baked into the design. `strategy.red-team` generates active attack paths the design does not currently prevent. `schema.findings-brief` produces ranked threats with evidence, impact, and mitigations.

**Choose instead when:** use `review-code` if the main job is checking correctness, contracts, blast radius, or implementation bugs in code that already exists, rather than modeling adversarial abuse and exploit paths.

**Common failure mode:** Listing generic security concerns without tying them to a boundary, attack path, or fix.

**Minimum blocks:** `mode.critique` + `strategy.red-team`
