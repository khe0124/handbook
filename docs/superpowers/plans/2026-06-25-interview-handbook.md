# Interview Handbook Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the `Interview` section into multiple Korean-labeled, detailed Q&A handbooks for senior fullstack technical interview preparation.

**Architecture:** Keep the existing static handbook architecture. Add eight catalog items under `Interview`, author source HTML files in `public/handbook`, regenerate `src/handbook/documents/*.ts` and `documentLoaders.ts`, then update tests and practical examples so the existing quality gates continue to cover every item.

**Tech Stack:** Vite, React, TypeScript, static HTML source files, Node test runner.

---

## File Structure

- Modify `src/handbook/catalog.mjs`: replace the single `interview` item with eight Korean-labeled Interview items.
- Modify `src/handbook/practicalExamples.ts`: add practical examples and lenses for all new Interview item ids.
- Modify `scripts/handbook-html.test.mjs`: update expected item count and add assertions for Korean Interview labels.
- Create/replace `public/handbook/interview-handbook.html`: overview document.
- Create `public/handbook/interview-frontend-handbook.html`: frontend Q&A.
- Create `public/handbook/interview-backend-db-handbook.html`: backend and database Q&A.
- Create `public/handbook/interview-infra-ops-handbook.html`: infrastructure and operations Q&A.
- Create `public/handbook/interview-distributed-handbook.html`: distributed systems Q&A.
- Create `public/handbook/interview-system-design-handbook.html`: system design Q&A.
- Create `public/handbook/interview-project-handbook.html`: project deep-dive Q&A.
- Create `public/handbook/interview-behavioral-handbook.html`: behavioral and pressure interview Q&A.
- Regenerate `src/handbook/documents/*.ts` and `src/handbook/documentLoaders.ts` with `npm run generate:handbook`.

### Task 1: Catalog And Tests

**Files:**
- Modify: `src/handbook/catalog.mjs`
- Modify: `scripts/handbook-html.test.mjs`

- [ ] **Step 1: Update `INTERVIEW_HANDBOOKS`**

Use these exact catalog entries:

```js
export const INTERVIEW_HANDBOOKS = [
  { id: "interview", label: "기술면접 개요", kind: "Interview", file: "interview-handbook.html" },
  { id: "interview-frontend", label: "프론트엔드 면접", kind: "Interview", file: "interview-frontend-handbook.html" },
  { id: "interview-backend-db", label: "백엔드·DB 면접", kind: "Interview", file: "interview-backend-db-handbook.html" },
  { id: "interview-infra-ops", label: "인프라·운영 면접", kind: "Interview", file: "interview-infra-ops-handbook.html" },
  { id: "interview-distributed", label: "분산 시스템 면접", kind: "Interview", file: "interview-distributed-handbook.html" },
  { id: "interview-system-design", label: "시스템 설계 면접", kind: "Interview", file: "interview-system-design-handbook.html" },
  { id: "interview-project", label: "프로젝트 심층 면접", kind: "Interview", file: "interview-project-handbook.html" },
  { id: "interview-behavioral", label: "컬처·압박 면접", kind: "Interview", file: "interview-behavioral-handbook.html" },
];
```

- [ ] **Step 2: Update catalog test expectations**

Update expected item count from `83` to `90`.

Add label assertions for:

```js
assert.ok(labels.includes("기술면접 개요"));
assert.ok(labels.includes("프론트엔드 면접"));
assert.ok(labels.includes("백엔드·DB 면접"));
assert.ok(labels.includes("인프라·운영 면접"));
assert.ok(labels.includes("분산 시스템 면접"));
assert.ok(labels.includes("시스템 설계 면접"));
assert.ok(labels.includes("프로젝트 심층 면접"));
assert.ok(labels.includes("컬처·압박 면접"));
```

### Task 2: Practical Examples

**Files:**
- Modify: `src/handbook/practicalExamples.ts`

- [ ] **Step 1: Add Interview item lenses**

Map all Interview item ids to the `interview` lens:

```ts
interview: "interview",
"interview-frontend": "interview",
"interview-backend-db": "interview",
"interview-infra-ops": "interview",
"interview-distributed": "interview",
"interview-system-design": "interview",
"interview-project": "interview",
"interview-behavioral": "interview",
```

- [ ] **Step 2: Add practical examples**

Add one `example(...)` entry for each new item id, using scenarios specific to that document.

### Task 3: Source HTML Documents

**Files:**
- Create/replace all `public/handbook/interview*.html` files listed above.

- [ ] **Step 1: Write overview HTML**

`interview-handbook.html` should explain answer levels, answer length, the shared Q&A template, and how to use the seven detailed sub-documents.

- [ ] **Step 2: Write technical Q&A HTML files**

Each technical file should include 8 to 16 high-value questions. Each question should include:

```html
<h3>Q. ...</h3>
<h4>핵심 개념</h4>
<p>...</p>
<h4>30초 답변</h4>
<div class="serial-card">...</div>
<h4>90초 답변</h4>
<p>...</p>
<h4>꼬리질문</h4>
<table>...</table>
<h4>오답/주의점</h4>
<div class="callout warn">...</div>
```

- [ ] **Step 3: Keep all menu labels Korean**

The visible labels in catalog and document titles must be Korean. English technical terms may remain inside the content where they are the standard term.

### Task 4: Regenerate And Verify

**Files:**
- Generated: `src/handbook/documents/*.ts`
- Generated: `src/handbook/documentLoaders.ts`

- [ ] **Step 1: Regenerate documents**

Run: `npm run generate:handbook`

Expected: command exits 0 and generated loader contains all eight Interview ids.

- [ ] **Step 2: Run tests**

Run: `npm test`

Expected: all Node tests pass.

- [ ] **Step 3: Run build**

Run: `npm run build`

Expected: Vite build exits 0 and output includes chunks for the new Interview documents.
