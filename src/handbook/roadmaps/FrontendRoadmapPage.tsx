import { RoadmapPage, type RoadmapProcessStep, type RoadmapTrack } from "./RoadmapPage";

const diagram = `
flowchart TD
  A["01 문제"] --> B["02 UX 상태"]
  B --> C["03 웹 플랫폼"]
  C --> D["04 React"]
  D --> E["05 API 계약"]
  E --> F["06 품질"]
  F --> G["07 발견성"]
  G --> H["08 운영 피드백"]
  H --> B
`;

const process: RoadmapProcessStep[] = [
  {
    title: "요구사항 분해",
    output: "사용자 과업, 완료 조건, 화면 상태, API 필요 데이터, 추적 지표를 화면 계약서 한 장으로 정리한다.",
    checks: ["happy path보다 빈 상태·오류·권한·지연 상태가 먼저 적힌다", "디자인·API·분석 이벤트가 같은 용어를 쓴다", "사용자 성공 기준이 전환·완료 시간·오류율 중 하나로 잡힌다", "필수 데이터와 있으면 좋은 데이터가 구분된다"],
    handoff: "상태 모델과 API fixture를 만들 기준이 된다.",
  },
  {
    title: "상태 모델링",
    output: "URL, server state, client state, form state, animation state를 분리하고 상태 전이표로 고정한다.",
    checks: ["새로고침·뒤로가기·공유 URL에서 상태가 보존된다", "loading과 optimistic update가 같은 상태 머신으로 설명된다", "권한 만료·부분 실패·재시도 흐름이 화면에 드러난다", "cache invalidation 조건이 사용자 행동과 연결된다"],
    handoff: "컴포넌트 책임과 데이터 fetching 정책의 입력이 된다.",
  },
  {
    title: "구현 구조화",
    output: "route, feature, component, hook, API client, schema의 책임 경계를 정하고 변경 이유별로 파일을 나눈다.",
    checks: ["컴포넌트가 데이터 fetching과 표현 책임을 동시에 갖지 않는다", "공통화는 반복 제거가 아니라 변경 이유 기준으로 한다", "runtime schema가 서버·URL·스토리지 경계에 배치된다", "렌더링 경계와 lazy loading 기준이 라우트별로 보인다"],
    handoff: "테스트 경계와 성능 budget을 어디에 걸지 결정한다.",
  },
  {
    title: "검증",
    output: "unit, component, accessibility, E2E, visual, performance budget을 PR과 릴리스 게이트로 묶는다.",
    checks: ["테스트가 구현 디테일보다 사용자 행동과 계약을 검증한다", "성능·접근성 회귀가 PR에서 보인다", "mock 통과와 실제 API 통합 실패를 구분한다", "실패한 테스트가 어떤 사용자 피해로 이어지는지 설명된다"],
    handoff: "배포 가능 여부와 rollback 판단 근거가 된다.",
  },
  {
    title: "발견성과 계측",
    output: "SEO, AEO, GEO, structured data, event taxonomy, funnel, content freshness를 같은 릴리스 기준으로 관리한다.",
    checks: ["검색 노출과 LLM 인용 가능성이 HTML 구조와 본문 근거에 드러난다", "이벤트 이름만 있고 의사결정 질문이 없는 계측을 배제한다", "canonical·sitemap·status code·schema.org가 배포 전 확인된다", "funnel 지표가 UX 변경의 성공·실패 판단으로 돌아온다"],
    handoff: "운영 대시보드와 콘텐츠 개선 backlog로 이어진다.",
  },
  {
    title: "운영 피드백",
    output: "release health, error boundary, session replay, Core Web Vitals, conversion을 다음 설계 수정으로 연결한다.",
    checks: ["배포 후 24시간 관측 창이 있다", "장애·성능·전환 지표가 backlog 우선순위로 돌아온다", "sourcemap, build version, route, user action이 오류 이벤트에 붙는다", "개선 항목이 재현 조건과 측정 지표를 같이 가진다"],
    handoff: "다음 요구사항 분해 때 실제 사용자 데이터로 우선순위를 다시 잡는다.",
  },
];

