# Prompt

Check whether this artifact is grounded in the supplied source material.

Requirements:

- list the important claims, findings, or recommendations
- mark each claim as directly supported, inferred, contradicted, or unsupported
- distinguish evidence from interpretation
- flag missing sources and source contradictions
- weaken or remove claims that are stronger than the evidence permits
- name the revision needed to make the artifact source-faithful

Return:

- key claim
- source support
- evidence type
- unsupported leap
- contradiction or missing source
- revision needed
- claims to remove or qualify

---
artifact: {artifact}
