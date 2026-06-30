# LLM Handbook Concept Density Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite the LLM handbook group from table-heavy summaries into conceptually dense, failure-driven, artifact-backed learning documents for mid-level developers.

**Architecture:** Keep the current handbook architecture and menu structure. Modify only the nine `public/handbook/llm-*.html` source documents, regenerate `src/handbook/documents/llm-*.ts`, and preserve existing navigation/test markers. The content architecture must shift from `section -> lede -> table` to `mental model -> failure mode -> design response -> concrete artifact -> acceptance marker -> summary table`.

**Tech Stack:** Static handbook HTML, generated TypeScript document modules, Node test runner, Vite build.

---

## Current Quality Diagnosis

The current LLM documents are directionally correct but still too shallow. The repeated pattern is:

```text
section title -> one short paragraph -> table/list -> next section
```

This creates coverage without depth. A mid-level developer can see keywords, but cannot learn how to reason through design trade-offs, debug failures, or defend implementation decisions in a review or interview.

Quantitative signal from the current documents:

```text
llm-roadmap: sections=5 tables=6 long paragraphs=0
llm-fundamentals: sections=6 tables=7 long paragraphs=0
llm-prompting: sections=6 tables=6 long paragraphs=1
llm-rag: sections=6 tables=8 long paragraphs=1
llm-evaluation: sections=7 tables=7 long paragraphs=0
llm-agents-tool-use: sections=6 tables=6 long paragraphs=2
llm-security-governance: sections=7 tables=8 long paragraphs=0
llm-app-architecture-operations: sections=6 tables=6 long paragraphs=1
llm-portfolio-projects: sections=6 tables=7 long paragraphs=2
```

This pass should not add more menu items. It should increase conceptual density inside the current nine documents.

## Non-Negotiable Rewrite Standard

- [ ] Every major section starts with a real explanation, not a table.
- [ ] Tables become summaries, comparisons, or review aids. They must not carry the main teaching load.
- [ ] Each document includes at least three long-form explanation blocks. Each block should be roughly 4+ paragraphs or 500-800 Korean characters.
- [ ] Each document includes at least two concrete failure scenarios.
- [ ] Each document includes at least two reusable artifacts: JSON/YAML/schema, trace, prompt, eval fixture, runbook, policy, report, or README template.
- [ ] Each key concept must include: why it matters, where it fails, how to design around it, and how to verify it.
- [ ] Keep existing regression markers such as `TOKEN CONTEXT ATTENTION`, `RAG PIPELINE`, `QUALITY REPORT`, `PROMPT INJECTION`, and `COST DASHBOARD`.
- [ ] Add new quality markers across the group: `MARKER: concept-depth`, `MARKER: artifact-ready`, `MARKER: failure-driven`, `MARKER: mid-level-signal`, `MARKER: portfolio-evidence`.

## Files

**Modify:**
- `public/handbook/llm-roadmap-handbook.html`
- `public/handbook/llm-fundamentals-handbook.html`
- `public/handbook/llm-prompting-handbook.html`
- `public/handbook/llm-rag-handbook.html`
- `public/handbook/llm-evaluation-handbook.html`
- `public/handbook/llm-agents-tool-use-handbook.html`
- `public/handbook/llm-security-governance-handbook.html`
- `public/handbook/llm-app-architecture-operations-handbook.html`
- `public/handbook/llm-portfolio-projects-handbook.html`

**Generate after edits:**
- `src/handbook/documents/llm-roadmap.ts`
- `src/handbook/documents/llm-fundamentals.ts`
- `src/handbook/documents/llm-prompting.ts`
- `src/handbook/documents/llm-rag.ts`
- `src/handbook/documents/llm-evaluation.ts`
- `src/handbook/documents/llm-agents-tool-use.ts`
- `src/handbook/documents/llm-security-governance.ts`
- `src/handbook/documents/llm-app-architecture-operations.ts`
- `src/handbook/documents/llm-portfolio-projects.ts`

---

## Task 1: Add A Content Density Regression Test

**Files:**
- Modify: `scripts/handbook-html.test.mjs`

- [ ] **Step 1: Add quality assertions for LLM documents**

Add a new test that fails if the LLM pages regress back to table-only summaries.

