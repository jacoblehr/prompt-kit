# Performance Analysis

Use when a system is slow, resource-hungry, or failing under load, and you need to reason systematically about the cause before optimising.

```text
Analyse the performance problem in the following system.

System description: {system_description}

Observed symptoms (latency, throughput, resource usage): {symptoms}

Available data (profiler output, metrics, traces, logs): {data}

Work through:
1. Bottleneck identification — which component, layer, or operation is the constraint?
2. Hotspot analysis — from the available data, where is time or resource being spent?
3. Contributing causes — structural reasons the bottleneck exists (N+1, missing index, lock contention, etc.)
4. Measurement quality — are the symptoms being measured accurately, or could instrumentation be misleading?
5. Optimisation options — at least three levers, ranked by expected impact and implementation cost
6. Risk of optimisation — what could break or regress if each option is applied?

Do not recommend an optimisation until the bottleneck is confirmed. If data is insufficient, name what measurements are needed first.
```

Domain tags:
- software engineering
- performance
- systems
- debugging
