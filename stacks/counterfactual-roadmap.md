# Stack: counterfactual-roadmap

Plan from alternate futures backward so near-term choices account for scenarios that are easy to ignore.

Useful inputs:
- strategic question or plan
- time horizon
- current assumptions
- leading indicators
- known constraints
- decision or investment options

Blocks:
1. `strategy.scenario-planning`
2. `guardrail.uncertainty`
3. `schema.option-map`

Optional add-ons:
- `frame.success-criteria` when success needs to be judged before options are compared.
- `mode.explore` when premature convergence is a real risk.
- `guardrail.disconfirming-evidence` when confirmation bias is a material risk.
- `rubric.decision-quality` when the decision should be evaluated before acting.

Expected output: Counterfactual scenarios, trigger signals, robust near-term moves, fragile bets, and a decision-ready option map.

## Composition notes

`frame.success-criteria` defines what the roadmap must still achieve across possible futures. `mode.explore` keeps the scenario set broad before commitment. `strategy.scenario-planning` creates alternate futures and works backward from them. `guardrail.uncertainty` labels which signals are facts, assumptions, or unknowns. `guardrail.disconfirming-evidence` looks for evidence that would break the favored scenario. `schema.option-map` compares moves by where they hold up or fail. `rubric.decision-quality` checks that the final roadmap is not just a story about the preferred future.

**Choose instead when:** use `strategy-to-roadmap` when the strategy is already chosen and the main job is sequencing. Use `risk-decision` when a single high-stakes choice needs explicit risk acceptance.

**Common failure mode:** Treating scenarios as decorative narratives instead of using them to change near-term choices.

**Minimum blocks:** `strategy.scenario-planning` + `guardrail.uncertainty` + `schema.option-map`
