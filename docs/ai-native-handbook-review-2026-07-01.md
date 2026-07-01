# AI Native 개발자 역량 관점 핸드북 전체 리뷰

작성일: 2026-07-01  
검토 범위: `src/handbook/catalog.mjs`, `src/handbook/practicalExamples.ts`, `src/handbook/documents/*`, `public/handbook/*.html`  
검토 방식: 로컬 코드/문서 점검 + 메뉴 구조 리뷰 서브에이전트 + AI Native 역량 리뷰 서브에이전트 결과 통합

## 1. 냉정한 총평

이 프로젝트는 일반적인 개발 핸드북보다 훨씬 야심적이다. 단순히 프론트엔드, 백엔드, 인프라, 면접을 나열하지 않고, LLM, AX, 평가, 보안, 운영, 디자인, 커리어 증거화까지 하나의 성장 경로로 묶으려는 의도가 분명하다. 특히 LLM 영역은 RAG, 평가, 보안, 에이전트, 운영, 포트폴리오까지 연결되어 있어 "AI 기능을 데모로 만드는 개발자"가 아니라 "AI 기능을 제품으로 책임지는 개발자"를 지향한다.

하지만 현재 상태만으로 "AI Native한 역량이 출중한 개발자"를 안정적으로 길러낸다고 보기는 어렵다. 이유는 명확하다. 문서의 밀도와 방향은 좋지만, 실제 역량을 만들고 검증하는 반복 훈련 체계가 약하다. 지금은 좋은 내용을 많이 읽을 수 있는 지식 베이스에 가깝고, 매주 무엇을 만들고, 어떤 실패 데이터를 통과해야 하며, 어떤 산출물을 제출해야 하는지까지 강제하는 훈련 시스템은 부족하다.

결론적으로 이 프로젝트는 "AI Native 개발자가 무엇을 알아야 하는지"는 꽤 잘 말한다. 그러나 "그 역량을 실제로 갖췄는지 검증하는 과정"은 아직 충분히 설계되어 있지 않다. 다음 단계는 더 많은 설명을 추가하는 것이 아니라, 실습 데이터, 실패 fixture, 자동 평가, 리뷰 루브릭, 포트폴리오 증거팩을 공식 학습 경로에 넣는 것이다.

## 2. 현재 공식 메뉴 구조

현재 앱 기준 공식 메뉴는 `HANDBOOK_GROUPS`와 `HANDBOOK_ITEMS`로 결정된다. 전체는 8개 그룹, 58개 항목이다.

| 그룹 | 항목 수 | 현재 역할 | AI Native 역량 기여도 |
| --- | ---: | --- | --- |
| 홈 | 1 | 전체 경로, 역량 지도, 바로가기 | 방향 설정은 좋지만 진단/트래킹은 부족 |
| 개발 핸드북 | 15 | CS, 시스템, 프론트엔드, 백엔드, 데이터, 운영 품질, Java/Spring | 기본기와 제품 구현 역량의 핵심 |
| LLM | 12 | LLM 원리, 프롬프팅, RAG, 평가, 에이전트, 보안, 운영, 포트폴리오 | 가장 AI Native 목표에 직접적 |
| 인프라·운영 | 13 | 네트워크, 보안 경계, DNS/TLS, CI/CD, 컨테이너, IaC, 관측성, 장애 대응 | 제품 책임 역량에 중요 |
| AX 실무 | 3 | AI 기반 작업 체계, 자동화 루프, 확장/거버넌스 | 방향은 강하지만 노출 항목이 압축됨 |
| 디자인 실무 | 2 | 문제 정의, 사용자 흐름, 시스템 품질 | 제품 감각 보강에 중요하지만 늦게 등장 |
| 실무 도구 | 3 | 치트시트, 작업 루프, 빌드/설정/릴리스 | 실무 실행 보조, 템플릿화 필요 |
| 면접·커리어 | 9 | 포지셔닝, 이력, 기술 면접, 시스템 설계, 협업, 코딩테스트 | 증거화와 커리어 전환에는 좋음 |

공식 메뉴 자체는 "기본기 -> 제품 개발 -> LLM -> 운영 -> AX -> 디자인 -> 실무 도구 -> 커리어"라는 큰 흐름을 갖는다. 이 흐름은 합리적이지만, 초보자가 실제로 따라가기에는 너무 넓고, AI Native 실습 경로는 별도 트랙으로 더 선명하게 보여야 한다.

