# 공식 핸드북 콘텐츠 감사 — 2026-07-02

작성일: 2026-07-02  
대상: 공식 메뉴(`HANDBOOK_ITEMS`) 82개 중, 이미 정밀 검토했거나 당일 개정한 10개를 제외한 **72개**  
목적: "기반지식으로 믿고 숙지해도 되는가"를 정확성, 실무 밀도, 학습 가치 관점에서 판정

## 0. 감사 방식과 판정 기준

감사는 두 단계로 진행했다.

1. **정량 스크리닝**: 코드 블록, 표, 긴 문단, 수치 밀도, 반복 섹션 패턴을 기준으로 얇은 문서와 과대평가 가능 문서를 추렸다.
2. **정성 감사**: 6개 클러스터로 나눠 문서별 등급(A/B/C), 근거, gap, 정확성 리스크를 확인했다.

등급 기준은 다음과 같다.

| 등급 | 의미 | 판정 기준 |
| --- | --- | --- |
| A | 바로 숙지할 가치가 높은 문서 | 실코드, 수치, 사례, 실패 모드, 판단 기준이 있어 시니어도 배울 밀도가 있음 |
| B | 방향은 맞지만 밀도가 부족한 문서 | 개념과 정확성은 대체로 맞으나 표·원칙 중심이라 코드, 수치, Before/After, 실제 출력 보강이 필요 |
| C | 개정 우선 문서 | filler가 40% 이상이거나 단독 학습 가치가 낮고, 현재 형태로는 공식 숙지 대상에 두기 어려움 |

이번 감사는 "문서가 존재하는가"가 아니라 "숙지했을 때 실력이 되는가"를 기준으로 봤다. 따라서 B는 실패가 아니라 **정확하지만 아직 훈련 밀도가 부족한 상태**를 뜻한다.

## 1. 핵심 결론

**정확성은 합격선이다. 그러나 전체의 절반 이상이 아직 '얇은 정확함'에 머물러 있다.**

- **C 등급은 2개뿐이다.** 8일 안에 생성된 대량 콘텐츠치고 스텁과 명백한 허위가 적다. 스텁 의심 문서였던 ai-native 계열 6개, `career-ai-native-portfolio`, `career-personal-history`는 전수 확인 결과 스텁이 아니었다. 일부는 짧지만 압축된 훈련 문서였고, `career-personal-history`는 오히려 커리어 번들 중 밀도가 높았다.
- **명백한 사실 오류는 제한적이다.** 72개 중 확인된 사실 오류는 5건이다. 그중 사용자가 따라 하면 실제로 잘못된 설정이나 운영 판단으로 이어질 수 있는 실무 오류는 2건이다.
- **A 등급은 23개로 충분하지 않다.** 나머지 47개가 B다. 즉, 목차상으로는 필요한 지식이 있으나, 숙지했을 때 경쟁력이 되는 수준까지는 코드, 수치, 실측 결과, 사례를 더 넣어야 한다.
- **가장 큰 ROI는 LLM 문서군이다.** 핵심 트랙인데도 12개 중 A가 없고, 실행 가능한 API 코드와 실측 수치가 거의 없다. 이 문서군을 먼저 끌어올리면 전체 학습 가치가 가장 크게 오른다.

## 2. 즉시 고칠 사실 오류

아래 항목은 내용 품질 개선보다 먼저 고쳐야 한다. 특히 P0 항목은 사용자가 그대로 따라 하면 잘못된 실무 행동으로 이어질 수 있다.

