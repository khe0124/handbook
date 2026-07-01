import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const handbookDir = path.join(rootDir, "public", "handbook");

const BUNDLES = [
  {
    id: "career-strategy-foundation",
    file: "career-strategy-foundation-handbook.html",
    navBrand: "CAREER · STRATEGY",
    navTitle: "면접 전략 · 답변 프레임과 개인화",
    title: "면접 전략과 커리어 포지셔닝",
    subtitle: "기술면접 개요, 회사·직무별 면접 전략, 개인화 개요를 하나의 흐름으로 통합했습니다.",
    scope: "INTERVIEW FRAME · ROLE STRATEGY · POSITIONING",
    sources: [
      { prefix: "interview", label: "기술면접 개요", file: "interview-handbook.html" },
      { prefix: "company", label: "회사·직무별 면접 전략", file: "interview-company-role-strategy-handbook.html" },
      { prefix: "personal", label: "개인화 개요", file: "personalization-overview-handbook.html" },
    ],
  },
  {
    id: "career-frontend-interview",
    file: "career-frontend-interview-handbook.html",
    navBrand: "CAREER · FRONTEND",
    navTitle: "프론트엔드 · JS TS 면접",
    title: "프론트엔드와 JavaScript·TypeScript 면접",
    subtitle: "프론트엔드 면접, JavaScript·TypeScript 면접, 프론트엔드 개발자 대응을 통합했습니다.",
    scope: "FRONTEND · JAVASCRIPT · TYPESCRIPT · POSITIONING",
    sources: [
      { prefix: "feinterview", label: "프론트엔드 면접", file: "interview-frontend-handbook.html" },
      { prefix: "jsts", label: "JavaScript·TypeScript 면접", file: "interview-javascript-typescript-handbook.html" },
      { prefix: "personalfe", label: "프론트엔드 개발자 대응", file: "personalization-frontend-handbook.html" },
    ],
  },
  {
    id: "career-backend-interview",
    file: "career-backend-interview-handbook.html",
    navBrand: "CAREER · BACKEND",
    navTitle: "백엔드 · Java Spring DB 면접",
    title: "백엔드와 Java·Spring 면접",
    subtitle: "백엔드·DB 면접, Java·Spring·JPA 면접, 백엔드 전환 대응을 통합했습니다.",
    scope: "BACKEND · DATABASE · JAVA · SPRING · TRANSITION",
    sources: [
      { prefix: "bedb", label: "백엔드·DB 면접", file: "interview-backend-db-handbook.html" },
      { prefix: "javaspring", label: "Java·Spring·JPA 면접", file: "interview-java-spring-jpa-handbook.html" },
      { prefix: "personalbe", label: "백엔드 전환 대응", file: "personalization-backend-transition-handbook.html" },
    ],
  },
  {
    id: "career-core-deep-dive",
    file: "career-core-deep-dive-handbook.html",
    navBrand: "CAREER · CORE DEEP DIVE",
    navTitle: "CS DB 보안 심화 면접",
    title: "CS·DB·보안 심화 면접",
    subtitle: "CS 기본기, DB 심화, 보안 심화 면접을 핵심 개념 검증 흐름으로 통합했습니다.",
    scope: "CS · DATABASE · SECURITY",
    sources: [
      { prefix: "cs", label: "CS 기본기 면접", file: "interview-cs-fundamentals-handbook.html" },
      { prefix: "dbdeep", label: "DB 심화 면접", file: "interview-db-deep-dive-handbook.html" },
      { prefix: "security", label: "보안 심화 면접", file: "interview-security-deep-dive-handbook.html" },
    ],
  },
  {
    id: "career-infra-distributed-cloud",
    file: "career-infra-distributed-cloud-handbook.html",
    navBrand: "CAREER · INFRA CLOUD",
    navTitle: "인프라 · 분산 시스템 클라우드",
    title: "인프라·분산 시스템·클라우드 면접",
    subtitle: "인프라·운영, 분산 시스템, 클라우드 기본 면접을 운영 구조 질문 흐름으로 통합했습니다.",
    scope: "INFRA · OPERATIONS · DISTRIBUTED · CLOUD",
    sources: [
      { prefix: "infra", label: "인프라·운영 면접", file: "interview-infra-ops-handbook.html" },
      { prefix: "distributed", label: "분산 시스템 면접", file: "interview-distributed-handbook.html" },
      { prefix: "cloud", label: "클라우드 기본 면접", file: "interview-cloud-fundamentals-handbook.html" },
    ],
  },
  {
    id: "career-system-project",
    file: "career-system-project-handbook.html",
    navBrand: "CAREER · SYSTEM PROJECT",
    navTitle: "시스템 설계 · 프로젝트 심층",
    title: "시스템 설계와 프로젝트 심층 면접",
    subtitle: "시스템 설계 면접, 프로젝트 심층 면접, 풀스택 개발자 대응을 통합했습니다.",
    scope: "SYSTEM DESIGN · PROJECT · FULLSTACK POSITIONING",
    sources: [
      { prefix: "system", label: "시스템 설계 면접", file: "interview-system-design-handbook.html" },
      { prefix: "project", label: "프로젝트 심층 면접", file: "interview-project-handbook.html" },
      { prefix: "personalfull", label: "풀스택 개발자 대응", file: "personalization-fullstack-handbook.html" },
    ],
  },
  {
    id: "career-culture-collaboration",
    file: "career-culture-collaboration-handbook.html",
    navBrand: "CAREER · COLLABORATION",
    navTitle: "컬처 · Git 협업 코드리뷰",
    title: "컬처·협업·코드리뷰 면접",
    subtitle: "컬처·압박 면접, Git·협업·코드리뷰 면접, B2B·SaaS 어드민 대응을 통합했습니다.",
    scope: "BEHAVIORAL · GIT · REVIEW · B2B SAAS",
    sources: [
      { prefix: "behavioral", label: "컬처·압박 면접", file: "interview-behavioral-handbook.html" },
      { prefix: "git", label: "Git·협업·코드리뷰 면접", file: "interview-git-collaboration-handbook.html" },
      { prefix: "personalb2b", label: "B2B·SaaS 어드민 대응", file: "personalization-b2b-saas-admin-handbook.html" },
    ],
  },
  {
    id: "career-coding-test",
    file: "career-coding-test-handbook.html",
    navBrand: "CAREER · CODING TEST",
    navTitle: "코딩테스트 · 문제 풀이 패턴",
    title: "코딩테스트 패턴",
    subtitle: "코딩테스트 패턴 문서를 문제 분류, 복잡도, 디버깅 루프 중심으로 제공합니다.",
    scope: "CODING TEST · COMPLEXITY · DEBUGGING",
    sources: [
      { prefix: "coding", label: "코딩테스트 패턴", file: "interview-coding-test-patterns-handbook.html" },
    ],
  },
  {
    id: "engineering-frontend-core",
    file: "engineering-frontend-core-handbook.html",
    navBrand: "ENGINEERING · FRONTEND CORE",
    navTitle: "프론트엔드 핵심 · 브라우저와 접근성",
    title: "프론트엔드 핵심",
    subtitle: "프론트엔드 개요, 브라우저 동작 원리, 웹접근성을 하나의 흐름으로 통합한 개발 핸드북입니다.",
    scope: "FRONTEND · BROWSER · ACCESSIBILITY",
    indexDescription:
      "FRONTEND ENGINEERING HANDBOOK, BROWSER RUNTIME HANDBOOK, WEB ACCESSIBILITY HANDBOOK 원천을 기반으로 역할 판단에서 시작해 브라우저 제약, UI 계약, 접근성 검증으로 이어 읽도록 구성했습니다. 각 파트는 원문을 그대로 나열하지 않고 통합 흐름에서 중복되는 문서 크롬을 제거해 이어 읽기 좋게 정리했습니다.",
    omitSourceJumpNav: true,
    stripNestedChrome: true,
    sourceNavCode: "PART",
    sources: [
      { prefix: "fe", label: "프론트엔드 개요", file: "frontend-engineering-handbook.html" },
      { prefix: "browser", label: "브라우저 동작 원리", file: "frontend-browser-handbook.html" },
      { prefix: "a11y", label: "웹접근성", file: "frontend-accessibility-handbook.html" },
    ],
  },
  {
    id: "engineering-frontend-interaction",
    file: "engineering-frontend-interaction-handbook.html",
    navBrand: "ENGINEERING · FRONTEND INTERACTION",
    navTitle: "프론트엔드 인터랙션 · 애니메이션과 3D",
    title: "프론트엔드 인터랙션과 그래픽",
    subtitle: "인터랙션 아키텍처, 모션 엔진, SVG·Canvas·WebGL·Three.js, 진단 루틴과 실전 과제를 하나의 성장 흐름으로 통합했습니다.",
    scope: "INTERACTION ARCHITECTURE · MOTION ENGINE · CANVAS · WEBGL · THREE.JS · DIAGNOSTICS",
    indexDescription:
      "목표는 화면을 보기 좋게 움직이는 개발자가 아니라 입력 모델, 상태 기계, 모션 파이프라인, Canvas/WebGL 렌더링, asset pipeline, 성능 진단, fallback까지 설명하고 구현할 수 있는 수준급 인터랙티브 개발자입니다. 이 문서는 인터랙션 계약 → 입력 이벤트와 상태 아키텍처 → 모션 시스템과 FLIP/spring → 그래픽·3D 구현 → 진단 도구 → 실전 과제 로드맵 순서로 읽습니다.",
    sources: [
      { prefix: "interaction", label: "인터랙션 설계", file: "frontend-interaction-handbook.html" },
      { prefix: "motion", label: "애니메이션·모션 시스템", file: "frontend-animation-motion-handbook.html" },
      { prefix: "graphics", label: "그래픽·3D·WebGL", file: "frontend-graphics-3d-handbook.html" },
    ],
  },
  {
    id: "engineering-frontend-performance",
    file: "engineering-frontend-performance-handbook.html",
    navBrand: "ENGINEERING · FRONTEND PERFORMANCE",
    navTitle: "프론트엔드 성능 · 렌더링과 진단",
    title: "프론트엔드 성능과 렌더링",
    subtitle: "번들링, 렌더링, 메모이제이션, 성능 지표, DevTools 진단 문서를 통합했습니다.",
    scope: "RENDERING · PERFORMANCE · DEVTOOLS",
    sources: [
      { prefix: "rendering", label: "번들링·렌더링·메모이제이션", file: "frontend-rendering-optimization-handbook.html" },
      { prefix: "perf", label: "성능과 지표", file: "frontend-performance-metrics-handbook.html" },
      { prefix: "devtools", label: "DevTools 사용법", file: "frontend-devtools-handbook.html" },
    ],
    afterSourcesNav: `  <a href="#performance-glossary"><span class="code">GLOSSARY</span>성능 용어 사전</a>`,
    afterSourcesHtml: `<section id="performance-glossary">
<div class="ch-head"><span class="ch-code">GLOSSARY</span><h2>성능 용어 사전</h2></div>
<p class="lede">성능 문서에서 자주 나오는 약어와 도구 이름을 한 줄로 다시 확인합니다. 정확한 진단은 각 지표가 측정하는 사용자 경험을 먼저 구분하는 데서 시작합니다.</p>
<div class="glossary">
<div class="g-row"><div class="g-term"><b>Core Web Vitals</b><span>user metrics</span></div><div class="g-def">Google이 중요하게 보는 사용자 경험 지표 묶음으로, 현재는 LCP, INP, CLS를 중심으로 봅니다.</div></div>
<div class="g-row"><div class="g-term"><b>LCP</b><span>Largest Contentful Paint</span></div><div class="g-def">사용자가 볼 만한 가장 큰 콘텐츠가 화면에 그려질 때까지의 시간입니다.</div></div>
<div class="g-row"><div class="g-term"><b>INP</b><span>Interaction to Next Paint</span></div><div class="g-def">클릭, 탭, 입력 같은 상호작용 뒤 다음 화면 반응이 보이기까지의 지연을 나타냅니다.</div></div>
<div class="g-row"><div class="g-term"><b>CLS</b><span>Cumulative Layout Shift</span></div><div class="g-def">사용자 의도와 무관하게 화면 요소가 얼마나 흔들리고 밀렸는지 나타내는 안정성 지표입니다.</div></div>
<div class="g-row"><div class="g-term"><b>TTFB</b><span>Time to First Byte</span></div><div class="g-def">브라우저가 요청한 뒤 서버 응답의 첫 바이트를 받기까지 걸린 시간입니다.</div></div>
<div class="g-row"><div class="g-term"><b>FCP</b><span>First Contentful Paint</span></div><div class="g-def">텍스트, 이미지, SVG 같은 첫 콘텐츠가 화면에 처음 그려진 시점입니다.</div></div>
<div class="g-row"><div class="g-term"><b>TBT</b><span>Total Blocking Time</span></div><div class="g-def">Lighthouse가 긴 JavaScript 작업 때문에 main thread가 입력을 처리하지 못한 시간을 합산한 lab 지표입니다.</div></div>
<div class="g-row"><div class="g-term"><b>Long task</b><span>main thread</span></div><div class="g-def">50ms를 넘는 main thread 작업으로, 입력 반응과 렌더링을 밀어낼 수 있습니다.</div></div>
<div class="g-row"><div class="g-term"><b>Hydration</b><span>SSR</span></div><div class="g-def">서버가 보낸 HTML에 클라이언트 JavaScript를 연결해 상호작용 가능하게 만드는 과정입니다.</div></div>
<div class="g-row"><div class="g-term"><b>Render blocking</b><span>critical path</span></div><div class="g-def">CSS나 동기 script처럼 브라우저가 화면을 그리기 전에 기다려야 하는 리소스입니다.</div></div>
<div class="g-row"><div class="g-term"><b>Waterfall</b><span>Network</span></div><div class="g-def">HTML, CSS, JS, 이미지, API 요청이 어떤 순서와 지연으로 이어지는지 보여주는 네트워크 타임라인입니다.</div></div>
<div class="g-row"><div class="g-term"><b>Field data</b><span>RUM</span></div><div class="g-def">실제 사용자 환경에서 수집한 성능 데이터로, 기기와 네트워크 편차가 반영됩니다.</div></div>
<div class="g-row"><div class="g-term"><b>Lab data</b><span>synthetic</span></div><div class="g-def">정해진 장비와 네트워크 조건에서 재현성 있게 측정한 성능 데이터입니다.</div></div>
<div class="g-row"><div class="g-term"><b>RUM</b><span>Real User Monitoring</span></div><div class="g-def">실제 사용자 브라우저에서 성능과 오류를 수집해 운영 지표로 보는 방식입니다.</div></div>
<div class="g-row"><div class="g-term"><b>p75</b><span>percentile</span></div><div class="g-def">사용자 측정값을 빠른 순서로 세웠을 때 75% 지점의 값으로, Web Vitals 판정에 자주 씁니다.</div></div>
<div class="g-row"><div class="g-term"><b>Commit duration</b><span>React Profiler</span></div><div class="g-def">React가 계산한 변경을 실제 DOM에 반영하는 commit 단계에 걸린 시간입니다.</div></div>
<div class="g-row"><div class="g-term"><b>Layout thrash</b><span>rendering</span></div><div class="g-def">DOM 읽기와 쓰기가 섞여 브라우저가 layout 계산을 반복하게 되는 성능 문제입니다.</div></div>
<div class="g-row"><div class="g-term"><b>Virtualization</b><span>large list</span></div><div class="g-def">큰 목록에서 화면에 보이는 항목만 렌더링해 DOM 수와 렌더링 비용을 줄이는 기법입니다.</div></div>
<div class="g-row"><div class="g-term"><b>Code splitting</b><span>bundle</span></div><div class="g-def">초기 화면에 필요 없는 JavaScript를 나중에 받도록 번들을 나누는 방식입니다.</div></div>
<div class="g-row"><div class="g-term"><b>Tree shaking</b><span>bundle</span></div><div class="g-def">사용하지 않는 export를 빌드 결과에서 제거해 전송과 실행 비용을 줄이는 최적화입니다.</div></div>
<div class="g-row"><div class="g-term"><b>Preload</b><span>resource hint</span></div><div class="g-def">브라우저에게 곧 필요한 핵심 리소스를 더 빨리 받으라고 알려주는 힌트입니다.</div></div>
<div class="g-row"><div class="g-term"><b>Lazy loading</b><span>defer</span></div><div class="g-def">처음부터 필요하지 않은 이미지나 코드를 실제로 필요할 때 늦게 불러오는 방식입니다.</div></div>
<div class="g-row"><div class="g-term"><b>Memoization</b><span>cache</span></div><div class="g-def">같은 입력의 계산 결과나 컴포넌트 렌더 결과를 재사용해 반복 비용을 줄이는 기법입니다.</div></div>
</div>
</section>`,
  },
  {
    id: "engineering-frontend-quality",
    file: "engineering-frontend-quality-handbook.html",
    navBrand: "ENGINEERING · FRONTEND QUALITY",
    navTitle: "프론트엔드 품질 · 보안 테스트 배포",
    title: "프론트엔드 품질과 릴리스",
    subtitle: "프론트엔드 보안, 테스트 전략, 배포 문서를 운영 품질 기준으로 통합했습니다.",
    scope: "SECURITY · TESTING · DEPLOYMENT",
    indexDescription:
      "프론트엔드 품질·릴리스는 보안, 테스트, 배포를 따로 점검하는 목록이 아니라 변경을 안전하게 사용자에게 내보내는 운영 루프입니다. 변경 위험을 분류하고, 그 위험에 맞는 테스트와 보안 리뷰를 선택하고, preview와 CI에서 확인한 뒤, release health window 동안 오류·Web Vitals·API 실패율을 관찰하고 rollback 또는 forward fix를 결정합니다.",
    afterIndexNav: `  <a href="#frontend-release-quality-model"><span class="code">MODEL</span>릴리스 품질 모델</a>
  <a href="#frontend-quality-output"><span class="code">OUTPUT</span>품질 산출물</a>`,
    afterIndexHtml: `<section id="frontend-release-quality-model">
<div class="ch-head"><span class="ch-code">MODEL</span><h2>FRONTEND RELEASE QUALITY OPERATING MODEL</h2></div>
<p class="lede">프론트엔드 품질은 테스트 개수나 배포 성공 로그가 아니라 사용자의 브라우저에서 새 버전이 안전하게 작동한다는 증거입니다. 이 모델은 변경이 들어온 순간부터 release health window가 끝날 때까지의 판단 순서를 고정합니다.</p>
<div class="semantic-card model">
<span class="sc-label">FRONTEND RELEASE QUALITY OPERATING MODEL</span>
change risk classification → security review gate → risk based test matrix<br>
→ preview deployment → CI quality gate → release notes<br>
→ canary or staged rollout → release health window<br>
→ Web Vitals regression / error spike / API failure review<br>
→ rollback, feature flag kill switch, or forward fix decision
</div>
<table>
<tr><th>단계</th><th>품질 질문</th><th>통과 증거</th></tr>
<tr><td>change risk classification</td><td>이 변경이 보안, 데이터, 권한, 라우팅, 성능, 공통 UI 중 무엇을 건드리는가</td><td>PR risk label, 영향 route, owner, rollback path</td></tr>
<tr><td>테스트 선택</td><td>unit/component/E2E/visual/a11y/contract 중 무엇이 이 위험을 막는가</td><td>RISK BASED TEST MATRIX와 실행 결과</td></tr>
<tr><td>보안 게이트</td><td>토큰, HTML, redirect, third-party script, CSP, dependency가 바뀌었는가</td><td>security review note, sanitizer regression, CSP report</td></tr>
<tr><td>배포 검증</td><td>preview에서 실제 빌드 산출물, cache header, route fallback, release id가 맞는가</td><td>preview smoke, artifact hash, sourcemap upload record</td></tr>
<tr><td>릴리스 관찰</td><td>새 버전이 사용자 오류, Web Vitals, API 실패율을 악화시키는가</td><td>release health window dashboard와 rollback/forward fix decision</td></tr>
</table>
</section>

<section id="frontend-quality-output">
<div class="ch-head"><span class="ch-code">OUTPUT</span><h2>FRONTEND QUALITY OUTPUTS</h2></div>
<p class="lede">이 문서를 읽은 뒤 남겨야 하는 것은 지식 요약이 아니라 릴리스 때 재사용할 수 있는 증거 패킷입니다.</p>
<table>
<tr><th>산출물</th><th>포함 내용</th><th>왜 필요한가</th></tr>
<tr><td>release notes</td><td>변경 범위, 위험 분류, flag, migration/API dependency, rollback path</td><td>배포 후 판단 기준을 팀이 공유한다</td></tr>
<tr><td>security review note</td><td>HTML/token/CSP/redirect/dependency 변경 여부와 통과 근거</td><td>보안 변경을 일반 UI 변경처럼 흘려보내지 않는다</td></tr>
<tr><td>test evidence packet</td><td>unit, component, E2E, visual, a11y, contract 실행 결과</td><td>위험에 맞는 테스트를 선택했는지 증명한다</td></tr>
<tr><td>release health record</td><td>error rate, chunk load error, Web Vitals regression, API failure, user report</td><td>배포 성공을 CI가 아니라 실제 사용자 지표로 닫는다</td></tr>
<tr><td>incident packet</td><td>증상, 영향 route, release id, mitigation, owner, follow-up test</td><td>같은 릴리스 사고가 반복되지 않게 한다</td></tr>
</table>
</section>`,
    sources: [
      { prefix: "fesec", label: "보안 대응", file: "frontend-security-handbook.html" },
      { prefix: "fetest", label: "테스트 전략", file: "frontend-testing-strategy-handbook.html" },
      { prefix: "fedeploy", label: "배포", file: "frontend-deployment-handbook.html" },
    ],
  },
  {
    id: "engineering-backend-core",
    file: "engineering-backend-core-handbook.html",
    navBrand: "ENGINEERING · BACKEND CORE",
    navTitle: "백엔드 핵심 · API DB 런타임",
    title: "백엔드 핵심",
    subtitle: "백엔드 개요를 요청 생명주기, API 계약, 트랜잭션, JPA, 동시성, 운영 증거 중심으로 정리했습니다.",
    scope: "BACKEND · API · TRANSACTION · RUNTIME · OPERATIONS",
    indexDescription: "백엔드 핵심은 로그인과 보안까지 한 문서에 밀어 넣는 목록이 아니라 요청이 계약, 상태, 실패, 증거를 남기며 통과하는 경로를 설명하는 능력입니다. 이 문서는 요청 생명주기, API 계약, validation, transaction boundary, JPA persistence boundary, concurrency, idempotency, cache, async, testing, deployment readiness, observability를 중심으로 읽고, 인증·보안은 별도 `백엔드 인증·보안` 문서에서 깊게 다룹니다.",
    afterIndexNav: `  <a href="#backend-roadmap-overview"><span class="code">ROADMAP</span>백엔드 로드맵 개요</a>
  <a href="#backend-request-ops-map"><span class="code">MAP</span>요청에서 운영까지</a>
  <a href="#backend-study-outputs"><span class="code">OUTPUT</span>학습 산출물</a>`,
    afterIndexHtml: `<section id="backend-roadmap-overview">
<div class="ch-head"><span class="ch-code">ROADMAP</span><h2>BACKEND ROADMAP OVERVIEW</h2></div>
<p class="lede">백엔드 핵심은 기능 구현 목록이 아니라 요청이 계약, 상태, 실패, 증거를 남기며 통과하는 경로를 설명하는 능력입니다. 아래 순서로 읽으면 API, DB, 트랜잭션, 테스트, 운영, 아키텍처가 따로 놀지 않습니다.</p>
<div class="semantic-card model">
<span class="sc-label">BACKEND ROADMAP OVERVIEW</span>
request lifecycle → API contract → Java/Spring runtime<br>
→ transaction/data model → ORM/JPA boundary<br>
→ concurrency/idempotency → cache/async<br>
→ testing → deployment/observability<br>
→ architecture boundary → operability evidence
</div>
<table>
<thead><tr><th>축</th><th>핵심 질문</th><th>증거 산출물</th></tr></thead>
<tbody>
<tr><td>API</td><td>클라이언트가 무엇을 믿고 호출하는가</td><td>OpenAPI, error contract, idempotency rule</td></tr>
<tr><td>Data</td><td>무엇이 함께 성공하거나 실패해야 하는가</td><td>ERD, transaction boundary, migration order</td></tr>
<tr><td>Failure</td><td>중복, 재시도, 부분 실패가 안전한가</td><td>retry budget, outbox/inbox, compensation plan</td></tr>
<tr><td>Quality</td><td>변경이 계약과 정합성을 깨지 않았는가</td><td>unit, integration, contract, regression test</td></tr>
<tr><td>Ops</td><td>장애가 났을 때 원인을 찾을 수 있는가</td><td>structured log, RED/USE metric, traceId, runbook</td></tr>
</tbody>
</table>
</section>

<section id="backend-request-ops-map">
<div class="ch-head"><span class="ch-code">MAP</span><h2>REQUEST TO OPERATIONS MAP</h2></div>
<p class="lede">좋은 백엔드 설명은 controller에서 끝나지 않습니다. 요청 하나가 저장소, 외부 의존성, 큐, 로그와 지표까지 어떻게 이어지는지 따라가야 합니다.</p>
<div class="semantic-card flow">
<span class="sc-label">REQUEST TO OPERATIONS MAP</span>
client → controller → validation → request context<br>
→ application service → transaction boundary<br>
→ domain invariant → repository / external client<br>
→ commit / rollback → outbox / cache invalidation<br>
→ response → structured log / metric / trace / alert
</div>
<div class="callout">
<span class="co-label">리뷰 기준</span>
<p>각 단계마다 실패 모드를 하나씩 붙입니다. validation은 4xx와 error contract, transaction은 rollback과 constraint, external call은 timeout과 retry, async는 duplicate event와 DLQ, operations는 traceId와 SLO burn rate가 핵심 증거입니다.</p>
</div>
</section>

<section id="backend-study-outputs">
<div class="ch-head"><span class="ch-code">OUTPUT</span><h2>BACKEND STUDY OUTPUTS</h2></div>
<p class="lede">학습 완료 기준은 읽은 분량이 아니라 제출 가능한 산출물입니다. 아래 묶음은 백엔드 코어에서 직접 검증할 수 있는 설계 판단과 동작 증거만 남깁니다.</p>
<div class="semantic-card evidence">
<span class="sc-label">BACKEND STUDY OUTPUTS</span>
API docs · ERD · migration notes · transaction boundary note<br>
EXPLAIN ANALYZE before/after · idempotency and retry policy<br>
unit/integration/contract/regression test report<br>
Docker/CI evidence · dashboard metric list · incident runbook · ADR<br>
foundation checklist · Spring proxy failure cases · schema design notes<br>
backup/restore drill · load test baseline · cloud deployment minimum<br>
API trust boundary · request context handoff · operability checklist<br>
quality floor · backend core evidence packet
</div>
</section>`,
    sources: [
      { prefix: "backend", label: "백엔드 개요", file: "backend-engineering-handbook.html" },
    ],
  },
  {
    id: "engineering-backend-auth-security",
    file: "engineering-backend-auth-security-handbook.html",
    navBrand: "ENGINEERING · BACKEND SECURITY",
    navTitle: "백엔드 인증·보안 · 세션 토큰 권한",
    title: "백엔드 인증·보안",
    subtitle: "인증과 보안 문서를 세션, 토큰, OAuth/OIDC, 권한, 테넌트 격리, 위협 모델, 운영 대응 중심으로 독립 분리했습니다.",
    scope: "AUTHENTICATION · AUTHORIZATION · OWASP · THREAT MODEL · INCIDENT",
    indexDescription:
      "백엔드 보안은 로그인 기능을 붙이는 일이 아니라 신뢰 경계, identity proof, session lifecycle, authorization decision, tenant isolation, audit evidence, incident response를 설계하는 일입니다. 이 문서는 세션/JWT/OAuth/OIDC와 RBAC/ABAC/ReBAC, CSRF/CORS/cookie, OWASP 취약점, secret 관리, 보안 리뷰와 사고 대응을 하나의 운영 흐름으로 읽습니다.",
    stripNestedChrome: true,
    sources: [{ prefix: "auth", label: "인증과 보안", file: "auth-security-handbook.html" }],
    afterSourcesNav: `  <a href="#backend-security-review-packet"><span class="code">PACKET</span>보안 리뷰 패킷</a>`,
    afterSourcesHtml: `<section id="backend-security-review-packet">
<div class="ch-head"><span class="ch-code">PACKET</span><h2>BACKEND SECURITY REVIEW PACKET</h2></div>
<p class="lede">보안 문서를 읽은 뒤 실제 PR과 설계 리뷰에 붙일 증거 묶음입니다. 인증·권한·데이터 경계 변경은 단순 기능 변경처럼 리뷰하지 않습니다.</p>
<table>
<tr><th>변경 유형</th><th>필수 증거</th><th>거절 기준</th></tr>
<tr><td>로그인·세션</td><td>cookie option, session fixation 방어, logout/revoke 테스트</td><td>성공 로그인만 있고 만료·폐기·탈취 시나리오 없음</td></tr>
<tr><td>JWT·refresh</td><td>token ttl, refresh rotation, replay detection, reuse response</td><td>refresh token을 장기 bearer token처럼 취급</td></tr>
<tr><td>권한</td><td>RBAC/ABAC decision table, 401/403 negative test</td><td>프론트 route guard만 있고 서버 인가 없음</td></tr>
<tr><td>테넌트 격리</td><td>tenant id source, query scope, cross-tenant negative fixture</td><td>client가 보낸 tenant id를 신뢰</td></tr>
<tr><td>입력·외부 호출</td><td>validation schema, SSRF allowlist, SQL parameterization evidence</td><td>문자열 필터만으로 injection을 막는다고 설명</td></tr>
</table>
</section>`,
  },
  {
    id: "engineering-backend-architecture",
    file: "engineering-backend-architecture-handbook.html",
    navBrand: "ENGINEERING · BACKEND ARCHITECTURE",
    navTitle: "백엔드 아키텍처 · 경계와 트레이드오프",
    title: "백엔드 아키텍처",
    subtitle: "아키텍처 패턴 문서를 시스템 경계, 모듈화, 분산 설계, 트레이드오프 판단 중심으로 독립 분리했습니다.",
    scope: "ARCHITECTURE · SYSTEM DESIGN · SERVICE BOUNDARY",
    indexDescription: "아키텍처는 패턴명을 외우는 영역이 아니라 경계, 소유권, 실패 모드, 배포 단위, 데이터 일관성을 조정하는 의사결정입니다. 백엔드 핵심 문서에서 API·보안·운영 기본기를 잡은 뒤, 이 문서에서 모듈러 모놀리스, 헥사고날, DDD, MSA, CQRS, event-driven 설계를 별도 흐름으로 읽습니다.",
    afterIndexNav: `  <a href="#architecture-decision-map"><span class="code">MAP</span>아키텍처 판단 지도</a>`,
    afterIndexHtml: `<section id="architecture-decision-map">
<div class="ch-head"><span class="ch-code">MAP</span><h2>ARCHITECTURE DECISION MAP</h2></div>
<p class="lede">좋은 아키텍처 문서는 다이어그램이 아니라 결정을 설명합니다. 무엇을 같은 모듈에 둘지, 어떤 데이터가 어느 경계에 속하는지, 실패를 어디서 끊을지, 나중에 어떤 지표가 나오면 분리할지까지 남겨야 합니다.</p>
<div class="serial-card">
<span class="sc-label">ARCHITECTURE DECISION MAP</span>
domain language → bounded context → module boundary<br>
→ data ownership → transaction boundary → integration style<br>
→ failure isolation → observability → migration path → ADR
</div>
<table>
<thead><tr><th>판단 축</th><th>핵심 질문</th><th>증거 산출물</th></tr></thead>
<tbody>
<tr><td>Boundary</td><td>무엇이 함께 바뀌고 무엇이 독립적으로 배포되어야 하는가</td><td>module map, dependency rule, bounded context note</td></tr>
<tr><td>Data</td><td>어느 모듈이 데이터를 소유하고 다른 모듈은 어떻게 읽는가</td><td>ownership table, read model, migration path</td></tr>
<tr><td>Failure</td><td>한 경계의 장애가 어디까지 전파되어도 되는가</td><td>timeout/retry policy, circuit breaker, fallback plan</td></tr>
<tr><td>Evolution</td><td>지금 단순하게 시작하고 언제 분리할 것인가</td><td>ADR, split trigger metric, strangler plan</td></tr>
</tbody>
</table>
<table>
<thead><tr><th>ARCHITECTURE CHOICE MATRIX</th><th>선택 기준</th><th>주요 비용</th></tr></thead>
<tbody>
<tr><td>Layered</td><td>CRUD 중심, 팀 규모가 작고 흐름이 단순할 때</td><td>service 비대화, 도메인 규칙 누수</td></tr>
<tr><td>Hexagonal</td><td>DB, 외부 API, 메시징 어댑터 교체 가능성이 높을 때</td><td>port/adapter 추상화와 파일 수 증가</td></tr>
<tr><td>Modular monolith</td><td>서비스 분리 전 모듈 경계와 의존 방향을 검증할 때</td><td>모듈 규칙 자동화가 없으면 경계가 흐려짐</td></tr>
<tr><td>MSA</td><td>독립 배포, 데이터 소유권, 장애 격리가 실제 병목일 때</td><td>분산 트랜잭션, 관측, 테스트, 운영 복잡도</td></tr>
<tr><td>CQRS/Event-driven</td><td>읽기 모델 분리, 감사 이벤트, 비동기 확장이 핵심일 때</td><td>event schema, replay, eventual consistency 비용</td></tr>
</tbody>
</table>
<div class="serial-card">
<span class="sc-label">SERVICE BOUNDARY CHECKLIST</span>
□ 이 경계가 소유하는 데이터와 외부에 공개하는 read model이 분리되는가<br>
□ sync API가 필요한 요청 경로와 async event로 충분한 후처리가 나뉘는가<br>
□ anti-corruption layer로 외부 모델이 내부 domain model을 오염시키지 않는가<br>
□ service 분리 시 transaction을 outbox/saga/compensation으로 바꿀 준비가 있는가<br>
□ timeout, retry, circuit breaker, bulkhead가 경계마다 정의되어 있는가
</div>
</section>`,
    sources: [
      { prefix: "architecture", label: "아키텍처 패턴", file: "architecture-handbook.html" },
    ],
  },
  {
    id: "engineering-data",
    file: "engineering-data-handbook.html",
    navBrand: "ENGINEERING · DATA",
    navTitle: "데이터 계층 · DB와 저장소 사례",
    title: "데이터 계층과 저장소",
    subtitle: "DB 핸드북, PostgreSQL 예시, Redis 예시를 데이터 모델링과 운영 관점으로 통합했습니다.",
    scope: "DATABASE · POSTGRESQL · REDIS",
    sources: [
      { prefix: "db", label: "DB", file: "db-handbook.html" },
      { prefix: "postgresql", label: "PostgreSQL 예시", file: "postgresql-examples.html" },
      { prefix: "redis", label: "Redis 예시", file: "redis-examples.html" },
    ],
  },
  {
    id: "engineering-runtime-quality",
    file: "engineering-runtime-quality-handbook.html",
    navBrand: "ENGINEERING · RUNTIME QUALITY",
    navTitle: "런타임 품질 · 메시징 테스트 관측",
    title: "런타임 품질과 장애 대응",
    subtitle: "비동기·메시지 큐, 테스트, 로깅·모니터링·장애대응 문서를 통합했습니다.",
    scope: "ASYNC · TESTING · OBSERVABILITY",
    sources: [
      { prefix: "async", label: "비동기·메시지 큐", file: "async-messaging-handbook.html" },
      { prefix: "testing", label: "테스트", file: "testing-handbook.html" },
      { prefix: "observability", label: "로깅·모니터링·장애대응", file: "observability-handbook.html" },
    ],
  },
  {
    id: "engineering-platform-tools",
    file: "engineering-platform-tools-handbook.html",
    navBrand: "ENGINEERING · PLATFORM TOOLS",
    navTitle: "운영 도구 · Docker Linux vi nginx",
    title: "플랫폼 도구와 운영 기본기",
    subtitle: "Docker, Linux, nginx, CI/CD를 운영 가능한 변경 흐름으로 연결했습니다.",
    scope: "DOCKER · LINUX · VI · NGINX · OPERATIONS",
    indexDescription: "플랫폼 도구는 명령어 모음이 아니라 변경을 안전하게 만들고, 장애가 났을 때 증거를 찾고, 되돌릴 수 있게 하는 운영 루프입니다. 로컬 재현 → 빌드 → 이미지 → 설정 주입 → 배포 → 헬스체크 → 로그·메트릭 → 롤백 순서로 읽습니다.",
    afterIndexNav: `  <a href="#platform-operating-model"><span class="code">MODEL</span>플랫폼 운영 모델</a>`,
    afterIndexHtml: `<section id="platform-operating-model">
<div class="ch-head"><span class="ch-code">MODEL</span><h2>플랫폼 운영 모델</h2></div>
<p class="lede">Docker, Linux, nginx, CI/CD는 서로 다른 도구처럼 보이지만 실무에서는 하나의 변경 경로를 이룹니다. 좋은 플랫폼 작업은 "명령을 실행했다"가 아니라 어떤 artifact가 어느 환경에 올라갔고, 어떤 지표로 정상임을 확인했으며, 실패하면 어떻게 되돌릴지까지 설명합니다.</p>
<div class="serial-card">
<span class="sc-label">PLATFORM OPERATING MODEL</span>
local reproduce → build/test → image build<br>
→ image tag/digest → registry push → env/secret injection<br>
→ deploy/reload → health check/smoke test<br>
→ logs/metrics/traces → rollback or forward fix
</div>
<div class="serial-card">
<span class="sc-label">CHANGE SAFETY CHECKLIST</span>
□ 배포 대상 artifact가 tag뿐 아니라 digest로 식별되는가<br>
□ staging과 production의 env diff, secret 주입 방식, feature flag 차이가 설명되는가<br>
□ DB migration, volume, 파일 권한, port, network, nginx upstream 변경이 포함되는가<br>
□ readiness/health endpoint와 smoke test가 실제 사용자 경로를 최소 한 번 통과하는가<br>
□ 실패 시 rollback 대상 이미지, 이전 nginx config, 이전 env 값을 바로 찾을 수 있는가<br>
□ owner, 승인자, 배포 창, 영향 범위, 알림 채널, runbook 링크가 기록되는가
</div>

<h3><span class="h3-tag">MODEL</span>TOOL RESPONSIBILITY MATRIX</h3>
<table>
<thead><tr><th>도구</th><th>책임</th><th>실무 증거</th><th>책임이 아닌 것</th></tr></thead>
<tbody>
<tr><td>Gradle / build</td><td>컴파일, 테스트, 패키징, 의존성 해석</td><td>build log, test report, artifact version, dependency lock</td><td>운영 환경 설정과 네트워크 상태</td></tr>
<tr><td>Docker image</td><td>런타임과 앱 산출물을 재현 가능한 단위로 봉인</td><td>Dockerfile, image digest, SBOM, vulnerability scan</td><td>secret 보관, 데이터 영속성, 배포 승인</td></tr>
<tr><td>Container runtime</td><td>프로세스 실행, env 주입, port/volume/network 연결</td><td>container logs, exit code, health status, resource usage</td><td>앱 내부 오류 처리와 DB 정합성</td></tr>
<tr><td>Linux shell</td><td>파일, 프로세스, 포트, 디스크, 네트워크 증거 확인</td><td><code>ps</code>, <code>ss</code>, <code>df</code>, <code>journalctl</code>, <code>curl</code></td><td>근본 원인 추측을 대신하지 않음</td></tr>
<tr><td>nginx</td><td>TLS 종료, reverse proxy, static serving, routing, rate limit</td><td><code>nginx -t</code>, access/error log, upstream status, reload history</td><td>앱 readiness, DB 연결, business error</td></tr>
<tr><td>CI/CD</td><td>검증 순서, 승인 gate, 배포 자동화, rollback 실행</td><td>pipeline run, commit SHA, environment, approval, deploy log</td><td>테스트 품질 자체와 운영 판단의 최종 책임</td></tr>
</tbody>
</table>

<h3><span class="h3-tag">RUNBOOK</span>PRODUCTION TROUBLESHOOTING PLAYBOOK</h3>
<table>
<thead><tr><th>증상</th><th>처음 볼 증거</th><th>흔한 원인</th><th>완화 조치</th></tr></thead>
<tbody>
<tr><td>배포 직후 502</td><td>nginx error log, upstream health, app port, readiness</td><td>앱 미기동, port mismatch, upstream 이름 오류, readiness 실패</td><td>이전 이미지로 rollback, nginx config revert, readiness 원인 수정</td></tr>
<tr><td>컨테이너 반복 재시작</td><td>exit code, last logs, memory usage, env diff</td><td>필수 env 누락, DB 연결 실패, OOM, migration 실패</td><td>env 복구, resource limit 조정, migration 중단 또는 forward fix</td></tr>
<tr><td>새 버전만 DB 오류</td><td>app logs, migration history, schema version, SQL error</td><td>코드와 schema 순서 불일치, backward compatibility 누락</td><td>호환 가능한 migration 적용, 이전 코드 rollback 가능 여부 확인</td></tr>
<tr><td>정적 파일이 예전 버전</td><td>response header, CDN/cache status, asset hash</td><td>캐시 무효화 누락, immutable 파일명 미사용, index.html 캐시</td><td>index cache 낮추기, hashed asset 배포, CDN invalidation</td></tr>
<tr><td>nginx reload 실패</td><td><code>nginx -t</code>, syntax error line, include path</td><td>문법 오류, 인증서 경로 오류, upstream 중복</td><td>테스트 통과 전 reload 금지, 이전 config restore</td></tr>
<tr><td>운영 서버 디스크 급증</td><td><code>df -h</code>, <code>du</code>, log rotation, docker image list</td><td>로그 폭증, 오래된 image/layer, volume 누적</td><td>logrotate 확인, 안전한 prune, retention 정책 추가</td></tr>
</tbody>
</table>
<div class="callout warn">
<span class="co-label">운영 기본기</span>
<p>운영 서버에서 가장 위험한 습관은 "일단 들어가서 고쳐보기"입니다. 먼저 최근 변경, 사용자 영향, 현재 artifact, env diff, rollback 가능성을 확인하세요. SSH와 vi는 최후의 수단이어야 하며, 수정 후에는 반드시 같은 변경을 코드·설정 저장소와 runbook에 되돌려 기록해야 합니다.</p>
</div>
</section>`,
    sources: [
      { prefix: "deploy", label: "Docker와 배포", file: "docker-deploy-handbook.html" },
      { prefix: "linux", label: "리눅스", file: "linux-commands-handbook.html" },
      { prefix: "vi", label: "vi", file: "vi-shortcuts-handbook.html" },
      { prefix: "docker", label: "Docker 예시", file: "docker-examples.html" },
      { prefix: "nginx", label: "nginx 예시", file: "nginx-examples.html" },
    ],
  },
  {
    id: "engineering-java-spring",
    file: "engineering-java-spring-handbook.html",
    navBrand: "ENGINEERING · JAVA SPRING",
    navTitle: "Java Spring JPA 실전 사례",
    title: "Java·Spring·JPA 사례",
    subtitle: "Java 예시, JPA 예시, Spring Boot 예시를 백엔드 구현 사례 중심으로 통합했습니다.",
    scope: "JAVA · SPRING BOOT · JPA",
    sources: [
      { prefix: "java", label: "Java 예시", file: "java-examples.html" },
      { prefix: "jpa", label: "JPA 예시", file: "jpa-examples.html" },
      { prefix: "spring", label: "Spring Boot 예시", file: "spring-boot-examples.html" },
    ],
  },
  {
    id: "practice-ax-foundation",
    file: "practice-ax-foundation-handbook.html",
    navBrand: "PRACTICE · AX FOUNDATION",
    navTitle: "AX 기반 · 역량과 조직 적용",
    title: "AX 기반과 조직 적용",
    subtitle: "AX 개요, AX 엔지니어 역량 모델, AX 조직 적용 패턴을 하나의 흐름으로 통합했습니다.",
    scope: "AX · CAPABILITY · ORGANIZATION",
    sources: [
      { prefix: "ax", label: "AX 개요", file: "ax-handbook.html" },
      { prefix: "axcap", label: "AX 엔지니어 역량 모델", file: "ax-engineer-capability-handbook.html" },
      { prefix: "axorg", label: "AX 조직 적용 패턴", file: "ax-organization-adoption-handbook.html" },
    ],
  },
  {
    id: "practice-ax-workflow",
    file: "practice-ax-workflow-handbook.html",
    navBrand: "PRACTICE · AX WORKFLOW",
    navTitle: "AX 실행 루프 · 자동화와 하네스",
    title: "AX 실행 루프와 자동화",
    subtitle: "AX 업무 자동화 설계, Context Engineering, AI Harness Engineering, Loop Engineering을 통합했습니다.",
    scope: "AUTOMATION · CONTEXT · HARNESS · LOOP",
    sources: [
      { prefix: "axauto", label: "AX 업무 자동화 설계", file: "ax-work-automation-design-handbook.html" },
      { prefix: "axcontext", label: "Context Engineering", file: "ax-context-engineering-handbook.html" },
      { prefix: "axharness", label: "AI Harness Engineering", file: "ax-harness-engineering-handbook.html" },
      { prefix: "axloop", label: "Loop Engineering", file: "ax-loop-engineering-handbook.html" },
    ],
  },
  {
    id: "practice-ax-scale-governance",
    file: "practice-ax-scale-governance-handbook.html",
    navBrand: "PRACTICE · AX SCALE",
    navTitle: "AX 확장 · 멀티 에이전트와 거버넌스",
    title: "AX 확장과 거버넌스",
    subtitle: "Multi-Agent Workflow, 검증과 평가, AI Governance & Security, 실전 적용 사례, 실무 플레이북을 통합했습니다.",
    scope: "MULTI-AGENT · VERIFICATION · GOVERNANCE · PLAYBOOK",
    sources: [
      { prefix: "axmulti", label: "Multi-Agent Workflow", file: "ax-multi-agent-workflow-handbook.html" },
      { prefix: "axverify", label: "검증과 평가", file: "ax-verification-evaluation-handbook.html" },
      { prefix: "axgov", label: "AI Governance & Security", file: "ax-governance-security-handbook.html" },
      { prefix: "axcase", label: "AX 실전 적용 사례", file: "ax-applied-case-studies-handbook.html" },
      { prefix: "axplay", label: "AX 실무 플레이북", file: "ax-practical-playbook-handbook.html" },
    ],
  },
  {
    id: "practice-design-foundation",
    file: "practice-design-foundation-handbook.html",
    navBrand: "PRACTICE · DESIGN FOUNDATION",
    navTitle: "디자인 기반 · 문제와 흐름",
    title: "디자인 기반과 사용자 흐름",
    subtitle: "디자인 개요, UX 사고와 문제 정의, 정보구조와 내비게이션, 사용자 흐름과 태스크 설계를 통합했습니다.",
    scope: "DESIGN · UX · IA · USER FLOW",
    compactNav: true,
    stripNestedChrome: true,
    indexDescription: "이 문서는 원문을 단순히 이어 읽는 자료가 아니라, 새 기능이나 화면 개선을 시작할 때 문제 정의, 정보구조, 사용자 흐름, 상태·예외, 검증 기준을 하나의 산출물로 닫기 위한 실무 워크북입니다.",
    afterIndexNav: `  <a href="#design-foundation-routes"><span class="code">ROUTES</span>상황별 실행 루트</a>
  <a href="#design-foundation-canvas"><span class="code">CANVAS</span>Problem-to-Flow Canvas</a>
  <a href="#design-foundation-case"><span class="code">CASE</span>관통 사례</a>
  <a href="#design-foundation-handoff"><span class="code">HANDOFF</span>개발 핸드오프</a>
  <a href="#design-foundation-decision-gate"><span class="code">GATE</span>검증·결정 기준</a>`,
    afterIndexHtml: `<section id="design-foundation-routes">
<div class="ch-head"><span class="ch-code">ROUTES</span><h2>상황별 실행 루트</h2></div>
<p class="lede">디자인 기반 문서는 처음부터 끝까지 읽는 것보다 현재 작업의 위험에 맞춰 들어가는 편이 실용적입니다. 아래 루트는 문제 정의, IA, flow, 검증 중 어디에서 멈춰야 하는지 정하는 기준입니다.</p>
<table>
<tr><th>상황</th><th>먼저 볼 섹션</th><th>완료 산출물</th><th>멈춤 기준</th></tr>
<tr><td>신규 기능을 시작함</td><td>UX-01 → UX-03 → IA-07 → FLOW-02</td><td>문제 문장, 성공 지표, 핵심 객체, happy/edge path</td><td>문제와 솔루션을 분리해서 말할 수 없다면 UI 작업을 시작하지 않는다.</td></tr>
<tr><td>기존 화면이 복잡함</td><td>DES-03 → IA-02 → IA-04 → FLOW-05</td><td>정보 우선순위, 메뉴/필터 구조, 반복 업무 체크리스트</td><td>사용자가 다음 행동을 고르는 근거가 화면에 없다면 구조를 다시 잡는다.</td></tr>
<tr><td>권한·상태가 얽힘</td><td>IA-08 → FLOW-03 → FLOW-07 → FLOW-08</td><td>권한 매트릭스, 상태 표, 전이 규칙, 서비스 블루프린트</td><td>권한 없음, 처리 중, 부분 실패, 재시도 상태가 없으면 설계를 보류한다.</td></tr>
<tr><td>검색·필터가 실패함</td><td>UX-04 → IA-04 → IA-06 → FLOW-04</td><td>검색어/동의어, 활성 필터, empty state, reset/retry 동선</td><td>0건 결과에서 다음 행동이 보이지 않으면 출시하지 않는다.</td></tr>
<tr><td>비동기 작업을 다룸</td><td>FLOW-06 → FLOW-07 → FLOW-08 → HANDOFF</td><td>job 상태, polling/notification, partial success, 실패 재처리</td><td>사용자에게 완료처럼 보이지만 시스템은 처리 중인 상태가 있으면 문구와 상태를 분리한다.</td></tr>
<tr><td>디자인 리뷰를 준비함</td><td>DES-07 → CANVAS → GATE</td><td>결정 근거, 버린 대안, 위험, 검증 계획</td><td>한 가지 시안만 있고 선택하지 않은 대안이 없으면 리뷰 준비가 덜 된 상태다.</td></tr>
</table>
</section>

<section id="design-foundation-canvas">
<div class="ch-head"><span class="ch-code">CANVAS</span><h2>Problem-to-Flow Canvas</h2></div>
<p class="lede">이 캔버스는 이 문서의 최종 산출물입니다. 한 기능을 설계할 때 아래 항목을 채우면 문제 정의, IA, 사용자 흐름, 상태·예외, 검증 기준이 한 장으로 닫힙니다.</p>
<table>
<tr><th>영역</th><th>작성 질문</th><th>산출물</th><th>품질 기준</th></tr>
<tr><td>Problem</td><td>누가, 어떤 상황에서, 무엇 때문에 실패하는가</td><td>문제 문장 1개, 비목표 2개</td><td>솔루션 이름 없이 사용자 손실을 설명한다.</td></tr>
<tr><td>Evidence</td><td>문제가 실제라는 증거는 무엇인가</td><td>리서치, 로그, 문의, 운영 신호</td><td>빈도, 영향, 현재 우회 방법 중 2개 이상이 있다.</td></tr>
<tr><td>Roles</td><td>사용자, 관리자, 승인자, 감사자의 목표가 어떻게 다른가</td><td>역할별 목표·권한 표</td><td>같은 화면에서 다른 권한을 가진 사용자가 구분된다.</td></tr>
<tr><td>Objects</td><td>사용자가 다루는 핵심 객체와 상태는 무엇인가</td><td>객체 모델, 상태 taxonomy</td><td>목록, 상세, 필터, 알림의 용어가 일치한다.</td></tr>
<tr><td>IA</td><td>정보는 어디에 놓이고 어떤 순서로 발견되는가</td><td>메뉴, 필터, 검색, 상세 구조</td><td>중요 판단 정보가 상세 진입 전에 보인다.</td></tr>
<tr><td>Flow</td><td>목표 달성까지 어떤 단계와 분기가 있는가</td><td>happy path, edge path, exit point</td><td>취소, 중단, 실패, 재방문 동선이 있다.</td></tr>
<tr><td>State</td><td>loading, empty, error, permission, partial success를 어떻게 보여주는가</td><td>상태 매트릭스</td><td>권한 없음과 데이터 없음이 같은 빈 화면으로 보이지 않는다.</td></tr>
<tr><td>Validation</td><td>출시 전후 무엇이 좋아졌는지 어떻게 판단하는가</td><td>성공 지표, 실패 신호, 중단 기준</td><td>측정값이 나왔을 때 유지/수정/중단 결정을 내릴 수 있다.</td></tr>
</table>
<div class="serial-card">
<span class="sc-label">PROBLEM-TO-FLOW CANVAS TEMPLATE</span>
Problem: [역할]은 [상황]에서 [장애물] 때문에 [측정 가능한 손실]을 겪는다<br>
Evidence: 빈도 / 영향 / 현재 우회 방법 / 고객·운영 신호<br>
Roles: 사용자 / 관리자 / 승인자 / 감사자별 목표와 권한<br>
Objects: 핵심 객체, 속성, 상태, 가능한 action<br>
IA: 메뉴, 검색, 필터, 목록, 상세에서 드러나야 할 정보<br>
Flow: happy path, edge path, exit point, recovery path<br>
State: loading, empty, error, permission, partial success, async job<br>
Validation: 성공 지표, 실패 신호, 출시 후 판정 시점, rollback 또는 수정 기준
</div>
</section>

<section id="design-foundation-case">
<div class="ch-head"><span class="ch-code">CASE</span><h2>관통 사례: 대량 권한 변경</h2></div>
<p class="lede">아래 사례는 이 문서의 개념을 하나의 기능에 끝까지 적용한 예시입니다. 포인트는 버튼 배치가 아니라 문제, 객체, 권한, 상태, 실패 복구, 검증 기준을 한 흐름으로 닫는 것입니다.</p>
<table>
<tr><th>단계</th><th>설계 판단</th><th>구체 산출물</th><th>실패 신호</th></tr>
<tr><td>문제 정의</td><td>운영자가 여러 사용자 권한을 반복 변경하지만 실패 사유를 추적하지 못해 엑셀로 재관리한다.</td><td>Problem: 운영자는 대량 권한 변경 후 실패 대상과 원인을 분리하지 못해 재작업 시간이 증가한다.</td><td>“권한 변경 화면을 예쁘게 만든다”처럼 솔루션 중심으로 시작한다.</td></tr>
<tr><td>역할</td><td>요청자, 승인자, 운영자, 감사자의 목표가 다르다.</td><td>역할별 가능한 action: 요청, 승인, 실행, 조회, 감사 로그 다운로드</td><td>모든 사용자에게 같은 버튼과 같은 실패 메시지를 보여준다.</td></tr>
<tr><td>객체·상태</td><td>권한 변경 요청은 draft, submitted, approved, running, partial_failed, completed, cancelled 상태를 가진다.</td><td>상태 taxonomy와 상태별 가능한 전이 표</td><td>제출 완료와 변경 완료를 같은 완료로 표현한다.</td></tr>
<tr><td>IA</td><td>목록에서는 요청 상태, 실패 수, 마지막 실행자, 다음 action이 먼저 보여야 한다.</td><td>목록 컬럼 우선순위, 필터: 상태/실패 사유/요청자/기간</td><td>실패 사유가 상세 안에만 있어 운영자가 일괄 처리할 수 없다.</td></tr>
<tr><td>Flow</td><td>업로드, 검증, 미리보기, 승인, 실행, 결과 확인, 실패 재시도를 분리한다.</td><td>happy path + 부분 실패 path + 권한 만료 path + 중복 제출 path</td><td>저장 버튼 뒤 토스트만 있고 결과 확인 화면이 없다.</td></tr>
<tr><td>상태·회복</td><td>100명 중 92명 성공, 8명 실패처럼 결과를 분리하고 실패 사유별 재시도를 제공한다.</td><td>partial success summary, retry by reason, CSV export, audit log link</td><td>부분 실패를 전체 실패 또는 전체 성공처럼 표현한다.</td></tr>
<tr><td>검증</td><td>성공 기준은 클릭 수가 아니라 재작업 시간과 실패 재처리율이다.</td><td>재처리 시간, 실패 사유 식별률, 운영 문의 감소, 재시도 성공률</td><td>출시 후 좋아졌는지 판단할 수 있는 이벤트와 로그가 없다.</td></tr>
</table>
</section>

<section id="design-foundation-handoff">
<div class="ch-head"><span class="ch-code">HANDOFF</span><h2>개발 핸드오프 패킷</h2></div>
<p class="lede">디자인 산출물이 개발로 넘어갈 때 화면만 전달되면 상태와 예외가 누락됩니다. 아래 패킷은 프론트엔드, 백엔드, QA가 같은 계약을 보게 만드는 최소 단위입니다.</p>
<table>
<tr><th>패킷</th><th>포함할 내용</th><th>프론트엔드 계약</th><th>백엔드·운영 계약</th></tr>
<tr><td>Role & permission matrix</td><td>역할별 보기/생성/수정/승인/삭제/내보내기 권한</td><td>버튼 노출, disabled 이유, 권한 요청 동선</td><td>403 error code, audit log, 권한 변경 이력</td></tr>
<tr><td>State matrix</td><td>객체 상태, 가능한 action, 다음 상태</td><td>badge, stepper, CTA, 상태별 빈 화면</td><td>enum, transition rule, validation, idempotency</td></tr>
<tr><td>Error contract</td><td>validation, permission, conflict, timeout, partial failure</td><td>field error, toast, retry, draft 보존</td><td>error code, recoverable 여부, retry 가능성</td></tr>
<tr><td>Async job contract</td><td>job id, queued/running/succeeded/partial_failed/failed</td><td>polling, progress, 결과 요약, 다시 방문 경로</td><td>job status API, webhook/notification, 보존 기간</td></tr>
<tr><td>Analytics & decision log</td><td>성공 이벤트, 실패 이벤트, 중단 기준, 버린 대안</td><td>event name, property, funnel step</td><td>로그 집계, 운영 대시보드, 후속 판단 회의</td></tr>
</table>
</section>

<section id="design-foundation-decision-gate">
<div class="ch-head"><span class="ch-code">GATE</span><h2>검증·결정 기준</h2></div>
<p class="lede">리서치와 지표는 보기 좋은 첨부물이 아니라 의사결정을 바꾸는 기준이어야 합니다. 아래 기준 중 하나라도 비어 있으면 “검증 예정”이 아니라 “결정 기준 미정”으로 표시합니다.</p>
<table>
<tr><th>검증 항목</th><th>결정 질문</th><th>좋은 신호</th><th>중단·수정 신호</th></tr>
<tr><td>문제 검증</td><td>이 문제가 충분히 자주, 크게 발생하는가</td><td>빈도, 손실, 우회 방법이 확인됨</td><td>요청자는 크지만 실제 사용자 손실이 설명되지 않음</td></tr>
<tr><td>이해 가능성</td><td>사용자가 현재 상태와 다음 action을 설명할 수 있는가</td><td>사용성 테스트에서 상태와 다음 행동을 말함</td><td>CTA는 찾지만 왜 눌러야 하는지 설명하지 못함</td></tr>
<tr><td>업무 효율</td><td>반복 작업 시간이나 재작업이 줄었는가</td><td>완료 시간, 실패 재처리 시간, 문의 수 감소</td><td>클릭 수는 줄었지만 오류와 문의가 증가함</td></tr>
<tr><td>시스템 적합성</td><td>API, 권한, 상태, 로그가 디자인 상태를 뒷받침하는가</td><td>상태 enum과 화면 상태명이 일치함</td><td>디자인은 가능한 action을 보여주지만 API가 지원하지 않음</td></tr>
<tr><td>운영 가능성</td><td>예외 처리를 운영팀이 지속할 수 있는가</td><td>실패 사유 분류와 escalation rule이 있음</td><td>예외 처리가 수동 문의와 엑셀 관리로 돌아감</td></tr>
</table>
<div class="callout warn">
<span class="co-label">REVIEW BLOCKER</span>
<p>문제 문장, 역할·권한, 상태 매트릭스, 실패 복구, 출시 후 판정 기준 중 2개 이상이 비어 있으면 시각 디자인 리뷰가 아니라 구조 리뷰로 되돌립니다.</p>
</div>
</section>`,
    sources: [
      { prefix: "design", label: "디자인 개요", file: "design-handbook.html" },
      { prefix: "designux", label: "UX 사고와 문제 정의", file: "design-ux-thinking-handbook.html" },
      { prefix: "designia", label: "정보구조와 내비게이션", file: "design-information-architecture-handbook.html" },
      { prefix: "designflow", label: "사용자 흐름과 태스크 설계", file: "design-user-flows-handbook.html" },
    ],
  },
  {
    id: "practice-design-systems",
    file: "practice-design-systems-handbook.html",
    navBrand: "PRACTICE · DESIGN SYSTEMS",
    navTitle: "디자인 실행 · UI 시스템과 QA",
    title: "디자인 실행과 시스템 품질",
    subtitle: "UI 레이아웃, 인터랙션, 폼, 컴포넌트, 디자인 시스템, AX 인터랙션, 접근성, 프로토타입, 핸드오프를 통합했습니다.",
    scope: "UI · INTERACTION · AX MOTION · SYSTEM · QA",
    compactNav: true,
    indexDescription: "디자인 실행 문서는 세부 항목이 많으므로 왼쪽 목차는 문서 단위로 압축했습니다. 레이아웃과 인터랙션에서 시작해 폼, 컴포넌트, 시스템, AX, 접근성, 검증, 핸드오프 순서로 읽습니다.",
    sources: [
      { prefix: "designlayout", label: "UI 레이아웃과 시각 위계", file: "design-layout-hierarchy-handbook.html" },
      { prefix: "designinteraction", label: "인터랙션 디자인 패턴", file: "design-interaction-patterns-handbook.html" },
      { prefix: "designforms", label: "폼과 입력 경험", file: "design-forms-input-handbook.html" },
      { prefix: "designcomponents", label: "컴포넌트 패턴", file: "design-component-patterns-handbook.html" },
      { prefix: "designtokens", label: "디자인 시스템과 토큰", file: "design-system-tokens-handbook.html" },
      { prefix: "designaxmotion", label: "AX 인터랙션·마이크로인터랙션", file: "design-ax-interaction-motion-handbook.html" },
      { prefix: "designa11y", label: "접근성과 인클루시브 디자인", file: "design-accessibility-inclusive-handbook.html" },
      { prefix: "designprototype", label: "프로토타입과 사용성 테스트", file: "design-prototyping-testing-handbook.html" },
      { prefix: "designhandoff", label: "디자인 핸드오프와 QA", file: "design-handoff-qa-handbook.html" },
    ],
  },
  {
    id: "practice-cheat-sheets",
    file: "practice-cheat-sheets-handbook.html",
    navBrand: "PRACTICE · CHEAT SHEETS",
    navTitle: "치트시트 · 빠른 점검표",
    title: "실무 치트시트 모음",
    subtitle: "Frontend, Backend, Database, Network, DevOps, Linux, Docker, Interview, Tools·Shortcuts·Commands 치트시트를 통합했습니다.",
    scope: "CHEAT SHEETS · REVIEW GATES · FAILURE PLAYBOOKS",
    indexDescription:
      "이 문서는 암기용 요약이 아니라 작업 중 5분 안에 확인할 실행 기준입니다. 기존 치트시트의 약점은 좋은 원칙은 있지만 상황별 명령, 출력 판정, 다음 행동이 부족하다는 점이었습니다. 따라서 각 항목은 증상 → 바로 확인할 증거 → 정상/위험 신호 → 다음 행동 순서로 보강합니다.",
    afterIndexNav: `  <a href="#cheat-audit"><span class="code">AUDIT</span>문제점 분석과 보강 계획</a>
  <a href="#cheat-routes"><span class="code">ROUTES</span>상황별 사용 루트</a>`,
    afterIndexHtml: `<section id="cheat-audit">
<div class="ch-head"><span class="ch-code">AUDIT</span><h2>문제점 분석과 보강 계획</h2></div>
<p class="lede">실무 치트시트는 많이 설명하는 문서가 아니라, 작업자가 지금 무엇을 확인하고 어떤 결과면 멈춰야 하는지 알려주는 도구여야 합니다. 아래 기준으로 기존 항목을 보강합니다.</p>
<table>
<tr><th>문제점</th><th>현재 증상</th><th>보강 방향</th></tr>
<tr><td>템플릿 반복</td><td>개요, 개념, Red Flags가 분야별로 같은 모양이라 실제 작업 흐름이 약함</td><td>분야별로 자주 맞닥뜨리는 상황 카드를 앞쪽에 추가</td></tr>
<tr><td>출력 판정 부족</td><td>명령어는 있지만 결과가 정상인지 위험인지 판단하기 어려움</td><td>명령, 정상 신호, 위험 신호, 다음 행동을 한 줄로 연결</td></tr>
<tr><td>복붙성 부족</td><td>원칙은 있으나 바로 실행할 curl, SQL, docker, log query 예시가 적음</td><td>실무에서 안전하게 바꿔 쓸 수 있는 최소 명령 템플릿 제공</td></tr>
<tr><td>리뷰 게이트 약함</td><td>차단 기준이 추상적이라 PR에서 체크박스로 쓰기 어려움</td><td>필수 증거와 중단 조건을 구체화</td></tr>
<tr><td>장애 플레이북 짧음</td><td>triage 순서만 있고 증거 보관, 커뮤니케이션, 복구 판단이 약함</td><td>10분 안에 수집할 증거와 rollback/flag/off 기준을 명시</td></tr>
</table>
</section>

<section id="cheat-routes">
<div class="ch-head"><span class="ch-code">ROUTES</span><h2>상황별 사용 루트</h2></div>
<p class="lede">전체를 처음부터 읽지 않습니다. 지금 겪는 상황에 맞는 문서 2~3개만 연결해 빠르게 증거를 모읍니다.</p>
<table>
<tr><th>상황</th><th>먼저 볼 치트시트</th><th>10분 안에 남길 증거</th><th>멈출 기준</th></tr>
<tr><td>화면이 느림</td><td>Frontend → Tools → DevOps</td><td>Network waterfall, Performance trace, release SHA, before/after 수치</td><td>병목 계층을 못 나누면 코드 변경 중단</td></tr>
<tr><td>API 오류 증가</td><td>Backend → Database → Tools</td><td>route, status, errorCode, requestId, slow query 또는 upstream timeout</td><td>재시도 가능 여부와 사용자 영향이 불명확하면 배포 중단</td></tr>
<tr><td>DB 변경 리뷰</td><td>Database → Backend → DevOps</td><td>DDL lock 위험, EXPLAIN, backfill plan, rollback/verification SQL</td><td>큰 테이블 변경에 단계화 계획이 없으면 merge 중단</td></tr>
<tr><td>연결 장애</td><td>Network → Linux → Tools</td><td>dig, nc, curl -v, server listen, firewall/route diff</td><td>출발지·목적지·포트가 특정되지 않으면 정상 판단 금지</td></tr>
<tr><td>배포 후 장애</td><td>DevOps → Docker → Backend 또는 Frontend</td><td>image digest, config version, health check, error rate, rollback 후보</td><td>데이터 변경 동반 여부를 모르면 rollback 실행 보류</td></tr>
<tr><td>로컬만 깨짐</td><td>Tools → Linux → Docker</td><td>runtime version, env diff, port/process, clean install, container logs</td><td>팀/CI 재현 여부를 확인하기 전 원인 단정 금지</td></tr>
</table>
</section>`,
    sources: [
      { prefix: "cheatfe", label: "Frontend", file: "frontend-cheat-sheet.html" },
      { prefix: "cheatbe", label: "Backend", file: "backend-cheat-sheet.html" },
      { prefix: "cheatdb", label: "Database", file: "database-cheat-sheet.html" },
      { prefix: "cheatnet", label: "Network", file: "network-cheat-sheet.html" },
      { prefix: "cheatdevops", label: "DevOps", file: "devops-cheat-sheet.html" },
      { prefix: "cheatlinux", label: "Linux", file: "linux-cheat-sheet.html" },
      { prefix: "cheatdocker", label: "Docker", file: "docker-cheat-sheet.html" },
      { prefix: "cheatinterview", label: "Interview", file: "interview-cheat-sheet.html" },
      { prefix: "cheattools", label: "Tools·Shortcuts·Commands", file: "tools-shortcuts-commands-cheat-sheet.html" },
    ],
  },
  {
    id: "practice-workflow-setup",
    file: "practice-workflow-setup-handbook.html",
    navBrand: "PRACTICE · WORKFLOW SETUP",
    navTitle: "실무 준비 · 성장 로드맵과 작업 루프",
    title: "실무 준비와 작업 루프",
    subtitle: "풀스택 성장 로드맵, 개발자 FAQ·트러블슈팅, 새 PC 환경 설정, 실무 플레이북을 통합했습니다.",
    scope: "ROADMAP · FAQ · MACHINE SETUP · PLAYBOOK",
    sources: [
      { prefix: "roadmap", label: "풀스택 성장 로드맵", file: "fullstack-growth-roadmap-handbook.html" },
      { prefix: "faq", label: "개발자 FAQ·트러블슈팅", file: "developer-faq-troubleshooting-guide.html" },
      { prefix: "machine", label: "새 PC 환경 설정", file: "machine-setup-guide.html" },
      { prefix: "playbook", label: "실무 플레이북", file: "dev-playbook-handbook.html" },
    ],
  },
  {
    id: "practice-build-release",
    file: "practice-build-release-handbook.html",
    navBrand: "PRACTICE · BUILD RELEASE",
    navTitle: "실무 빌드 · 설정 DB 배포 로그",
    title: "실무 빌드와 릴리스 운영",
    subtitle: "Gradle, 패키지·버전 매니저, 환경변수·설정, DB 스키마·시딩, CI/CD 배포, 로그·커스텀 명령을 통합했습니다.",
    scope: "BUILD · CONFIG · DB · CI/CD · LOGS",
    sources: [
      { prefix: "gradle", label: "Gradle 의존성·빌드", file: "gradle-guide.html" },
      { prefix: "packages", label: "패키지·버전 매니저", file: "package-managers-guide.html" },
      { prefix: "config", label: "환경변수·설정", file: "config-management-guide.html" },
      { prefix: "dbseed", label: "DB 스키마·시딩", file: "db-migration-seeding-guide.html" },
      { prefix: "cicd", label: "CI/CD 배포", file: "cicd-guide.html" },
      { prefix: "logs", label: "로그·커스텀 명령", file: "logs-tooling-guide.html" },
    ],
  },
];

