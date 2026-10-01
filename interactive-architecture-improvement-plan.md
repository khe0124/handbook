# Interactive Architecture content audit and improvement plan

## Scope and diagnosis

- Target: `public/handbook/interactive-architecture-handbook.html` and its generated app module.
- Before revision: seven sections; the two substantive sections were generic learning-layer tables.
- State machines and the common pipeline were named but not taught through ownership, data contracts, update frequency, cancellation, resource lifecycle, or real failure sequences.
- The document did not show how application state differs from transient frame values or how DOM, Canvas and WebGL renderers preserve one semantic result.

## Quality bar

Each boundary must define its input, output, unit, owner, update frequency, cancellation behavior and failure mode. The architecture must survive rapid input, stale asynchronous results, resize, route changes, renderer failure, accessibility inputs and cleanup.

## Implemented structure

1. Define a common raw-input-to-perception pipeline.
2. Separate browser events from domain intents and discrete state from continuous signals.
3. Explain transitions, guards, invariants, effects, cancellation and stale-result protection.
4. Define renderer, scheduling, ownership and lifecycle contracts.
5. Include semantic output, alternative input and progressive fallback in the architecture.
6. Build one gallery case from a no-animation semantic model through drag, spring, routing, assets and renderer failure.
7. Add pressure fixtures, evidence requirements and deterministic regression tests.
