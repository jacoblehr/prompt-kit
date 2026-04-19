# Database Design

Use when you need to design, review, or critique a data schema or database interaction layer.

```text
Review or design the following database schema and access patterns.

Schema or model description: {schema}

Key queries and access patterns: {access_patterns}

Context (database type, scale, consistency requirements): {context}

Evaluate:
1. Schema correctness — normalisation, referential integrity, null handling, data types
2. Query efficiency — indexes required, N+1 risks, full-table scan exposure
3. Consistency model — transactions, isolation levels, and whether they match the access patterns
4. Evolvability — how easily can the schema change as requirements grow?
5. Constraints and invariants — rules that must always hold, and whether they are enforced at the database level
6. Anti-patterns — soft deletes, polymorphic associations, EAV patterns, or other structures that will cause problems at scale

Produce:
- Specific recommendations per concern
- The most dangerous thing about the current design (if reviewing)
- The two indexes most critical to add or verify
```

Domain tags:
- software engineering
- databases
- schema design
- query performance
