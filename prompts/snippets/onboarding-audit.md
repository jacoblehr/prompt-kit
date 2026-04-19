# Onboarding Audit

Use when you need to assess how easy it is to get productive in a codebase, or to design a better onboarding experience.

```text
Audit the onboarding experience for the following codebase.

Codebase description: {codebase_description}

Target newcomer profile (experience level, background): {newcomer_profile}

Evaluate:
1. Entry points — is there a clear starting point? Is setup documented and does it work?
2. Mental model — can a newcomer build a correct picture of how the system works without reading all the code?
3. Documentation coverage — which critical paths are undocumented? Where does documentation lie?
4. Conventions — are naming, structure, and patterns consistent enough to be learned and applied?
5. Test coverage as documentation — do tests explain intended behaviour, or are they opaque?
6. Danger zones — what areas are brittle, poorly understood, or likely to bite a newcomer?
7. Time-to-first-contribution — what is the realistic path to a meaningful first commit?

Produce:
- A severity-ranked list of onboarding blockers
- The single change that would most improve time-to-productivity
- A suggested first-week learning path for the target newcomer
```

Domain tags:
- software engineering
- developer experience
- documentation
- onboarding
