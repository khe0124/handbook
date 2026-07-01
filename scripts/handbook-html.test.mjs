import assert from "node:assert/strict";
import { access, mkdir, mkdtemp, readFile, readdir, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import {
  AI_NATIVE_TRAINING_HANDBOOKS,
  AX_HANDBOOKS,
  BACKEND_HANDBOOKS,
  CAREER_HANDBOOKS,
  CHEAT_SHEETS,
  DESIGN_HANDBOOKS,
  DESIGN_PRACTICE_HANDBOOKS,
  DEVOPS_HANDBOOKS,
  ENGINEERING_CONTEXT_HANDBOOKS,
  FRONTEND_HANDBOOKS,
  HANDBOOK_GROUPS,
  HANDBOOK_ITEMS,
  INTERVIEW_HANDBOOKS,
  LLM_HANDBOOKS,
  NETWORK_HANDBOOKS,
  PERSONAL_HANDBOOKS,
  PRACTICAL_GUIDES,
} from "../src/handbook/catalog.mjs";
import { extractHandbookDocument, generateHandbookDocuments } from "./handbook-html.mjs";

const GENERATED_HTML_LITERAL_PATTERN = /"?(?:navHtml|mainHtml)"?:\s*(`(?:\\.|[^`\\])*`|"(?:\\.|[^"\\])*")/g;

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
    ["home", "engineering", "engineering-context", "llm", "ai-native", "operations", "ax", "design", "practice", "career"],
  );

  const labels = [
    ...HANDBOOK_GROUPS.map((group) => group.label),
    ...HANDBOOK_ITEMS.map((item) => item.label),
  ].join("\n");

  const careerGroup = HANDBOOK_GROUPS.find((group) => group.key === "career");
  const engineeringGroup = HANDBOOK_GROUPS.find((group) => group.key === "engineering");
  const engineeringContextGroup = HANDBOOK_GROUPS.find((group) => group.key === "engineering-context");
  const llmGroup = HANDBOOK_GROUPS.find((group) => group.key === "llm");
  const aiNativeGroup = HANDBOOK_GROUPS.find((group) => group.key === "ai-native");
  const axGroup = HANDBOOK_GROUPS.find((group) => group.key === "ax");
  const designGroup = HANDBOOK_GROUPS.find((group) => group.key === "design");
  const practiceGroup = HANDBOOK_GROUPS.find((group) => group.key === "practice");

  assert.equal(HANDBOOK_ITEMS.length, 81);
  assert.equal(careerGroup?.items.length, 10);
  assert.equal(engineeringGroup?.items.length, 15);
  assert.equal(engineeringContextGroup?.items.length, 8);
  assert.equal(llmGroup?.items.length, 12);
  assert.equal(aiNativeGroup?.items.length, 6);
  assert.equal(HANDBOOK_GROUPS.find((group) => group.key === "operations")?.items.length, 14);
  assert.equal(axGroup?.items.length, 3);
  assert.ok((designGroup?.items.length ?? 0) >= 6);
  assert.equal(practiceGroup?.items.length, 3);
  assert.ok(labels.includes("홈"));
  assert.ok(labels.includes("면접·커리어"));
  assert.ok(labels.includes("개발 핸드북"));
  assert.ok(labels.includes("엔지니어링 맥락"));
  assert.ok(labels.includes("LLM"));
  assert.ok(labels.includes("AI Native 훈련"));
  assert.ok(labels.includes("인프라·운영"));
  assert.ok(labels.includes("AX 실무"));
  assert.ok(labels.includes("디자인 실무"));
  assert.ok(labels.includes("실무 도구"));
  assert.ok(labels.includes("00 면접 전략·커리어 포지셔닝"));
  assert.ok(labels.includes("01 개인 이력 정리"));
  assert.ok(labels.includes("02 프론트엔드·JS/TS 면접"));
  assert.ok(labels.includes("03 백엔드·Java/Spring 면접"));
  assert.deepEqual(
    ENGINEERING_CONTEXT_HANDBOOKS.map((item) => item.id),
    [
      "context-scale-systems",
      "context-platform-productivity",
      "context-quality-release",
      "context-performance-metrics",
      "context-library-oss",
      "context-migration-compatibility",
      "context-frontend-runtime-ecosystem",
      "context-operational-ownership",
    ],
  );
  assert.ok(labels.includes("00 엔지니어링 규모 감각"));
  assert.ok(labels.includes("01 플랫폼 엔지니어링·개발자 생산성"));
  assert.ok(labels.includes("02 품질 엔지니어링·릴리즈 시스템"));
  assert.ok(labels.includes("03 성능 측정·지표 해석"));
  assert.ok(labels.includes("04 라이브러리·패키지·오픈소스 설계"));
  assert.ok(labels.includes("05 마이그레이션·호환성"));
  assert.ok(labels.includes("06 프론트엔드 빌드·런타임·생태계"));
  assert.ok(labels.includes("07 운영 책임·장애 대응 언어"));
  assert.ok(labels.includes("04 CS·DB·보안 심화 면접"));
  assert.ok(labels.includes("05 인프라·분산·클라우드 면접"));
  assert.ok(labels.includes("06 시스템 설계·프로젝트 심층"));
  assert.ok(labels.includes("07 컬처·협업·코드리뷰"));
  assert.ok(labels.includes("08 코딩테스트 패턴"));
  assert.ok(labels.includes("09 AI Native 포트폴리오"));
  assert.ok(labels.includes("00 CS 기초와 알고리즘 사고"));
  assert.ok(labels.includes("01 컴퓨터 시스템·OS·네트워크 기초"));
  assert.ok(labels.includes("02 프로그래밍 언어·런타임"));
  assert.ok(labels.includes("03 응용 수학·측정·검증"));
  assert.ok(labels.includes("04 프론트엔드 핵심"));
  assert.ok(labels.includes("05 프론트엔드 인터랙션·3D"));
  assert.ok(labels.includes("06 프론트엔드 성능·진단"));
  assert.ok(labels.includes("07 프론트엔드 품질·릴리스"));
  assert.ok(labels.includes("08 백엔드 핵심"));
  assert.ok(labels.includes("09 백엔드 인증·보안"));
  assert.ok(labels.includes("10 백엔드 아키텍처"));
  assert.ok(labels.includes("11 데이터 계층·저장소"));
  assert.ok(labels.includes("12 런타임 품질·장애대응"));
  assert.ok(labels.includes("13 플랫폼 도구·운영 기본기"));
  assert.ok(labels.includes("14 Java·Spring·JPA 사례"));
  assert.ok(labels.includes("00 LLM 로드맵·AI Native 개발자 모델"));
  assert.ok(labels.includes("01 AI Native 작업 표준·Definition of Done"));
  assert.ok(labels.includes("02 LLM 기초·모델 동작 원리"));
  assert.ok(labels.includes("03 프로덕션 프롬프팅·구조화 출력"));
  assert.ok(labels.includes("04 RAG·임베딩·벡터DB"));
  assert.ok(labels.includes("05 LLM 평가·품질 관리"));
  assert.ok(labels.includes("06 Agent·Tool Use·Workflow"));
  assert.ok(labels.includes("07 LLM 보안·거버넌스"));
  assert.ok(labels.includes("08 LLM 앱 아키텍처·운영"));
  assert.ok(labels.includes("09 멀티모달·파일·음성·Realtime"));
  assert.ok(labels.includes("10 Fine-tuning·Customization·Model Routing"));
  assert.ok(labels.includes("11 포트폴리오 프로젝트"));
  assert.ok(labels.includes("00 역량 매트릭스·진단"));
  assert.ok(labels.includes("01 실습 랩"));
  assert.ok(labels.includes("02 템플릿 키트"));
  assert.ok(labels.includes("03 평가 하네스"));
  assert.ok(labels.includes("04 보안 레드팀 Fixture"));
  assert.ok(labels.includes("05 Agent Runtime 구현"));
  assert.ok(labels.includes("00 인프라·운영 로드맵"));
  assert.ok(labels.includes("06 CI/CD·Artifact·Environment"));
  assert.ok(labels.includes("00 AX 기반·조직 적용"));
  assert.ok(labels.includes("01 AX 실행 루프·자동화"));
  assert.ok(labels.includes("02 AX 확장·거버넌스"));
  assert.ok(labels.includes("00 디자인 기반·사용자 흐름"));
  assert.ok(labels.includes("01 디자인 실행·시스템 품질"));
  assert.ok(labels.includes("02 시각디자인 기초·조형 원리"));
  assert.ok(labels.includes("03 색채·타이포그래피·브랜드 시각 언어"));
  assert.ok(labels.includes("04 아이콘·일러스트레이션 시스템"));
  assert.ok(labels.includes("05 데이터 시각화"));
  assert.ok(labels.includes("06 모션·애니메이션 원리"));
  assert.ok(labels.includes("07 사진학·이미지 리터러시"));
  assert.ok(labels.includes("08 AI 제품 UX·신뢰 설계"));
  assert.ok(labels.includes("00 실무 치트시트 모음"));
  assert.ok(labels.includes("01 실무 준비·작업 루프"));
  assert.ok(labels.includes("02 빌드·설정·릴리스 운영"));
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
  assert.ok(labels.includes("13 AI·LLM 운영 Addendum"));
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

test("llm menu covers multimodal, customization, security, governance, output sinks, and feedback", async () => {
  assert.equal(LLM_HANDBOOKS.length, 12);
  assert.deepEqual(
    LLM_HANDBOOKS.map((item) => item.label),
    [
      "00 LLM 로드맵·AI Native 개발자 모델",
      "01 AI Native 작업 표준·Definition of Done",
      "02 LLM 기초·모델 동작 원리",
      "03 프로덕션 프롬프팅·구조화 출력",
      "04 RAG·임베딩·벡터DB",
      "05 LLM 평가·품질 관리",
      "06 Agent·Tool Use·Workflow",
      "07 LLM 보안·거버넌스",
      "08 LLM 앱 아키텍처·운영",
      "09 멀티모달·파일·음성·Realtime",
      "10 Fine-tuning·Customization·Model Routing",
      "11 포트폴리오 프로젝트",
    ],
  );

  const requiredSourceMarkers = [
    ["src/handbook/documents/llm-multimodal-realtime.ts", ["MULTIMODAL REQUEST ENVELOPE", "vision extraction", "audio turn-taking", "realtime session", "multimodal eval"]],
    ["src/handbook/documents/llm-model-customization.ts", ["CUSTOMIZATION DECISION MATRIX", "prompt vs RAG vs fine-tuning", "distillation", "routing policy", "reasoning effort"]],
    ["src/handbook/documents/llm-security-governance.ts", ["OWASP LLM TOP 10 COVERAGE", "Insecure Output Handling", "Supply Chain Vulnerabilities", "Model Theft"]],
    ["src/handbook/documents/llm-app-architecture-operations.ts", ["DATA RESIDENCY", "provider due diligence", "routing policy", "reasoning_budget"]],
    ["src/handbook/documents/llm-prompting.ts", ["OUTPUT SINK SECURITY", "HTML/Markdown", "SQL", "shell command"]],
    ["src/handbook/documents/llm-evaluation.ts", ["ONLINE FEEDBACK LOOP", "human-labeled holdout", "thumbs feedback", "production drift"]],
    ["src/handbook/documents/llm-portfolio-projects.ts", ["AI UX EVIDENCE", "uncertainty UI", "citation UX", "human handoff"]],
  ];

  for (const [sourcePath, markers] of requiredSourceMarkers) {
    const source = await readFile(sourcePath, "utf8");

    for (const marker of markers) {
      assert.match(source, new RegExp(marker, "i"), `${sourcePath} should include ${marker}`);
    }
  }
});

test("home shortcut links point to catalog items", async () => {
  const homeHtml = await readFile(path.join("public", "handbook", "home-handbook.html"), "utf8");
  const shortcutIds = [...homeHtml.matchAll(/data-handbook-id="([^"]+)"/g)].map((match) => match[1]);
  const catalogIds = new Set(HANDBOOK_ITEMS.map((item) => item.id));

  assert.ok(shortcutIds.length >= HANDBOOK_GROUPS.length - 1);

  for (const shortcutId of shortcutIds) {
    assert.ok(catalogIds.has(shortcutId), `Unknown home shortcut id: ${shortcutId}`);
  }
});

test("career menu consolidates interview, personalized career, and AI Native portfolio documents", async () => {
  const careerGroup = HANDBOOK_GROUPS.find((group) => group.key === "career");
  const bundles = [
    {
      file: "career-strategy-foundation-handbook.html",
      sources: ["기술면접 개요", "회사·직무별 면접 전략", "개인화 개요"],
      evidence: ["BASE ANSWER FRAME", "핵심 질문 30선", "ANSWER FRAME"],
    },
    {
      file: "career-personal-history-handbook.html",
      sources: ["개인 이력 정리"],
      evidence: ["PERSONAL POSITIONING MAP", "REPRESENTATIVE PROJECT MAP", "CAREER TIMELINE", "POPLE", "GREENERY", "HEMS", "LCA", "TaaS", "INTERVIEW EVIDENCE MAP", "POSITION PRIORITY MATRIX", "EXPERIENCE BOUNDARY SENTENCES", "ANSWER CARDS"],
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
    {
      file: "career-ai-native-portfolio-handbook.html",
      sources: ["AI Native 포트폴리오"],
      evidence: ["AI Native", "EVIDENCE PACKET", "30초 결론"],
    },
  ];

  assert.equal(careerGroup?.items.length, 10);
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

test("career bundles include interview readiness gates and evidence-driven drills", async () => {
  const careerFiles = CAREER_HANDBOOKS.map((item) => item.file);
  const documents = await Promise.all(
    careerFiles.map(async (file) => [file, await readFile(path.join("public", "handbook", file), "utf8")]),
  );
  const source = documents.map(([, doc]) => doc).join("\n");

  for (const [file, doc] of documents) {
    assert.match(doc, /CAREER READINESS GATE/, `${file} should define concrete readiness outcomes`);
    assert.match(doc, /ANSWER QUALITY RUBRIC/, `${file} should include a self-scoring answer rubric`);
    assert.match(doc, /PRESSURE RESPONSE LOOP/, `${file} should include a pressure recovery loop`);
    assert.match(doc, /EVIDENCE PACKET/, `${file} should turn reading into interview evidence`);
    assert.match(doc, /DANGEROUS PHRASES/, `${file} should warn about weak interview phrasing`);
    assert.match(doc, /FINAL 10 MINUTE DRILL/, `${file} should include a final interview drill`);
    assert.match(doc, /30초 결론[\s\S]*90초 확장[\s\S]*압박 꼬리질문/, `${file} should connect short answers, expanded answers, and follow-ups`);
    assert.match(doc, /PR·ADR·지표·장애기록·QA ticket|PR, ADR, metric, incident record, QA ticket/, `${file} should require concrete evidence artifacts`);
  }

  assert.match(source, /프론트엔드·JS\/TS 답변 게이트/);
  assert.match(source, /백엔드·Java\/Spring 답변 게이트/);
  assert.match(source, /CS·DB·보안 심화 답변 게이트/);
  assert.match(source, /인프라·분산·클라우드 답변 게이트/);
  assert.match(source, /시스템 설계·프로젝트 답변 게이트/);
  assert.match(source, /컬처·협업 답변 게이트/);
  assert.match(source, /코딩테스트 답변 게이트/);
  assert.doesNotMatch(source, /열심히 했습니다/);
  assert.doesNotMatch(source, /공부했습니다/);
  assert.doesNotMatch(source, /잘 모릅니다만 열심히/);
});

test("engineering handbook menu splits backend core and architecture into separate items", async () => {
  const engineeringGroup = HANDBOOK_GROUPS.find((group) => group.key === "engineering");
  const bundles = [
    {
      file: "engineering-cs-foundations-handbook.html",
      sources: ["CS FOUNDATION SPINE", "INVARIANT PROOF DRILL", "PRODUCTION ALGORITHM DECISION", "BENCHMARK EVIDENCE PACKET"],
      evidence: ["CS FOUNDATION SPINE", "INVARIANT PROOF DRILL", "PRODUCTION ALGORITHM DECISION", "BENCHMARK EVIDENCE PACKET"],
    },
    {
      file: "engineering-computer-systems-handbook.html",
      sources: ["COMPUTER SYSTEMS SPINE", "CPU CACHE LOCALITY", "PROCESS THREAD SCHEDULING", "RESOURCE LIMIT PLAYBOOK"],
      evidence: ["COMPUTER SYSTEMS SPINE", "CPU CACHE LOCALITY", "FILE SOCKET SYSCALL TRACE", "RESOURCE LIMIT PLAYBOOK"],
    },
    {
      file: "engineering-language-runtime-handbook.html",
      sources: ["LANGUAGE RUNTIME SPINE", "TYPE SYSTEM BOUNDARY", "AST COMPILER PIPELINE", "SERIALIZATION CONTRACT"],
      evidence: ["LANGUAGE RUNTIME SPINE", "TYPE SYSTEM BOUNDARY", "GC JIT MEMORY MODEL", "SERIALIZATION CONTRACT"],
    },
    {
      file: "engineering-applied-math-measurement-handbook.html",
      sources: ["APPLIED MEASUREMENT SPINE", "PROBABILITY SAMPLING DRILL", "LATENCY PERCENTILE EVIDENCE", "VERIFICATION EVIDENCE PACKET"],
      evidence: ["APPLIED MEASUREMENT SPINE", "PROBABILITY SAMPLING DRILL", "VECTOR SIMILARITY BASICS", "VERIFICATION EVIDENCE PACKET"],
    },
    {
      file: "engineering-frontend-core-handbook.html",
      sources: ["프론트엔드 개요", "브라우저 동작 원리", "웹접근성"],
      evidence: ["FRONTEND ENGINEERING HANDBOOK", "BROWSER RUNTIME HANDBOOK", "WEB ACCESSIBILITY HANDBOOK"],
    },
    {
      file: "engineering-frontend-interaction-handbook.html",
      sources: ["인터랙션 설계", "애니메이션·모션 시스템", "그래픽·3D·WebGL"],
      evidence: ["FRONTEND INTERACTION HANDBOOK", "FRONTEND ANIMATION MOTION HANDBOOK", "FRONTEND GRAPHICS · 3D HANDBOOK", "PR GATE TEMPLATE", "MOTION SYSTEM CHECKLIST", "RELEASE GATE"],
    },
    {
      file: "engineering-frontend-performance-handbook.html",
      sources: ["번들링·렌더링·메모이제이션", "성능과 지표", "DevTools 사용법"],
      evidence: ["RENDERING OPTIMIZATION HANDBOOK", "PERFORMANCE METRICS HANDBOOK", "DEVTOOLS HANDBOOK", "RENDER BOTTLENECK TRACE", "PERFORMANCE BUDGET POLICY", "PERFORMANCE REGRESSION PACKET"],
    },
    {
      file: "engineering-frontend-quality-handbook.html",
      sources: ["보안 대응", "테스트 전략", "배포"],
      evidence: ["FRONTEND SECURITY HANDBOOK", "FRONTEND TESTING HANDBOOK", "FRONTEND DEPLOYMENT HANDBOOK"],
    },
    {
      file: "engineering-backend-core-handbook.html",
      sources: ["백엔드 개요"],
      evidence: ["BACKEND ENGINEERING HANDBOOK", "BACKEND ROADMAP OVERVIEW", "REQUEST TO OPERATIONS MAP", "API ERROR CONTRACT"],
    },
    {
      file: "engineering-backend-auth-security-handbook.html",
      sources: ["인증과 보안"],
      evidence: [
        "BACKEND AUTH SECURITY MAP",
        "COOKIE SESSION CORS MATRIX",
        "TOKEN LIFECYCLE RUNBOOK",
        "SECURITY INCIDENT PACKET",
      ],
    },
    {
      file: "engineering-backend-architecture-handbook.html",
      sources: ["아키텍처 패턴"],
      evidence: ["ARCHITECTURE PATTERNS HANDBOOK", "ARCHITECTURE CHOICE MATRIX", "SERVICE BOUNDARY CHECKLIST"],
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
      evidence: [
        "DOCKER & DEPLOY HANDBOOK",
        "LINUX / SHELL COMMANDS HANDBOOK",
        "vi / VIM SHORTCUTS HANDBOOK",
        "DOCKER EXAMPLES",
        "NGINX EXAMPLES",
        "PLATFORM OPERATING MODEL",
        "CHANGE SAFETY CHECKLIST",
        "TOOL RESPONSIBILITY MATRIX",
        "PRODUCTION TROUBLESHOOTING PLAYBOOK",
      ],
    },
    {
      file: "engineering-java-spring-handbook.html",
      sources: ["Java 예시", "JPA 예시", "Spring Boot 예시"],
      evidence: ["JAVA EXAMPLES", "JPA EXAMPLES", "SPRING BOOT 예시 사례"],
    },
  ];

  assert.equal(engineeringGroup?.items.length, 15);
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

test("backend auth security is a dedicated engineering handbook instead of being nested in backend core", async () => {
  const core = await readFile("public/handbook/engineering-backend-core-handbook.html", "utf8");
  const security = await readFile("public/handbook/engineering-backend-auth-security-handbook.html", "utf8");

  assert.doesNotMatch(core, /id="doc-auth"/);
  assert.doesNotMatch(core, /id="auth-ch1"/);
  assert.match(core, /백엔드 핵심/);
  assert.match(core, /API ERROR CONTRACT/);
  assert.match(core, /TRANSACTION BOUNDARY/);

  assert.match(security, /백엔드 인증·보안/);
  assert.match(security, /id="doc-auth"/);
  assert.match(security, /BACKEND AUTH SECURITY MAP/);
  assert.match(security, /COOKIE SESSION CORS MATRIX/);
  assert.match(security, /TOKEN LIFECYCLE RUNBOOK/);
  assert.match(security, /SECURITY INCIDENT PACKET/);

  assert.equal(security.match(/<header class="hero">/g)?.length ?? 0, 1);
  assert.doesNotMatch(security, /<footer>/);
  assert.ok(
    security.indexOf("BACKEND SECURITY REVIEW PACKET") > security.indexOf("SECURITY INCIDENT PACKET"),
    "security review packet should read as a generated follow-up section after the source content",
  );
});

test("LLM handbook group covers AI Native developer concepts from fundamentals to portfolio evidence", async () => {
  const llmGroup = HANDBOOK_GROUPS.find((group) => group.key === "llm");
  const documents = [
    {
      file: "llm-roadmap-handbook.html",
      evidence: ["AI NATIVE DEVELOPER MAP", "LLM CAPABILITY STACK", "AI Native 개발자", "AI NATIVE DEFINITION OF DONE"],
    },
    {
      file: "llm-ai-native-work-standards-handbook.html",
      evidence: ["AI NATIVE DEFINITION OF DONE", "CONTEXT PACKAGE", "PROMPT MODEL VERSION RECORD", "EVAL DATASET", "SECURITY FIXTURE", "COST LATENCY TRACE", "HUMAN APPROVAL RISK TIER", "RESIDUAL RISK REGISTER", "AI OUTPUT VERIFICATION PACKET"],
    },
    {
      file: "llm-fundamentals-handbook.html",
      evidence: ["TOKEN CONTEXT ATTENTION", "SAMPLING CONTROL", "HALLUCINATION"],
    },
    {
      file: "llm-prompting-handbook.html",
      evidence: ["STRUCTURED OUTPUT CONTRACT", "TOOL USE BOUNDARY", "TOKEN COST LATENCY ECONOMICS"],
    },
    {
      file: "llm-rag-handbook.html",
      evidence: ["RAG PIPELINE", "CHUNKING STRATEGY", "PGVECTOR CHROMA DECISION", "RERANKING"],
    },
    {
      file: "llm-evaluation-handbook.html",
      evidence: ["GOLDEN DATASET", "LLM-AS-JUDGE", "PROMPT REGRESSION", "QUALITY REPORT"],
    },
    {
      file: "llm-agents-tool-use-handbook.html",
      evidence: ["AGENT WORKFLOW BOUNDARY", "PLANNER EXECUTOR", "HUMAN APPROVAL GATE"],
    },
    {
      file: "llm-security-governance-handbook.html",
      evidence: ["PROMPT INJECTION", "UNTRUSTED CONTEXT", "DATA LEAKAGE"],
    },
    {
      file: "llm-app-architecture-operations-handbook.html",
      evidence: ["LLM OBSERVABILITY", "RATE LIMIT", "COST DASHBOARD"],
    },
    {
      file: "llm-multimodal-realtime-handbook.html",
      evidence: ["MULTIMODAL REQUEST ENVELOPE", "vision extraction", "audio turn-taking", "realtime session", "multimodal eval"],
    },
    {
      file: "llm-model-customization-handbook.html",
      evidence: ["CUSTOMIZATION DECISION MATRIX", "prompt vs RAG vs fine-tuning", "distillation", "routing policy", "reasoning effort"],
    },
    {
      file: "llm-portfolio-projects-handbook.html",
      evidence: ["문서 요약 \\+ 자동 분석 API", "문서 지식 검색 챗봇", "평가 하니스", "QUALITY REPORT", "AX EXECUTION EVIDENCE PACK"],
    },
  ];

  assert.equal(llmGroup?.items.length, 12);
  assert.deepEqual(
    LLM_HANDBOOKS.map((item) => item.file),
    documents.map((document) => document.file),
  );

  for (const document of documents) {
    const source = await readFile(path.join("public", "handbook", document.file), "utf8");

    assert.match(source, /<nav aria-label="목차">/, `${document.file} should include handbook navigation`);
    assert.match(source, /<main>/, `${document.file} should include main content`);

    for (const marker of document.evidence) {
      assert.match(source, new RegExp(marker, "i"), `${document.file} should include ${marker}`);
    }
  }
});

test("LLM handbook documents use concept-depth narratives instead of table-only summaries", async () => {
  for (const { file } of LLM_HANDBOOKS) {
    const source = await readFile(path.join("public", "handbook", file), "utf8");
    const paragraphTexts = Array.from(source.matchAll(/<p(?:\s[^>]*)?>([\s\S]*?)<\/p>/g)).map((match) =>
      match[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
    );
    const longParagraphs = paragraphTexts.filter((text) => text.length >= 180).length;
    const tableCount = (source.match(/<table\b/g) || []).length;
    const artifactCount = (source.match(/MARKER: artifact-ready/g) || []).length;
    const failureScenarioCount = (source.match(/MARKER: failure-driven/g) || []).length;

    assert.match(source, /MARKER: concept-depth/, `${file} should include concept-depth narrative markers`);
    assert.match(source, /MARKER: artifact-ready/, `${file} should include reusable artifact markers`);
    assert.match(source, /MARKER: failure-driven/, `${file} should include failure-driven examples`);
    assert.ok(failureScenarioCount >= 2, `${file} should include at least two explicit failure scenarios`);
    assert.ok(longParagraphs >= 3, `${file} should include at least three long explanatory paragraphs`);
    assert.ok(
      tableCount <= longParagraphs + artifactCount,
      `${file} should not rely on tables more than explanatory blocks and artifacts`,
    );
  }
});

test("AX, design, and practical tool menus group consistent handbook bundles", async () => {
  const axGroup = HANDBOOK_GROUPS.find((group) => group.key === "ax");
  const designGroup = HANDBOOK_GROUPS.find((group) => group.key === "design");
  const practiceGroup = HANDBOOK_GROUPS.find((group) => group.key === "practice");
  const axBundles = [
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
      evidence: ["Adversarial Verification", "Prompt Injection", "2-WEEK AX AUTOMATION SPRINT", "INTEGRATED AI NATIVE CAPSTONE"],
    },
  ];
  const designBundles = [
    {
      file: "practice-design-foundation-handbook.html",
      sources: ["디자인 개요", "UX 사고와 문제 정의", "정보구조와 내비게이션", "사용자 흐름과 태스크 설계"],
      evidence: ["North Star Metric", "정보구조", "사용자 흐름"],
    },
    {
      file: "practice-design-systems-handbook.html",
      sources: ["UI 레이아웃과 시각 위계", "인터랙션 디자인 패턴", "폼과 입력 경험", "컴포넌트 패턴", "디자인 시스템과 토큰", "AX 인터랙션·마이크로인터랙션", "접근성과 인클루시브 디자인", "프로토타입과 사용성 테스트", "디자인 핸드오프와 QA"],
      evidence: ["시각 위계", "Design Token", "핸드오프", "human-in-the-loop", "prefers-reduced-motion"],
    },
    {
      file: "practice-visual-design-foundations-handbook.html",
      sources: ["게슈탈트 원리", "여백·네거티브 스페이스", "그리드·레이아웃 조형", "Composition critique"],
      evidence: ["VISUAL HIERARCHY AUDIT", "스케일·비율·비례"],
    },
    {
      file: "practice-color-typography-brand-handbook.html",
      sources: ["색 공간과 모델", "배색 이론", "색 접근성", "타이포그래피 심화", "본문 조판"],
      evidence: ["BRAND VISUAL LANGUAGE AUDIT", "TYPE SCALE 정의 체크리스트"],
    },
    {
      file: "practice-iconography-illustration-handbook.html",
      sources: ["아이콘 조형 원칙", "의미·메타포·일관성", "일러스트 스타일 시스템"],
      evidence: ["ILLUSTRATION BRIEF 템플릿", "ICON / ILLUSTRATION REVIEW CHECKLIST"],
    },
    {
      file: "practice-data-visualization-handbook.html",
      sources: ["의도별 차트 선택", "시각 인코딩 원리", "오해 유발 안티패턴"],
      evidence: ["DATA VIZ REVIEW CHECKLIST", "Cleveland"],
    },
    {
      file: "practice-motion-animation-handbook.html",
      sources: ["모션의 목적", "안무", "의미 있는 전환", "접근성 · 모션 안전"],
      evidence: ["MOTION REVIEW CHECKLIST", "prefers-reduced-motion"],
    },
    {
      file: "practice-photography-image-literacy-handbook.html",
      sources: ["Exposure triangle", "렌즈·원근·심도", "빛과 조명", "이미지 파이프라인", "AI·스톡 이미지 점검"],
      evidence: ["PHOTO BRIEF TEMPLATE", "srcset"],
    },
    {
      file: "design-ai-product-ux-handbook.html",
      sources: ["불확실성 표시", "출처·근거 UI", "생성 UX 패턴", "Human handoff", "신뢰·기대 설정"],
      evidence: ["CITATION UX CONTRACT", "handoff"],
    },
  ];
  const practiceBundles = [
    {
      file: "practice-cheat-sheets-handbook.html",
      sources: ["Frontend", "Backend", "Database", "Network", "DevOps", "Linux", "Docker", "Interview", "Tools·Shortcuts·Commands"],
      evidence: ["핵심 명령·스니펫", "장애 증거 1카드", "TRIAGE", "Cmd\\+P", "curl -i", "docker logs -f"],
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
  const bundles = [...axBundles, ...designBundles, ...practiceBundles];

  assert.equal(axGroup?.items.length, 3);
  assert.ok((designGroup?.items.length ?? 0) >= 5);
  assert.equal(practiceGroup?.items.length, 3);
  assert.deepEqual(
    axGroup?.items.map((item) => item.file),
    axBundles.map((bundle) => bundle.file),
  );
  assert.deepEqual(
    designGroup?.items.slice(0, designBundles.length).map((item) => item.file),
    designBundles.map((bundle) => bundle.file),
  );
  assert.deepEqual(
    practiceGroup?.items.map((item) => item.file),
    practiceBundles.map((bundle) => bundle.file),
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

test("design practice includes specialist visual design, typography, and photography foundations", async () => {
  assert.deepEqual(
    DESIGN_PRACTICE_HANDBOOKS.map((item) => item.label),
    [
      "00 디자인 기반·사용자 흐름",
      "01 디자인 실행·시스템 품질",
      "02 시각디자인 기초·조형 원리",
      "03 색채·타이포그래피·브랜드 시각 언어",
      "04 아이콘·일러스트레이션 시스템",
      "05 데이터 시각화",
      "06 모션·애니메이션 원리",
      "07 사진학·이미지 리터러시",
      "08 AI 제품 UX·신뢰 설계",
    ],
  );

  const sourceMarkers = [
    ["src/handbook/documents/practice-visual-design-foundations.ts", ["게슈탈트", "여백", "그리드", "visual hierarchy", "스케일·비율·비례"]],
    ["src/handbook/documents/practice-color-typography-brand.ts", ["OKLCH", "배색", "타이포그래피 심화", "본문 조판", "APCA"]],
    ["src/handbook/documents/practice-iconography-illustration.ts", ["keyline", "currentColor", "픽토그램", "ILLUSTRATION BRIEF"]],
    ["src/handbook/documents/practice-data-visualization.ts", ["Cleveland", "pre-attentive", "sequential", "diverging", "dual-axis"]],
    ["src/handbook/documents/practice-motion-animation.ts", ["cubic-bezier", "easing", "stagger", "prefers-reduced-motion", "compositing"]],
    ["src/handbook/documents/practice-photography-image-literacy.ts", ["Exposure triangle", "focal length", "depth of field", "srcset", "AI"]],
    ["src/handbook/documents/design-ai-product-ux.ts", ["CITATION UX CONTRACT", "handoff", "grounding|근거", "confidence|불확실"]],
  ];

  for (const [sourcePath, markers] of sourceMarkers) {
    const source = await readFile(sourcePath, "utf8");

    for (const marker of markers) {
      assert.match(source, new RegExp(marker, "i"), `${sourcePath} should include ${marker}`);
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
  const allowedCareerEvidenceFiles = new Set(["career-personal-history-handbook.html"]);
  const extraFiles = publicFiles.filter((file) => file !== "index.html" && !catalogFiles.has(file) && !careerSourceFiles.has(file) && !engineeringSourceFiles.has(file) && !operationsSourceFiles.has(file) && !practiceSourceFiles.has(file));

  assert.deepEqual(extraFiles, []);

  for (const file of publicFiles) {
    assert.doesNotMatch(file, /carbon|lca|vcm/i);
    if (personalSourceFiles.has(file) || allowedCareerEvidenceFiles.has(file)) {
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
  assert.match(source, /AI Native/);
  assert.match(source, /인프라·운영/);
  assert.match(source, /ai-native-competency-map-handbook\.html/);
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
  const compactNavFiles = new Set([
    "practice-design-foundation-handbook.html",
    "practice-design-systems-handbook.html",
  ]);

  for (const item of HANDBOOK_ITEMS) {
    const html = await readFile(path.join("public", "handbook", item.file), "utf8");
    const { navHtml, mainHtml } = extractHandbookDocument(html);
    const navTargets = new Set([...navHtml.matchAll(/href="#([^"]+)"/g)].map((match) => match[1]));
    const sectionIds = new Set([...mainHtml.matchAll(/<section\b[^>]*\bid="([^"]+)"/g)].map((match) => match[1]));

    if (compactNavFiles.has(item.file)) {
      for (const target of navTargets) {
        assert.ok(sectionIds.has(target), `${item.file} nav target ${target} should point to a main section`);
      }
      assert.ok(navTargets.size < sectionIds.size, `${item.file} should keep a compact document-level nav`);
      continue;
    }

    assert.deepEqual(
      [...navTargets].sort(),
      [...sectionIds].sort(),
      `${item.file} nav links should match main sections`,
    );
  }
});

test("selected handbook content is positioned as a neutral full-stack growth guide", async () => {
  const sources = await Promise.all(
    HANDBOOK_ITEMS.filter((item) => item.kind !== "개인화" && item.kind !== "면접·커리어" && item.kind !== "LLM").map((item) => readFile(path.join("public", "handbook", item.file), "utf8")),
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
  assert.match(roadmap, /증거 포트폴리오 규칙/);
  assert.match(roadmap, /성능 증거/);
  assert.match(roadmap, /LOOP-01/);
  assert.match(roadmap, /복구 승인/);
  assert.match(roadmap, /FS-09/);
  assert.match(roadmap, /EXPERIENCE SIMULATOR/);
  assert.match(roadmap, /Senior Simulation Scorecard/);
  assert.match(roadmap, /Week 4 Game Day/);

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
  assert.doesNotMatch(source, /주니어와 미들/);
  assert.doesNotMatch(source, /시니어급 성장/);
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
  assert.match(homeSource, /AI Native 개발자 역량 지도/);
  assert.match(homeSource, /기능 하나를 끝까지 책임지는 작동 모델/);
  assert.match(homeSource, /요구사항/);
  assert.match(homeSource, /커리어 증거/);
  assert.match(homeSource, /학습 순서/);
  assert.match(homeSource, /메뉴별 목적/);
  assert.match(homeSource, /핸드북 사용법/);
  assert.match(homeSource, /실전 루프/);
  assert.match(homeSource, /면접·커리어/);
  assert.match(homeSource, /개발 핸드북/);
  assert.match(homeSource, /CS 기본기/);
  assert.match(homeSource, /컴퓨터 시스템/);
  assert.match(homeSource, /언어 런타임/);
  assert.match(homeSource, /측정/);
  assert.match(homeSource, /LLM/);
  assert.match(homeSource, /AI Native Definition of Done/);
  assert.match(homeSource, /인프라·운영/);
  assert.match(homeSource, /AX 실무/);
  assert.match(homeSource, /디자인 실무/);
  assert.match(homeSource, /실무 도구/);
  assert.match(homeSource, /프론트엔드/);
  assert.match(homeSource, /백엔드/);
  assert.match(homeSource, /네트워크 인프라/);
  assert.match(homeSource, /DevOps/);
  assert.match(homeSource, /AX/);
  assert.match(homeSource, /디자인/);
  assert.match(homeSource, /백엔드 예시/);
  assert.match(homeSource, /치트시트/);
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

test("primary interview documents include high-density concept answer upgrades", async () => {
  const primaryDocs = [
    ["frontend", "public/handbook/interview-frontend-handbook.html"],
    ["backend", "public/handbook/interview-backend-db-handbook.html"],
    ["infra", "public/handbook/interview-infra-ops-handbook.html"],
    ["distributed", "public/handbook/interview-distributed-handbook.html"],
    ["system", "public/handbook/interview-system-design-handbook.html"],
    ["project", "public/handbook/interview-project-handbook.html"],
    ["behavioral", "public/handbook/interview-behavioral-handbook.html"],
  ];
  const docs = await Promise.all(primaryDocs.map(async ([name, file]) => [name, file, await readFile(file, "utf8")]));
  const source = docs.map(([, , doc]) => doc).join("\n");

  for (const [name, file, doc] of docs) {
    assert.match(doc, /DEEP ANSWER MODEL/, `${file} should include a deep answer model`);
    assert.match(doc, /CONCEPT DEPTH/, `${file} should include concept-depth guidance`);
    assert.match(doc, /ANSWER UPGRADE TABLE/, `${file} should compare weak and strong answers`);
    assert.match(doc, /FOLLOW-UP DEFENSE/, `${file} should include pressure-question defense`);
    assert.match(doc, /EVIDENCE TO SAY/, `${file} should require concrete interview evidence`);
    assert.match(doc, /COMMON TRAPS/, `${file} should warn about weak answer traps`);
    assert.match(doc, /정의[\s\S]*내부 동작[\s\S]*실패 모드[\s\S]*검증 증거/, `${file} should connect definition, internals, failure modes, and evidence`);
    assert.doesNotMatch(doc, /많이 해봤습니다|공부했습니다|그냥 최적화|대충 알고/, `${name} should avoid vague answer phrasing`);
  }

  assert.match(source, /render phase[\s\S]*commit phase[\s\S]*layout\/paint/);
  assert.match(source, /transaction boundary[\s\S]*lock wait[\s\S]*connection pool/);
  assert.match(source, /DNS[\s\S]*TLS[\s\S]*Load Balancer[\s\S]*DB pool/);
  assert.match(source, /idempotency[\s\S]*outbox[\s\S]*eventual consistency/);
  assert.match(source, /capacity estimation[\s\S]*bottleneck[\s\S]*rollback/);
  assert.match(source, /project depth ledger[\s\S]*personal contribution[\s\S]*trade-off/);
  assert.match(source, /STAR[\s\S]*decision evidence[\s\S]*conflict boundary/);

  const careerDocs = await Promise.all([
    readFile("public/handbook/career-frontend-interview-handbook.html", "utf8"),
    readFile("public/handbook/career-backend-interview-handbook.html", "utf8"),
    readFile("public/handbook/career-infra-distributed-cloud-handbook.html", "utf8"),
    readFile("public/handbook/career-system-project-handbook.html", "utf8"),
    readFile("public/handbook/career-culture-collaboration-handbook.html", "utf8"),
  ]);
  const careerSource = careerDocs.join("\n");
  assert.match(careerSource, /DEEP ANSWER MODEL/);
  assert.match(careerSource, /ANSWER UPGRADE TABLE/);
  assert.match(careerSource, /FOLLOW-UP DEFENSE/);
});

test("frontend interview handbook teaches causal spoken answers instead of keyword lists", async () => {
  const frontend = await readFile("public/handbook/interview-frontend-handbook.html", "utf8");

  assert.match(frontend, /FE-00/);
  assert.match(frontend, /프론트엔드 답변 원칙/);
  assert.match(frontend, /정의[\s\S]*내부 동작[\s\S]*원인[\s\S]*결과[\s\S]*trade-off[\s\S]*실패 모드[\s\S]*검증 증거/);

  const requiredSections = [
    ["React rendering", "q2", /state update[\s\S]*render scheduling[\s\S]*reconciliation[\s\S]*commit[\s\S]*layout\/paint/],
    ["state boundary", "q3", /server snapshot[\s\S]*draft[\s\S]*dirty[\s\S]*validation error[\s\S]*rollback/],
    ["hydration", "q10", /SSR[\s\S]*first render[\s\S]*Date\.now[\s\S]*localStorage[\s\S]*hydration warning[\s\S]*client-only boundary/],
    ["web vitals", "q5", /LCP[\s\S]*TTFB[\s\S]*render-blocking[\s\S]*INP[\s\S]*long task[\s\S]*next paint[\s\S]*CLS[\s\S]*layout box/],
    ["frontend security", "q7", /source[\s\S]*sink[\s\S]*markdown[\s\S]*SVG[\s\S]*Trusted Types[\s\S]*sanitizer bypass/],
    ["large grid", "q13", /cell edit[\s\S]*rows 배열[\s\S]*memoization 실패[\s\S]*virtualization[\s\S]*IME[\s\S]*worker offloading/],
  ];

  for (const [label, id, pattern] of requiredSections) {
    const section = frontend.match(new RegExp(`<section id="${id}">[\\s\\S]*?<\\/section>`))?.[0] ?? "";
    assert.match(section, /원인-결과 흐름/, `${label} should include a causal chain block`);
    assert.match(section, /90초 발화형 답변/, `${label} should include a spoken 90-second answer`);
    assert.match(section, /실패 모드/, `${label} should include failure modes`);
    assert.match(section, /검증 증거/, `${label} should include verification evidence`);
    assert.match(section, /압박 질문 방어/, `${label} should include follow-up defense`);
    assert.match(section, pattern, `${label} should explain concrete cause-and-effect details`);
  }

  assert.doesNotMatch(frontend, /<tr><td>React rendering<\/td><td>상위 state 변경, 새 object\/function 참조, context 과다 구독<\/td>/);
});

test("frontend interview handbook covers second-pass advanced concept depth", async () => {
  const frontend = await readFile("public/handbook/interview-frontend-handbook.html", "utf8");
  const requiredSections = [
    ["browser pipeline", "q1", /forced synchronous layout[\s\S]*layout containment[\s\S]*layer promotion[\s\S]*will-change[\s\S]*GPU memory/],
    ["rendering strategy", "q4", /공개 상품 페이지[\s\S]*로그인 대시보드[\s\S]*개인화 검색 결과[\s\S]*streaming SSR[\s\S]*RSC client boundary/],
    ["accessibility", "q6", /accessible name[\s\S]*aria-live[\s\S]*roving tabindex[\s\S]*virtualized list\/grid[\s\S]*aria-disabled/],
    ["testing strategy", "q8", /unit test[\s\S]*MSW[\s\S]*integration test[\s\S]*Playwright[\s\S]*contract drift[\s\S]*flaky/],
    ["bundle optimization", "q11", /parse\/compile[\s\S]*route-level splitting[\s\S]*dynamic import[\s\S]*preload[\s\S]*fetchpriority[\s\S]*priority inversion/],
    ["rendering surface", "q14", /dirty rectangle[\s\S]*hit map[\s\S]*device pixel ratio[\s\S]*WebGL[\s\S]*DOM overlay/],
  ];

  for (const [label, id, pattern] of requiredSections) {
    const section = frontend.match(new RegExp(`<section id="${id}">[\\s\\S]*?<\\/section>`))?.[0] ?? "";
    assert.match(section, /원인-결과 흐름/, `${label} should include a causal chain block`);
    assert.match(section, /90초 발화형 답변/, `${label} should include a spoken 90-second answer`);
    assert.match(section, /실패 모드/, `${label} should include failure modes`);
    assert.match(section, /검증 증거/, `${label} should include verification evidence`);
    assert.match(section, /압박 질문 방어/, `${label} should include follow-up defense`);
    assert.match(section, pattern, `${label} should include advanced concept details`);
  }

  const drill = frontend.match(/<section id="q16">[\s\S]*?<\/section>/)?.[0] ?? "";
  assert.match(drill, /실전 압박 면접 세트/);
  assert.match(drill, /30초 시작 문장/);
  assert.match(drill, /90초 확장 포인트/);
  assert.match(drill, /반드시 말할 증거/);
  assert.match(drill, /피해야 할 답변/);
});

test("frontend interview handbook includes project-style evidence answer labs", async () => {
  const frontend = await readFile("public/handbook/interview-frontend-handbook.html", "utf8");

  assert.match(frontend, /FE-D6/);
  assert.match(frontend, /PROJECT EVIDENCE ANSWER LAB/);
  assert.match(frontend, /case-evidence-lab/);
  assert.match(frontend, /상황[\s\S]*원인[\s\S]*조치[\s\S]*결과 수치[\s\S]*압박 꼬리질문/);
  assert.match(frontend, /React render regression[\s\S]*parent state[\s\S]*commit duration[\s\S]*input p95[\s\S]*follow-up 1[\s\S]*follow-up 2/);
  assert.match(frontend, /LCP regression[\s\S]*TTFB[\s\S]*render-blocking[\s\S]*LCP image[\s\S]*p75[\s\S]*rollback/);
  assert.match(frontend, /Modal accessibility[\s\S]*accessible name[\s\S]*focus trap[\s\S]*aria-live[\s\S]*keyboard-only/);
  assert.match(frontend, /Markdown XSS[\s\S]*source[\s\S]*sink[\s\S]*Trusted Types[\s\S]*CSP violation[\s\S]*negative test/);
  assert.match(frontend, /Grid editing latency[\s\S]*rows 배열[\s\S]*IME[\s\S]*worker offloading[\s\S]*row render count/);
  assert.doesNotMatch(frontend, /PROJECT EVIDENCE ANSWER LAB[\s\S]*수치가 없으면 준비합니다/);
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
  assert.match(pageSource, /훈련 기준/);
  assert.match(pageSource, /제출 산출물/);
  assert.match(pageSource, /통과 기준/);
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
      new RegExp(`(?:^|\\n)\\s*(?:"${item.id}"|${item.id}):\\s*(?:example|trainingExample)\\(`),
      `${item.id} should have a practical example`,
    );
    assert.match(
      examplesSource,
      new RegExp(`(?:^|\\n)\\s*(?:"${item.id}"|${item.id}):\\s*"(?:home|interview|personal|backend|frontend|network|devops|ax|design|practical|llm|fundamentals|context)"`),
      `${item.id} should have a practical example lens`,
    );
  }
});

test("cheat sheets provide copy-ready commands, gotchas, and triage cards", async () => {
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
    assert.match(source, /· 즉시 확인/, `${file} should expose gotchas guidance`);
    assert.match(source, /1카드/, `${file} should expose a triage card`);
  }

  const combined = sources.join("\n");
  assert.ok(
    (combined.match(/<pre class="snippet-card">/g) ?? []).length >= 20,
    "cheat sheets should provide plenty of copy-ready command blocks",
  );
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
  assert.match(appSource, /<HandbookPage[\s\S]*item=\{activeItem\}[\s\S]*onReady=\{restoreSavedPosition\}[\s\S]*\/>/);
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
  assert.match(pageSource, /export function HandbookPage\(\{ item, onReady(?:, onSelectHandbook)? \}/);
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
  const [pageSource, cssSource, globalCssSource] = await Promise.all([
    readFile("src/handbook/HandbookPage.tsx", "utf8"),
    readFile("src/handbook/handbook.css", "utf8"),
    readFile("src/index.css", "utf8"),
  ]);

  assert.match(pageSource, /handbook-mobile-toc-toggle/);
  assert.match(pageSource, /aria-expanded=\{isTocOpen\}/);
  assert.match(pageSource, /aria-controls="handbook-document-toc"/);
  assert.match(pageSource, /id="handbook-document-toc"/);
  assert.match(pageSource, /onClick=\{\(\) => setIsTocOpen\(\(isOpen\) => !isOpen\)\}/);
  assert.match(pageSource, /setIsTocOpen\(false\)/);
  assert.match(globalCssSource, /html\s*\{[\s\S]*scrollbar-gutter: stable/s);
  assert.match(globalCssSource, /html\s*\{[\s\S]*overflow-x: clip/s);
  assert.match(globalCssSource, /body\s*\{[\s\S]*overflow-x: clip/s);
  assert.match(globalCssSource, /#root\s*\{[\s\S]*overflow-x: clip/s);
  assert.match(cssSource, /\.handbook-shell\s*\{[\s\S]*overflow-x: clip/s);
  assert.match(cssSource, /\.handbook-mobile-toc-toggle\s*\{[\s\S]*display: none/s);
  assert.match(cssSource, /@media \(max-width: 900px\)[\s\S]*\.handbook-mobile-toc-toggle\s*\{[\s\S]*display: inline-flex/s);
  assert.match(cssSource, /@media \(max-width: 900px\)[\s\S]*\.handbook-mobile-toc-toggle\s*\{[\s\S]*position: fixed/s);
  assert.match(cssSource, /@media \(max-width: 900px\)[\s\S]*\.handbook-mobile-toc-toggle\s*\{[\s\S]*top: 16px/s);
  assert.match(cssSource, /@media \(max-width: 900px\)[\s\S]*\.handbook-mobile-toc-toggle\s*\{[\s\S]*z-index: 999/s);
  assert.match(cssSource, /@media \(max-width: 900px\)[\s\S]*\.handbook-toc\s*\{[\s\S]*position: fixed/s);
  assert.match(cssSource, /@media \(max-width: 900px\)[\s\S]*\.handbook-toc\s*\{[\s\S]*display: none/s);
  assert.match(cssSource, /@media \(max-width: 900px\)[\s\S]*\.handbook-toc\.is-open\s*\{[\s\S]*display: block/s);
  assert.match(cssSource, /@media \(max-width: 900px\)[\s\S]*\.handbook-toc\s*\{[\s\S]*width: 100%/s);
  assert.match(cssSource, /@media \(max-width: 900px\)[\s\S]*\.handbook-toc\s*\{[\s\S]*margin-inline: 0/s);
  assert.match(cssSource, /@media \(max-width: 900px\)[\s\S]*\.handbook-toc\s*\{[\s\S]*overflow-y: auto/s);
  assert.match(cssSource, /@media \(max-width: 900px\)[\s\S]*\.handbook-toc a\s*\{[\s\S]*display: flex/s);
  assert.match(cssSource, /@media \(max-width: 900px\)[\s\S]*\.handbook-toc a\s*\{[\s\S]*width: 100%/s);
  assert.match(cssSource, /@media \(max-width: 900px\)[\s\S]*\.handbook-main\s*\{[\s\S]*padding: 0 16px 128px/s);
  assert.match(cssSource, /@media \(max-width: 900px\)[\s\S]*\.handbook-main \.hero\s*\{[\s\S]*padding: 38px 0 30px/s);
  assert.match(cssSource, /@media \(max-width: 900px\)[\s\S]*\.handbook-main table\s*\{[\s\S]*display: block/s);
  assert.match(cssSource, /@media \(max-width: 900px\)[\s\S]*\.handbook-main table\s*\{[\s\S]*overflow-x: auto/s);
  assert.match(cssSource, /@media \(max-width: 900px\)[\s\S]*\.handbook-main \.flow\s*\{[\s\S]*flex-direction: column/s);
  assert.match(cssSource, /@media \(max-width: 900px\)[\s\S]*\.handbook-main \.snippet-card\s*\{[\s\S]*padding: 16px/s);
  assert.match(cssSource, /@media \(max-width: 900px\)[\s\S]*\.handbook-main \.ch-head\s*\{[\s\S]*flex-direction: column/s);
  assert.match(cssSource, /@media \(max-width: 380px\)[\s\S]*\.handbook-main h1\s*\{[\s\S]*font-size: 27px/s);
});

test("handbook page exposes mobile learning tools for recall and section search", async () => {
  const [pageSource, copyButtonSource, cssSource] = await Promise.all([
    readFile("src/handbook/HandbookPage.tsx", "utf8"),
    readFile("src/handbook/SerialCardCopyButton.tsx", "utf8"),
    readFile("src/handbook/handbook.css", "utf8"),
  ]);

  assert.match(pageSource, /studyCardStoragePrefix = "dev-handbook:study-card:"/);
  assert.match(pageSource, /function LearningSearchPanel/);
  assert.match(pageSource, /function StudyCardsPanel/);
  assert.match(pageSource, /learningFilters[\s\S]*개념[\s\S]*실무 체크리스트|learningFilters[\s\S]*체크리스트/s);
  assert.match(pageSource, /면접 답변/);
  assert.match(pageSource, /실패 신호/);
  assert.match(pageSource, /산출물/);
  assert.match(pageSource, /href=\{`#\$\{section\.id\}`\}/);
  assert.match(pageSource, /className="handbook-learning-panels"/);
  assert.match(pageSource, /classList\.add\("mobile-card-table"\)/);
  assert.match(pageSource, /cell\.dataset\.label = header/);
  assert.match(pageSource, /learning-card-collapse-toggle/);
  assert.match(copyButtonSource, /learning-card-collapse-toggle/);
  assert.match(cssSource, /\.handbook-main \.handbook-learning-panels/);
  assert.match(cssSource, /\.handbook-main \.study-card/);
  assert.match(cssSource, /@media \(max-width: 700px\)[\s\S]*table\.mobile-card-table/s);
  assert.match(cssSource, /td::before\s*\{[\s\S]*content: attr\(data-label\)/s);
  assert.match(cssSource, /\.learning-collapsible-card\.is-collapsed/);
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
  const axLabels = HANDBOOK_GROUPS.find((group) => group.key === "ax").items.map((item) => item.label);

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
  assert.match(source, /EPISODE LOG EXAMPLE/);
  assert.match(source, /Human approval gate/i);
  assert.match(source, /환각 \/ 도구 오용 유형/);
  assert.match(source, /AX Peer Review Simulation/);
  assert.match(source, /AX REVIEW SIMULATION CARD/);
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

test("backend handbook includes practical senior-level backend guidance with explicit mid-level expectations", async () => {
  const docs = await Promise.all([
    readFile("public/handbook/backend-engineering-handbook.html", "utf8"),
    readFile("public/handbook/db-handbook.html", "utf8"),
    readFile("public/handbook/auth-security-handbook.html", "utf8"),
    readFile("public/handbook/architecture-handbook.html", "utf8"),
    readFile("public/handbook/async-messaging-handbook.html", "utf8"),
    readFile("public/handbook/testing-handbook.html", "utf8"),
    readFile("public/handbook/docker-deploy-handbook.html", "utf8"),
    readFile("public/handbook/observability-handbook.html", "utf8"),
    readFile("public/handbook/engineering-backend-core-handbook.html", "utf8"),
    readFile("public/handbook/engineering-backend-auth-security-handbook.html", "utf8"),
  ]);
  const source = docs.join("\n");

  assert.match(source, /Case study/);
  assert.match(source, /idempotency key/);
  assert.match(source, /API versioning/);
  assert.match(source, /backward compatibility/);
  assert.match(source, /MVCC/);
  assert.match(source, /covering index/);
  assert.match(source, /lock wait/);
  assert.match(source, /Performance &amp; DB Lab|Performance & DB Lab/);
  assert.match(source, /LOAD TEST RESULT TEMPLATE/);
  assert.match(source, /Migration safety lab/);
  assert.match(source, /DB Incident Drill Cards/);
  assert.match(source, /DB INCIDENT REVIEW PACKET/);
  assert.match(source, /refresh token rotation|refresh rotation/);
  assert.match(source, /session fixation/);
  assert.match(source, /Security Threat Modeling|BACKEND AUTH SECURITY MAP/);
  assert.match(source, /Tenant Isolation/);
  assert.match(source, /Security Review Rubric/);
  assert.match(source, /Security Tabletop Drills/);
  assert.match(source, /SECURITY INCIDENT PACKET/);
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
  assert.match(source, /REQUEST TO OPERATIONS MAP/);
  assert.match(source, /BACKEND REVIEW CHECKLIST/);
  assert.match(source, /BACKEND DESIGN QUESTION FLOW/);
  assert.match(source, /DESIGN DECISION MATRIX/);
  assert.match(source, /ORDER CREATION DESIGN WALKTHROUGH/);
  assert.match(source, /BACKEND DESIGN REVIEW RUBRIC/);
  assert.match(source, /API CONTRACT MINI/);
  assert.match(source, /BACKEND TEST PLAN/);
  assert.match(source, /BACKEND OPERABILITY CHECKLIST/);
  assert.match(source, /BACKEND ROADMAP OVERVIEW/);
  assert.match(source, /BACKEND READINESS GATE/);
  assert.match(source, /ORDER API CONTRACT EXAMPLE/);
  assert.match(source, /API ERROR CONTRACT/);
  assert.match(source, /API COMPATIBILITY RULES/);
  assert.match(source, /TRANSACTION BOUNDARY/);
  assert.match(source, /EXPLAIN ANALYZE CHECKLIST/);
  assert.match(source, /MIGRATION SAFETY RULES/);
  assert.match(source, /JPA FETCH PLAN CHECKLIST/);
  assert.match(source, /AUTHORIZATION DECISION TABLE/);
  assert.match(source, /Broken Access Control/);
  assert.match(source, /SECURITY REVIEW MINI RUBRIC|SECURITY REVIEW RUBRIC/);
  assert.match(source, /CACHE DECISION TABLE/);
  assert.match(source, /CACHE INVALIDATION PLAYBOOK/);
  assert.match(source, /ASYNC DECISION TABLE/);
  assert.match(source, /OUTBOX INBOX FLOW/);
  assert.match(source, /DLQ RECOVERY PLAYBOOK/);
  assert.match(source, /BACKEND TEST PYRAMID DECISION/);
  assert.match(source, /CONCURRENCY REGRESSION TEST/);
  assert.match(source, /DEPLOYMENT READINESS CHECKLIST/);
  assert.match(source, /BACKWARD COMPATIBLE RELEASE FLOW/);
  assert.match(source, /OBSERVABILITY SIGNAL MATRIX/);
  assert.match(source, /INCIDENT FIRST 15 MINUTES/);
  assert.match(source, /ARCHITECTURE CHOICE MATRIX/);
  assert.match(source, /MODULAR MONOLITH FIRST/);
  assert.match(source, /BACKEND CORE EVIDENCE PACKET/);
  assert.match(source, /BACKEND CORE OUTPUT BOUNDARY/);
  assert.match(source, /BACKEND ROADMAP OVERVIEW/);
  assert.match(source, /REQUEST TO OPERATIONS MAP/);
  assert.match(source, /BACKEND STUDY OUTPUTS/);
  assert.match(source, /언어·프레임워크 선택 → 요청 생명주기 → API 계약/);
  assert.match(source, /transaction boundary/);
  assert.match(source, /EXPLAIN ANALYZE/);
  assert.match(source, /expand-contract/);
  assert.match(source, /traceId/);
  assert.match(source, /consumer lag/);
  assert.match(source, /idempotency key/);
  assert.match(source, /negative test|negative tests/);
  assert.match(source, /ADR/);
  assert.match(source, /same key에 다른 payload|같은 key에 다른 payload/);
  assert.match(source, /ATOMIC STOCK DECREASE/);
  assert.match(source, /SLOW REQUEST TRIAGE/);
  assert.match(source, /connection acquisition time/);
  assert.match(source, /학습 산출물 포인터/);
  assert.match(source, /LOCK TRIAGE QUESTION/);
  assert.match(source, /EXPLAIN ANALYZE CHECKLIST/);
  assert.match(source, /EXPAND-CONTRACT/);
  assert.match(source, /idle in transaction/);
  assert.match(source, /BACKEND FOUNDATION CHECKLIST/);
  assert.match(source, /REQUEST CONTEXT HANDOFF/);
  assert.match(source, /LINUX PROCESS PORT LOG TRIAGE/);
  assert.match(source, /GIT PR OPERATING LOOP/);
  assert.match(source, /SPRING BEAN LIFECYCLE/);
  assert.match(source, /TRANSACTION PROXY FAILURE CASES/);
  assert.match(source, /SPRING EXCEPTION CONTRACT FLOW/);
  assert.match(source, /SCHEMA DESIGN DECISION TABLE/);
  assert.match(source, /NORMALIZATION DENORMALIZATION TRADEOFF/);
  assert.match(source, /JOIN QUERY REVIEW CHECKLIST/);
  assert.match(source, /MIGRATION TOOLING BASELINE/);
  assert.match(source, /BACKUP RESTORE DRILL/);
  assert.match(source, /LOAD TEST BASELINE/);
  assert.match(source, /TEST DATA STRATEGY/);
  assert.match(source, /CI CD GATE CHECKLIST/);
  assert.match(source, /CLOUD DEPLOYMENT MINIMUM/);
  assert.match(source, /LANGUAGE FRAMEWORK CHOICE GUIDE/);
  assert.match(source, /IAC KUBERNETES LEARNING BOUNDARY/);
  assert.match(source, /QUALITY FLOOR/);
  assert.match(source, /커리어 문서로 넘길 것/);
  assert.match(source, /BACKEND ROADMAP OVERVIEW[\s\S]*request lifecycle[\s\S]*API contract[\s\S]*transaction/);
  assert.doesNotMatch(source, /BE-10의 IDOR/);
  assert.doesNotMatch(source, /DB\(BE-03·04\)/);
  assert.doesNotMatch(source, /동시성\(BE-05\)/);
  assert.doesNotMatch(source, /"이 요청에 정확히 무슨 일이<\/td>/);
});

test("backend core handbook addresses reviewed depth gaps with concrete upgrade sections", async () => {
  const source = await readFile("public/handbook/engineering-backend-core-handbook.html", "utf8");

  assert.match(source, /BACKEND CORE SECURITY HANDOFF/);
  assert.match(source, /ISOLATION LEVEL ENGINE NOTES/);
  assert.match(source, /PostgreSQL[\s\S]*MySQL\/InnoDB/);
  assert.match(source, /JPA ENTITY RELATIONSHIP FAILURE MODES/);
  assert.match(source, /owning side/);
  assert.match(source, /SPRING TRANSACTION CODE PATH/);
  assert.match(source, /self-invocation/);
  assert.match(source, /REDIS OPERATIONS FAILURE MODES/);
  assert.match(source, /fencing token/);
  assert.match(source, /MESSAGING BROKER SEMANTICS/);
  assert.match(source, /visibility timeout/);
  assert.match(source, /SPRING TEST SLICE MATRIX/);
  assert.match(source, /@DataJpaTest/);
  assert.match(source, /JVM RUNTIME OPERATIONS PLAYBOOK/);
  assert.match(source, /thread dump/);
  assert.match(source, /BACKEND CORE OUTPUT BOUNDARY/);
});

test("frontend quality handbook defines release-grade quality gates", async () => {
  const source = await readFile("public/handbook/engineering-frontend-quality-handbook.html", "utf8");

  assert.match(source, /FRONTEND RELEASE QUALITY OPERATING MODEL/);
  assert.match(source, /change risk classification/i);
  assert.match(source, /release health window/i);
  assert.match(source, /FRONTEND SECURITY RELEASE GATE/);
  assert.match(source, /sanitizer regression/i);
  assert.match(source, /RISK BASED TEST MATRIX/);
  assert.match(source, /contract drift/i);
  assert.match(source, /FLAKY TEST TRIAGE/);
  assert.match(source, /trace viewer/i);
  assert.match(source, /VISUAL A11Y RELEASE GATE/);
  assert.match(source, /keyboard path/i);
  assert.match(source, /FRONTEND DEPLOYMENT HEALTH GATE/);
  assert.match(source, /Web Vitals regression/i);
  assert.match(source, /ROLLBACK FORWARD FIX DECISION/);
  assert.match(source, /feature flag kill switch/i);
  assert.match(source, /AI NATIVE FRONTEND QUALITY LOOP/);
  assert.match(source, /release notes/i);
});

test("backend source handbook follows roadmap order without duplicate BE chapter codes", async () => {
  const source = await readFile("public/handbook/backend-engineering-handbook.html", "utf8");
  const main = source.match(/<main>[\s\S]*<\/main>/)?.[0] ?? "";

  const expectedOrder = [
    "BE-00",
    "BE-01",
    "BE-02",
    "BE-03",
    "BE-04",
    "BE-05",
    "BE-06",
    "BE-07",
    "BE-08",
    "BE-09",
    "BE-10",
    "BE-11",
    "BE-12",
    "BE-13",
    "BE-14",
    "BE-15",
  ];

  const seen = [...main.matchAll(/<span class="ch-code">(BE-\d{2})<\/span>/g)].map((match) => match[1]);

  assert.deepEqual(seen, expectedOrder);
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
    "13 AI·LLM 운영 Addendum",
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
    const termSections = doc.match(/<section\b[^>]*>[\s\S]*?(?:<span class="ch-code">TERM<\/span>|<h2>[^<]*TERM[^<]*<\/h2>)[\s\S]*?<\/section>/g) ?? [];
    assert.ok(termSections.length >= 1, `${item.file} should include a TERM glossary section`);
    assert.ok(
      termSections.some((section) => /<(?:table|div)\b[\s\S]*?용어[\s\S]*?정의[\s\S]*?운영 증거[\s\S]*?자주 하는 오해[\s\S]*?관련 항목[\s\S]*?<\/(?:table|div)>/.test(section)),
      `${item.file} should include a TERM glossary table or block with term, definition, evidence, misconception, and related-item labels`,
    );
    const practiceLabBlocks = doc.match(/<div class="practice-lab">[\s\S]*?<\/div>/g) ?? [];
    assert.ok(practiceLabBlocks.length >= 1, `${item.file} should include at least one concrete practice lab`);
    assert.ok(
      practiceLabBlocks.some(
        (block) =>
          /PRACTICE LAB/.test(block) &&
          /Command \/ Query/.test(block) &&
          /정상 출력[\s\S]*비정상 출력[\s\S]*판단 훈련/.test(block) &&
          /즉시 완화[\s\S]*영구 수정[\s\S]*검증 기준/.test(block),
      ),
      `${item.file} should include a complete practice lab block with command, outputs, interpretation, mitigation, fix, and verification`,
    );
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
  assert.match(source, /SLO \/ Burn-rate evidence/);
  assert.match(source, /DR DRILL \/ FAILBACK CHECKLIST/);
  assert.match(source, /IAM\/Network 증거/);
  assert.match(source, /Game Day 운영 훈련/);
  assert.match(source, /GAME DAY REVIEW PACKET/);
  assert.match(source, /REQUEST PATH TRIAGE PLAYBOOK/);
  assert.match(source, /VPC ROUTING EVIDENCE PLAYBOOK/);
  assert.match(source, /SLO OBSERVABILITY DESIGN PLAYBOOK/);
  assert.match(source, /INCIDENT RESPONSE DRILL PLAYBOOK/);
  assert.match(source, /AWS AZURE OPERATIONS PLAYBOOK/);
  assert.match(source, /OPERATIONS ANSWER FRAME/);
  assert.match(source, /심화 장애 패턴/);
  assert.match(source, /Good SLI/);
  assert.match(source, /CloudFront \/ Front Door 403/);
  assert.match(source, /target health/);
  assert.match(source, /openssl s_client/);
  assert.match(source, /flow log/i);
  assert.doesNotMatch(source, /말로는 이해했지만/);
  assert.doesNotMatch(source, /설정, 로그, 지표, 변경 이력, 재현 명령/);
  assert.doesNotMatch(source, /실제 서비스 경로에서 어떤 책임/);
  assert.doesNotMatch(source, /FORMAT : 개념 → 체크리스트/);

  const requestPathDoc = docs[operationsGroup.items.findIndex((item) => item.file === "operations-request-path-handbook.html")];
  const roadmapDoc = docs[operationsGroup.items.findIndex((item) => item.file === "operations-roadmap-handbook.html")];
  const observabilityDoc = docs[operationsGroup.items.findIndex((item) => item.file === "operations-observability-slo-handbook.html")];
  const cloudDoc = docs[operationsGroup.items.findIndex((item) => item.file === "operations-cloud-scenarios-handbook.html")];

  assert.match(roadmapDoc, /로드맵으로 읽는 순서[\s\S]*1주차 · 요청 경로[\s\S]*4주차 · 관측과 복구/);
  assert.match(roadmapDoc, /대상 독자와 학습 계약[\s\S]*미들급 개발자[\s\S]*학습 산출물/);
  assert.match(roadmapDoc, /60분 강연 흐름[\s\S]*0-5분[\s\S]*52-60분/);
  assert.match(roadmapDoc, /계층별 실패 모드[\s\S]*DNS\/TLS[\s\S]*Load Balancer[\s\S]*Recovery path/);
  assert.match(roadmapDoc, /AWS\/Azure 증거 비교[\s\S]*Route 53[\s\S]*Azure DNS[\s\S]*PrivateLink[\s\S]*Private Endpoint/);
  assert.match(roadmapDoc, /운영 의사결정 트리[\s\S]*사용자가 실제로 영향을 받는가[\s\S]*원인 확정 전 완화가 가능한가[\s\S]*복구가 검증됐는가/);
  assert.match(roadmapDoc, /운영 준비도 점수표[\s\S]*0점[\s\S]*4점/);
  assert.match(roadmapDoc, /강연 데모 스크립트[\s\S]*데모 1[\s\S]*5xx fast burn triage[\s\S]*restore drill 채점/);
  assert.match(roadmapDoc, /실습 채점 루브릭[\s\S]*초급[\s\S]*상급[\s\S]*리뷰어/);
  assert.match(roadmapDoc, /전문가 리뷰 질문[\s\S]*SRE 리뷰[\s\S]*Cloud network 리뷰[\s\S]*DB\/DR 리뷰/);
  assert.match(roadmapDoc, /공식 근거 맵[\s\S]*Google SRE Workbook · Alerting on SLOs[\s\S]*Kubernetes Docs · Liveness, Readiness, and Startup Probes[\s\S]*AWS Docs · Flow log records/);
  assert.match(roadmapDoc, /AWS Docs · Restoring a DB instance to a specified time[\s\S]*Microsoft Learn · Restore a database from a backup/);
  assert.match(roadmapDoc, /정확도 한계와 공개 시 주의 문구[\s\S]*SLO 임계값[\s\S]*Flow log 판독[\s\S]*DR\/RPO\/RTO/);
  assert.match(roadmapDoc, /벤더별 세부 함정[\s\S]*Route 53 \/ Azure DNS[\s\S]*PrivateLink \/ Private Endpoint[\s\S]*RDS \/ Azure SQL/);
  assert.match(roadmapDoc, /재현 실습 패킷[\s\S]*학습자 제출물[\s\S]*증거 연결 40%[\s\S]*sandbox 계정/);
  assert.match(roadmapDoc, /출판 전 검수 기준[\s\S]*개념 정확성[\s\S]*전문 리뷰/);
  assert.match(roadmapDoc, /운영 산출물 템플릿[\s\S]*Readiness packet[\s\S]*Incident packet/);
  assert.match(roadmapDoc, /service: checkout-api/);
  assert.match(roadmapDoc, /incident: INC-2026-0715-checkout-fast-burn/);
  assert.match(roadmapDoc, /launch_gate: blocked if owner, rollback, restore, alert route, or SLO is missing/);
  assert.match(roadmapDoc, /runbook_diff:[\s\S]*add metric gate for checkout_success burn/);
  assert.match(roadmapDoc, /배포 직후 5xx 증가 triage/);
  assert.match(roadmapDoc, /DNS\/TLS edge 장애 판독/);
  assert.match(roadmapDoc, /Private subnet egress 장애 판독/);
  assert.match(roadmapDoc, /SLO burn과 incident 역할 판독/);
  assert.match(roadmapDoc, /Restore drill RPO\/RTO 판독/);
  assert.match(roadmapDoc, /강연\/출판용 실전 케이스[\s\S]*Case 1 · 배포 후 checkout 5xx fast burn[\s\S]*Case 2 · Private subnet egress와 NAT 비용 급증[\s\S]*Case 3 · Restore drill RPO\/RTO 실패/);
  assert.match(roadmapDoc, /대표 오판[\s\S]*종료 조건/);
  assert.match(roadmapDoc, /30초 답변[\s\S]*90초 답변[\s\S]*나쁜 답변/);

  assert.match(requestPathDoc, /앱과 DB 경계[\s\S]*connection pool[\s\S]*slow query[\s\S]*lock wait/);
  assert.doesNotMatch(requestPathDoc, /앱과 DB 경계[\s\S]{0,700}authoritative answer/);
  assert.doesNotMatch(requestPathDoc, /앱과 DB 경계[\s\S]{0,700}dig \+trace/);

  assert.match(observabilityDoc, /SLO는 사용자 경험을 기준으로 잡는 내부 신뢰성 목표/);
  assert.doesNotMatch(observabilityDoc, /SLO는 내부 목표가 아니라 사용자에게 약속할 품질 수준/);
  assert.match(observabilityDoc, /SLO burn rate[\s\S]*error budget[\s\S]*fast burn[\s\S]*slow burn/);

  assert.match(cloudDoc, /CloudFront와 Azure Front Door는 edge 계층/);
  assert.match(cloudDoc, /Application Load Balancer와 Application Gateway는 regional L7 진입점/);
  assert.match(cloudDoc, /사설 네트워크와 데이터 경계[\s\S]*route table[\s\S]*Private DNS[\s\S]*flow log/);
  assert.doesNotMatch(cloudDoc, /사설 네트워크와 데이터 경계[\s\S]{0,700}Front Door health/);
  assert.match(requestPathDoc, /pool pending 낮음[\s\S]*pool pending 급증/);
  assert.match(observabilityDoc, /Fast burn[\s\S]*Slow burn/);
  assert.match(cloudDoc, /Private DNS가 사설 IP를 반환[\s\S]*DNS가 public endpoint를 반환/);

  assert.doesNotMatch(source, /서비스 요청 경로은/);
  assert.doesNotMatch(source, /Observability·SLO은/);
  assert.doesNotMatch(source, /AWS·Azure 실전 시나리오은/);
  assert.doesNotMatch(source, /사용자 영향, 최근 변경, owner, runbook/);
  assert.doesNotMatch(source, /dashboard, alert, log sample, trace sample, change ticket, runbook/);
  assert.doesNotMatch(source, /장애 시 이 항목을 원인 후보에서 제외하려면 무엇을 확인해야 하는가/);
  assert.doesNotMatch(source, /임시 완화와 영구 수정은 어떻게 구분하는가/);
  assert.doesNotMatch(source, /작업 전에는 무엇을 바꿀지보다 무엇을 깨뜨릴 수 있는지를 먼저 본다/);
  assert.doesNotMatch(source, /아래 표는 이 주제를 실제 운영 상황에서 확인하는 순서입니다/);
  assert.doesNotMatch(source, /증상 → 영향 범위 → 최근 변경 → 계층별 증거 → 완화책 → 복구 검증 → 재발 방지 순서로 기록한다/);
  assert.doesNotMatch(source, /운영 품질은 아는 개념보다 틀린 가정을 빨리 찾는 능력에서 갈린다/);
  assert.match(source, /route table readback[\s\S]*effective route/);
  assert.match(source, /WAF rule hit[\s\S]*SG stateful rule[\s\S]*NACL stateless rule/);
  assert.match(source, /openssl s_client -showcerts[\s\S]*certificate inventory/);
  assert.match(source, /kubectl describe[\s\S]*logs --previous/);
  assert.match(source, /terraform plan -out[\s\S]*terraform show/);
  for (const term of [
    "SLO",
    "RPO",
    "RTO",
    "NAT Gateway",
    "Private Endpoint",
    "readiness",
    "liveness",
    "Terraform state lock",
    "WAF",
    "DNS",
    "TLS",
  ]) {
    assert.match(source, new RegExp(term), `operations TERM glossary source should include ${term}`);
  }
  assert.doesNotMatch(source, /용어를 이해한다/);
  assert.doesNotMatch(source, /상황에 따라 다르다/);
  assert.doesNotMatch(source, /필요하면 확인한다/);
  assert.match(source, /PRACTICE LAB/);
  assert.match(source, /정상 출력/);
  assert.match(source, /비정상 출력/);
  assert.match(source, /판단 훈련/);
  assert.match(source, /aws elbv2 describe-target-health/);
  assert.match(source, /aws ec2 describe-route-tables/);
  assert.match(source, /az network watcher test-connectivity/);
  assert.match(source, /kubectl describe pod/);
  assert.match(source, /kubectl get endpoints/);
  assert.match(source, /rate\(http_requests_total/);
  assert.match(source, /sum_over_time/);
  assert.match(source, /NXDOMAIN/);
  assert.match(source, /Target\.ResponseCodeMismatch/);
  assert.match(source, /OOMKilled/);
  assert.match(source, /Error acquiring the state lock/);
  assert.match(source, /5m burn/);
  assert.match(source, /RPO breach/);
  assert.doesNotMatch(source, /실제 상황에 맞게 적절히 확인한다/);
  assert.doesNotMatch(source, /필요한 명령어를 실행한다/);
  assert.doesNotMatch(source, /문제를 해결한다/);
  const practiceLabCount = (source.match(/PRACTICE LAB/g) ?? []).length;
  assert.ok(practiceLabCount >= 12, `expected at least 12 operations practice labs, found ${practiceLabCount}`);
  const normalOutputCount = (source.match(/정상 출력/g) ?? []).length;
  const abnormalOutputCount = (source.match(/비정상 출력/g) ?? []).length;
  assert.ok(normalOutputCount >= 8, `expected normal output examples, found ${normalOutputCount}`);
  assert.ok(abnormalOutputCount >= 8, `expected abnormal output examples, found ${abnormalOutputCount}`);
  assert.doesNotMatch(source, /PRACTICE LAB[\s\S]{0,800}(TBD|TODO|예시를 추가|상황에 따라)/);

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
    readFile("public/handbook/design-ax-interaction-motion-handbook.html", "utf8"),
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
  assert.match(source, /DESIGN CRITIQUE TEMPLATE/);
  assert.match(source, /ASSUMPTION MAP/);
  assert.match(source, /Taxonomy governance/);
  assert.match(source, /STATE TRANSITION SPEC/);
  assert.match(source, /Information density|정보 밀도/);
  assert.match(source, /OPTIMISTIC UI CHECK/);
  assert.match(source, /데이터 계약과 오류 모델/);
  assert.match(source, /Headless component/);
  assert.match(source, /System ROI/);
  assert.match(source, /DESIGN DEBT TRIAGE/);
  assert.match(source, /마이크로인터랙션/);
  assert.match(source, /human-in-the-loop/);
  assert.match(source, /prefers-reduced-motion/);
  assert.match(source, /Streaming answer/);
  assert.match(source, /AX INTERACTION REVIEW/);
});

test("design practice navigation follows the intended learning order", async () => {
  const [overview, systems] = await Promise.all([
    readFile("public/handbook/design-handbook.html", "utf8"),
    readFile("public/handbook/practice-design-systems-handbook.html", "utf8"),
  ]);

  assert.ok(overview.indexOf("제품 디자인 의사결정 프레임") < overview.indexOf("학습 순서"));
  assert.ok(systems.indexOf("폼과 입력 경험") < systems.indexOf("AX 인터랙션·마이크로인터랙션"));
  assert.ok(systems.indexOf("AX 인터랙션·마이크로인터랙션") < systems.indexOf("접근성과 인클루시브 디자인"));
  assert.match(systems, /왼쪽 목차는 문서 단위로 압축했습니다/);
  assert.doesNotMatch(systems.match(/<nav aria-label="목차">[\s\S]*?<\/nav>/)?.[0] ?? "", /designforms-ch1/);
});

test("engineering context handbooks teach product-organization engineering literacy", async () => {
  const docs = await Promise.all(
    ENGINEERING_CONTEXT_HANDBOOKS.map((item) => readFile(path.join("public", "handbook", item.file), "utf8")),
  );
  const source = docs.join("\n");

  assert.match(source, /고급 엔지니어링 사례가 자연스럽게 읽히도록 만드는 기반 개념서/);
  assert.match(source, /사용자 규모/);
  assert.match(source, /변경 규모/);
  assert.match(source, /조직 규모/);
  assert.match(source, /golden path/i);
  assert.match(source, /개발자 생산성/);
  assert.match(source, /release candidate/i);
  assert.match(source, /smoke test/i);
  assert.match(source, /flaky test/i);
  assert.match(source, /p95/);
  assert.match(source, /p99/);
  assert.match(source, /cost per success/i);
  assert.match(source, /API surface/i);
  assert.match(source, /compat layer/i);
  assert.match(source, /expand/);
  assert.match(source, /contract/);
  assert.match(source, /tree-shaking/i);
  assert.match(source, /hydration/i);
  assert.match(source, /on-call/i);
  assert.match(source, /postmortem/i);
  assert.match(source, /error budget/i);
});

test("snippet cards expose lucide-powered copy buttons", async () => {
  const [packageSource, pageSource, buttonSource, cssSource] = await Promise.all([
    readFile("package.json", "utf8"),
    readFile("src/handbook/HandbookPage.tsx", "utf8"),
    readFile("src/handbook/SerialCardCopyButton.tsx", "utf8"),
    readFile("src/handbook/handbook.css", "utf8"),
  ]);

  assert.match(packageSource, /"lucide-react"/);
  assert.match(pageSource, /createRoot/);
  assert.match(pageSource, /pre\.snippet-card/);
  assert.match(pageSource, /SerialCardCopyButton/);
  assert.match(buttonSource, /from "lucide-react"/);
  assert.match(buttonSource, /Copy/);
  assert.match(buttonSource, /Check/);
  assert.match(buttonSource, /navigator\.clipboard\.writeText/);
  assert.match(buttonSource, /aria-label=\{copied \? "복사됨" : "스니펫 복사"\}/);
  assert.match(cssSource, /\.snippet-card-copy/);
  assert.match(cssSource, /position: absolute/);
});

test("engineering handbook separates code snippets from semantic explanation cards", async () => {
  const engineeringFiles = HANDBOOK_GROUPS.find((group) => group.key === "engineering")?.items.map((item) => item.file) ?? [];
  const sources = await Promise.all(
    engineeringFiles.map(async (file) => ({
      file,
      source: await readFile(path.join("public", "handbook", file), "utf8"),
    })),
  );
  const allEngineeringHtml = sources.map(({ source }) => source).join("\n");

  for (const { file, source } of sources) {
    assert.doesNotMatch(source, /class="serial-card"/, `${file} should not use serial-card for engineering content`);
    assert.doesNotMatch(source, /<pre><code>/, `${file} should render code blocks as pre.snippet-card`);
  }

  assert.match(allEngineeringHtml, /class="snippet-card"/);
  assert.match(allEngineeringHtml, /class="semantic-card /);
  assert.match(allEngineeringHtml, /<pre class="snippet-card">/);
});

test("engineering code-like examples are rendered as pre snippet cards", async () => {
  const requiredSnippetLabels = [
    ["engineering-backend-core-handbook.html", "API ERROR CONTRACT"],
    ["engineering-backend-auth-security-handbook.html", "Set-Cookie"],
    ["engineering-backend-auth-security-handbook.html", "SECURITY INCIDENT PACKET"],
    ["engineering-data-handbook.html", "OFFSET / LIMIT — 쉽지만 한계 있음"],
    ["engineering-data-handbook.html", "Java — RedisTemplate로 락 시도"],
    ["engineering-data-handbook.html", "RateLimiter.java — INCR + EXPIRE"],
    ["engineering-java-spring-handbook.html", "filter · map · collect"],
    ["engineering-java-spring-handbook.html", "Member.java — 가장 기본형 엔티티"],
    ["engineering-java-spring-handbook.html", "N:1 — 주인 쪽"],
    ["engineering-platform-tools-handbook.html", "보안 헤더 + RATE LIMIT"],
    ["engineering-platform-tools-handbook.html", "/etc/nginx/conf.d/app.conf — REVERSE PROXY"],
  ];

  for (const [file, label] of requiredSnippetLabels) {
    const source = await readFile(path.join("public", "handbook", file), "utf8");
    const snippetBlocks = source.match(/<pre class="snippet-card">[\s\S]*?<\/pre>/g) ?? [];
    const semanticBlocks = source.match(/<div class="semantic-card [^"]+">[\s\S]*?<\/div>/g) ?? [];

    assert.ok(
      snippetBlocks.some((block) => block.includes(label)),
      `${file} should render ${label} as a pre snippet card`,
    );
    assert.ok(
      !semanticBlocks.some((block) => block.includes(`<span class="sc-label">`) && block.includes(label)),
      `${file} should not render ${label} as a semantic explanation card`,
    );
  }
});

test("checklist serial cards are upgraded into persistent checkbox controls", async () => {
  const [pageSource, checklistSource, cssSource, architectureSource] = await Promise.all([
    readFile("src/handbook/HandbookPage.tsx", "utf8"),
    readFile("src/handbook/ChecklistCard.tsx", "utf8"),
    readFile("src/handbook/handbook.css", "utf8"),
    readFile("public/handbook/engineering-backend-architecture-handbook.html", "utf8"),
  ]);

  assert.match(pageSource, /ChecklistCard/);
  assert.match(pageSource, /shouldUpgradeChecklistCard/);
  assert.match(pageSource, /serial-card-checklist-mount/);
  assert.match(checklistSource, /type ChecklistCardProps/);
  assert.match(checklistSource, /localStorage/);
  assert.match(checklistSource, /role="group"/);
  assert.match(checklistSource, /type="checkbox"/);
  assert.match(checklistSource, /aria-label=\{item\.text\}/);
  assert.match(checklistSource, /checked=\{checkedItems\.has\(item\.id\)\}/);
  assert.match(checklistSource, /□/);
  assert.match(cssSource, /\.serial-card-checklist/);
  assert.match(cssSource, /\.serial-card-checklist-item/);
  assert.match(architectureSource, /SERVICE BOUNDARY CHECKLIST/);
  assert.match(architectureSource, /□ 이 경계가 소유하는 데이터/);
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
