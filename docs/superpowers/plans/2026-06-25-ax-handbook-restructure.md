# AX Handbook Restructure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reorder and enrich the AX handbook so it reads as an AX specialist training curriculum and organizational adoption playbook.

**Architecture:** Keep the existing handbook architecture: catalog entries in `src/handbook/catalog.mjs`, lazy-loaded TS document modules in `src/handbook/documents/`, practical examples in `src/handbook/practicalExamples.ts`, and generated static HTML in `public/handbook/`. Update content in the TS source documents, then regenerate public handbook HTML through the existing generator.

**Tech Stack:** React 19, Vite, TypeScript document modules, Node test runner, existing handbook HTML generator.

---

## File Map

- Modify `src/handbook/catalog.mjs`: reorder only `AX_HANDBOOKS`.
- Modify `src/handbook/documents/ax.ts`: strengthen overview, learning map, system model, adoption principle.
- Modify `src/handbook/documents/ax-capability.ts`: add capability levels, training rubric, portfolio artifacts.
- Modify `src/handbook/documents/ax-organization.ts`: move conceptually earlier through catalog order; enrich adoption stages, stakeholder map, education path, rollout gates.
- Modify `src/handbook/documents/ax-automation.ts`: add workflow mining, autonomy ladder, task spec, classroom exercise.
- Modify `src/handbook/documents/ax-context.ts`: add source inventory, context quality rules, untrusted content handling, context package exercise.
- Modify `src/handbook/documents/ax-harness.ts`: add harness architecture, risk-based tool policy, harness worksheet, failure runbook.
- Modify `src/handbook/documents/ax-loop.ts`: add loop state transitions, stop conditions, loop log, workflow-improvement review.
- Modify `src/handbook/documents/ax-verification.ts`: add eval set, rubric, organizational metrics, training cohort evaluation.
- Modify `src/handbook/documents/ax-multi-agent.ts`: add use criteria, role separation, isolation, integration checklist, parallel exercise.
- Modify `src/handbook/documents/ax-governance.ts`: add data classification, prompt injection, permission classes, exception flow, pilot checklist.
- Modify `src/handbook/documents/ax-case-studies.ts`: normalize cases around problem, workflow, harness, context, permission, verification, metrics, failure mode, rollout lesson.
- Modify `src/handbook/documents/ax-playbook.ts`: add 2-week sprint, 4-week curriculum, role workshops, capstone, templates index.
- Modify `src/handbook/practicalExamples.ts`: align AX examples to new journey and artifacts.
- Modify `scripts/handbook-html.test.mjs`: update AX order and add assertions for education/adoption artifacts.
- Regenerate `public/handbook/ax*.html` using `npm run generate:handbook`.

## Task 1: Update AX Catalog Order and Regression Test

**Files:**
- Modify: `src/handbook/catalog.mjs`
- Modify: `scripts/handbook-html.test.mjs`

- [ ] **Step 1: Update the AX menu order**

In `src/handbook/catalog.mjs`, replace the `AX_HANDBOOKS` array with this exact order:

