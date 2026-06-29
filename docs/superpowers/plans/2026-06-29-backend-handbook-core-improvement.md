# Backend Handbook Core Improvement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve the backend development handbook so the backend section reads as a practical execution path instead of a loose collection of backend topics.

**Architecture:** `public/handbook/backend-engineering-handbook.html` is the source for the backend overview. `scripts/generate-engineering-bundles.mjs` builds `public/handbook/engineering-backend-core-handbook.html` from the backend, architecture, and auth documents. `npm run generate:handbook` converts public handbook HTML into React document modules under `src/handbook/documents`.

**Tech Stack:** Static HTML handbook, Node.js generation scripts, Node test runner, Vite build.

---

### Task 1: Add Backend Execution Path

**Files:**
- Modify: `public/handbook/backend-engineering-handbook.html`

- [ ] **Step 1: Add a new navigation item after BE-01**

```html
<a href="#ch1-5"><span class="code">BE-01B</span>백엔드 실행 모델</a>
```

- [ ] **Step 2: Add a section after BE-01**

The section must include:

```text
BACKEND REQUEST MODEL
client → controller → validation → authN/authZ
→ application service → transaction boundary
→ domain rule → repository / external client
→ commit / rollback → response → log / metric / trace
```

It must also include a backend review checklist covering transaction boundary, external calls, retries, DB constraints, API contract, tests, and observability.

### Task 2: Make API, Testing, and Operations More Reusable

**Files:**
- Modify: `public/handbook/backend-engineering-handbook.html`

- [ ] **Step 1: Add an API contract template to BE-14**

Include:

```text
API CONTRACT MINI
Endpoint / method
Request DTO validation
Response schema
Error contract
Idempotency rule
Pagination rule
AuthZ rule
Backward compatibility note
```

- [ ] **Step 2: Add a backend test plan template to BE-11**

Include:

```text
BACKEND TEST PLAN
Domain unit
Service unit
Repository integration
API slice
Contract test
E2E smoke
Regression
```

- [ ] **Step 3: Add an operations readiness checklist to BE-09**

Include:

```text
OPERATIONS READINESS CHECKLIST
structured log
metric
traceId
p95 / p99
readiness / liveness
alert owner
runbook
```

### Task 3: Improve the Integrated Backend Bundle Roadmap

**Files:**
- Modify: `scripts/generate-engineering-bundles.mjs`
- Generated: `public/handbook/engineering-backend-core-handbook.html`
- Generated: `src/handbook/documents/engineering-backend-core.ts`
- Generated: `src/handbook/documents/backend.ts` if present in the generated catalog

- [ ] **Step 1: Add backend-specific `indexDescription`**

For the `engineering-backend-core` bundle, set the intro to explain this order:

```text
요청 처리 경로 → API 계약 → 트랜잭션과 데이터 모델 → 동시성·멱등성 → 외부 의존성·비동기 → 성능 병목 → 테스트 → 관측가능성·운영 → 보안 기본값 → 아키텍처 경계
```

- [ ] **Step 2: Regenerate bundle and document modules**

Run:

```bash
node scripts/generate-engineering-bundles.mjs
npm run generate:handbook
```

Expected: backend bundle and React modules reflect the source changes.

### Task 4: Verify Semantic Coverage

**Files:**
- Modify: `scripts/handbook-html.test.mjs`

- [ ] **Step 1: Add assertions for new backend anchors**

Assert that the combined backend source contains:

```text
BACKEND REQUEST MODEL
BACKEND REVIEW CHECKLIST
API CONTRACT MINI
BACKEND TEST PLAN
OPERATIONS READINESS CHECKLIST
요청 처리 경로 → API 계약
```

- [ ] **Step 2: Run checks**

Run:

```bash
npm test
npm run build
```

Expected: all tests pass and production build completes.
