import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { resolveWorkspace } from "../src/workspace/routes.mjs";
import { careerEvidence, conversationEvidence, coreSections, coreSources, identityDraft, identityLayers, philosophy, tensions, validationQuestions } from "../src/workspace/core/content.mjs";

const read = path => readFileSync(new URL(path, import.meta.url), "utf8");

test("Core has direct and Brand URLs without changing the two workspaces", () => {
  for (const path of ["/core", "/core/", "/brand/core", "/brand/core/"]) assert.equal(resolveWorkspace(path), "core");
  for (const path of ["/core/unknown", "/brand/core/unknown", "/core-other"]) assert.equal(resolveWorkspace(path), "not-found");
  assert.equal(resolveWorkspace("/"), "home");
  assert.equal(resolveWorkspace("/dev"), "dev");
  assert.equal(resolveWorkspace("/brand"), "branding");
});

test("Core puts identity, evidence and philosophy before limited validation actions", () => {
  assert.deepEqual(coreSections.map(([id]) => id), ["core-direction", "core-history", "core-standards", "core-authorship", "core-records", "core-capabilities", "core-philosophy", "core-boundaries", "core-review"]);
  assert.equal(new Set(coreSections.map(([id]) => id)).size, coreSections.length);
  assert.match(identityDraft, /복잡한 것을 이해하고 사용할 수 있는 형태/);
  assert.match(identityDraft, /나만의 시각적 판단과 표현/);
  assert.match(identityDraft, /그것을 만든 기준도 남긴다/);
  assert.equal(careerEvidence.length, 4);
  for (const item of careerEvidence) {
    assert.ok(item.record && item.reading);
    assert.ok(coreSources[item.source]);
  }
  assert.match(careerEvidence[2].record, /팀 소유/);
  assert.match(careerEvidence[3].record, /별도 서울형/);
  assert.equal(conversationEvidence.length, 6);
  assert.equal(identityLayers.length, 3);
  assert.equal(tensions.length, 4);
  for (const row of [...conversationEvidence, ...identityLayers, ...tensions]) {
    assert.equal(row.length, 3);
    assert.ok(row.every(cell => typeof cell === "string" && cell.length > 0));
  }
  assert.equal(validationQuestions.length, 4);
  for (const item of validationQuestions) assert.ok(item.question && item.method);
});

test("each philosophy has a basis, practical meaning and a decision question", () => {
  assert.deepEqual(philosophy.map(item => item.title), ["이해를 끝까지 책임진다", "표현과 작동을 분리하지 않는다", "취향을 판단으로 발전시킨다", "자율성은 내 기준을 선택하는 능력이다", "작업이 끝나도 기준은 남긴다"]);
  for (const item of philosophy) for (const key of ["title", "meaning", "basis", "question"]) assert.ok(item[key].length > 0);
  assert.match(philosophy[3].basis, /해석.*단정한 것은 아니다/);
  assert.equal(coreSources.resume.href, "https://kang-haeun.me/resume/");
  assert.equal(coreSources.archive.href, "https://oold-works.kang-haeun.me/");
});

test("Core distinguishes observations and hypotheses and avoids fixed training prescriptions", () => {
  const page = read("../src/workspace/core/CorePage.tsx");
  for (const text of ["대화 기반 초안", "당시 직무를 바꾼 실제 동기를 단정하지 않는다", "미검증:", "실행을 회피한다고 판단할 수는 없다", "독립된 사실 증거로 다시 사용하지 않는다", "판단 기준과 구현 이력만으로 시각 디자인 수준을 단정하지 않는다"]) assert.ok(page.includes(text), text);
  assert.doesNotMatch(page, /timeAllocation|60%|30%|10%|core-allocation/);
  assert.ok(page.indexOf("<CoreSection index={6}>") < page.indexOf('id="core-project"'));
});

test("Core remains discoverable, expanded, keyboard accessible and keeps previous anchors", () => {
  const app = read("../src/workspace/WorkspaceApp.tsx");
  const frame = read("../src/workspace/brand/BrandFrame.tsx");
  const page = read("../src/workspace/core/CorePage.tsx");
  assert.match(app, /href="\/core" data-workspace-link/);
  assert.match(frame, /aria-current=\{area === "core"/);
  assert.match(app, /route === "core"\) return <CorePage/);
  assert.match(page, /data-route-heading/);
  for (const token of ['scope="row"', 'scope="col"', 'role="region" aria-label={caption} tabIndex={0}', "onKeyDown", "ArrowRight", "ArrowLeft"]) assert.ok(page.includes(token));
  assert.doesNotMatch(page, /<details|<summary/);
  for (const name of ["5dok", "가가린스튜디오", "ANZI", "워크스"]) assert.ok(page.includes(name));
  for (const path of ["/brand/questionnaire", "/brand/design-brief", "/brand/specs", "/dev"]) {
    assert.ok(page.includes(`href="${path}"`));
    assert.notEqual(resolveWorkspace(path), "not-found");
  }
  for (const id of ["core-practice", "core-project", "core-references"]) assert.ok(page.includes(`id="${id}"`));
  const sections = [...page.matchAll(/<CoreSection index=\{(\d+)\}/g)].map(match => Number(match[1]));
  assert.deepEqual(sections, coreSections.map((_, index) => index));
});
