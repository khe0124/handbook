# Operations Q&A Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Q&A handbook pages for every `인프라·운영` menu item.

**Architecture:** Add a dedicated operations Q&A generator that renders static HTML from structured authored Q&A data. Register generated pages in `OPERATIONS_HANDBOOKS` beside the source operations handbooks, then regenerate app document modules and search index. Tests enforce full menu coverage, section counts, unique follow-up answers, and absence of fallback answer helpers.

**Tech Stack:** Node ESM generator scripts, static handbook HTML, catalog-driven document extraction, Node test runner, Vite build.

---

### Task 1: Add Operations Q&A Quality Test

**Files:**
- Modify: `scripts/handbook-html.test.mjs`

- [ ] **Step 1: Add a failing test for operations Q&A coverage**

Add a test that filters `HANDBOOK_ITEMS` by `kind === "인프라·운영 Q&A"` and expects 14 entries. For each page, read `public/handbook/<file>`, parse `qa-*` sections, require at least 12 sections, require exactly three follow-up answers per section, and fail on duplicate follow-up answers.

- [ ] **Step 2: Run the test and verify it fails**

Run: `npm test`

Expected: FAIL because no operations Q&A entries exist yet.

### Task 2: Add Operations Q&A Generator

**Files:**
- Create: `scripts/generate-operations-qa-handbooks.mjs`

- [ ] **Step 1: Implement generator**

Create a generator with page data for all 14 operations menu items. Each page must use explicit `followups: [{ q, answer }, ...]` data and throw if a string follow-up appears.

- [ ] **Step 2: Generate HTML**

Run: `node scripts/generate-operations-qa-handbooks.mjs`

Expected: `generated 14 operations Q&A handbooks`.

### Task 3: Register Catalog Entries

**Files:**
- Modify: `src/handbook/catalog.mjs`

- [ ] **Step 1: Add Q&A entries beside operations entries**

For each `OPERATIONS_HANDBOOKS` item, add a paired item with id `<source-id>-qa`, label `<same number/title> Q&A`, kind `인프라·운영 Q&A`, and file `<source-id>-qa-handbook.html`.

### Task 4: Regenerate App Documents

**Files:**
- Generated: `src/handbook/documents/operations-*-qa.ts`
- Generated: `src/handbook/searchIndex.mjs`

- [ ] **Step 1: Regenerate extracted documents**

Run: `npm run generate:handbook`

Expected: generated document modules and search index include the new operations Q&A pages.

### Task 5: Verify

**Files:**
- Public/generated handbook output
- Test suite

- [ ] **Step 1: Run targeted operations Q&A scan**

Run a Node scan that checks all 14 operations Q&A pages for section count, three follow-up answers, duplicate answers, generic title molds, and fallback helper text.

- [ ] **Step 2: Run full tests**

Run: `npm test`

Expected: all tests pass.

- [ ] **Step 3: Run production build**

Run: `npm run build`

Expected: build succeeds.
