# Stack: Prioritize Portfolio

Use when several plausible bets compete for limited time, money, or attention.

Useful inputs:

- the list of candidate bets, projects, or tasks
- resource constraints such as time, budget, or attention
- any explicit success criteria or strategic priorities

Suggested blocks:

1. `mode.decide`
2. `frame.success-criteria`
3. `frame.prioritize-opportunities`
4. `schema.execution-brief`
5. `guardrail.uncertainty`

Expected outcome:

- ranked bets
- now versus later cuts
- execution brief for the top priority
- visible uncertainty

Domain tags:
- resource allocation
- portfolio management
- prioritization

---

## Composition notes

**Minimum blocks:** `mode.decide`, `frame.success-criteria`, `frame.prioritize-opportunities`

**Why this order works:** Decide mode commits to making a choice rather than generating more options. Success-criteria defines the optimization target before any bet is evaluated — without it, prioritization defaults to whoever advocates loudest. Prioritize-opportunities scores against the defined criteria. Execution-brief closes with a handoff-ready plan for the top priority. Uncertainty guardrail prevents the ranking from being treated as more reliable than it is.

**Common swaps:** Swap `schema.execution-brief` for `schema.decision-memo` when a documented rationale is more important than a handoff document. Swap `guardrail.uncertainty` for `guardrail.assumption-audit` when the rankings rest on important unverified assumptions.

**Common failure mode:** Prioritizing without defining success criteria first. Priority rankings without explicit criteria are politics in analytical clothing.
