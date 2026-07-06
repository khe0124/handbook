# A급 핸드북 보강 계획 — 2026-07-06

## 0. 현재 판정

현재 공식 문서 84개는 테스트 기준으로 모두 품질 게이트를 통과한다. 과거 감사에서 C로 잡혔던 LLM roadmap, frontend SEO analytics, LLM API surface, operations practice lab, AI Native sample output, engineering context metric anchor는 이미 회귀 테스트가 붙어 있다.

다만 A급을 "읽을 가치"가 아니라 "학습자가 제출물로 실력을 증명할 수 있는 상태"로 정의하면 아직 보강할 문서가 있다. 남은 약점은 정확성보다 교재성, 반려 예시, 산출물 명세, 실제 측정 기준의 선명도다.

## 1. A급 기준

| 기준 | 통과 조건 | 실패 신호 |
| --- | --- | --- |
| 판단 기준 | 선택지, trade-off, 실패 모드가 함께 있다 | 원칙 표만 있고 언제 버릴지 모른다 |
| 실행 증거 | 코드, 명령, 수치, fixture, before/after 중 하나 이상이 있다 | 읽고 나서 무엇을 만들어야 할지 모른다 |
| 제출물 | 파일명, 필드, pass criteria, reviewer note가 있다 | 요약문만 남고 재사용 산출물이 없다 |
| 반려 예시 | bad practice와 왜 반려되는지가 있다 | 좋은 예시만 있어 자기 결과를 교정하기 어렵다 |

## 2. 우선 보강 대상

| 우선순위 | 문서 | 현재 약점 | 보강 방향 |
| --- | --- | --- | --- |
| P0 | `engineering-language-runtime` | 개념은 좋지만 실측/제출물 패킷이 약함 | GC/JIT, async cancellation, serialization boundary를 측정하는 runtime evidence packet 추가 |
| P0 | `ai-native-evaluation-harness` | sample은 있으나 실패 fixture와 CI gate가 더 선명해야 함 | bad fixture, eval gate, reviewer reject 기준 추가 |
| P1 | `context-frontend-runtime-ecosystem` | metric anchor는 있으나 실제 번들 진단 절차가 짧음 | bundle/hydration/polyfill evidence packet과 반려 조건 추가 |
| P1 | `practice-visual-design-foundations` | 조형 원리는 강하지만 제출물 구조가 부족함 | critique submission packet, rejected critique, review rubric 추가 |
| P1 | `practice-data-visualization` | 판단 언어는 있으나 실데이터 검증 패킷이 약함 | chart honesty packet, axis/color/accessibility rejection 기준 추가 |
| P2 | 나머지 `engineering-context-*` | 짧은 metric anchor 중심 | 각 문서에 1개씩 case drill과 interview defense 추가 |

## 3. 이번 세션 적용 범위

- `engineering-language-runtime`: runtime evidence packet, GC/JIT/cancellation/serialization 측정 명령, 반려 예시, 리뷰 루브릭 추가
- `context-frontend-runtime-ecosystem`: bundle runtime evidence packet, dynamic import/hydration/polyfill 기준, 반려 예시 추가
- `practice-visual-design-foundations`: visual critique submission packet, weak/good critique 비교, reviewer rubric 추가
- `ai-native-evaluation-harness`: failing fixture, eval gate, CI 기준, rejected submission 예시 추가

## 4. 다음 작업 순서

1. `practice-data-visualization`에 chart honesty packet과 반려 예시 추가
2. `engineering-context-*` 7개에 case drill 1개씩 추가
3. 낮은 점수대 디자인 문서(`practice-motion-animation`, `practice-photography-image-literacy`, `practice-iconography-illustration`)에 submission packet 추가
4. 각 보강 문서의 핵심 판단을 `questionBank.mjs` 카드로 편입
5. `npm test`와 `npm run build`로 회귀 검증

## 5. 완료 정의

1. 모든 공식 문서에 최소 하나의 제출 가능한 packet이 있다.
2. 모든 공식 문서에 최소 하나의 반려 예시 또는 failure diagnosis가 있다.
3. 핵심 트랙 문서는 SRS 카드가 있어 복습 루프에 들어간다.
4. 문서 본문과 생성 모듈이 동기화되어 `npm test`, `npm run build`가 통과한다.