Required checks:
- Every LLM document includes at least one `MARKER: concept-depth`.
- Every LLM document includes at least one `MARKER: artifact-ready`.
- Every LLM document includes at least one `MARKER: failure-driven`.
- Every LLM document has at least three paragraphs with 180+ text characters.
- No document has more `<table>` elements than the sum of long paragraphs plus artifact blocks.

Suggested test shape:

```js
test("LLM handbook documents use concept-depth narratives instead of table-only summaries", async () => {
  const llmFiles = LLM_HANDBOOKS.map((item) => item.file);

  for (const file of llmFiles) {
    const source = await readFile(path.join("public", "handbook", file), "utf8");
    const paragraphTexts = Array.from(source.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)).map((match) =>
      match[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
    );
    const longParagraphs = paragraphTexts.filter((text) => text.length >= 180).length;
    const tableCount = (source.match(/<table\b/g) || []).length;
    const artifactCount = (source.match(/MARKER: artifact-ready/g) || []).length;

    assert.match(source, /MARKER: concept-depth/, `${file} should include concept-depth narrative markers`);
    assert.match(source, /MARKER: artifact-ready/, `${file} should include reusable artifact markers`);
    assert.match(source, /MARKER: failure-driven/, `${file} should include failure-driven examples`);
    assert.ok(longParagraphs >= 3, `${file} should include at least three long explanatory paragraphs`);
    assert.ok(
      tableCount <= longParagraphs + artifactCount,
      `${file} should not rely on tables more than explanatory blocks and artifacts`,
    );
  }
});
```

- [ ] **Step 2: Run test to confirm it fails**

Run:

```bash
npm test
```

Expected: FAIL because current LLM documents do not contain the new quality markers and long-form depth.

---

## Task 2: Rewrite `llm-fundamentals-handbook.html`

**Files:**
- Modify: `public/handbook/llm-fundamentals-handbook.html`

**Current problem:** The file is conceptually important but shallow. It has token/context/sampling/hallucination terms, but not enough explanation of how those constraints propagate into RAG, prompting, evaluation, and operations.

- [ ] **Step 1: Replace the opening mental model with a long-form explanation**

Add a block titled:

```html
<h3>MARKER: concept-depth — LLM을 DB가 아니라 확률적 추론 컴포넌트로 다룬다는 뜻</h3>
```

It must explain:
- Model knowledge, input context, external tools, and validators have different responsibilities.
- Correctness is not a model property alone; it is a system property.
- A model can produce fluent text without verified evidence.
- This is why RAG, structured output, no-answer policy, and evaluation exist.

- [ ] **Step 2: Add a token budget walkthrough**

Add:

```html
<h3>MARKER: artifact-ready — Token budget walkthrough</h3>
```

Include an 8k context budget example:
- system/developer prompt: 900 tokens
- conversation history: 1,400 tokens
- retrieved chunks: 4,000 tokens
- tool result: 500 tokens
- structured output allowance: 1,200 tokens
- remaining margin: 0 tokens

Explain why long prompts can reduce quality by crowding out evidence and output budget.

- [ ] **Step 3: Convert context/attention tables into narrative**

Add:

```html
<h3>MARKER: failure-driven — Context is not memory</h3>
```

Explain:
- Context presence is not guaranteed usage.
- Middle-position evidence can be underused.
- Conflicting instructions and duplicate chunks create attention competition.
- RAG chunk ordering and context compression are design decisions, not formatting.

- [ ] **Step 4: Add sampling before/after examples**

Add two short outputs for the same grounded question:
- Low temperature, still unsupported if evidence is absent.
- Higher temperature, more diverse but still not factual without grounding.

The conclusion must state: sampling controls variance and style, not truth.

- [ ] **Step 5: Add hallucination response architecture**

Add a detect/prevent/recover/measure flow for:
- missing knowledge
- unsupported synthesis
- stale context
- unsafe guessing

- [ ] **Step 6: Move existing tables after the narrative**

Existing tables can remain, but only after explanation blocks as quick references.

---

## Task 3: Rewrite `llm-prompting-handbook.html`

**Files:**
- Modify: `public/handbook/llm-prompting-handbook.html`

