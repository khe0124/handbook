import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { offers, bundles, addOns, extraRates, scopeWarnings, issueSource } from "../src/workspace/brand/offers.mjs";
import { deliverables, deliveryGates } from "../src/workspace/brand/deliverables.mjs";
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
    assert.ok(offer.fit && offer.exclude && offer.scope.length >= 2);
  }
});

test("package-specific limitations and source contradictions remain explicit", () => {
  assert.match(offers.branding[0].exclude, /AI 원본/);
  assert.match(offers.branding[1].scope.join(" "), /AI \/ SVG/);
  assert.match(offers.branding[2].scope.join(" "), /응용물 1종/);
  assert.match(offers.web[0].scope.join(" "), /수정 1회/);
  assert.match(offers.web[1].scope.join(" "), /최대 6섹션.*최대 2개/);
  assert.match(offers.web[1].scope.join(" "), /1,000자/);
  for (const offer of offers.web.slice(0, 2)) assert.match(offer.exclude, /CMS/);
  assert.match(offers.web[2].scope.join(" "), /CMS 또는 콘텐츠 운영 구조/);
  assert.match(scopeWarnings[0], /2주.*1개월/);
  assert.match(scopeWarnings[1], /1종.*2종/);
  assert.match(extraRates.at(-1)[2], /중복 적용하지 않음/);
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
      for (const row of rows) assert.equal(row.length, 3);
    }
  }
  assert.equal(launchDeliverables.length, 5);
  assert.deepEqual(reviewCadence.map(([name]) => name), ["매주", "매월", "중단 판단"]);
  assert.equal(offerReview.length, 8);
  assert.equal(killCriteria.length, 5);
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
