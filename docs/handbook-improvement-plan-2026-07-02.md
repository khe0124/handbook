# 핸드북 전면 개선 계획 — 체화·개인화·교차점

작성일: 2026-07-02
기준 문서: `handbook-review-2026-07-02.md`
선행 계획과의 관계: `ai-native-handbook-hardening-plan-2026-07-01.md`는 "AI Native 훈련 시스템" 축이다. 이 계획은 그 위에 겹치는 다른 축 — **다이어트(중복 제거), 숙지 루프(retention), 개인 레이어, 디렉터 교차점** — 을 다룬다. 07-01 계획의 잔여 항목(실습 랩 fixture, 평가 하네스 등)은 이 계획의 P0~P1이 끝난 뒤 진행한다.

## 0. 원칙

1. **새 문서 생성 동결.** 이 계획이 끝날 때까지 신규 핸드북 문서를 추가하지 않는다. 콘텐츠 생성 능력은 이미 증명됐다(8일에 57만 워드). 지금부터의 가치는 생성이 아니라 체화와 개인화다.
2. **품질 게이트: 숫자나 코드가 없는 문단은 filler다.** 모든 공식 문서는 실측 수치, 코드, Before/After, 크리틱 언어 중 하나 이상을 문단 단위로 갖춰야 한다. 상급 문서 4개(`practice-visual-design-foundations`, `practice-color-typography-brand`, `practice-data-visualization`, `design-ai-product-ux`)가 기준 템플릿이다.
3. **숙지 대상과 참조 대상을 구분한다.** 전부 외우는 것은 목표가 아니다. 문서를 세 층으로 나눈다:
   - **암기**: 판단 부등식, 임계값, 크리틱 언어 (SRS 카드 대상)
   - **체화**: 실습·크리틱 루틴으로 몸에 붙이는 판단 기준
   - **참조**: 외우지 않고 검색으로 도달하는 레시피·명령어
4. **개인 사례가 없는 지식은 면접에서 힘이 없다.** 모든 트랙의 완료 기준에 "내 사례 1건 이상"을 포함한다.

## 1. 우선순위 요약

| 우선순위 | 작업 | 목적 | 핵심 산출물 |
| --- | --- | --- | --- |
| P0-1 | 카탈로그 다이어트 | 숙지 대상을 82개 → 60개 이하로 | 상태 메타데이터, 아카이브 분리 |
| P0-2 | 숙지 루프 구축 | "읽기"를 "기억"으로 전환 | 교차 검색, SRS, 질문 은행, 진도 대시보드 |
| P1-1 | 개인 레이어 | 복제 불가능한 경쟁력 | 문서별 "내 사례" 슬롯, evidence 연결 |
| P1-2 | 디렉터 교차점 트랙 | 포지셔닝을 구조로 | 크리틱 루틴, V1 디자인 문서 개정 |
| P2 | 07-01 계획 잔여 | AI Native 훈련 완성 | 실습 랩 fixture, 평가 하네스 |

## 2. P0-1. 카탈로그 다이어트

### 2.1 문제

- 공식 82개 / 미노출 118개. 미노출 대부분은 노출된 "통합 문서"의 granular 원천이라 삭제가 아니라 상태 표시가 필요하다.
- V1 티어 공식 문서(filler 40~55%)가 숙지 대상에 섞여 있다.
- devops-(12) / operations-(14) / network-(12)는 병합본 없는 3중 커버다.

### 2.2 작업

#### 2.2.1 카탈로그 상태 메타데이터

`catalog.mjs`의 모든 항목에 상태를 부여한다.

```js
// status: "official" | "source" | "archive"
{ id: "frontend-browser", label: "...", kind: "...", file: "...", status: "source", mergedInto: "engineering-frontend-core" }
```

- `official`: 공식 메뉴 노출, 숙지·SRS 대상
- `source`: 통합 문서의 원천. 메뉴 비노출, 통합 문서에서 "원본 보기" 링크로만 도달
- `archive`: 학습 경로에서 제외. 문서 상단에 아카이브 배지

분류 기준:

