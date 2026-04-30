# Stack: pressure-test

Stress-test a plan before committing to find failure modes optimism may be obscuring.

Blocks:
1. `frame.task`
2. `mode.critique`
3. `strategy.premortem`
4. `strategy.red-team`
5. `guardrail.assumption-audit`
6. `schema.findings-brief`

Expected output: Prioritized risk inventory with mitigations that materially improve the plan before execution.

## Composition notes

`mode.critique` opens adversarial evaluation of the plan. `strategy.premortem` simulates failure to surface failure modes before they happen. `strategy.red-team` generates active attacks against the plan. `guardrail.assumption-audit` exposes structural dependencies. `schema.findings-brief` turns the pressure test into ranked, fixable findings.

**Common swaps:** Use `guardrail.disconfirming-evidence` instead of `strategy.red-team` when the risk is confirmation bias rather than active attack.

**Common failure mode:** Producing a long risk list without severity, evidence, or a concrete fix path.

**Minimum blocks:** `mode.critique` + `strategy.premortem` + `guardrail.assumption-audit`
