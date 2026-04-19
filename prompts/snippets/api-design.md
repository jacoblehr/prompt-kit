# API Design

Use when you need to design or review an API surface — REST, GraphQL, RPC, or library interface.

```text
Design or critique the following API.

API purpose: {api_purpose}

Consumers and usage context: {consumers}

Existing design or draft (if any): {draft}

Address:
1. Resource and operation model — are resources coherent and operations well-named?
2. Contract clarity — are inputs, outputs, errors, and edge cases precisely specified?
3. Consistency — naming conventions, pagination, error shapes, versioning strategy
4. Evolvability — can the API change without breaking existing callers?
5. Security surface — authentication, authorisation, rate limiting, input validation points
6. Discoverability — will new consumers understand it without reading all the code?
7. Leaky abstractions — places where internal implementation details bleed into the contract

Produce:
- A revised or initial API specification sketch for the core endpoints or operations
- The top three design risks
- One invariant the API must preserve under all conditions
```

Domain tags:
- software engineering
- API design
- systems design
- contracts
