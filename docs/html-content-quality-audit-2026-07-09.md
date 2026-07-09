# HTML 콘텐츠 품질 점검 보고서

- 점검일: 2026-07-09
- 점검 범위: `src/handbook/catalog.mjs`의 공식 메뉴 기준 HTML 114개
- 기준 순서: `HOME_HANDBOOKS` 이후 `HANDBOOK_GROUPS` 메뉴 순서
- 점검 방식: 서브에이전트 5개 병렬 점검, 로컬 정량 점검 보조
- 범위 한계: 공식 메뉴 114개를 1차 본문 감사 대상으로 삼았다. `SOURCE_HANDBOOKS` 95개, `ARCHIVE_HANDBOOKS` 22개, `public/handbook/index.html` 1개는 아래의 잔여 리스크로 별도 관리해야 한다.

## 감사 범위와 잔여 리스크

| 분류 | 수량 | 처리 | 잔여 리스크 |
|---|---:|---|---|
| 공식 메뉴 문서 | 114 | 문서별 발견사항에 모두 포함 | 본문 품질은 점검했지만 실제 HTML 수정은 아직 미수행 |
| `SOURCE_HANDBOOKS` | 95 | 공식 통합 문서에 병합된 원천으로 간주해 문서별 목록에서는 제외 | 원천 핵심 섹션이 통합 문서에 빠짐없이 반영됐는지 별도 대조 필요 |
| `ARCHIVE_HANDBOOKS` | 22 | 공식 메뉴 비노출, operations 축 통합 예정으로 간주 | 정적 URL 직접 접근 시 오래된 내용, 중복, 위험 명령이 노출될 수 있음 |
| `public/handbook/index.html` | 1 | 본문형 핸드북이 아니므로 문서별 품질 목록에서는 제외 | 링크 무결성, 비공식 문서 접근 경로, 노출 정책 점검 필요 |
| `CATALOG_DOCUMENTS` | 231 | 공식+source+archive 통합 카탈로그 | status별 표시, 검색 인덱스 포함 여부, 직접 접근 가능성 검증 필요 |
| `public/handbook/*.html` 전체 | 232 | 실제 정적 HTML 파일 전체 | 카탈로그 밖 HTML 1개(`index.html`)의 배포/노출 정책 확인 필요 |

본 보고서는 “공식 메뉴 기준 콘텐츠 품질”을 우선 감사한 결과다. “프로젝트 내 모든 HTML의 배포 리스크”까지 닫으려면 source/archive 병합 커버리지, 직접 URL 접근 가능성, 검색 인덱스 포함 여부, 생성 TS 동기화 상태를 추가 감사해야 한다.

## 점검 기준과 판정 방식

| 기준 | Fail | Partial | Pass |
|---|---|---|---|
| 메뉴-본문 일치 | 메뉴 label보다 실제 범위가 크게 넓거나 다른 원천 문서 hero가 남음 | 범위는 맞지만 읽기 순서가 불명확함 | 메뉴 목적, 목차, 본문 흐름이 일치함 |
| 최신성 | 기준일, 기준 버전, 확인 출처가 없음 | `UPDATED`는 있으나 API/벤더/버전별 확인 절차가 없음 | 기준일, 대상 버전, 갱신 주기, 확인 위치가 있음 |
| 검증 가능성 | 개념 설명만 있고 fixture, 명령, 로그, 지표가 없음 | 일부 예시는 있으나 정상/비정상 판정이 약함 | 입력, 기대 결과, 실패 조건, 검증 명령이 닫힘 |
| 산출물성 | “패킷/리포트/체크리스트” 이름만 있음 | 빈 템플릿 또는 예시 중 하나만 있음 | 빈 템플릿, 완성 예시, 자가검수 기준이 모두 있음 |
| Q&A 추적성 | 본문 앵커, 기준일, 증거 연결이 없음 | 일부 문항만 연결됨 | 모든 문항이 본문 앵커와 확인 산출물로 연결됨 |
| 안전성 | 위험 명령/보안/개인정보 조치에 즉시 실행 가능한 위험이 있음 | 경고는 있으나 명령 직전 가드가 부족함 | precheck, dry-run, rollback, 승인 조건이 명령 앞에 있음 |

Severity는 사용자 피해 가능성, 잘못된 실행 가능성, 최신성 변동성, 영향 문서 수, 수정 난이도를 함께 봤다. P0는 잘못 따라 하면 손상, 보안 사고, 비용 폭증, 허위 경력 위험으로 이어질 수 있는 항목이다. P1은 학습 흐름, 책임 경계, 운영 판단을 크게 흐리는 항목이다. P2는 품질과 실무 전환성을 높이는 보강 항목이다.

## 요약

공식 메뉴 문서 전반은 개념, 판단 기준, 실패 신호를 실무 언어로 연결하려는 방향이 분명하다. 다만 콘텐츠 품질 관점에서는 다음 문제가 반복된다.

1. 최신성 기준이 문서마다 다르다. 특히 Q&A, 클라우드, Kubernetes, LLM, 보안, OAuth/OIDC, SEO/AEO/GEO, Spring/JPA 문서에는 기준일, 기준 버전, 공식 문서 확인 절차가 더 필요하다.
2. 통합 문서의 범위가 과밀하다. 여러 원천 문서가 한 HTML에 합쳐지면서 원천 hero/source/footer가 남거나, 메뉴 label보다 훨씬 넓은 주제가 들어가 학습 흐름과 책임 경계가 흐려진다.
3. 체크리스트는 많지만 제출 가능한 산출물 샘플이 부족하다. incident packet, release packet, eval report, threat model, platform contract, evidence pack 같은 완성 예시가 더 필요하다.
4. Q&A 문서는 답변 훈련에는 좋지만 본문 앵커, 기준일, 재현 fixture, 로그/명령 출력, 실제 산출물 링크가 부족한 경우가 많다.
5. 실무 검증 자료가 부족하다. 실제 로그, `dig`, `openssl`, `kubectl`, Terraform plan, PromQL, `EXPLAIN ANALYZE`, Playwright/axe 결과, 비용 산식, 데이터셋 버전 같은 판독 자료가 문서별로 고르게 닫히지 않는다.

## 우선 수정 대상

