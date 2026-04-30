# Stack: prioritize-portfolio

Rank competing bets or tasks when several look worthwhile but capacity is constrained.

Blocks:
1. `frame.task`
2. `frame.success-criteria`
3. `strategy.tradeoff-matrix`
4. `guardrail.assumption-audit`
5. `mode.decide`
6. `schema.execution-brief`

Expected output: Prioritized portfolio with the winning bet, deferred options, explicit tradeoffs, and first execution checkpoint.

## Composition notes

`frame.task` scopes the portfolio and constraint. `frame.success-criteria` defines what prioritization must optimize before options are scored. `strategy.tradeoff-matrix` compares bets across only decision-changing criteria. `guardrail.assumption-audit` exposes confidence gaps behind rankings. `mode.decide` commits to the priority order. `schema.execution-brief` turns the top choice into concrete next work while preserving what was deferred.

**Common swaps:** Use `schema.option-map` before `mode.decide` when the portfolio needs discussion before commitment.

**Common failure mode:** Ranking by desirability while leaving capacity, dependency, reversibility, or confidence implicit.

**Minimum blocks:** `frame.success-criteria` + `strategy.tradeoff-matrix` + `mode.decide`
