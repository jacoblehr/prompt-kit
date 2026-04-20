# Requirements Decomposition

Use when a high-level feature, epic, or user need must be broken into clear, independently shippable requirements before estimation or implementation begins.

```text
Decompose this feature or requirement into clear, independently testable stories.

For each story:
- state it as a specific capability the system should have after the story is complete
- describe the acceptance criteria (what a tester would verify)
- identify dependencies on other stories
- estimate implementation complexity: small / medium / large

After the stories:
- identify the minimum viable subset that would deliver something demonstrably useful
- flag any story that hides significant unknowns requiring a spike before estimation is reliable
- note any non-functional requirements (performance, security, observability) that apply across multiple stories

Feature or requirement:
{paste the high-level description}

Context (system, users, constraints):
{paste relevant context}
```

Domain tags:
- software engineering
- planning
- communication

---

Metadata:
- type: frame
- stage: frame
- strength: medium
- pairs with: `frame.clarify-task`, `frame.define-success-metrics`, `frame.test-strategy`