**Current problem:** The document says “prompt as contract” but mostly provides field lists. It needs real prompt artifacts, bad-to-good refactoring, validation failure, repair, streaming state, and economics examples.

- [ ] **Step 1: Add a bad prompt vs production prompt comparison**

Add:

```html
<h3>MARKER: concept-depth — Prompt contract as API contract</h3>
```

Include:
- Bad prompt: “이 문서를 요약하고 위험을 찾아줘.”
- Production prompt with version, owner, task boundary, allowed evidence, refusal shape, output schema, evaluation set, rollback criteria.

- [ ] **Step 2: Add a complete prompt contract artifact**

Add:

```html
<h3>MARKER: artifact-ready — Prompt contract YAML</h3>
```

Include YAML fields:
- version
- owner
- task
- allowed_inputs
- forbidden_behavior
- evidence_policy
- refusal_shape
- output_schema_ref
- eval_dataset
- rollback_criteria
- logs

- [ ] **Step 3: Add schema design rationale**

Explain how `enum`, `nullable`, `maxLength`, `citations`, and `additionalProperties: false` prevent downstream UI, DB, analytics, and retry bugs.

- [ ] **Step 4: Add repair loop worked example**

Add:

```html
<h3>MARKER: failure-driven — Repair loop worked example</h3>
```

Include:
- invalid output
- validator error payload
- targeted repair prompt
- corrected output
- fallback decision when second validation fails

- [ ] **Step 5: Add tool execution authority boundary**

Explain that the model proposes tool calls, but the application executes them. Add a tool call request, approval payload, and audit log example.

- [ ] **Step 6: Add streaming state machine**

Explain:
- `message.delta` is temporary UI state.
- `output.validated` is the first state that can be stored.
- cancel/reconnect/backpressure must not produce duplicate side effects.

- [ ] **Step 7: Add cost and latency budget example**

Include:
- 100,000 request monthly cost worksheet.
- retry amplification calculation.
- p95 3s budget split across retrieval/model/validation/logging.
- model routing decision rule.

---

## Task 4: Rewrite `llm-rag-handbook.html`

**Files:**
- Modify: `public/handbook/llm-rag-handbook.html`

**Current problem:** RAG terms are covered, but the document does not yet teach RAG as a search, evidence, permission, and debugging system.

- [ ] **Step 1: Add RAG as evidence management**

Add:

```html
<h3>MARKER: concept-depth — RAG는 벡터 검색이 아니라 근거 관리 시스템이다</h3>
```

Explain:
- Retrieval failure and generation failure must be separated.
- If correct evidence is absent from context, the answer is accidental.
- RAG quality depends on ingest, parsing, chunking, metadata, permissions, retrieval, reranking, packing, and citation.

- [ ] **Step 2: Add chunking trade-off narrative**

Add:

```html
<h3>DESIGN TRADE-OFF — Chunking의 핵심 긴장</h3>
```

Explain:
- Small chunks improve precision and citation but lose context.
- Large chunks preserve context but increase noise and token cost.
- Overlap improves boundary recall but can duplicate claims.
- Parent-child chunking resolves part of this tension.

- [ ] **Step 3: Add before/after chunk artifact**

Include:
- poorly split policy paragraph
- improved parent-child chunk structure
- metadata with parent_id, child_id, title_path, page, ACL

- [ ] **Step 4: Add embedding contract failure narrative**

Explain how embedding model changes, dimension changes, normalization changes, and parser changes corrupt score distributions and require reindexing.

- [ ] **Step 5: Add trace-driven RAG pipeline**

Add:

```html
<h3>MARKER: artifact-ready — TRACE EXAMPLE</h3>
```

Include fields:
- question
- rewritten_query
- top_k
- reranked
- selected_context
- answer
- citations
- failure_label

- [ ] **Step 6: Add debugging flow**

Add:

```html
<h3>DEBUGGING FLOW — 정답 chunk가 top-20에도 없을 때</h3>
```

Flow:
- parser failure?
- chunk boundary issue?
- metadata/ACL filter issue?
- embedding mismatch?
- query rewrite issue?
- hybrid search needed?
- reranker issue?

- [ ] **Step 7: Add permission fixture**

Show tenant A/B query results and expected blocked search behavior.

---

## Task 5: Rewrite `llm-evaluation-handbook.html`

