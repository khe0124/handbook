# Backend Core Quality Review Hardening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the remaining quality-review gaps in the backend core handbook so the roadmap reads as a coherent, concrete backend learning path rather than a patched compilation.

**Architecture:** The source of truth is `public/handbook/backend-engineering-handbook.html`. Generated bundle artifacts must be produced through `scripts/generate-engineering-bundles.mjs` and `npm run generate:handbook`, not hand-edited.

**Tech Stack:** Static HTML handbooks, Node test runner, Vite build, generated TypeScript handbook documents.

---

### Task 1: Lock Quality Review Findings With Tests

**Files:**
- Modify: `scripts/handbook-html.test.mjs`
- Source under test: `public/handbook/backend-engineering-handbook.html`

- [ ] **Step 1: Add assertions to the backend practical guidance test**

Add checks that the source handbook contains the final hardening markers:

```js
assert.match(source, /LANGUAGE FRAMEWORK CHOICE GUIDE/);
assert.match(source, /IAC KUBERNETES LEARNING BOUNDARY/);
assert.match(source, /PROJECT EXAMPLE MAPPING/);
assert.match(source, /BACKEND ROADMAP 2026[\s\S]*HTTP·DNS·TLS[\s\S]*언어·프레임워크[\s\S]*DB 스키마/);
```

- [ ] **Step 2: Add negative assertions for stale content**

Add checks that known review defects do not return:

```js
assert.doesNotMatch(source, /BE-10의 IDOR/);
assert.doesNotMatch(source, /DB\(BE-03·04\)/);
assert.doesNotMatch(source, /동시성\(BE-05\)/);
assert.doesNotMatch(source, /"이 요청에 정확히 무슨 일이<\/td>/);
```

- [ ] **Step 3: Run test and verify it fails before content changes**

Run:

```bash
npm test
```

Expected: FAIL because the new hardening markers are not yet in the source handbook.

### Task 2: Patch Backend Roadmap and Stale References

**Files:**
- Modify: `public/handbook/backend-engineering-handbook.html`

- [ ] **Step 1: Replace the duplicated roadmap card**

Replace the `BACKEND ROADMAP 2026` sequence with a single coherent sequence:

```html
HTTP·DNS·TLS·Cookie·CORS·Linux·Git<br>
→ 언어·프레임워크 선택 → 요청 생명주기 → API 계약<br>
→ Java·Spring 실행 모델 → DB 스키마·트랜잭션·마이그레이션<br>
→ ORM·JPA → 동시성·멱등성 → 인증·인가·보안<br>
→ 캐시·비동기 → 테스트·부하 검증 → 배포·클라우드·운영<br>
→ 관측가능성·장애 대응 → 아키텍처 경계 → 포트폴리오·24주 커리큘럼
```

- [ ] **Step 2: Fix stale chapter references**

Update the front-end transition paragraph so it references DB as `BE-04`, JPA as `BE-05`, and concurrency as `BE-06`.

Update the API chapter IDOR reference from `BE-10` to `BE-07`.

- [ ] **Step 3: Fix the broken observability table sentence**

Change the Logs row to:

```html
<tr><td><b>로그 Logs</b></td><td>"이 요청에 정확히 무슨 일이 있었나"</td><td>구조화 로그(JSON) + 상관관계 ID</td></tr>
```

### Task 3: Add Missing Roadmap Bridge Content

**Files:**
- Modify: `public/handbook/backend-engineering-handbook.html`

- [ ] **Step 1: Add language/framework choice guide after foundation checklist**

Insert a table headed `LANGUAGE FRAMEWORK CHOICE GUIDE` that compares Java/Spring, Node/NestJS, Python/FastAPI, and Go by good fit, cost, and recommendation. Make clear that this handbook proceeds with Java/Spring because it is strong for enterprise backends, transactions, type safety, and hiring evidence.

- [ ] **Step 2: Add IaC/Kubernetes learning boundary in deployment chapter**

Insert a table headed `IAC KUBERNETES LEARNING BOUNDARY` after `CLOUD DEPLOYMENT MINIMUM`. It must distinguish:
- 신입 필수: Docker, env/secret, health check, managed DB, log/metric
- 초중급 확장: Terraform basics, immutable infra, staging/prod drift
- 실무 심화: Kubernetes deployment/service/ingress, HPA, config/secret, rollout/rollback
- 주의: Kubernetes first is overkill before a deployable service and operations loop exist

- [ ] **Step 3: Add concrete project mapping before the existing project sequence**

Insert a table headed `PROJECT EXAMPLE MAPPING` that maps:
- 회원/로그인 API
- 게시판/댓글/검색 API
- 파일 업로드와 썸네일
- 주문/결제/재고 예약
- 비동기 알림과 DLQ
- 관측성·자동 배포

Each row must list the core backend concepts and portfolio evidence.

### Task 4: Update Bundle Summary and Regenerate

**Files:**
- Modify: `scripts/generate-engineering-bundles.mjs`
- Generate: `public/handbook/engineering-backend-core-handbook.html`
- Generate: `src/handbook/documents/engineering-backend-core.ts`

- [ ] **Step 1: Update backend core study outputs**

Add these outputs to `BACKEND STUDY OUTPUTS`:

```html
language/framework choice · IaC/Kubernetes boundary · project example mapping
```

- [ ] **Step 2: Regenerate derived files**

Run:

```bash
node scripts/generate-engineering-bundles.mjs
npm run generate:handbook
```

Expected: generated backend core HTML and TS document include the new markers.

### Task 5: Verify

**Files:**
- All modified files

- [ ] **Step 1: Run tests**

Run:

```bash
npm test
```

Expected: all tests pass.

- [ ] **Step 2: Run production build**

Run:

```bash
npm run build
```

Expected: Vite build exits 0.

- [ ] **Step 3: Check status**

Run:

```bash
git status --short
```

Expected: only planned source, generated output, tests, and plan files are changed.