```js
export const AX_HANDBOOKS = [
  { id: "ax", label: "AX 개요", kind: "AX 핸드북", file: "ax-handbook.html" },
  { id: "ax-capability", label: "AX 엔지니어 역량 모델", kind: "AX 핸드북", file: "ax-engineer-capability-handbook.html" },
  { id: "ax-organization", label: "AX 조직 적용 패턴", kind: "AX 핸드북", file: "ax-organization-adoption-handbook.html" },
  { id: "ax-automation", label: "AX 업무 자동화 설계", kind: "AX 핸드북", file: "ax-work-automation-design-handbook.html" },
  { id: "ax-context", label: "Context Engineering", kind: "AX 핸드북", file: "ax-context-engineering-handbook.html" },
  { id: "ax-harness", label: "AI Harness Engineering", kind: "AX 핸드북", file: "ax-harness-engineering-handbook.html" },
  { id: "ax-loop", label: "Loop Engineering", kind: "AX 핸드북", file: "ax-loop-engineering-handbook.html" },
  { id: "ax-verification", label: "검증과 평가", kind: "AX 핸드북", file: "ax-verification-evaluation-handbook.html" },
  { id: "ax-multi-agent", label: "Multi-Agent Workflow", kind: "AX 핸드북", file: "ax-multi-agent-workflow-handbook.html" },
  { id: "ax-governance", label: "AI Governance & Security", kind: "AX 핸드북", file: "ax-governance-security-handbook.html" },
  { id: "ax-case-studies", label: "AX 실전 적용 사례", kind: "AX 핸드북", file: "ax-applied-case-studies-handbook.html" },
  { id: "ax-playbook", label: "AX 실무 플레이북", kind: "AX 핸드북", file: "ax-practical-playbook-handbook.html" },
];
```

- [ ] **Step 2: Update the expected AX label order**

In `scripts/handbook-html.test.mjs`, inside `test("ax handbook includes harness, loop, verification, and governance guidance", ...)`, replace the `assert.deepEqual(axLabels, [...])` expected labels with:

```js
  assert.deepEqual(axLabels, [
    "AX 개요",
    "AX 엔지니어 역량 모델",
    "AX 조직 적용 패턴",
    "AX 업무 자동화 설계",
    "Context Engineering",
    "AI Harness Engineering",
    "Loop Engineering",
    "검증과 평가",
    "Multi-Agent Workflow",
    "AI Governance & Security",
    "AX 실전 적용 사례",
    "AX 실무 플레이북",
  ]);
```

- [ ] **Step 3: Add adoption and training coverage assertions**

In the same test, after the existing `assert.match(source, /Trace-based Eval Harness/);`, add:

```js
  assert.match(source, /교육 과정/);
  assert.match(source, /파일럿/);
  assert.match(source, /조직 진단/);
  assert.match(source, /표준 산출물/);
  assert.match(source, /task spec/i);
  assert.match(source, /context package/i);
  assert.match(source, /harness policy/i);
  assert.match(source, /eval rubric/i);
  assert.match(source, /운영 지표/);
  assert.match(source, /거버넌스/);
  assert.match(source, /capstone/i);
```

- [ ] **Step 4: Run the targeted test and confirm the expected failure**

Run:

```bash
npm test
```

Expected: the AX test fails because the new content assertions are not all present yet. The order assertion should pass only if Step 1 and Step 2 are both complete.

- [ ] **Step 5: Commit the catalog/test expectation change**

Run:

```bash
git add src/handbook/catalog.mjs scripts/handbook-html.test.mjs
git commit -m "test: set ax handbook restructure expectations"
```

## Task 2: Enrich Foundation and Adoption Documents

**Files:**
- Modify: `src/handbook/documents/ax.ts`
- Modify: `src/handbook/documents/ax-capability.ts`
- Modify: `src/handbook/documents/ax-organization.ts`

- [ ] **Step 1: Update `ax.ts` navigation**

Set `navHtml` in `src/handbook/documents/ax.ts` to include these chapters:

```html
<div class="nav-title">AX 개요</div>
  <a href="#ch1"><span class="code">AX-01</span>AX의 정의</a>
  <a href="#ch2"><span class="code">AX-02</span>AX 시스템 모델</a>
  <a href="#ch3"><span class="code">AX-03</span>도입 학습 지도</a>
  <a href="#ch4"><span class="code">AX-04</span>전문가의 책임 경계</a>
  <a href="#ch5"><span class="code">AX-05</span>표준 산출물</a>
  <a href="#ch6"><span class="code">AX-06</span>도입 체크포인트</a>
```

- [ ] **Step 2: Enrich `ax.ts` body**

Keep the existing hero style, then ensure `mainHtml` contains these exact strings in natural Korean prose, tables, or serial cards:

