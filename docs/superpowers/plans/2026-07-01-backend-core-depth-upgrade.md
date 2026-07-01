# Backend Core Depth Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Strengthen the `개발 핸드북 > 백엔드 핵심` document so each reviewed weakness is addressed with concrete concepts, failure modes, examples, and verification guidance.

**Architecture:** Update the source handbook `public/handbook/backend-engineering-handbook.html`, then regenerate the integrated document and TypeScript document modules. Add regression tests against `public/handbook/engineering-backend-core-handbook.html` so future regeneration cannot silently remove the new depth.

**Tech Stack:** Static HTML handbook sources, `scripts/generate-engineering-bundles.mjs`, `scripts/handbook-html.mjs`, Node test runner, Vite build.

---

### Task 1: Add Depth Regression Test

**Files:**
- Modify: `scripts/handbook-html.test.mjs`

- [ ] Add a test that reads `public/handbook/engineering-backend-core-handbook.html` and asserts the final integrated document contains markers for all planned upgrades:
  - `SECURITY SUMMARY VS DEEP DIVE`
  - `ISOLATION LEVEL ENGINE NOTES`
  - `JPA ENTITY RELATIONSHIP FAILURE MODES`
  - `SPRING TRANSACTION CODE PATH`
  - `REDIS OPERATIONS FAILURE MODES`
  - `MESSAGING BROKER SEMANTICS`
  - `SPRING TEST SLICE MATRIX`
  - `JVM RUNTIME OPERATIONS PLAYBOOK`
  - `PORTFOLIO SECTION BOUNDARY`

- [ ] Run `npm test -- scripts/handbook-html.test.mjs` and confirm the new test fails before content changes.

### Task 2: Strengthen Backend Source Content

**Files:**
- Modify: `public/handbook/backend-engineering-handbook.html`

- [ ] Add `SECURITY SUMMARY VS DEEP DIVE` near `BE-07` to explain that `BE-07` is a backend-level summary and the later security source is the detailed playbook.
- [ ] Add `ISOLATION LEVEL ENGINE NOTES` to `BE-04` with PostgreSQL/MySQL differences, MVCC, lock wait, deadlock, and Spring default implications.
- [ ] Add `JPA ENTITY RELATIONSHIP FAILURE MODES` to `BE-05` with entity lifecycle, owning side, cascade/orphan removal, equals/hashCode, flush, fetch join pagination, projection, and OSIV guidance.
- [ ] Add `SPRING TRANSACTION CODE PATH` to `BE-03` with servlet thread, filter/interceptor/security filter, proxy boundaries, exception mapping, and code-path review checks.
- [ ] Add `REDIS OPERATIONS FAILURE MODES` to `BE-08` with eviction, persistence, replication/failover, memory pressure, hot keys, Lua atomicity, and fencing token guidance.
- [ ] Add `MESSAGING BROKER SEMANTICS` to `BE-09` with Kafka/RabbitMQ/SQS differences, ordering, partition key, ack/offset, visibility timeout, retry topics, DLQ replay, and schema versioning.
- [ ] Add `SPRING TEST SLICE MATRIX` to `BE-10` with Spring test slice selection and bug-to-test-level mapping.
- [ ] Add `JVM RUNTIME OPERATIONS PLAYBOOK` to `BE-11` with heap/GC/thread dump/container memory/graceful shutdown guidance.
- [ ] Add `PORTFOLIO SECTION BOUNDARY` to `BE-14` to limit the portfolio section to evidence mapping and point detailed interview preparation to career documents.

### Task 3: Regenerate and Verify

**Files:**
- Generated: `public/handbook/engineering-backend-core-handbook.html`
- Generated: `src/handbook/documents/engineering-backend-core.ts`

- [ ] Run `node scripts/generate-engineering-bundles.mjs`.
- [ ] Run `npm run generate:handbook`.
- [ ] Run `npm test -- scripts/handbook-html.test.mjs`.
- [ ] Run `npm test`.
- [ ] Run `npm run build`.

