# Stack: Security Threat Model

Use when a feature, service, or system design needs a structured security review before it is built or shipped.

Useful inputs:

- system or feature description
- trust boundaries (who sends data, what it does, where it goes)
- any known sensitive data or privileged operations

Suggested blocks:

1. `mode.critique`
2. `frame.security-review`
3. `lens.failure-mode-analysis`
4. `frame.risk-register`
5. `guardrail.stress-test-assumptions`

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

---

## Composition notes

**Minimum blocks:** `mode.critique`, `frame.security-review`, `frame.risk-register`

**Why this order works:** Critique mode sets the adversarial stance before the threat surface is mapped. Security-review maps the attack surface systematically. Failure-mode-analysis examines each trust boundary for exploitable failure modes. Risk-register ranks threats by severity and exploitability. Stress-test-assumptions closes by surfacing the security assumptions that are trusted but not verified.

**Common swaps:** Swap `lens.failure-mode-analysis` for `lens.interface-contract-review` when the security model depends heavily on correct boundary enforcement. Add `strategy.red_team` when an adversarial challenge from a hostile-actor perspective is needed rather than a structured review.

**Common failure mode:** Threat modeling from first principles on every feature. The most common security failures come from documented threat categories that were not applied — OWASP and similar taxonomies exist for this reason.
