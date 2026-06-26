import assert from "node:assert/strict";
import { access, mkdir, mkdtemp, readFile, readdir, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import {
  AX_HANDBOOKS,
  BACKEND_HANDBOOKS,
  CAREER_HANDBOOKS,
  CHEAT_SHEETS,
  DESIGN_HANDBOOKS,
  DEVOPS_HANDBOOKS,
  FRONTEND_HANDBOOKS,
  HANDBOOK_GROUPS,
  HANDBOOK_ITEMS,
  INTERVIEW_HANDBOOKS,
  NETWORK_HANDBOOKS,
  PERSONAL_HANDBOOKS,
  PRACTICAL_GUIDES,
} from "../src/handbook/catalog.mjs";
import { extractHandbookDocument, generateHandbookDocuments } from "./handbook-html.mjs";

const GENERATED_HTML_LITERAL_PATTERN = /(?:navHtml|mainHtml):\s*(`(?:\\.|[^`\\])*`|"(?:\\.|[^"\\])*")/g;

function parseGeneratedHtmlLiteral(literal) {
  if (literal.startsWith('"')) {
    return JSON.parse(literal);
  }

  return literal
    .slice(1, -1)
    .replace(/\\`/g, "`")
    .replace(/\\\$/g, "$");
}

function extractGeneratedDocument(moduleSource) {
  const [navMatch, mainMatch] = [...moduleSource.matchAll(GENERATED_HTML_LITERAL_PATTERN)];

  return {
    navHtml: navMatch ? parseGeneratedHtmlLiteral(navMatch[1]) : null,
    mainHtml: mainMatch ? parseGeneratedHtmlLiteral(mainMatch[1]) : null,
  };
}

test("extractHandbookDocument pulls nav and main markup without page chrome", () => {
  const html = `<!doctype html>
<html lang="ko">
<head><title>Sample</title><style>body{color:red}</style></head>
<body>
<div class="shell">
<nav aria-label="목차"><a href="#ch1"><span class="code">A-01</span>첫 장</a></nav>
<main><header class="hero"><h1>문서 제목</h1></header><section id="ch1"><p>본문</p></section></main>
</div>
</body>
</html>`;

  const doc = extractHandbookDocument(html);

  assert.equal(
    doc.navHtml,
    '<a href="#ch1"><span class="code">A-01</span>첫 장</a>',
  );
  assert.equal(
    doc.mainHtml,
    '<header class="hero"><h1>문서 제목</h1></header><section id="ch1"><p>본문</p></section>',
  );
});

test("extractHandbookDocument throws a clear error when required regions are missing", () => {
  assert.throws(
    () => extractHandbookDocument("<html><body><main>Only content</main></body></html>"),
    /Expected handbook HTML to include nav and main regions/,
  );
});

test("catalog exposes only the selected non-carbon handbook groups", () => {
  assert.deepEqual(
    HANDBOOK_GROUPS.map((group) => group.key),
    ["home", "career", "engineering", "operations", "practice"],
  );

  const labels = [
    ...HANDBOOK_GROUPS.map((group) => group.label),
    ...HANDBOOK_ITEMS.map((item) => item.label),
  ].join("\n");

  const careerGroup = HANDBOOK_GROUPS.find((group) => group.key === "career");
  const engineeringGroup = HANDBOOK_GROUPS.find((group) => group.key === "engineering");
  const practiceGroup = HANDBOOK_GROUPS.find((group) => group.key === "practice");

  assert.equal(HANDBOOK_ITEMS.length, 38);
  assert.equal(careerGroup?.items.length, 8);
  assert.equal(engineeringGroup?.items.length, 8);
  assert.equal(HANDBOOK_GROUPS.find((group) => group.key === "operations")?.items.length, 13);
  assert.equal(practiceGroup?.items.length, 8);
  assert.ok(labels.includes("홈"));
  assert.ok(labels.includes("면접·커리어"));
  assert.ok(labels.includes("개발 핸드북"));
  assert.ok(labels.includes("인프라·운영"));
  assert.ok(labels.includes("AX·디자인·실무"));
  assert.ok(labels.includes("00 면접 전략·커리어 포지셔닝"));
  assert.ok(labels.includes("01 프론트엔드·JS/TS 면접"));
  assert.ok(labels.includes("02 백엔드·Java/Spring 면접"));
  assert.ok(labels.includes("03 CS·DB·보안 심화 면접"));
  assert.ok(labels.includes("04 인프라·분산·클라우드 면접"));
  assert.ok(labels.includes("05 시스템 설계·프로젝트 심층"));
  assert.ok(labels.includes("06 컬처·협업·코드리뷰"));
  assert.ok(labels.includes("07 코딩테스트 패턴"));
  assert.ok(labels.includes("00 프론트엔드 핵심"));
  assert.ok(labels.includes("01 프론트엔드 성능·진단"));
  assert.ok(labels.includes("02 프론트엔드 품질·릴리스"));
  assert.ok(labels.includes("03 백엔드 핵심·아키텍처"));
  assert.ok(labels.includes("04 데이터 계층·저장소"));
  assert.ok(labels.includes("05 런타임 품질·장애대응"));
  assert.ok(labels.includes("06 플랫폼 도구·운영 기본기"));
  assert.ok(labels.includes("07 Java·Spring·JPA 사례"));
  assert.ok(labels.includes("00 인프라·운영 로드맵"));
  assert.ok(labels.includes("06 CI/CD·Artifact·Environment"));
  assert.ok(labels.includes("00 AX 기반·조직 적용"));
  assert.ok(labels.includes("01 AX 실행 루프·자동화"));
  assert.ok(labels.includes("02 AX 확장·거버넌스"));
  assert.ok(labels.includes("03 디자인 기반·사용자 흐름"));
  assert.ok(labels.includes("04 디자인 실행·시스템 품질"));
  assert.ok(labels.includes("05 실무 치트시트 모음"));
  assert.ok(labels.includes("06 실무 준비·작업 루프"));
  assert.ok(labels.includes("07 빌드·설정·릴리스 운영"));
  assert.ok(labels.includes("00 인프라·운영 로드맵"));
  assert.ok(labels.includes("01 서비스 요청 경로"));
  assert.ok(labels.includes("02 VPC·Subnet·Routing·NAT"));
  assert.ok(labels.includes("03 보안 경계"));
  assert.ok(labels.includes("04 DNS·TLS·도메인 운영"));
  assert.ok(labels.includes("05 VPN·Private Connectivity"));
  assert.ok(labels.includes("06 CI/CD·Artifact·Environment"));
  assert.ok(labels.includes("07 컨테이너·오케스트레이션·Health Check"));
  assert.ok(labels.includes("08 IaC·변경관리·Drift"));
  assert.ok(labels.includes("09 Observability·SLO"));
  assert.ok(labels.includes("10 Incident Response·Rollback·DR"));
  assert.ok(labels.includes("11 운영 체크리스트·면접 답변"));
  assert.ok(labels.includes("12 AWS·Azure 실전 시나리오"));
  assert.ok(!HANDBOOK_GROUPS.some((group) => group.key === "examples" || group.label === "예시 사례"));
  assert.ok(!labels.includes("개발핸드북"));
  assert.ok(!labels.includes("업무현황"));
  assert.ok(!labels.includes("탄소회계"));
  assert.ok(!labels.includes("탄소핸드북"));
  assert.ok(!/\bLCA\b/.test(labels));

  for (const item of HANDBOOK_ITEMS) {
    const searchable = `${item.id}\n${item.file}\n${item.label}\n${item.kind}`;
    assert.doesNotMatch(searchable, /carbon|lca|vcm|탄소|업무현황/i);
  }
});

test("career menu consolidates interview and personalized career documents into eight items", async () => {
  const careerGroup = HANDBOOK_GROUPS.find((group) => group.key === "career");
  const bundles = [
    {
      file: "career-strategy-foundation-handbook.html",
      sources: ["기술면접 개요", "회사·직무별 면접 전략", "개인화 개요"],
      evidence: ["BASE ANSWER FRAME", "핵심 질문 30선", "ANSWER FRAME"],
    },
    {
      file: "career-frontend-interview-handbook.html",
      sources: ["프론트엔드 면접", "JavaScript·TypeScript 면접", "프론트엔드 개발자 대응"],
      evidence: ["REACT CONCURRENT SSR DRILL", "TYPESCRIPT ADVANCED BOUNDARY", "프론트엔드 개발자 대응"],
    },
    {
      file: "career-backend-interview-handbook.html",
      sources: ["백엔드·DB 면접", "Java·Spring·JPA 면접", "백엔드 전환 대응"],
      evidence: ["TRANSACTION LOCK SCENARIO MATRIX", "SPRING JPA FAILURE PLAYBOOK", "백엔드 전환 대응"],
    },
    {
      file: "career-core-deep-dive-handbook.html",
      sources: ["CS 기본기 면접", "DB 심화 면접", "보안 심화 면접"],
      evidence: ["Big-O", "MVCC", "OWASP"],
    },
    {
      file: "career-infra-distributed-cloud-handbook.html",
      sources: ["인프라·운영 면접", "분산 시스템 면접", "클라우드 기본 면접"],
      evidence: ["DNS", "Outbox", "VPC"],
    },
    {
      file: "career-system-project-handbook.html",
      sources: ["시스템 설계 면접", "프로젝트 심층 면접", "풀스택 개발자 대응"],
      evidence: ["SYSTEM DESIGN PRESSURE DRILL", "PROJECT EVIDENCE QUALITY RUBRIC", "풀스택 개발자 대응"],
    },
    {
      file: "career-culture-collaboration-handbook.html",
      sources: ["컬처·압박 면접", "Git·협업·코드리뷰 면접", "B2B·SaaS 어드민 대응"],
      evidence: ["STAR", "Git", "B2B"],
    },
    {
      file: "career-coding-test-handbook.html",
      sources: ["코딩테스트 패턴"],
      evidence: ["COMPLEXITY LIMIT TABLE", "INVARIANT PROOF DRILL", "REAL PROBLEM TRAINING LOOP"],
    },
  ];

  assert.equal(careerGroup?.items.length, 8);
  assert.deepEqual(
    careerGroup?.items.map((item) => item.file),
    bundles.map((bundle) => bundle.file),
  );

  for (const bundle of bundles) {
    const source = await readFile(path.join("public", "handbook", bundle.file), "utf8");

    for (const sourceLabel of bundle.sources) {
      assert.match(source, new RegExp(`<h2>${sourceLabel}</h2>`), `${bundle.file} should include ${sourceLabel}`);
    }

    for (const marker of bundle.evidence) {
      assert.match(source, new RegExp(marker, "i"), `${bundle.file} should preserve ${marker}`);
    }
  }
});

