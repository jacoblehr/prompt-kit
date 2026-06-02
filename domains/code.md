# Domain: code

Software engineering overlay for implementation, review, debugging, refactoring, testing, APIs, migrations, and agentic coding.

## Use when
The task involves source code, repository changes, system behavior, interfaces, deployment, or technical risk.

## Adds
- Correctness at behavioral and boundary-contract levels.
- Invariants that must hold before and after the change.
- Blast-radius awareness across callers, services, data, and tests.
- Failure behavior when dependencies are slow, absent, stale, or incorrect.
- Verification through focused tests, reproduction steps, or runtime checks.

## Watch for
- Treating style preferences as correctness findings.
- Fixing symptoms before proving the cause.
- Ignoring compatibility, rollback, or migration paths.
- Assuming tests cover behavior without checking assertions and fixtures.

```text
Apply the software engineering overlay to the supplied task or artifact.
Inspect behavior, contracts, invariants, dependencies, blast radius, failure modes, and verification. Treat external inputs and network/service boundaries as untrusted.

Return: affected surface, expected behavior, invariants, boundary contracts, likely failure modes, verification plan, compatibility or rollback concerns, highest-risk gap.

---
context: {context}
```
