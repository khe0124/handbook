# AI Native 핸드북 전면 보강 계획

작성일: 2026-07-01  
기준 문서: `docs/ai-native-handbook-review-2026-07-01.md`  
목표: 현재 핸드북을 "좋은 지식 베이스"에서 "AI Native 역량을 실제로 훈련하고 검증하는 커리큘럼"으로 전환한다.

## 1. 보강 원칙

이번 보강의 핵심은 문서 수를 무작정 늘리는 것이 아니다. 이미 핸드북은 충분히 넓고, 일부 문서는 상당히 깊다. 부족한 것은 학습자가 실제로 강해졌는지 확인할 수 있는 구조다.

따라서 모든 보강은 아래 원칙을 따른다.

1. 공식 경로를 하나로 만든다.
2. 읽기 문서를 실습 산출물로 연결한다.
3. AI Native 역량을 측정 가능한 매트릭스로 만든다.
4. LLM, AX, 운영, 보안, 디자인, 커리어를 서로 끊어진 항목이 아니라 하나의 제품 개발 루프로 묶는다.
5. 각 큰 항목마다 "완료 증거"를 남기게 한다.
6. 기존 강점은 유지하고, 중복/레거시/비노출 문서의 혼선을 제거한다.

## 2. 최종 목표 구조

보강 완료 후 이 프로젝트는 다음 구조를 가져야 한다.

```text
홈
  - 공식 학습 경로
  - 수준별 진단
  - AI Native 역량 매트릭스
  - 트랙별 바로가기

개발 핸드북
  - 기본기
  - 프론트엔드
  - 백엔드·데이터
  - 운영 품질
  - Java/Spring 사례
  - 각 묶음별 완료 산출물

LLM
  - 모델/프롬프트/RAG/평가/에이전트/보안/운영
  - 평가 하네스 랩
  - 보안 레드팀 fixture
  - Agent runtime 구현
  - 포트폴리오 증거화

인프라·운영
  - 일반 운영
  - AI/LLM 운영 addendum
  - LLM 사고 대응 시나리오
  - 관측성 지표와 runbook

AX 실무
  - AX 기반
  - 실행 루프
  - 자동화/하네스
  - 멀티에이전트/검증
  - 거버넌스
  - episode package

디자인 실무
  - 문제와 흐름
  - 디자인 시스템
  - AI 제품 UX
  - 신뢰/불확실성/휴먼 핸드오프

실무 도구
  - 치트시트
  - 작업 루프
  - 빌드/릴리스
  - AI Native 템플릿 키트

면접·커리어
  - 기존 커리어/면접
  - AI Native 포트폴리오 트랙
  - evidence pack
```

## 3. 우선순위 요약

| 우선순위 | 보강 영역 | 목적 | 결과물 |
| --- | --- | --- | --- |
| P0 | 공식 정보 구조 정리 | 앱 메뉴와 정적 문서의 불일치 제거 | 단일 공식 메뉴, 레거시 상태 표시 |
| P0 | 홈/역량 매트릭스 | 학습자가 자기 위치와 경로를 판단 | 진단표, 트랙, 완료 산출물 |
| P0 | AI Native 실습 랩 | 읽기 중심을 훈련 중심으로 전환 | 랩 문서, fixture, pass criteria |
| P1 | LLM 평가 하네스 | 품질 판단을 자동화/반복화 | dataset, runner, CI gate 설계 |
| P1 | 보안 레드팀 | 공격을 재현하고 방어를 검증 | security fixtures, 테스트 기준 |
| P1 | Agent runtime 구현 | 도구 호출을 통제 가능한 시스템으로 설계 | adapter, approval, audit, replay |
| P1 | AI 제품 UX | AI 품질/불확실성을 UI로 연결 | UX 패턴, copy, handoff flow |
| P1 | 실무 템플릿 키트 | 매일 쓰는 산출물 표준화 | context/eval/security/episode 템플릿 |
| P2 | 운영 addendum | 일반 SLO와 LLM SLI 연결 | LLM runbook, incident drill |
| P2 | 커리어 트랙 | 역량을 과장 없는 증거로 전환 | AI Native evidence pack |

## 4. Phase 0: 정보 구조 정리

### 4.1 목표

사용자가 앱, 정적 HTML, 홈, 카탈로그 중 어디로 진입해도 같은 공식 구조를 보게 만든다. 현재 가장 위험한 문제는 콘텐츠 부족이 아니라 공식 경로의 혼선이다.

### 4.2 작업 항목

#### 4.2.1 공식 노출 카탈로그와 생성용/아카이브 카탈로그 분리

대상:

- `src/handbook/catalog.mjs`

작업:

