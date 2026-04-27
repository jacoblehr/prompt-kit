# Stack: risk-decision

Decide under material risk or uncertain futures where failure would be costly.

Blocks:
1. `frame.task`
2. `frame.cause-mapping`
3. `strategy.inversion`
4. `strategy.premortem`
5. `guardrail.assumption-audit`
6. `schema.decision-memo`

Expected output: Decision with explicit risk inventory, failure paths named, and mitigations tied to highest-likelihood causes.

## Composition notes

`frame.task` scopes the decision and names what failure would mean. `frame.cause-mapping` pre-traces the causal chain before committing. `strategy.inversion` models the path to failure from the inside. `strategy.premortem` writes the failure story before it happens. `guardrail.assumption-audit` exposes beliefs the reasoning depends on. `schema.decision-memo` captures the outcome as a traceable record.

**Minimum blocks:** `frame.task` + `strategy.inversion` + `guardrail.assumption-audit`
