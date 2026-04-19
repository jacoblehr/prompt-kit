# Bug Reproduction Brief

Use when a bug report is vague, inconsistent, or dependent on hidden state and you need a reproducible investigation target.

```text
Turn this bug report or symptom into a reproducible investigation brief.

Return:
- expected behavior
- actual behavior
- exact reproduction steps, or the missing details that prevent them
- environment dimensions to control: OS, browser, device, flags, data state, timing, permissions
- evidence to capture while reproducing: logs, screenshots, requests, traces, database state
- likely sources of hidden state or non-determinism
- smallest reliable reproduction target: test, endpoint, page flow, worker, or script
- next move if the bug still cannot be reproduced

Bug report or symptom:
{paste the report, issue description, or observed behavior}

Known evidence:
{paste logs, screenshots, recent changes, or user reports}
```

Domain tags:
- software engineering
- debugging
- reproduction
- quality