const tracks: RoadmapTrack[] = [
  {
    title: "제품 문제와 UX 상태",
    intent: "프론트엔드 구현을 화면 조립이 아니라 사용자 목표와 상태 전이 문제로 시작한다.",
    nodes: [
      { id: "FE-01", title: "사용자 과업 모델", why: "화면은 기능 목록이 아니라 사용자가 끝내야 할 과업의 압축 표현이다.", artifacts: ["task map"], failureSignals: ["버튼은 많은데 완료 조건이 불명확"], evidence: ["primary task success metric"], links: ["프론트엔드 핵심"] },
      { id: "FE-02", title: "화면 상태 표", why: "loading, empty, error, partial, permission 상태가 없으면 구현 후 UX 부채가 된다.", artifacts: ["state table"], failureSignals: ["에러 문구가 API 예외 그대로 노출"], evidence: ["state fixture screenshot"], links: ["프론트엔드 인터랙션"] },
      { id: "FE-03", title: "정보 구조", why: "탐색 구조는 SEO, 접근성, 라우팅, 분석 이벤트의 공통 골격이다.", artifacts: ["IA tree"], failureSignals: ["breadcrumb와 URL이 다른 언어를 쓴다"], evidence: ["route inventory"], links: ["SEO·AEO·GEO·애널리틱스"] },
      { id: "FE-04", title: "사용자 입력 여정", why: "입력은 validation, focus, keyboard, server error, retry가 묶인 상호작용이다.", artifacts: ["form flow"], failureSignals: ["submit 실패 후 무엇을 고칠지 모름"], evidence: ["keyboard-only test"], links: ["프론트엔드 데이터·상태·폼"] },
      { id: "FE-05", title: "성공·실패 기준", why: "UX 결정은 취향이 아니라 전환, 완료 시간, 오류율로 검증되어야 한다.", artifacts: ["UX acceptance criteria"], failureSignals: ["좋아 보인다는 말로 승인"], evidence: ["before/after funnel"], links: ["프론트엔드 품질·릴리스"] },
    ],
  },
  {
    title: "웹 플랫폼 기초",
    intent: "HTML, CSS, JS, 브라우저 런타임을 프레임워크 아래의 실행 환경으로 이해한다.",
    nodes: [
      { id: "FE-06", title: "Semantic HTML", why: "HTML 구조는 접근성 트리, 검색 크롤러, LLM 추출의 원본 데이터다.", artifacts: ["landmark outline"], failureSignals: ["div 클릭 요소 남발"], evidence: ["screen reader heading map"], links: ["프론트엔드 핵심"] },
      { id: "FE-07", title: "CSS 레이아웃 시스템", why: "Grid, flex, container query를 알아야 반응형을 패치가 아니라 시스템으로 만든다.", artifacts: ["layout constraint map"], failureSignals: ["viewport별 임의 px 보정"], evidence: ["320/768/1024/1440 screenshots"], links: ["프론트엔드 핵심"] },
      { id: "FE-08", title: "브라우저 렌더링", why: "style, layout, paint, composite 비용을 알아야 성능 병목을 설명한다.", artifacts: ["render cost trace"], failureSignals: ["memo만 넣고 병목 미확인"], evidence: ["Performance panel trace"], links: ["프론트엔드 성능·진단"] },
      { id: "FE-09", title: "JavaScript 이벤트 루프", why: "input delay, async race, rendering starvation은 이벤트 루프 이해 없이는 해결이 어렵다.", artifacts: ["async timeline"], failureSignals: ["setTimeout으로 우연히 해결"], evidence: ["INP trace"], links: ["프론트엔드 성능·진단"] },
      { id: "FE-10", title: "TypeScript 경계", why: "타입은 서버·폼·URL·스토리지 경계에서 런타임 검증과 함께 설계해야 한다.", artifacts: ["schema boundary"], failureSignals: ["as any로 계약을 덮음"], evidence: ["runtime parse failure test"], links: ["TypeScript·JavaScript 런타임"] },
    ],
  },
  {
    title: "React 아키텍처",
    intent: "React를 컴포넌트 문법이 아니라 렌더링 모델, 상태 소유권, 데이터 흐름 설계로 다룬다.",
    nodes: [
      { id: "FE-11", title: "컴포넌트 책임", why: "표현, 상태, 데이터 접근, 레이아웃 책임이 섞이면 재사용이 아니라 결합도가 늘어난다.", artifacts: ["component responsibility matrix"], failureSignals: ["props drilling과 hidden side effect"], evidence: ["component dependency graph"], links: ["프론트엔드 핵심"] },
      { id: "FE-12", title: "상태 소유권", why: "local, lifted, context, URL, server state의 소유권을 분리해야 예측 가능하다.", artifacts: ["state ownership map"], failureSignals: ["전역 store에 모든 것 저장"], evidence: ["refresh/back/share scenarios"], links: ["프론트엔드 데이터·상태·폼"] },
      { id: "FE-13", title: "렌더링 경계", why: "memo, Suspense, lazy loading은 경계 설계 없이 적용하면 복잡도만 늘린다.", artifacts: ["render boundary diagram"], failureSignals: ["불필요한 re-render 원인 미측정"], evidence: ["React Profiler capture"], links: ["프론트엔드 성능·진단"] },
      { id: "FE-14", title: "Hook 설계", why: "hook은 로직 재사용보다 lifecycle과 외부 시스템 동기화 책임을 캡슐화한다.", artifacts: ["hook contract"], failureSignals: ["dependency array 경고를 무시"], evidence: ["effect cleanup test"], links: ["TypeScript·JavaScript 런타임"] },
      { id: "FE-15", title: "에러 경계", why: "UI 오류는 사용자 복구, 로깅, partial render 전략까지 포함해야 한다.", artifacts: ["error boundary plan"], failureSignals: ["흰 화면 또는 무한 spinner"], evidence: ["forced render error test"], links: ["프론트엔드 품질·릴리스"] },
    ],
  },
  {
    title: "데이터와 API 계약",
    intent: "프론트엔드도 API 계약을 같이 잡고 화면 상태와 서버 응답의 간극을 줄인다.",
    nodes: [
      { id: "FE-16", title: "API 응답 모델", why: "list, detail, pagination, partial failure, nullability를 화면 상태와 함께 설계한다.", artifacts: ["response schema"], failureSignals: ["optional chaining으로 데이터 결함 은폐"], evidence: ["contract fixture"], links: ["TypeScript·JavaScript 런타임"] },
      { id: "FE-17", title: "데이터 fetching", why: "cache, stale, refetch, optimistic update는 사용자 신뢰와 서버 비용을 동시에 좌우한다.", artifacts: ["fetch policy table"], failureSignals: ["새로고침해야 최신화"], evidence: ["cache invalidation test"], links: ["프론트엔드 데이터·상태·폼"] },
      { id: "FE-18", title: "폼 검증 계약", why: "client validation은 UX용, server validation은 신뢰 경계라는 차이를 명확히 해야 한다.", artifacts: ["validation matrix"], failureSignals: ["서버 에러가 field에 매핑되지 않음"], evidence: ["400 response mapping test"], links: ["프론트엔드 데이터·상태·폼"] },
      { id: "FE-19", title: "권한과 세션", why: "401, 403, expired session, hidden action은 라우팅과 UI 상태 모두에 영향을 준다.", artifacts: ["auth state chart"], failureSignals: ["권한 없는 버튼이 계속 노출"], evidence: ["permission route test"], links: ["프론트엔드 보안"] },
      { id: "FE-20", title: "실시간 데이터", why: "polling, SSE, WebSocket은 freshness, ordering, reconnect 정책으로 선택한다.", artifacts: ["realtime policy"], failureSignals: ["중복 알림 또는 순서 역전"], evidence: ["reconnect simulation"], links: ["프론트엔드 인터랙션"] },
    ],
  },
  {
    title: "품질과 테스트",
    intent: "테스트를 코드 줄 수가 아니라 사용자 계약, 회귀 비용, 릴리스 판단 근거로 설계한다.",
    nodes: [
      { id: "FE-21", title: "Unit 테스트", why: "순수 계산, formatter, state reducer는 빠르고 결정적인 테스트로 고정한다.", artifacts: ["unit test matrix"], failureSignals: ["DOM까지 띄워 계산 검증"], evidence: ["edge case coverage"], links: ["프론트엔드 품질·릴리스"] },
      { id: "FE-22", title: "Component 테스트", why: "컴포넌트 테스트는 props가 아니라 사용자의 읽기·입력·결과를 검증해야 한다.", artifacts: ["interaction test"], failureSignals: ["className만 검증"], evidence: ["role/query based test"], links: ["프론트엔드 품질·릴리스"] },
      { id: "FE-23", title: "E2E 핵심 경로", why: "결제, 가입, 검색, 저장 같은 경로는 시스템 경계 전체를 확인한다.", artifacts: ["critical path suite"], failureSignals: ["mock만 통과하고 실제 API 실패"], evidence: ["CI E2E artifact"], links: ["프론트엔드 품질·릴리스"] },
      { id: "FE-24", title: "Visual Regression", why: "디자인 시스템과 반응형 깨짐은 DOM assertion만으로는 잡히지 않는다.", artifacts: ["visual baseline"], failureSignals: ["텍스트 겹침을 배포 후 발견"], evidence: ["viewport diff"], links: ["프론트엔드 그래픽·3D·WebGL"] },
      { id: "FE-25", title: "접근성 테스트", why: "접근성은 체크리스트가 아니라 키보드, 이름, 역할, 상태의 실행 계약이다.", artifacts: ["a11y audit"], failureSignals: ["focus trap 또는 label 누락"], evidence: ["axe and keyboard run"], links: ["프론트엔드 핵심"] },
    ],
  },
  {
    title: "성능과 렌더링 운영",
    intent: "성능을 빠른 느낌이 아니라 route, component, network, runtime budget으로 관리한다.",
    nodes: [
      { id: "FE-26", title: "Core Web Vitals", why: "LCP, INP, CLS는 사용자 경험을 배포 게이트로 바꾸는 최소 공통 언어다.", artifacts: ["web vitals budget"], failureSignals: ["평균만 보고 p75 악화 무시"], evidence: ["field data dashboard"], links: ["프론트엔드 성능·진단"] },
      { id: "FE-27", title: "Bundle 전략", why: "코드 분할, tree shaking, dependency audit은 초기 렌더링 비용을 좌우한다.", artifacts: ["bundle report"], failureSignals: ["공통 chunk 비대화"], evidence: ["bundle analyzer diff"], links: ["프론트엔드 성능·진단"] },
      { id: "FE-28", title: "이미지와 폰트", why: "이미지·폰트 로딩은 LCP, CLS, 브랜드 품질을 동시에 건드린다.", artifacts: ["asset loading policy"], failureSignals: ["폰트 swap으로 레이아웃 흔들림"], evidence: ["LCP element trace"], links: ["프론트엔드 성능·진단"] },
      { id: "FE-29", title: "메모리와 leak", why: "긴 세션의 성능 저하는 이벤트 리스너, cache, canvas, subscription 누수에서 자주 온다.", artifacts: ["memory profile"], failureSignals: ["탭을 오래 열면 느려짐"], evidence: ["heap snapshot comparison"], links: ["프론트엔드 성능·진단"] },
      { id: "FE-30", title: "그래픽·모션 예산", why: "모션과 WebGL은 GPU·배터리·접근성 예산 안에서 설계되어야 한다.", artifacts: ["motion budget"], failureSignals: ["reduced motion 무시"], evidence: ["FPS and reduced-motion test"], links: ["프론트엔드 모션·애니메이션"] },
    ],
  },
  {
    title: "발견성, SEO·AEO·GEO, 분석",
    intent: "검색 엔진, 답변 엔진, LLM 인용, 제품 분석을 같은 콘텐츠·HTML·계측 시스템으로 묶는다.",
    nodes: [
      { id: "FE-31", title: "Technical SEO", why: "크롤링, canonical, sitemap, status code, rendering 방식이 발견성의 기술 기반이다.", artifacts: ["SEO release checklist"], failureSignals: ["JS 렌더 후에만 핵심 콘텐츠 표시"], evidence: ["crawl result"], links: ["SEO·AEO·GEO·애널리틱스"] },
      { id: "FE-32", title: "Structured Data", why: "schema.org와 명확한 엔티티 구조는 검색·답변 시스템이 내용을 해석하는 단서다.", artifacts: ["structured data map"], failureSignals: ["마크업과 실제 콘텐츠 불일치"], evidence: ["rich result validation"], links: ["SEO·AEO·GEO·애널리틱스"] },
      { id: "FE-33", title: "AEO", why: "Answer Engine은 짧은 정의보다 질문 의도, 근거, 비교, 최신성을 요구한다.", artifacts: ["answer block inventory"], failureSignals: ["제목은 질문인데 본문에 직접 답 없음"], evidence: ["SERP answer coverage"], links: ["SEO·AEO·GEO·애널리틱스"] },
      { id: "FE-34", title: "GEO", why: "LLM 검색은 출처 명확성, 문맥 독립성, 사실 검증 가능성을 더 강하게 요구한다.", artifacts: ["LLM citation packet"], failureSignals: ["브랜드 주장만 있고 근거 없음"], evidence: ["citation prompt audit"], links: ["SEO·AEO·GEO·애널리틱스"] },
      { id: "FE-35", title: "Product Analytics", why: "이벤트는 클릭 수집이 아니라 제품 의사결정 질문에 답해야 한다.", artifacts: ["event taxonomy"], failureSignals: ["이벤트는 많은데 지표 정의 없음"], evidence: ["funnel and cohort dashboard"], links: ["SEO·AEO·GEO·애널리틱스"] },
    ],
  },
  {
    title: "릴리스와 운영 피드백",
    intent: "프론트엔드도 배포 이후 오류, 성능, 전환, 사용자 세션을 읽고 다음 설계로 돌려야 한다.",
    nodes: [
      { id: "FE-36", title: "Release Gate", why: "기능 완료는 merge가 아니라 테스트, 접근성, 성능, 계측, rollback 준비가 닫힌 상태다.", artifacts: ["release gate"], failureSignals: ["배포 후 확인 항목 없음"], evidence: ["release checklist result"], links: ["프론트엔드 품질·릴리스"] },
      { id: "FE-37", title: "Error Observability", why: "클라이언트 오류는 route, user action, build version, API correlation이 있어야 복구된다.", artifacts: ["error event schema"], failureSignals: ["minified stack만 수집"], evidence: ["sourcemap verified issue"], links: ["프론트엔드 품질·릴리스"] },
      { id: "FE-38", title: "Session Replay", why: "재현 어려운 UI 결함은 privacy-safe replay와 event timeline으로 좁힌다.", artifacts: ["replay sampling policy"], failureSignals: ["민감정보 masking 누락"], evidence: ["redacted replay sample"], links: ["프론트엔드 품질·릴리스"] },
      { id: "FE-39", title: "Experimentation", why: "A/B 테스트는 UI 취향 경쟁이 아니라 가설, guardrail, 통계 해석 문제다.", artifacts: ["experiment brief"], failureSignals: ["전환만 보고 오류율 악화 무시"], evidence: ["guardrail metric report"], links: ["SEO·AEO·GEO·애널리틱스"] },
      { id: "FE-40", title: "Design System 운영", why: "디자인 시스템은 컴포넌트 저장소가 아니라 접근성, 토큰, 사용 정책, 변경 관리 체계다.", artifacts: ["component adoption map"], failureSignals: ["비슷한 버튼 변종 증가"], evidence: ["token and usage audit"], links: ["프론트엔드 품질·릴리스"] },
    ],
  },
];