- `HANDBOOK_GROUPS`에 들어가는 배열을 공식 노출 카탈로그로 명확히 표시한다.
- 기존 `FRONTEND_HANDBOOKS`, `BACKEND_HANDBOOKS`, `NETWORK_HANDBOOKS`, `DEVOPS_HANDBOOKS`, `AX_HANDBOOKS`, `DESIGN_HANDBOOKS`, `CHEAT_SHEETS`, `PRACTICAL_GUIDES`, `INTERVIEW_HANDBOOKS`, `PERSONAL_HANDBOOKS`는 상태를 분류한다.
- 분류는 아래 중 하나로 통일한다.
  - `official`: 현재 앱 메뉴에 노출
  - `sourceOnly`: 통합 문서 생성의 원천
  - `archive`: 과거 메뉴 또는 참고 문서
  - `planned`: 앞으로 복원/확장 예정
- 문서 객체에 상태 메타데이터를 추가할 수 없다면 배열 선언부에 명시 주석을 둔다.

수용 기준:

- 새 문서를 추가할 때 어느 배열에 넣어야 하는지 파일만 보고 판단 가능하다.
- 비노출 문서가 왜 남아 있는지 설명되어 있다.
- `HANDBOOK_ITEMS`와 앱 라우팅 문서 수가 일치한다.

#### 4.2.2 정적 인덱스 재정렬

대상:

- `public/handbook/index.html`
- 정적 인덱스를 생성하는 스크립트가 있다면 해당 스크립트

작업:

- 정적 인덱스의 대분류를 현재 공식 앱 메뉴와 맞춘다.
- 구 메뉴인 Frontend, Backend, Network, DevOps, Design, AX 분류가 공식 메뉴처럼 보이지 않게 한다.
- 필요하다면 "아카이브 문서" 섹션을 별도로 둔다.

수용 기준:

- 앱 사이드바와 정적 인덱스의 그룹명이 일치한다.
- 사용자가 정적 인덱스로 들어와도 동일한 학습 경로를 본다.

#### 4.2.3 공식/아카이브 문서 표시

대상:

- 문서 생성 스크립트
- 아카이브 HTML 문서

작업:

- 공식 메뉴에 없는 HTML 문서 상단에 상태 배지를 넣는다.
- 예: `아카이브 문서`, `통합 전 원본`, `참고용 세부 문서`.
- 공식 문서에는 현재 그룹과 다음 추천 문서를 표시한다.

수용 기준:

- 사용자가 현재 읽는 문서가 공식 경로인지 알 수 있다.
- 구 문서가 최신 경로인 것처럼 오해되지 않는다.

## 5. Phase 1: 홈을 커리큘럼 허브로 재설계

### 5.1 목표

홈을 단순 소개 페이지가 아니라 전체 핸드북의 학습 운영판으로 만든다.

### 5.2 홈에 추가할 섹션

#### 5.2.1 빠른 자기 진단

질문 예시:

| 질문 | 초급 신호 | 실무 가능 신호 | AI Native 신호 |
| --- | --- | --- | --- |
| AI가 생성한 코드를 검증할 수 있는가 | 실행만 해본다 | 테스트와 타입으로 확인한다 | 실패 원인을 재현하고 수정 지시를 구조화한다 |
| LLM 기능 품질을 측정할 수 있는가 | 샘플 몇 개로 본다 | golden set을 만든다 | 회귀 gate와 운영 지표를 연결한다 |
| 에이전트 도구 호출을 통제할 수 있는가 | 호출 성공 여부만 본다 | schema와 approval을 둔다 | audit/replay/rollback까지 설계한다 |
| AI 기능 장애를 대응할 수 있는가 | 프롬프트를 고친다 | runbook을 따른다 | SLI, fallback, incident packet을 남긴다 |

수용 기준:

- 사용자가 자기 수준을 `입문`, `실무 가능`, `독립 운영 가능`, `리드 가능` 중 하나로 판단할 수 있다.
- 진단 결과가 추천 트랙과 연결된다.

#### 5.2.2 공식 학습 트랙

홈에 다음 5개 트랙을 노출한다.

1. 입문 트랙
2. 풀스택 제품 개발 트랙
3. AI Native 제품 트랙
4. AX 작업 체계 트랙
5. 커리어 증거화 트랙

각 트랙에 포함할 것:

- 읽을 문서 순서
- 예상 산출물
- 완료 기준
- 다음 트랙 연결

수용 기준:

- 초보자가 "무엇부터 읽을지" 다시 판단하지 않아도 된다.
- AI Native 목표 사용자가 LLM/AX/운영/포트폴리오를 한 경로로 따라갈 수 있다.

#### 5.2.3 완료 산출물 지도

홈에 그룹별 산출물 지도를 둔다.

