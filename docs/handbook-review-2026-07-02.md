# 핸드북 전체 리뷰 — 풀스택·시각디자인 디렉터 관점

작성일: 2026-07-02
검토 범위: `public/handbook/*.html` 전체, `src/handbook/*`(catalog, HandbookPage, practicalExamples), git 이력
검토 방식: 병렬 서브에이전트 4개(디자인 콘텐츠 깊이, 엔지니어링 콘텐츠 깊이, 학습 도구 구현, 구조·중복 정량) 결과 통합
검토 렌즈: ① "풀스택 개발자 + 시각디자인 감각이 있는 디렉터"라는 포지셔닝에 맞는가 ② "전체 지식 숙지를 통한 인적 경쟁력"이 실제로 가능한 구조인가
선행 문서: `ai-native-handbook-review-2026-07-01.md`(AI Native 훈련 관점), `ai-native-handbook-hardening-plan-2026-07-01.md`

## 1. 총평

이 프로젝트의 병목은 콘텐츠 양이 아니다. 세 가지 공백이다.

1. **콘텐츠의 절반 이상이 자기 복제된 중복이다.** 200개 파일의 순수 정보량은 겉보기의 절반 이하다.
2. **"숙지"를 만들어낼 학습 루프가 없다.** 간격 반복, 채점형 테스트, 전역 진도, 교차 검색이 전부 비어 있다.
3. **당신만의 것이 하나도 없다.** 전체 이력 36커밋이 2026-06-24 ~ 07-01, 8일 안에 몰려 있다. 이 핸드북은 AI가 8일 만에 생성한 것이고, 같은 도구를 가진 다른 개발자도 똑같이 만들 수 있다. 콘텐츠를 소유하는 것 자체는 경쟁력이 아니다.

"남들보다 탁월한 경쟁력"은 이 핸드북에 아직 없는 것에서 나온다: 체화(숙지 루프), 개인화(실무 사례·판단 기록), 교차점 심화(풀스택 × 시각디자인 × AI Native).

## 2. 숫자로 본 현재 상태

- HTML 핸드북 **200개**, 총 **575,479 워드 / 6.7 MB**(마크업 포함). 순수 텍스트로도 기술서적 4~5권 분량.
- 공식 메뉴(`HANDBOOK_ITEMS`) 노출 **82개**, 미노출 **118개(59%)**. 완전 고아 파일은 `index.html` 1개뿐이고, 나머지 117개는 레거시 export 배열에만 존재.
- 면접 관련만 interview- 18개 + career- 10개. 프론트엔드는 frontend- 13개 + engineering-frontend- 5개. 인프라 도메인은 devops- 12개 + operations- 14개 + network- 12개의 3중 커버.
- git 이력: 2026-06-24 최초 커밋, 07-01 최종 커밋. 6/25 하루에 19커밋. 축적이 아니라 단기 대량 생성.

## 3. 발견 1 — 콘텐츠는 뚜렷한 2개 티어

### 3.1 상급 (진짜 자산)

신세대 문서들은 기대 이상이다.

**디자인 트랙 4개 문서는 실제로 디렉터급이다.**

- `practice-visual-design-foundations`: "간격 → 정렬 → 크기/굵기 → 면 → 선 → 색 순으로 약한 재료부터", "그룹 내 간격 < 그룹 간 간격" 같은 명시적 판단 부등식. 운영 대시보드 카드 Before/After를 조형 언어로 진단·수정하는 크리틱 훈련. "황금비는 검증 기준이 아니라 참고 출발점 — 비평에서 거절하라"는 태도.
- `practice-color-typography-brand`: OKLCH 지각 균등성을 토큰 유지보수 관점의 인과로 설명. sRGB/P3 gamut fallback CSS 코드. 한글 조판 특수성(자간·장평·`word-break: keep-all`·행당 25~40자 vs 라틴 45~75자). tabular figures를 "취향이 아니라 비교 가능성 문제"로 규정.
- `practice-data-visualization`: Cleveland-McGill 지각 위계(position > length > angle > area > color), Tufte data-ink ratio를 정확히 인용하고 실무 규칙으로 번역. "bar baseline=0 예외 없음", dual-axis 금지 → small multiples 대안. 나쁜예/좋은예 풍부.
- `design-ai-product-ux`: "confidence 숫자가 아니라 행동으로 번역하라", LLM confidence는 미보정이라 노출 금지. citation UX 7단계 계약. "가짜 근거가 근거 없음보다 나쁘다."

공통점: 취향이 아니라 원리·인지구조·사용목적으로 시안을 방어하는 **크리틱 언어**를 훈련시키고, Before/After와 제출 가능한 실습 절차(squint test, audit 카드, 리뷰 체크리스트)를 갖췄다. 사실 오류 없음.

**엔지니어링에서는 2개 문서가 숙지하면 실전 역량이 되는 밀도다.**

- `engineering-frontend-performance`: 증상→첫 증거→원인→조치 트리아지, 실측 before/after(commit 180ms→55ms, INP p75 340→170ms). INP 등 최신 기준 정확. filler 약 20~30%로 최저 수준.
- `engineering-java-spring`: 복붙 가능한 실코드 + 진짜 시니어 gotcha(컬렉션 `JOIN FETCH`+`Pageable`의 메모리 페이징 → `default_batch_fetch_size`, `@Transactional` self-invocation 프록시 미적용, readOnly flush 최적화). filler 약 15~20%.

