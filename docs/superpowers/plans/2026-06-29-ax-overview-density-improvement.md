# AX Overview Density Improvement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the AX overview less verbose and more useful by replacing repeated framing with concrete judgment criteria, an execution model, and reusable templates.

**Architecture:** `public/handbook/ax-handbook.html` is the source document. `scripts/generate-engineering-bundles.mjs` rebuilds AX bundle HTML from public handbook sources, and `npm run generate:handbook` rebuilds `src/handbook/documents/*.ts` modules from the public HTML.

**Tech Stack:** Static HTML handbook, Node.js generation scripts, Node test runner, Vite build.

---

### Task 1: Tighten AX Overview Source

**Files:**
- Modify: `public/handbook/ax-handbook.html`

- [ ] **Step 1: Replace the navigation labels**

Use this structure:

```html
<div class="nav-title">AX 개요</div>
  <a href="#ch1"><span class="code">AX-01</span>한 문장 정의</a>
  <a href="#ch2"><span class="code">AX-02</span>실행 모델</a>
  <a href="#ch3"><span class="code">AX-03</span>적용 판단 기준</a>
  <a href="#ch4"><span class="code">AX-04</span>최소 산출물</a>
  <a href="#ch5"><span class="code">AX-05</span>책임 경계</a>
  <a href="#ch6"><span class="code">AX-06</span>첫 도입 순서</a>
```

- [ ] **Step 2: Rewrite the body sections**

Replace repeated "AX is not prompt writing" framing with:

```text
AX는 AI를 잘 쓰는 기술이 아니라, 업무를 AI가 수행해도 사람이 검증하고 책임질 수 있는 구조로 바꾸는 방식이다.
```

Include these concrete pieces:

```text
Spec → Context → Permission → Execution → Verification → Audit
```

```text
AX 적용 후보: repeated, stable input/output, verifiable result, low/reversible failure cost, collectable context.
AX 적용 보류: unclear judgment, high customer/operation/security impact, no verification path, broad permission, mostly exceptions.
```

```text
TASK SPEC MINI
CONTEXT PACKAGE MINI
VERIFICATION REPORT MINI
```

- [ ] **Step 3: Preserve semantic coverage required by tests**

Keep these phrases in the AX source or surrounding AX documents:

```text
Model·Harness·Environment
Workflow Mining
조직 진단
표준 산출물
task spec
context package
harness policy
```

### Task 2: Regenerate Derived Handbook Artifacts

**Files:**
- Modify: `public/handbook/practice-ax-foundation-handbook.html`
- Modify: `src/handbook/documents/ax.ts`
- Modify: `src/handbook/documents/practice-ax-foundation.ts`
- Modify: `src/handbook/documentLoaders.ts` if the generator rewrites it

- [ ] **Step 1: Rebuild integrated handbook bundles**

Run:

```bash
node scripts/generate-engineering-bundles.mjs
```

Expected: command exits successfully and rewrites AX bundle HTML.

- [ ] **Step 2: Rebuild React handbook document modules**

Run:

```bash
npm run generate:handbook
```

Expected: command exits successfully and regenerates `src/handbook/documents`.

### Task 3: Verify

**Files:**
- Test: `scripts/handbook-html.test.mjs`

- [ ] **Step 1: Run handbook tests**

Run:

```bash
npm test
```

Expected: all handbook HTML tests pass.

- [ ] **Step 2: Run production build**

Run:

```bash
npm run build
```

Expected: Vite build completes successfully.