| 그룹 | 완료 산출물 |
| --- | --- |
| 개발 핸드북 | 기능 설계 메모, API 계약서, DB 변경 계획, 테스트 리포트 |
| LLM | prompt contract, eval dataset, retrieval report, security report |
| 운영 | SLO 초안, dashboard spec, incident runbook, rollback plan |
| AX | context package, agent episode log, failure taxonomy |
| 디자인 | problem brief, flow map, state matrix, handoff packet |
| 실무 도구 | 템플릿 모음, 작업 체크리스트 |
| 커리어 | evidence pack, STAR 답변, portfolio README |

수용 기준:

- 모든 큰 그룹이 "읽었다"가 아니라 "남긴 산출물"로 끝난다.

## 6. Phase 2: AI Native 역량 매트릭스 추가

### 6.1 목표

AI Native 역량을 추상 구호가 아니라 평가 가능한 기준으로 만든다.

### 6.2 신규 문서

추가 문서:

- `practice-ai-native-competency-map`

추천 메뉴 위치:

- `실무 도구` 또는 홈 바로가기
- 더 강하게 가려면 별도 `AI Native 훈련` 그룹 신설

### 6.3 문서 구성

#### 6.3.1 역량 축

| 역량 | 설명 | 대표 증거 |
| --- | --- | --- |
| 소프트웨어 기본기 | AI가 만든 코드를 검증할 수 있는 기반 | 테스트, 타입, 디버깅 노트 |
| 제품 문제 정의 | 만들 기능의 사용자 문제와 성공 기준을 정의 | problem brief, flow map |
| LLM 설계 | prompt, schema, context, fallback 설계 | prompt contract |
| RAG/검색 품질 | retrieval 품질을 측정하고 개선 | retrieval eval report |
| 평가 하네스 | 모델/프롬프트 변경을 회귀 검증 | eval dataset, CI gate |
| 보안 | injection, 권한, 데이터 유출을 방어 | red-team report |
| Agent runtime | 도구 호출, 승인, 감사, 재생을 통제 | agent trace, approval ledger |
| 운영 | 비용, 지연, 실패율, fallback을 운영 | dashboard, runbook |
| AX 루프 | AI와 협업하는 작업 체계를 운영 | episode log, context package |
| 디자인/신뢰 | AI 결과의 불확실성과 책임을 UX에 반영 | AI UX flow |
| 증거화 | 역량을 포트폴리오와 면접 증거로 변환 | evidence pack |

#### 6.3.2 수준 기준

각 역량은 4단계로 정의한다.

| 수준 | 기준 |
| --- | --- |
| L1 입문 | 개념을 설명하고 작은 예제를 따라 할 수 있다 |
| L2 실무 가능 | 제한된 기능을 구현하고 기본 검증을 할 수 있다 |
| L3 독립 운영 가능 | 실패 모드, 운영 지표, 보안 경계를 포함해 책임질 수 있다 |
| L4 리드 가능 | 팀 표준, 리뷰 기준, 자동화, 거버넌스를 설계할 수 있다 |

#### 6.3.3 평가 방식

각 역량에는 아래를 둔다.

- 필수 문서
- 필수 실습
- 제출 산출물
- 리뷰 질문
- 실패 신호
- 통과 기준

수용 기준:

- 학습자가 자신의 AI Native 역량을 체크리스트가 아니라 증거 기준으로 평가할 수 있다.

## 7. Phase 3: AI Native 실습 랩 구축

### 7.1 목표

핸드북의 중심을 "문서를 읽는다"에서 "실패를 통과한다"로 옮긴다.

### 7.2 신규 문서

추가 문서:

- `practice-ai-native-labs`

추천 위치:

- `실무 도구`의 첫 번째 또는 두 번째 항목
- 또는 신규 `AI Native 훈련` 그룹의 핵심 항목

### 7.3 랩 구성 원칙

모든 랩은 같은 구조를 따른다.

```text
문제 상황
입력 fixture
목표 동작
실패 모드
구현/분석 과제
제출 산출물
통과 기준
리뷰 질문
확장 과제
```

### 7.4 필수 랩 목록

#### Lab 1. Prompt/schema contract regression

목표:

- 모델 출력이 기대 schema를 안정적으로 만족하는지 검증한다.

입력:

- 정상 요청 10개
- 애매한 요청 5개
- schema를 깨기 쉬운 요청 5개

산출물:

- prompt contract
- JSON schema
- regression result
- failure analysis

통과 기준:

- schema success rate 기준 충족
- 실패 케이스가 분류되어 있음
- 수정 전/후 결과가 비교되어 있음

#### Lab 2. RAG retrieval evaluation

목표:

- chunking, retrieval, reranking, citation 품질을 측정한다.

입력:

- 작은 문서 corpus
- 질문 30개
- expected evidence span

산출물:

- retrieval eval dataset
- recall/precision report
- groundedness analysis
- chunking 개선 기록

통과 기준:

- top-k evidence recall 기준 충족
- citation이 실제 근거를 가리킴
- hallucination 사례가 재현됨