test("career bundles read as curated publications instead of raw merged drafts", async () => {
  const careerFiles = CAREER_HANDBOOKS.map((item) => item.file);

  for (const file of careerFiles) {
    const source = await readFile(path.join("public", "handbook", file), "utf8");
    const headerCount = source.match(/<header class="hero">/g)?.length ?? 0;
    const ids = [...source.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
    const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);

    assert.equal(headerCount, 1, `${file} should have exactly one page hero`);
    assert.deepEqual([...new Set(duplicateIds)], [], `${file} should not contain duplicate ids`);
    assert.doesNotMatch(source, /MERGED WITHOUT SUMMARY/, `${file} should not expose draft merge metadata`);
    assert.doesNotMatch(source, /통합된 원문/, `${file} should not describe itself as raw source stitching`);
    assert.doesNotMatch(source, /원문 내용을 축약하지 않고/, `${file} should not expose raw merge copy`);
    assert.doesNotMatch(source, /<footer>/, `${file} should not contain nested source footers`);
    assert.match(source, /CURATED INTERVIEW PATH/, `${file} should expose curated interview metadata`);
    assert.match(source, /<span class="code">PART<\/span>/, `${file} should label sources as career parts`);
  }
});

test("engineering handbook menu consolidates all source documents into eight items", async () => {
  const engineeringGroup = HANDBOOK_GROUPS.find((group) => group.key === "engineering");
  const bundles = [
    {
      file: "engineering-frontend-core-handbook.html",
      sources: ["프론트엔드 개요", "브라우저 동작 원리", "웹접근성"],
      evidence: ["FRONTEND ENGINEERING HANDBOOK", "BROWSER RUNTIME HANDBOOK", "WEB ACCESSIBILITY HANDBOOK"],
    },
    {
      file: "engineering-frontend-performance-handbook.html",
      sources: ["번들링·렌더링·메모이제이션", "성능과 지표", "DevTools 사용법"],
      evidence: ["RENDERING OPTIMIZATION HANDBOOK", "PERFORMANCE METRICS HANDBOOK", "DEVTOOLS HANDBOOK"],
    },
    {
      file: "engineering-frontend-quality-handbook.html",
      sources: ["보안 대응", "테스트 전략", "배포"],
      evidence: ["FRONTEND SECURITY HANDBOOK", "FRONTEND TESTING HANDBOOK", "FRONTEND DEPLOYMENT HANDBOOK"],
    },
    {
      file: "engineering-backend-core-handbook.html",
      sources: ["백엔드 개요", "아키텍처 패턴", "인증과 보안"],
      evidence: ["BACKEND ENGINEERING HANDBOOK", "ARCHITECTURE PATTERNS HANDBOOK", "AUTH &amp; SECURITY HANDBOOK"],
    },
    {
      file: "engineering-data-handbook.html",
      sources: ["DB", "PostgreSQL 예시", "Redis 예시"],
      evidence: ["DATABASE HANDBOOK", "POSTGRESQL EXAMPLES", "REDIS EXAMPLES"],
    },
    {
      file: "engineering-runtime-quality-handbook.html",
      sources: ["비동기·메시지 큐", "테스트", "로깅·모니터링·장애대응"],
      evidence: ["ASYNC &amp; MESSAGING HANDBOOK", "TESTING HANDBOOK", "OBSERVABILITY HANDBOOK"],
    },
    {
      file: "engineering-platform-tools-handbook.html",
      sources: ["Docker와 배포", "리눅스", "vi", "Docker 예시", "nginx 예시"],
      evidence: ["DOCKER & DEPLOY HANDBOOK", "LINUX / SHELL COMMANDS HANDBOOK", "vi / VIM SHORTCUTS HANDBOOK", "DOCKER EXAMPLES", "NGINX EXAMPLES"],
    },
    {
      file: "engineering-java-spring-handbook.html",
      sources: ["Java 예시", "JPA 예시", "Spring Boot 예시"],
      evidence: ["JAVA EXAMPLES", "JPA EXAMPLES", "SPRING BOOT 예시 사례"],
    },
  ];

  assert.equal(engineeringGroup?.items.length, 8);
  assert.deepEqual(
    engineeringGroup?.items.map((item) => item.file),
    bundles.map((bundle) => bundle.file),
  );

  for (const bundle of bundles) {
    const source = await readFile(path.join("public", "handbook", bundle.file), "utf8");

    for (const sourceLabel of bundle.sources) {
      assert.match(source, new RegExp(`<h2>${sourceLabel}</h2>`), `${bundle.file} should include ${sourceLabel}`);
    }

    for (const marker of bundle.evidence) {
      assert.match(source, new RegExp(marker), `${bundle.file} should preserve ${marker}`);
    }
  }
});

test("practice menu consolidates AX, design, cheat sheets, and guides into eight items", async () => {
  const practiceGroup = HANDBOOK_GROUPS.find((group) => group.key === "practice");
  const bundles = [
    {
      file: "practice-ax-foundation-handbook.html",
      sources: ["AX 개요", "AX 엔지니어 역량 모델", "AX 조직 적용 패턴"],
      evidence: ["Model·Harness·Environment", "Workflow Mining", "조직 진단"],
    },
    {
      file: "practice-ax-workflow-handbook.html",
      sources: ["AX 업무 자동화 설계", "Context Engineering", "AI Harness Engineering", "Loop Engineering"],
      evidence: ["후보 선정 매트릭스", "AUTOMATION HARNESS ARCHITECTURE", "Episode Package"],
    },
    {
      file: "practice-ax-scale-governance-handbook.html",
      sources: ["Multi-Agent Workflow", "검증과 평가", "AI Governance & Security", "AX 실전 적용 사례", "AX 실무 플레이북"],
      evidence: ["Adversarial Verification", "Prompt Injection", "2-WEEK AX AUTOMATION SPRINT"],
    },
    {
      file: "practice-design-foundation-handbook.html",
      sources: ["디자인 개요", "UX 사고와 문제 정의", "정보구조와 내비게이션", "사용자 흐름과 태스크 설계"],
      evidence: ["North Star Metric", "정보구조", "사용자 흐름"],
    },
    {
      file: "practice-design-systems-handbook.html",
      sources: ["UI 레이아웃과 시각 위계", "인터랙션 디자인 패턴", "폼과 입력 경험", "컴포넌트 패턴", "디자인 시스템과 토큰", "접근성과 인클루시브 디자인", "프로토타입과 사용성 테스트", "디자인 핸드오프와 QA"],
      evidence: ["시각 위계", "Design Token", "핸드오프"],
    },
    {
      file: "practice-cheat-sheets-handbook.html",
      sources: ["Frontend", "Backend", "Database", "Network", "DevOps", "Linux", "Docker", "Interview", "Tools·Shortcuts·Commands"],
      evidence: ["Red Flags", "Review Gate", "Failure Playbook", "Cmd\\+P", "curl -i", "docker logs"],
    },
    {
      file: "practice-workflow-setup-handbook.html",
      sources: ["풀스택 성장 로드맵", "개발자 FAQ·트러블슈팅", "새 PC 환경 설정", "실무 플레이북"],
      evidence: ["실전 훈련 루프", "60문항 문제 해결 매트릭스", "SETUP-01", "DEV PLAYBOOK"],
    },
    {
      file: "practice-build-release-handbook.html",
      sources: ["Gradle 의존성·빌드", "패키지·버전 매니저", "환경변수·설정", "DB 스키마·시딩", "CI/CD 배포", "로그·커스텀 명령"],
      evidence: ["Gradle", "패키지·버전 매니저", "CI/CD"],
    },
  ];

  assert.equal(practiceGroup?.items.length, 8);
  assert.deepEqual(
    practiceGroup?.items.map((item) => item.file),
    bundles.map((bundle) => bundle.file),
  );

  for (const bundle of bundles) {
    const source = await readFile(path.join("public", "handbook", bundle.file), "utf8");

    for (const sourceLabel of bundle.sources) {
      assert.match(source, new RegExp(`<h2>${sourceLabel}</h2>`), `${bundle.file} should include ${sourceLabel}`);
    }

    for (const marker of bundle.evidence) {
      assert.match(source, new RegExp(marker, "i"), `${bundle.file} should preserve ${marker}`);
    }
  }
});

test("public handbook directory contains no carbon domain documents outside the dev handbook catalog", async () => {
  const publicFiles = (await readdir("public/handbook")).filter((file) => file.endsWith(".html"));
  const catalogFiles = new Set(HANDBOOK_ITEMS.map((item) => item.file));
  const careerSourceFiles = new Set([...INTERVIEW_HANDBOOKS, ...PERSONAL_HANDBOOKS].map((item) => item.file));
  const engineeringSourceFiles = new Set([...FRONTEND_HANDBOOKS, ...BACKEND_HANDBOOKS].map((item) => item.file));
  const operationsSourceFiles = new Set([...NETWORK_HANDBOOKS, ...DEVOPS_HANDBOOKS].map((item) => item.file));
  const practiceSourceFiles = new Set([...AX_HANDBOOKS, ...DESIGN_HANDBOOKS, ...CHEAT_SHEETS, ...PRACTICAL_GUIDES].map((item) => item.file));
  const personalSourceFiles = new Set(PERSONAL_HANDBOOKS.map((item) => item.file));
  const extraFiles = publicFiles.filter((file) => file !== "index.html" && !catalogFiles.has(file) && !careerSourceFiles.has(file) && !engineeringSourceFiles.has(file) && !operationsSourceFiles.has(file) && !practiceSourceFiles.has(file));

  assert.deepEqual(extraFiles, []);

  for (const file of publicFiles) {
    assert.doesNotMatch(file, /carbon|lca|vcm/i);
    if (personalSourceFiles.has(file)) {
      continue;
    }

    const source = await readFile(path.join("public", "handbook", file), "utf8");
    assert.doesNotMatch(
      source,
      /탄소|CBAM|K-ETS|carbon-accounting|vcm-registry|lca-handbook|\bcarbon\b|\bVCM\b|\bLCA\b/i,
      `${file} should not contain removed carbon-domain examples`,
    );
  }
});

test("public handbook index is a Dev Handbook entrypoint, not a carbon portal", async () => {
  const source = await readFile("public/handbook/index.html", "utf8");

  assert.match(source, /Dev Handbook/);
  assert.match(source, /풀스택/);
  assert.match(source, /프론트엔드/);
  assert.match(source, /백엔드/);
  assert.match(source, /DevOps/);
  assert.match(source, /fullstack-growth-roadmap-handbook\.html/);
  assert.match(source, /home-handbook\.html/);
  assert.doesNotMatch(source, /탄소|LCA|VCM|CBAM|K-ETS|carbon-accounting|lca-|vcm-/i);
});

