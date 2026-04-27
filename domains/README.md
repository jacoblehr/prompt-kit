# Domains

Context-only overlays that add domain vocabulary and heuristics to any stack.

A domain overlay does **not** change the reasoning logic of a block or stack. It only provides:
- Domain-specific vocabulary
- Common failure modes in this domain
- Heuristics that apply before and after reasoning steps

## Available domains

| File | Domain |
|---|---|
| `code.md` | Software engineering (correctness, contracts, security) |
| `product.md` | Product and feature design (JTBD, prioritization, adoption) |
| `writing.md` | Writing, editing, communication |
| `prompts.md` | Prompt engineering and AI workflows |
| `data.md` | Data analysis, statistics, research |

## How to use

Reference a domain file alongside a stack when domain context improves output quality.
Do not embed domain-specific wording inside blocks — blocks must remain domain-neutral.
