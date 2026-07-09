# Backend Q&A Quality Audit 2026-07-09

## Scope

Backend menu Q&A items audited:

| Item | File | Questions | Overall |
|---|---|---:|---|
| Backend Core Q&A | `public/handbook/engineering-backend-core-qa-handbook.html` | 30 | C |
| Backend Auth/Security Q&A | `public/handbook/engineering-backend-auth-security-qa-handbook.html` | 30 | C- |
| Backend Architecture Q&A | `public/handbook/engineering-backend-architecture-qa-handbook.html` | 30 | C- |
| Data Layer Q&A | `public/handbook/engineering-data-qa-handbook.html` | 30 | C- |
| Runtime Quality Q&A | `public/handbook/engineering-runtime-quality-qa-handbook.html` | 30 | C- |
| Platform Tools Q&A | `public/handbook/engineering-platform-tools-qa-handbook.html` | 30 | C- |
| Java/Spring/JPA Q&A | `public/handbook/engineering-java-spring-qa-handbook.html` | 30 | C |

Total: 7 documents, 210 questions.

## Root Cause

The quality problem is structural, not a few bad sentences.

1. `coverageQ()` creates Q13-Q30 for each page with the same three follow-up shapes.
2. `answerFollowup()` returns generic fallback answers when no specific rule matches.
3. Q1-Q4 on several pages have legitimate follow-up questions, but no matching rule, so the fallback repeats the main answer sentence and adds generic rubric language.
4. Q13-Q30 often have usable main answers, but their follow-up answers are not topic-specific.

This means the rendered pages look large, but many rows do not answer the actual question.

## Cross-Document Pattern

Common repeated answer fragments:

- `답변에는 선택 기준, 실패 모드, 검증 증거가 함께 있어야 합니다`
- `이 주제를 용어 정의나 장점만으로 끝내면 위험합니다`
- `실제 답변에서는 동시성, 권한, 배포, 장애 복구 중 어떤 조건에서 깨지는지 하나를 골라 설명해야 합니다`
- `검증 패킷에는 ... 들어가야 합니다. 코드 의도만 말하지 말고 테스트 결과, 설정 readback, 로그·지표 샘플, rollback 조건 중 최소 하나로 실제 상태를 확인합니다`
- `문제 규모가 작거나 실패 영향이 낮고 팀이 운영 비용을 감당하지 못하면 보류합니다`

These fragments are useful as rubric language, but they should not be shipped as answers to concrete follow-up questions.

## Document Findings

### Backend Core Q&A

Overall: C / partial pass.

Working range:
- Q01-Q12 are mostly usable.
- Main answers and follow-up answers are specific for API state changes, transaction boundaries, traceId, idempotency, pagination, partial failure, and PR evidence.

Problem range:
- Q13-Q30 are mostly generated coverage questions.
- Q23-Q26 and Q28 are especially mismatched because the generic "concurrency, auth, deploy, recovery" language does not fit payload size, cache, null contracts, logging policy, or input normalization.
- Q30 has a generated/self-referential title pattern.

Priority:
1. Rewrite Q23-Q26, Q28, Q30.
2. Rewrite all Q13-Q22, Q27, Q29 follow-up questions and answers.
3. Lightly enrich Q01-Q12 with concrete evidence examples.

### Backend Auth/Security Q&A

Overall: C- / partial pass.

Failures:
- Q01-Q04: follow-up answers repeat the main answer and do not answer 401/403/404, token reuse handling, export IDOR, SSRF redirect, or webhook event id questions.
- Q21: duplicate answer used for both operational risk and verification packet.

Working range:
- Q05-Q12 are mostly usable: CSRF/CORS, JWT/server state, password storage, RBAC/ABAC/ReBAC, export API, webhook, audit log, rate limit.

Problem range:
- Q13-Q20 and Q22-Q30 use generic titles and templated follow-up answers.
- Missing security-specific detail: state/nonce, redirect URI exact match, JWKS rotation, MFA recovery abuse, session id regeneration, cookie prefix/scope, SSRF DNS rebinding, secret rotation evidence, permission cache invalidation, CSP rollout, replay nonce TTL.

Priority:
1. Rewrite Q01-Q04 and Q21.
2. Rewrite Q13-Q20 with security-specific follow-ups.
3. Rewrite Q22-Q30 around abuse case, negative fixture, audit evidence, and readback.
4. Add evidence detail to Q05-Q12.

### Backend Architecture Q&A

Overall: C- / partial pass.

Failures:
- Q01-Q03: follow-up answers repeat generic fallback and miss shared DB coupling, team/service boundary, event schema deletion, ordering, and projection lag UX.

Working range:
- Q05-Q12 are mostly strong: modular monolith, shared libraries, CQRS, event sourcing, sync vs async, data ownership, ADR expiry, ACL.

Problem range:
- Q13-Q30 are generic template follow-ups.
- Important architecture topics need concrete trade-off answers: layered leakage, hexagonal abstraction cost, aggregate size, outbox relay failure, distributed monolith, schema evolution, architecture diagram evidence, team ownership mismatch.

