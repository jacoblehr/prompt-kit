# Stack: Break a Recurring Incident

Use when the same class of incident keeps resurfacing and the root problem is likely socio-technical, not just a single buggy line of code.

Useful inputs:

- a short history of the recurring incident pattern
- what has already been fixed or changed after previous occurrences
- who gets paged, who owns the system, and where work tends to stall

Suggested blocks:

1. `mode.reflect`
2. `schema.incident-postmortem`
3. `lens.feedback-loops`
4. `lens.incentive-audit`
5. `schema.plan-next-actions`

Expected outcome:

- incident pattern captured as a repeatable loop, not just an isolated event
- reinforcing and balancing loops exposed: what keeps recreating the problem?
- incentives or ownership gaps identified that quietly reward recurrence or delay prevention
- action plan focused on breaking the loop, not merely cleaning up the latest failure

Domain tags:
- software engineering
- incident management
- systems thinking
- reliability

---

## Composition notes

**Minimum blocks:** `mode.reflect`, `frame.incident-postmortem`, `lens.feedback-loops`

**Why this order works:** Reflect mode prevents the postmortem from becoming a blame session. Incident-postmortem captures the timeline while it is still fresh. Feedback-loops then reframes the incident as a systemic pattern rather than a single failure. Incentive-audit adds the socio-technical layer — what rewards or ownership gaps are quietly sustaining the recurrence? Plan-next-actions closes with changes aimed at breaking the loop, not patching the latest failure.

**Common swaps:** Swap `lens.incentive-audit` for `lens.leverage-points` if the systemic view is already clear and you need to identify where to intervene. Swap `frame.plan-next-actions` for `schema.execution-brief` when the next steps need to be handed off.

**Common failure mode:** Treating the recurring incident as a new isolated event. Without `lens.feedback-loops`, the postmortem produces tactical fixes that leave the underlying reinforcing loop intact.
