# LLM Handbook Full Strengthening Plan

> For agentic workers: REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` or `superpowers:executing-plans` to implement this plan task-by-task. This plan was prepared from nine scoped sub-agent reviews, one per LLM handbook document.

**Goal:** Rebuild the LLM handbook group from a table-heavy overview into a conceptually strong, implementation-ready curriculum for an AI Native mid-level developer.

**Quality Bar:** Each document must answer four questions: what concept means, why it fails in production, how a developer designs around it, and what evidence proves the implementation is good. Avoid shallow keyword tables. Use explanatory sections, decision matrices, concrete schemas, failure-mode examples, operational checklists, and test markers.

**Target Reader:** Mid-level developer moving into AI Native product engineering. They already understand APIs, databases, backend architecture, testing, and deployment, but need LLM-specific mental models, RAG, evaluation, agents, security, and operations.

**Primary Files:**
- `public/handbook/llm-roadmap-handbook.html`
- `public/handbook/llm-fundamentals-handbook.html`
- `public/handbook/llm-prompting-handbook.html`
- `public/handbook/llm-rag-handbook.html`
- `public/handbook/llm-evaluation-handbook.html`
- `public/handbook/llm-agents-tool-use-handbook.html`
- `public/handbook/llm-security-governance-handbook.html`
- `public/handbook/llm-app-architecture-operations-handbook.html`
- `public/handbook/llm-portfolio-projects-handbook.html`

**Generated Files After Implementation:**
- `src/handbook/documents/llm-*.ts`
- `src/handbook/documentLoaders.ts`

---

## Cross-Document Standards

- [ ] Replace “simple table only” sections with one of: concept explanation, design rule, failure-mode matrix, concrete schema, sample trace, quality rubric, or checklist.
- [ ] Every document gets a clear reader contract: what a mid-level developer should be able to explain or build after reading it.
- [ ] Every document includes at least one concrete artifact: JSON schema, prompt contract, chunk metadata schema, eval dataset row, tool approval payload, audit log schema, request lifecycle envelope, or README evidence pack.
- [ ] Every document includes failure modes. LLM knowledge is not complete unless it covers hallucination, retrieval miss, prompt injection, schema drift, tool misuse, cost runaway, latency spikes, and permission leakage where relevant.
- [ ] Every document includes test markers that can be checked by `rg`.
- [ ] After editing public HTML, run `npm run generate:handbook`, `npm test`, and `npm run build`.

---

## Task 1: LLM Roadmap

**File:** `public/handbook/llm-roadmap-handbook.html`

**Objective:** Turn the roadmap from an index into the entry standard for becoming an AI Native developer.

- [ ] Add an `AI NATIVE ROLE BOUNDARY` section distinguishing AI Native developer, AI-assisted developer, ML engineer, and AI product engineer.
- [ ] Add a capability stack covering model interface, prompt contract, structured output, retrieval, orchestration, evaluation, security, observability, cost, and deployment.
- [ ] Add a failure-mode matrix covering hallucination, stale knowledge, prompt injection, schema drift, tool misuse, retrieval miss, cost runaway, and latency spikes.
- [ ] Add a model selection matrix using task difficulty, latency SLO, cost ceiling, context length, tool accuracy, structured output reliability, and evaluation score.
- [ ] Add a portfolio rubric: project scope, architecture evidence, eval report, security posture, operations evidence, and interview defensibility.

**Required Markers:** `AI NATIVE ROLE BOUNDARY`, `LLM FAILURE MODE MATRIX`, `MODEL SELECTION MATRIX`, `PROMPT CONTRACT TEMPLATE`, `AI NATIVE PORTFOLIO RUBRIC`.

---

## Task 2: LLM Fundamentals

**File:** `public/handbook/llm-fundamentals-handbook.html`

**Objective:** Explain LLM mechanics in a way that directly informs prompt design, RAG, evaluation, and model selection.

- [ ] Add a mental model: LLMs predict likely continuations, not verified facts.
- [ ] Expand tokenization with Korean, code, JSON, logs, URLs, and base64 cost implications.
- [ ] Explain context budget as a shared budget across system prompt, conversation, retrieval context, tool results, and output.
- [ ] Add context degradation patterns: lost-in-the-middle, recency bias, irrelevant context poisoning, and instruction conflict.
- [ ] Explain attention as weighting, not perfect memory.
- [ ] Expand sampling: temperature, top_p, seed, max output, determinism limits, and when to lower variability.
- [ ] Add hallucination taxonomy: missing knowledge, ambiguous prompt, unsupported synthesis, stale context, and unsafe guessing.
- [ ] Add a grounded output contract and model selection decision table.

**Required Markers:** `FND-TOKEN-01`, `FND-CONTEXT-01`, `FND-ATTN-01`, `FND-SAMPLE-01`, `FND-HALL-01`, `FND-MODEL-01`, `grounded output contract`.

---

## Task 3: Production Prompting

**File:** `public/handbook/llm-prompting-handbook.html`

**Objective:** Reframe prompting as a versioned API contract, not wording tricks.

- [ ] Add a production prompt contract with version, owner, task boundary, allowed inputs, invariants, refusal shape, output schema, examples, and observability fields.
- [ ] Add a structured output section with JSON schema, enums, nullable fields, `additionalProperties`, strict parsing, and schema evolution.
- [ ] Add validation layers: schema validation, semantic validation, business-rule validation, and retry limits.
- [ ] Add repair-loop decision rules: retry, ask clarification, fallback, or fail closed.
- [ ] Expand tool use with untrusted tool results, idempotency, argument validation, allowlist, approval gates, and audit fields.
- [ ] Expand streaming with event contract, partial/final messages, cancellation, timeout, backpressure, and UI consistency.
- [ ] Add token, cost, and latency economics: input/output token budget, retry amplification, model routing, caching, batch/async, p50/p95 tracking.

**Required Markers:** `PROMPT CONTRACT`, `STRUCTURED OUTPUT CONTRACT`, `schema evolution`, `repair loop`, `TOOL USE BOUNDARY`, `streaming event contract`, `TOKEN COST LATENCY ECONOMICS`.

---

## Task 4: RAG, Embedding, Vector DB

**File:** `public/handbook/llm-rag-handbook.html`

**Objective:** Make RAG implementable and debuggable, not a pipeline diagram only.

- [ ] Add an embedding model contract: model name, dimensions, normalization, distance metric, version, reindex trigger, and language/domain fit.
- [ ] Explain cosine similarity, dot product, vector distance, and pgvector operator choice at a practical level.
- [ ] Add chunking strategy: size, overlap, headings, table/code handling, parent-child chunks, late chunking, and content hash.
- [ ] Add chunk metadata schema including `chunk_id`, `document_id`, `tenant_id`, `acl`, `embedding_model`, `content_hash`, `source_uri`, `page`, and `updated_at`.
- [ ] Add vector store decision guidance for pgvector vs Chroma, including indexing, backup, permissions, deployment, and migration.
- [ ] Add retrieval design: top-k, query rewrite, hybrid search, BM25, RRF, reranking, no-answer, and context packing.
- [ ] Add access control rule: pre-filter by tenant and ACL before retrieval result enters the prompt.
- [ ] Add RAG evaluation metrics: recall@k, MRR, NDCG, context precision, groundedness, faithfulness, and citation precision.

**Required Markers:** `EMBEDDING MODEL CONTRACT`, `CHUNK METADATA SCHEMA`, `Parent-child chunk`, `Hybrid search`, `RRF`, `pre-filter`, `permission leak`, `recall@k`, `MRR`, `NDCG`, `groundedness`, `citation`.

---

## Task 5: Evaluation

**File:** `public/handbook/llm-evaluation-handbook.html`

**Objective:** Explain how to prove that an LLM system works, and how to prevent regressions.

- [ ] Add evaluation architecture: input, retrieval trace, model output, judge result, cost, latency, and version metadata.
- [ ] Expand golden dataset design with factual, ambiguous, no-answer, adversarial, permission-denied, and multilingual cases.
- [ ] Add dataset fields: question, expected evidence, expected answer, allowed answer range, tags, difficulty, source document, and owner.
- [ ] Separate retrieval evaluation from answer evaluation.
- [ ] Add retrieval metrics: recall@k, MRR, nDCG, context precision, and context recall.
- [ ] Add groundedness and hallucination taxonomy: unsupported claim, wrong citation, overbroad answer, contradiction, and missing refusal.
- [ ] Add LLM-as-judge calibration: rubric, pairwise comparison, human spot-checking, bias control, and judge drift.
- [ ] Add prompt regression gate: baseline comparison, threshold, failure triage, and release blocking.
- [ ] Add a one-page quality report template for client or stakeholder review.

**Required Markers:** `golden-dataset-fields`, `retrieval-metrics`, `groundedness-taxonomy`, `llm-judge-calibration`, `prompt-regression-gate`, `quality-report-template`.

---

## Task 6: Agents And Tool Use

**File:** `public/handbook/llm-agents-tool-use-handbook.html`

**Objective:** Define when agentic behavior is appropriate and how to operate it safely.

- [ ] Add a workflow-first principle: use deterministic workflows unless autonomy is needed.
- [ ] Add an autonomy gradient from single prompt, chain, workflow, tool-using assistant, to autonomous agent.
- [ ] Add agent vs workflow selection criteria: uncertainty, tool count, statefulness, reversibility, risk, and verification.
- [ ] Add Planner, Executor, Verifier contracts with inputs, outputs, allowed actions, and failure responsibility.
- [ ] Add tool schema hardening: allowlist, typed args, argument validation, idempotency, timeout, dry-run, rollback, and audit.
- [ ] Add human approval gate payload for destructive, expensive, external, or irreversible actions.
- [ ] Add tool result trust boundary: tool output is data, not instruction.
- [ ] Add memory lifecycle: scope, expiry, provenance, conflict handling, user control, and privacy.
- [ ] Add retry taxonomy, budget accounting, stop conditions, and audit log chain.

**Required Markers:** `agent-workflow-rule`, `autonomy-gradient`, `planner-output-contract`, `role-contracts`, `tool-schema-hardening`, `approval-gate-payload`, `memory-lifecycle`, `retry-taxonomy`, `budget-accounting`, `audit-log-chain`.

---

## Task 7: Security And Governance

**File:** `public/handbook/llm-security-governance-handbook.html`

**Objective:** Turn the security document into a review standard for LLM features.

- [ ] Add the core principle: the model is not an authority-bearing user; it is an input-processing component inside an authority-bearing application.
- [ ] Add threat modeling with actor, asset, trust boundary, source, sink, and control.
- [ ] Expand prompt injection into direct, indirect, tool, RAG, memory, and exfiltration paths.
- [ ] Add RAG security controls: document ACL, tenant isolation, metadata filter, chunk provenance, stale index handling, and citation validation.
- [ ] Add tool and agent security: allowlist, parameter validation, least privilege, human approval, dry-run, idempotency, rollback, and audit.
- [ ] Add data governance: classification, minimization, retention, redaction, deletion request, vendor policy, and logging policy.
- [ ] Add risk tiers for public summary, internal document search, customer support draft, account change, payment, legal, medical, and security decisions.
- [ ] Add red-team evaluation: jailbreak, indirect injection corpus, exfiltration, RAG permission bypass, tool abuse, and regression suite.
- [ ] Add audit and incident response: required log fields, abuse monitoring, kill switch, model/provider change review, and post-incident review.

**Required Markers:** `trust boundary`, `actor`, `asset`, `source`, `sink`, `instruction hierarchy`, `indirect prompt injection`, `document ACL`, `tenant isolation`, `chunk provenance`, `tool allowlist`, `schema validation`, `human approval`, `dry-run`, `least privilege`, `memory poisoning`, `retention`, `redaction`, `risk tier`, `red team`, `audit log`, `promptHash`, `traceId`, `kill switch`, `incident response`.

---

## Task 8: App Architecture And Operations

**File:** `public/handbook/llm-app-architecture-operations-handbook.html`

**Objective:** Make the document usable for architecture review, production readiness, and incident response.

- [ ] Add operating definition: LLM app success includes latency, cost, quality, safety, and reliability.
- [ ] Expand reference architecture into online path, async path, and control path.
- [ ] Add request lifecycle envelope: request id, tenant id, user id, feature, prompt version, model policy, retrieval policy, trace id, and idempotency key.
- [ ] Add model gateway policy: timeout, retry budget, fallback routing, circuit breaker, provider SLA, and degradation mode.
- [ ] Expand queue/cache/rate limit: job state, exact cache, semantic cache, cache key, TTL, ACL invalidation, quota, and retry storm prevention.
- [ ] Add RAG/tool operations: ingestion freshness, chunk version, ACL filtering, retrieval empty handling, tool allowlist, and side-effect guard.
- [ ] Expand observability into logs, metrics, traces, evals, cost dashboard, quality dashboard, and alert thresholds.
- [ ] Add release management: prompt registry, model/index/schema changes, eval gate, canary rollout, rollback, and A/B test.
- [ ] Add runbooks for latency spike, cost spike, hallucination, JSON failure, retrieval miss, and provider outage.

**Required Markers:** `request_id`, `trace_id`, `tenant_id`, `idempotency_key`, `prompt_version`, `model_version`, `model_gateway`, `retry_budget`, `circuit_breaker`, `fallback_routing`, `semantic_cache`, `cache_key`, `document_acl_version`, `retrieval_empty_rate`, `schema_failure_rate`, `cost_per_successful_answer`, `token_budget`, `quota`, `canary_rollout`, `prompt_rollback`, `production_readiness_checklist`.

---

## Task 9: Portfolio Projects

**File:** `public/handbook/llm-portfolio-projects-handbook.html`

**Objective:** Convert the portfolio document from a project list into a proof-oriented project specification.

- [ ] Add strong vs weak portfolio criteria: demo-only, wrapper-only, no eval, no security, no operations evidence vs measurable system.
- [ ] Add problem statement template with user scenario, document type, success criteria, constraints, and non-goals.
- [ ] Expand document analysis API with input schema, output schema, prompt contract, refusal, uncertainty, and API examples.
- [ ] Expand RAG chatbot with ingestion pipeline, chunking, metadata, retrieval trace, reranking, citation, permission filtering, and no-answer handling.
- [ ] Add evaluation harness: golden dataset, retrieval eval, answer eval, LLM-as-judge rubric, and regression gate.
- [ ] Add operations evidence: latency p95, cost per request, fallback model, budget guardrail, observability, and runbook.
- [ ] Add README evidence pack: architecture diagram, API contract, prompt contract, RAG trace, golden dataset sample, evaluation report, cost/latency table, failure case log, and runbook.
- [ ] Add interview Q&A for pgvector choice, hallucination reduction, LLM-as-judge reliability, RAG debugging, cost control, and security.

**Required Markers:** `weak portfolio vs strong portfolio`, `problem statement`, `user scenario`, `input/output schema`, `prompt contract`, `refusal`, `uncertainty`, `no-answer`, `retrieval trace`, `top-k`, `reranking`, `citation precision`, `permission filtering`, `golden dataset`, `ambiguous`, `adversarial`, `permission-denied`, `hit rate`, `MRR`, `faithfulness`, `LLM-as-judge rubric`, `latency p95`, `cost per request`, `budget guardrail`, `evidence pack`, `interview questions`.

---

## Implementation Order

1. [ ] Strengthen roadmap and fundamentals first. They define vocabulary and quality bar for the rest.
2. [ ] Strengthen prompting and RAG next. These are the main implementation skills.
3. [ ] Strengthen evaluation before portfolio. Portfolio quality depends on measurable evidence.
4. [ ] Strengthen agents, security, and operations. These convert toy apps into production-grade systems.
5. [ ] Strengthen portfolio last, reusing artifacts and quality criteria from all previous documents.
6. [ ] Regenerate documents with `npm run generate:handbook`.
7. [ ] Run `npm test`.
8. [ ] Run `npm run build`.
9. [ ] Run marker checks with `rg` against `public/handbook/llm-*.html`.

## Verification Commands

```bash
npm run generate:handbook
npm test
npm run build
rg "AI NATIVE ROLE BOUNDARY|EMBEDDING MODEL CONTRACT|golden-dataset-fields|tool-schema-hardening|trust boundary|model_gateway|evidence pack" public/handbook/llm-*.html
```

## Non-Goals

- Do not add more menu items during this pass.
- Do not rewrite unrelated backend, frontend, AX, or operations documents.
- Do not rely on broad marketing explanations. The content must stay technical, reviewable, and useful for implementation.
- Do not treat checklist visuals as a substitute for conceptual depth.