| 우선순위 | 문서 | 문제 | 근거 수준 | 완료 조건 |
|---|---|---|---|---|
| P0 | `practice-cheat-sheets-handbook.html` | 위험 명령이 빠른 복사용 치트시트 안에 있으나 명령 직전 안전 가드가 부족하다. | 원문 확인+패턴 리스크 | 모든 위험 명령 앞에 precheck, 안전 대안, rollback, 승인 조건 추가 |
| P0 | `operations-cloud-scenarios-handbook.html`, `operations-cloud-scenarios-qa-handbook.html` | AWS/Azure 서비스, region, quota, managed service 제약의 기준일과 확인 절차가 부족하다. | 원문 확인+최신성 리스크 | 시나리오별 기준일, region, quota, 서비스명 매핑, 공식 문서 확인 항목 추가 |
| P0 | `operations-ai-llm-operations-handbook.html`, `operations-ai-llm-operations-qa-handbook.html` | LLM 운영의 provider/model/API/eval/safety policy 버전 기준이 부족하다. | 원문 확인+최신성 리스크 | provider/model/API/eval/safety policy 버전 표와 changelog 확인 루틴 추가 |
| P0 | `operations-runtime-orchestration-handbook.html` | Kubernetes 기준 버전, probe/PDB/rollout manifest 예시가 부족하다. | 원문 확인 | 기준 Kubernetes 버전, probe YAML, PDB, rollout 실패 실습 추가 |
| P0 | `career-personal-history-handbook.html` | 정량 이력 수치의 원천 증거, 공개 가능 범위, 산정 기준이 부족해 과장 위험이 있다. | 원문 확인+커리어 리스크 | 프로젝트별 증거 위치, 공개 범위, 수치 산정 기준 열 추가 |
| P1 | `engineering-frontend-performance-handbook.html` | 번들링, 렌더링, 성능 지표, DevTools가 과밀 통합되어 학습 흐름이 끊긴다. | 원문 확인 | 개념/지표/도구를 분리하거나 성능 진단 시나리오 중심으로 재배열 |
| P1 | `practice-ax-scale-governance-handbook.html` | AX 확장, 거버넌스, 보안, 평가, 사례가 한 문서에 묶여 운영 모델이 묻힌다. | 원문 확인 | RACI, exception, audit cadence 중심의 governance operating model 추가 |
| P1 | `practice-design-systems-handbook.html` | 디자인 실행, 폼, 컴포넌트, 토큰, 접근성, 테스트, 핸드오프가 과밀 통합되어 책임 경계가 흐리다. | 원문 확인 | 디자인 실행 품질 gate 중심 재배열 또는 하위 문서 분리 기준 제시 |

## 정량 점검 신호

- 공식 메뉴 HTML 수: 114개
- 공식 메뉴 중 본문량 1,000어절 미만: `operations-ai-llm-operations-handbook.html`, `context-*` 다수, AI Native 일부, `career-ai-native-portfolio-handbook.html`
- 기준일 신호가 약한 문서: `operations-private-connectivity-qa-handbook.html`, `ai-native-workday-timeline-handbook.html`, `ai-native-competency-map-handbook.html`, `ai-native-labs-handbook.html`, `ai-native-evaluation-harness-handbook.html`, `ai-native-agent-runtime-handbook.html`, `career-ai-native-portfolio-handbook.html`
- 명시적 rubric/checklist 신호가 약한 문서: `context-platform-productivity-handbook.html`, `context-performance-metrics-handbook.html`, `context-library-oss-handbook.html`, `context-frontend-runtime-ecosystem-handbook.html`, `context-operational-ownership-handbook.html`, `ai-native-labs-handbook.html`

## 정량 점검 방법과 재현 규칙

| 검사 항목 | 탐지 방식 | 임계값/판정 | 오탐 가능성 | 후속 수동 확인 |
|---|---|---|---|---|
| 본문량 | HTML tag 제거 후 토큰 수 집계 | 1,000어절 미만이면 얕은 문서 후보 | 치트시트/요약 문서는 짧아도 의도일 수 있음 | 산출물 예시와 실습 fixture 존재 여부 확인 |
| section 수 | `<section` 개수 | 7개 미만이면 구조 부족 후보 | 짧은 Q&A/요약 문서는 예외 가능 | 목차와 실제 학습 흐름 확인 |
| 코드/명령 예시 | `<code`, `<pre` 개수 | 운영/개발 문서에서 0~1개면 검증 자료 부족 후보 | 개념 문서는 코드가 불필요할 수 있음 | 로그, 명령 출력, fixture 대체 자료 확인 |
| 최신성 신호 | `UPDATED`, `기준일`, `version`, `20xx` 패턴 | 변동성 큰 문서에서 없으면 Fail 후보 | 날짜가 footer에만 있을 수 있음 | 상단 메타데이터와 기준 버전 확인 |
| rubric/checklist 신호 | `rubric`, `통과 기준`, `체크리스트`, `검증` 패턴 | 실습형 문서에서 없으면 산출물성 부족 후보 | 본문 표현이 다를 수 있음 | 완료 기준과 자가검수 표 존재 확인 |
| 위험 명령 | `rm -rf`, `reset --hard`, `force`, `drop`, `delete`, `kubectl delete` 등 | 명령 직전 안전 가드 없으면 P0 후보 | 예시로만 언급된 명령일 수 있음 | 실제 실행 가능 코드블록인지 확인 |
| source/footer 잔존 | `SOURCE`, 중복 hero/footer 문구 탐지 | 통합 문서 안에 원천 문서 흔적이 남으면 범위 과밀 후보 | 의도적 출처 표시일 수 있음 | 독자가 새 문서로 오인하는지 확인 |

정량 신호는 최종 판정이 아니라 후보 탐지다. 최종 severity는 원문을 읽고 메뉴 목적, 독자 행동, 최신성 변동성, 잘못 실행했을 때의 피해를 함께 판단했다.

## 신호별 권장 조치

| 신호 | 권장 조치 |
|---|---|
| 본문량 1,000어절 미만 | 최소 산출물 예시 1개, 실습 fixture 1개, 통과 기준 1개 추가 |
| 기준일 신호 약함 | 상단 메타데이터에 기준일, 기준 버전, 공식 확인 위치, 갱신 주기 추가 |
| rubric/checklist 신호 약함 | “완료 조건 / 실패 조건 / 제출 산출물” 표 추가 |
| Q&A 앵커 부족 | 각 문항에 관련 본문 앵커, 기준일, 확인 산출물 추가 |
| 위험 명령 존재 | 명령 직전 precheck, dry-run, 백업/복구, 승인 조건 추가 |
| 통합 문서 과밀 | 독자 수준, 책임자, 산출물이 3개 이상 갈라지면 분리 후보로 표시 |
| 생성물 동기화 불확실 | `npm run generate:handbook` 후 diff, loader, search index 갱신 확인 |

