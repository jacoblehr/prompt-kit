# Code Review

Use when reviewing a pull request, diff, or piece of code and you want to give structured, actionable feedback.

```text
Review this code and give structured, actionable feedback.

Cover:
1. Correctness: does it do what it is supposed to? Are there edge cases it mishandles?
2. Logic errors: are there off-by-one errors, incorrect conditionals, or missed branches?
3. Security: are there injection points, untrusted inputs, or exposed secrets?
4. Performance: are there obvious bottlenecks — O(n²) operations, repeated reads, redundant work?
5. Maintainability: is the code understandable, correctly named, and structured for change?
6. Test coverage: what cases are not covered and are most likely to fail in production?

Format each issue as:
- Location (file, function, or line reference)
- Issue (specific and factual)
- Suggested fix or approach

Only flag real issues. Do not suggest changes that are purely stylistic preference
without an objective cost.

Code:
{paste code under review}

Language and context:
{paste language, framework, and purpose of this code}
```

Domain tags:
- software engineering
- critical thinking
- quality
