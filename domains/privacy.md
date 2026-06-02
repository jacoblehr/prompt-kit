# Lens: privacy

Privacy lens for personal data, consent, collection limits, retention, disclosure, inference, surveillance, and misuse risk.

## Use when
The task collects, stores, processes, infers, shares, displays, or makes decisions using personal, sensitive, behavioral, or identifiable data.

## Adds
- Data minimization, purpose limitation, consent, retention, access, and deletion questions.
- Sensitive-data and re-identification risk.
- User expectation, disclosure, and control checks.
- Misuse, secondary use, and internal access concerns.
- Review triggers for legal, security, or compliance escalation.

## Watch for
- Collecting data because it might be useful later.
- Treating anonymization as a guarantee.
- Ignoring inferred sensitive attributes.
- Hiding retention, sharing, or access paths.

```text
Apply the privacy lens to the supplied task or artifact.
Inspect data collected, purpose, necessity, consent or notice, retention, access, sharing, inference risk, misuse risk, user control, and review triggers.

Return: data involved, stated purpose, minimum necessary data, user expectation, consent or notice gap, retention concern, misuse or re-identification risk, mitigation, review trigger.

---
context: {context}
```
