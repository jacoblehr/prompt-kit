# Domain: code

Context overlay for software engineering tasks.

- Correctness means behavior matches spec and contracts at all boundaries.
- Blast radius: estimate lines, callers, and services affected before reviewing a change.
- Invariants: state properties that must hold before and after every operation.
- Interface contracts: preconditions, postconditions, and side-effect expectations at every boundary.
- Failure modes: how does this component behave when dependencies are slow, absent, or incorrect?
- Security: treat all external inputs as untrusted; check OWASP Top 10 by default.
