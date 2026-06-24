import assert from "node:assert/strict";
import { access, mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { HANDBOOK_GROUPS, HANDBOOK_ITEMS } from "../src/handbook/catalog.mjs";
import { extractHandbookDocument, generateHandbookDocuments } from "./handbook-html.mjs";

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
    ["home", "backend", "frontend", "network", "devops", "ax", "design", "examples", "practical"],
  );

  const labels = [
    ...HANDBOOK_GROUPS.map((group) => group.label),
    ...HANDBOOK_ITEMS.map((item) => item.label),
  ].join("\n");

  assert.equal(HANDBOOK_ITEMS.length, 82);
  assert.ok(labels.includes("홈"));
  assert.ok(labels.includes("백엔드"));
  assert.ok(labels.includes("프론트엔드"));
  assert.ok(labels.includes("네트워크 인프라"));
  assert.ok(labels.includes("DevOps"));
  assert.ok(labels.includes("AX"));
  assert.ok(labels.includes("디자인"));
  assert.ok(labels.includes("프론트엔드 개요"));
  assert.ok(labels.includes("브라우저 동작 원리"));
  assert.ok(labels.includes("웹접근성"));
  assert.ok(labels.includes("번들링·렌더링·메모이제이션"));
  assert.ok(labels.includes("성능과 지표"));
  assert.ok(labels.includes("DevTools 사용법"));
  assert.ok(labels.includes("보안 대응"));
  assert.ok(labels.includes("테스트 전략"));
  assert.ok(labels.includes("배포"));
  assert.ok(labels.includes("네트워크 인프라 개요"));
  assert.ok(labels.includes("IP 주소·CIDR·서브넷"));
  assert.ok(labels.includes("VPC와 Public·Private 구조"));
  assert.ok(labels.includes("라우팅·NAT·Internet Gateway"));
  assert.ok(labels.includes("방화벽·Security Group·NACL"));
  assert.ok(labels.includes("DNS와 이름 해석"));
  assert.ok(labels.includes("IPsec VPN 원리"));
  assert.ok(labels.includes("클라우드 VPN Gateway"));
  assert.ok(labels.includes("네트워크 디버깅"));
  assert.ok(labels.includes("VPN 트러블슈팅"));
  assert.ok(labels.includes("구축·운영 체크리스트"));
  assert.ok(labels.includes("DevOps 개요"));
  assert.ok(labels.includes("소프트웨어 전달 구조"));
  assert.ok(labels.includes("형상 관리와 변경 추적"));
  assert.ok(labels.includes("CI 파이프라인"));
  assert.ok(labels.includes("CD와 배포 전략"));
  assert.ok(labels.includes("설정과 비밀 정보 관리"));
  assert.ok(labels.includes("IaC와 인프라 변경 관리"));
  assert.ok(labels.includes("컨테이너와 런타임"));
  assert.ok(labels.includes("오케스트레이션 기초"));
  assert.ok(labels.includes("관측 가능성과 장애 대응"));
  assert.ok(labels.includes("보안과 신뢰성"));
  assert.ok(labels.includes("AX 개요"));
  assert.ok(labels.includes("AX 엔지니어 역량 모델"));
  assert.ok(labels.includes("AX 업무 자동화 설계"));
  assert.ok(labels.includes("AI Harness Engineering"));
  assert.ok(labels.includes("Context Engineering"));
  assert.ok(labels.includes("Loop Engineering"));
  assert.ok(labels.includes("Multi-Agent Workflow"));
  assert.ok(labels.includes("검증과 평가"));
  assert.ok(labels.includes("AI Governance & Security"));
  assert.ok(labels.includes("AX 조직 적용 패턴"));
  assert.ok(labels.includes("AX 실전 적용 사례"));
  assert.ok(labels.includes("AX 실무 플레이북"));
  assert.ok(labels.includes("디자인 개요"));
  assert.ok(labels.includes("UX 사고와 문제 정의"));
  assert.ok(labels.includes("정보구조와 내비게이션"));
  assert.ok(labels.includes("사용자 흐름과 태스크 설계"));
  assert.ok(labels.includes("UI 레이아웃과 시각 위계"));
  assert.ok(labels.includes("인터랙션 디자인 패턴"));
  assert.ok(labels.includes("폼과 입력 경험"));
  assert.ok(labels.includes("컴포넌트 패턴"));
  assert.ok(labels.includes("디자인 시스템과 토큰"));
  assert.ok(labels.includes("접근성과 인클루시브 디자인"));
  assert.ok(labels.includes("프로토타입과 사용성 테스트"));
  assert.ok(labels.includes("디자인 핸드오프와 QA"));
  assert.ok(labels.includes("풀스택 성장 로드맵"));
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

