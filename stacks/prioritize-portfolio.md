# Stack: prioritize-portfolio

Rank competing bets or tasks when several look worthwhile but capacity is constrained.

Blocks:
1. `frame.success-criteria`
2. `strategy.tradeoff-matrix`
3. `schema.execution-brief`

Optional add-ons:
- `frame.task` when scope or non-goals need to be made explicit.
- `guardrail.assumption-audit` when hidden premises could change the answer.
- `mode.decide` when the response must close on a recommendation.

Expected output: Prioritized portfolio with the winning bet, deferred options, explicit tradeoffs, and first execution checkpoint.

## Composition notes

`frame.task` scopes the portfolio and constraint. `frame.success-criteria` defines what prioritization must optimize before options are scored. `strategy.tradeoff-matrix` compares bets across only decision-changing criteria. `guardrail.assumption-audit` exposes confidence gaps behind rankings. `mode.decide` commits to the priority order. `schema.execution-brief` turns the top choice into concrete next work while preserving what was deferred.

**Common swaps:** Use `schema.option-map` before `mode.decide` when the portfolio needs discussion before commitment.

**Common failure mode:** Ranking by desirability while leaving capacity, dependency, reversibility, or confidence implicit.

**Minimum blocks:** `frame.success-criteria` + `strategy.tradeoff-matrix` + `schema.execution-brief`
