# Computer Science: Failure Mode Analysis

Apply when designing, reviewing, or debugging a distributed system, service, or integration to surface how it fails and how gracefully it does so.

```text
Analyse the failure modes of this system or integration.

For each major component or dependency:
- how does it fail? (crash, hang, slow response, partial response, data corruption)
- what is the blast radius when it fails? (what else breaks with it?)
- how does the system currently detect this failure?
- does the system degrade gracefully or fail hard?
- is there a recovery path, and is it automatic or manual?

Then assess:
- which failure mode would be hardest to detect before users notice?
- which failure mode has the largest blast radius?
- what single change would most improve resilience?

System or integration:
{paste architecture description, service diagram, or relevant code}
```

Domain tags:
- software engineering
- risk management
- systems thinking
