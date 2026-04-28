# Prompt

Recursively decompose this problem into smaller units until each leaf is directly actionable or a stopping condition is met.

Requirements:

- preserve the parent-child structure of the decomposition
- stop splitting when a leaf has one clear job or {stop_condition} is met
- name the current depth as you go
- do not invent extra layers once a leaf is already actionable

Return:

- decomposition tree
- current depth
- leaf tasks or stop point

---
depth: {depth}
stop_condition: {stop_condition}
context: {context}