**Files:**
- Modify: `public/handbook/llm-evaluation-handbook.html`

**Current problem:** It names the right metrics but does not teach evaluation as release governance and debugging.

- [ ] **Step 1: Add evaluation as change management**

Add:

```html
<h3>MARKER: concept-depth — 평가는 모델 점수가 아니라 변경 관리다</h3>
```

Explain how prompt/model/reranker/chunking changes must pass release gates.

- [ ] **Step 2: Add golden dataset as failure map**

Add:

```html
<h3>MARKER: artifact-ready — Golden dataset JSONL</h3>
```

Include three JSONL rows:
- factual
- no-answer
- permission-denied

Explain representative coverage, hard negatives, stale data, and dataset decay.

- [ ] **Step 3: Add metric interpretation guide**

Convert metrics from definition-only to:

```text
metric -> low score means -> likely cause -> next experiment
```

Examples:
- low recall@k -> candidate generation problem -> chunk/query/hybrid experiment
- low MRR -> ranking problem -> reranker experiment
- low context precision -> packing/noise problem -> compression and top-k tuning

- [ ] **Step 4: Add claim-level groundedness artifact**

Add answer claim rows:
- claim
- evidence_chunk
- supported?
- failure_type
- fix

- [ ] **Step 5: Add LLM-as-judge calibration block**

Include:
- judge prompt
- judge output schema
- human agreement check
- pairwise vs scalar score caveat
- judge model changes require regression

- [ ] **Step 6: Add regression report sample**

Add:

```html
<h3>MARKER: failure-driven — RELEASE GATE regression report</h3>
```

Include baseline vs candidate metrics, pass/block decision, and top three failures.

---

## Task 6: Rewrite `llm-agents-tool-use-handbook.html`

**Files:**
- Modify: `public/handbook/llm-agents-tool-use-handbook.html`

**Current problem:** Agent concepts are right but read as role and control lists. It needs decision criteria, tool execution pipeline, and evidence contracts.

- [ ] **Step 1: Add workflow-to-agent decision narrative**

Add:

```html
<h3>MARKER: concept-depth — Workflow에서 Agent로 넘어가는 결정 기준</h3>
```

Explain:
- agent increases cost, latency, permission complexity, and verification burden.
- deterministic workflow remains default.
- use agent only when uncertainty, tool selection, and iterative exploration justify it.
- do not use agent for irreversible actions without approval.

- [ ] **Step 2: Convert autonomy table into decision tree**

Add a decision tree:
- Are steps deterministic?
- Is tool choice dynamic?
- Can every side effect be verified?
- Is human approval available?
- Is budget bounded?

- [ ] **Step 3: Add planner good/bad examples**

Show:
- bad planner output that invents unauthorized tool actions
- good planner output with approved tools, stop conditions, success evidence

- [ ] **Step 4: Add tool call execution pipeline**

Add:

```html
<h3>MARKER: artifact-ready — Tool call execution pipeline</h3>
```

Pipeline:
model proposal -> JSON schema parse -> feature allowlist -> actor permission check -> risk tier -> dry-run preview -> approval -> idempotency key -> execution -> audit log

- [ ] **Step 5: Add verifier evidence contract**

Explain why verifier is not another summarizer. It must inspect schema validity, citations, side effects, tests, stop conditions, and rollback evidence.

- [ ] **Step 6: Add failure scenarios**

Include:
- approval denied trace
- idempotency collision trace
- verifier blocks completion because evidence is missing

---

## Task 7: Rewrite `llm-security-governance-handbook.html`

**Files:**
- Modify: `public/handbook/llm-security-governance-handbook.html`

**Current problem:** The security document names important controls but does not teach source-to-sink thinking or governance flow.

- [ ] **Step 1: Add source-to-sink mental model**

Add:

```html
<h3>MARKER: concept-depth — LLM 보안은 source-to-sink 문제다</h3>
```

Explain:
- user input, retrieved docs, tool output, memory are sources.
- model prompt, logs, DB writes, emails, external APIs are sinks.
- trust boundary decisions must happen before content reaches dangerous sinks.

- [ ] **Step 2: Add indirect prompt injection scenario**

Add:

