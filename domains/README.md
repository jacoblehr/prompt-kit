# Domains And Lenses

Context-only overlays that add domain vocabulary, evaluation heuristics, and failure modes to any block or stack.

Overlays do **not** change the core reasoning logic. They are not roles, personas, or new block types. Use them when subject-matter context would make the same stack sharper.

## How To Use

Paste one overlay after a stack or compact block when it materially changes what should be inspected, preserved, or returned.

Use at most one domain overlay and one cross-cutting lens unless the task is high-stakes. Too many overlays dilute the prompt.

## Available Overlays

| File | Kind | Use for |
| --- | --- | --- |
| `code.md` | Domain | Software engineering, correctness, contracts, security-adjacent implementation work |
| `data.md` | Domain | Data analysis, statistics, research, measurement, evidence quality |
| `finance.md` | Domain | Budgets, forecasts, investment cases, unit economics, financial tradeoffs |
| `operations.md` | Domain | Reliability, handoffs, staffing, process, service delivery, incident prevention |
| `product.md` | Domain | Product and feature design, adoption, prioritization, user workflows |
| `prompts.md` | Domain | Prompt engineering, AI workflows, instruction sets, agent behavior |
| `writing.md` | Domain | Writing, editing, communication, narrative, stakeholder messaging |
| `accessibility.md` | Lens | Access barriers, assistive technology, inclusive interaction, perceivability |
| `legal-risk.md` | Lens | Legal exposure, compliance questions, policy constraints, review triggers |
| `pedagogy.md` | Lens | Learning design, explanation, curriculum, practice, assessment |
| `privacy.md` | Lens | Personal data, consent, collection limits, retention, misuse risk |
| `security-abuse.md` | Lens | Threats, abuse paths, trust boundaries, mitigations, adversarial misuse |

## Overlay Rules

- Prefer concrete concerns over credentials or personas.
- Name evidence needs and failure modes, not just topics.
- Mark assumptions and review triggers explicitly.
- For regulated or high-stakes domains, return issues for qualified review rather than pretending to provide final professional advice.
- Keep blocks domain-neutral; use overlays to add domain specificity.