## 3. 핵심 강점

### 3.1 AI Native를 단순 프롬프팅으로 보지 않는다

LLM 메뉴는 프롬프트 작성법에서 끝나지 않는다. RAG, 평가, 보안, Agent/Tool Use, 운영, 멀티모달, 파인튜닝/라우팅, 포트폴리오까지 이어진다. 이 구성은 매우 좋다. 실제 AI 제품은 "잘 대답하는 챗봇"이 아니라 검색 품질, 권한, 비용, 실패 모드, 릴리스 게이트, 관측성, 보안 경계까지 포함하기 때문이다.

### 3.2 AX를 별도 역량으로 다룬다

AX 실무는 "AI 기능을 만드는 법"과 "AI를 활용해 일하는 법"을 분리하려는 좋은 시도다. AI Native 개발자에게 중요한 것은 LLM API를 호출하는 능력만이 아니다. 작업을 분해하고, 컨텍스트 패키지를 만들고, 에이전트에게 일을 맡기고, 결과를 검증하고, 실패를 학습 루프로 되돌리는 능력도 중요하다.

### 3.3 운영과 신뢰성을 개발자 역량 안에 포함한다

인프라·운영 그룹은 DNS, TLS, VPC, CI/CD, 컨테이너, IaC, 관측성, 장애 대응까지 포함한다. 이는 좋은 방향이다. AI Native 제품은 모델 품질만으로 운영되지 않는다. 지연, 비용, 장애, 보안, 데이터 접근 권한, 배포 롤백까지 책임져야 한다.

### 3.4 디자인 실무를 개발 역량의 일부로 끌어들인다

디자인 실무는 최근 보강된 "문제와 흐름" 중심의 구조가 좋다. 개발자가 UI를 단순히 예쁘게 만드는 것이 아니라, 문제 정의, 사용자 흐름, 상태, 핸드오프, 의사결정 기준까지 이해해야 한다는 방향이 선명하다.

### 3.5 커리어 증거화까지 연결한다

면접·커리어 그룹은 학습 내용을 경력 언어로 전환하는 역할을 한다. AI Native 역량은 말로 주장하기 쉽고 과장되기 쉽다. 따라서 포트폴리오, 의사결정 기록, 실패 재현, 평가 리포트 같은 증거로 바꾸는 장치가 필요하다. 이 방향 자체는 맞다.

## 4. 가장 큰 문제

### 4.1 공식 앱 메뉴와 정적 HTML 인덱스가 서로 다르다

앱 기준 공식 메뉴는 8개 그룹 58개 항목이다. 반면 `public/handbook/index.html`은 Frontend, Backend, Network, DevOps, Design, AX 같은 구 메뉴 구조를 노출한다. 또한 `public/handbook`에는 공식 카탈로그에 포함되지 않는 HTML 문서가 다수 남아 있다.

이 문제는 단순 정리 문제가 아니다. 사용자가 앱으로 들어오느냐, 정적 HTML로 들어오느냐에 따라 다른 제품을 보게 된다. 학습 경로가 다르면 핸드북의 신뢰도가 떨어지고, 어떤 문서가 최신 공식 경로인지 판단하기 어려워진다.

개선 방향:

- `public/handbook/index.html`을 현재 `HANDBOOK_GROUPS` 기준으로 재생성한다.
- 구 문서는 `archive`, `source`, `legacy`, `generated-only` 등으로 명확히 분류한다.
- 공식 학습 경로에서 제외된 문서는 문서 상단에 "현재 앱 메뉴에는 노출되지 않는 아카이브 문서"라고 표시한다.

### 4.2 `catalog.mjs`에 레거시 상수가 너무 많이 남아 있다

`catalog.mjs`에는 `FRONTEND_HANDBOOKS`, `BACKEND_HANDBOOKS`, `NETWORK_HANDBOOKS`, `DEVOPS_HANDBOOKS`, `AX_HANDBOOKS`, `DESIGN_HANDBOOKS`, `CHEAT_SHEETS`, `PRACTICAL_GUIDES`, `INTERVIEW_HANDBOOKS`, `PERSONAL_HANDBOOKS` 같은 배열이 남아 있다. 그러나 현재 공식 메뉴는 통합된 `ENGINEERING_HANDBOOKS`, `LLM_HANDBOOKS`, `OPERATIONS_HANDBOOKS`, `AX_PRACTICE_HANDBOOKS`, `DESIGN_PRACTICE_HANDBOOKS`, `PRACTICE_HANDBOOKS`, `CAREER_HANDBOOKS` 중심이다.

