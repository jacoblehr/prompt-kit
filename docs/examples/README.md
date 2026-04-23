# Example Walkthroughs

This directory contains real-world walkthroughs showing how to compose blocks into effective stacks for common tasks.

## Available Examples

### [Debug a Failing System](debug-failing-system.md)

**Stack**: `mode.critique + frame.codepath-walkthrough + lens.invariant-check → guardrail.change-impact-review + frame.test-case-design → mode.reflect + frame.extract-insights + schema.plan-next-actions`

**When to use**: Production incidents, bugs, unexpected behavior, system failures

**Key insight**: Turn reactive firefighting into systematic investigation by combining critique with structured code path analysis.

### [Write a Product Specification](product-spec.md)

**Stack**: `mode.explore → frame.task → frame.success-criteria → guardrail.uncertainty → lens.user-mental-model → mode.decide → frame.compare-options → guardrail.assumption-audit → schema.decision-memo → rubric.decision-quality → mode.reflect → frame.extract-insights`

**When to use**: New features, roadmap decisions, requirements gathering, stakeholder alignment

**Key insight**: Balance exploration (understanding the problem) with structured decision-making to produce defensible specifications.

## How to Use These Examples

1. **Read the full walkthrough** to understand the reasoning behind each block
2. **Copy the stack** for your similar task
3. **Replace the content** with your specific problem/domain
4. **Iterate**: Run → observe → refine your composition

## Adding Your Own Examples

Create a new `.md` file in `docs/examples/` following the same structure:

- Problem statement
- Stack composition
- Step-by-step walkthrough
- Result and key takeaways
- When to use this pattern

Contributions welcome!