| 우선순위 | 문서 | 문제 | 정정 방향 |
| --- | --- | --- | --- |
| P0 | `practice-workflow-setup` | MCP 서버를 `~/.claude/settings.json`의 `mcpServers`에 넣으라고 안내 | Claude Code 기준 설정 경로와 명령을 재확인해 `claude mcp add`, `.mcp.json`, `~/.claude.json` 중 실제 지원되는 방식으로 정리. `mcpServers`는 Claude Desktop 관례이므로 혼동 제거. Homebrew cask `claude-code`, cmux 하위 명령도 함께 검증 |
| P0 | `practice-build-release` | Spring Boot 설정 precedence 표에서 시스템 프로퍼티와 OS 환경변수 순서가 뒤바뀜 | 실제 우선순위에 맞게 시스템 프로퍼티가 OS 환경변수보다 앞서도록 수정. Flyway 인라인 지시문 문법, pnpm store 경로 불일치, `ghcr` push 권한 누락도 같은 수정 묶음으로 처리 |
| P1 | `llm-security-governance` | OWASP LLM Top 10을 2023 v1.0 명칭으로 유지 | 2025 개정판 명칭과 항목으로 갱신. 예: Insecure Output Handling -> Improper Output Handling, Model DoS -> Unbounded Consumption, System Prompt Leakage 등 신설 항목 반영 |
| P1 | `operations-vpc-routing` | 예시 라우트 `0.0.0.0/0 -> GatewayId: local`은 AWS에서 성립하지 않음 | local 라우트는 VPC CIDR 대상임을 명시. 실패 시나리오는 "0.0.0.0/0 라우트 부재" 또는 "IGW 오지정"으로 교체. VPC 문서에 CIDR 계산 예시도 복구 |
| P2 | `engineering-applied-math-measurement` | `VECTOR SIMILARITY` 카드가 CSS 미정의 클래스 `concept-card` 사용 | 표시 결함이므로 `semantic-card` 등 실제 정의된 클래스로 교체 |

## 3. 등급 분포

전체 72개 문서의 분포는 **A 23 / B 47 / C 2**다.

| 클러스터 | 문서 수 | A | B | C | 해석 |
| --- | ---: | ---: | ---: | ---: | --- |
| 엔지니어링 | 12 | 6 | 5 | 1 | frontend-core, interaction, backend-architecture, data, runtime-quality, platform-tools가 A. 일부 정량 지표의 `code 0`은 semantic-card div 안에 코드가 들어간 구조 때문에 생긴 오탐 |
| 엔지니어링 맥락 | 8 | 0 | 8 | 0 | 8개가 같은 템플릿을 공유한다. CASE 카드는 쓸 만하지만 개념부가 진부하고 수치 앵커가 부족 |
| 인프라·운영 | 14 | 1 | 13 | 0 | roadmap만 A. PRACTICE LAB의 실명령과 Before/After가 C를 막지만, MODEL/CHECK/PLAYBOOK 표 반복이 많음 |
| LLM | 12 | 0 | 11 | 1 | 개념과 fixture 방향은 좋으나 실행 가능한 API 코드와 실측 수치가 없어 B 천장에 걸림. roadmap은 단독 밀도가 낮아 C |
| AI Native·AX·실무도구 | 12 | 11 | 1 | 0 | 스텁 의심은 대부분 기각. 짧아도 fixture, pass criteria, 산출물이 갖춰져 있음. `workflow-setup`만 정확성 검증 필요로 B |
| 디자인·커리어 | 14 | 5 | 9 | 0 | motion, photography, personal-history, core-deep-dive, infra가 A. 커리어 문서는 뒤쪽 drill은 강하지만 앞쪽 Q&A가 일반론에 머무는 bimodal 구조 |

## 4. C 등급 문서

### `engineering-frontend-seo-analytics`

10개 섹션이 대부분 규범적 표와 체크리스트로 구성되어 있다. 코드, 수치, 사례가 거의 없고 AEO/GEO 설명도 "AI가 안정적으로 확인한다"류의 당위문에 머문다.

개정 방향:

- JSON-LD 실제 마크업 예시 추가
- GA4 이벤트 설계와 `gtag`/GTM 예시 추가
- `hreflang`, canonical, sitemap의 실패 사례와 검증 명령 추가
- Core Web Vitals 임계 수치와 SEO 지표 오진 사례 추가
- "검색 노출"과 "제품 분석"을 분리해 각각의 판단 기준을 명확히 함

### `llm-roadmap`

현재는 orientation 테이블 위주의 인덱스 문서다. 11개 LLM 문서로 가는 입구라면 짧은 인덱스로도 괜찮지만, "로드맵"이라는 제목에 비해 실제 학습 순서와 산출물이 약하다. failure-mode matrix와 `request_evidence` YAML만 구체적이다.

선택지는 둘 중 하나다.