#### Lab 3. LLM security red-team

목표:

- prompt injection, tool injection, 권한 우회, 데이터 유출을 fixture로 검증한다.

입력:

- 직접 injection
- 간접 injection 문서
- 악성 tool argument
- cross-tenant 질문
- PII 포함 eval row

산출물:

- threat model
- red-team result
- blocked/allowed decision log
- mitigation patch note

통과 기준:

- 공격 유형별 차단/허용 기준이 설명됨
- 로그에 차단 근거가 남음
- 회귀 테스트로 재실행 가능

#### Lab 4. Agent tool approval and idempotency

목표:

- 에이전트 도구 호출을 승인, 재시도, 감사 가능한 형태로 만든다.

입력:

- 읽기 도구
- 쓰기 도구
- 위험 도구
- 재시도 가능한 실패
- 재시도하면 안 되는 실패

산출물:

- tool schema
- approval policy
- idempotency key design
- audit trace
- replay log

통과 기준:

- 위험 도구는 승인 없이는 실행되지 않음
- 같은 요청 재시도 시 중복 부작용이 없음
- episode replay가 가능함

#### Lab 5. LLM observability and incident drill

목표:

- AI 기능을 운영 지표와 장애 대응으로 연결한다.

입력:

- latency spike
- cost spike
- schema failure increase
- provider outage
- retrieval quality drop

산출물:

- dashboard spec
- SLI/SLO definition
- incident packet
- rollback/fallback plan

통과 기준:

- 사용자 영향이 설명됨
- 탐지 지표와 대응 runbook이 연결됨
- 회고에 재발 방지 항목이 있음

#### Lab 6. AX episode package

목표:

- AI와 협업한 작업을 재현 가능한 에피소드로 남긴다.

입력:

- 기능 변경 요청
- 코드베이스 컨텍스트
- 제약 조건
- 검증 명령

산출물:

- context package
- task spec
- agent transcript summary
- verification log
- reviewer memo

통과 기준:

- 제3자가 에피소드를 읽고 같은 판단을 할 수 있음
- AI의 판단과 사람의 검증이 분리되어 있음
- 실패와 수정 루프가 남아 있음

## 8. Phase 4: LLM 문서 보강

### 8.1 목표

LLM 문서의 개념 강점을 유지하면서 실행 가능한 구현/운영 기준을 추가한다.

### 8.2 신규/보강 문서 목록

| 문서 | 유형 | 목적 |
| --- | --- | --- |
| `llm-evaluation-harness-lab` | 신규 | 평가 하네스 구현 |
| `llm-security-red-team-fixtures` | 신규 | 공격 fixture와 방어 검증 |
| `llm-agent-runtime-implementation` | 신규 | 에이전트 런타임 구현 |
| `llm-app-architecture-operations` | 보강 | LLM 운영 SLI와 incident drill |
| `llm-portfolio-projects` | 보강 | 실습 랩 결과를 포트폴리오 증거로 연결 |

### 8.3 `llm-evaluation-harness-lab` 상세 목차

```text
1. 평가 하네스가 필요한 이유
2. 평가 대상 정의: prompt, retrieval, tool, policy
3. eval dataset schema
4. baseline/candidate 비교
5. judge calibration
6. metric threshold 설정
7. CI gate 연결
8. relabel workflow
9. eval report 작성법
10. 포트폴리오 증거로 남기는 법
```

필수 산출물:

- `eval-dataset.jsonl`
- `eval-config.yaml`
- `eval-result.md`
- `failure-analysis.md`

### 8.4 `llm-security-red-team-fixtures` 상세 목차

```text
1. LLM 보안 테스트의 목적
2. 직접 prompt injection
3. 간접 prompt injection
4. tool injection
5. memory poisoning
6. cross-tenant leakage
7. log exfiltration
8. connector permission misuse
9. eval dataset PII leakage
10. 회귀 테스트로 고정하기
```

필수 산출물:

- `security-fixtures.jsonl`
- `threat-model.md`
- `red-team-report.md`
- `mitigation-log.md`

### 8.5 `llm-agent-runtime-implementation` 상세 목차

```text
1. agent runtime의 책임
2. tool adapter interface
3. planner output validation
4. approval policy
5. sandbox/network permission
6. idempotency key
7. audit ledger
8. replay trace
9. memory purge
10. MCP/plugin trust boundary
11. 운영 지표와 실패 대응
```

필수 산출물:

- `tool-contract.md`
- `approval-policy.yaml`
- `agent-episode-log.md`
- `replay-trace.json`
- `runtime-risk-review.md`

## 9. Phase 5: AX 실무 보강

### 9.1 목표

AX를 이 프로젝트의 차별화된 핵심 역량으로 더 선명하게 만든다.

### 9.2 보강 방향

