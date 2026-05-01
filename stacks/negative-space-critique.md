# Stack: negative-space-critique

Critique an artifact by looking for what is missing, avoided, or silently assumed rather than what is already present.

Useful inputs:
- draft, plan, design, argument, prompt, or system description
- intended audience or user
- stated goals
- constraints and non-goals
- known objections or excluded alternatives

Blocks:
1. `mode.critique`
2. `guardrail.assumption-audit`
3. `schema.findings-brief`

Optional add-ons:
- `frame.task` when scope or non-goals need to be made explicit.
- `strategy.red-team` when the artifact needs a stronger opposing test.
- `guardrail.disconfirming-evidence` when confirmation bias is a material risk.

Expected output: Prioritized omissions, hidden dependencies, missing countercases, consequences of each absence, and concrete fixes.

## Composition notes

`frame.task` scopes the artifact and the kind of absence that matters. `mode.critique` turns attention toward failure and incompleteness. `strategy.red-team` actively searches for what the artifact does not defend against. `guardrail.assumption-audit` identifies premises that remain unstated. `guardrail.disconfirming-evidence` finds contrary cases the artifact omits. `schema.findings-brief` turns absence into concrete, ranked findings rather than vague unease.

**Choose instead when:** use `critique` for a general quality review. Use `pressure-test` when the artifact is a plan and the main job is simulating future failure.

**Common failure mode:** Naming omissions without explaining why each missing piece changes quality, risk, or action.

**Minimum blocks:** `mode.critique` + `guardrail.assumption-audit` + `schema.findings-brief`
