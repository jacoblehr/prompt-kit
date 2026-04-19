# Stack: Design For Outcomes

Use when building, writing, or planning something and you want to anchor on what the person on the receiving end actually needs, not just what was requested.

Useful inputs:

- what you're building or creating
- who will use it and in what situation
- any assumptions you're carrying about what good looks like

Suggested blocks:

1. `mode.decide`
2. `frame.success-criteria`
3. `guardrail.assumption-audit`

Expected outcome:

- outcome-oriented definition of success
- explicit assumptions surfaced and ranked by risk
- the version most likely to actually do the job

---

## Composition notes

**Minimum blocks:** `frame.success-criteria`, `guardrail.assumption-audit`

**Why this order works:** Success-criteria anchors the design on what the person on the receiving end actually needs, not what was requested. Assumption-audit surfaces the implicit bets before any design commitment. Without these two, the most common output is an elegant solution to a slightly wrong problem.

**Common swaps:** Swap `guardrail.assumption-audit` for `lens.jobs-to-be-done` when the user's underlying job is the primary unknown. Add `frame.compare-options` when multiple design approaches need to be evaluated against the success criteria.

**Common failure mode:** Defining success after the design is done. Retroactive success criteria tend to match what was already built rather than what the person actually needed.