## 실행 단위별 수정 백로그

| 작업 ID | 대상 | 작업 단위 | 완료 조건 | 검증 방법 |
|---|---|---|---|---|
| B-01 | P0 문서 전체 | 각 P0 문서를 작은 수정 PR 단위로 분해 | 문서별 완료 조건과 검수 명령이 존재 | 보고서의 P0 표와 실제 수정 diff 대조 |
| B-02 | `practice-cheat-sheets-handbook.html` | 위험 명령 전체 목록 추출 후 명령 직전 안전 가드 삽입 | 모든 위험 코드블록 앞에 precheck/dry-run/rollback/승인 조건 존재 | `rg -n "reset --hard|rm -rf|drop|delete|force" public/handbook/practice-cheat-sheets-handbook.html` 후 주변 문맥 확인 |
| B-03 | 모든 Q&A 문서 | Q&A 공통 템플릿 적용 | 문항마다 관련 본문 앵커와 확인 산출물 존재 | HTML에서 `href="#..."`와 “확인 산출물” 패턴 확인 |
| B-04 | 클라우드/LLM/Kubernetes 문서 | 최신성 메타데이터 표준화 | 기준일, 대상 버전, 공식 문서 확인 위치, 갱신 주기 존재 | 상단 메타데이터 블록 수동 확인 |
| B-05 | 통합 과밀 문서 | 분리 후보 판정표 작성 | 독자 수준, 책임자, 산출물 기준으로 분리/재배열 결정 기록 | 문서별 목차와 메뉴 label 대조 |
| B-06 | source/archive | 병합 커버리지 대조 | source는 병합 대상 공식 문서와 핵심 섹션 매핑, archive는 잔존 리스크 표시 | `CATALOG_DOCUMENTS` status별 목록과 공식 메뉴 비교 |
| B-07 | 생성 TS | HTML 원본과 생성 모듈 동기화 확인 | generate 후 diff가 의도한 보고서 파일 외 없음 | `npm run generate:handbook`, `git diff -- src/handbook/documents src/handbook/documentLoaders.ts` |

## 일괄 적용 Quick Wins

1. 모든 공식 문서 상단에 `기준일 / 대상 버전 / 공식 확인 위치 / 갱신 주기` 메타데이터 슬롯을 추가한다.
2. 모든 Q&A 문항에 `관련 본문`, `검증 증거`, `나쁜 답변`, `확인 산출물` 슬롯을 추가한다.
3. “패킷”, “리포트”, “체크리스트”, “템플릿”이라는 단어가 있는 문장에는 빈 템플릿 링크 자리와 완성 예시 자리 중 하나를 붙인다.
4. 위험 명령 코드블록 앞에는 공통 안전 callout을 삽입한다.
5. `SOURCE` 또는 원천 문서 hero가 남은 통합 문서는 “원천 병합 안내”와 “현재 문서에서 읽을 순서”를 첫 화면에 추가한다.
6. 본문량 1,000어절 미만 공식 문서에는 최소 1개의 실습 fixture 또는 산출물 예시를 추가한다.
7. 클라우드, LLM, 보안, SEO, Spring/JPA 문서에는 “현재 기준 확인 필요” 배지를 달고 공식 문서 확인 절차를 넣는다.

## 생성기·템플릿 레벨 개선안

- 공통 메타데이터 스키마: `updated`, `verifiedAgainst`, `sourceDocs`, `refreshCadence`, `owner`, `evidenceRequired`.
- Q&A 카드 템플릿: 질문, 핵심 답변, 관련 본문 앵커, 기준일/버전, 재현 fixture, 확인 명령, 완료 산출물, 나쁜 답변.
- 위험 명령 callout: 목적, 먼저 확인할 명령, 안전 대안, 실행 조건, rollback, 승인/기록 위치.
- 산출물 샘플 슬롯: 빈 템플릿, 완성 예시, 자가검수 기준, 제출 전 확인 명령.
- 통합 문서 검사: 중복 hero/footer, `SOURCE` 잔존, 메뉴 label-본문 범위 불일치, 목차 앵커 누락을 자동 탐지.
- 생성물 동기화 검사: `public/handbook/*.html`, `src/handbook/documents/*.ts`, `documentLoaders.ts`, `searchIndex.mjs`가 catalog와 일치하는지 CI에서 확인.

## 문서 유형별 보강 패턴

| 유형 | 필수 보강 블록 |
|---|---|
| Q&A형 | 본문 앵커, 기준일, 좋은 답변/나쁜 답변, 검증 증거, 관련 산출물 |
| 운영 Runbook형 | 탐지 신호, 명령 출력 예시, severity matrix, rollback, 커뮤니케이션 템플릿 |
| 개념+실습형 | 최소 실습, fixture, 실패 예시, 통과 기준, 다음 심화 링크 |
| 면접형 | 경험 경계, 공개 가능 증거, 수치 산정 기준, 자기 경험 입력란, 과장 금지 문구 |
| 디자인/UX형 | before/after, 리뷰 코멘트 예시, handoff packet, 접근성/토큰 검증 |
| LLM/AI형 | 모델/API/평가셋 버전, eval report, red-team fixture, cost/latency trace |
| 위험 명령형 | precheck, dry-run, 안전 대안, 백업/복구, 승인/감사 로그 |

## 산출물 샘플 최소 스키마

모든 `packet`, `report`, `checklist`, `template` 예시는 최소한 다음 필드를 가져야 한다.

- 목적: 이 산출물이 어떤 결정을 가능하게 하는가
- 입력: 필요한 로그, fixture, 사용자 시나리오, 정책, 기준 버전
- 판단 기준: pass/fail, severity, rollback, 승인 기준
- 증거: 명령 출력, 스크린샷, trace, test result, query result
- 소유자/승인자: 작성자, 검토자, 최종 승인자
- 실패 시 조치: rollback, 재검증, escalation, 사용자 공지
- 완료 예시: 실제 값이 들어간 짧은 샘플

## HTML 수정자 체크리스트