test("selected handbook content is positioned as a neutral full-stack growth guide", async () => {
  const sources = await Promise.all(
    HANDBOOK_ITEMS.map((item) => readFile(path.join("public", "handbook", item.file), "utf8")),
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
  assert.match(homeSource, /프론트엔드/);
  assert.match(homeSource, /백엔드/);
  assert.match(homeSource, /네트워크 인프라/);
  assert.match(homeSource, /DevOps/);
  assert.match(homeSource, /AX/);
  assert.match(homeSource, /디자인/);
  assert.match(homeSource, /예시 사례/);
  assert.match(homeSource, /실무 가이드/);
  assert.match(homeSource, /Plan → Act → Verify → Reflect/);
  assert.doesNotMatch(homeSource, /시니어급 성장/);
});

test("catalog items have source files, generated modules, and loader entries", async () => {
  const loaderSource = await readFile("src/handbook/documentLoaders.ts", "utf8");

  for (const item of HANDBOOK_ITEMS) {
    await access(path.join("public", "handbook", item.file));
    await access(path.join("src", "handbook", "documents", `${item.id}.ts`));
    assert.match(
      loaderSource,
      new RegExp(`${JSON.stringify(item.id)}:\\s*\\(\\)\\s*=>\\s*import\\("\\./documents/${item.id}"\\)`),
    );
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
      new RegExp(`(?:^|\\n)\\s*(?:"${item.id}"|${item.id}):\\s*"(?:home|backend|frontend|network|devops|ax|design|examples|practical)"`),
      `${item.id} should have a practical example lens`,
    );
  }
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

test("handbook layout includes mobile responsive reading refinements", async () => {
  const cssSource = await readFile("src/handbook/handbook.css", "utf8");

  assert.match(cssSource, /@media \(max-width: 900px\)[\s\S]*\.handbook-toc\s*\{[\s\S]*position: sticky/s);
  assert.match(cssSource, /@media \(max-width: 900px\)[\s\S]*\.handbook-toc\s*\{[\s\S]*overflow-x: auto/s);
  assert.match(cssSource, /@media \(max-width: 900px\)[\s\S]*\.handbook-toc \.nav-title\s*\{[\s\S]*display: none/s);
  assert.match(cssSource, /@media \(max-width: 900px\)[\s\S]*\.handbook-toc a\s*\{[\s\S]*display: inline-flex/s);
  assert.match(cssSource, /@media \(max-width: 900px\)[\s\S]*\.handbook-toc\s*\{[\s\S]*scroll-snap-type: x proximity/s);
  assert.match(cssSource, /@media \(max-width: 900px\)[\s\S]*\.handbook-toc a\s*\{[\s\S]*max-width: 78vw/s);
  assert.match(cssSource, /@media \(max-width: 900px\)[\s\S]*\.handbook-main\s*\{[\s\S]*padding: 0 16px 128px/s);
  assert.match(cssSource, /@media \(max-width: 900px\)[\s\S]*\.handbook-main \.hero\s*\{[\s\S]*padding: 38px 0 30px/s);
  assert.match(cssSource, /@media \(max-width: 900px\)[\s\S]*\.handbook-main table\s*\{[\s\S]*display: block/s);
  assert.match(cssSource, /@media \(max-width: 900px\)[\s\S]*\.handbook-main table\s*\{[\s\S]*overflow-x: auto/s);
  assert.match(cssSource, /@media \(max-width: 900px\)[\s\S]*\.handbook-main \.flow\s*\{[\s\S]*flex-direction: column/s);
  assert.match(cssSource, /@media \(max-width: 900px\)[\s\S]*\.handbook-main \.serial-card\s*\{[\s\S]*padding: 46px 16px 16px/s);
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
  const axLabels = HANDBOOK_GROUPS.find((group) => group.key === "ax").items.map((item) => item.label);

  assert.deepEqual(axLabels, [
    "AX 개요",
    "AX 엔지니어 역량 모델",
    "AX 업무 자동화 설계",
    "AI Harness Engineering",
    "Context Engineering",
    "Loop Engineering",
    "Multi-Agent Workflow",
    "검증과 평가",
    "AI Governance & Security",
    "AX 조직 적용 패턴",
    "AX 실전 적용 사례",
    "AX 실무 플레이북",
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
});

test("network handbook follows an essential infrastructure roadmap", async () => {
  const docs = await Promise.all([
    readFile("public/handbook/network-infrastructure-handbook.html", "utf8"),
    readFile("public/handbook/network-vpc-subnet-cidr-handbook.html", "utf8"),
    readFile("public/handbook/network-public-private-routing-handbook.html", "utf8"),
    readFile("public/handbook/network-routing-nat-gateway-handbook.html", "utf8"),
    readFile("public/handbook/network-firewall-acg-nacl-handbook.html", "utf8"),
    readFile("public/handbook/network-dns-name-resolution-handbook.html", "utf8"),
    readFile("public/handbook/network-ipsec-vpn-handbook.html", "utf8"),
    readFile("public/handbook/network-cloud-vpn-gateway-handbook.html", "utf8"),
    readFile("public/handbook/network-debugging-tools-handbook.html", "utf8"),
    readFile("public/handbook/network-vpn-troubleshooting-handbook.html", "utf8"),
    readFile("public/handbook/network-vpn-checklist-handbook.html", "utf8"),
  ]);
  const source = docs.join("\n");
  const networkLabels = HANDBOOK_GROUPS.find((group) => group.key === "network").items.map((item) => item.label);

  assert.deepEqual(networkLabels, [
    "네트워크 인프라 개요",
    "IP 주소·CIDR·서브넷",
    "VPC와 Public·Private 구조",
    "라우팅·NAT·Internet Gateway",
    "방화벽·Security Group·NACL",
    "DNS와 이름 해석",
    "IPsec VPN 원리",
    "클라우드 VPN Gateway",
    "네트워크 디버깅",
    "VPN 트러블슈팅",
    "구축·운영 체크리스트",
  ]);
  assert.match(source, /필수지식 로드맵/);
  assert.match(source, /RFC 1918/);
  assert.match(source, /reserved IP/);
  assert.match(source, /route table/);
  assert.match(source, /return path/);
  assert.match(source, /Longest Prefix Match/);
  assert.match(source, /stateful/);
  assert.match(source, /stateless/);
  assert.match(source, /split-horizon DNS/);
  assert.match(source, /TTL/);
  assert.match(source, /Phase 1/);
  assert.match(source, /Phase 2/);
  assert.match(source, /L3/);
  assert.match(source, /L4/);
  assert.match(source, /L7/);
  assert.match(source, /Case study/);
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