```txt
AX는 프롬프트 작성 기술이 아니라 업무를 검증 가능한 실행 시스템으로 바꾸는 운영 역량입니다.
AX SYSTEM MODEL
task spec
context package
tool permission
verification report
audit trail
AX 도입 학습 지도
조직 진단
파일럿
표준 산출물
AX 책임 원칙
AI는 작업자가 될 수 있지만 책임자는 될 수 없습니다.
```

Use these six sections:

```txt
AX-01 AX의 정의
AX-02 AX 시스템 모델
AX-03 도입 학습 지도
AX-04 전문가의 책임 경계
AX-05 표준 산출물
AX-06 도입 체크포인트
```

- [ ] **Step 3: Update `ax-capability.ts` navigation**

Set chapters to:

```html
<div class="nav-title">AX 엔지니어 역량 모델</div>
  <a href="#ch1"><span class="code">CAP-01</span>역할 정의</a>
  <a href="#ch2"><span class="code">CAP-02</span>역량 지도</a>
  <a href="#ch3"><span class="code">CAP-03</span>성장 레벨</a>
  <a href="#ch4"><span class="code">CAP-04</span>훈련 루브릭</a>
  <a href="#ch5"><span class="code">CAP-05</span>포트폴리오 산출물</a>
```

- [ ] **Step 4: Enrich `ax-capability.ts` body**

Ensure the body contains:

```txt
Workflow Mining
Task Specification
Context Engineering
Harness Design
Evaluation
Governance
Change Management
Practitioner
Workflow Owner
Platform/Adoption Lead
교육 과정
eval rubric
episode log
automation scorecard
governance memo
rollout note
```

- [ ] **Step 5: Update `ax-organization.ts` navigation**

Set chapters to:

```html
<div class="nav-title">AX 조직 적용 패턴</div>
  <a href="#ch1"><span class="code">ORG-01</span>조직 진단</a>
  <a href="#ch2"><span class="code">ORG-02</span>파일럿 설계</a>
  <a href="#ch3"><span class="code">ORG-03</span>이해관계자 지도</a>
  <a href="#ch4"><span class="code">ORG-04</span>교육 경로</a>
  <a href="#ch5"><span class="code">ORG-05</span>확산 게이트</a>
  <a href="#ch6"><span class="code">ORG-06</span>운영 지표</a>
```

- [ ] **Step 6: Enrich `ax-organization.ts` body**

Ensure the body contains:

```txt
조직 진단
baseline
파일럿
guarded workflow
team standard
platform support
scaled governance
stakeholder map
security
legal
data owner
교육 경로
운영 지표
확산 중단 기준
```

- [ ] **Step 7: Run the AX keyword check**

Run:

```bash
rg -n "AX SYSTEM MODEL|조직 진단|파일럿|교육 과정|eval rubric|운영 지표" src/handbook/documents/ax.ts src/handbook/documents/ax-capability.ts src/handbook/documents/ax-organization.ts
```

Expected: every pattern appears at least once in the listed files.

- [ ] **Step 8: Commit foundation/adoption content**

Run:

```bash
git add src/handbook/documents/ax.ts src/handbook/documents/ax-capability.ts src/handbook/documents/ax-organization.ts
git commit -m "docs: enrich ax foundation and adoption content"
```

## Task 3: Enrich Workflow, Context, Harness, and Loop Documents

**Files:**
- Modify: `src/handbook/documents/ax-automation.ts`
- Modify: `src/handbook/documents/ax-context.ts`
- Modify: `src/handbook/documents/ax-harness.ts`
- Modify: `src/handbook/documents/ax-loop.ts`

- [ ] **Step 1: Update `ax-automation.ts`**

Ensure `navHtml` includes:

```html
<div class="nav-title">AX 업무 자동화 설계</div>
  <a href="#ch1"><span class="code">AUTO-01</span>Workflow Mining</a>
  <a href="#ch2"><span class="code">AUTO-02</span>후보 선정 매트릭스</a>
  <a href="#ch3"><span class="code">AUTO-03</span>Autonomy Ladder</a>
  <a href="#ch4"><span class="code">AUTO-04</span>Task Spec</a>
  <a href="#ch5"><span class="code">AUTO-05</span>교육 실습</a>
  <a href="#ch6"><span class="code">AUTO-06</span>도입 체크포인트</a>
```

Ensure `mainHtml` contains:

```txt
Workflow Mining
repeatability
verifiability
context stability
permission risk
failure cost
expert bottleneck
Autonomy Ladder
read-only analysis
proposal
patch
PR draft
merge 금지
deploy 금지
TASK SPEC TEMPLATE
교육 실습
```

- [ ] **Step 2: Update `ax-context.ts`**

Ensure the document contains:

```txt
Context source inventory
code
docs
tickets
logs
metrics
policies
architecture decisions
schemas
APIs
Relevance
Sufficiency
Isolation
Provenance
Freshness
Trust level
untrusted content
prompt injection
CONTEXT PACKAGE TEMPLATE
```

- [ ] **Step 3: Update `ax-harness.ts`**

Ensure the document contains:

```txt
AUTOMATION HARNESS ARCHITECTURE
model gateway
tool adapter
permission policy
context builder
verifier
audit logger
reviewer handoff
harness policy
dry-run
rollback
approval gate
HARNESS DESIGN WORKSHEET
unsafe harness execution
```

- [ ] **Step 4: Update `ax-loop.ts`**

Ensure the document contains:

```txt
Plan
Act
Verify
Reflect
state transition
stop condition
unclear spec
missing tests
unsafe permission
context gap
Failure Attribution
LOOP LOG TEMPLATE
workflow improvement review
```

- [ ] **Step 5: Run the workflow document keyword check**

Run:

```bash
rg -n "Autonomy Ladder|TASK SPEC TEMPLATE|CONTEXT PACKAGE TEMPLATE|HARNESS DESIGN WORKSHEET|LOOP LOG TEMPLATE|workflow improvement review" src/handbook/documents/ax-automation.ts src/handbook/documents/ax-context.ts src/handbook/documents/ax-harness.ts src/handbook/documents/ax-loop.ts
```

Expected: every pattern appears at least once.

- [ ] **Step 6: Commit workflow execution content**

Run:

```bash
git add src/handbook/documents/ax-automation.ts src/handbook/documents/ax-context.ts src/handbook/documents/ax-harness.ts src/handbook/documents/ax-loop.ts
git commit -m "docs: enrich ax workflow execution content"
```

## Task 4: Enrich Verification, Multi-Agent, Governance, Cases, and Playbook

**Files:**
- Modify: `src/handbook/documents/ax-verification.ts`
- Modify: `src/handbook/documents/ax-multi-agent.ts`
- Modify: `src/handbook/documents/ax-governance.ts`
- Modify: `src/handbook/documents/ax-case-studies.ts`
- Modify: `src/handbook/documents/ax-playbook.ts`

- [ ] **Step 1: Update `ax-verification.ts`**

Ensure the document contains:

```txt
Episode Package
eval set
functional check
regression check
security check
policy check
human-review check
lead time
review latency
acceptance rate
rework rate
defect escape
cost per episode
learning retention
eval rubric
training cohort
```

- [ ] **Step 2: Update `ax-multi-agent.ts`**

Ensure the document contains:

```txt
Planner
Explorer
Implementer
Verifier
Reviewer
Integrator
worktree isolation
integration checklist
conflict-handling
parallel review exercise
independent roles reduce risk
```

- [ ] **Step 3: Update `ax-governance.ts`**

Ensure the document contains:

```txt
Data classification
secret handling
customer data boundary
retention
Audit log
license
supply-chain
Prompt Injection
untrusted content
Permission boundary
exception approval
pilot launch checklist
거버넌스
```

- [ ] **Step 4: Update `ax-case-studies.ts`**

