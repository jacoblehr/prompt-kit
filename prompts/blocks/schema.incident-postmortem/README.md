# schema.incident-postmortem

## Purpose
Render a structured, blame-free post-mortem for a system incident or significant failure.

## Use when
After an incident has been stabilized and the team needs to extract root cause and corrective actions before the signal decays.

## Expects
Incident summary, impact description, and duration.

## Adds
A structured timeline-to-prevention format that separates root cause from contributing factors and closes with structural remediation.

## Returns
- timeline
- root cause
- contributing factors
- what went well
- remediation items (with owner and urgency)
- structural prevention

## Pairs with
`mode.reflect`, `frame.cause-mapping`, `schema.execution-brief`

## Avoid when
The incident is still active — stabilize first, then debrief.

---

## Metadata
- type: schema
- stage: conclude
- strength: heavy
