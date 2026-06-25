# Interview Handbook Design

## Goal

Rework the `Interview` handbook from a single overview page into a set of practical, detailed interview-prep documents. The section should help prepare for senior fullstack technical interviews by organizing questions and answers by domain: frontend, backend, database, infrastructure, operations, distributed systems, system design, project deep dives, and behavioral/pressure questions.

The new content should be a usable handbook, not an index. Each topic must include accurate concepts, interview-ready answers, follow-up questions, and common mistakes.

## Source Material

Use the Markdown files in:

`/Users/haeun/Documents/Obsidian Vault/deep-think/interview`

Primary source files:

- `senior-fullstack-core-20-scripts.md`: 30-second, 90-second, and 3-minute scripts for common senior fullstack questions.
- `questions.md`: broad question bank across frontend, backend, project, product, pressure, and assignment-style interviews.
- `answers.md`: detailed personalized answer material and practical project Q&A.
- `02_technical_interview_qa.md`: frontend technical Q&A with answer core and follow-up questions.
- `04_infra_and_system_knowledge.md`: infrastructure, request flow, CDN, auth, observability, CI/CD, and incident-response material.
- `09_frontend_system_design.md` and `15_system_design_answer_notes.md`: frontend/system-design answer frames.
- `senior-fullstack-knowledge-map.md`: deeper concept map for CS, network, DB, backend, frontend, cache, async, distributed systems, security, infra, and testing.
- `senior-fullstack-mental-model-answers.md`: higher-level conceptual explanations for fullstack reasoning.
- `interview-playbook-final.md`, `mock-interview.md`, and `11_company_mock_interview_scripts.md`: project deep-dive, pressure interview, and behavioral answer patterns.

## Navigation Design

Add the following items under the existing top-level `Interview` group:

1. `interview` — `기술면접 개요`
2. `interview-frontend` — `프론트엔드 면접`
3. `interview-backend-db` — `백엔드·DB 면접`
4. `interview-infra-ops` — `인프라·운영 면접`
5. `interview-distributed` — `분산 시스템 면접`
6. `interview-system-design` — `시스템 설계 면접`
7. `interview-project` — `프로젝트 심층 면접`
8. `interview-behavioral` — `컬처·압박 면접`

This keeps the menu searchable by interview domain without creating a long list of every source Markdown file.

## Shared Q&A Template

Every technical Q&A document should use this repeated structure:

```txt
Q. [Interview question]

핵심 개념
- 정확한 정의
- 왜 면접에서 묻는지
- 실무에서 문제가 되는 지점

30초 답변
- 면접장에서 바로 말할 수 있는 답변

90초 답변
- 개념, 선택 기준, trade-off, 운영 관점

꼬리질문
- Q1 / 답변 방향
- Q2 / 답변 방향
- Q3 / 답변 방향

오답/주의점
- 흔한 오해
- 과장 표현
- 직접 경험이 없을 때 안전한 표현
```

Use tables for compact comparison where useful, but each question must include enough prose to be used as an actual answer script.

## Document Content

### 1. 기술면접 개요

Purpose: explain how to use the interview handbook.

Sections:

- 답변 레벨 구분: 직접 구현, 일부 경험, 설계 지식.
- 30초/90초/3분 답변 길이 조절.
- 좋은 답변의 구조: 결론, 개념, 선택 기준, trade-off, 실패 모드, 경험 증거.
- 면접관이 보는 기준: 정확성, 판단력, 운영 감각, 경험 신뢰도.
- 반복 연습법: 핵심 질문, 꼬리질문, 녹음 회고, 약점 보정.

### 2. 프론트엔드 면접

Target size: 14 to 16 questions.

Questions:

