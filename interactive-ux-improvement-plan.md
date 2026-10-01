# Interactive UX content audit and improvement plan

## Scope and diagnosis

- Target: `src/handbook/documents/interactive-ux.ts` (one document).
- Before revision: six sections total; only two sections contained learning content, both expressed as generic 12-row outline tables.
- Severe gaps: no usable explanation of affordance, signifier, feedforward, feedback, mapping, or constraints; no state model; no asynchronous, error-recovery, or inclusive-input model.
- Example gap: carousel and checkout appeared only as one-line assignments, without a user goal, failure sequence, design response, or verification evidence.

## Quality bar

Every major concept must answer: what it means, what the user perceives, how it changes a design decision, how it fails, and how the decision can be verified. Examples must include the user's question and the system response, not merely name a UI pattern.

## Planned structure

1. Establish the interaction loop and distinguish UX, interaction design, and animation.
2. Explain discoverability, state visibility, direct manipulation, recovery, asynchronous work, motion, and inclusive input.
3. Add end-to-end cases for search, cart editing, carousel use, payment, and optimistic comments.
4. Add evaluation criteria, failure fixtures, labs, a mastery gate, and a glossary.
5. Add a deterministic content test that protects section coverage, concepts, cases, and failure conditions.
