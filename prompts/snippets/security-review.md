# Security Review

Use when you need to identify security vulnerabilities in code, a design, or a technical proposal before shipping.

```text
Perform a security review of the following code or design.

Input: {code_or_design}

Context (language, framework, what it does): {context}

Check for:
1. Injection risks — SQL, command, template, path traversal
2. Authentication and authorisation — missing checks, privilege escalation, insecure defaults
3. Input validation — unvalidated or unsanitised inputs reaching sensitive operations
4. Secrets and credentials — hardcoded values, logging sensitive data, insecure storage
5. Cryptography — weak algorithms, improper use of randomness, key management problems
6. Dependency risk — known-vulnerable libraries or unnecessary dependencies
7. Error handling — stack traces or internal details leaking to untrusted callers

For each finding:
- Name the vulnerability class (e.g. OWASP category)
- Locate it precisely
- Describe the attack scenario
- Recommend a concrete fix

Rank findings: Critical / High / Medium / Low.
```

Domain tags:
- security
- software engineering
- code review
- OWASP