- **인덱스로 인정**: 제목과 기대치를 낮추고, 각 LLM 문서로 이동하는 짧은 관문으로 유지한다.
- **학습 로드맵으로 재편**: 주차별 산출물, API 실습, 평가 하네스, 실패 모드 점검표를 추가해 단독 학습 문서로 만든다.

## 5. B를 A로 올리는 레버

B 문서의 공통 약점은 "틀림"이 아니라 "훈련으로 변환되지 않음"이다. 개정할 때는 문단을 더 늘리기보다 아래 재료를 넣어야 한다.

| 영역 | 현재 격차 | A로 올리는 보강 |
| --- | --- | --- |
| LLM 12개 | 실행 가능한 API 코드와 수치가 거의 없음 | `messages.create`, tool definition(`input_schema`), tool-use loop, structured output, prompt caching, streaming 이벤트, adaptive thinking/effort 같은 실제 제어 표면을 코드와 함께 추가 |
| operations 14개 | 실무 랩은 있으나 심화 스니펫이 부족 | Terraform module, nginx conf, CIDR 계산, EXPLAIN, 장애 재현 명령, 지연·비용 수치 추가 |
| context 8개 | 규모 감각이 목적인데 표준 수치가 CASE 카드에만 몰림 | Core Web Vitals 임계값, DORA 구간, MTTR 목표, semver 관례처럼 기억해야 할 수치 앵커를 개념 표에 직접 삽입 |
| career B 문서 | 면접 조언은 있으나 실제 출력물이 부족 | layout thrashing 재현 코드, `EXPLAIN ANALYZE` 실제 plan, coding-test 구현 템플릿, 30초 답변 Before/After 추가 |

## 6. 개정 우선순위

| 순서 | 작업 | 이유 | 예상 단위 |
| --- | --- | --- | --- |
| 1 | P0 사실 오류 수정 | 따라 하면 틀리는 문서를 먼저 제거해야 함 | 반나절 |
| 2 | C 등급 2개 처리 | 공식 숙지 대상의 최저선을 회복 | 문서당 1세션 |
| 3 | LLM 문서군 실코드 주입 | 핵심 트랙인데 전체가 B 천장에 걸려 있어 ROI가 가장 큼 | 여러 세션 |
| 4 | operations 심화 스니펫, context 수치 앵커, career 실출력 보강 | B 다수의 학습 밀도를 끌어올리는 구조적 개선 | 점진 작업 |
| 5 | A 23개 유지 및 질문 은행 편입 | 이미 밀도가 높은 문서는 개정보다 회상·훈련 카드화가 우선 | 병행 가능 |

## 7. 완료 기준

이 감사 후속 작업이 끝났다고 보려면 아래 조건을 만족해야 한다.

1. P0 사실 오류 2건이 수정되고, P1 정확성 이슈 2건의 정정 방향이 문서에 반영된다.
2. C 등급 문서가 0개가 된다. 단, `llm-roadmap`을 인덱스로 유지하기로 결정한 경우에는 제목과 역할을 명확히 낮춘다.
3. LLM 문서군 중 최소 4개가 실행 가능한 API 코드, tool-use loop, structured output, 실측/평가 기준을 포함한다.
4. B 문서 개정 시 "표 추가"가 아니라 코드, 수치, 실패 사례, Before/After 중 하나 이상이 섹션 단위로 들어간다.
5. A 문서 23개는 불필요하게 다시 쓰지 않고, SRS 질문 은행과 크리틱/판단 카드로 먼저 전환한다.

## 8. 결론

"기반지식에 부족함이 없는가"에 대한 답은 둘로 나뉜다.

- **정확성 관점**: 큰 문제는 아니다. 치명적 오류는 적고, 스텁도 거의 없다.
- **경쟁력 관점**: 아직 부족하다. 절반 이상이 B이며, 정확한 개념 설명을 넘어 실전 판단력으로 바뀌려면 코드, 수치, 실패 사례, 실제 산출물이 더 필요하다.

따라서 다음 단계는 새 문서를 늘리는 일이 아니다. 먼저 사실 오류와 C 문서를 정리하고, LLM·operations·career의 B 문서에 실행 가능한 재료를 넣어야 한다. 그 다음 A 문서는 더 고치기보다 질문 은행과 반복 학습 루프로 옮겨 숙지 가능한 자산으로 만들어야 한다.
