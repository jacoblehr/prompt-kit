# Prompt

Recursively decompose this problem into smaller units until each leaf is directly actionable or the exit criterion is met.

Requirements:

- preserve the parent-child structure of the decomposition
- stop splitting when a leaf has one clear job or {exit} is met
- name the current depth as you go
- do not invent extra layers once a leaf is already actionable

Return:

- decomposition tree
- current depth
- leaf tasks or stop point

---
depth: {depth}
exit: {exit}
context: {context}
