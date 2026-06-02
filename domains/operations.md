# Domain: operations

Operations and service-delivery overlay for processes, handoffs, reliability, staffing, runbooks, incident prevention, and repeated work.

## Use when
The task involves an operational workflow, team process, service delivery path, escalation, recurring incident, or support burden.

## Adds
- Clear ownership, handoffs, queues, service levels, and escalation paths.
- Failure modes around overload, ambiguity, dependency delay, and invisible work.
- Monitoring signals, rollback or pause triggers, and recovery procedures.
- Distinction between one-time cleanup and durable process change.
- Capacity and staffing constraints as first-class inputs.

## Watch for
- Treating process gaps as individual discipline problems.
- Creating a checklist without owner, cadence, or trigger.
- Ignoring load, queues, on-call burden, or support paths.
- Fixing the latest failure while leaving the recurrence loop intact.

```text
Apply the operations overlay to the supplied task or artifact.
Inspect ownership, handoffs, queues, dependencies, capacity, monitoring signals, escalation paths, recovery procedures, and recurrence risks.

Return: operational objective, owner, handoffs, service or timing expectation, likely bottleneck, failure mode, monitoring signal, escalation path, durable prevention step.

---
context: {context}
```