```html
<h3>MARKER: failure-driven — Indirect prompt injection 사고 시나리오</h3>
```

Scenario:
uploaded document includes malicious instruction -> retrieval injects it into context -> model proposes tool call -> email/API sink tries to exfiltrate data -> allowlist/approval/audit blocks it.

- [ ] **Step 3: Move threat model table after the scenario**

The actor/asset/source/sink table should support the scenario, not replace it.

- [ ] **Step 4: Add RAG access control narrative**

Explain why retrieval access control must happen before/inside search, not after answer generation.

Include:
- tenant scope
- document ACL
- metadata pre-filter
- chunk provenance
- cache key
- citation validation

- [ ] **Step 5: Add governance release flow**

Add:

```html
<h3>MARKER: artifact-ready — Governance release flow</h3>
```

Flow:
change request -> risk tier -> offline eval -> red team fixtures -> canary -> monitoring -> rollback/kill switch.

- [ ] **Step 6: Add red-team fixtures**

Include three fixtures:
- jailbreak
- indirect injection
- tenant isolation

Each fixture includes input, expected block, expected log marker.

---

## Task 8: Rewrite `llm-app-architecture-operations-handbook.html`

**Files:**
- Modify: `public/handbook/llm-app-architecture-operations-handbook.html`

**Current problem:** It lists architecture paths and observability fields but does not explain ownership, state, failure classes, or operational decisions.

- [ ] **Step 1: Add reconstructable request lifecycle narrative**

Add:

```html
<h3>MARKER: concept-depth — Request lifecycle as reconstructable evidence</h3>
```

Explain that request envelope fields are not logging decoration; they support incident replay, cost attribution, permission audit, and quality regression diagnosis.

- [ ] **Step 2: Add architecture ownership narrative**

Explain online, async, and control paths with:
- where state is stored
- who owns failures
- what gets logged
- when the user sees partial vs final results

- [ ] **Step 3: Add LLM failure taxonomy**

Add:

```html
<h3>MARKER: failure-driven — LLM failure taxonomy</h3>
```

Include:
- transport failure
- provider failure
- schema failure
- grounding failure
- safety failure
- cost failure
- latency failure

For each: retry? alert? fallback? block release?

- [ ] **Step 4: Convert observability table**

Change span attribute table into:

```text
metric -> decision -> alert threshold -> first runbook action
```

- [ ] **Step 5: Add incident runbook sample**

Scenario: hallucination increase alert.

Include:
- symptoms
- metrics to inspect
- recent changes to check
- temporary mitigation
- rollback
- follow-up regression case

- [ ] **Step 6: Add prompt release change request artifact**

Include:
- prompt_version
- model_version
- eval report link
- risk tier
- expected quality delta
- rollback plan
- canary criteria

---

## Task 9: Rewrite `llm-roadmap-handbook.html`

**Files:**
- Modify: `public/handbook/llm-roadmap-handbook.html`

**Current problem:** The roadmap has the right concepts but reads as parallel lists. It needs a coherent narrative arc for AI Native growth.

- [ ] **Step 1: Add AI Native transition narrative**

Add:

```html
<h3>MARKER: concept-depth — 모델 호출자에서 불확실성 관리자로</h3>
```

Explain:
- LLM output can vary.
- external documents can become instructions.
- schemas and citations can break.
- LLM feature quality is governed by contracts, evaluation, logs, and rollback.

- [ ] **Step 2: Add LLM app architecture walkthrough**

Explain input contract, model gateway, retrieval layer, tool layer, evaluation pipeline, observability, and audit log as one request flow.

- [ ] **Step 3: Rewrite failure matrix into failure learning modules**

For hallucination, retrieval miss, schema drift, prompt injection, cost runaway:
- cause
- detection
- defense
- regression test
- portfolio evidence

- [ ] **Step 4: Split learning path and model selection**

Do not keep two tables back to back. Add case-based model selection practice:
- document analysis
- RAG answer
- tool execution
- judge model

- [ ] **Step 5: Add final practical standard**

Add “launchable, operable, interview-defensible” criteria.

---

## Task 10: Rewrite `llm-portfolio-projects-handbook.html`

**Files:**
- Modify: `public/handbook/llm-portfolio-projects-handbook.html`

