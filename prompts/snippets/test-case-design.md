# Test Case Design

Use when you do not need a full test strategy, just a compact set of high-value tests for one behavior, bug, or change.

```text
Design a compact, high-value test set for this behavior or change.

Return:
- core happy-path test
- boundary tests
- error-path tests
- regression test for the known bug or risk
- contract or integration test if a boundary is involved
- minimal fixture or setup data needed
- what not to test here because it belongs at another layer

Behavior, bug, or change:
{paste the requirement, bug, or diff summary}

Language, test framework, and relevant constraints:
{paste tooling, framework, and any setup limitations}
```

Domain tags:
- software engineering
- testing
- quality
- regression prevention
