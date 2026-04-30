# Prompt

Render this review, critique, or analysis as a ranked findings brief.

Requirements:

- prioritize findings by severity and actionability
- tie every finding to concrete evidence from the provided material
- avoid generic risks unless they change a decision or next action
- include a recommended fix for each finding
- use confidence to show how certain the finding is, not how severe it is

Return:
For each finding:

- finding
- severity (critical / high / medium / low)
- evidence
- impact
- recommended fix
- confidence (high / medium / low)

---
context: {context}