**Current problem:** The portfolio document lists outputs, but not the depth required for a strong submission.

- [ ] **Step 1: Add evidence-first portfolio narrative**

Add:

```html
<h3>MARKER: portfolio-evidence — 강한 포트폴리오는 데모가 아니라 증거다</h3>
```

Explain why screenshots are weaker than failure case logs, evaluation reports, cost/latency logs, security tests, and design decision records.

- [ ] **Step 2: Add README-ready template**

Add:

```html
<h3>MARKER: artifact-ready — README evidence template</h3>
```

Template sections:
- Problem
- Architecture
- Design decisions
- API contract
- Prompt contract
- RAG trace
- Evaluation report
- Security cases
- Operations
- Known limitations

- [ ] **Step 3: Expand document analysis API artifact**

Include:
- request
- response
- validation failure
- refusal
- uncertainty
- log fields

- [ ] **Step 4: Expand RAG chatbot artifact**

Include:
- retrieval trace with query rewrite
- top-k candidates
- reranker score
- permission-filtered chunk
- final selected context
- answer citations

- [ ] **Step 5: Add evaluation report sample**

Include:
- hit rate
- MRR
- groundedness
- faithfulness
- citation precision
- latency
- cost
- decision: ship/beta/redesign

- [ ] **Step 6: Add failure case log sample**

Include:
- failed input
- actual output
- expected behavior
- root cause
- design change
- regression test added

- [ ] **Step 7: Add interview defense section**

Questions:
- Why pgvector?
- How did you reduce hallucination?
- How do you know LLM-as-judge is reliable?
- What happens when retrieval misses?
- How do you control cost?
- How do you prevent permission leaks?

---

## Task 11: Regenerate And Verify

**Files:**
- Generate: `src/handbook/documents/llm-*.ts`

- [ ] **Step 1: Regenerate handbook modules**

Run:

```bash
npm run generate:handbook
```

Expected: exits 0 and updates generated `src/handbook/documents/llm-*.ts`.

- [ ] **Step 2: Run marker checks**

Run:

```bash
rg "MARKER: concept-depth|MARKER: artifact-ready|MARKER: failure-driven|MARKER: mid-level-signal|MARKER: portfolio-evidence" public/handbook/llm-*.html
```

Expected: each LLM document has the relevant markers.

- [ ] **Step 3: Run tests**

Run:

```bash
npm test
```

Expected: all tests pass.

- [ ] **Step 4: Run production build**

Run:

```bash
npm run build
```

Expected: Vite build exits 0.

- [ ] **Step 5: Review final density**

Run:

```bash
node - <<'NODE'
const fs = require('fs');
const files = fs.readdirSync('public/handbook').filter(f => f.startsWith('llm-') && f.endsWith('.html')).sort();
for (const f of files) {
  const s = fs.readFileSync(`public/handbook/${f}`, 'utf8');
  const count = re => (s.match(re)||[]).length;
  const paragraphChars = [...s.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)].map(m => m[1].replace(/<[^>]+>/g,'').trim().length);
  const longParagraphs = paragraphChars.filter(n => n >= 180).length;
  console.log(`${f}\tsections=${count(/<section\b/g)}\ttables=${count(/<table\b/g)}\tparagraphs=${paragraphChars.length}\tlongP=${longParagraphs}\tcode=${count(/<pre><code>/g)}\tserial=${count(/class="serial-card"/g)}`);
}
NODE
```

Expected:
- each LLM document has at least three long paragraphs
- each document has at least two concrete artifact blocks or examples
- tables no longer dominate the document structure

## Implementation Order

1. Add the content-density regression test first.
2. Rewrite fundamentals and prompting first because they define the mental model.
3. Rewrite RAG and evaluation next because they define system quality.
4. Rewrite agents, security, and operations next because they define production boundaries.
5. Rewrite roadmap and portfolio last so they can synthesize the stronger internal documents.
6. Regenerate, test, build, and run density checks.

## Non-Goals

- Do not add new LLM menu items.
- Do not touch unrelated backend, frontend, AX, operations, or career handbooks.
- Do not solve shallow content by adding more tables.
- Do not add marketing copy, generic “AI trend” commentary, or unsourced product claims.
- Do not remove existing test markers unless tests are updated with stricter replacements.
