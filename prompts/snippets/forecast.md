# Forecast

Use when you need to make a structured probability-based forecast about an uncertain outcome.

```text
Produce a structured forecast for the following question.

Forecast question: {question}

Context and available evidence: {context}

Time horizon: {time_horizon}

Work through:
1. Base rate — what is the historical frequency of this type of outcome? Start here before considering specifics.
2. Inside view — given the specific details of this situation, what adjusts the base rate up or down?
3. Reference class — what is the best comparison class for this situation?
4. Disconfirming evidence — what is the strongest reason this forecast might be wrong?
5. Probability estimate — give a specific probability or probability range, not a vague qualifier
6. Key uncertainties — the two or three things that most affect whether this forecast holds
7. Update triggers — what new information should cause you to revise the forecast, and in which direction?

State the forecast as: "I estimate [X]% probability that [outcome] by [time horizon], because [main reason]. I would revise this upward if [trigger] and downward if [trigger]."
```

Domain tags:
- forecasting
- decision making
- uncertainty
- epistemics
