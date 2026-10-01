# Performance & Accessibility content audit and improvement plan

## Scope and diagnosis

- Target: `public/handbook/interactive-performance-accessibility-handbook.html` and its generated app module.
- Before revision: seven sections, with the substantive material compressed into two generic “learning layer” tables.
- Performance terms were listed without teaching the event-to-presentation path, renderer stages, bottleneck classification, resource lifetime, or reproducible diagnosis.
- Accessibility was mostly reduced-motion vocabulary and did not explain semantics, accessible names and states, keyboard patterns, focus management, perception, cognition, or task-based testing.
- The page claimed a shared release gate but did not provide one.

## Quality bar

Every topic must connect a user symptom to a browser or assistive-technology mechanism, a concrete failure, an intervention, and verifiable evidence. Performance and accessibility must meet in the same user task rather than remain parallel checklists.

## Implemented structure

1. Follow input through event dispatch, state, rendering, presentation and perception.
2. Explain frame production, responsiveness, bottleneck diagnosis, GPU, memory and adaptive quality.
3. Explain semantic HTML, the accessibility tree, keyboard and focus contracts.
4. Separate motion safety, flashing, attention, timing, zoom and cognitive concerns.
5. Apply both disciplines to scroll narratives, dashboards, WebGL heroes and animated modals.
6. Combine traces, automated checks, assistive-technology tasks and user evidence.
7. Add one shared release gate and deterministic regression tests.
