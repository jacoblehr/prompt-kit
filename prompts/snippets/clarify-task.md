# Clarify Task

Use when a request is vague or overloaded.

```text
Clarify this task before trying to solve it.

Return:
- what the task most likely means
- the biggest missing details
- the best clarifying questions to ask next
- a cleaner version of the task if I want to hand it back
- the best next reasoning step

Task:
{paste task}
```

Domain tags:
- task framing
- requirements
- scoping

---

Avoid when:
The task is already tightly specified with clear scope and output. Clarification on a well-defined task adds overhead rather than precision.

---

Metadata:
- type: frame
- stage: frame
- strength: light
- pairs with: `mode.explore`, `frame.task`, `frame.success-criteria`