- 브라우저 렌더링 파이프라인을 설명해보세요.
- reflow, repaint, composite 차이는 무엇인가요?
- React 렌더링 최적화는 어떻게 하나요?
- 상태관리는 어떻게 설계하나요?
- 서버 상태와 클라이언트 UI 상태는 왜 분리하나요?
- CSR, SSR, SSG, ISR은 어떻게 선택하나요?
- hydration mismatch는 왜 생기나요?
- Core Web Vitals를 어떻게 설명하고 측정하나요?
- 코드 스플리팅과 번들 최적화는 어떻게 하나요?
- 접근성은 실무에서 어떻게 챙기나요?
- 프론트엔드 보안은 어떻게 보나요?
- 테스트 전략은 어떻게 가져가나요?
- 디자인 시스템은 왜 중요하고 어떻게 운영하나요?
- 대용량 grid나 복잡한 입력 UI에서 성능을 어떻게 다루나요?
- React Flow, Canvas, SVG, DOM 렌더링 차이는 어떻게 설명하나요?

### 3. 백엔드·DB 면접

Target size: 16 to 18 questions.

Questions:

- 좋은 REST API 설계 원칙은 무엇인가요?
- API response를 화면에서 바로 쓰지 않는 이유는 무엇인가요?
- API 스펙이 자주 바뀔 때 어떻게 대응하나요?
- Validation은 프론트와 백엔드 중 어디에서 처리하나요?
- 인증과 인가는 무엇이 다르고 어떻게 설계하나요?
- JWT와 Session은 어떻게 비교하나요?
- RBAC와 ABAC는 어떻게 다르나요?
- 데이터 모델링은 어떤 기준으로 하나요?
- 정규화와 비정규화는 어떻게 판단하나요?
- 인덱스는 어떻게 설계하나요?
- 실행 계획에서 무엇을 보나요?
- 트랜잭션 격리 수준은 어떻게 판단하나요?
- 낙관적 락과 비관적 락은 언제 쓰나요?
- JPA N+1 문제는 왜 생기고 어떻게 해결하나요?
- idempotency key는 왜 필요한가요?
- API versioning과 backward compatibility는 어떻게 관리하나요?

### 4. 인프라·운영 면접

Target size: 12 to 14 questions.

Questions:

- 브라우저에서 서버까지 요청 흐름을 설명해보세요.
- DNS, TCP, TLS, HTTP는 요청에서 어떤 역할을 하나요?
- CDN과 cache-control은 어떻게 설계하나요?
- CORS는 왜 생기고 어떻게 해결하나요?
- Docker와 Kubernetes를 어떻게 설명하나요?
- readiness와 liveness는 어떻게 다르나요?
- CI/CD는 어떻게 보나요?
- 무중단 배포와 rollback은 어떻게 설계하나요?
- 로그, 메트릭, 트레이스는 각각 어떤 역할을 하나요?
- RED/USE, Golden Signals는 무엇인가요?
- 장애가 나면 무엇부터 확인하나요?
- postmortem에는 무엇을 남겨야 하나요?

### 5. 분산 시스템 면접

Target size: 10 to 12 questions.

Questions:

- 캐시는 왜 어렵나요?
- cache invalidation 전략은 어떻게 잡나요?
- 비동기 처리는 언제 쓰나요?
- 큐를 쓰면 어떤 운영 문제가 생기나요?
- retry, timeout, backoff는 어떻게 설계하나요?
- idempotency는 왜 분산 시스템에서 중요한가요?
- consistency와 availability는 어떻게 판단하나요?
- eventual consistency를 사용자에게 어떻게 설명하거나 보정하나요?
- Saga와 Outbox는 왜 쓰나요?
- microservices는 언제 적절하고 언제 과한가요?
- degraded mode와 circuit breaker는 언제 필요한가요?

### 6. 시스템 설계 면접

Target size: 8 to 10 scenarios.

Scenarios:

