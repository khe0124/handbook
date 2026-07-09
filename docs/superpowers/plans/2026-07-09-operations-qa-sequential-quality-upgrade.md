# Operations Q&A Sequential Quality Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade every `인프라·운영 Q&A` handbook one document at a time, with no bulk rewrite pass counted as completion.

**Architecture:** Treat each operations Q&A page as a separate quality session. Every session audits one page, rewrites that page's 12 Q&A sections in the source generator, regenerates derived HTML/app documents, and verifies that the page has no repeated answer skeletons or shallow generic answers before moving to the next page.

**Tech Stack:** Node.js generator scripts, static handbook HTML, extracted TypeScript handbook modules, `node --test`, Vite build.

---

## Scope

Target menu scope: all `인프라·운영 Q&A` items.

Total target count:

- 14 Q&A pages
- 168 Q&A sections
- 504 follow-up answers
- Source generator: `scripts/generate-operations-qa-handbooks.mjs`
- Generated public output: `public/handbook/operations-*-qa-handbook.html`
- Generated app documents: `src/handbook/documents/operations-*-qa.ts`
- Catalog/menu source: `src/handbook/catalog.mjs`
- Regression tests: `scripts/handbook-html.test.mjs`

The previous broad pass is considered insufficient because repeated answer skeletons and mechanically assembled Korean sentences remained visible to readers. This plan therefore forbids cross-page bulk completion claims.

## Operations Q&A Work Queue

| Session | Menu Item | Source ID | Public HTML | Sections | Status |
| ---: | --- | --- | --- | ---: | --- |
| 01 | 인프라·운영 로드맵 Q&A | `operations-roadmap-qa` | `public/handbook/operations-roadmap-qa-handbook.html` | 12 | Complete |
| 02 | 서비스 요청 경로 Q&A | `operations-request-path-qa` | `public/handbook/operations-request-path-qa-handbook.html` | 12 | Complete |
| 03 | VPC·Subnet·Routing·NAT Q&A | `operations-vpc-routing-qa` | `public/handbook/operations-vpc-routing-qa-handbook.html` | 12 | Complete |
| 04 | 보안 경계 Q&A | `operations-security-boundary-qa` | `public/handbook/operations-security-boundary-qa-handbook.html` | 12 | Complete |
| 05 | DNS·TLS·도메인 운영 Q&A | `operations-dns-tls-qa` | `public/handbook/operations-dns-tls-qa-handbook.html` | 12 | Complete |
| 06 | VPN·Private Connectivity Q&A | `operations-private-connectivity-qa` | `public/handbook/operations-private-connectivity-qa-handbook.html` | 12 | Complete |
| 07 | CI/CD·Artifact·Environment Q&A | `operations-delivery-pipeline-qa` | `public/handbook/operations-delivery-pipeline-qa-handbook.html` | 12 | Complete |
| 08 | 컨테이너·오케스트레이션·Health Check Q&A | `operations-runtime-orchestration-qa` | `public/handbook/operations-runtime-orchestration-qa-handbook.html` | 12 | Complete |
| 09 | IaC·변경관리·Drift Q&A | `operations-iac-change-qa` | `public/handbook/operations-iac-change-qa-handbook.html` | 12 | Complete |
| 10 | Observability·SLO Q&A | `operations-observability-slo-qa` | `public/handbook/operations-observability-slo-qa-handbook.html` | 12 | Complete |
| 11 | Incident Response·Rollback·DR Q&A | `operations-incident-dr-qa` | `public/handbook/operations-incident-dr-qa-handbook.html` | 12 | Complete |
| 12 | 운영 체크리스트·면접 답변 Q&A | `operations-checklist-interview-qa` | `public/handbook/operations-checklist-interview-qa-handbook.html` | 12 | Complete |
| 13 | AWS·Azure 실전 시나리오 Q&A | `operations-cloud-scenarios-qa` | `public/handbook/operations-cloud-scenarios-qa-handbook.html` | 12 | Complete |
| 14 | AI·LLM 운영 Addendum Q&A | `operations-ai-llm-operations-qa` | `public/handbook/operations-ai-llm-operations-qa-handbook.html` | 12 | Complete |

## Per-Session Quality Bar

Each session must satisfy all checks before the next session starts:

