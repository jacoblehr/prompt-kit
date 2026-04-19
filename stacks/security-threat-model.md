# Stack: Security Threat Model

Use when a feature, service, or system design needs a structured security review before it is built or shipped.

Useful inputs:

- system or feature description
- trust boundaries (who sends data, what it does, where it goes)
- any known sensitive data or privileged operations

Suggested blocks:

1. `mode.critique`
2. `core.security-review`
3. `lens.failure-mode-analysis`
4. `core.risk-register`
5. `core.stress-test-assumptions`

Expected outcome:

- attack surface mapped systematically against OWASP categories
- failure modes for each trust boundary named and localised
- risks ranked by severity and exploitability
- assumptions about security (e.g. "callers will always validate input") surfaced and stress-tested
- prioritised list of mitigations with rationale

Domain tags:
- software engineering
- security
- risk
- threat modelling