test("site opts out of search indexing", async () => {
  const robots = await readFile("public/robots.txt", "utf8");
  const htmlFiles = [
    "index.html",
    ...(await readdir("public/handbook"))
      .filter((file) => file.endsWith(".html"))
      .map((file) => path.join("public", "handbook", file)),
  ];

  assert.match(robots, /User-agent:\s*\*/);
  assert.match(robots, /Disallow:\s*\//);

  for (const file of htmlFiles) {
    const source = await readFile(file, "utf8");
    assert.match(
      source,
      /<meta\s+name="robots"\s+content="noindex, nofollow, noarchive, nosnippet"\s*\/?>/i,
      `${file} should opt out of search indexing`,
    );
  }
});

test("README describes the handbook project instead of the Vite template", async () => {
  const source = await readFile("README.md", "utf8");

  assert.match(source, /^# Dev Handbook/m);
  assert.match(source, /풀스택/);
  assert.match(source, /문서 생성/);
  assert.match(source, /npm run generate:handbook/);
  assert.match(source, /npm test/);
  assert.doesNotMatch(source, /React \+ TypeScript \+ Vite/);
  assert.doesNotMatch(source, /This template provides a minimal setup/);
});

test("each public handbook nav links all main sections", async () => {
  for (const item of HANDBOOK_ITEMS) {
    const html = await readFile(path.join("public", "handbook", item.file), "utf8");
    const { navHtml, mainHtml } = extractHandbookDocument(html);
    const navTargets = new Set([...navHtml.matchAll(/href="#([^"]+)"/g)].map((match) => match[1]));
    const sectionIds = new Set([...mainHtml.matchAll(/<section\b[^>]*\bid="([^"]+)"/g)].map((match) => match[1]));

    assert.deepEqual(
      [...navTargets].sort(),
      [...sectionIds].sort(),
      `${item.file} nav links should match main sections`,
    );
  }
});

test("selected handbook content is positioned as a neutral full-stack growth guide", async () => {
  const sources = await Promise.all(
    HANDBOOK_ITEMS.filter((item) => item.kind !== "개인화" && item.kind !== "면접·커리어").map((item) => readFile(path.join("public", "handbook", item.file), "utf8")),
  );
  const source = sources.join("\n");
  const roadmap = await readFile("public/handbook/fullstack-growth-roadmap-handbook.html", "utf8");

  assert.match(roadmap, /풀스택 성장 로드맵/);
  assert.match(roadmap, /경계면 체크리스트/);
  assert.match(roadmap, /캡스톤 과제/);
  assert.match(roadmap, /품질 기준/);
  assert.match(roadmap, /UI ↔ API/);
  assert.match(roadmap, /API ↔ DB/);
  assert.match(roadmap, /Build ↔ Runtime/);
  assert.match(roadmap, /로그·메트릭·트레이스/);
  assert.match(roadmap, /고급 개발자 루브릭/);
  assert.match(roadmap, /실전 훈련 루프/);
  assert.match(roadmap, /ADR/);
  assert.match(roadmap, /STRIDE/);

  assert.match(source, /대규모 운영 판단/);
  assert.match(source, /Capacity thinking/);
  assert.match(source, /대규모 제품 운영/);
  assert.match(source, /Micro-frontend 판단/);
  assert.match(source, /위협 모델링/);
  assert.match(source, /운영 리허설/);
  assert.match(source, /Rollback drill/);
  assert.match(source, /Restore drill/);

  assert.doesNotMatch(source, /하은|하은님/);
  assert.doesNotMatch(source, /7년차|7Y|프론트엔드 7년/);
  assert.doesNotMatch(source, /네가|네 예시|네 워크플로우|네 비상/);
  assert.doesNotMatch(source, /주니어와 미들|미들급|미들/);
  assert.doesNotMatch(source, /시니어급 성장/);
  assert.doesNotMatch(source, /AI NATIVE/);
  assert.doesNotMatch(source, /탄소|CBAM|K-ETS|carbon-accounting|vcm-registry|lca-handbook|\bLCA\b/i);
});

test("fullstack roadmap covers missing core engineering skill axes", async () => {
  const roadmap = await readFile("public/handbook/fullstack-growth-roadmap-handbook.html", "utf8");

  assert.match(roadmap, /Git 협업/);
  assert.match(roadmap, /코드 리뷰/);
  assert.match(roadmap, /리팩토링/);
  assert.match(roadmap, /JavaScript\/TypeScript/);
  assert.match(roadmap, /Java 언어/);
  assert.match(roadmap, /자료구조·알고리즘/);
  assert.match(roadmap, /OpenAPI/);
  assert.match(roadmap, /클라우드 기본/);
  assert.match(roadmap, /AWS·GCP·Azure/);
  assert.match(roadmap, /평가 산출물/);
});

test("home handbook provides roadmap, sequence, menu purposes, and practical usage guidance", async () => {
  const [homeSource, catalogSource] = await Promise.all([
    readFile("public/handbook/home-handbook.html", "utf8"),
    readFile("src/handbook/catalog.mjs", "utf8"),
  ]);

  assert.match(catalogSource, /DEFAULT_HANDBOOK_ID = "home"/);
  assert.match(homeSource, /전체 로드맵/);
  assert.match(homeSource, /학습 순서/);
  assert.match(homeSource, /메뉴별 목적/);
  assert.match(homeSource, /핸드북 사용법/);
  assert.match(homeSource, /실전 루프/);
  assert.match(homeSource, /면접·커리어/);
  assert.match(homeSource, /개발 핸드북/);
  assert.match(homeSource, /인프라·운영/);
  assert.match(homeSource, /AX·디자인·실무/);
  assert.match(homeSource, /프론트엔드/);
  assert.match(homeSource, /백엔드/);
  assert.match(homeSource, /네트워크 인프라/);
  assert.match(homeSource, /DevOps/);
  assert.match(homeSource, /AX/);
  assert.match(homeSource, /디자인/);
  assert.match(homeSource, /백엔드 예시/);
  assert.match(homeSource, /Cheat Sheet/);
  assert.match(homeSource, /Plan → Act → Verify → Reflect/);
  assert.doesNotMatch(homeSource, /시니어급 성장/);
});

test("developer FAQ guide covers recurring practical troubleshooting questions", async () => {
  const source = await readFile("public/handbook/developer-faq-troubleshooting-guide.html", "utf8");

  assert.match(source, /개발자 FAQ·트러블슈팅/);
  assert.match(source, /질문을 문제 정의로 바꾸기/);
  assert.match(source, /로컬은 되는데 CI·운영은 실패/);
  assert.match(source, /빌드·의존성·버전 충돌/);
  assert.match(source, /환경변수·쿠키·CORS·시크릿/);
  assert.match(source, /DB 마이그레이션·락·시딩/);
  assert.match(source, /"느려요" 성능 triage/);
  assert.match(source, /flaky test/);
  assert.match(source, /git·PR·리뷰 사고 복구/);
  assert.match(source, /AI 생성 코드 검증 부채/);
  assert.match(source, /장애 보고·에스컬레이션/);
  assert.match(source, /동시성·멱등성·중복 처리/);
  assert.match(source, /로그·메트릭·트레이스/);
  assert.match(source, /보안·권한·데이터 삭제/);
  assert.match(source, /문서화·온보딩·지식 이전/);
  assert.match(source, /증상 기반 빠른 진입/);
  assert.match(source, /60문항 문제 해결 매트릭스/);
  assert.match(source, /운영 준비도 루브릭/);
  assert.match(source, /참고 기준과 한계/);
  assert.match(source, /MRE TEMPLATE/);
  assert.match(source, /FIRST 15 MINUTES/);
  assert.match(source, /DECISION TREE/);
  assert.match(source, /LOCKFILE REVIEW/);
  assert.match(source, /git clean -xfdn/);
  assert.match(source, /파괴적 명령 주의/);
  assert.match(source, /PostgreSQL 기준/);
  assert.match(source, /차단 기준/);
  assert.match(source, /기본 owner/);
  assert.match(source, /DATA CLASSIFICATION/);
  assert.match(source, /TOOL PERMISSION/);
  assert.match(source, /Restricted/);
  assert.match(source, /SameSite/);
  assert.match(source, /EXPLAIN/);
  assert.match(source, /ZERO DOWNTIME/);
  assert.match(source, /p95\/p99/);
  assert.match(source, /CONCURRENCY TEST IDEAS/);
  assert.match(source, /LOG QUALITY CHECK/);
  assert.match(source, /RUNBOOK ENTRY TEMPLATE/);
  assert.match(source, /SHIP READINESS GATE/);
  assert.match(source, /idempotency key/);
  assert.match(source, /traceId/);
  assert.match(source, /STRIDE/);
  assert.match(source, /검증 부채/);
  assert.match(source, /STATUS UPDATE TEMPLATE/);
});

test("interview handbook provides answer-drill templates and aggressive follow-up practice", async () => {
  const [overview, frontend, backend, infra, distributed, systemDesign, project, behavioral, jsTs, javaSpring, cs, security, dbDeep, cloud, collaboration, coding, strategy] = await Promise.all([
    readFile("public/handbook/interview-handbook.html", "utf8"),
    readFile("public/handbook/interview-frontend-handbook.html", "utf8"),
    readFile("public/handbook/interview-backend-db-handbook.html", "utf8"),
    readFile("public/handbook/interview-infra-ops-handbook.html", "utf8"),
    readFile("public/handbook/interview-distributed-handbook.html", "utf8"),
    readFile("public/handbook/interview-system-design-handbook.html", "utf8"),
    readFile("public/handbook/interview-project-handbook.html", "utf8"),
    readFile("public/handbook/interview-behavioral-handbook.html", "utf8"),
    readFile("public/handbook/interview-javascript-typescript-handbook.html", "utf8"),
    readFile("public/handbook/interview-java-spring-jpa-handbook.html", "utf8"),
    readFile("public/handbook/interview-cs-fundamentals-handbook.html", "utf8"),
    readFile("public/handbook/interview-security-deep-dive-handbook.html", "utf8"),
    readFile("public/handbook/interview-db-deep-dive-handbook.html", "utf8"),
    readFile("public/handbook/interview-cloud-fundamentals-handbook.html", "utf8"),
    readFile("public/handbook/interview-git-collaboration-handbook.html", "utf8"),
    readFile("public/handbook/interview-coding-test-patterns-handbook.html", "utf8"),
    readFile("public/handbook/interview-company-role-strategy-handbook.html", "utf8"),
  ]);

  assert.match(overview, /30초 답변/);
  assert.match(overview, /90초 답변/);
  assert.match(overview, /꼬리질문/);
  assert.match(overview, /흔한 오답/);
  assert.match(overview, /모의면접 체크리스트/);
  assert.match(overview, /답변 캘리브레이션/);
  assert.match(overview, /CAREER STRATEGY EVALUATION RUBRIC/);
  assert.match(overview, /INTERVIEW PRESSURE SIMULATION/);
  assert.match(overview, /나쁜 답변/);
  assert.match(overview, /개선 답변/);
  assert.match(overview, /좋은 답변/);

  for (const source of [frontend, backend, infra, distributed]) {
    assert.match(source, /핵심 질문 20선/);
    assert.match(source, /30초 답변/);
    assert.match(source, /90초 확장/);
    assert.match(source, /압박 꼬리질문/);
    assert.match(source, /흔한 오답/);
  }

  assert.match(frontend, /FRONTEND CAUSAL MODEL/);
  assert.match(backend, /BACKEND DB CAUSAL MODEL/);
  assert.match(distributed, /DISTRIBUTED CAUSAL MODEL/);

  assert.match(systemDesign, /화이트보드 진행 순서/);
  assert.match(systemDesign, /요구사항 정리/);
  assert.match(systemDesign, /비기능 요구사항/);
  assert.match(systemDesign, /데이터 모델/);
  assert.match(systemDesign, /병목과 장애 대응/);
  assert.match(systemDesign, /면접관 신호/);
  assert.match(systemDesign, /Capacity estimation/);
  assert.match(systemDesign, /QPS/);
  assert.match(systemDesign, /read\/write ratio/);
  assert.match(systemDesign, /latency budget/);
  assert.match(systemDesign, /worker 수/);
  assert.match(systemDesign, /고가용성·DR/);
  assert.match(systemDesign, /SPOF/);
  assert.match(systemDesign, /active-active/);
  assert.match(systemDesign, /RPO\/RTO/);
  assert.match(systemDesign, /load shedding/);
  assert.match(systemDesign, /SYSTEM DESIGN REVIEW GATE/);
  assert.match(systemDesign, /TRADE-OFF MATRIX/);
  assert.match(systemDesign, /SYSTEM DESIGN PRESSURE DRILL/);
  assert.match(systemDesign, /SYSTEM DESIGN CAUSAL MODEL/);
  assert.match(systemDesign, /EXPERT SYSTEM DESIGN CASE/);

  assert.match(project, /프로젝트 답변 템플릿/);
  assert.match(project, /문제 → 제약 → 선택지 → 선택 이유 → 실패\/트레이드오프 → 검증 결과/);
  assert.match(project, /증거 자료/);
  assert.match(project, /깊이 파고드는 질문/);
  assert.match(project, /실제 샘플 답변/);
  assert.match(project, /Data Grid 프로젝트/);
  assert.match(project, /API 전환 프로젝트/);
  assert.match(project, /React Flow 프로젝트/);
  assert.match(project, /PROJECT DEPTH LEDGER/);
  assert.match(project, /PROJECT EVIDENCE QUALITY RUBRIC/);
  assert.match(project, /PROJECT CAUSAL MODEL/);

  assert.match(behavioral, /압박 질문 대응 루프/);
  assert.match(behavioral, /인정 → 경계 설정 → 검증 계획/);
  assert.match(behavioral, /신뢰를 잃는 답변/);
  assert.match(behavioral, /STAR ANSWER QUALITY/);

  assert.match(jsTs, /JavaScript·TypeScript 면접/);
  assert.match(jsTs, /execution context/);
  assert.match(jsTs, /lexical environment/);
  assert.match(jsTs, /closure/);
  assert.match(jsTs, /prototype/);
  assert.match(jsTs, /microtask/);
  assert.match(jsTs, /structural typing/);
  assert.match(jsTs, /unknown vs any/);
  assert.match(jsTs, /conditional type/);
  assert.match(jsTs, /JS RUNTIME FAILURE MAP/);
  assert.match(jsTs, /TS TYPE SAFETY BOUNDARY/);
  assert.match(jsTs, /TYPESCRIPT ADVANCED BOUNDARY/);

  assert.match(javaSpring, /Java·Spring·JPA 면접/);
  assert.match(javaSpring, /JVM/);
  assert.match(javaSpring, /GC/);
  assert.match(javaSpring, /equals\/hashCode/);
  assert.match(javaSpring, /Bean lifecycle/);
  assert.match(javaSpring, /Filter vs Interceptor/);
  assert.match(javaSpring, /@Transactional/);
  assert.match(javaSpring, /self-invocation/);
  assert.match(javaSpring, /persistence context/);
  assert.match(javaSpring, /dirty checking/);
  assert.match(javaSpring, /OSIV/);
  assert.match(javaSpring, /SPRING PROXY FAILURE MATRIX/);
  assert.match(javaSpring, /JPA QUERY FAILURE MATRIX/);
  assert.match(javaSpring, /JAVA OPERABILITY EVIDENCE/);
  assert.match(javaSpring, /SPRING JPA FAILURE PLAYBOOK/);
  assert.match(javaSpring, /SPRING JPA CAUSAL MODEL/);
  assert.match(javaSpring, /EXPERT SPRING DEBUGGING CASE/);

  assert.match(cs, /CS 기본기 면접/);
  assert.match(cs, /Big-O/);
  assert.match(cs, /Hash collision/);
  assert.match(cs, /BFS\/DFS/);
  assert.match(cs, /race condition/);
  assert.match(cs, /deadlock/);
  assert.match(cs, /process vs thread/);
  assert.match(cs, /context switching/);
  assert.match(cs, /file descriptor/);
  assert.match(cs, /CS SYSTEM TRACE/);
  assert.match(cs, /CS DEPTH RUBRIC/);
  assert.match(cs, /CS NETWORK MEMORY DRILL/);
  assert.match(cs, /CONCURRENCY INVARIANT CHECK/);
  assert.match(cs, /OS NETWORK INTERNALS DRILL/);
  assert.match(cs, /CS CAUSAL MODEL/);

  assert.match(security, /보안 심화 면접/);
  assert.match(security, /OWASP Top 10/);
  assert.match(security, /IDOR/);
  assert.match(security, /SSRF/);
  assert.match(security, /OAuth2\/OIDC/);
  assert.match(security, /refresh token rotation/);
  assert.match(security, /bcrypt/);
  assert.match(security, /audit log/);
  assert.match(security, /SECURITY ATTACK PATH ANSWER/);
  assert.match(security, /EXPLOIT CHAIN VALIDATION/);
  assert.match(security, /SECURITY CAUSAL MODEL/);

  assert.match(dbDeep, /DB 심화 면접/);
  assert.match(dbDeep, /MVCC/);
  assert.match(dbDeep, /lost update/);
  assert.match(dbDeep, /query planner/);
  assert.match(dbDeep, /covering index/);
  assert.match(dbDeep, /partial index/);
  assert.match(dbDeep, /WAL/);
  assert.match(dbDeep, /replication lag/);
  assert.match(dbDeep, /zero-downtime migration/);
  assert.match(dbDeep, /MVCC INDEX PLAN DEEP DIVE/);
  assert.match(dbDeep, /DB CAUSAL MODEL/);
  assert.match(dbDeep, /EXPERT DB PLAN CASE/);

  assert.match(cloud, /클라우드 기본 면접/);
  assert.match(cloud, /VPC/);
  assert.match(cloud, /NAT Gateway/);
  assert.match(cloud, /Security Group/);
  assert.match(cloud, /IAM/);
  assert.match(cloud, /managed DB/);
  assert.match(cloud, /cost estimation/);
  assert.match(cloud, /K8S CLOUD SENIOR DRILL/);
  assert.match(cloud, /CLOUD CAUSAL MODEL/);

  assert.match(collaboration, /Git·협업·코드리뷰 면접/);
  assert.match(collaboration, /rebase vs merge/);
  assert.match(collaboration, /revert vs reset/);
  assert.match(collaboration, /PR 크기/);
  assert.match(collaboration, /ADR/);
  assert.match(collaboration, /technical debt/);
  assert.match(collaboration, /feature flag/);
  assert.match(collaboration, /CHANGE MANAGEMENT ANSWER/);
  assert.match(collaboration, /REVIEW COMMENT QUALITY/);
  assert.match(collaboration, /REVIEW COMMENT EXAMPLES/);
  assert.match(collaboration, /COLLABORATION CAUSAL MODEL/);

  assert.match(coding, /코딩테스트 패턴/);
  assert.match(coding, /투 포인터/);
  assert.match(coding, /슬라이딩 윈도우/);
  assert.match(coding, /이분탐색/);
  assert.match(coding, /DP 기본/);
  assert.match(coding, /시간복잡도 설명 템플릿/);
  assert.match(coding, /ALGORITHM EXPLANATION RUBRIC/);
  assert.match(coding, /COMPLEXITY LIMIT TABLE/);
  assert.match(coding, /INVARIANT PROOF DRILL/);
  assert.match(coding, /DP GREEDY GRAPH DEEPENING/);
  assert.match(coding, /REAL PROBLEM TRAINING LOOP/);
  assert.match(coding, /ALGORITHM CAUSAL MODEL/);

  assert.match(frontend, /EXPERT FRONTEND RENDERING MODEL/);
  assert.match(distributed, /EXPERT DISTRIBUTED CONSISTENCY CASE/);

  assert.match(strategy, /회사·직무별 면접 전략/);
  assert.match(strategy, /SI\/SM/);
  assert.match(strategy, /SaaS 스타트업/);
  assert.match(strategy, /B2B 어드민/);
  assert.match(strategy, /핀테크/);
  assert.match(strategy, /대규모 트래픽/);
  assert.match(strategy, /백엔드 전환 포지션/);
});

test("consolidated career interview bundles preserve advanced concept depth markers", async () => {
  const documents = await Promise.all([
    readFile("public/handbook/career-frontend-interview-handbook.html", "utf8"),
    readFile("public/handbook/career-backend-interview-handbook.html", "utf8"),
    readFile("public/handbook/career-core-deep-dive-handbook.html", "utf8"),
    readFile("public/handbook/career-infra-distributed-cloud-handbook.html", "utf8"),
    readFile("public/handbook/career-system-project-handbook.html", "utf8"),
    readFile("public/handbook/career-culture-collaboration-handbook.html", "utf8"),
    readFile("public/handbook/career-coding-test-handbook.html", "utf8"),
  ]);
  const source = documents.join("\n");

  assert.match(source, /CS SYSTEM TRACE/);
  assert.match(source, /CS DEPTH RUBRIC/);
  assert.match(source, /CS NETWORK MEMORY DRILL/);
  assert.match(source, /OS NETWORK INTERNALS DRILL/);
  assert.match(source, /CS CAUSAL MODEL/);
  assert.match(source, /CONCURRENCY INVARIANT CHECK/);
  assert.match(source, /JS RUNTIME FAILURE MAP/);
  assert.match(source, /TS TYPE SAFETY BOUNDARY/);
  assert.match(source, /TYPESCRIPT ADVANCED BOUNDARY/);
  assert.match(source, /REACT CONCURRENT SSR DRILL/);
  assert.match(source, /FRONTEND SECURITY CACHE DRILL/);
  assert.match(source, /FRONTEND CAUSAL MODEL/);
  assert.match(source, /EXPERT FRONTEND RENDERING MODEL/);
  assert.match(source, /TRANSACTION LOCK SCENARIO MATRIX/);
  assert.match(source, /INDEX PLAN OPERATIONS DRILL/);
  assert.match(source, /BACKEND DB CAUSAL MODEL/);
  assert.match(source, /SPRING PROXY FAILURE MATRIX/);
  assert.match(source, /JPA QUERY FAILURE MATRIX/);
  assert.match(source, /JAVA OPERABILITY EVIDENCE/);
  assert.match(source, /SPRING JPA FAILURE PLAYBOOK/);
  assert.match(source, /SPRING JPA CAUSAL MODEL/);
  assert.match(source, /EXPERT SPRING DEBUGGING CASE/);
  assert.match(source, /MVCC INDEX PLAN DEEP DIVE/);
  assert.match(source, /DB CAUSAL MODEL/);
  assert.match(source, /EXPERT DB PLAN CASE/);
  assert.match(source, /EXPLOIT CHAIN VALIDATION/);
  assert.match(source, /SECURITY CAUSAL MODEL/);
  assert.match(source, /CONSISTENCY FAILURE MATRIX/);
  assert.match(source, /DISTRIBUTED INCIDENT ANSWER/);
  assert.match(source, /K8S CLOUD SENIOR DRILL/);
  assert.match(source, /DISTRIBUTED CONSISTENCY SENIOR DRILL/);
  assert.match(source, /DISTRIBUTED CAUSAL MODEL/);
  assert.match(source, /EXPERT DISTRIBUTED CONSISTENCY CASE/);
  assert.match(source, /SYSTEM DESIGN REVIEW GATE/);
  assert.match(source, /TRADE-OFF MATRIX/);
  assert.match(source, /SYSTEM DESIGN PRESSURE DRILL/);
  assert.match(source, /SYSTEM DESIGN CAUSAL MODEL/);
  assert.match(source, /EXPERT SYSTEM DESIGN CASE/);
  assert.match(source, /CHANGE MANAGEMENT ANSWER/);
  assert.match(source, /REVIEW COMMENT QUALITY/);
  assert.match(source, /REVIEW COMMENT EXAMPLES/);
  assert.match(source, /COLLABORATION CAUSAL MODEL/);
  assert.match(source, /SECURITY ATTACK PATH ANSWER/);
  assert.match(source, /INFRA FAILURE TRACE/);
  assert.match(source, /ALGORITHM EXPLANATION RUBRIC/);
  assert.match(source, /COMPLEXITY LIMIT TABLE/);
  assert.match(source, /INVARIANT PROOF DRILL/);
  assert.match(source, /DP GREEDY GRAPH DEEPENING/);
  assert.match(source, /REAL PROBLEM TRAINING LOOP/);
  assert.match(source, /ALGORITHM CAUSAL MODEL/);
  assert.match(source, /PROJECT DEPTH LEDGER/);
  assert.match(source, /PROJECT EVIDENCE QUALITY RUBRIC/);
  assert.match(source, /PROJECT CAUSAL MODEL/);
  assert.match(source, /STAR ANSWER QUALITY/);
  assert.match(source, /B2B SAAS DOMAIN DEPTH/);
});

test("personalized handbook maps career evidence to four target positions", async () => {
  const [overview, frontend, fullstack, backendTransition, b2bAdmin] = await Promise.all([
    readFile("public/handbook/personalization-overview-handbook.html", "utf8"),
    readFile("public/handbook/personalization-frontend-handbook.html", "utf8"),
    readFile("public/handbook/personalization-fullstack-handbook.html", "utf8"),
    readFile("public/handbook/personalization-backend-transition-handbook.html", "utf8"),
    readFile("public/handbook/personalization-b2b-saas-admin-handbook.html", "utf8"),
  ]);

  assert.match(overview, /개인화 개요/);
  assert.match(overview, /대표 프로젝트 맵/);
  assert.match(overview, /포지션별 우선순위/);
  assert.match(overview, /경험 경계 문장/);
  assert.match(overview, /탄소·에너지\/투자 서비스/);
  assert.match(overview, /프로젝트별 실전 답변 카드/);
  assert.match(overview, /690 작업 커밋/);
  assert.match(overview, /573 개인 커밋/);
  assert.match(overview, /178 작업 커밋/);
  assert.match(overview, /120\+ 작업 커밋/);
  assert.match(overview, /React\/Next\/TypeScript/);
  assert.match(overview, /Vue·jQuery/);
  assert.match(overview, /React Native/);

  assert.match(frontend, /프론트엔드 개발자 대응/);
  assert.match(frontend, /성장 서사/);
  assert.match(frontend, /Data Grid/);
  assert.match(frontend, /지도·차트/);
  assert.match(frontend, /탄소·에너지 서비스/);
  assert.match(frontend, /i18n/);
  assert.match(frontend, /SEO\/AEO/);
  assert.match(frontend, /성능 최적화/);
  assert.match(frontend, /대체 증거/);
  assert.match(frontend, /커밋 수/);
  assert.match(frontend, /반복 개선 횟수/);
  assert.match(frontend, /REACT CONCURRENT SSR DRILL/);
  assert.match(frontend, /FRONTEND SECURITY CACHE DRILL/);

  assert.match(fullstack, /풀스택 개발자 대응/);
  assert.match(fullstack, /API 계약/);
  assert.match(fullstack, /axios interceptor/);
  assert.match(fullstack, /JWT\/refresh token/);
  assert.match(fullstack, /RBAC/);
  assert.match(fullstack, /pagination\/filter/);
  assert.match(fullstack, /파일 업로드\/다운로드/);
  assert.match(fullstack, /강점 전환 문장/);
  assert.match(fullstack, /경험을 서버 협업 역량으로 전환/);
  assert.match(fullstack, /SYSTEM DESIGN PRESSURE DRILL/);
  assert.match(fullstack, /PROJECT EVIDENCE QUALITY RUBRIC/);

  assert.match(backendTransition, /백엔드 전환 대응/);
  assert.match(backendTransition, /직접 경험/);
  assert.match(backendTransition, /일부 경험/);
  assert.match(backendTransition, /설계 지식/);
  assert.match(backendTransition, /Spring\/JPA\/DB/);
  assert.match(backendTransition, /트랜잭션/);
  assert.match(backendTransition, /인덱스/);
  assert.match(backendTransition, /제한적이라는 말로 끝내지 않기/);
  assert.match(backendTransition, /검증 가능한 서버 기능/);

  assert.match(b2bAdmin, /B2B·SaaS 어드민 대응/);
  assert.match(b2bAdmin, /운영자 UX/);
  assert.match(b2bAdmin, /권한/);
  assert.match(b2bAdmin, /대량 데이터/);
  assert.match(b2bAdmin, /Excel\/PDF/);
  assert.match(b2bAdmin, /감사 가능성/);
  assert.match(b2bAdmin, /워크플로우/);
  assert.match(b2bAdmin, /B2B SAAS DOMAIN DEPTH/);
});

test("catalog items have source files, generated modules, and catalog-derived loader entries", async () => {
  const loaderSource = await readFile("src/handbook/documentLoaders.ts", "utf8");

  assert.match(loaderSource, /import\s+\{\s*HANDBOOK_ITEMS\s*\}\s+from\s+"\.\/catalog\.mjs"/);
  assert.match(loaderSource, /import\.meta\.glob/);
  assert.doesNotMatch(loaderSource, /"home":\s*\(\)\s*=>\s*import\("\.\/documents\/home"\)/);

  for (const item of HANDBOOK_ITEMS) {
    await access(path.join("public", "handbook", item.file));
    await access(path.join("src", "handbook", "documents", `${item.id}.ts`));
  }
});

test("generated document modules match public handbook sources", async () => {
  for (const item of HANDBOOK_ITEMS) {
    const html = await readFile(path.join("public", "handbook", item.file), "utf8");
    const extracted = extractHandbookDocument(html);
    const moduleSource = await readFile(path.join("src", "handbook", "documents", `${item.id}.ts`), "utf8");
    const generated = extractGeneratedDocument(moduleSource);

    assert.ok(generated.navHtml, `${item.id} generated module is missing navHtml`);
    assert.ok(generated.mainHtml, `${item.id} generated module is missing mainHtml`);
    assert.deepEqual(generated, extracted, `${item.id} is out of sync with ${item.file}`);
  }
});

test("every handbook item has a rendered practical example", async () => {
  const [examplesSource, pageSource, cssSource] = await Promise.all([
    readFile("src/handbook/practicalExamples.ts", "utf8"),
    readFile("src/handbook/HandbookPage.tsx", "utf8"),
    readFile("src/handbook/handbook.css", "utf8"),
  ]);

  assert.match(pageSource, /PRACTICAL_EXAMPLES/);
  assert.match(pageSource, /getPracticalExampleLens/);
  assert.match(pageSource, /className="handbook-practical-example"/);
  assert.match(pageSource, /className="practical-example-grid"/);
  assert.match(pageSource, /className="practical-example-block"/);
  assert.match(pageSource, /className="practical-example-review"/);
  assert.match(pageSource, /실무 예시/);
  assert.match(pageSource, /현장 조건/);
  assert.match(pageSource, /실행 절차/);
  assert.match(pageSource, /검증 증거/);
  assert.match(pageSource, /실패 신호/);
  assert.match(pageSource, /완료 기준/);
  assert.match(pageSource, /리뷰 질문/);
  assert.match(cssSource, /\.handbook-main \.handbook-practical-example/);
  assert.match(cssSource, /\.handbook-main \.practical-example-grid/);
  assert.match(cssSource, /\.handbook-main \.practical-example-block/);
  assert.match(cssSource, /\.handbook-main \.practical-example-review/);
  assert.match(examplesSource, /LENS_BY_ITEM_ID/);
  assert.match(examplesSource, /failureSignals/);
  assert.match(examplesSource, /reviewQuestions/);

  for (const item of HANDBOOK_ITEMS) {
    assert.match(
      examplesSource,
      new RegExp(`(?:^|\\n)\\s*(?:"${item.id}"|${item.id}):\\s*example\\(`),
      `${item.id} should have a practical example`,
    );
    assert.match(
      examplesSource,
      new RegExp(`(?:^|\\n)\\s*(?:"${item.id}"|${item.id}):\\s*"(?:home|interview|personal|backend|frontend|network|devops|ax|design|practical)"`),
      `${item.id} should have a practical example lens`,
    );
  }
});

test("cheat sheets include professional review gates and failure playbooks", async () => {
  const cheatSheets = [
    "frontend-cheat-sheet.html",
    "backend-cheat-sheet.html",
    "database-cheat-sheet.html",
    "network-cheat-sheet.html",
    "docker-cheat-sheet.html",
    "linux-cheat-sheet.html",
    "devops-cheat-sheet.html",
    "interview-cheat-sheet.html",
    "tools-shortcuts-commands-cheat-sheet.html",
  ];

  const sources = await Promise.all(
    cheatSheets.map((file) => readFile(path.join("public", "handbook", file), "utf8")),
  );

  for (const [index, source] of sources.entries()) {
    const file = cheatSheets[index];
    assert.match(source, /Red Flags/, `${file} should expose red-flag guidance`);
    assert.match(source, /Review Gate/, `${file} should expose review gate guidance`);
    assert.match(source, /Failure Playbook/, `${file} should expose a failure playbook`);
    assert.match(source, /차단 기준|부족한 답변 기준/, `${file} should define a blocking quality bar`);
  }

  const combined = sources.join("\n");
  assert.match(combined, /BROKEN SCREEN TRIAGE/);
  assert.match(combined, /API INCIDENT TRIAGE/);
  assert.match(combined, /SLOW QUERY FIRST LOOK/);
  assert.match(combined, /L3-L7 TRIAGE/);
  assert.match(combined, /CONTAINER WON'T START/);
  assert.match(combined, /DISK FULL TRIAGE/);
  assert.match(combined, /DEPLOYMENT FAILURE TRIAGE/);
  assert.match(combined, /STUCK ANSWER TRIAGE/);
  assert.match(combined, /SameSite/);
  assert.match(combined, /idempotency/);
  assert.match(combined, /EXPLAIN \(ANALYZE, BUFFERS\)/);
  assert.match(combined, /lsof \+L1/);
  assert.match(combined, /PID 1/);
  assert.match(combined, /TOOLING INCIDENT TRIAGE/);
  assert.match(combined, /VS Code/);
  assert.match(combined, /Postman/);
  assert.match(combined, /Cmd\+P/);
  assert.match(combined, /Ctrl\+P/);
  assert.match(combined, /git status --short/);
  assert.match(combined, /curl -i/);
  assert.match(combined, /docker logs -f/);
});

test("generateHandbookDocuments leaves existing output intact when source extraction fails", async () => {
  const rootDir = await mkdtemp(path.join(os.tmpdir(), "handbook-generate-"));
  const publicDir = path.join(rootDir, "public", "handbook");
  const outDir = path.join(rootDir, "src", "handbook", "documents");

  await mkdir(publicDir, { recursive: true });
  await mkdir(outDir, { recursive: true });
  await writeFile(path.join(outDir, "existing.ts"), "keep me");
  await writeFile(
    path.join(publicDir, "bad.html"),
    "<html><body><main>missing nav</main></body></html>",
  );

  await assert.rejects(
    () =>
      generateHandbookDocuments({
        rootDir,
        documents: [{ id: "bad", file: "bad.html" }],
      }),
    /Expected handbook HTML to include nav and main regions/,
  );

  assert.equal(await readFile(path.join(outDir, "existing.ts"), "utf8"), "keep me");
});

test("app exposes an accessible fixed bottom document navigation bar", async () => {
  const [appSource, cssSource] = await Promise.all([
    readFile("src/App.tsx", "utf8"),
    readFile("src/App.css", "utf8"),
  ]);

  assert.match(appSource, /className="bottom-doc-nav"/);
  assert.match(appSource, /aria-label="문서 이동"/);
  assert.match(appSource, /aria-label=\{previousItem \? `이전 항목: \$\{previousItem\.label\}` : "이전 항목 없음"\}/);
  assert.match(appSource, /aria-label=\{nextItem \? `다음 항목: \$\{nextItem\.label\}` : "다음 항목 없음"\}/);
  assert.match(appSource, /aria-label="맨 위로 이동"/);
  assert.match(appSource, /mobileMenuOpen/);
  assert.match(appSource, /activeIdStorageKey/);
  assert.match(appSource, /scrollPositionStoragePrefix/);
  assert.match(appSource, /getStoredActiveId/);
  assert.match(appSource, /getStoredScrollPosition/);
  assert.match(appSource, /saveScrollPosition/);
  assert.match(appSource, /pagehide/);
  assert.match(appSource, /pendingScrollRestoreIdRef/);
  assert.match(appSource, /restoreSavedPosition/);
  assert.match(appSource, /<HandbookPage item=\{activeItem\} onReady=\{restoreSavedPosition\} \/>/);
  assert.match(appSource, /className="mobile-menu-toggle"/);
  assert.match(appSource, /aria-controls="mobile-handbook-menu"/);
  assert.match(appSource, /aria-label=\{mobileMenuOpen \? "전체 메뉴 닫기" : "전체 메뉴 열기"\}/);
  assert.match(appSource, /className="mobile-menu-sheet"/);
  assert.match(appSource, /<span>전체 메뉴<\/span>/);
  assert.match(appSource, /openMobileGroupKeys/);
  assert.match(appSource, /activeGroupKey/);
  assert.match(appSource, /handleToggleMobileGroup/);
  assert.match(appSource, /className="mobile-menu-group-trigger"/);
  assert.match(appSource, /aria-expanded=\{groupOpen\}/);
  assert.match(appSource, /aria-controls=\{panelId\}/);
  assert.match(appSource, /hidden=\{!groupOpen\}/);
  assert.match(appSource, /<ChevronDown size=\{16\} aria-hidden \/>/);
  assert.match(appSource, /setMobileMenuOpen\(false\)/);
  assert.match(appSource, /setActiveId\(item\.id\)/);
  assert.match(appSource, /window\.scrollY > 320/);
  assert.match(appSource, /window\.scrollTo\(\{\s*top: 0,\s*behavior: scrollBehavior/s);
  assert.match(appSource, /window\.scrollTo\(\{\s*top: storedPosition,\s*behavior: "auto"/s);
  assert.match(cssSource, /\.bottom-doc-nav/);
  assert.match(cssSource, /position: fixed/);
  assert.match(cssSource, /bottom: 0/);
  assert.match(cssSource, /\.bottom-doc-nav-inner/);
  assert.match(cssSource, /\.doc-nav-button/);
  assert.match(cssSource, /\.scroll-top-button/);
  assert.match(cssSource, /\.mobile-menu-toggle/);
  assert.match(cssSource, /\.mobile-menu-sheet/);
  assert.match(cssSource, /\.mobile-menu-group-trigger/);
  assert.match(cssSource, /\.mobile-menu-group-trigger\[aria-expanded="true"\] svg/);
  assert.match(cssSource, /\.mobile-menu-items\[hidden\]/);
  assert.match(cssSource, /@media \(max-width: 900px\)[\s\S]*\.app-header \.menubar\s*\{[\s\S]*display: none/s);
  assert.match(cssSource, /@media \(max-width: 900px\)[\s\S]*\.mobile-menu-toggle\s*\{[\s\S]*display: flex/s);
  assert.match(cssSource, /@media \(max-width: 900px\)[\s\S]*padding-bottom: calc\(82px \+ env\(safe-area-inset-bottom\)\)/s);
  assert.match(cssSource, /@media \(max-width: 900px\)[\s\S]*grid-template-columns: 46px minmax\(0, 1fr\) 46px minmax\(0, 1fr\)/s);
  assert.match(cssSource, /@media \(max-width: 900px\)[\s\S]*max-height: min\(62dvh, calc\(100dvh - 146px\)\)/s);
  assert.match(cssSource, /@media \(max-width: 380px\)[\s\S]*\.doc-nav-label\s*\{[\s\S]*display: none/s);
});

test("handbook page notifies the app after document content renders for scroll restoration", async () => {
  const pageSource = await readFile("src/handbook/HandbookPage.tsx", "utf8");

  assert.match(pageSource, /onReady\?: \(itemId: string\) => void/);
  assert.match(pageSource, /export function HandbookPage\(\{ item, onReady \}/);
  assert.match(pageSource, /onReady\?\.\(item\.id\)/);
  assert.match(pageSource, /\[document, item\.id, onReady\]/);
});

test("app uses the Dev Handbook title with fixed top navigation", async () => {
  const [appSource, appCssSource, handbookCssSource] = await Promise.all([
    readFile("src/App.tsx", "utf8"),
    readFile("src/App.css", "utf8"),
    readFile("src/handbook/handbook.css", "utf8"),
  ]);

  assert.match(appSource, /className="home-title-button"/);
  assert.match(appSource, /onClick=\{handleSelectHome\}/);
  assert.match(appSource, /aria-label="홈으로 이동"/);
  assert.match(appSource, /Dev Handbook/);
  assert.match(appSource, /const handleSelectHome = \(\) => \{/);
  assert.match(appSource, /handleSelectItem\(homeItem\)/);
  assert.doesNotMatch(appSource, /<h1>현황판<\/h1>/);
  assert.match(appCssSource, /\.app-header\s*\{[^}]*position: fixed/s);
  assert.match(appCssSource, /\.app-header\s*\{[^}]*top: 0/s);
  assert.match(appCssSource, /\.app-header\s*\{[^}]*z-index: 70/s);
  assert.match(appCssSource, /\.home-title-button/);
  assert.match(appCssSource, /\.home-title-button:focus-visible/);
  assert.doesNotMatch(appCssSource.match(/\.app-shell\s*\{[^}]*\}/s)?.[0] ?? "", /padding-top:/);
  assert.match(handbookCssSource, /\.handbook-shell\s*\{[^}]*padding-top: 105px/s);
  assert.match(handbookCssSource, /\.handbook-toc\s*\{[^}]*top: 105px/s);
  assert.match(handbookCssSource, /\.handbook-toc\s*\{[^}]*height: calc\(100vh - 105px\)/s);
  assert.match(handbookCssSource, /@media \(max-width: 900px\)[\s\S]*\.handbook-shell\s*\{[\s\S]*padding-top: 0/s);
});

test("root document exposes the Dev Handbook Open Graph image", async () => {
  const [source, image] = await Promise.all([
    readFile("index.html", "utf8"),
    readFile("public/dev.png"),
  ]);

  assert.match(source, /<title>Dev Handbook<\/title>/);
  assert.match(source, /<meta name="description" content="풀스택 개발자 성장을 위한 Dev Handbook" \/>/);
  assert.match(source, /<meta property="og:type" content="website" \/>/);
  assert.match(source, /<meta property="og:title" content="Dev Handbook" \/>/);
  assert.match(source, /<meta property="og:description" content="풀스택 개발자 성장을 위한 Dev Handbook" \/>/);
  assert.match(source, /<meta property="og:image" content="\/dev\.png" \/>/);
  assert.match(source, /<meta property="og:image:width" content="1200" \/>/);
  assert.match(source, /<meta property="og:image:height" content="675" \/>/);
  assert.match(source, /<meta name="twitter:card" content="summary_large_image" \/>/);
  assert.match(source, /<meta name="twitter:image" content="\/dev\.png" \/>/);
  assert.deepEqual([...image.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
});

test("handbook layout includes mobile responsive reading refinements", async () => {
  const [cssSource, globalCssSource] = await Promise.all([
    readFile("src/handbook/handbook.css", "utf8"),
    readFile("src/index.css", "utf8"),
  ]);

  assert.match(globalCssSource, /html\s*\{[\s\S]*scrollbar-gutter: stable/s);
  assert.match(globalCssSource, /html\s*\{[\s\S]*overflow-x: clip/s);
  assert.match(globalCssSource, /body\s*\{[\s\S]*overflow-x: clip/s);
  assert.match(globalCssSource, /#root\s*\{[\s\S]*overflow-x: clip/s);
  assert.match(cssSource, /\.handbook-shell\s*\{[\s\S]*overflow-x: clip/s);
  assert.match(cssSource, /@media \(max-width: 900px\)[\s\S]*\.handbook-toc\s*\{[\s\S]*position: sticky/s);
  assert.match(cssSource, /@media \(max-width: 900px\)[\s\S]*\.handbook-toc\s*\{[\s\S]*width: 100%/s);
  assert.match(cssSource, /@media \(max-width: 900px\)[\s\S]*\.handbook-toc\s*\{[\s\S]*margin-inline: 0/s);
  assert.match(cssSource, /@media \(max-width: 900px\)[\s\S]*\.handbook-toc\s*\{[\s\S]*overflow-x: auto/s);
  assert.match(cssSource, /@media \(max-width: 900px\)[\s\S]*\.handbook-toc\s*\{[\s\S]*scrollbar-width: none/s);
  assert.match(cssSource, /\.handbook-toc::\-webkit-scrollbar\s*\{[\s\S]*display: none/s);
  assert.match(cssSource, /@media \(max-width: 900px\)[\s\S]*\.handbook-toc \.nav-title\s*\{[\s\S]*display: none/s);
  assert.match(cssSource, /@media \(max-width: 900px\)[\s\S]*\.handbook-toc a\s*\{[\s\S]*display: inline-flex/s);
  assert.match(cssSource, /@media \(max-width: 900px\)[\s\S]*\.handbook-toc\s*\{[\s\S]*scroll-snap-type: x proximity/s);
  assert.match(cssSource, /@media \(max-width: 900px\)[\s\S]*\.handbook-toc a\s*\{[\s\S]*max-width: 78vw/s);
  assert.match(cssSource, /@media \(max-width: 900px\)[\s\S]*\.handbook-main\s*\{[\s\S]*padding: 0 16px 128px/s);
  assert.match(cssSource, /@media \(max-width: 900px\)[\s\S]*\.handbook-main \.hero\s*\{[\s\S]*padding: 38px 0 30px/s);
  assert.match(cssSource, /@media \(max-width: 900px\)[\s\S]*\.handbook-main table\s*\{[\s\S]*display: block/s);
  assert.match(cssSource, /@media \(max-width: 900px\)[\s\S]*\.handbook-main table\s*\{[\s\S]*overflow-x: auto/s);
  assert.match(cssSource, /@media \(max-width: 900px\)[\s\S]*\.handbook-main \.flow\s*\{[\s\S]*flex-direction: column/s);
  assert.match(cssSource, /@media \(max-width: 900px\)[\s\S]*\.handbook-main \.serial-card\s*\{[\s\S]*padding: 16px/s);
  assert.match(cssSource, /@media \(max-width: 900px\)[\s\S]*\.handbook-main \.ch-head\s*\{[\s\S]*flex-direction: column/s);
  assert.match(cssSource, /@media \(max-width: 380px\)[\s\S]*\.handbook-main h1\s*\{[\s\S]*font-size: 27px/s);
});

test("devops handbook includes practical senior-level operating guidance", async () => {
  const docs = await Promise.all([
    readFile("public/handbook/devops-handbook.html", "utf8"),
    readFile("public/handbook/devops-ci-pipeline-handbook.html", "utf8"),
    readFile("public/handbook/devops-cd-deployment-handbook.html", "utf8"),
    readFile("public/handbook/devops-iac-handbook.html", "utf8"),
    readFile("public/handbook/devops-containers-runtime-handbook.html", "utf8"),
    readFile("public/handbook/devops-orchestration-handbook.html", "utf8"),
    readFile("public/handbook/devops-observability-incident-handbook.html", "utf8"),
    readFile("public/handbook/devops-security-reliability-handbook.html", "utf8"),
  ]);
  const source = docs.join("\n");

  assert.match(source, /DORA/);
  assert.match(source, /WIP limit/);
  assert.match(source, /OIDC/);
  assert.match(source, /branch protection/);
  assert.match(source, /progressive delivery/);
  assert.match(source, /expand-contract/);
  assert.match(source, /remote state/);
  assert.match(source, /drift detection/);
  assert.match(source, /PID 1/);
  assert.match(source, /termination grace period/);
  assert.match(source, /request와 limit/);
  assert.match(source, /Golden Signals/);
  assert.match(source, /burn rate/);
  assert.match(source, /SLSA/);
  assert.match(source, /restore drill/);
});

test("ax handbook includes harness, loop, verification, and governance guidance", async () => {
  const docs = await Promise.all([
    readFile("public/handbook/ax-handbook.html", "utf8"),
    readFile("public/handbook/ax-engineer-capability-handbook.html", "utf8"),
    readFile("public/handbook/ax-work-automation-design-handbook.html", "utf8"),
    readFile("public/handbook/ax-harness-engineering-handbook.html", "utf8"),
    readFile("public/handbook/ax-context-engineering-handbook.html", "utf8"),
    readFile("public/handbook/ax-loop-engineering-handbook.html", "utf8"),
    readFile("public/handbook/ax-multi-agent-workflow-handbook.html", "utf8"),
    readFile("public/handbook/ax-verification-evaluation-handbook.html", "utf8"),
    readFile("public/handbook/ax-governance-security-handbook.html", "utf8"),
    readFile("public/handbook/ax-organization-adoption-handbook.html", "utf8"),
    readFile("public/handbook/ax-applied-case-studies-handbook.html", "utf8"),
    readFile("public/handbook/ax-practical-playbook-handbook.html", "utf8"),
  ]);
  const source = docs.join("\n");
  const axLabels = HANDBOOK_GROUPS.find((group) => group.key === "practice").items
    .filter((item) => item.id.startsWith("practice-ax-"))
    .map((item) => item.label);

  assert.deepEqual(axLabels, [
    "00 AX 기반·조직 적용",
    "01 AX 실행 루프·자동화",
    "02 AX 확장·거버넌스",
  ]);
  assert.match(source, /Model·Harness·Environment/);
  assert.match(source, /Workflow Mining/);
  assert.match(source, /업무 분해 관점/);
  assert.match(source, /자동화 판단 기준/);
  assert.match(source, /후보 선정 매트릭스/);
  assert.match(source, /Automation Decision Rule/i);
  assert.match(source, /Guarded Agent Pattern/);
  assert.match(source, /Task Specification/);
  assert.match(source, /Tool Access/);
  assert.match(source, /Observability/);
  assert.match(source, /Failure Attribution/);
  assert.match(source, /AUTOMATION HARNESS ARCHITECTURE/);
  assert.match(source, /Context Engineering/);
  assert.match(source, /Relevance/);
  assert.match(source, /Sufficiency/);
  assert.match(source, /Isolation/);
  assert.match(source, /Provenance/);
  assert.match(source, /Plan/);
  assert.match(source, /Act/);
  assert.match(source, /Verify/);
  assert.match(source, /Reflect/);
  assert.match(source, /독립 리뷰어/);
  assert.match(source, /Episode Package/);
  assert.match(source, /Failure Classification/);
  assert.match(source, /Adversarial Verification/);
  assert.match(source, /Prompt Injection/);
  assert.match(source, /Data leakage/);
  assert.match(source, /Permission boundary/);
  assert.match(source, /Audit log/);
  assert.match(source, /Autonomy ladder/);
  assert.match(source, /대규모 조직/);
  assert.match(source, /소규모 셀/);
  assert.match(source, /AI Platform Team/);
  assert.match(source, /golden workflow/);
  assert.match(source, /review latency/);
  assert.match(source, /rework rate/);
  assert.match(source, /Defect escape/i);
  assert.match(source, /Cost per episode/i);
  assert.match(source, /Learning retention/i);
  assert.match(source, /전사 PR Review Assistant/);
  assert.match(source, /프론트엔드 셀의 접근성·성능 점검/);
  assert.match(source, /백엔드 셀의 장애 회고 자동화/);
  assert.match(source, /2-WEEK AX AUTOMATION SPRINT/);
  assert.match(source, /Trace-based Eval Harness/);
  assert.match(source, /교육 과정/);
  assert.match(source, /파일럿/);
  assert.match(source, /조직 진단/);
  assert.match(source, /표준 산출물/);
  assert.match(source, /task spec/i);
  assert.match(source, /context package/i);
  assert.match(source, /harness policy/i);
  assert.match(source, /eval rubric/i);
  assert.match(source, /운영 지표/);
  assert.match(source, /거버넌스/);
  assert.match(source, /capstone/i);
});

test("backend handbook includes practical senior-level backend guidance without level-label wording", async () => {
  const docs = await Promise.all([
    readFile("public/handbook/backend-engineering-handbook.html", "utf8"),
    readFile("public/handbook/db-handbook.html", "utf8"),
    readFile("public/handbook/auth-security-handbook.html", "utf8"),
    readFile("public/handbook/architecture-handbook.html", "utf8"),
    readFile("public/handbook/async-messaging-handbook.html", "utf8"),
    readFile("public/handbook/testing-handbook.html", "utf8"),
    readFile("public/handbook/docker-deploy-handbook.html", "utf8"),
    readFile("public/handbook/observability-handbook.html", "utf8"),
  ]);
  const source = docs.join("\n");

  assert.doesNotMatch(source, /미들급/);
  assert.match(source, /Case study/);
  assert.match(source, /idempotency key/);
  assert.match(source, /API versioning/);
  assert.match(source, /backward compatibility/);
  assert.match(source, /MVCC/);
  assert.match(source, /covering index/);
  assert.match(source, /lock wait/);
  assert.match(source, /refresh token rotation/);
  assert.match(source, /session fixation/);
  assert.match(source, /RBAC/);
  assert.match(source, /ABAC/);
  assert.match(source, /bounded context/);
  assert.match(source, /anti-corruption layer/);
  assert.match(source, /strangler fig/);
  assert.match(source, /outbox/);
  assert.match(source, /inbox/);
  assert.match(source, /poison message/);
  assert.match(source, /consumer lag/);
  assert.match(source, /contract test/);
  assert.match(source, /Testcontainers/);
  assert.match(source, /graceful shutdown/);
  assert.match(source, /readiness/);
  assert.match(source, /RED/);
  assert.match(source, /USE/);
  assert.match(source, /high-cardinality/);
  assert.match(source, /SLO burn rate/);
  assert.match(source, /REQUEST PATH/);
  assert.match(source, /transaction boundary/);
  assert.match(source, /same key에 다른 payload|같은 key에 다른 payload/);
  assert.match(source, /ATOMIC STOCK DECREASE/);
  assert.match(source, /SLOW REQUEST TRIAGE/);
  assert.match(source, /connection acquisition time/);
  assert.match(source, /면접 답변 심화 프레임/);
  assert.match(source, /LOCK TRIAGE QUESTION/);
  assert.match(source, /EXPLAIN ANALYZE CHECKLIST/);
  assert.match(source, /EXPAND-CONTRACT/);
  assert.match(source, /idle in transaction/);
});

test("java spring backend examples explain JPA and Spring proxy internals", async () => {
  const docs = await Promise.all([
    readFile("public/handbook/jpa-examples.html", "utf8"),
    readFile("public/handbook/spring-boot-examples.html", "utf8"),
    readFile("public/handbook/engineering-java-spring-handbook.html", "utf8"),
  ]);
  const source = docs.join("\n");

  assert.match(source, /프록시·flush·연관관계 심화/);
  assert.match(source, /FLUSH TIMING/);
  assert.match(source, /LazyInitializationException/);
  assert.match(source, /fetch join과 pagination/);
  assert.match(source, /JPA DEPTH ANSWER/);
  assert.match(source, /프록시·트랜잭션·테스트 심화/);
  assert.match(source, /TRANSACTION PROXY FLOW/);
  assert.match(source, /self-invocation/);
  assert.match(source, /rollbackFor/);
  assert.match(source, /SPRING DEPTH ANSWER/);
});

test("operations handbook follows a service operations lifecycle roadmap", async () => {
  const operationsGroup = HANDBOOK_GROUPS.find((group) => group.key === "operations");

  assert.deepEqual(operationsGroup?.items.map((item) => item.label), [
    "00 인프라·운영 로드맵",
    "01 서비스 요청 경로",
    "02 VPC·Subnet·Routing·NAT",
    "03 보안 경계",
    "04 DNS·TLS·도메인 운영",
    "05 VPN·Private Connectivity",
    "06 CI/CD·Artifact·Environment",
    "07 컨테이너·오케스트레이션·Health Check",
    "08 IaC·변경관리·Drift",
    "09 Observability·SLO",
    "10 Incident Response·Rollback·DR",
    "11 운영 체크리스트·면접 답변",
    "12 AWS·Azure 실전 시나리오",
  ]);

  const docs = await Promise.all(
    operationsGroup.items.map((item) => readFile(path.join("public", "handbook", item.file), "utf8")),
  );
  const source = docs.join("\n");

  for (const [index, doc] of docs.entries()) {
    const item = operationsGroup.items[index];
    const lineCount = doc.split("\n").length;

    assert.ok(lineCount >= 100, `${item.file} should be a full handbook, not a short summary`);
    assert.match(doc, /<div class="shell">/, `${item.file} should use the standard handbook shell`);
    assert.match(doc, /<div class="nav-brand">OPERATIONS · /, `${item.file} should use the standard nav brand`);
    assert.match(doc, /<div class="nav-title">/, `${item.file} should use the standard nav title`);
    assert.match(doc, /<div class="hero-serial">/, `${item.file} should use the standard hero serial`);
    assert.match(doc, /class="hero-sub"/, `${item.file} should use the standard hero subtitle`);
    assert.match(doc, /<div class="ch-head">/, `${item.file} should use standard chapter headers`);
    assert.match(doc, /<footer>/, `${item.file} should include the standard document footer`);
    assert.match(doc, /개념 모델/, `${item.file} should include a concept model`);
    assert.match(doc, /실무 체크리스트/, `${item.file} should include an operational checklist`);
    assert.match(doc, /장애\/운영 시나리오/, `${item.file} should include an operations scenario`);
    assert.match(doc, /자주 틀리는 판단/, `${item.file} should include common failure signals`);
    assert.match(doc, /면접 답변 템플릿/, `${item.file} should include an interview answer template`);
  }

  assert.match(source, /DNS → CDN\/WAF → Load Balancer → App → DB/);
  assert.match(source, /TLS/);
  assert.match(source, /인증서/);
  assert.match(source, /CDN/);
  assert.match(source, /WAF/);
  assert.match(source, /Load Balancer/);
  assert.match(source, /health check/);
  assert.match(source, /ingress/);
  assert.match(source, /egress/);
  assert.match(source, /Private Endpoint/);
  assert.match(source, /SLO burn rate/);
  assert.match(source, /Incident Commander/);
  assert.match(source, /rollback/);
  assert.match(source, /RPO\/RTO/);
  assert.match(source, /DR/);
  assert.match(source, /runbook/i);
  assert.match(source, /운영 인수/);
  assert.match(source, /Route 53/);
  assert.match(source, /CloudFront/);
  assert.match(source, /Application Load Balancer/);
  assert.match(source, /ECS Fargate/);
  assert.match(source, /RDS/);
  assert.match(source, /Azure DNS/);
  assert.match(source, /Azure Front Door/);
  assert.match(source, /Application Gateway/);
  assert.match(source, /AKS/);
  assert.match(source, /Azure SQL/);
  assert.match(source, /Key Vault/);
  assert.match(source, /Private Link/);
});

test("design handbook includes practical senior-level product design guidance", async () => {
  const docs = await Promise.all([
    readFile("public/handbook/design-handbook.html", "utf8"),
    readFile("public/handbook/design-ux-thinking-handbook.html", "utf8"),
    readFile("public/handbook/design-information-architecture-handbook.html", "utf8"),
    readFile("public/handbook/design-user-flows-handbook.html", "utf8"),
    readFile("public/handbook/design-layout-hierarchy-handbook.html", "utf8"),
    readFile("public/handbook/design-interaction-patterns-handbook.html", "utf8"),
    readFile("public/handbook/design-forms-input-handbook.html", "utf8"),
    readFile("public/handbook/design-component-patterns-handbook.html", "utf8"),
    readFile("public/handbook/design-system-tokens-handbook.html", "utf8"),
    readFile("public/handbook/design-accessibility-inclusive-handbook.html", "utf8"),
    readFile("public/handbook/design-prototyping-testing-handbook.html", "utf8"),
    readFile("public/handbook/design-handoff-qa-handbook.html", "utf8"),
  ]);
  const source = docs.join("\n");

  assert.match(source, /Case study/);
  assert.match(source, /North Star Metric/);
  assert.match(source, /Jobs To Be Done/);
  assert.match(source, /card sorting/);
  assert.match(source, /tree testing/);
  assert.match(source, /idempotency key/);
  assert.match(source, /Fitts/);
  assert.match(source, /Hick/);
  assert.match(source, /Optimistic UI/);
  assert.match(source, /server-side validation/);
  assert.match(source, /ARIA Authoring Practices/);
  assert.match(source, /WCAG/);
  assert.match(source, /design token pipeline/);
  assert.match(source, /component adoption/);
  assert.match(source, /System Usability Scale/);
  assert.match(source, /visual diff/);
});

test("serial cards expose lucide-powered copy buttons", async () => {
  const [packageSource, pageSource, buttonSource, cssSource] = await Promise.all([
    readFile("package.json", "utf8"),
    readFile("src/handbook/HandbookPage.tsx", "utf8"),
    readFile("src/handbook/SerialCardCopyButton.tsx", "utf8"),
    readFile("src/handbook/handbook.css", "utf8"),
  ]);

  assert.match(packageSource, /"lucide-react"/);
  assert.match(pageSource, /createRoot/);
  assert.match(pageSource, /\.serial-card/);
  assert.match(pageSource, /SerialCardCopyButton/);
  assert.match(buttonSource, /from "lucide-react"/);
  assert.match(buttonSource, /Copy/);
  assert.match(buttonSource, /Check/);
  assert.match(buttonSource, /navigator\.clipboard\.writeText/);
  assert.match(buttonSource, /aria-label=\{copied \? "복사됨" : "명령어 복사"\}/);
  assert.match(cssSource, /\.serial-card-copy/);
  assert.match(cssSource, /position: absolute/);
});

test("practice cheat sheet inline code exposes copy buttons for commands and shortcuts", async () => {
  const [pageSource, buttonSource, cssSource] = await Promise.all([
    readFile("src/handbook/HandbookPage.tsx", "utf8"),
    readFile("src/handbook/InlineCodeCopyButton.tsx", "utf8"),
    readFile("src/handbook/handbook.css", "utf8"),
  ]);

  assert.match(pageSource, /InlineCodeCopyButton/);
  assert.match(pageSource, /itemId === "practice-cheat-sheets"/);
  assert.match(pageSource, /main\.querySelectorAll<HTMLElement>\("code"\)/);
  assert.match(pageSource, /!code\.closest\("pre"\)/);
  assert.match(pageSource, /!code\.closest\("\.serial-card"\)/);
  assert.match(pageSource, /inline-code-copy-mount/);
  assert.match(buttonSource, /from "lucide-react"/);
  assert.match(buttonSource, /Copy/);
  assert.match(buttonSource, /Check/);
  assert.match(buttonSource, /navigator\.clipboard\.writeText/);
  assert.match(buttonSource, /aria-label=\{label\}/);
  assert.match(cssSource, /\.inline-code-copy-mount/);
  assert.match(cssSource, /\.inline-code-copy/);
});