- 상단 메타데이터에 기준일, 기준 버전, 확인 출처, 갱신 주기가 있는가
- 메뉴 label과 본문 범위가 일치하는가
- 목차 링크가 실제 section과 연결되는가
- Q&A 문항이 관련 본문 앵커와 연결되는가
- 개념 설명 뒤에 fixture, 명령, 로그, 지표, 테스트 중 최소 하나의 검증 자료가 있는가
- 산출물명만 있고 빈 템플릿이나 완성 예시가 없는 문장이 남아 있지 않은가
- 위험 명령은 명령 직전 안전 가드가 있는가
- 최신성이 큰 주제는 공식 문서 확인 절차가 있는가
- 통합 문서는 중복 hero/footer/source 잔존이 독자에게 혼동을 주지 않는가
- 수정 후 `npm run generate:handbook`, `npm test`, `npm run build`로 원본 HTML, 생성 TS, 앱 번들 동기화를 확인했는가

## HTML 원본과 생성 모듈 동기화 리스크

README 기준 공식 원본은 `public/handbook/*.html`이고 앱용 모듈은 생성 스크립트로 동기화된다. 따라서 콘텐츠 보강 후 다음 검증을 별도 작업으로 수행해야 한다.

1. `npm run generate:handbook` 실행 후 `src/handbook/documents/*.ts`와 `src/handbook/documentLoaders.ts` diff 확인
2. `HANDBOOK_ITEMS` 114개와 생성 document module 114개 일치 확인
3. `searchIndex.mjs`와 검색 결과가 최신 HTML을 반영하는지 확인
4. `SOURCE_HANDBOOKS`/`ARCHIVE_HANDBOOKS`가 검색이나 직접 URL로 노출될 때 stale 경고가 필요한지 확인
5. `npm test`로 catalog, 목차, section 일치 검증

## 메뉴 순서별 발견사항

### 홈

- `00 홈` (`home-handbook.html`): [Medium] 전체 흐름은 좋지만 evidence pack, runbook, checklist 같은 완료 산출물명이 실제 파일, 템플릿, 예시 링크로 연결되지 않는다. 트랙별 완성 예시, 빈 템플릿, 자가검수 기준을 붙여야 한다.

### CS 기본

- `00 CS 기초와 알고리즘 사고` (`engineering-cs-foundations-handbook.html`): [Low] 비용 모델 기준값이 먼저 제시되지만 환경별 보정 절차가 뒤로 밀린다. 비용 모델 표 바로 아래에 로컬 측정 명령과 샘플 결과 양식이 필요하다.
- `01 컴퓨터 시스템·OS·네트워크 기초` (`engineering-computer-systems-handbook.html`): [Medium] `top`, `vmstat`, `strace`, `ss` 같은 도구는 나오지만 정상/비정상 출력과 판정 분기가 부족하다. fd 누수, OOMKilled, connect timeout 재현 예시가 필요하다.
- `02 프로그래밍 언어·런타임` (`engineering-language-runtime-handbook.html`): [Medium] 타입 시스템, AST, GC 카드에 CPU, 메모리, 커널, I/O 중심 템플릿 문구가 반복되어 주제 적합성이 떨어진다. schema fixture, codemod test, JFR/Profiler evidence로 바꿔야 한다.
- `03 응용 수학·측정·검증` (`engineering-applied-math-measurement-handbook.html`): [Medium] 표본 크기, 검정력, 신뢰구간 계산 예시가 얕다. 전환율이나 latency 개선 사례로 sample size, CI, guardrail 판정을 계산하는 예제가 필요하다.

### 프론트엔드

- `00 프론트엔드 핵심` (`engineering-frontend-core-handbook.html`): [Medium] 개요, 브라우저, 접근성이 한 문서에 묶여 초급 독자의 실습 순서가 약하다. 상태 행렬, 브라우저 trace, 접근성 수동 검증을 누적 과제로 연결해야 한다.
- `01 프론트엔드 핵심 Q&A` (`engineering-frontend-core-qa-handbook.html`): [Low] 답변과 본문 섹션 앵커가 직접 연결되지 않는다. 각 Q에 관련 본문 링크와 확인 산출물을 붙여야 한다.
- `02 프론트엔드 인터랙션` (`engineering-frontend-interaction-handbook.html`): [Medium] hook/상태기계 예시는 좋지만 cancel, unmount, pointer capture 해제, stale async 실패 경로가 코드 수준에서 덜 닫힌다.
- `03 프론트엔드 인터랙션 Q&A` (`engineering-frontend-interaction-qa-handbook.html`): [Low] 면접 훈련 구조는 좋지만 상태 전이표, QA 시나리오, 설계 패킷 완성본으로 이어지지 않는다.
- `04 프론트엔드 모션·애니메이션` (`engineering-frontend-motion-handbook.html`): [Medium] duration/easing 수치의 출처와 제품별 보정 절차가 부족하다. 반복 업무 UI, 마케팅 화면, 저사양 모바일별 motion budget 예시가 필요하다.
- `05 프론트엔드 모션·애니메이션 Q&A` (`engineering-frontend-motion-qa-handbook.html`): [Low] motion API와 CSS 기능은 최신성 확인이 필요한데 Q&A 기준일과 browser baseline 확인 루틴이 약하다.
- `06 프론트엔드 그래픽·3D·WebGL` (`engineering-frontend-graphics-3d-handbook.html`): [Medium] GPU 예산, context loss, fallback은 다루지만 iOS Safari, Android 저사양, 내장 GPU 같은 실제 검증 매트릭스가 부족하다.
- `07 프론트엔드 그래픽·3D·WebGL Q&A` (`engineering-frontend-graphics-3d-qa-handbook.html`): [Low] 그래픽 경험이 적은 독자를 위한 prototype, `renderer.info`, pixel test, fallback 캡처 순서가 부족하다.
- `08 프론트엔드 성능·진단` (`engineering-frontend-performance-handbook.html`): [High] 번들링, 렌더링, 성능 지표, DevTools가 한 문서에 이어 붙어 범위가 과밀하다. 개념/지표와 도구 사용법을 분리하거나 시나리오 중심으로 재배열해야 한다.
- `09 프론트엔드 성능·진단 Q&A` (`engineering-frontend-performance-qa-handbook.html`): [Medium] INP, Core Web Vitals, Lighthouse 등 변동성이 큰 항목을 다루지만 Q&A 기준일이 부족하다.
- `10 SEO·AEO·GEO·애널리틱스` (`engineering-frontend-seo-analytics-handbook.html`): [Medium] AEO/GEO 검증이 query set, snapshot 수준에 머문다. 플랫폼별 관찰 기록 예시와 보장 불가 판정 문구가 필요하다.
- `11 SEO·AEO·GEO·애널리틱스 Q&A` (`engineering-frontend-seo-analytics-qa-handbook.html`): [Medium] SEO, structured data, GA4, AI 답변 노출은 정책 변화가 큰데 기준일과 공식 문서 확인 항목이 부족하다.
- `12 프론트엔드 품질·릴리스` (`engineering-frontend-quality-handbook.html`): [Medium] 보안, 테스트, 배포가 풍부하지만 변경 유형별 필수 gate가 흩어져 있다. 문구 변경, 라우팅 변경, 인증 변경별 release gate matrix가 필요하다.
- `13 프론트엔드 품질·릴리스 Q&A` (`engineering-frontend-quality-qa-handbook.html`): [Low] release checklist, E2E trace, dashboard 키워드는 있으나 완성된 release packet 샘플이 없다.