- `interview-*` 18개 → `source` (career-*가 상위집합이므로)
- `frontend-*`, `design-*`(granular), `ax-*`(granular) → `source`
- `personalization-*` 5개, 구세대 단일 가이드 중 통합본이 있는 것 → `archive`

#### 2.2.2 인프라 3중 커버 통합

devops- / operations- / network- 38개를 하나의 체계로 통합한다.

- **`operations-*` 14개를 공식 축으로 유지** (가장 최근 세대, 실무 시나리오·면접 답변 포함).
- devops-, network- granular는 `source`로 강등하고, operations- 문서에 없는 내용(IPsec 협상, L3-L7 디버깅 도구 등)만 해당 operations- 문서로 흡수.
- 흡수 후 공식 인프라·운영 항목을 14개 → 10개 이하로 줄인다. 포지셔닝(풀스택+디자인 디렉터) 대비 과대 배분을 해소한다.

#### 2.2.3 V1 문서 처분

filler 40~55% 문서는 둘 중 하나로 처리한다.

- **개정**: `engineering-cs-foundations`, `engineering-backend-core`, `design-system-tokens` — 상급 문서 기준(실코드, 실측 수치, Before/After)으로 재작성. 문단별 품질 게이트 적용.
- **흡수 후 삭제**: `design-layout-hierarchy` — 고유 내용(정보 밀도 전략, 승인 큐 case study)만 `practice-visual-design-foundations`로 옮기고 삭제.

### 2.3 완료 기준

- 공식(`official`) 문서 60개 이하.
- 새 문서를 추가할 때 어느 상태로 넣을지 코드만 보고 판단 가능.
- `npm test` 통과 (카탈로그 정합성 테스트가 status를 인지하도록 갱신).
- 공식 문서 중 filler 40% 이상 문서 0개.

## 3. P0-2. 숙지 루프 구축

"전체 지식 숙지" 목표의 실체다. 구현 순서대로.

### 3.1 전체 문서 교차 검색

- 빌드 시(`generate:handbook` 확장) 전 공식 문서의 섹션 인덱스를 생성한다. 기존 `createLearningModel`의 섹션 파싱 로직을 재사용하되 런타임이 아니라 빌드 타임에 돌린다.
- 산출물: `src/handbook/searchIndex.ts` — `{ docId, sectionId, title, summary, keywords }` 배열.
- UI: 사이드바 상단 전역 검색창. 결과는 문서·섹션 단위로 그룹핑, 클릭 시 해당 문서 해당 앵커로 이동.
- 참조 층(레시피·명령어)은 이 검색으로 도달하는 것이 완성 상태다 — 외울 필요를 없앤다.

### 3.2 간격 반복(SRS)

현재 `"mastered"` boolean을 스케줄 구조로 교체한다.

```ts
type CardReview = {
  cardId: string;
  lastReviewedAt: string;   // ISO date
  intervalDays: number;     // 1 → 3 → 7 → 16 → 35 ...
  ease: number;             // 2.5 기본, 실패 시 감소 (SM-2 단순화)
  lapses: number;
};
```

- 홈에 "오늘 복습할 카드 N개" 큐를 노출한다. 큐가 비면 새 카드를 하루 상한(예: 10개)만큼 투입.
- 채점은 자가 평가 3단계(모름 / 애매함 / 알았음)로 시작한다. 모름 → interval 리셋, 애매함 → interval 유지, 알았음 → interval 확장.
- localStorage 유지하되 export/import(JSON 다운로드) 기능을 넣어 유실·기기 이동에 대비한다.

### 3.3 큐레이션된 질문 은행

질문 품질이 낮으면 SRS를 만들어도 소용없다. 런타임 자동 생성 카드를 데이터 기반으로 교체한다.

- 산출물: `src/handbook/questionBank.ts` (또는 문서별 JSON).

```ts
type StudyCard = {
  id: string;
  docId: string;
  sectionId?: string;       // 근거 섹션 앵커
  question: string;         // "카드형 승인 큐가 느릴 때 테이블 밀도로 바꾸는 판단 기준은?"
  answer: string;
  type: "recall" | "judgment" | "critique";
  tier: "must" | "good";    // must = 암기 층
};
```