const CAREER_READINESS = {
  "career-strategy-foundation": {
    gate: "면접 전략·포지셔닝 답변 게이트",
    promise: "지원 직무와 회사 유형에 맞춰 경험 경계를 분명히 말하고, 약한 영역을 검증 계획으로 전환한다.",
    mustAnswer: [
      "지원 직무에서 가장 강한 증거 3개와 아직 약한 영역 2개를 분리해 말한다.",
      "회사 유형별로 강조할 프로젝트, 기술 깊이, 협업 사례를 다르게 선택한다.",
      "직접 경험, 일부 참여, 설계 지식을 같은 톤으로 섞지 않고 경계를 밝힌다.",
    ],
    evidence: ["직무 JD 표시본", "프로젝트별 기여 범위", "대표 PR·ADR·지표·장애기록·QA ticket", "회사 유형별 역질문"],
    pressure: "그 경험이 우리 회사 문제와 어떻게 연결되나요?",
    recovery: "회사 문제를 먼저 재정의하고, 관련 프로젝트 증거 하나와 부족한 영역의 검증 계획 하나로 답변을 좁힌다.",
  },
  "career-frontend-interview": {
    gate: "프론트엔드·JS/TS 답변 게이트",
    promise: "브라우저, React, TypeScript, 성능, 보안을 기능 구현 경험이 아니라 사용자 영향과 측정 근거로 설명한다.",
    mustAnswer: [
      "렌더링 병목을 state 범위, context, key, network, bundle 중 어디서 찾을지 말한다.",
      "TypeScript 안전성을 any 회피가 아니라 API 계약, unknown narrowing, discriminated union으로 설명한다.",
      "프론트 보안과 캐시 문제를 XSS, token storage, CORS, cache invalidation, CSP 증거로 연결한다.",
    ],
    evidence: ["Profiler 캡처", "Network waterfall", "bundle 분석", "PR·ADR·지표·장애기록·QA ticket"],
    pressure: "React.memo를 썼다는 말 말고 실제로 무엇이 빨라졌나요?",
    recovery: "측정 기준, 병목 위치, 선택한 최적화, 버린 대안, 전후 증거 순서로 답변을 복구한다.",
  },
  "career-backend-interview": {
    gate: "백엔드·Java/Spring 답변 게이트",
    promise: "백엔드 경험 경계를 정직하게 밝히되 API 계약, 트랜잭션, JPA, Spring proxy 실패 모드를 운영 가능한 답변으로 연결한다.",
    mustAnswer: [
      "API 설계를 request/response, validation, error contract, idempotency, audit log 기준으로 설명한다.",
      "Spring/JPA 질문을 proxy, transaction boundary, persistence context, N+1, OSIV 실패 모드로 답한다.",
      "DB 변경과 성능 질문을 실행 계획, lock, migration compatibility, rollback 가능성으로 연결한다.",
    ],
    evidence: ["API contract 표", "쿼리 로그", "migration plan", "PR·ADR·지표·장애기록·QA ticket"],
    pressure: "직접 백엔드 운영 경험이 제한적인데 어떻게 신뢰할 수 있나요?",
    recovery: "직접 구현 범위와 설계 지식 범위를 분리하고, 작은 API 설계 산출물과 검증 기준으로 답변한다.",
  },
  "career-core-deep-dive": {
    gate: "CS·DB·보안 심화 답변 게이트",
    promise: "CS, DB, 보안 개념을 정의 암기가 아니라 장애, 성능, 공격 경로를 줄이는 판단 기준으로 설명한다.",
    mustAnswer: [
      "동시성 질문을 race condition, lock, invariant, 재현 조건, 테스트 아이디어로 연결한다.",
      "DB 질문을 MVCC, isolation anomaly, index plan, WAL, replication lag, zero-downtime migration으로 확장한다.",
      "보안 질문을 OWASP 키워드가 아니라 source, trust boundary, sink, audit evidence로 추적한다.",
    ],
    evidence: ["실행 계획", "동시성 테스트 시나리오", "위협 모델", "PR·ADR·지표·장애기록·QA ticket"],
    pressure: "그건 정의 아닌가요? 실제 장애나 공격에서는 어떻게 보이나요?",
    recovery: "정의 한 줄 뒤에 깨지는 조건, 관측 증거, 완화책, 재발 방지 순서로 답변을 재구성한다.",
  },
  "career-infra-distributed-cloud": {
    gate: "인프라·분산·클라우드 답변 게이트",
    promise: "서비스 이름 나열을 피하고 요청 경로, 일관성 실패, 클라우드 책임 경계, 장애 대응 증거로 답한다.",
    mustAnswer: [
      "DNS, TLS, CDN/WAF, LB, app, DB 요청 경로에서 어느 hop까지 도달했는지 좁힌다.",
      "retry, idempotency, outbox, cache invalidation, eventual consistency를 실패 모드 중심으로 설명한다.",
      "Cloud managed service의 provider 책임과 application team 책임을 분리한다.",
    ],
    evidence: ["request path diagram", "incident timeline", "SLO dashboard", "PR·ADR·지표·장애기록·QA ticket"],
    pressure: "AWS/Azure 서비스를 아는 것과 운영할 수 있는 것은 다른데요?",
    recovery: "서비스명 대신 네트워크 경계, 권한, 관측 지표, rollback/DR 증거로 답변을 전환한다.",
  },
  "career-system-project": {
    gate: "시스템 설계·프로젝트 답변 게이트",
    promise: "시스템 설계와 프로젝트 경험을 요구사항, 제약, 선택지, trade-off, 검증 증거로 연결한다.",
    mustAnswer: [
      "설계 질문에서 actor, data, API, state, async job, observability, rollback을 순서대로 닫는다.",
      "프로젝트 답변에서 개인 기여, 팀 기여, 외부 제약, 버린 대안을 분리한다.",
      "성과를 기능 목록이 아니라 전후 지표, QA 감소, 장애 예방, 사용자 작업 시간 변화로 설명한다.",
    ],
    evidence: ["architecture sketch", "project depth ledger", "before/after metric", "PR·ADR·지표·장애기록·QA ticket"],
    pressure: "그 프로젝트에서 본인이 실제로 결정한 것은 무엇인가요?",
    recovery: "결정 소유 범위, 제약, 대안, 선택 이유, 결과 증거를 한 문장씩 끊어 답한다.",
  },
  "career-culture-collaboration": {
    gate: "컬처·협업 답변 게이트",
    promise: "협업 답변을 성격 묘사가 아니라 변경 관리, 리뷰 품질, 갈등 조정, 신뢰 회복의 증거로 말한다.",
    mustAnswer: [
      "STAR 답변에서 상황보다 본인의 판단, 행동, 결과, 후속 개선을 더 많이 말한다.",
      "코드리뷰와 Git 협업을 rebase/merge 지식이 아니라 변경 위험과 팀 합의로 설명한다.",
      "갈등·실패 질문에서 책임 회피 없이 경계 설정, 복구 행동, 재발 방지 산출물을 말한다.",
    ],
    evidence: ["review comment", "ADR", "incident or release note", "PR·ADR·지표·장애기록·QA ticket"],
    pressure: "그건 좋은 태도 이야기 아닌가요? 실제 행동 증거가 있나요?",
    recovery: "감정 표현을 줄이고 결정, 커뮤니케이션, 문서화, 결과 변화 증거로 답변한다.",
  },
  "career-coding-test": {
    gate: "코딩테스트 답변 게이트",
    promise: "문제 풀이를 패턴 암기가 아니라 불변식, 복잡도 한계, 반례 탐색, 디버깅 루프로 설명한다.",
    mustAnswer: [
      "투 포인터, 이분탐색, DP, 그래프를 선택하는 조건과 버리는 조건을 말한다.",
      "복잡도를 입력 크기, 정렬 비용, memory bound, worst case 기준으로 설명한다.",
      "막혔을 때 brute force, invariant, counterexample, smaller case로 복구한다.",
    ],
    evidence: ["풀이 노트", "복잡도 계산", "반례 목록", "PR·ADR·지표·장애기록·QA ticket"],
    pressure: "왜 이 알고리즘이 맞는지 증명해보세요.",
    recovery: "상태 정의, 불변식, 전이/포인터 이동 조건, 종료 조건, 반례 검증 순서로 설명한다.",
  },
};