레거시 상수가 빌드 소스인지, 아카이브인지, 앞으로 복원할 메뉴인지 코드만 봐서는 명확하지 않다. 정보 구조를 다루는 프로젝트에서 이 상태는 위험하다. 콘텐츠를 추가할수록 어떤 배열에 넣어야 하는지 판단이 흔들리고, 문서 생성 결과와 앱 메뉴가 다시 어긋날 가능성이 높다.

개선 방향:

- 공식 노출 카탈로그와 생성용 원천 카탈로그를 분리한다.
- 비노출 배열에는 명확한 주석을 붙인다.
- 가능하면 `visible: true`, `archive: true`, `sourceOnly: true` 같은 메타데이터로 문서 상태를 표현한다.

### 4.3 개발 핸드북이 너무 넓다

개발 핸드북은 15개 항목으로 구성되어 있고, CS, OS, 네트워크, 언어, 수학, 프론트엔드, 백엔드, 데이터, 장애 대응, 플랫폼 도구, Java/Spring 사례를 모두 포함한다. 통합 풀스택 관점은 좋지만, 초보자에게는 너무 넓다.

문제는 내용이 많다는 것 자체가 아니다. 사용자가 "지금 내 수준에서 어디부터 읽어야 하는지" 판단해야 한다는 점이다. AI Native 역량을 목표로 한다면 개발 핸드북은 더 명확한 트랙을 제공해야 한다.

개선 방향:

- 개발 핸드북 안에 하위 구분을 둔다: `기본기`, `프론트엔드`, `백엔드·데이터`, `운영 품질`, `Java/Spring 사례`.
- 홈에 수준별 경로를 제공한다: `입문`, `풀스택 제품 개발`, `AI Native 전환`, `운영 책임`, `포트폴리오`.
- 각 개발 핸드북 묶음 끝에 완료 산출물을 둔다. 예: API 설계 패킷, DB 마이그레이션 리뷰, 성능 진단 리포트, 장애 재현 노트.

### 4.4 LLM 문서는 강하지만 실행 훈련이 부족하다

LLM 문서는 방향과 개념 밀도 면에서 강하다. 그러나 탁월한 AI Native 엔지니어를 만들려면 읽기만으로는 부족하다. 필요한 것은 고정 실습, 실패 데이터, 평가 기준, 제출 산출물이다.

현재 부족한 훈련:

- Prompt/schema contract 회귀 테스트
- RAG chunking/retrieval 평가
- prompt injection 및 tenant isolation 레드팀
- tool calling 승인, 멱등성, 감사 로그 실습
- provider 장애, 비용 급증, groundedness 하락 사고 대응 드릴
- AX episode package 제출 및 리뷰

개선 방향:

- `practice-ai-native-labs-handbook`를 추가한다.
- 각 LLM 장마다 "통과해야 하는 실습"을 붙인다.
- `eval-dataset.jsonl`, `security-fixtures.jsonl`, `agent-episode-log.md` 같은 예시 파일을 제공한다.
- CI에서 실행 가능한 평가 하네스 예제를 둔다.

### 4.5 평가 문서는 있지만 평가 하네스가 약하다

LLM 평가 문서는 golden dataset, regression gate, online feedback 같은 핵심 개념을 잘 다룬다. 그러나 실제 역량은 평가 하네스를 만들어보고 운영해봐야 생긴다.

추가해야 할 구현 단위:

- `eval-dataset.jsonl`
- baseline/candidate 비교 runner
- threshold config
- judge calibration 절차
- CI gate 예시
- relabel workflow
- false positive/false negative 분석 템플릿

개선 방향:

- `llm-evaluation-harness-lab` 섹션 또는 문서를 추가한다.
- 평가 결과를 포트폴리오 증거팩으로 연결한다.
- "정답률"뿐 아니라 groundedness, citation precision, refusal quality, schema success rate, latency, cost까지 포함한다.

### 4.6 보안 문서는 원칙 중심으로 강하지만 레드팀 fixture가 부족하다

