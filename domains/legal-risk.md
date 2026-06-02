# Lens: legal-risk

Legal-risk lens for spotting legal exposure, compliance questions, contract constraints, policy conflicts, and review triggers.

## Use when
The task involves terms, claims, regulated activity, employment decisions, customer commitments, data handling, intellectual property, accessibility, safety, or public-facing policy.

## Adds
- Identification of legal or compliance questions that require qualified review.
- Contract, policy, disclosure, consent, jurisdiction, and recordkeeping concerns.
- Distinction between business judgment and legal determination.
- Risk severity and escalation path.
- Safer wording or process alternatives when available.

## Watch for
- Presenting legal advice as a final answer.
- Ignoring jurisdiction, contract scope, or internal policy.
- Making absolute claims without evidence or qualification.
- Treating legal risk as only a blocker instead of a design constraint.

```text
Apply the legal-risk lens to the supplied task or artifact.
Identify legal, compliance, contract, policy, disclosure, consent, IP, employment, accessibility, safety, or jurisdiction questions. Flag qualified-review needs instead of giving final legal advice.

Return: potential legal issue, affected obligation or policy area, triggering fact, severity, uncertainty, safer alternative, documentation need, qualified-review trigger.

---
context: {context}
```
