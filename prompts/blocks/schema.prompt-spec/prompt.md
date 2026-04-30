# Prompt

Render this prompt design, rewrite, or instruction set as a testable prompt spec.

Requirements:

- make the prompt's job explicit before the prompt text
- separate operating assumptions from instructions the model must follow
- state constraints and boundaries as behavior rules, not vague preferences
- define the expected output shape clearly enough to test
- include at least two test cases, including one hard or edge case
- name known limitations rather than hiding them

Return:

- prompt purpose
- final prompt
- context assumptions
- constraints and boundaries
- output shape
- test cases
- known limitations

---
context: {context}
