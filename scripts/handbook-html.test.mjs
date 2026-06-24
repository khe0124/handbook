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
    ["backend", "frontend", "network", "devops", "examples", "practical"],
  );

  const labels = [
    ...HANDBOOK_GROUPS.map((group) => group.label),
    ...HANDBOOK_ITEMS.map((item) => item.label),
  ].join("\n");

  assert.equal(HANDBOOK_ITEMS.length, 54);
  assert.ok(labels.includes("백엔드"));
  assert.ok(labels.includes("프론트엔드"));
  assert.ok(labels.includes("네트워크 인프라"));
  assert.ok(labels.includes("DevOps"));
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
  assert.ok(labels.includes("VPC·서브넷·CIDR"));
  assert.ok(labels.includes("Public·Private·라우팅"));
  assert.ok(labels.includes("IPsec VPN 원리"));
  assert.ok(labels.includes("NCP·KT Cloud VPN Gateway"));
  assert.ok(labels.includes("ACG·방화벽·NACL"));
  assert.ok(labels.includes("네트워크 디버깅 도구"));
  assert.ok(labels.includes("VPN 트러블슈팅"));
  assert.ok(labels.includes("VPN 구축 체크리스트"));
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

test("app exposes an accessible floating scroll-to-top control", async () => {
  const [appSource, cssSource] = await Promise.all([
    readFile("src/App.tsx", "utf8"),
    readFile("src/App.css", "utf8"),
  ]);

  assert.match(appSource, /aria-label="맨 위로 이동"/);
  assert.match(appSource, /window\.scrollY > 320/);
  assert.match(appSource, /window\.scrollTo\(\{\s*top: 0,\s*behavior: scrollBehavior/s);
  assert.match(cssSource, /\.scroll-top-button/);
  assert.match(cssSource, /position: fixed/);
  assert.match(cssSource, /bottom: 24px/);
  assert.match(cssSource, /right: 24px/);
});

test("app uses the Dev Handbook title with fixed top navigation", async () => {
  const [appSource, cssSource] = await Promise.all([
    readFile("src/App.tsx", "utf8"),
    readFile("src/App.css", "utf8"),
  ]);

  assert.match(appSource, /<h1>Dev Handbook<\/h1>/);
  assert.doesNotMatch(appSource, /<h1>현황판<\/h1>/);
  assert.match(cssSource, /\.app-header\s*\{[^}]*position: fixed/s);
  assert.match(cssSource, /\.app-header\s*\{[^}]*top: 0/s);
  assert.match(cssSource, /\.app-header\s*\{[^}]*z-index: 70/s);
  assert.match(cssSource, /\.app-shell\s*\{[^}]*padding-top:/s);
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