- `judgment`(이 상황에서 무엇을 먼저 보나)와 `critique`(이 화면의 문제를 조형 언어로 진단하라) 타입을 recall과 구분한다. 디렉터 역량은 recall이 아니라 critique 카드에서 나온다.
- 작성 순서: 상급 문서 4개 + `engineering-frontend-performance` + `engineering-java-spring`부터. 문서당 15~25개, 템플릿 질문 금지.
- 기존 자동 생성 카드는 질문 은행이 없는 문서의 폴백으로만 유지한다.

### 3.4 전역 진도 대시보드

- 홈에 그룹별 현황: 읽음(방문 기록) / 카드 진행률(must 카드 중 interval 7일 이상 도달 비율) / 내 사례 수(P1-1 연동).
- 문서 방문 기록을 localStorage에 추가한다 (`dev-handbook:visited:{docId}` + 최초·최근 방문일).

### 3.5 완료 기준

- 아무 개념이나 3초 안에 전역 검색으로 도달할 수 있다.
- 하루 10분 복습 큐가 돌아가고, "외웠음"이 날짜·간격 기반으로 갱신된다.
- 핵심 6개 문서에 큐레이션 카드 90개 이상, 그중 critique/judgment 카드가 40% 이상.
- 홈에서 전체 진도를 한눈에 본다.

## 4. P1-1. 개인 레이어 — 복제 불가능한 경쟁력

### 4.1 구조

- 각 공식 문서에 "내 사례" 슬롯을 만든다. 원본 HTML을 오염시키지 않도록 별도 데이터로 관리한다.

```ts
// src/handbook/personalNotes.ts (또는 notes/*.md를 빌드 시 병합)
type PersonalNote = {
  docId: string;
  sectionId?: string;
  date: string;
  situation: string;   // 탄소거래 정산 화면, 특정 릴리스
  judgment: string;    // 무엇을 근거로 어떤 판단을 했나
  result: string;      // 수치 변화, 실패했다면 왜
  interviewLine?: string; // 30초 답변으로 압축한 문장
};
```

- UI: 문서 안 해당 섹션 옆에 "내 사례" 카드로 렌더. 대시보드에 문서별 사례 수 집계.

### 4.2 운영 규칙

- **주 1건 이상.** 실무에서 판단이 갈렸던 순간을 그 주 안에 기록한다. 완벽한 회고가 아니라 4필드 채우기다.
- 사례에는 가능하면 수치를 넣는다 (p95, 렌더 시간, 리뷰 반려 사유 수).
- `interviewLine`이 채워진 사례가 곧 07-01 계획의 evidence pack 원료다. 커리어 문서(`career-ai-native-portfolio` 등)에서 이 데이터를 참조한다.
- 회사 기밀이 걸린 수치는 상대값·규모감으로 치환해 기록한다.

### 4.3 완료 기준

- 3개월 시점에 사례 12건 이상, 그중 `interviewLine` 완성 6건 이상.
- 핵심 트랙(프론트 성능, JPA, 디자인 크리틱, AX 루프)마다 사례 1건 이상.

## 5. P1-2. 디렉터 교차점 트랙

포지셔닝(풀스택 × 시각디자인 × AI Native)을 메뉴 구조와 루틴으로 만든다.

### 5.1 크리틱 루틴 (주 1회)

- 대상: 실무 화면, 경쟁 서비스, 잘 만든 레퍼런스 중 1개.
- 절차는 `practice-visual-design-foundations`의 CRIT 형식을 따른다: 진단(위계·proximity·재료 남용을 조형 언어로) → 수정 방향(약한 재료 우선) → Before/After 기록.
- 기록은 P1-1의 PersonalNote(`critique` 성격)로 남긴다. 이것이 쌓이면 "시각 판단을 말로 정당화하는 디렉터" 포트폴리오가 된다.

### 5.2 교차점 문서 보강 (신규 생성이 아니라 기존 문서 연결·개정)

