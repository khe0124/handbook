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
    subtitle: "Docker와 배포, Linux, vi, Docker 예시, nginx 예시를 실행 환경 관점으로 통합했습니다.",
    scope: "DOCKER · LINUX · VI · NGINX",
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
    sourceJumpNav(bundle.sources),
  ];
  const mainParts = [bundleIntro(bundle)];

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
