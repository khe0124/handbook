# LLM Handbook Group Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a new top-level LLM handbook group for AI Native developer knowledge, covering LLM fundamentals, prompting, RAG, evaluation, agents, security, operations, and portfolio projects.

**Architecture:** Follow the existing static handbook architecture: catalog items in `src/handbook/catalog.mjs`, public source HTML in `public/handbook`, generated React document modules in `src/handbook/documents`, and practical examples in `src/handbook/practicalExamples.ts`. The new LLM group is independent from Engineering and AX so the taxonomy separates LLM app implementation from AI workflow adoption.

**Tech Stack:** Static HTML handbooks, React document loader, Node test runner, Vite build.

---

### Task 1: Catalog And Regression Tests

**Files:**
- Modify: `scripts/handbook-html.test.mjs`
- Modify: `src/handbook/catalog.mjs`

- [ ] **Step 1: Write the failing test**

Add assertions that:
- `HANDBOOK_GROUPS.map((group) => group.key)` includes `llm` between `engineering` and `operations`.
- `HANDBOOK_ITEMS.length` increases from 39 to 48.
- The LLM group has 9 items.
- Labels include `00 LLM 로드맵·AI Native 개발자 모델` through `08 포트폴리오 프로젝트`.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL because the `llm` group and document files do not exist yet.

- [ ] **Step 3: Add catalog constants**

Create `LLM_HANDBOOKS` with 9 items and insert `{ key: "llm", label: "LLM", items: LLM_HANDBOOKS }` after Engineering.

- [ ] **Step 4: Run test to verify catalog failures narrow**

Run: `npm test`
Expected: FAIL only for missing public HTML and generated document modules.

### Task 2: LLM Source Documents

**Files:**
- Create: `public/handbook/llm-roadmap-handbook.html`
- Create: `public/handbook/llm-fundamentals-handbook.html`
- Create: `public/handbook/llm-prompting-handbook.html`
- Create: `public/handbook/llm-rag-handbook.html`
- Create: `public/handbook/llm-evaluation-handbook.html`
- Create: `public/handbook/llm-agents-tool-use-handbook.html`
- Create: `public/handbook/llm-security-governance-handbook.html`
- Create: `public/handbook/llm-app-architecture-operations-handbook.html`
- Create: `public/handbook/llm-portfolio-projects-handbook.html`

- [ ] **Step 1: Write source HTML**

Each document must include a `<nav aria-label="목차">` and `<main>`, a hero, sections with stable ids, tables, serial cards, and at least one concrete checklist where useful.

- [ ] **Step 2: Include required content markers**

Markers to include across the documents:
- `AI NATIVE DEVELOPER MAP`
- `TOKEN CONTEXT ATTENTION`
- `STRUCTURED OUTPUT CONTRACT`
- `TOOL USE BOUNDARY`
- `TOKEN COST LATENCY ECONOMICS`
- `RAG PIPELINE`
- `CHUNKING STRATEGY`
- `PGVECTOR CHROMA DECISION`
- `RERANKING`
- `GOLDEN DATASET`
- `LLM-AS-JUDGE`
- `HALLUCINATION`
- `PROMPT REGRESSION`
- `AGENT WORKFLOW BOUNDARY`
- `PROMPT INJECTION`
- `LLM OBSERVABILITY`
- `QUALITY REPORT`

### Task 3: Practical Examples And Generated Modules

**Files:**
- Modify: `src/handbook/practicalExamples.ts`
- Generate: `src/handbook/documents/*.ts`
- Generate: `src/handbook/documentLoaders.ts`

- [ ] **Step 1: Add practical examples**

Add one practical example for each LLM item, mapped to a new `llm` lens or an existing practical lens if that is simpler.

- [ ] **Step 2: Regenerate document modules**

Run: `npm run generate:handbook`
Expected: nine new `src/handbook/documents/llm-*.ts` modules.

### Task 4: Verification

**Files:**
- All changed files

- [ ] **Step 1: Run tests**

Run: `npm test`
Expected: all tests pass.

- [ ] **Step 2: Run production build**

Run: `npm run build`
Expected: Vite build exits 0 and includes LLM chunks.

- [ ] **Step 3: Review diff**

Run: `git status --short` and `git diff --stat`
Expected: only planned catalog, tests, public LLM HTML, generated documents, and practical example changes, plus pre-existing unrelated working tree changes.
