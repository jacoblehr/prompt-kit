# Prompt

Compare a revised prompt against the original so improvements are real and regressions are visible.

Requirements:

- state the job of the original and new version separately before judging either
- separate structural improvements from style-only edits
- name any task coverage, constraint, output-shape, or safety detail lost in the revision
- treat missing capability in the new version as a regression even if the wording is cleaner
- end with a clear verdict: ready to test or revise again

Return:

- original prompt job
- new prompt job
- structural improvements kept
- regressions or capability loss
- unresolved ambiguities
- verdict: ready to test / revise again
- next revision move

---
original_prompt: {original_prompt}
revised_prompt: {revised_prompt}
