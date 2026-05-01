# Stack: risk-decision

Decide under material risk or uncertain futures where failure would be costly.

Blocks:
1. `frame.task`
2. `strategy.premortem`
3. `schema.decision-memo`

Optional add-ons:
- `frame.cause-mapping` when causes or contributing factors need tracing.
- `guardrail.assumption-audit` when hidden premises could change the answer.

Expected output: Decision with explicit risk inventory, failure paths named, and mitigations tied to highest-likelihood causes.

## Composition notes

`frame.task` scopes the decision and names what failure would mean. `frame.cause-mapping` pre-traces the causal chain before committing. `strategy.premortem` treats failure as a committed fact, forcing specific causes rather than hedged hypotheticals. `guardrail.assumption-audit` exposes beliefs the reasoning depends on. `schema.decision-memo` captures the outcome as a traceable record.

**Minimum blocks:** `frame.task` + `strategy.premortem` + `schema.decision-memo`