`llm-agents-tool-use`도 provider-neutral 에이전트 설계론으로 방향이 정확하다(filler 약 30%).

### 3.2 하급 (부채)

구세대(V1) 문서들 — `engineering-cs-foundations`, `engineering-backend-core`, `design-system-tokens`, `design-layout-hierarchy` 등 — 은 코드·수치·실패 사례 없이 "증거를 남겨라"류 당위문과 표를 반복한다. **filler 비율 40~55% 추정.** 틀린 내용은 없지만 시니어가 이미 아는 원칙의 재배열이라 숙지해도 경쟁력이 안 된다. 특히 `design-layout-hierarchy`는 `practice-visual-design-foundations`와 주제가 겹치는데 후자가 명백한 상위 호환이다.

전 문서 공통으로 기술적 오류는 발견되지 않았다. 최신성도 양호하다(INP, jakarta 마이그레이션, `satisfies`/`noUncheckedIndexedAccess` 등 현행 기준).

## 4. 발견 2 — 중복은 우연이 아니라 구조다

h2 구조 대조로 확인한 중복 메커니즘:

| 클러스터 | 파일 수 | 판정 |
| --- | ---: | --- |
| 면접: interview- 18 + career- 10 + 기타 1 | 29 | 높음 — `career-*`가 `interview-*`를 통째로 내포한 상위집합 (예: `career-frontend-interview` h2 50개 중 `interview-frontend`의 h2 23개 전부 포함) |
| 프론트엔드: frontend- 13 + engineering-frontend- 5 | 18 | 높음 — `engineering-frontend-*`는 "통합 문서" 마커로 `frontend-*` 시리즈를 h2까지 그대로 병합 |
| 디자인: design- 14 + practice-design 2 | 16 | 높음 — `practice-design-*` 2개가 design- 세분 시리즈의 대형 병합본 |
| AX: ax- 12 + practice-ax 3 | 15 | 높음 — `practice-ax-*`가 ax- 세부 문서들의 병합본 |
| 인프라: devops- 12 + operations- 14 + network- 12 | 38 | 중간 — verbatim은 아니나 같은 도메인(IaC·drift·CI/CD 등)을 세 갈래 평행 분류로 3중 커버. 병합본도 없음 |

즉 중복은 "granular 원본 + 이를 병합한 통합본(마커 있는 파일 20개)"이 나란히 존재하는 구조적 중복이다. 같은 N+1/프록시 설명이 10개 이상 파일에 반복된다. **"전체 숙지" 대상이 실제보다 2배 부풀려져 있다.**

## 5. 발견 3 — "숙지"를 만들 시스템이 없다

목표가 "전체 지식 숙지를 통한 경쟁력"인데, 앱에는 기억을 정착시키는 장치가 사실상 없다.

| 있는 것 | 없는 것 |
| --- | --- |
| 문서 내 섹션 검색 (열린 문서 1개, 최대 8건) | 전체 문서 교차 검색 |
| 자동 생성 암기 카드 (문서당 앞 8개 섹션, 템플릿 질문) | 채점형 자가 테스트, 오답 재출제 |
| "외웠음" boolean 플래그 (localStorage) | 간격 반복(spaced repetition) — timestamp 자체가 저장 안 됨 |
| 체크리스트, 스크롤 위치·마지막 문서 저장 | 전역 진도 대시보드 (82개 중 어디까지 했는지) |

암기 카드의 세부 문제:

- 질문이 전부 `"{title}의 핵심 판단 기준은 무엇인가?"` 템플릿으로 기계 생성된다.
- 문서당 앞 8개 섹션만 카드화되어 뒷부분은 회상 대상에서 누락된다.
- "외웠음"은 날짜 없는 boolean이라 잊어도 되돌아오지 않는다.

지금 형태로는 학습 도구라기보다 UI 장식에 가깝다. `practicalExamples.ts`도 180개 항목 중 훈련 필드(difficulty, passCriteria 등)를 채운 것은 9개뿐이다.

## 6. 발견 4 — "디렉터" 포지셔닝이 구조에 반영 안 됨

희소성은 **풀스택 × 시각디자인 × AI Native의 교차점**이다. 이 교차점을 다 가진 사람은 드물다. 그런데:

- 핸드북 구조에서 디자인은 10개 그룹 중 하나일 뿐이고, 교차점을 훈련하는 콘텐츠(개발자가 디자인 리뷰에서 시안을 조형 언어로 반려하는 법, 디자인 토큰을 코드 아키텍처로 연결하는 판단)는 상급 문서 안에 파편으로만 존재한다.
- 공식 82개 중 인프라·운영이 14개를 차지한다. 포지셔닝 대비 과대 배분이다.
- **개인 사례가 0건이다.** 탄소거래 플랫폼에서 실제로 내린 판단, 실패, 회고가 한 줄도 없다. "JPA N+1을 안다"는 누구나 생성할 수 있지만, "정산 화면에서 N+1로 p95가 튀었고 batch size로 잡았다"는 당신만 쓸 수 있다.

## 7. 결론

더 쓰지 말고, **줄이고**(중복 제거), **돌리고**(숙지 루프), **새겨라**(개인 사례).

경쟁력은 200개 문서를 가진 데서 나오지 않는다. 밀도 높은 60개 이하를 실제로 체화하고, 거기에 남이 복제할 수 없는 개인 판단 기록이 쌓인 데서 나온다. 구체적 실행 계획은 `handbook-improvement-plan-2026-07-02.md`에 있다.