Ensure every major case uses the same labeled structure:

```txt
Problem
Workflow
Harness
Context
Permission
Verification
Metrics
Failure Mode
Rollout Lesson
```

Ensure the cases include:

```txt
전사 PR Review Assistant
문서 동기화
접근성·성능 점검
장애 회고 자동화
migration review
security triage
onboarding
실패 사례
```

- [ ] **Step 5: Update `ax-playbook.ts`**

Ensure the document contains:

```txt
2-WEEK AX AUTOMATION SPRINT
4-WEEK AX ENGINEER TRAINING
교육 과정
developer workshop
reviewer workshop
manager workshop
security workshop
platform owner workshop
Capstone
Trace-based Eval Harness
Prompt Injection 방어
AI Code Review Pipeline
Autonomy Ladder
Failure Taxonomy
TEMPLATES INDEX
```

- [ ] **Step 6: Run the advanced document keyword check**

Run:

```bash
rg -n "eval set|training cohort|worktree isolation|pilot launch checklist|Rollout Lesson|4-WEEK AX ENGINEER TRAINING|TEMPLATES INDEX" src/handbook/documents/ax-verification.ts src/handbook/documents/ax-multi-agent.ts src/handbook/documents/ax-governance.ts src/handbook/documents/ax-case-studies.ts src/handbook/documents/ax-playbook.ts
```

Expected: every pattern appears at least once.

- [ ] **Step 7: Commit advanced AX content**

Run:

```bash
git add src/handbook/documents/ax-verification.ts src/handbook/documents/ax-multi-agent.ts src/handbook/documents/ax-governance.ts src/handbook/documents/ax-case-studies.ts src/handbook/documents/ax-playbook.ts
git commit -m "docs: enrich ax verification governance and playbook"
```

## Task 5: Update Practical Examples and Generated Handbook HTML

**Files:**
- Modify: `src/handbook/practicalExamples.ts`
- Generated/Modify: `public/handbook/ax-handbook.html`
- Generated/Modify: `public/handbook/ax-engineer-capability-handbook.html`
- Generated/Modify: `public/handbook/ax-organization-adoption-handbook.html`
- Generated/Modify: `public/handbook/ax-work-automation-design-handbook.html`
- Generated/Modify: `public/handbook/ax-context-engineering-handbook.html`
- Generated/Modify: `public/handbook/ax-harness-engineering-handbook.html`
- Generated/Modify: `public/handbook/ax-loop-engineering-handbook.html`
- Generated/Modify: `public/handbook/ax-verification-evaluation-handbook.html`
- Generated/Modify: `public/handbook/ax-multi-agent-workflow-handbook.html`
- Generated/Modify: `public/handbook/ax-governance-security-handbook.html`
- Generated/Modify: `public/handbook/ax-applied-case-studies-handbook.html`
- Generated/Modify: `public/handbook/ax-practical-playbook-handbook.html`

- [ ] **Step 1: Update AX practical examples**

In `src/handbook/practicalExamples.ts`, update AX entries so they reflect the new flow:

```ts
  ax: example("팀의 AX 도입 지도를 만든다.", ["업무 흐름, 컨텍스트, 도구 권한, 검증, 감사 기록을 한 장으로 정리한다.", "개인 프롬프트 팁이 아니라 조직의 실행 시스템으로 설명한다.", "파일럿 후보와 금지 업무를 먼저 분리한다."], "AX를 도구 사용법이 아니라 검증 가능한 업무 운영 체계로 이해한다."),
  "ax-capability": example("AX 엔지니어 역량 포트폴리오를 만든다.", ["episode log, automation scorecard, eval rubric, governance memo를 수집한다.", "Practitioner, Workflow Owner, Platform/Adoption Lead 기준으로 역량을 점검한다.", "교육 과정에서 각 산출물을 리뷰받는다."], "프롬프트 실력보다 업무를 안전한 실행 시스템으로 바꾸는 능력을 키운다."),
  "ax-organization": example("2주 파일럿을 설계한다.", ["baseline과 파일럿 업무를 정한다.", "보안, 법무, 데이터 오너, 리뷰어의 승인 지점을 표시한다.", "review latency, rework rate, defect escape로 확산 여부를 판단한다."], "도구 배포가 아니라 조직 변화 관리로 AX를 도입한다."),
  "ax-automation": example("반복 업무를 Autonomy Ladder에 배치한다.", ["read-only analysis, proposal, patch, PR draft, merge/deploy 금지를 구분한다.", "task spec에 성공 조건과 중단 조건을 적는다.", "실패 비용이 큰 업무는 증거 생성까지만 허용한다."], "자동화 수준을 AI 능력이 아니라 검증 가능성과 실패 비용으로 결정한다."),
```

