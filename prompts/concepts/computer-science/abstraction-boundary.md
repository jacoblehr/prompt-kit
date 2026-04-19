# Computer Science: Abstraction Boundary

Apply when a design decision involves where to draw the lines between components, layers, or services — and what each side is allowed to know about the other.

```text
Analyse the abstraction boundaries in this design.

For each major boundary:
- what does each side expose to the other?
- what is each side allowed to assume about the other's implementation?
- is the boundary leaky? (does one side need to know things it shouldn't?)
- what would change on one side if the other were replaced with a different implementation?

Identify:
- the boundary that is most likely to become the wrong boundary as the system grows
- any circular dependencies or bidirectional knowledge that should be resolved
- the one abstraction that is doing too much and should be split

Design:
{paste architecture description, diagram summary, or relevant code}
```

Domain tags:
- software engineering
- systems thinking
- design
