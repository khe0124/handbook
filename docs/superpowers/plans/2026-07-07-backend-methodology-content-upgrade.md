# Backend Methodology Content Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Strengthen the backend handbook with concrete methodology blocks, conceptual models, practice labs, and evidence templates.

**Architecture:** `public/handbook/backend-engineering-handbook.html` is the source document. `scripts/generate-engineering-bundles.mjs` regenerates the integrated backend core handbook, and `npm run generate:handbook` regenerates React document modules under `src/handbook/documents`.

**Tech Stack:** Static HTML handbook sources, Node.js generation scripts, Node test runner, Vite build.

---

### Task 1: Add Content Regression Markers

**Files:**
- Modify: `scripts/handbook-html.test.mjs`

- [ ] Add assertions for:
  - `BACKEND METHODOLOGY LOOP`
  - `REQUEST TO STATE CHANGE MODEL`
  - `API DESIGN METHOD`
  - `TRANSACTION DECISION METHOD`
  - `DATA MODELING METHOD`
  - `JPA SPRING METHOD`
  - `CONCURRENCY IDEMPOTENCY METHOD`
  - `CACHE ASYNC METHOD`
  - `OPERABILITY METHOD`
  - `BACKEND PRACTICE LAB`
  - `BACKEND EVIDENCE PACKET TEMPLATE`
- [ ] Run `npm test -- scripts/handbook-html.test.mjs` and confirm failure before content changes.

### Task 2: Add Methodology and Concept Blocks

**Files:**
- Modify: `public/handbook/backend-engineering-handbook.html`

- [ ] Add a methodology loop to the opening learning map.
- [ ] Add request/state-change concept model to request lifecycle.
- [ ] Add API, transaction, data modeling, JPA/Spring, concurrency, cache/async, and operability method blocks near the relevant chapters.
- [ ] Add a practice lab and evidence packet template to the learning output section.

### Task 3: Regenerate and Verify

**Files:**
- Generated: `public/handbook/engineering-backend-core-handbook.html`
- Generated: `src/handbook/documents/engineering-backend-core.ts`

- [ ] Run `node scripts/generate-engineering-bundles.mjs`.
- [ ] Run `npm run generate:handbook`.
- [ ] Run `npm test -- scripts/handbook-html.test.mjs`.
- [ ] Run `npm test`.
- [ ] Run `npm run build`.