LLM 보안 문서는 threat model, OWASP식 위험 분류, source-to-sink 흐름을 다루는 점이 좋다. 그러나 보안 역량은 공격 코퍼스 없이 잘 늘지 않는다.

추가해야 할 fixture:

- 직접 prompt injection
- 간접 prompt injection
- tool injection
- memory poisoning
- cross-tenant cache leak
- log exfiltration
- MCP/connector 권한 오용
- eval dataset PII 누출

개선 방향:

- `llm-security-red-team-fixtures-handbook`를 추가한다.
- 각 fixture에 기대 차단 동작, 로그 증거, 회귀 테스트 형태를 함께 제공한다.
- 보안 문서를 LLM, AX, 운영 문서와 교차 링크한다.

### 4.7 Agent/Tool Use는 설계는 좋지만 런타임 구현 깊이가 부족하다

Agent/Tool Use 문서는 tool schema hardening, approval gate, retry taxonomy 같은 중요한 설계 개념을 다룬다. 하지만 실무에서 어려운 부분은 런타임 구현이다.

보강해야 할 내용:

- tool adapter interface
- planner output validation
- sandbox/network permission 설계
- idempotency key
- approval ledger
- audit hash
- replay trace
- memory purge test
- MCP/plugin trust boundary

개선 방향:

- `llm-agent-runtime-implementation-handbook`를 추가한다.
- "에이전트가 도구를 호출했다"가 아니라 "호출을 검증, 재생, 감사, 중단, 복구할 수 있다"를 완료 기준으로 둔다.

### 4.8 운영 문서와 LLM 운영 문서가 연결되어 있지 않다

일반 운영 문서는 전통적인 SLO, incident, rollback, DR 중심이다. LLM 운영 문서는 observability, release, runbook을 다루지만, 두 세계가 충분히 연결되어 있지는 않다.

AI Native 제품 운영에 필요한 추가 지표:

- groundedness SLI
- citation precision
- schema success rate
- tool blocked rate
- cost per successful answer
- provider fallback rate
- prompt rollback rate
- retrieval index corruption 감지
- runaway agent loop 감지

개선 방향:

- `operations-observability-slo` 또는 `llm-app-architecture-operations`에 AI/LLM 운영 addendum을 추가한다.
- 장애 대응 문서에 LLM 특화 사고 시나리오를 넣는다.
- 운영 체크리스트가 LLM 포트폴리오 문서와 연결되도록 한다.

### 4.9 AX 심화 문서가 공식 학습 경로에서 덜 보인다

`AX_HANDBOOKS`에는 AX 개요, 역량, 조직, 자동화, 컨텍스트, 하네스, 루프, 멀티에이전트, 검증, 거버넌스 등 좋은 세부 항목이 존재한다. 그러나 현재 공식 메뉴에는 `AX_PRACTICE_HANDBOOKS` 3개 번들만 노출된다.

번들링 자체는 나쁘지 않다. 문제는 사용자가 세부 심화 항목의 존재를 알기 어렵다는 점이다. AX는 이 프로젝트의 차별점이므로 더 적극적으로 드러내야 한다.

개선 방향:

- AX 번들 문서 내부 첫 화면에 세부 심화 지도와 직접 링크를 제공한다.
- 또는 `AX 심화` 하위 그룹을 공식 메뉴에 추가한다.
- AX 완료 산출물을 명확히 둔다: context package, harness script, episode log, failure taxonomy, approval trace.

### 4.10 디자인 실무가 너무 늦게 등장하고 AI 제품 UX가 부족하다

디자인 실무는 최근 보강으로 "문제와 흐름" 중심의 실무성이 좋아졌다. 그러나 메뉴 순서상 AX 뒤에 있고, 항목 수가 2개로 압축되어 있다. AI Native 제품을 만든다면 디자인은 뒤늦게 입히는 것이 아니라 문제 정의와 사용자 흐름 단계에서 먼저 등장해야 한다.

AI 제품 UX에서 추가해야 할 내용:

- 불확실성 표시
- 출처와 근거 제시 UI
- confidence를 과장하지 않는 문장
- human handoff
- 사용자의 오류 수정/피드백 루프
- 안전 경고와 제한 고지
- 생성 결과 검토/승인 패턴

개선 방향:

- `design-ai-product-ux-handbook`를 추가한다.
- 홈의 바로가기에서 "새 기능 시작 시 첫 문서"로 디자인 기반 문서를 더 강하게 노출한다.
- LLM 문서의 평가/보안 결과가 사용자 경험에 어떻게 나타나는지 연결한다.

### 4.11 실무 도구는 유용하지만 AI Native 일상 도구킷이 부족하다

실무 도구 그룹은 치트시트, 작업 루프, 빌드/설정/릴리스를 다룬다. 그러나 AI Native 개발자에게 매일 필요한 산출물 템플릿은 아직 부족하다.

추가하면 좋은 템플릿:

- `context-package.yaml`
- `eval-dataset.jsonl`
- `security-fixtures.jsonl`
- `agent-episode-log.md`
- `prompt-release-change-request.md`
- `quality-report.md`
- `incident-packet-llm.md`
- `portfolio-evidence-pack.md`

개선 방향:

- `practice-ai-native-toolkit-handbook`를 추가한다.
- 치트시트는 명령 모음이 아니라 "업무 산출물 생성 템플릿"으로 강화한다.
- 각 템플릿은 예시, 나쁜 예, 리뷰 기준을 함께 가져야 한다.

### 4.12 커리어 문서에서 AI Native가 별도 1급 트랙으로 보이지 않는다

커리어 문서는 포지셔닝, 이력, 면접, 시스템 설계, 협업, 코딩테스트를 다룬다. 하지만 AI Native 경력 트랙이 독립 축으로 충분히 강조되지는 않는다.

AI Native 역량은 이력서에서 과장되기 쉽다. 따라서 "AI를 썼다"가 아니라 "어떤 평가셋을 만들었고, 어떤 실패를 줄였고, 어떤 운영 지표를 개선했는가"로 말해야 한다.

개선 방향:

- `career-ai-native-portfolio-handbook`를 추가한다.
- JD 키워드 매핑을 제공한다: RAG, eval, agent, tool use, governance, AI security, observability.
- 30초/90초 답변 카드와 포트폴리오 증거팩 템플릿을 제공한다.
- AI-assisted 개발을 과장 없이 설명하는 문장 패턴을 넣는다.

## 5. 항목별 보강 계획

### P0. 공식 정보 구조 정리

목표: 사용자가 어디로 들어와도 같은 공식 경로를 보게 만든다.

작업:

- `public/handbook/index.html`을 현재 `HANDBOOK_GROUPS` 기준으로 재생성한다.
- `catalog.mjs`에서 비노출 배열의 상태를 명확히 주석 처리한다.
- 공식 노출 문서와 생성/아카이브 문서를 구분하는 메타데이터를 추가한다.
- 홈에 "공식 학습 경로"와 "아카이브/참고 문서"의 차이를 명시한다.

성공 기준:

- 앱 메뉴와 정적 인덱스의 대분류가 일치한다.
- 새 문서를 추가할 때 어떤 카탈로그에 넣어야 하는지 코드만 보고 판단할 수 있다.

### P0. AI Native 역량 매트릭스 추가

목표: 이 핸드북이 어떤 역량을 길러야 하는지 측정 가능한 형태로 만든다.

추가 제안 문서:

- `practice-ai-native-competency-map-handbook`

포함할 역량:

- 소프트웨어 기본기
- 제품 문제 정의
- 프론트엔드/백엔드 구현
- 데이터 모델링
- LLM 프롬프트/구조화 출력
- RAG/검색 품질
- 평가 하네스
- AI 보안
- Agent/Tool runtime
- 운영/관측성
- AX 작업 루프
- 디자인/사용자 신뢰
- 포트폴리오 증거화

성공 기준:

- 각 역량마다 `입문`, `실무 가능`, `독립 운영 가능`, `리드 가능` 기준이 있다.
- 각 기준마다 제출해야 하는 산출물이 있다.

### P0. AI Native 실습 랩 추가

목표: 읽는 핸드북을 훈련 시스템으로 바꾼다.

추가 제안 문서:

- `practice-ai-native-labs-handbook`

필수 랩:

- Prompt/schema contract 회귀 테스트
- RAG retrieval eval
- LLM security red-team
- Agent tool approval/idempotency
- LLM observability dashboard
- Provider fallback/incident drill
- AX episode package review

성공 기준:

- 각 랩에는 입력 데이터, 실패 fixture, 통과 기준, 제출 산출물이 있다.
- 각 랩은 포트폴리오 증거팩으로 연결된다.