### 백엔드

- `00 백엔드 핵심` (`engineering-backend-core-handbook.html`): [Medium] API, Spring, DB, JPA, 동시성, 캐시, 비동기, 테스트, 운영, 아키텍처가 한 문서에 들어가 실습 흐름이 약하다. 최소 구현 과제, 검증 명령, 실패 케이스 경로가 필요하다.
- `01 백엔드 핵심 Q&A` (`engineering-backend-core-qa-handbook.html`): [Low] 답변 형식은 좋지만 샘플 PR, 테스트, 로그 같은 문항별 증거 패킷이 부족하다.
- `02 백엔드 인증·보안` (`engineering-backend-auth-security-handbook.html`): [Medium] 세션, JWT, OAuth2/OIDC, OWASP, cookie, 보안 헤더의 기준일과 참조 버전이 부족하다.
- `03 백엔드 인증·보안 Q&A` (`engineering-backend-auth-security-qa-handbook.html`): [Medium] tenant escape, replay, SSRF, JWT, MFA 등 보안 문답에 입력 payload, 기대 응답, 감사 로그 fixture가 부족하다.
- `04 백엔드 아키텍처` (`engineering-backend-architecture-handbook.html`): [Medium] 패턴 설명은 좋지만 전환 비용 산정 기준이 얕다. 트래픽, 팀 수, 배포 빈도, 장애 전파, 데이터 소유권 점수표와 ADR 샘플이 필요하다.
- `05 백엔드 아키텍처 Q&A` (`engineering-backend-architecture-qa-handbook.html`): [Low] 원칙 중심 답변이 많고 실제 설계 리뷰 코멘트 예시가 부족하다.
- `06 데이터 계층·저장소 심화` (`engineering-data-handbook.html`): [Medium] PostgreSQL, Redis 예시는 많지만 엔진 버전, 관리형 DB 차이, 로컬 실습과 운영 차이가 명확히 고정되지 않는다.
- `07 데이터 계층·저장소 심화 Q&A` (`engineering-data-qa-handbook.html`): [Medium] 느린 쿼리, MVCC, replica lag, Redis 장애에 실제 관측 SQL/메트릭과 정상/비정상 판정 기준이 부족하다.
- `08 런타임 품질·장애대응` (`engineering-runtime-quality-handbook.html`): [Medium] 메시징, 테스트, 관측성이 합쳐져 장애 발생, 탐지, 완화, 회고 흐름이 분산된다.
- `09 런타임 품질·장애대응 Q&A` (`engineering-runtime-quality-qa-handbook.html`): [Low] p99, retry, DLQ, SLO, rollback 문답은 좋지만 15분/30분/60분 인시던트 타임라인 드릴이 부족하다.
- `10 플랫폼 도구·운영 기본기` (`engineering-platform-tools-handbook.html`): [Medium] Docker, Linux, vi, nginx, CI/CD, 배포가 섞여 운영 필수 경로와 개인 도구 참고가 같은 수준으로 보인다.
- `11 플랫폼 도구·운영 기본기 Q&A` (`engineering-platform-tools-qa-handbook.html`): [Low] 위험 작업 문항에 precheck, command, readback, rollback, 기록 위치 템플릿이 더 필요하다.
- `12 Java·Spring·JPA 내부 동작` (`engineering-java-spring-handbook.html`): [Medium] 입문 예시와 내부 동작 심화가 섞인다. 실행 시점, SQL, 트랜잭션 로그 중심 추적 예시를 더 배치해야 한다.
- `13 Java·Spring·JPA 내부 동작 Q&A` (`engineering-java-spring-qa-handbook.html`): [Low] Spring Boot, JPA, Hibernate 버전별 차이와 최소 재현 테스트 코드가 부족하다.

### 인프라

