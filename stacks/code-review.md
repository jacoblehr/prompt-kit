# Stack: Code Review

Use when reviewing a pull request or piece of code and you want thorough, structured feedback that covers correctness, security, and maintainability.

Useful inputs:

- the code diff or full file under review
- the language, framework, and context
- any specific concerns already in mind

Suggested blocks:

1. `mode.critique`
2. `core.code-review`
3. `core.change-impact-review`
4. `lens.invariant-check`
5. `lens.interface-contract-review`

Expected outcome:

- correctness, security, and maintainability issues identified and localised
- change blast radius made explicit before small-looking edits are approved
- invariants that the code must preserve — and whether they hold — made explicit
- boundary contracts checked for leaks or violations
- a prioritised list of issues and suggested fixes

Domain tags:
- software engineering
- critical thinking
- quality