const gates = [
  { title: "제품 경계", checks: ["요구사항을 화면 상태와 API 계약으로 변환한다", "사용자 성공 기준과 실패 상태를 함께 제시한다"] },
  { title: "구현 경계", checks: ["React 아키텍처를 상태 소유권과 렌더링 비용으로 설명한다", "브라우저 렌더링과 TypeScript 경계를 근거로 구현한다"] },
  { title: "운영 경계", checks: ["성능, 접근성, SEO·AEO·GEO, 계측을 릴리스 게이트에 넣는다", "배포 후 오류·전환·Web Vitals를 다음 backlog로 연결한다"] },
];

export default function FrontendRoadmapPage() {
  return (
    <RoadmapPage
      serial="DOC : FRONTEND-DEEP-ROADMAP"
      title="프론트엔드 개발 프로세스 심층 로드맵"
      subtitle="제품 문제 정의에서 브라우저·React·API 계약·품질·SEO·AEO·GEO·운영 피드백까지 이어지는 실무형 프론트엔드 지식 그래프다."
      meta="PROCESS : REQUIREMENTS -> UX STATE -> WEB PLATFORM -> REACT -> DATA CONTRACT -> QUALITY -> DISCOVERY -> OPERATIONS"
      diagram={diagram}
      tracks={tracks}
      process={process}
      gates={gates}
    />
  );
}