### P1. LLM 평가 하네스 구현 가이드 추가

목표: 평가를 개념이 아니라 구현 가능한 루틴으로 만든다.

추가 제안 문서:

- `llm-evaluation-harness-lab`

포함 내용:

- dataset schema
- baseline/candidate runner
- judge calibration
- metric threshold
- CI integration
- eval report template
- relabel workflow

성공 기준:

- 독자가 작은 fixture 데이터셋으로 평가를 실행할 수 있다.
- 결과가 릴리스 게이트와 연결된다.

### P1. LLM 보안 레드팀 fixture 추가

목표: 보안을 추상 원칙이 아니라 재현 가능한 테스트로 만든다.

추가 제안 문서:

- `llm-security-red-team-fixtures-handbook`

포함 내용:

- 직접/간접 prompt injection
- tool injection
- memory poisoning
- cross-tenant leakage
- log exfiltration
- connector permission misuse
- eval data PII leakage

성공 기준:

- 각 공격 fixture에 기대 차단 동작과 로그 증거가 있다.
- 회귀 테스트에 넣을 수 있는 형태다.

### P1. Agent runtime 구현 문서 추가

목표: 에이전트 설계를 실제 런타임 책임으로 끌어내린다.

추가 제안 문서:

- `llm-agent-runtime-implementation-handbook`

포함 내용:

- tool adapter interface
- planner validation
- sandbox permission
- idempotency key
- approval ledger
- audit/replay trace
- memory purge
- MCP/plugin trust boundary

성공 기준:

- 독자가 "재생 가능한 agent episode"를 남기는 구조를 구현할 수 있다.

### P1. AI 제품 UX 문서 추가

목표: LLM 품질, 보안, 불확실성을 사용자 경험으로 연결한다.

추가 제안 문서:

- `design-ai-product-ux-handbook`

포함 내용:

- 불확실성 UI
- citation UI
- human handoff
- feedback/correction loop
- generated content review pattern
- safety copy
- trust recovery pattern

성공 기준:

- AI 기능의 실패와 제한이 UI 흐름에 반영된다.
- 디자인 문서가 LLM 평가/보안 문서와 교차 링크된다.

### P1. 실무 도구 템플릿화

목표: 치트시트를 "읽는 목록"에서 "바로 쓰는 작업 산출물"로 바꾼다.

추가 제안 문서:

- `practice-ai-native-toolkit-handbook`

포함 템플릿:

- context package
- eval dataset
- security fixture
- agent episode log
- prompt release request
- quality report
- LLM incident packet
- portfolio evidence pack

성공 기준:

- 각 템플릿에는 작성 예시와 리뷰 기준이 있다.
- 홈과 각 문서에서 해당 템플릿으로 연결된다.

### P2. 운영 문서에 AI/LLM addendum 추가

목표: 일반 운영과 LLM 운영을 한 체계로 연결한다.

보강 대상:

- `operations-observability-slo`
- `operations-incident-rollback-dr`
- `llm-app-architecture-operations`

포함 내용:

- groundedness SLI
- citation precision
- schema success rate
- cost per successful answer
- fallback rate
- prompt rollback
- retrieval index corruption
- runaway agent loop

성공 기준:

- AI 기능 장애를 일반 장애 대응 프로세스 안에서 다룰 수 있다.

### P2. AI Native 커리어 트랙 추가

목표: 역량을 이력서/면접/포트폴리오 증거로 바꾼다.

추가 제안 문서:

- `career-ai-native-portfolio-handbook`

포함 내용:

- JD 키워드 매핑
- RAG/eval/agent/security 면접 질문
- 30초/90초 답변 카드
- 포트폴리오 evidence pack
- AI-assisted 개발 설명 가이드

성공 기준:

- "AI를 활용했다"가 아니라 "평가, 보안, 운영까지 책임졌다"로 말할 수 있다.

## 6. 추천 학습 트랙

현재 메뉴를 그대로 유지하더라도 홈에 다음 트랙을 추가하면 학습 부담이 크게 줄어든다.

### 6.1 입문 트랙

순서:

1. 홈
2. 실무 준비·작업 루프
3. CS 기초와 알고리즘 사고
4. 컴퓨터 시스템·OS·네트워크 기초
5. 프로그래밍 언어·런타임
6. 프론트엔드 핵심 또는 백엔드 핵심

