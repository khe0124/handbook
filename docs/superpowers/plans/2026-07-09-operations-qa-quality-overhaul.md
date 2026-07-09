# Operations Q&A Quality Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace synthesized operations Q&A content with explicit, topic-specific Q&A packets across all operations Q&A pages.

**Architecture:** Keep `scripts/generate-operations-qa-handbooks.mjs` as the renderer and source of truth, but convert page data from `checks` plus `makeQuestion()` synthesis to explicit `questions` arrays. Add source-level tests to prevent fallback helpers from returning.

**Tech Stack:** Node ESM generator, static handbook HTML, catalog extraction, Node test runner, Vite build.

---

### Task 1: Add Source-Level Regression Test

**Files:**
- Modify: `scripts/handbook-html.test.mjs`

- [ ] Fail if `scripts/generate-operations-qa-handbooks.mjs` contains `function makeQuestion`, `checks:`, or `pageSpecs.map(buildPage)`.
- [ ] Keep existing generated HTML checks for 14 pages, section counts, duplicate answers, and banned filler phrases.

### Task 2: Convert Generator Data

**Files:**
- Modify: `scripts/generate-operations-qa-handbooks.mjs`

- [ ] Replace each page's `checks` array with explicit `questions`.
- [ ] Ensure each question has `q`, `decision`, `failure`, `evidence`, and exactly three `{ q, answer }` follow-ups.
- [ ] Remove `makeQuestion`, `buildPage`, and any synthetic answer path.

### Task 3: Regenerate Artifacts

**Files:**
- Generated: `public/handbook/operations-*-qa-handbook.html`
- Generated: `src/handbook/documents/operations-*-qa.ts`
- Generated: `src/handbook/searchIndex.mjs`

- [ ] Run `node scripts/generate-operations-qa-handbooks.mjs`.
- [ ] Run `npm run generate:handbook`.

### Task 4: Verify

- [ ] Run targeted scan for 14 files and 168 sections.
- [ ] Run `npm test`.
- [ ] Run `npm run build`.