function extractRegion(html, tagName) {
  const match = html.match(new RegExp(`<${tagName}\\b[^>]*>([\\s\\S]*?)<\\/${tagName}>`, "i"));

  if (!match) {
    throw new Error(`Expected ${tagName} region`);
  }

  return match[1].trim();
}

function prefixAnchors(html, prefix) {
  return html
    .replace(/href="#([^"]+)"/g, `href="#${prefix}-$1"`)
    .replace(/id="([^"]+)"/g, `id="${prefix}-$1"`);
}

function removeDomainSpecificCareerTerms(html) {
  return html
    .replace(/Greenery LCA 플랫폼/g, "B2B 산업 데이터 플랫폼")
    .replace(/LCA B2B 플랫폼/g, "B2B 산업 데이터 플랫폼")
    .replace(/LCA 플랫폼/g, "B2B 산업 데이터 플랫폼")
    .replace(/LCA 권한관리/g, "B2B 플랫폼 권한관리")
    .replace(/탄소배출권 거래/g, "거래형 자산 거래")
    .replace(/탄소 플랫폼/g, "B2B 플랫폼")
    .replace(/탄소·에너지\/투자 서비스/g, "에너지/투자 서비스")
    .replace(/탄소·에너지 서비스/g, "에너지 서비스")
    .replace(/탄소·에너지/g, "에너지")
    .replace(/탄소/g, "에너지");
}

