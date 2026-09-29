import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { offers, bundles, addOns, extraRates, scopeWarnings, issueSource } from "../src/workspace/brand/offers.mjs";
import { deliverables, deliverableHeadings, deliveryGates } from "../src/workspace/brand/deliverables.mjs";
import { reviewCadence, offerReview, killCriteria, launchDeliverables } from "../src/workspace/brand/operations.mjs";

test("TODO-185 products retain prices and are classified by discipline", () => {
  assert.equal(issueSource.url, "https://khe0124.atlassian.net/browse/TODO-185");
  assert.deepEqual(offers.branding.map(({ name, price }) => [name, price]), [
    ["Logo Starter", "50"], ["Custom Logo System", "80"], ["Brand Essentials", "180"], ["Brand System", "400–500"],
  ]);
  assert.deepEqual(offers.web.map(({ name, price }) => [name, price]), [
    ["Website Starter", "150–200"], ["Brand Website", "400"], ["Brand Experience", "700–900"],
  ]);
  assert.deepEqual(bundles.map((row) => row[1]), ["Starter · 300", "Core · 550", "Signature · 950–1,200"]);
  for (const offer of [...offers.branding, ...offers.web]) {
    assert.ok(offer.fit && offer.exclude.length > 0 && offer.scope.length >= 2 && offer.terms.length > 0);
    for (const key of ["scope", "exclude", "terms"]) assert.ok(offer[key].every(item => typeof item === "string" && item.length > 0));
  }
});

test("package-specific limitations and source contradictions remain explicit", () => {
  assert.match(offers.branding[0].exclude.join(" "), /AI 편집 원본/);
  assert.match(offers.branding[1].scope.join(" "), /\.ai \/ \.svg/);
  assert.match(offers.branding[2].scope.join(" "), /응용물 1종/);
  assert.match(offers.web[0].terms.join(" "), /수정 1회/);
  assert.match(offers.web[1].terms.join(" "), /최대 6섹션.*최대 2개/);
  assert.match(offers.web[1].scope.join(" "), /1,000자/);
  for (const offer of offers.web.slice(0, 2)) assert.match(offer.exclude.join(" "), /CMS/);
  assert.match(offers.web[2].scope.join(" "), /CMS 또는 콘텐츠 운영 구조/);
  assert.match(scopeWarnings[0], /2주.*1개월/);
  assert.match(scopeWarnings[1], /1종.*2종/);
  assert.match(extraRates.at(-1)[2], /중복 적용하지 않음/);
});

test("offer inclusion and exclusion lists are always visible in separate table columns", () => {
  const source = readFileSync(new URL("../src/workspace/brand/OfferCatalog.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(source, /<details|<summary|포함·제외 범위 보기/);
  assert.match(source, /scope="col">포함 산출물/);
  assert.match(source, /scope="col">제외·별도 협의 항목/);
  assert.ok(source.includes("offer.scope.map"));
  assert.ok(source.includes("offer.exclude.map"));
  assert.ok(source.includes("offer.terms.map"));
});

test("all 15 add-ons and seven change-request rates are available without duplicate entries", () => {
  const rows = Object.values(addOns).flat();
  assert.equal(rows.length, 15);
  assert.equal(new Set(rows.map(([name]) => name)).size, 15);
  assert.equal(extraRates.length, 7);
  for (const row of [...rows, ...bundles, ...extraRates]) {
    assert.equal(row.length, 3);
    assert.ok(row.every((cell) => typeof cell === "string" && cell.length > 0));
  }
});

test("delivery tables cover existing stage IDs and review retains operating cadence", () => {
  assert.deepEqual(Object.keys(deliverables.branding), ["discovery", "direction", "identity", "applications", "handoff"]);
  assert.deepEqual(Object.keys(deliverables.web), ["discovery", "structure", "interface", "build", "handoff"]);
  for (const [area, stages] of Object.entries(deliverables)) {
    assert.ok(deliveryGates[area]);
    for (const rows of Object.values(stages)) {
      assert.ok(rows.length > 0);
      for (const row of rows) assert.equal(row.length, deliverableHeadings[area].length);
    }
  }
  assert.equal(launchDeliverables.length, 5);
  assert.deepEqual(reviewCadence.map(([name]) => name), ["매주", "매월", "중단 판단"]);
  assert.equal(offerReview.length, 8);
  assert.equal(killCriteria.length, 5);
});

test("every Branding deliverable specifies a document structure, extension and delivery condition", () => {
  assert.deepEqual(deliverableHeadings.branding, ["산출물", "권장 양식·구성", "파일 확장자", "전달·사용 조건"]);
  assert.deepEqual(deliverableHeadings.web, ["산출물", "상세 내용", "형식 / 조건"]);
  for (const [name, template, extensions, condition] of Object.values(deliverables.branding).flat()) {
    assert.ok(template.includes(":"), `${name} needs a concrete document structure`);
    assert.match(extensions, /\.(pdf|svg|png|ai|fig|css|zip|md|txt)\b/, name);
    assert.ok(condition.length > 0, name);
    assert.doesNotMatch(extensions, /Notion|Drive|링크/);
  }
  assert.match(deliverables.branding.identity[0][3], /Logo Starter 제외/);
  assert.match(deliverables.branding.direction[5][2], /별도 합의 시/);
  assert.match(deliverables.branding.handoff[1][3], /Drive 폴더 링크/);
});

test("new sections are rendered and reachable from the Brand outline", () => {
  const workspace = readFileSync(new URL("../src/workspace/brand/BrandWorkspace.tsx", import.meta.url), "utf8");
  const sections = [
    ["offers", "OfferCatalog", "OfferCatalog.tsx"],
    ["launch-packages", "LaunchPackages", "OfferCatalog.tsx"],
    ["commercial", "CommercialGuide", "OperationsGuide.tsx"],
    ["review", "ReviewGuide", "OperationsGuide.tsx"],
  ];
  for (const [id, component, filename] of sections) {
    assert.ok(workspace.includes(`href="#${id}"`));
    assert.ok(workspace.includes(`<${component}`));
    const source = readFileSync(new URL(`../src/workspace/brand/${filename}`, import.meta.url), "utf8");
    assert.ok(source.includes(`id="${id}"`));
  }
});