- `00 인프라·운영 로드맵` (`operations-roadmap-handbook.html`): [Medium] AWS/Azure/EKS/AKS, SLO, DR, 보안 경계가 압축되어 범위가 넓다. 클라우드, Kubernetes, DR 기준일과 적용 버전 표가 필요하다.
- `01 인프라·운영 로드맵 Q&A` (`operations-roadmap-qa-handbook.html`): [Medium] Q&A 기준일이 부족하다. SLO, control plane/data plane, rollback drill은 변경 가능성이 크다.
- `02 서비스 요청 경로` (`operations-request-path-handbook.html`): [Medium] DNS, CDN/WAF, LB, App, DB 흐름은 좋지만 traceId, LB health, DB pool 지표를 한 사건으로 엮은 incident packet이 부족하다.
- `03 서비스 요청 경로 Q&A` (`operations-request-path-qa-handbook.html`): [Low] `dig`, TLS handshake, LB health, app log, DB pool metric 출력 샘플이 부족하다.
- `04 VPC·Subnet·Routing·NAT` (`operations-vpc-routing-handbook.html`): [Medium] CIDR, subnet 설계가 개념 중심이다. IPAM, subnet capacity, peering/VPN/Private Endpoint 확장 계산표가 필요하다.
- `05 VPC·Subnet·Routing·NAT Q&A` (`operations-vpc-routing-qa-handbook.html`): [Medium] Transit Gateway, PrivateLink, Reachability Analyzer 같은 고급 주제가 본문보다 앞서지만 클라우드별 차이와 기준일이 없다.
- `06 보안 경계` (`operations-security-boundary-handbook.html`): [Medium] 공개면, WAF, IAM, secret은 다루지만 데이터 유출 경로, 감사 로그 무결성, 권한 경계 검증 산출물이 약하다.
- `07 보안 경계 Q&A` (`operations-security-boundary-qa-handbook.html`): [Medium] least privilege, audit coverage, log integrity 기준이 CIS/NIST/조직 정책 중 무엇인지 명확하지 않다.
- `08 DNS·TLS·도메인 운영` (`operations-dns-tls-handbook.html`): [Medium] DNS/TLS 변경 절차는 있으나 CA/B Forum, 주요 브라우저, 인증서 자동 갱신 정책 기준일과 명령 예시가 부족하다.
- `09 DNS·TLS·도메인 운영 Q&A` (`operations-dns-tls-qa-handbook.html`): [Medium] authoritative/recursive/SNI/OCSP 판단 질문에 `dig +trace`, `openssl s_client`, resolver cache 비교 출력이 부족하다.
- `10 VPN·Private Connectivity` (`operations-private-connectivity-handbook.html`): [Medium] VPN/BGP/MTU 장애 재현 절차가 부족하다. IKE/IPsec 파라미터, MTU/MSS 테스트, BGP failover checklist가 필요하다.
- `11 VPN·Private Connectivity Q&A` (`operations-private-connectivity-qa-handbook.html`): [Medium] Direct Connect, BGP, PrivateLink의 벤더별 용어와 cloud/vendor/customer 책임 경계가 불명확하다.
- `12 AWS·Azure 실전 시나리오` (`operations-cloud-scenarios-handbook.html`): [High] 서비스 SKU, quota, region, managed service 제약의 최신성 기준이 부족하다. 시나리오별 기준일, 대상 region, quota, 서비스명 매핑 표가 필요하다.
- `13 AWS·Azure 실전 시나리오 Q&A` (`operations-cloud-scenarios-qa-handbook.html`): [High] 클라우드 Q&A 기준일이 부족하다. region, quota, managed DB failover, IAM/managed identity, provider outage는 최신성이 핵심이다.

### 운영

- `00 CI/CD·Artifact·Environment` (`operations-delivery-pipeline-handbook.html`): [Medium] artifact와 rollback은 다루지만 SBOM, attestation, signature 검증 예시가 부족하다.
- `01 CI/CD·Artifact·Environment Q&A` (`operations-delivery-pipeline-qa-handbook.html`): [Medium] supply-chain 질문에 SLSA, SBOM, runner isolation 기준 버전과 정책 확인 절차가 부족하다.
- `02 컨테이너·오케스트레이션·Health Check` (`operations-runtime-orchestration-handbook.html`): [High] Kubernetes 기준 버전, readiness/liveness/startup probe YAML, PDB, rollout 실패 실습이 부족하다.
- `03 컨테이너·오케스트레이션·Health Check Q&A` (`operations-runtime-orchestration-qa-handbook.html`): [Medium] pod, probe, PDB, node drain 문답에 Kubernetes 버전과 `kubectl describe/events/logs` 샘플이 부족하다.
- `04 IaC·변경관리·Drift` (`operations-iac-change-handbook.html`): [Medium] Terraform/OpenTofu, provider 버전, provider lock, plan artifact 보존 규칙이 부족하다.
- `05 IaC·변경관리·Drift Q&A` (`operations-iac-change-qa-handbook.html`): [Medium] 실제 plan diff 판독 예시와 승인/중단 기준표가 부족하다.
- `06 Observability·SLO` (`operations-observability-slo-handbook.html`): [Medium] RED/USE, burn rate 개념은 있으나 PromQL, 로그 쿼리, trace sampling, dashboard layout 예시가 부족하다.
- `07 Observability·SLO Q&A` (`operations-observability-slo-qa-handbook.html`): [Medium] OpenTelemetry semantic convention 기준일과 벤더 중립/벤더별 차이 구분이 부족하다.
- `08 Incident Response·Rollback·DR` (`operations-incident-dr-handbook.html`): [Medium] incident commander checklist, customer update cadence, severity 승격/하향 기준이 산출물화되어 있지 않다.
- `09 Incident Response·Rollback·DR Q&A` (`operations-incident-dr-qa-handbook.html`): [Medium] 좋은/나쁜 postmortem 비교와 action item 종료 기준이 부족하다.
- `10 운영 체크리스트·면접 답변` (`operations-checklist-interview-handbook.html`): [Medium] 운영 인수 체크리스트와 면접 답변 프레임이 섞여 실제 운영 산출물 흐름이 약하다.
- `11 운영 체크리스트·면접 답변 Q&A` (`operations-checklist-interview-qa-handbook.html`): [Low] 답변 예시마다 실제 산출물, 명령 출력, runbook 링크 필요 여부가 표시되지 않는다.
- `12 AI·LLM 운영 Addendum` (`operations-ai-llm-operations-handbook.html`): [High] provider/model/API, eval dataset, safety policy 버전 기준이 부족하다.
- `13 AI·LLM 운영 Addendum Q&A` (`operations-ai-llm-operations-qa-handbook.html`): [High] fallback model, provider outage, structured output, safety filter의 최신성 확인 절차가 부족하다.
- `14 엔지니어링 규모 감각` (`context-scale-systems-handbook.html`): [Medium] QPS, fan-out, retry amplification, queue backlog 같은 숫자 기반 capacity worksheet가 부족하다.
- `15 플랫폼 엔지니어링·개발자 생산성` (`context-platform-productivity-handbook.html`): [Medium] Golden path, DX 지표, 플랫폼 계약이 SLO, 지원 범위, 비용 배분 템플릿으로 닫히지 않는다.
- `16 품질 엔지니어링·릴리즈 시스템` (`context-quality-release-handbook.html`): [Medium] blocker 기준, risk-based testing matrix, release sign-off 예시가 부족하다.
- `17 성능 측정·지표 해석` (`context-performance-metrics-handbook.html`): [Medium] baseline, workload, environment 표와 통계적 비교 절차가 부족하다.
- `18 라이브러리·패키지·오픈소스 설계` (`context-library-oss-handbook.html`): [Medium] npm `exports`, ESM/CJS, type 배포, changelog, release note 예시가 부족하다.
- `19 마이그레이션·호환성` (`context-migration-compatibility-handbook.html`): [Medium] backfill 검증, dual-write/read 비교, rollback 불가 지점, cutover/abort 기준이 부족하다.
- `20 프론트엔드 빌드·런타임·생태계` (`context-frontend-runtime-ecosystem-handbook.html`): [Medium] Vite/Webpack/Next, browserslist, polyfill 정책, bundle analysis 예시가 부족하다.
- `21 운영 책임·장애 대응 언어` (`context-operational-ownership-handbook.html`): [Medium] owner matrix, on-call handoff checklist, escalation ladder가 부족하다.

