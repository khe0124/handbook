# Content Quality Overhaul Process

Date: 2026-07-09

This process records the workflow used for the backend Q&A quality overhaul: exhaustive scope discovery, subagent-assisted diagnosis, improvement planning, source-level rewrite, generated artifact refresh, and regression verification.

## 1. Resolve the Scope

Start by identifying every item that belongs to the user's requested scope. Do not rely on menu intuition or sampling.

For the backend Q&A overhaul, the resolved scope was:

1. `engineering-backend-core-qa`
2. `engineering-backend-auth-security-qa`
3. `engineering-backend-architecture-qa`
4. `engineering-data-qa`
5. `engineering-runtime-quality-qa`
6. `engineering-platform-tools-qa`
7. `engineering-java-spring-qa`

Expected count: 7 documents, 30 Q&A sections each, 210 sections total.

## 2. Diagnose Before Editing

Run a full audit before rewriting. The audit must answer:

- Which documents are affected?
- Which source generator or source data produces the weak content?
- Which repeated phrases or templated titles prove the issue?
- Which sections are acceptable, weak, or severe?
- Is the problem authored content, generated fallback content, or stale generated output?

When the scope is large, split the audit with subagents by document or independent item. Ask subagents for findings first, not edits, when the user requested a staged process.

## 3. Write a Report

The report should include:

- scope and counts,
- per-item quality verdict,
- repeated filler patterns,
- source-level root cause,
- affected generated artifacts,
- risk if only generated HTML is edited.

For this overhaul, the report was saved at:

- `docs/backend-qa-quality-audit-2026-07-09.md`

## 4. Write the Improvement Plan

Write the plan before content edits. The plan should define:

- quality bar,
- edit order,
- files to edit directly,
- generated outputs to refresh,
- tests or checks that prevent recurrence,
- final verification commands.

For this overhaul, the plan was saved at:

- `docs/superpowers/plans/2026-07-09-backend-qa-quality-overhaul.md`

## 5. Rewrite at the Source

Fix generated content at the generator or source data layer.

Rules:

- Do not patch only generated HTML if the generator will overwrite it.
- Convert generic follow-up strings into explicit `{ q, answer }` content where the renderer supports structured data.
- Replace catch-all fallback answers with specific answers tied to the exact question.
- Remove the fallback path or make it fail fast after migration.

Passing answer criteria:

- states the decision or conclusion,
- explains the mechanism or boundary,
- names a tradeoff or failure mode,
- gives concrete verification evidence,
- answers the follow-up question directly instead of restating a rubric.

## 6. Add Regression Protection

Add deterministic checks for:

- banned filler phrases,
- generic templated titles,
- duplicate follow-up answers within a Q&A section,
- wrong section counts,
- generated document modules drifting from public HTML.

For generator-backed content, a string fallback should throw rather than silently generate generic answer text.

## 7. Regenerate Artifacts

Run the domain generator first, then the app-level extraction/index generation.

For the backend Q&A overhaul:

```bash
node scripts/generate-backend-qa-handbooks.mjs
npm run generate:handbook
```

## 8. Verify

Use both targeted and full verification.

Targeted verification should prove:

- every scoped file exists,
- every scoped file has expected section count,
- banned phrases are absent,
- each Q&A has the expected number of follow-up answers,
- follow-up answers are not duplicated within the same section.

Full verification should include:

```bash
npm test
npm run build
```

## 9. Final Report

The final user report should be concise and include:

- what scope was audited,
- how many items/sections were checked,
- what documents/plans were created,
- what source and generated files changed,
- what regression checks were added,
- exact verification results,
- any out-of-scope quality issues noticed during the scan.
