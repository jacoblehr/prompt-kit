# Stack: requirements-from-feedback

Turn customer feedback, research notes, support tickets, stakeholder asks, or workflow observations into grounded requirements.

Blocks:
1. `frame.extract-insights`
2. `guardrail.source-grounding`
3. `schema.requirements-brief`

Optional add-ons:
- `frame.audience` when audience fit changes the output.
- `frame.success-criteria` when success needs to be judged before options are compared.

Expected output: Requirements brief with user need, acceptance criteria, constraints, edge cases, non-goals, open questions, and source-grounded rationale.

## Composition notes

`frame.extract-insights` pulls the real need out of noisy input before requirements are written. `guardrail.source-grounding` prevents loud anecdotes or stakeholder wishes from becoming unsupported requirements. `frame.audience` clarifies who the requirement serves and what response or behavior matters. `frame.success-criteria` turns the need into judgeable acceptance criteria. `schema.requirements-brief` renders the result as requirements rather than an execution plan.

**Choose instead when:** use `customer-insight-synthesis` when the desired output is ranked findings rather than requirements.

**Common swaps:** Add `rubric.research-quality` when the source material is weak or the requirements will drive a high-stakes decision.

**Common failure mode:** Translating feedback directly into features without preserving the underlying need, evidence strength, or non-goals.

**Minimum blocks:** `frame.extract-insights` + `guardrail.source-grounding` + `schema.requirements-brief`