### LLM

- `00 LLM 로드맵·AI Native 개발자 모델` (`llm-roadmap-handbook.html`): [Medium] 모델/API 변화가 빠른데 기준일, 검증한 API 세대, 대체 API 확인 항목이 부족하다.
- `01 AI Native 작업 표준·Definition of Done` (`llm-ai-native-work-standards-handbook.html`): [Medium] context package, eval dataset, security fixture 요구가 강하지만 solo, 팀, 프로덕션 최소 DoD 구분이 부족하다.
- `02 LLM 기초·모델 동작 원리` (`llm-fundamentals-handbook.html`): [Medium] token, context, sampling, hallucination, model selection의 모델별 차이 확인 체크리스트가 부족하다.
- `03 프로덕션 프롬프팅·구조화 출력` (`llm-prompting-handbook.html`): [Low] schema 실패, 의미 검증 실패, tool 승인 실패별 repair budget과 fallback 예시가 부족하다.
- `04 RAG·임베딩·벡터DB` (`llm-rag-handbook.html`): [Medium] pgvector/Chroma 선택에 규모, latency, recall, 백업, 권한 필터 성능 벤치마크 절차가 부족하다.
- `05 LLM 평가·품질 관리` (`llm-evaluation-handbook.html`): [Medium] human review 표본 수, reviewer agreement, 라벨 품질 관리 절차가 부족하다.
- `06 Agent·Tool Use·Workflow` (`llm-agents-tool-use-handbook.html`): [Medium] 중간 실패 후 resume, idempotency, 중복 tool call 방어를 보여주는 상태 머신과 trace 예시가 부족하다.
- `07 LLM 보안·거버넌스` (`llm-security-governance-handbook.html`): [Medium] OWASP LLM Top 10 2025 기준은 좋지만 보안, 법무, 제품, 엔지니어링 RACI가 부족하다.
- `08 LLM 앱 아키텍처·운영` (`llm-app-architecture-operations-handbook.html`): [Medium] token 단가, retry, cache hit, fallback routing을 반영한 월 비용 산식 예시가 부족하다.
- `09 멀티모달·파일·음성·Realtime` (`llm-multimodal-realtime-handbook.html`): [Medium] 녹취, 이미지 PII, 파일 악성 콘텐츠, consent, retention, 삭제 요청 절차가 부족하다.
- `10 Fine-tuning·Customization·Model Routing` (`llm-model-customization-handbook.html`): [Medium] 최소 데이터량, holdout 구성, hard negative 비율, 안전 회귀 기준이 추상적이다.
- `11 포트폴리오 프로젝트` (`llm-portfolio-projects-handbook.html`): [Low] RAG, 평가, AX evidence, UX evidence 요구는 좋지만 MVP, strong, production-like 단계별 제출 기준이 부족하다.

### AI Native

- `00 AI Agent·Loop 업무 흐름` (`ai-native-workday-timeline-handbook.html`): [Medium] 산출물 중심이지만 lead time, rework, 결함 유출, 검증 실패율 같은 AI Loop 성과 지표가 부족하다.
- `01 실제 업무과정` (`ai-native-real-workflow-handbook.html`): [Low] 백오피스 환불 승인 사례에 강하게 묶여 다른 도메인 전이 기준이 약하다. 불변 루프와 교체 변수 표가 필요하다.
- `02 요구사항 정의·문제 분해` (`ai-native-competency-map-handbook.html`): [Medium] PM, 운영, 개발, 보안 간 요구사항 충돌과 의사결정권자, unresolved decision log가 부족하다.
- `03 기획·사용자 시나리오 설계` (`ai-native-labs-handbook.html`): [Medium] 사용자 흐름과 상태표는 있지만 운영자 관찰, 사용성 테스트, 정책 확인 인터뷰 같은 검증 절차가 부족하다.
- `04 UX/UI 디자인 검토와 화면 설계` (`ai-native-toolkit-handbook.html`): [Medium] 누락 탐지 관점은 좋지만 정보 위계, 밀도, 문구 톤, 토큰 일관성 판정 예시가 부족하다.
- `05 프론트엔드 구현 루프` (`ai-native-evaluation-harness-handbook.html`): [Medium] fixture 기준은 있지만 테스트 파일 구조, 스냅샷, axe, Playwright 연결 방식과 pass/fail 로그가 부족하다.
- `06 백엔드·DB·API 설계 루프` (`ai-native-security-red-team-handbook.html`): [Medium] 권한, 트랜잭션, 감사 로그는 있으나 PII 보존/삭제, 재처리 idempotency, 외부 장애 시 정합성 테스트가 부족하다.
- `07 테스트·리뷰·릴리스 자동화` (`ai-native-agent-runtime-handbook.html`): [Medium] 롤백 조건은 있지만 post-release watch window, metric threshold, incident handoff 템플릿이 부족하다.
- `08 AX 기반·조직 적용` (`practice-ax-foundation-handbook.html`): [Medium] 변화관리 저항, 책임, 인센티브 문제가 약하다. 이해관계자별 저항 패턴과 대응 playbook이 필요하다.
- `09 AX 실행 루프·자동화` (`practice-ax-workflow-handbook.html`): [Medium] 자동화 설계, context engineering, harness, loop engineering이 이어 붙어 초심자 우선순위가 흐리다.
- `10 AX 확장·거버넌스` (`practice-ax-scale-governance-handbook.html`): [High] 거버넌스, 보안, 평가, 사례, 플레이북이 과밀 통합되어 운영 체계가 묻힌다. RACI, exception, audit cadence가 별도 상위 섹션으로 필요하다.

### 디자인

