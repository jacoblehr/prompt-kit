---

## applyTo: \['\*'\] description: "Context engineering best practices for Copilot agents, including context mapping, multi-file reasoning, and context-aware prompt design."

# Context Engineering for Copilot Agents

## Your Mission

As GitHub Copilot, you must understand and apply the principles of context engineering. Your goal is to help developers and agents reason across multiple files, map relevant context, and design prompts that leverage the right information for the task. This guide covers context mapping, multi-file reasoning, context-aware prompt design, and practical checklists for context engineering.

## Introduction

Context engineering is the discipline of identifying, structuring, and delivering the right information to AI systems and agents. For Copilot, this means:

- Mapping relevant files, symbols, and documentation for a given task
- Designing prompts that include the right context (not too much, not too little)
- Supporting multi-file and multi-modal reasoning
- Enabling agents to work effectively in large, complex codebases

**Why it matters:**

- Better context = better answers
- Reduces hallucination and irrelevant output
- Enables more advanced workflows (refactoring, multi-file edits, code review)
- Improves developer trust and productivity

## Table of Contents

1. [What is Context Engineering?](#what-is-context-engineering)
2. [Context Mapping](#context-mapping)
3. [Multi-file Reasoning](#multi-file-reasoning)
4. [Context-aware Prompt Design](#context-aware-prompt-design)
5. [Testing & Validation](#testing--validation)
6. [Templates & Checklists](#templates--checklists)
7. [References](#references)

## What is Context Engineering?

Context engineering is the process of:

- Identifying what information is relevant to a task
- Structuring and prioritizing that information
- Delivering it to the AI/agent in a usable form

**Key Concepts:**

- **Context Map:** A structured representation of relevant files, symbols, and documentation
- **Context Window:** The amount of information the AI can process at once
- **Context Selection:** Choosing what to include/exclude for a given prompt
- **Context Compression:** Summarizing or abstracting information to fit within limits

## Context Mapping

### Principles

- Start with the user's intent and task description
- Identify all files, symbols, and docs that might be relevant
- Prioritize by proximity, recency, and importance
- Exclude irrelevant or redundant information
- Structure context for easy consumption (lists, tables, summaries)

### Example Context Map

```
Task: Refactor the authentication logic
Relevant files:
- src/auth.js
- src/user.js
- src/session.js
Relevant symbols:
- authenticateUser
- createSession
- validateToken
Relevant docs:
- docs/SECURITY.md
- README.md (Authentication section)
```

### Automated Context Mapping

- Use static analysis to find references, dependencies, and call graphs
- Leverage code search and semantic search tools
- Incorporate user navigation history and recent edits
- Use heuristics to rank relevance

## Multi-file Reasoning

### Challenges

- Code is often split across many files and modules
- Dependencies and relationships can be complex
- Context window limits require careful selection

### Strategies

- Summarize related files and modules
- Use dependency graphs to trace relationships
- Chunk large files into relevant sections
- Use hierarchical context (project &gt; module &gt; function)

### Example - Multi-file Edit

```
Task: Rename a function used in 5 files
Context:
- List all files where the function appears
- Show usage examples in each file
- Summarize impact of the change
```

## Context-aware Prompt Design

### Best Practices

- Be explicit about what context is included
- Use structured formats (lists, tables, code blocks)
- Limit context to what's necessary for the task
- Provide summaries for large or complex files
- Reference symbols and docs by name

### Anti-patterns

- Dumping entire files or projects into the prompt
- Including irrelevant or outdated information
- Mixing unrelated tasks in one prompt

### Example - Good Prompt

```
Refactor the `loginUser` function for better error handling. Relevant files: src/auth.js, src/user.js. See docs/SECURITY.md for security requirements.
```

### Example - Bad Prompt

```
Here is the entire codebase. Please refactor the login logic somewhere in there.
```

## Testing & Validation

### Automated Context Evaluation

- Test context selection algorithms with real tasks
- Measure relevance and completeness of context maps
- Track accuracy and efficiency of multi-file reasoning

### Human-in-the-loop Review

- Have developers review context maps for coverage
- Collect feedback on context relevance and usability
- Iterate on heuristics and selection criteria

### Metrics

- **Coverage:** % of relevant files/symbols included
- **Precision:** % of included context that is actually relevant
- **Efficiency:** Time to generate and use context maps
- **User Satisfaction:** Developer feedback and ratings

## Templates & Checklists

### Context Mapping Checklist

- \[ \] Is the user's intent clear?
- \[ \] Are all relevant files and symbols identified?
- \[ \] Is the context prioritized and structured?
- \[ \] Is irrelevant information excluded?
- \[ \] Are summaries provided for large files?

### Multi-file Reasoning Checklist

- \[ \] Are dependencies and relationships mapped?
- \[ \] Are usage examples included?
- \[ \] Is the impact of changes summarized?
- \[ \] Are context window limits respected?

### Prompt Design Checklist

- \[ \] Is the included context explicit?
- \[ \] Is the format structured and clear?
- \[ \] Is the context limited to what's necessary?
- \[ \] Are references to symbols/docs clear?

## References

### Official Guidelines and Resources

- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
- [OpenAI Prompt Engineering Guide](https://platform.openai.com/docs/guides/prompt-engineering)
- [Microsoft Responsible AI Resources](https://www.microsoft.com/ai/responsible-ai-resources)

### Community Resources

- [Awesome Prompt Engineering](https://github.com/promptslab/Awesome-Prompt-Engineering)
- [Prompt Engineering Guide](https://github.com/dair-ai/Prompt-Engineering-Guide)
- [AI Safety Resources](https://github.com/centerforaisafety/ai-safety-resources)
