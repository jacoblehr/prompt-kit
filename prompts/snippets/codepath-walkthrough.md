# Codepath Walkthrough

Use when you need to understand how a behavior actually flows through a codebase before debugging, refactoring, or extending it.

```text
Map the code path for this behavior or request.

Return:
- entry points
- main execution path
- important branch points, feature flags, and fallback paths
- external calls and trust boundaries
- state mutations and persistence points
- caches, queues, background jobs, or async boundaries touched
- best place to instrument, log, or breakpoint
- safest seam for a change

Behavior or request to trace:
{paste the user flow, API request, job, or failing behavior}

Known code or architecture context:
{paste any file paths, components, or diagrams already known}
```

Domain tags:
- software engineering
- code comprehension
- debugging
- architecture

---

Metadata:
- type: frame
- stage: analyze
- strength: medium
- pairs with: `mode.explore`, `lens.invariant-check`, `lens.interface-contract-review`