- `00 디자인 기반·사용자 흐름` (`practice-design-foundation-handbook.html`): [Medium] 문제정의, IA, flow, handoff가 통합되어 있으나 리서치 신호가 IA와 flow 결정으로 변환되는 완성형 사례가 부족하다.
- `01 디자인 실행·시스템 품질` (`practice-design-systems-handbook.html`): [High] 인터랙션, 폼, 컴포넌트, 토큰, AX, 접근성, 테스트, 핸드오프까지 포함해 메뉴 label보다 범위가 넓다.
- `02 시각디자인 기초·조형 원리` (`practice-visual-design-foundations-handbook.html`): [Low] squint test, grayscale, before/after 판단이 텍스트 중심이다. 실패 코멘트와 수정 후 리뷰 예시가 필요하다.
- `03 색채·타이포그래피·브랜드 시각 언어` (`practice-color-typography-brand-handbook.html`): [Medium] OKLCH, semantic color, type scale은 좋지만 token naming, fallback, contrast report, handoff 샘플이 부족하다.
- `04 아이콘·일러스트레이션 시스템` (`practice-iconography-illustration-handbook.html`): [Medium] icon request, 중복 메타포 방지, deprecation, 버전 관리 절차가 부족하다.
- `05 데이터 시각화` (`practice-data-visualization-handbook.html`): [Low] 차트 표현 검증은 좋지만 원천 데이터 결측, 표본 편향, 집계 정의 변경을 확인하는 data QA checklist가 부족하다.
- `06 모션·애니메이션 원리` (`practice-motion-animation-handbook.html`): [Medium] 60fps, reduced motion, transform 원칙은 있으나 DevTools Performance, CPU throttling, low-end device 측정 절차가 부족하다.
- `07 사진학·이미지 리터러시` (`practice-photography-image-literacy-handbook.html`): [Medium] AI/스톡 이미지 점검은 있지만 모델 릴리스, 초상권, 상업 사용 범위, 출처 기록 방식이 부족하다.
- `08 AI 제품 UX·신뢰 설계` (`design-ai-product-ux-handbook.html`): [Medium] 출처, 근거, human handoff는 좋지만 모델 버전, 지식 기준일, 평가셋 갱신 주기, 성능 저하 감지 기준이 부족하다.

### 실무 도구

- `00 실무 치트시트 모음` (`practice-cheat-sheets-handbook.html`): [High] 빠른 복사 목적의 치트시트에 `git reset --hard`, `rm -rf node_modules`류 위험 명령이 있으나 명령 직전 안전 절차가 부족하다. 확인 명령, 안전 대안, 최후 명령 구조가 필요하다.
- `01 실무 준비·작업 루프` (`practice-workflow-setup-handbook.html`): [Medium] 로드맵, FAQ, 새 PC 설정, 플레이북이 통합되어 첫 사용자와 장애 사용자의 분기 기준이 약하다. 30분, 반나절, 1주 루트가 필요하다.
- `02 빌드·설정·릴리스 운영` (`practice-build-release-handbook.html`): [Medium] Gradle, Spring Boot, Java 기준과 예시 버전은 있으나 왜 그 버전인지, 언제 갱신할지, EOL/보안 패치 확인 절차가 부족하다.

### 커리어

- `00 면접 전략·커리어 포지셔닝` (`career-strategy-foundation-handbook.html`): [Medium] gate 질문마다 직접 경험, 판단 기준, 실패 조건, 확인 증거 분리 문구가 반복되어 채점 기준으로 쓰기 어렵다.
- `01 개인 이력 정리` (`career-personal-history-handbook.html`): [High] 커밋 수, Jira 수, 기간, 역할 등 정량 정보의 원천 증거 위치와 공개 가능 범위가 부족해 과장 위험이 있다.
- `02 프론트엔드·JS/TS 면접` (`career-frontend-interview-handbook.html`): [Medium] 답변 품질은 좋지만 독자가 본인 프로젝트로 바꾸는 빈 답변 카드와 채점표가 부족하다.
- `03 백엔드·Java/Spring 면접` (`career-backend-interview-handbook.html`): [Medium] API contract, query log, migration plan을 요구하지만 CRUD, 권한, 트랜잭션, N+1 재현 미니 과제가 부족하다.
- `04 CS·DB·보안 심화 면접` (`career-core-deep-dive-handbook.html`): [Medium] CS, DB, 보안 심화가 넓게 묶여 약점별 훈련 루트가 부족하다.
- `05 인프라·분산·클라우드 면접` (`career-infra-distributed-cloud-handbook.html`): [Medium] provider-agnostic 원칙은 좋지만 AWS/Azure/GCP, Kubernetes 버전, 관리형 서비스별 차이 기준표가 부족하다.
- `06 시스템 설계·프로젝트 심층` (`career-system-project-handbook.html`): [Medium] actor, data, API, observability, rollback 설명은 좋지만 다이어그램, API contract, 상태 전이표, capacity 가정 예시가 부족하다.
- `07 컬처·협업·코드리뷰` (`career-culture-collaboration-handbook.html`): [Medium] STAR와 리뷰 기준은 있으나 나쁜 원문 경험을 면접 답변과 증거 첨부로 변환하는 before/after 예시가 부족하다.
- `08 코딩테스트 패턴` (`career-coding-test-handbook.html`): [Medium] 패턴 설명은 충실하지만 난이도별 문제 목록, 제한 시간, 제출 후 회고 양식, 오답 노트 템플릿이 부족하다.
- `09 AI Native 포트폴리오` (`career-ai-native-portfolio-handbook.html`): [Medium] 문서가 짧고 외부 템플릿 의존이 크다. RAG, Agent, 자동화 프로젝트별 완성 샘플과 eval/red-team 예시가 필요하다.

## 공통 개선안

1. 모든 공식 문서 상단에 `UPDATED`, `검증 기준일`, `기준 버전`, `공식 문서 확인 위치`, `갱신 주기` 메타데이터를 표준화한다.
2. Q&A 문서에는 관련 본문 앵커, 기준일, 재현 fixture, 기대 로그/출력, 답변 후 확인 산출물을 붙인다.
3. 통합 문서는 원천 hero/source/footer 잔존 여부를 정리하고, 메뉴 label과 실제 범위가 맞지 않는 문서는 분리하거나 첫 화면에 읽기 루트를 둔다.
4. 각 그룹마다 완성 산출물 샘플을 최소 1개씩 둔다. 예: release packet, incident packet, threat model, eval report, design handoff, portfolio evidence pack.
5. 빠른 참조 문서의 위험 명령은 명령 바로 앞에 precheck, dry-run, 안전 대안, 복구 가능성, 승인 조건을 배치한다.
6. 최신성이 큰 문서는 “현재 기준 확인 필요” 표시를 두고 공식 changelog나 vendor docs 확인 절차를 문서의 일부로 만든다.
