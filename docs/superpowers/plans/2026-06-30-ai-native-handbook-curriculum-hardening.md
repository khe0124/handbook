# AI Native Handbook Curriculum Hardening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rework the handbook table of contents so it can function as a rigorous curriculum for a fundamentally strong, competitive, AI Native developer.

**Architecture:** `public/handbook/*.html` remains the source of truth. New catalog items are added in `src/handbook/catalog.mjs`, practical lenses are wired in `src/handbook/practicalExamples.ts`, and generated TypeScript documents are refreshed with `npm run generate:handbook`.

**Tech Stack:** Static HTML handbook sources, Vite/React shell, Node test runner, generated TypeScript document modules.

---

### Task 1: Core Engineering Spine

**Files:**
- Create: `public/handbook/engineering-cs-foundations-handbook.html`
- Create: `public/handbook/engineering-computer-systems-handbook.html`
- Create: `public/handbook/engineering-language-runtime-handbook.html`
- Create: `public/handbook/engineering-applied-math-measurement-handbook.html`

- [ ] Add four non-interview curriculum documents covering CS foundations, computer systems, programming language/runtime, and applied measurement.
- [ ] Each document must include `<nav aria-label="목차">`, `<main>`, noindex meta, matching nav targets and section IDs.
- [ ] Each document must include practical evidence artifacts, failure modes, and verification criteria.

### Task 2: AI Native Work Standard

**Files:**
- Create: `public/handbook/llm-ai-native-work-standards-handbook.html`
- Modify: `public/handbook/llm-roadmap-handbook.html`
- Modify: `public/handbook/llm-portfolio-projects-handbook.html`
- Modify: `public/handbook/practice-ax-scale-governance-handbook.html`

- [ ] Add a dedicated AI Native Definition of Done document.
- [ ] Add a roadmap section that points from LLM work to the new work standard.
- [ ] Strengthen portfolio and AX capstone evidence around context packages, eval reports, security fixtures, cost/latency traces, and human review.
- [ ] Keep direct edits focused on source HTML; generated `src/handbook/documents/*.ts` will be refreshed later.

### Task 3: Catalog, Examples, README, Home, Tests

**Files:**
- Modify: `src/handbook/catalog.mjs`
- Modify: `src/handbook/practicalExamples.ts`
- Modify: `README.md`
- Modify: `public/handbook/home-handbook.html`
- Modify: `scripts/handbook-html.test.mjs`

- [ ] Prepend the four core engineering documents to `ENGINEERING_HANDBOOKS`.
- [ ] Insert the AI Native work standard after `llm-roadmap` in `LLM_HANDBOOKS`.
- [ ] Update item counts, expected labels, evidence markers, and home assertions in tests.
- [ ] Add practical example mappings for the new item IDs.
- [ ] Update README and home copy so the curriculum starts from fundamentals, then engineering, operations, AI Native, practice, and career evidence.

### Task 4: Generation and Verification

**Files:**
- Regenerate: `src/handbook/documents/*.ts`
- Regenerate: `src/handbook/documentLoaders.ts`

- [ ] Run `npm run generate:handbook`.
- [ ] Run `npm test`.
- [ ] Run `npm run build`.
- [ ] Fix any nav/section/catalog/test mismatch found by verification.