완료 산출물:

- 개발 환경 체크리스트
- Git 작업 로그
- 작은 기능 구현 기록
- 디버깅 노트

### 6.2 풀스택 제품 개발 트랙

순서:

1. 디자인 기반·사용자 흐름
2. 프론트엔드 핵심
3. 백엔드 핵심
4. 데이터 계층·저장소
5. 백엔드 인증·보안
6. 런타임 품질·장애대응
7. 빌드·설정·릴리스 운영

완료 산출물:

- 사용자 흐름 맵
- API 계약서
- DB 마이그레이션 계획
- 테스트 리포트
- 배포/롤백 노트

### 6.3 AI Native 제품 트랙

순서:

1. LLM 로드맵·AI Native 개발자 모델
2. LLM 기초·모델 동작 원리
3. 프로덕션 프롬프팅·구조화 출력
4. RAG·임베딩·벡터DB
5. LLM 평가·품질 관리
6. Agent·Tool Use·Workflow
7. LLM 보안·거버넌스
8. LLM 앱 아키텍처·운영
9. 포트폴리오 프로젝트

완료 산출물:

- prompt contract
- eval dataset
- retrieval eval report
- security red-team report
- tool approval log
- LLM runbook

### 6.4 AX 작업 체계 트랙

순서:

1. AX 기반·조직 적용
2. AX 실행 루프·자동화
3. AX 확장·거버넌스
4. 실무 치트시트 모음
5. 실무 준비·작업 루프

완료 산출물:

- context package
- agent episode log
- failure taxonomy
- reviewer prompt
- governance checklist

### 6.5 커리어 증거화 트랙

순서:

1. 면접 전략·커리어 포지셔닝
2. 개인 이력 정리
3. 시스템 설계·프로젝트 심층
4. 컬처·협업·코드리뷰
5. LLM 포트폴리오 프로젝트
6. AI Native 포트폴리오 문서

완료 산출물:

- evidence pack
- STAR 답변 카드
- 시스템 설계 다이어그램
- 장애/평가/보안 회고
- 공개 포트폴리오 README

## 7. 이 프로젝트가 길러야 할 AI Native 역량 기준

좋은 AI Native 개발자는 다음을 할 수 있어야 한다.

| 역량 | 부족하면 생기는 문제 | 핸드북의 현재 상태 | 보강 필요 |
| --- | --- | --- | --- |
| 소프트웨어 기본기 | AI가 낸 코드를 검증하지 못함 | 개발 핸드북이 넓게 커버 | 트랙화 필요 |
| 제품 문제 정의 | 데모는 되지만 사용자 문제를 못 품 | 디자인 실무가 보강됨 | AI 제품 UX 추가 |
| LLM 기능 설계 | 프롬프트 모음에 그침 | LLM 문서 강함 | 실행 랩 필요 |
| 평가 | 품질을 감으로 판단 | 평가 개념 강함 | 하네스/CI 필요 |
| 보안 | prompt injection, 권한 누수에 취약 | 원칙 강함 | red-team fixture 필요 |
| Agent runtime | 도구 호출을 통제하지 못함 | 설계 개념 있음 | 구현 문서 필요 |
| 운영 | 비용/지연/장애를 못 다룸 | 운영 문서 강함 | AI SLI 연결 필요 |
| AX 작업 루프 | AI를 산발적으로만 사용 | AX 방향 좋음 | 세부 항목 노출 필요 |
| 증거화 | 이력서에서 과장처럼 보임 | 커리어 문서 있음 | AI Native 별도 트랙 필요 |

## 8. 최종 권고

이 프로젝트의 다음 개선 방향은 "더 많이 설명하기"가 아니다. 이미 설명은 충분히 많다. 이제는 사용자가 실제로 강해졌는지 확인할 수 있는 장치를 만들어야 한다.

가장 먼저 해야 할 일은 세 가지다.

1. 공식 메뉴 구조와 정적 문서 구조를 일치시킨다.
2. AI Native 역량 매트릭스와 수준별 학습 트랙을 홈에 추가한다.
3. LLM/AX/보안/평가/운영을 실습 랩과 제출 산출물 중심으로 바꾼다.

이 세 가지가 해결되면 이 핸드북은 단순한 개발 지식 모음이 아니라, AI Native 개발자로 성장하기 위한 실제 훈련 시스템에 가까워진다.
