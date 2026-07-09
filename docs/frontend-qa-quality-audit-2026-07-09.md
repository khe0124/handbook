# Frontend Q&A Quality Audit

Date: 2026-07-09

## Scope

Frontend menu Q&A scope contains 7 generated handbooks:

1. `engineering-frontend-core-qa`
2. `engineering-frontend-interaction-qa`
3. `engineering-frontend-motion-qa`
4. `engineering-frontend-graphics-3d-qa`
5. `engineering-frontend-performance-qa`
6. `engineering-frontend-seo-analytics-qa`
7. `engineering-frontend-quality-qa`

Each handbook renders 30 Q&A sections. Total audited scope: 210 Q&A sections.

Source generator:

- `scripts/generate-frontend-qa-handbooks.mjs`

Generated public artifacts:

- `public/handbook/engineering-frontend-*-qa-handbook.html`

App-facing generated artifacts:

- `src/handbook/documents/engineering-frontend-*-qa.ts`
- `src/handbook/searchIndex.mjs`

## Findings

### 1. Follow-up answers are rendered through a shared fallback

The generator stores follow-up questions as strings and renders answers through `answerFollowup(followup, question)`.

This creates repeated answer forms across unrelated topics. The problem is not only wording; it makes the answers feel copied because many answers follow the same structure regardless of whether the topic is accessibility, WebGL, SEO, release, or performance.

Repeated examples found across generated frontend Q&A HTML:

- `묻는 압박 지점`
- `먼저 재현 조건을 고정`
- `판단 기준은 사용자 영향, 변경 빈도, 실패 비용`
- `실제로 어떤 조건에서 깨지는지`
- `답변의 근거를 닫아야`
- `자동화 또는 릴리스 체크`

### 2. Generic title shapes are still present

Several Q&A titles use broad template wording such as:

- `...을 어떻게 설명하나요?`
- `...를 어떻게 설명하나요?`

Some of these can be legitimate interview wording, but in this set they correlate with generated filler answers and should be guarded by tests.

### 3. Domain-specific source content is stronger than rendered follow-up answers

The base `item(...)` records usually include useful fields:

- `decision`
- `failure`
- `evidence`

However, generated follow-up answers often ignore the exact follow-up question and reuse generic answer endings. The quality gap is concentrated in the renderer, not only the question bank.

### 4. Per-document severity

| Document | Sections | Severity | Main issue |
|---|---:|---|---|
| `engineering-frontend-core-qa` | 30 | Severe | broad fallback phrases and mismatched follow-up answers |
| `engineering-frontend-interaction-qa` | 30 | Severe | interaction topics flattened into generic proof language |
| `engineering-frontend-motion-qa` | 30 | Severe | motion answers repeat generic failure/evidence wrappers |
| `engineering-frontend-graphics-3d-qa` | 30 | Severe | WebGL/GPU answers often end in common boilerplate |
| `engineering-frontend-performance-qa` | 30 | Severe | performance follow-ups repeat shared Web Vitals/proof patterns |
| `engineering-frontend-seo-analytics-qa` | 30 | Severe | SEO/analytics answers overuse generic pressure wording |
| `engineering-frontend-quality-qa` | 30 | Severe | release/security follow-ups mix useful rules with boilerplate wrappers |

## Root Cause

The generator's fallback logic is too broad:

- string follow-ups do not carry explicit answers,
- `answerFollowup` selects a rule and then appends a generic sentence,
- unmatched follow-ups fall into broad templates,
- tests currently confirm the pages exist but do not block filler phrases for frontend Q&A.

## Required Fix

1. Strengthen frontend Q&A regression tests.
2. Replace generic answer wrappers with concise domain-specific answer rules.
3. Remove old boilerplate phrases from rendered output.
4. Fail or test against generic title/filler patterns.
5. Regenerate public HTML and app-facing document modules.
