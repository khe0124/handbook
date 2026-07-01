# Home Big Picture Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the home handbook show the whole developer capability model before the detailed roadmap.

**Architecture:** Keep `public/handbook/home-handbook.html` as the source of truth, regenerate `src/handbook/documents/home.ts`, and validate with the existing Node handbook tests.

**Tech Stack:** Static handbook HTML, generated TypeScript document modules, Node test runner.

---

### Task 1: Add Home Big Picture Guard

**Files:**
- Modify: `scripts/handbook-html.test.mjs`

- [ ] **Step 1: Add assertions**

Assert the home source includes:
- `AI Native 개발자 역량 지도`
- `기능 하나를 끝까지 책임지는 작동 모델`
- `요구사항`
- `커리어 증거`

- [ ] **Step 2: Run focused tests**

Run: `npm test -- scripts/handbook-html.test.mjs`

Expected: fail until the home content is updated.

### Task 2: Update Home Source

**Files:**
- Modify: `public/handbook/home-handbook.html`

- [ ] **Step 1: Add the big-picture section**

Insert a first section that explains the full capability map:
foundation, product engineering, operating responsibility, AI Native execution, experience design, work automation, career evidence.

- [ ] **Step 2: Add the end-to-end feature model**

Show one feature flowing through requirements, user flow, UI, API, data/auth, delivery, observability, AI assistance, and career evidence.

### Task 3: Regenerate And Verify

**Files:**
- Generate: `src/handbook/documents/home.ts`

- [ ] **Step 1: Regenerate**

Run: `npm run generate:handbook`

- [ ] **Step 2: Verify**

Run: `npm test`

- [ ] **Step 3: Build**

Run: `npm run build`
