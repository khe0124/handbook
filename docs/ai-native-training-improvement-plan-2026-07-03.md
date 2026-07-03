# AI Native 훈련 개선계획

작성일: 2026-07-03  
기준 리뷰: `docs/ai-native-training-review-2026-07-03.md`

## 목표

AI Native 훈련을 표 중심 체크리스트에서 교재형 커리큘럼으로 바꾼다. 학습자는 개념을 읽고, 같은 예시 프로젝트에 적용하고, 제출물을 만들고, best practice와 bad practice를 비교하며 자기 결과를 개선할 수 있어야 한다.

## 개선 원칙

1. 개념은 표보다 먼저 문단으로 설명한다.
2. 모든 실습은 `Policy Document Intelligence Assistant` capstone에 누적한다.
3. 각 랩은 최소 하나의 fixture, 하나의 bad practice, 하나의 best practice, 하나의 제출 예시를 가진다.
4. 완료 기준은 "읽음"이 아니라 "재현 가능한 산출물 제출"이다.
5. 포트폴리오로 옮길 수 있는 evidence pack 구조를 유지한다.

## Phase 1: 입구 문서 교재화

대상:

- `public/handbook/ai-native-competency-map-handbook.html`
- `public/handbook/ai-native-labs-handbook.html`

작업:

- 역량 매트릭스에 AI Native의 의미, 일반 개발/자동화/AI Native의 차이, failure-driven learning 개념을 추가한다.
- 실습 랩에 capstone 프로젝트의 사용자, 데이터, API, 위험 경계를 더 자세히 설명한다.
- 랩 공통 규격을 "무엇을 제출해야 하는가" 중심으로 풀어쓴다.
- bad practice와 best practice를 비교하고, 왜 반려되는지 설명한다.

완료 기준:

- 두 문서가 표만 훑어도 되는 레퍼런스가 아니라 순서대로 읽을 수 있는 교재 흐름을 가진다.
- 학습자가 첫 프로젝트로 무엇을 만들어야 하는지 설명 없이 이해할 수 있다.

## Phase 2: 평가/보안/Agent 문서 심화

대상:

- `public/handbook/ai-native-evaluation-harness-handbook.html`
- `public/handbook/ai-native-security-red-team-handbook.html`
- `public/handbook/ai-native-agent-runtime-handbook.html`

작업:

- 각 문서에 "처음 구현하는 최소 버전"과 "운영 가능한 버전"을 비교한다.
- 잘못된 제출 예시와 reviewer 반려 코멘트를 추가한다.
- capstone의 동일한 요청 흐름이 평가, 보안, Agent Runtime에서 어떻게 다르게 관찰되는지 연결한다.

완료 기준:

- 평가/보안/Agent 문서가 별도 주제가 아니라 하나의 제품 요청 흐름을 다른 각도에서 검증한다.

## Phase 3: 완성본 예시와 커리어 연결

대상:

- `public/handbook/ai-native-toolkit-handbook.html`
- `public/handbook/career-ai-native-portfolio-handbook.html`

작업:

- 빈 템플릿뿐 아니라 완성된 release packet 예시를 추가한다.
- evidence pack을 이력서 bullet, 포트폴리오 README, 면접 90초 답변으로 변환하는 예시를 넣는다.

완료 기준:

- 학습 산출물이 그대로 커리어 증거로 옮겨진다.

## 이번 작업에서 진행한 범위

이번 변경은 Phase 1을 우선 진행한다. 리뷰와 계획을 문서로 남기고, `역량 매트릭스·진단`과 `실습 랩`을 교재형으로 보강한다.