현재 AX는 3개 번들로 압축되어 있다. 이 구조는 읽기에는 편하지만, 심화 항목이 묻힌다. 따라서 두 가지 중 하나를 선택한다.

선택지 A: 현재 3개 번들을 유지하되 내부 첫 화면에 세부 지도를 추가한다.  
선택지 B: `AX 심화` 하위 그룹을 공식 메뉴에 추가한다.

추천은 A부터 시작하는 것이다. 메뉴가 지나치게 커지는 것을 막으면서도 숨겨진 세부 항목을 드러낼 수 있다.

### 9.3 AX 번들 내부에 추가할 지도

| 세부 역량 | 연결 문서/섹션 | 산출물 |
| --- | --- | --- |
| AX 개요 | 기반 문서 | AX 적용 범위 메모 |
| 컨텍스트 패키징 | 실행 루프 | `context-package.yaml` |
| 자동화 하네스 | 실행 루프 | `harness-checklist.md` |
| 멀티에이전트 | 확장/거버넌스 | role split plan |
| 검증 루프 | 실행/확장 | verification log |
| 거버넌스 | 확장/거버넌스 | approval policy |

### 9.4 AX 완료 기준

AX 트랙을 완료한 사용자는 아래를 제출해야 한다.

- context package
- task spec
- agent episode log
- verification log
- failure taxonomy
- reviewer memo
- approval trace

수용 기준:

- AI에게 일을 맡긴 과정과 사람이 검증한 과정이 분리되어 있다.
- 실패 원인이 프롬프트, 컨텍스트, 도구, 테스트, 판단 중 어디인지 분류되어 있다.

## 10. Phase 6: 디자인 실무 보강

### 10.1 목표

AI Native 제품에서 디자인을 "화면 꾸미기"가 아니라 신뢰, 불확실성, 검토 흐름을 설계하는 역량으로 확장한다.

### 10.2 신규 문서

추가 문서:

- `design-ai-product-ux`

추천 위치:

- `디자인 실무` 3번째 항목

### 10.3 상세 목차

```text
1. AI 제품 UX의 핵심 문제
2. 불확실성 표시
3. 출처와 근거 UI
4. confidence 표현 금지/제한 패턴
5. human handoff
6. 사용자 수정/피드백 루프
7. 생성 결과 검토/승인 패턴
8. 안전 경고와 제한 고지
9. 실패 후 신뢰 회복
10. LLM 평가/보안 결과를 UX에 반영하는 법
```

### 10.4 필수 산출물

- AI feature problem brief
- uncertainty state matrix
- citation UI sketch
- handoff flow
- generated content review flow
- safety copy checklist

수용 기준:

- LLM 기능의 실패 가능성이 UI 상태로 표현된다.
- 사용자가 생성 결과를 검토, 수정, 거부, 신고할 수 있다.
- 보안/평가 문서의 정책이 화면 흐름에 반영된다.

## 11. Phase 7: 운영 문서 보강

### 11.1 목표

일반적인 운영 역량과 AI/LLM 특화 운영 역량을 연결한다.

### 11.2 보강 대상

- `operations-observability-slo`
- `operations-incident-rollback-dr`
- `operations-ci-cd-artifact-environment`
- `llm-app-architecture-operations`

### 11.3 추가할 AI/LLM 운영 지표

| 지표 | 의미 | 대응 |
| --- | --- | --- |
| schema success rate | 구조화 출력 성공률 | prompt/schema rollback |
| groundedness rate | 근거 있는 답변 비율 | retrieval 점검 |
| citation precision | 인용이 실제 근거인지 | corpus/chunk 수정 |
| tool blocked rate | 위험 도구 호출 차단율 | policy 조정 |
| cost per successful answer | 성공 답변당 비용 | model routing |
| fallback rate | 대체 경로 사용률 | provider/region 점검 |
| refusal quality | 거절 품질 | policy prompt 개선 |
| retrieval freshness | 색인 최신성 | indexing pipeline 점검 |

### 11.4 LLM 사고 시나리오

추가할 사고 드릴:

- provider outage
- sudden cost spike
- retrieval index corruption
- prompt release regression
- prompt injection bypass
- schema failure spike
- runaway agent loop
- tenant data exposure suspicion

각 사고 드릴 구성:

```text
징후
사용자 영향
탐지 지표
즉시 완화
원인 분석
롤백/차단
재발 방지
포트폴리오에 남길 증거
```

수용 기준:

- LLM 장애가 일반 장애 대응 프로세스 안에 들어온다.
- 지표, 알림, 대응, 회고가 연결된다.

## 12. Phase 8: 실무 도구 템플릿 키트

### 12.1 목표

핸드북을 읽고 바로 실무 산출물을 만들 수 있게 한다.

### 12.2 신규 문서

추가 문서:

- `practice-ai-native-toolkit`

추천 위치:

