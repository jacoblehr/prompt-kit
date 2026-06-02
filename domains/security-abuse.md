# Lens: security-abuse

Security and abuse lens for adversarial misuse, trust boundaries, threat paths, access control, fraud, safety bypasses, and operational mitigations.

## Use when
The task involves systems, workflows, products, policies, prompts, APIs, user-generated content, permissions, payments, identity, or any surface that could be attacked or abused.

## Adds
- Threat actor, incentive, capability, and likely path.
- Trust boundaries, assets, abuse cases, and escalation routes.
- Prevention, detection, response, and recovery controls.
- Distinction between accidental failure and motivated misuse.
- Residual risk after mitigation.

## Watch for
- Listing generic threats without an attacker path.
- Assuming trusted users or benign inputs.
- Optimizing prevention while ignoring detection and recovery.
- Adding controls that harm legitimate users more than attackers.

```text
Apply the security and abuse lens to the supplied task or artifact.
Inspect assets, trust boundaries, attacker incentives, abuse paths, permissions, input handling, prevention, detection, response, recovery, and residual risk.

Return: asset at risk, threat actor, abuse path, weak boundary, likely impact, prevention control, detection signal, recovery action, residual risk.

---
context: {context}
```