Priority:
1. Rewrite Q01-Q04.
2. Rewrite Q19, Q21, Q24, Q27, Q28, Q30.
3. Rewrite remaining Q13-Q18, Q20, Q22-Q23, Q25-Q26, Q29.
4. Add evidence examples to Q05-Q12.

### Data Layer Q&A

Overall: C- / partial pass.

Failures:
- Q01-Q04: all follow-ups use fallback repetitions and miss EXPLAIN vs ANALYZE, MVCC/vacuum symptoms, read replica failover, Redis lock/TTL/cache miss questions.

Working range:
- Q05-Q12 are usable: indexes, isolation, deadlock, expand/migrate/contract, cache invalidation, Redis as source of truth, reconciliation query, DB pool.

Problem range:
- Q13-Q30 use coverage templates.
- Missing detail in partitioning, sharding, query plan regression, Redis key design, cache stampede, Redis distributed lock, eviction, migration rollback, read-only mode, metric packets.

Priority:
1. Rewrite Q01-Q04.
2. Rewrite Redis-heavy Q24-Q27.
3. Rewrite partition/sharding/query plan/count Q17-Q18 and Q22-Q23.
4. Rewrite Q13-Q16, Q20-Q21, Q28-Q30.
5. Enrich Q05-Q12 with DB-specific detail.

### Runtime Quality Q&A

Overall: C- / partial pass.

Failures:
- Q01-Q04: p99, retry, DLQ, postmortem follow-ups do not answer the specific questions.
- Q21 and Q30 are weak/meta/template-heavy.

Working range:
- Q06-Q10 and Q12 are mostly usable: health checks, alert fatigue, backpressure, runbook, trace/log.

Problem range:
- Q13-Q30 have generated follow-up patterns.
- Missing concrete triage order, evidence, threshold, and mitigation for RED/USE, p95/p99, thread pool, GC, connection pool, timeout propagation, replay, lag, incident command, rollback thresholds, degraded mode, ordering, idempotent consumers.

Priority:
1. Rewrite Q01-Q04.
2. Rewrite Q21, Q30.
3. Rewrite Q13-Q20 around actual incident triage sequence.
4. Rewrite Q22-Q30 around review gates and evidence packets.
5. Enrich Q05-Q12 with metrics and example thresholds.

### Platform Tools Q&A

Overall: C- / partial pass.

Failures:
- Q01-Q04: Dockerfile, deployment, NGINX/proxy, and runbook follow-ups repeat main answer or generic triage text.

Working range:
- Q05-Q12 are strong: secret leak, OOMKilled, env var debugging, NGINX 502/504, Git history, direct server change, artifact reproducibility, local vs CI.

Problem range:
- Q13-Q30 use generic follow-up patterns.
- Missing concrete operational evidence: Docker cache layer risks, runtime image verification, probe distinctions, volume backup, `ss`/`lsof`, disk inode, trusted proxy, TLS/SNI, build once deploy many, secret scopes, NGINX log fields, readback, config drift, canary segment coverage, rollback stop point.

Priority:
1. Rewrite Q01-Q04.
2. Rewrite Q25-Q28.
3. Rewrite Q20-Q24.
4. Rewrite Q13-Q19 and Q29-Q30.
5. Add command/readback examples to Q05-Q12.

### Java/Spring/JPA Q&A

Overall: C / partial pass.

Failures:
- Q01-Q04: follow-ups repeat the main answer and do not answer private transaction methods, readOnly, REQUIRES_NEW, rollback after flush, bulk stale state, OSIV, fetch join pagination, OOM vs leak, thread dump, or GC tuning.

Working range:
- Q07-Q12 are strong: bulk update, propagation, rollback exception rules, thread pool sizing, entity equality, validation.
- Q05-Q06 are usable but can be enriched.

Problem range:
- Q13-Q30 use generic templates.
- Missing topic-specific detail for Optional, record, collections, exception hierarchy, bean lifecycle, configuration properties, MVC pipeline, security filter chain, repository methods, callbacks, caches, cascade/orphanRemoval, fetch join pagination, test slices, Testcontainers, Actuator, lazy equality.

Priority:
1. Rewrite Q01-Q04.
2. Rewrite Q26 because generic operational-risk wording is especially mismatched for test slices.
3. Rewrite Q13-Q30 with Java/Spring internal mechanism and evidence.
4. Enrich Q05-Q12 with test/log examples.

## Quality Bar For Rewrite

Every Q&A item must satisfy:

1. Main answer gives a direct conclusion and mechanism.
2. Each follow-up answer responds to that specific follow-up, not the parent topic.
3. Follow-up answers within one question are not identical or near-identical.
4. Evidence is concrete: test fixture, metric, log field, command output, SQL plan, audit query, ADR, runbook, or dashboard.
5. Generic rubric language may appear in the guide/rubric sections, never as a row answer.
6. Generated "coverage" titles such as `X: 리뷰에서 어떤 기준으로 판단하나요?` are allowed only if the follow-ups are topic-specific and answerable. Prefer natural question titles.