- `실무 도구` 그룹

### 12.3 템플릿 목록

#### 12.3.1 `context-package.yaml`

포함:

- task goal
- repository context
- constraints
- allowed tools
- forbidden actions
- verification commands
- acceptance criteria
- rollback notes

#### 12.3.2 `eval-dataset.jsonl`

포함:

- id
- input
- expected behavior
- required evidence
- forbidden behavior
- tags
- severity

#### 12.3.3 `security-fixtures.jsonl`

포함:

- attack type
- payload
- target boundary
- expected block/allow
- evidence to log
- regression tag

#### 12.3.4 `agent-episode-log.md`

포함:

- task
- context provided
- tool calls
- human approvals
- verification result
- failures
- final decision

#### 12.3.5 `prompt-release-change-request.md`

포함:

- change reason
- prompt diff summary
- affected flows
- eval result
- rollback plan
- approval

#### 12.3.6 `quality-report.md`

포함:

- metrics
- known failures
- regression comparison
- risk acceptance
- next actions

#### 12.3.7 `incident-packet-llm.md`

포함:

- timeline
- impact
- trigger
- mitigations
- root cause
- prevention
- evidence

#### 12.3.8 `portfolio-evidence-pack.md`

포함:

- problem
- architecture
- eval
- security
- operations
- tradeoffs
- measurable result
- interview story

수용 기준:

- 각 템플릿은 예시와 나쁜 예를 포함한다.
- 각 템플릿은 관련 핸드북 문서에서 참조된다.

## 13. Phase 9: 커리어/포트폴리오 보강

### 13.1 목표

AI Native 역량을 과장 없는 증거로 설명하게 만든다.

### 13.2 신규 문서

추가 문서:

- `career-ai-native-portfolio`

추천 위치:

- `면접·커리어` 그룹

### 13.3 상세 목차

```text
1. AI Native 경력 포지셔닝
2. JD 키워드 읽는 법
3. RAG 프로젝트를 증거화하는 법
4. 평가 하네스를 증거화하는 법
5. Agent/tool use를 증거화하는 법
6. LLM 보안을 증거화하는 법
7. 운영 지표를 증거화하는 법
8. AI-assisted 개발을 과장 없이 말하는 법
9. 30초/90초 답변 카드
10. portfolio README 구조
```

### 13.4 답변 패턴

나쁜 표현:

```text
AI를 활용해 생산성을 높였습니다.
```

좋은 표현:

```text
RAG 기반 문서 검색 기능에서 30개 golden query를 만들고, retrieval recall과 citation precision을 릴리스 게이트로 두었습니다. 프롬프트 변경 시 eval report를 남겼고, prompt injection fixture 12개를 회귀 테스트에 포함했습니다.
```

수용 기준:

- 사용자가 AI 경험을 추상 주장 대신 검증 가능한 산출물로 말할 수 있다.
- 포트폴리오 README에 평가, 보안, 운영 증거가 포함된다.

## 14. Phase 10: `practicalExamples.ts` 학습 루프 확장

### 14.1 목표

현재 예제 구조를 단순 시나리오에서 훈련 가능한 단위로 확장한다.

### 14.2 현재 문제

현재 예제는 주로 `scenario`, `actions`, `outcome` 중심이다. 실무 감각을 주기에는 좋지만, 반복 훈련과 검증에는 부족하다.

### 14.3 추가 필드 제안

```ts
type PracticalExample = {
  id: string;
  title: string;
  scenario: string;
  actions: string[];
  outcome: string;
  difficulty?: "intro" | "practice" | "independent" | "lead";
  estimatedTime?: string;
  prerequisites?: string[];
  dataset?: string;
  failureFixtures?: string[];
  artifactsToSubmit?: string[];
  passCriteria?: string[];
  rubric?: string[];
  reviewerPrompts?: string[];
};
```

### 14.4 적용 방식

1. 타입을 확장한다.
2. 기존 예제는 필수 필드만 유지해 깨지지 않게 한다.
3. LLM/AX/운영/디자인/커리어 예제부터 확장 필드를 채운다.
4. UI에서 확장 필드가 있으면 "실습 기준" 블록으로 노출한다.

수용 기준:

- 예제가 읽을거리에서 실습 카드로 바뀐다.
- 각 예제마다 제출 산출물과 통과 기준을 제공할 수 있다.

## 15. 메뉴 변경 제안

### 15.1 최소 변경안

기존 8개 그룹은 유지하고 항목만 추가한다.

```text
홈

개발 핸드북

LLM
  + LLM 평가 하네스 랩
  + LLM 보안 레드팀 Fixture
  + Agent Runtime 구현

인프라·운영
  + AI/LLM 운영 Addendum

AX 실무
  - 기존 3개 유지
  - 각 문서 안에 심화 지도 추가

디자인 실무
  + AI 제품 UX

실무 도구
  + AI Native 역량 매트릭스
  + AI Native 실습 랩
  + AI Native 템플릿 키트

면접·커리어
  + AI Native 포트폴리오
```