- 관리자 대시보드를 설계해보세요.
- 대형 Data Grid 입력 시스템을 설계해보세요.
- Excel 업로드와 validation 시스템을 설계해보세요.
- 무한 스크롤 피드를 설계해보세요.
- 실시간 대시보드를 설계해보세요.
- 복잡한 multi-step form을 설계해보세요.
- 인증 기반 앱을 설계해보세요.
- 운영 장애 복구용 admin tool을 설계해보세요.
- 글로벌 다국어 서비스를 설계해보세요.

Each scenario should include:

- 요구사항 확인 질문.
- 데이터 모델.
- API contract.
- frontend state strategy.
- backend/DB considerations.
- performance/security/accessibility/observability.
- trade-offs and follow-up questions.

### 7. 프로젝트 심층 면접

Target size: 10 to 12 project questions.

Questions:

- 가장 복잡했던 프로젝트를 설명해보세요.
- 복잡한 B2B 도메인을 어떻게 학습했나요?
- Excel, Key-in, Data Grid 입력을 단일 상태로 통합한다는 것은 무엇인가요?
- Data Grid column definition을 어떻게 관리했나요?
- validation error를 cell, row, page 단위로 어떻게 보여줬나요?
- Flow Editor의 node/edge 상태는 어떻게 관리했나요?
- React Flow 성능 문제는 어떻게 봐야 하나요?
- API 전환 프로젝트에서 무엇이 어려웠나요?
- 중복 요청이나 무한 렌더링은 어떻게 디버깅했나요?
- 파일 업로드/다운로드 이슈는 어떻게 해결했나요?
- i18n key와 Storybook은 어떻게 운영했나요?
- 프론트엔드 중심 지원자가 백엔드/API 질문을 받을 때 어떻게 답하나요?

The wording should be general enough to avoid exposing private details, but concrete enough to be directly useful in interview practice.

### 8. 컬처·압박 면접

Target size: 12 to 15 questions.

Questions:

- 자기소개를 해주세요.
- 왜 이직하려고 하나요?
- 왜 우리 회사인가요?
- 가장 자랑스러운 프로젝트는 무엇인가요?
- 실패했던 기술 선택은 무엇인가요?
- 일정이 부족할 때 어떻게 대응하나요?
- 협업 갈등은 어떻게 해결했나요?
- 과한 설계라는 피드백을 받으면 어떻게 하나요?
- 멘토링이나 리더십 경험이 있나요?
- 본인을 상급 개발자라고 볼 수 있는 근거는 무엇인가요?
- 직접 해본 게 맞나요?
- 수치가 있나요?
- 그 구조가 과한 것 아닌가요?
- 백엔드 경험이 부족한 것 아닌가요?
- 마지막으로 하고 싶은 말은 무엇인가요?

## UX Notes

The current handbook UI can support this with the existing left TOC and table/card styles. Do not add new complex UI. Keep the implementation content-focused.

Each document should be dense but scannable:

- Short hero explaining what the document is for.
- TOC entries grouped by question number.
- Tables for quick comparison.
- Serial cards for answer scripts.
- Callouts for warning, safe wording, or interview framing.

## Implementation Scope

Update:

- `src/handbook/catalog.mjs`
- `src/handbook/documentLoaders.ts`
- `src/handbook/practicalExamples.ts`
- `scripts/handbook-html.test.mjs`

Create or replace:

- `public/handbook/interview-handbook.html`
- `public/handbook/interview-frontend-handbook.html`
- `public/handbook/interview-backend-db-handbook.html`
- `public/handbook/interview-infra-ops-handbook.html`
- `public/handbook/interview-distributed-handbook.html`
- `public/handbook/interview-system-design-handbook.html`
- `public/handbook/interview-project-handbook.html`
- `public/handbook/interview-behavioral-handbook.html`

Then regenerate generated modules with `npm run generate:handbook`.

## Testing

Run:

- `npm test`
- `npm run build`

Expected:

- Catalog tests include the new Interview sub-items.
- Every new Interview item has a source HTML file, generated TS document module, loader entry, and practical example.
- Vite build creates chunks for all new Interview documents.