function extractShell(html) {
  const beforeNav = html.slice(0, html.search(/<nav\b/i));
  const afterMainEnd = html.slice(html.search(/<\/main>/i) + "</main>".length);

  return { beforeNav, afterMainEnd };
}

function setDocumentTitle(html, title) {
  return html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);
}

function stripNestedPageChrome(html) {
  return html
    .replace(/<header class="hero">[\s\S]*?<\/header>\s*/gi, "")
    .replace(/\s*<footer>[\s\S]*?<\/footer>/gi, "")
    .trim();
}

function sourceJumpNav(sources) {
  return sources
    .map((source) => `  <a href="#doc-${source.prefix}"><span class="code">DOC</span>${source.label}</a>`)
    .join("\n");
}

function careerReadinessNav() {
  return [
    `  <a href="#career-readiness-gate"><span class="code">GATE</span>답변 준비도</a>`,
    `  <a href="#career-answer-rubric"><span class="code">RUBRIC</span>답변 품질</a>`,
    `  <a href="#career-pressure-loop"><span class="code">LOOP</span>압박 대응</a>`,
    `  <a href="#career-evidence-packet"><span class="code">EVIDENCE</span>증거 패킷</a>`,
    `  <a href="#career-final-drill"><span class="code">DRILL</span>최종 점검</a>`,
  ].join("\n");
}