장점:

- 메뉴 구조를 크게 흔들지 않는다.
- 기존 사용자 혼란이 적다.

단점:

- AI Native 훈련 경로가 여러 그룹에 흩어진다.

### 15.2 추천 변경안

신규 그룹 `AI Native 훈련`을 추가한다.

```text
AI Native 훈련
  00 역량 매트릭스·진단
  01 실습 랩
  02 평가 하네스
  03 보안 레드팀
  04 Agent Runtime
  05 템플릿 키트
  06 포트폴리오 증거팩
```

기존 LLM/AX/운영/디자인/커리어 문서와는 교차 링크한다.

장점:

- 이 프로젝트의 차별점이 바로 보인다.
- "출중한 AI Native 개발자"라는 목표와 메뉴가 직접 연결된다.
- 실습/검증/증거화가 한곳에 모인다.

단점:

- 메뉴 그룹이 9개로 늘어난다.
- 기존 실무 도구와 일부 역할이 겹칠 수 있다.

추천:

- 최종적으로는 추천 변경안이 더 낫다.
- 다만 구현 부담을 줄이려면 먼저 최소 변경안으로 문서를 추가하고, 이후 `AI Native 훈련` 그룹으로 승격한다.

## 16. 구현 순서

### 16.1 1차 작업: 구조 안정화

목표:

- 메뉴/정적 인덱스/레거시 상태 혼선을 제거한다.

작업:

1. `catalog.mjs` 상태 주석/메타데이터 정리
2. `public/handbook/index.html` 재생성 또는 생성 스크립트 수정
3. 홈에 공식 경로/아카이브 구분 추가
4. 홈에 트랙별 바로가기 추가

완료 기준:

- 앱과 정적 인덱스의 공식 그룹이 일치한다.
- 홈에서 5개 학습 트랙을 볼 수 있다.

### 16.2 2차 작업: AI Native 훈련 중심축 추가

목표:

- 역량 매트릭스, 실습 랩, 템플릿 키트를 먼저 만든다.

작업:

1. `practice-ai-native-competency-map` 작성
2. `practice-ai-native-labs` 작성
3. `practice-ai-native-toolkit` 작성
4. `practicalExamples.ts` 확장 필드 설계
5. 홈과 실무 도구에서 세 문서로 연결

완료 기준:

- 사용자가 자기 수준을 진단하고 실습 랩을 시작할 수 있다.
- 랩마다 제출 산출물과 통과 기준이 있다.

### 16.3 3차 작업: LLM 실전 검증 강화

목표:

- 평가, 보안, agent runtime을 실무 구현 수준으로 끌어올린다.

작업:

1. `llm-evaluation-harness-lab` 작성
2. `llm-security-red-team-fixtures` 작성
3. `llm-agent-runtime-implementation` 작성
4. 기존 LLM 평가/보안/에이전트 문서에서 신규 문서로 교차 링크
5. 포트폴리오 문서에 각 산출물 연결

완료 기준:

- LLM 기능 품질, 보안, agent tool use를 재현 가능한 fixture로 검증할 수 있다.

### 16.4 4차 작업: 운영/디자인/커리어 연결

목표:

- AI 기능의 품질과 실패를 제품 운영, UX, 커리어 증거로 연결한다.

작업:

1. 운영 문서에 AI/LLM 운영 addendum 추가
2. LLM 사고 드릴 추가
3. `design-ai-product-ux` 작성
4. `career-ai-native-portfolio` 작성
5. 홈의 완료 산출물 지도 업데이트

완료 기준:

- AI 기능의 실패가 UI, 운영, 포트폴리오에 모두 반영된다.

### 16.5 5차 작업: 품질 정리

목표:

- 새 구조가 중복 없이 유지되는지 검증한다.

작업:

1. 모든 신규 문서의 제목/메뉴명/ID 정합성 확인
2. 정적 HTML 재생성
3. 앱 빌드
4. 테스트 실행
5. 깨진 링크/중복 메뉴/아카이브 혼선 점검

완료 기준:

- `npm test` 통과
- `npm run build` 통과
- 공식 메뉴와 문서 로더가 일치
- 새 문서가 홈/메뉴/관련 문서에서 도달 가능

## 17. 작업 단위별 산출물 체크리스트

