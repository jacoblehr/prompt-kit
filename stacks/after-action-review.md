# Stack: after-action-review

Extract reusable learning from a completed project, incident, launch, decision, or experiment.

Blocks:
1. `mode.reflect`
2. `frame.cause-mapping`
3. `frame.extract-insights`
4. `schema.incident-postmortem`
5. `schema.execution-brief`

Expected output: Retrospective with causal lessons, reusable insights, and concrete follow-up actions.

## Composition notes

`mode.reflect` sets the posture toward learning rather than blame or immediate reaction. `frame.cause-mapping` traces what produced the outcome. `frame.extract-insights` converts the history into reusable lessons. `schema.incident-postmortem` gives the review a timeline-to-prevention structure, even when the event was not a technical incident. `schema.execution-brief` turns the lessons into assigned follow-up work.

**Common swaps:** Drop `schema.incident-postmortem` for lightweight project retrospectives where a full timeline would add ceremony.

**Common failure mode:** Producing a narrative recap without identifying what should change next time.

**Minimum blocks:** `mode.reflect` + `frame.extract-insights` + `schema.execution-brief`