- The page has 12 sections and every section has exactly 3 follow-up Q&A rows.
- Each section title is specific to the operational surface and not a generic mold.
- The primary answer names the decision being made, the first boundary/mechanism, and a failure mode.
- Each follow-up answer directly answers its follow-up question.
- Each follow-up answer includes at least one concrete evidence source or operational artifact.
- No answer may differ only by topic substitution.
- No answer may use awkward generated Korean such as `입니다.내부`, `조정를`, `확정를`, `끊김가`, or `X을 단일 원인`.
- No page-level repeated phrase may appear more than twice unless it is a deliberate domain term.
- The source remains explicit authored data. Do not restore `checks`, `makeQuestion`, fallback answer generation, reusable answer maps, or broad pattern-match answer helpers.

## Session Procedure

Use this exact procedure for every session.

- [ ] **Step 1: Extract the current page from the source generator**

  Read the target page block in `scripts/generate-operations-qa-handbooks.mjs`. Capture the 12 section titles, primary `decision`, primary `failure`, `evidence`, and 36 follow-up answers.

- [ ] **Step 2: Diagnose before editing**

  Write a short session note under `docs/operations-qa-quality-audit-2026-07-09.md` with:

  - repeated phrases found in the target page,
  - shallow answers that do not answer the exact follow-up question,
  - awkward generated Korean,
  - missing evidence or missing operating decision,
  - a page verdict before rewrite.

- [ ] **Step 3: Rewrite only the target page**

  Modify only the matching page object in `scripts/generate-operations-qa-handbooks.mjs`.

  For each of the 12 sections:

  - rewrite the section title if it reads like a template,
  - rewrite `decision` as a page-specific operational judgment,
  - rewrite `failure` as a concrete failure mode,
  - rewrite `evidence` as a concrete artifact packet,
  - rewrite all 3 follow-up answers as authored answers, not generated phrase variants.

- [ ] **Step 4: Regenerate artifacts**

  Run:

  ```bash
  node --check scripts/generate-operations-qa-handbooks.mjs
  node scripts/generate-operations-qa-handbooks.mjs
  npm run generate:handbook
  ```

  Expected:

  - generator syntax passes,
  - 14 operations Q&A public HTML files regenerate,
  - app-facing document modules regenerate.

- [ ] **Step 5: Run target-specific content checks**

  Run:

  ```bash
  npm test -- --test-name-pattern='operations Q&A handbooks'
  ```

  Expected: pass.

  Also run a manual search scoped to the target page:

  ```bash
  rg '입니다\\.내부|조정를|확정를|끊김가|단일 원인|내부 오류로 넘기기 전' public/handbook/<target-file>.html scripts/generate-operations-qa-handbooks.mjs
  ```

  Expected: no awkward generated Korean in the target page. If the broad term `단일 원인` appears, inspect the sentence manually and keep it only if it reads naturally.

- [ ] **Step 6: Human-read sample before marking complete**

  Read at least sections `qa-1`, `qa-6`, and `qa-12` from the generated public HTML. Mark the session incomplete if the answers still feel interchangeable with another operations page.

- [ ] **Step 7: Update status**

  Update the work queue status in this plan from `Pending` to `Complete` only after the session-specific checks pass.

## Regression Plan

The current operations Q&A test already checks:

- 14 operations Q&A pages exist in the menu,
- generator does not use `makeQuestion`,
- generator does not use `checks`,
- rendered sections have exactly 3 follow-up answers,
- follow-up answers are not exact duplicates inside a section,
- normalized semantic answer skeletons do not repeat across the operations Q&A corpus.

As sessions progress, strengthen this test only when it forces real content quality. Do not add tests that merely whitelist current wording or hide repetition.

## Completion Criteria

The whole operations Q&A upgrade is not complete until:

- all 14 sessions are marked `Complete`,
- all 168 sections have been reviewed after generation,
- all 504 follow-up answers have been rewritten or explicitly accepted with evidence,
- `node --check scripts/generate-operations-qa-handbooks.mjs` passes,
- `npm test -- --test-name-pattern='operations Q&A handbooks'` passes,
- `npm test` passes,
- `npm run build` passes,
- the final audit report lists per-page verdicts after rewrite.

## Execution Recommendation

Run one session per user-visible checkpoint. Start with Session 01, finish it fully, report the changed page and verification output, then move to Session 02 only after the user approves continuing or explicitly asks to proceed.