| 작업 | 산출물 | 확인 기준 |
| --- | --- | --- |
| 정보 구조 정리 | 카탈로그 상태 주석/메타데이터 | 공식/아카이브 구분 가능 |
| 정적 인덱스 정리 | 새 index 구조 | 앱 메뉴와 일치 |
| 홈 보강 | 진단, 트랙, 산출물 지도 | 사용자 경로 명확 |
| 역량 매트릭스 | 수준별 역량표 | 증거 기반 평가 가능 |
| 실습 랩 | 6개 이상 랩 | fixture/pass criteria 존재 |
| 평가 하네스 | eval dataset/runner 설계 | CI gate로 연결 |
| 보안 레드팀 | attack fixture | 회귀 테스트 가능 |
| Agent runtime | approval/audit/replay 설계 | 도구 호출 통제 가능 |
| AI UX | 불확실성/출처/handoff 패턴 | AI 실패가 UI에 반영 |
| 운영 addendum | AI SLI/incident drill | 장애 대응 가능 |
| 템플릿 키트 | 8개 템플릿 | 실무 산출물 작성 가능 |
| 커리어 트랙 | evidence pack | 과장 없는 설명 가능 |

## 18. 예상 리스크와 대응

### 18.1 메뉴가 너무 커지는 리스크

문제:

- 신규 문서를 모두 추가하면 메뉴가 비대해질 수 있다.

대응:

- 처음에는 기존 그룹에 추가한다.
- 이후 실습/검증/증거화 문서가 충분해지면 `AI Native 훈련` 그룹으로 묶는다.
- 홈에서 트랙 중심으로 안내해 메뉴 크기의 부담을 줄인다.

### 18.2 설명 문서만 더 늘어나는 리스크

문제:

- 새 문서를 추가해도 기존처럼 읽기 중심이 될 수 있다.

대응:

- 모든 신규 문서에 fixture, 산출물, pass criteria를 필수로 둔다.
- "개념 설명만 있는 신규 문서"는 허용하지 않는다.

### 18.3 기존 문서와 중복되는 리스크

문제:

- LLM 평가, 보안, 운영 문서와 신규 랩 문서가 중복될 수 있다.

대응:

- 기존 문서는 개념/설계 기준을 담당한다.
- 신규 랩 문서는 실행/fixture/평가 기준을 담당한다.
- 문서 상단에 역할을 명확히 쓴다.

### 18.4 유지보수 부담 증가

문제:

- 템플릿, fixture, 랩이 늘어나면 업데이트 부담이 커진다.

대응:

- fixture는 작은 샘플로 시작한다.
- 문서마다 "업데이트 기준"을 둔다.
- 카탈로그 메타데이터로 공식/아카이브 상태를 관리한다.

## 19. 완료 정의

이번 보강이 완료됐다고 판단하려면 아래 조건을 만족해야 한다.

1. 앱 메뉴와 정적 인덱스가 같은 공식 구조를 보여준다.
2. 홈에서 수준 진단, 학습 트랙, 완료 산출물을 확인할 수 있다.
3. AI Native 역량 매트릭스가 존재한다.
4. 최소 6개의 실습 랩이 존재하고 각 랩에 fixture, 산출물, 통과 기준이 있다.
5. LLM 평가 하네스, 보안 레드팀, Agent runtime 구현 문서가 존재한다.
6. 운영 문서에 AI/LLM 특화 SLI와 사고 드릴이 포함된다.
7. 디자인 문서에 AI 제품 UX, 불확실성, 출처, handoff 패턴이 포함된다.
8. 실무 도구에 AI Native 템플릿 키트가 있다.
9. 커리어 문서에 AI Native 포트폴리오 증거화 트랙이 있다.
10. 모든 신규 문서가 홈 또는 메뉴에서 도달 가능하다.
11. `npm test`와 `npm run build`가 통과한다.

## 20. 최종 권장 실행 순서

가장 현실적인 순서는 아래와 같다.

1. `catalog.mjs`와 정적 인덱스의 공식 구조를 맞춘다.
2. 홈에 진단, 트랙, 산출물 지도를 추가한다.
3. `practice-ai-native-competency-map`을 만든다.
4. `practice-ai-native-labs`를 만든다.
5. `practice-ai-native-toolkit`을 만든다.
6. LLM 평가 하네스 문서를 만든다.
7. LLM 보안 레드팀 fixture 문서를 만든다.
8. Agent runtime 구현 문서를 만든다.
9. 운영 문서에 AI/LLM addendum과 사고 드릴을 추가한다.
10. `design-ai-product-ux`를 만든다.
11. `career-ai-native-portfolio`를 만든다.
12. `practicalExamples.ts`를 확장해 실습 기준을 UI에 노출한다.
13. 전체 링크, 메뉴, 빌드, 테스트를 검증한다.

이 순서가 중요한 이유는 단순하다. 먼저 공식 경로를 정리하지 않으면 신규 문서를 추가해도 다시 흩어진다. 그다음 홈과 역량 매트릭스로 방향을 고정하고, 실습 랩과 템플릿으로 실행력을 만든 뒤, LLM/운영/디자인/커리어를 차례로 연결해야 한다.