function renderList(items) {
  return `<ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
}

function careerReadinessSections(bundle) {
  const profile = CAREER_READINESS[bundle.id];
  if (!profile) return "";

  return `<section id="career-readiness-gate">
<div class="ch-head"><span class="ch-code">GATE</span><h2>CAREER READINESS GATE</h2></div>
<p class="lede"><strong>${profile.gate}</strong>는 이 문서를 읽은 뒤 실제 면접에서 바로 말할 수 있어야 하는 산출물 기준입니다. 목표는 더 많이 읽는 것이 아니라, 질문을 받았을 때 30초 결론과 90초 확장을 증거와 함께 말하는 상태를 만드는 것입니다.</p>
<div class="serial-card">
<span class="sc-label">${profile.gate}</span>
${profile.promise}
</div>
<table>
<tr><th>준비 결과</th><th>면접에서 보여야 하는 신호</th><th>미달 신호</th></tr>
<tr><td>30초 결론</td><td>첫 문장에서 판단 기준과 결론이 나온다.</td><td>배경 설명이 길고 질문의 핵심을 늦게 잡는다.</td></tr>
<tr><td>90초 확장</td><td>대안, trade-off, 실패 모드, 검증 증거가 이어진다.</td><td>장점만 말하고 깨지는 조건을 말하지 못한다.</td></tr>
<tr><td>압박 꼬리질문</td><td>모르는 범위와 직접 경험 범위를 분리한 뒤 확인 방법을 말한다.</td><td>직접 하지 않은 일을 경험처럼 포장한다.</td></tr>
</table>
${renderList(profile.mustAnswer)}
</section>

<section id="career-answer-rubric">
<div class="ch-head"><span class="ch-code">RUBRIC</span><h2>ANSWER QUALITY RUBRIC</h2></div>
<p class="lede">답변 품질은 유창함이 아니라 검증 가능성으로 판단합니다. 아래 기준으로 녹음 답변을 채점하고, 약한 답변은 결론, 근거, 증거 순서로 다시 작성합니다.</p>
<table>
<tr><th>등급</th><th>답변 상태</th><th>보정 기준</th></tr>
<tr><td>S</td><td>결론, 기준, trade-off, 실패 모드, 검증 증거, 본인 기여가 모두 분리된다.</td><td>압박 질문 2개를 붙여도 같은 경계와 증거를 유지한다.</td></tr>
<tr><td>A</td><td>핵심 개념과 실무 예시는 좋지만 수치나 산출물 증거가 일부 비어 있다.</td><td>PR·ADR·지표·장애기록·QA ticket 중 최소 2개를 붙인다.</td></tr>
<tr><td>B</td><td>개념 설명은 가능하지만 경험, 대안, 실패 조건이 약하다.</td><td>직접 경험, 일부 참여, 설계 지식을 문장 안에서 분리한다.</td></tr>
<tr><td>C</td><td>기술명과 기능 목록 중심이고 면접관이 기여도와 판단 기준을 확인하기 어렵다.</td><td>질문을 다시 정의하고 30초 결론부터 재작성한다.</td></tr>
</table>
</section>

<section id="career-pressure-loop">
<div class="ch-head"><span class="ch-code">LOOP</span><h2>PRESSURE RESPONSE LOOP</h2></div>
<p class="lede">압박 질문은 틀리게 만들기 위한 질문이 아니라 답변의 경계와 증거를 확인하는 질문입니다. 당황했을 때는 답변을 확장하지 말고 구조를 되찾습니다.</p>
<div class="serial-card">
<span class="sc-label">PRESSURE RESPONSE LOOP</span>
1. 질문을 한 문장으로 재정의한다<br>
2. 직접 경험 / 일부 경험 / 설계 지식을 분리한다<br>
3. 판단 기준 2개만 말한다<br>
4. 증거 하나와 실패 모드 하나를 붙인다<br>
5. 남은 불확실성은 검증 계획으로 닫는다
</div>
<table>
<tr><th>압박 질문</th><th>복구 답변</th><th>피해야 할 방향</th></tr>
<tr><td>${profile.pressure}</td><td>${profile.recovery}</td><td>질문을 피하려고 일반론을 길게 늘리는 것</td></tr>
<tr><td>그건 본인이 한 일인가요?</td><td>본인 결정, 팀 결정, 외부 제약을 분리하고 본인이 소유한 판단만 말한다.</td><td>팀 성과 전체를 개인 성과처럼 말하는 것</td></tr>
<tr><td>수치나 증거가 없으면 어떻게 확인하나요?</td><td>정량 지표가 없었던 한계를 인정하고, 재현 절차·QA ticket·before/after·PR diff 같은 대체 증거를 제시한다.</td><td>좋아졌다고만 말하는 것</td></tr>
</table>
</section>

<section id="career-evidence-packet">
<div class="ch-head"><span class="ch-code">EVIDENCE</span><h2>EVIDENCE PACKET</h2></div>
<p class="lede">면접 답변은 기억이 아니라 증거로 보강합니다. 각 문서에서 최소 하나의 대표 답변을 만들고, 아래 산출물을 붙여 실제 경험과 설계 지식의 경계를 명확히 합니다.</p>
<table>
<tr><th>증거 묶음</th><th>준비할 항목</th><th>면접에서 쓰는 방식</th></tr>
<tr><td>핵심 산출물</td><td>${profile.evidence.join(", ")}</td><td>주장 뒤에 바로 붙일 수 있는 근거로 정리한다.</td></tr>
<tr><td>공통 증거</td><td>PR·ADR·지표·장애기록·QA ticket</td><td>기술 판단, 협업 합의, 결과 확인을 한 번에 보여준다.</td></tr>
<tr><td>답변 카드</td><td>질문, 30초 결론, 90초 확장, 압박 꼬리질문, 위험 표현, 대체 문장</td><td>면접 전날 같은 질문을 다시 말하며 품질을 점검한다.</td></tr>
</table>
</section>

<section id="career-final-drill">
<div class="ch-head"><span class="ch-code">DRILL</span><h2>FINAL 10 MINUTE DRILL</h2></div>
<p class="lede">면접 직전에는 새 내용을 추가하지 않습니다. 이미 준비한 답변의 결론, 경계, 증거만 빠르게 복구합니다.</p>
<table>
<tr><th>시간</th><th>할 일</th><th>완료 기준</th></tr>
<tr><td>0-3분</td><td>${profile.gate} 질문 하나를 30초 결론으로 말한다.</td><td>첫 문장에 결론과 판단 기준이 있다.</td></tr>
<tr><td>3-6분</td><td>같은 질문을 90초 확장으로 말한다.</td><td>대안, trade-off, 실패 모드, 증거가 포함된다.</td></tr>
<tr><td>6-8분</td><td>압박 꼬리질문 하나를 붙여 답변을 복구한다.</td><td>모르는 범위를 숨기지 않고 확인 방법으로 닫는다.</td></tr>
<tr><td>8-10분</td><td>DANGEROUS PHRASES를 제거하고 대체 문장으로 바꾼다.</td><td>추상 표현 없이 본인 기여와 증거가 남는다.</td></tr>
</table>
<div class="callout warn">
<span class="co-label">DANGEROUS PHRASES</span>
<p>“많이 해봤습니다”, “대충 알고 있습니다”, “그냥 최적화했습니다”, “팀에서 처리했습니다”처럼 범위와 증거가 없는 표현은 약하게 들립니다. “제가 소유한 결정은 A이고, B 제약 때문에 C를 선택했으며, 결과는 D 증거로 확인했습니다”로 바꿉니다.</p>
</div>
</section>`;
}

function bundleIntro(bundle) {
  const sourceList = bundle.sources.map((source) => `<li>${source.label}</li>`).join("");
  const isCareer = bundle.id.startsWith("career-");
  const defaultDescription = isCareer
    ? "이 문서는 아래 원문을 면접 학습 흐름에 맞게 이어 읽도록 구성했습니다. 각 파트는 개념 이해, 압박 질문, 답변 근거를 확인하는 기준점으로 사용합니다."
    : "아래 문서들을 한 페이지에서 이어 읽을 수 있도록 구성했습니다. 각 문서의 내부 목차는 왼쪽 목차에서 바로 이동할 수 있습니다.";

  return `<header class="hero">
  <div class="hero-serial">
    <span>DOC : ${bundle.id.toUpperCase()}</span>
    <span>SCOPE : ${bundle.scope}</span>
    <span>LANG : KO</span>
  </div>
  <h1>${bundle.title}</h1>
  <p class="hero-sub">${bundle.subtitle}</p>
  <div class="hero-meta">${isCareer ? "CURATED INTERVIEW PATH" : "CURATED HANDBOOK PATH"} · SOURCES : ${bundle.sources.length} DOCUMENTS · UPDATED 2026-06</div>
</header>

<section id="bundle-index">
<div class="ch-head"><span class="ch-code">INDEX</span><h2>${isCareer ? "학습 로드맵" : "통합 문서"}</h2></div>
<p class="lede">${bundle.indexDescription ?? defaultDescription}</p>
<ul>${sourceList}</ul>
</section>`;
}

function sourceDivider(source, isCareer) {
  return `<section id="doc-${source.prefix}">
<div class="ch-head"><span class="ch-code">${isCareer ? "PART" : "SOURCE"}</span><h2>${source.label}</h2></div>
</section>`;
}

const SNIPPET_CARD_LABELS = [
  "API ERROR CONTRACT",
  "OFFSET / LIMIT — 쉽지만 한계 있음",
  "Java — RedisTemplate로 락 시도",
  "RateLimiter.java — INCR + EXPIRE",
  "filter · map · collect",
  "Member.java — 가장 기본형 엔티티",
  "N:1 — 주인 쪽",
  "보안 헤더 + RATE LIMIT",
  "/etc/nginx/conf.d/app.conf — REVERSE PROXY",
];

const ENGINEERING_CARD_STYLES =
  ".semantic-card{border:1px solid var(--line);border-left:3px solid var(--green);background:var(--panel);color:var(--ink);padding:18px 22px;margin:22px 0;font-family:var(--sans);font-size:14.5px;line-height:1.75}.semantic-card.process-card{border-left-color:var(--green);background:var(--green-tint)}.semantic-card.decision-card{border-left-color:var(--amber);background:var(--amber-tint)}.semantic-card.evidence-card{border-left-color:var(--ink);background:#ECEEF3}.semantic-card.answer-card{border-left-color:var(--green-deep);background:var(--panel)}.semantic-card .sc-label{font-family:var(--mono);font-size:10.5px;letter-spacing:.12em;font-weight:600;color:var(--green-deep);display:block;margin-bottom:6px}.snippet-card{font-family:var(--mono);background:var(--ink);color:#E7EAF1;padding:22px 26px;margin:24px 0;font-size:13.5px;line-height:1.85;overflow-x:auto;white-space:pre}.snippet-card .sc-label{color:#8696BD;font-size:10.5px;letter-spacing:.14em;display:block;margin-bottom:8px}";

function semanticCardClass(block) {
  if (/ANSWER|답변|FRAME|ROUTINE|LOOP|CHECKLIST|PLAYBOOK/i.test(block)) {
    return "semantic-card answer-card";
  }

  if (/EVIDENCE|PACKET|REGRESSION|PROFILER|TRACE|BENCHMARK|LATENCY/i.test(block)) {
    return "semantic-card evidence-card";
  }

  if (/DECISION|CONTRACT|BOUNDARY|MATRIX|MODEL|POLICY/i.test(block)) {
    return "semantic-card decision-card";
  }

  return "semantic-card process-card";
}

function transformEngineeringCards(html) {
  const transformed = html.replace(/<div class="serial-card">([\s\S]*?)<\/div>/g, (match, inner) => {
    const isSnippet = SNIPPET_CARD_LABELS.some((label) => inner.includes(label));

    if (isSnippet) {
      return `<pre class="snippet-card">${inner}</pre>`;
    }

    const body = inner.replace(
      /<span class="sc-label">([^<]+)<\/span>(?!<br>)/,
      `<span class="sc-label">$1</span><br>`,
    );

    return `<div class="${semanticCardClass(inner)}">${body}</div>`;
  });

  if (transformed.includes(".semantic-card") && transformed.includes(".snippet-card")) {
    return transformed;
  }

  return transformed.replace("</style>", `${ENGINEERING_CARD_STYLES}</style>`);
}

for (const bundle of BUNDLES) {
  const firstHtml = await readFile(path.join(handbookDir, bundle.sources[0].file), "utf8");
  const { beforeNav, afterMainEnd } = extractShell(firstHtml);
  const isCareer = bundle.id.startsWith("career-");

  const navParts = [
    `<div class="nav-brand">${bundle.navBrand}</div>`,
    `  <div class="nav-title">${bundle.navTitle}</div>`,
    `  <a href="#bundle-index"><span class="code">INDEX</span>${isCareer ? "학습 로드맵" : "통합 문서"}</a>`,
    isCareer ? careerReadinessNav() : undefined,
    bundle.afterIndexNav,
    bundle.omitSourceJumpNav ? undefined : sourceJumpNav(bundle.sources),
  ].filter(Boolean);
  const mainParts = [bundleIntro(bundle)];
  if (isCareer) {
    mainParts.push(careerReadinessSections(bundle));
  }
  if (bundle.afterIndexHtml) {
    mainParts.push(bundle.afterIndexHtml.trim());
  }

  for (const source of bundle.sources) {
    const html = await readFile(path.join(handbookDir, source.file), "utf8");
    const nav = prefixAnchors(extractRegion(html, "nav"), source.prefix)
      .replace(/<div class="nav-brand">[\s\S]*?<\/div>\s*/g, "")
      .replace(/<div class="nav-title">[\s\S]*?<\/div>\s*/g, "")
      .trim();
    const shouldStripChrome = isCareer || bundle.stripNestedChrome;
    const main = shouldStripChrome
      ? stripNestedPageChrome(removeDomainSpecificCareerTerms(prefixAnchors(extractRegion(html, "main"), source.prefix)))
      : prefixAnchors(extractRegion(html, "main"), source.prefix);

    if (!bundle.compactNav) {
      navParts.push(`  <a href="#doc-${source.prefix}"><span class="code">${bundle.sourceNavCode ?? (isCareer ? "PART" : "SRC")}</span>${source.label}</a>`);
      navParts.push(nav);
    }
    mainParts.push(sourceDivider(source, isCareer));
    mainParts.push(main);
  }
  if (bundle.afterSourcesNav) {
    navParts.push(bundle.afterSourcesNav);
  }
  if (bundle.afterSourcesHtml) {
    mainParts.push(bundle.afterSourcesHtml.trim());
  }

  const output = `${setDocumentTitle(beforeNav, bundle.title)}<nav aria-label="목차">
${navParts.join("\n")}
</nav>
<main>
${mainParts.join("\n\n")}
</main>${afterMainEnd}`;

  await writeFile(
    path.join(handbookDir, bundle.file),
    bundle.id.startsWith("engineering-") ? transformEngineeringCards(output) : output,
  );
}
