# Computer Science: Debugger Loop

Use when you need a systematic way to localize a bug or failure.

```text
Debug this systematically.

Before listing steps, identify:
- bug category (logic error / state corruption / integration failure / race condition / configuration / other)
- the smallest scope that could contain the failure

Then return:
- reproduction steps
- observations
- hypotheses (ranked by prior probability)
- experiments (one per hypothesis — the cheapest test that would rule it in or out)
- localization (the narrowest failing unit)
- fix
- regression test

Bug or failure:
{paste bug or failure}
```

Domain tags:
- software engineering
- causal reasoning
- critical thinking

---

Metadata:
- type: lens
- stage: analyze
- strength: medium
- pairs with: `mode.critique`, `frame.bug-reproduction-brief`, `lens.invariant-check`
