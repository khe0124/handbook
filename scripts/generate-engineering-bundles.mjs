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
    sources: [
      { prefix: "fe", label: "프론트엔드 개요", file: "frontend-engineering-handbook.html" },
      { prefix: "browser", label: "브라우저 동작 원리", file: "frontend-browser-handbook.html" },
      { prefix: "a11y", label: "웹접근성", file: "frontend-accessibility-handbook.html" },
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
  },
  {
    id: "engineering-frontend-quality",
    file: "engineering-frontend-quality-handbook.html",
    navBrand: "ENGINEERING · FRONTEND QUALITY",
    navTitle: "프론트엔드 품질 · 보안 테스트 배포",
    title: "프론트엔드 품질과 릴리스",
    subtitle: "프론트엔드 보안, 테스트 전략, 배포 문서를 운영 품질 기준으로 통합했습니다.",
    scope: "SECURITY · TESTING · DEPLOYMENT",
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
    navTitle: "백엔드 핵심 · API 보안 아키텍처",
    title: "백엔드 핵심과 아키텍처",
    subtitle: "백엔드 개요, 아키텍처 패턴, 인증과 보안 문서를 제품 서버 설계 흐름으로 통합했습니다.",
    scope: "BACKEND · ARCHITECTURE · AUTH SECURITY",
    indexDescription: "백엔드는 요청 처리 경로 → API 계약 → 트랜잭션과 데이터 모델 → 동시성·멱등성 → 외부 의존성·비동기 → 성능 병목 → 테스트 → 관측가능성·운영 → 보안 기본값 → 아키텍처 경계 순서로 읽습니다. 이 통합 문서는 원문을 이어붙이는 용도가 아니라 제품 서버를 설계·리뷰·운영하는 판단 경로를 먼저 잡기 위한 큐레이션입니다.",
    sources: [
      { prefix: "backend", label: "백엔드 개요", file: "backend-engineering-handbook.html" },
      { prefix: "architecture", label: "아키텍처 패턴", file: "architecture-handbook.html" },
      { prefix: "auth", label: "인증과 보안", file: "auth-security-handbook.html" },
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
    sourceJumpNav(bundle.sources),
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
    const main = isCareer
      ? stripNestedPageChrome(removeDomainSpecificCareerTerms(prefixAnchors(extractRegion(html, "main"), source.prefix)))
      : prefixAnchors(extractRegion(html, "main"), source.prefix);

    if (!bundle.compactNav) {
      navParts.push(`  <a href="#doc-${source.prefix}"><span class="code">${isCareer ? "PART" : "SRC"}</span>${source.label}</a>`);
      navParts.push(nav);
    }
    mainParts.push(sourceDivider(source, isCareer));
    mainParts.push(main);
  }

  const output = `${setDocumentTitle(beforeNav, bundle.title)}<nav aria-label="목차">
${navParts.join("\n")}
</nav>
<main>
${mainParts.join("\n\n")}
</main>${afterMainEnd}`;

  await writeFile(path.join(handbookDir, bundle.file), output);
}
