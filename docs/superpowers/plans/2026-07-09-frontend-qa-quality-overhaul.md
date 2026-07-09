# Frontend Q&A Quality Overhaul Plan

Date: 2026-07-09

## Goal

Improve all frontend menu Q&A handbooks so follow-up answers stop reading like generated filler and instead answer the actual frontend topic with concrete criteria, failure modes, and verification evidence.

Scope: 7 frontend Q&A handbooks, 210 Q&A sections.

## Quality Bar

A frontend Q&A answer passes only if it:

- answers the exact follow-up question,
- names the browser/runtime/UI boundary involved,
- explains the failure mode without generic filler,
- includes concrete verification evidence such as trace, screenshot, fixture, audit, RUM, profiler, or debug log,
- avoids repeated boilerplate phrases across unrelated questions.

## Implementation Steps

1. Add regression coverage in `scripts/handbook-html.test.mjs`.
   - Detect frontend Q&A pages by `kind === "프론트엔드 Q&A"`.
   - Ban known filler phrases from the audit.
   - Ban broad generated title shapes where they appear in Q&A headings.
   - Assert every Q&A section has three follow-up answers and no duplicate follow-up answer inside the same section.

2. Improve `scripts/generate-frontend-qa-handbooks.mjs`.
   - Replace generic fallback wrappers with domain-specific follow-up responses.
   - Keep answers concise and specific.
   - Remove phrases such as `묻는 압박 지점`, `먼저 재현 조건`, `실제로 어떤 조건에서 깨지는지`, and `답변의 근거를 닫아야`.
   - Update weak generated titles in source data.

3. Regenerate public handbooks.
   - Run `node scripts/generate-frontend-qa-handbooks.mjs`.

4. Regenerate app-facing documents.
   - Run `npm run generate:handbook`.

5. Verify.
   - Run targeted frontend Q&A scan.
   - Run `npm test`.
   - Run `npm run build`.

## Files

Direct edits:

- `scripts/generate-frontend-qa-handbooks.mjs`
- `scripts/handbook-html.test.mjs`
- `docs/frontend-qa-quality-audit-2026-07-09.md`
- `docs/superpowers/plans/2026-07-09-frontend-qa-quality-overhaul.md`

Generated outputs:

- `public/handbook/engineering-frontend-*-qa-handbook.html`
- `src/handbook/documents/engineering-frontend-*-qa.ts`
- `src/handbook/searchIndex.mjs`
