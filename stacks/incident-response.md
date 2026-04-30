# Stack: incident-response

Contain and diagnose an active incident, then close with a written post-mortem and action plan.

Blocks:
1. `frame.task`
2. `mode.explore`
3. `frame.cause-mapping`
4. `mode.decide`
5. `schema.execution-brief`

Expected output: Incident scoped, likely cause identified, containment or next diagnostic action chosen, and corrective work assigned with urgency.

## Composition notes

`frame.task` scopes the active incident before diagnosis expands. `mode.explore` prevents tunnel-vision diagnosis during active incidents. `frame.cause-mapping` traces the failure chain systematically. `mode.decide` closes to a containment or next diagnostic action. `schema.execution-brief` produces assignable corrective work.

Post-stabilization variant:

- use `schema.incident-postmortem` after the incident is stable and the main job is learning, timeline capture, and structural prevention
- keep `schema.execution-brief` after the postmortem when remediation items need owners and checkpoints

**Common failure mode:** Trying to write the postmortem while the incident still needs containment or diagnosis.

**Minimum blocks:** `frame.cause-mapping` + `mode.decide` + `schema.execution-brief`
