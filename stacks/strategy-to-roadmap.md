# Stack: strategy-to-roadmap

Convert a strategic direction or ambiguous bet into a sequenced roadmap that can survive uncertainty and capacity constraints.

Blocks:
1. `strategy.scenario-planning`
2. `strategy.tradeoff-matrix`
3. `schema.execution-brief`

Optional add-ons:
- `frame.success-criteria` when success needs to be judged before options are compared.
- `guardrail.assumption-audit` when hidden premises could change the answer.
- `mode.decide` when the response must close on a recommendation.

Expected output: Roadmap direction with robust moves, deferred bets, key assumptions, sequencing, and the first execution checkpoint.

## Composition notes

`frame.success-criteria` defines what the roadmap must optimize before options are compared. `strategy.scenario-planning` explores futures that could change the plan. `strategy.tradeoff-matrix` compares candidate moves under the criteria and scenarios. `guardrail.assumption-audit` exposes what the roadmap depends on being true. `mode.decide` commits to a sequence, and `schema.execution-brief` turns the choice into concrete next work.

**Choose instead when:** use `prioritize-portfolio` when the options are already known and the main problem is ranking within current capacity.

**Common swaps:** Use `schema.decision-memo` instead of `schema.execution-brief` when the roadmap decision needs to be recorded before planning execution.

**Common failure mode:** Producing a timeline of desired outcomes without naming which moves are robust across scenarios and which depend on one future being true.

**Minimum blocks:** `strategy.scenario-planning` + `strategy.tradeoff-matrix` + `schema.execution-brief`