Keep the existing keys for `ax-harness`, `ax-context`, `ax-loop`, `ax-multi-agent`, `ax-verification`, `ax-governance`, `ax-case-studies`, and `ax-playbook`, but revise their text to include `context package`, `harness policy`, `loop log`, `integration checklist`, `eval rubric`, `pilot launch checklist`, `Rollout Lesson`, and `4-WEEK AX ENGINEER TRAINING` where appropriate.

- [ ] **Step 2: Regenerate static handbook HTML**

Run:

```bash
npm run generate:handbook
```

Expected: generation completes successfully and updates `public/handbook/ax*.html` from the TS source documents.

- [ ] **Step 3: Confirm generated AX files include new content**

Run:

```bash
rg -n "4-WEEK AX ENGINEER TRAINING|조직 진단|TASK SPEC TEMPLATE|CONTEXT PACKAGE TEMPLATE|HARNESS DESIGN WORKSHEET|TEMPLATES INDEX" public/handbook/ax*.html
```

Expected: each pattern appears in at least one generated AX HTML file.

- [ ] **Step 4: Commit examples and generated HTML**

Run:

```bash
git add src/handbook/practicalExamples.ts public/handbook/ax*.html
git commit -m "docs: regenerate enriched ax handbook pages"
```

## Task 6: Final Verification and Cleanup

**Files:**
- Verify all changed files from prior tasks.

- [ ] **Step 1: Run the full handbook test suite**

Run:

```bash
npm test
```

Expected: all tests pass, including the AX order and content assertions.

- [ ] **Step 2: Run the production build**

Run:

```bash
npm run build
```

Expected: Vite build completes successfully.

- [ ] **Step 3: Inspect AX-related git diff**

Run:

```bash
git diff --stat
```

Expected: only AX-related source documents, AX generated HTML, catalog, practical examples, and test changes remain since the last commit. If unrelated files appear, do not revert them; identify whether they preexisted and exclude them from AX commits.

- [ ] **Step 4: Run final semantic checks**

Run:

```bash
rg -n "교육 과정|파일럿|조직 진단|표준 산출물|task spec|context package|harness policy|eval rubric|운영 지표|거버넌스|capstone" src/handbook/documents/ax*.ts public/handbook/ax*.html
```

Expected: all terms appear across AX source and generated documents.

- [ ] **Step 5: Commit final verification-only adjustments if needed**

If verification required any small fixes, commit them:

```bash
git add src/handbook/catalog.mjs src/handbook/documents/ax*.ts src/handbook/practicalExamples.ts scripts/handbook-html.test.mjs public/handbook/ax*.html
git commit -m "fix: complete ax handbook restructure verification"
```

If there are no remaining changes after prior commits, skip this commit.

## Self-Review

- Spec coverage: The plan covers IA reorder, all 12 AX documents, practical examples, tests, generated HTML, and final verification.
- Placeholder scan: No unresolved placeholder markers or open-ended implementation steps are present. Content-heavy steps list exact strings and expected document concerns.
- Type consistency: Existing IDs, labels, filenames, test names, and npm commands match the current codebase.