- `design-system-tokens` 개정 시 "토큰 ↔ 프론트 아키텍처" 관점을 넣는다: semantic token이 컴포넌트 props 설계와 어떻게 맞물리는지, 다크모드 토큰 전환이 렌더링 비용에 주는 영향, 토큰 변경의 회귀 검증.
- `design-handoff-qa`(source)의 고유 내용을 디자인 실무 트랙으로 흡수하면서 "개발자가 핸드오프를 받는 쪽이 아니라 검수하는 쪽"의 체크리스트로 전환한다.
- 디자인 실무 그룹을 메뉴에서 위로 올린다 (현재 8번째 → 개발 핸드북 다음).

### 5.3 완료 기준

- 크리틱 기록 월 4건이 3개월 지속.
- V1 디자인 문서 2개가 상급 기준으로 개정 완료.
- 디자인 실무 그룹이 학습 경로 전반부에 위치.

## 6. P2. 07-01 계획 잔여 항목과의 연결

07-01 hardening plan의 실습 랩 fixture, 평가 하네스, 보안 레드팀, agent runtime 문서는 방향이 맞다. 단, 순서를 지킨다:

- P0-1이 끝나기 전에 랩 문서를 추가하면 다시 "읽을거리"만 늘어난다.
- 랩의 제출 산출물은 P1-1 PersonalNote 구조로 남겨 evidence pack과 한 파이프라인이 되게 한다.
- `practicalExamples.ts`의 훈련 필드(현재 180개 중 9개만 채워짐)는 P0-1에서 살아남은 공식 문서에 대해서만 채운다.

## 7. 실행 순서와 예상 단위

| 순서 | 작업 | 규모 감각 |
| --- | --- | --- |
| 1 | catalog 상태 메타데이터 + 테스트 갱신 | 코드 작업, 1~2 세션 |
| 2 | 인프라 3중 커버 통합, V1 처분 결정 | 콘텐츠 판단 + 편집, 여러 세션 |
| 3 | 빌드 타임 검색 인덱스 + 전역 검색 UI | 코드 작업, 1~2 세션 |
| 4 | SRS 데이터 모델 + 복습 큐 UI + export | 코드 작업, 2~3 세션 |
| 5 | 질문 은행 (핵심 6개 문서부터) | 콘텐츠 작업, 문서당 1 세션 |
| 6 | 진도 대시보드 | 코드 작업, 1 세션 |
| 7 | PersonalNote 구조 + UI | 코드 작업, 1~2 세션 |
| 8 | 크리틱 루틴 시작 (도구 없이도 즉시 가능) | 루틴, 주 1회 |
| 9 | V1 문서 개정 (tokens, cs-foundations, backend-core) | 콘텐츠 작업, 문서당 1~2 세션 |
| 10 | P2 잔여 (07-01 계획) | 이후 |

8번(크리틱 루틴)과 P1-1 기록은 도구 완성을 기다릴 필요가 없다. 마크다운 파일로 오늘부터 시작하고, 도구가 생기면 이관한다.

## 8. 완료 정의

이번 개선이 완료됐다고 판단하는 조건:

1. 공식 문서 60개 이하, 전부 filler 40% 미만, 상태 메타데이터로 official/source/archive가 구분된다.
2. 전역 검색으로 아무 개념에나 3초 안에 도달한다.
3. SRS 복습 큐가 날짜 기반으로 돌아가고, 핵심 문서의 큐레이션 카드로 하루 10분 루프가 성립한다.
4. 전역 진도 대시보드에서 읽음/외움/사례 현황을 본다.
5. 개인 사례가 주 1건씩 쌓이고 있고, 그중 일부는 면접 답변 문장으로 압축돼 있다.
6. 크리틱 루틴이 월 4건 돌아간다.
7. `npm test`, `npm run build` 통과.

이 조건이 채워지면 이 프로젝트는 "AI가 8일 만에 만든 지식 베이스"에서 "본인만 가질 수 있는 판단 기록이 쌓이는 훈련 시스템"으로 바뀐다. 경쟁력은 그 차이에서 나온다.
