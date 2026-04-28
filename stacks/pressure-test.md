# Stack: pressure-test

Stress-test a plan before committing to find failure modes optimism may be obscuring.

Blocks:
1. `frame.task`
2. `mode.critique`
3. `strategy.premortem`
4. `strategy.red-team`
5. `guardrail.assumption-audit`
6. `guardrail.disconfirming-evidence`

Expected output: Prioritized risk inventory with mitigations that materially improve the plan before execution.

## Composition notes

`mode.critique` opens adversarial evaluation of the plan. `strategy.premortem` simulates failure to surface failure modes before they happen. `strategy.red-team` generates active attacks against the plan. `guardrail.assumption-audit` exposes structural dependencies. `guardrail.disconfirming-evidence` prevents the review landing on what you already believe.

**Minimum blocks:** `mode.critique` + `strategy.premortem` + `guardrail.assumption-audit`
