# Test Strategy

Use when designing or auditing the test coverage for a system, module, or feature.

```text
Design a test strategy for this system or feature.

Cover:
1. Risk map: what are the highest-risk behaviours — where would a bug cause the worst outcome?
2. Unit boundaries: what are the smallest testable units and what contracts do they have?
3. Integration points: which component boundaries are most likely to fail?
4. Happy path: what does the minimally working case look like?
5. Edge cases and error paths: what inputs, states, or conditions are most likely to break things?
6. Test types recommended: unit / integration / contract / end-to-end / load — which are needed and why?
7. What should NOT be tested at a low level (because it would make tests brittle without adding value)?

Then identify: what is the single most valuable test that does not exist yet?

System or feature:
{paste description, spec, or existing test suite}

Language and framework:
{paste language and testing tools in use}
```

Domain tags:
- software engineering
- risk management
- quality

---

Metadata:
- type: frame
- stage: critique
- strength: medium
- pairs with: `mode.critique`, `frame.requirements-decomposition`, `frame.release-readiness`
