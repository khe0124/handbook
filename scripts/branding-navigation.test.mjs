import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { brandingPages, isBrandingPage, legacyBrandingDestination } from "../src/workspace/brand/navigation.mjs";
import { resolveWorkspace } from "../src/workspace/routes.mjs";
import { draftKey } from "../src/workspace/brand/draft.mjs";

const read = file => readFileSync(new URL(`../src/workspace/brand/${file}`, import.meta.url), "utf8");

test("Branding has exactly five ordered child pages with direct, refresh-safe routes", () => {
  assert.deepEqual(brandingPages.map(page => page.title), ["사전설문", "Design Brief", "상품과 가격", "산출물 목록", "가이드와 인계"]);
  assert.equal(new Set(brandingPages.map(page => page.href)).size, 5);
  for (const page of brandingPages) {
    for (const suffix of ["", "/"]) assert.equal(resolveWorkspace(page.href + suffix), page.id);
    assert.equal(resolveWorkspace(`${page.href}/unknown`), "not-found");
    assert.ok(isBrandingPage(page.id));
  }
  assert.ok(isBrandingPage("branding"));
  for (const area of ["core", "web", "specs"]) assert.equal(isBrandingPage(area), false);
});

test("legacy Branding anchors resolve to their single purpose page without redirecting Web", () => {
  for (const path of ["/brand", "/brand/", "/brand/branding"]) {
    for (const id of ["offers", "launch-packages", "commercial"]) assert.equal(legacyBrandingDestination(path, `#${id}`), `/brand/products#${id}`);
    for (const id of ["stage-discovery", "stage-direction", "stage-identity", "stage-applications", "stage-handoff", "delivery", "review", "project-brief"]) assert.equal(legacyBrandingDestination(path, `#${id}`), `/brand/guide#${id}`);
  }
  assert.equal(legacyBrandingDestination("/brand/web", "#offers"), null);
  assert.equal(legacyBrandingDestination("/brand", "#unknown"), null);
});

test("Branding dropdown supports pointer, button, keyboard and dismissal without menu-role misuse", () => {
  const source = read("BrandingMenu.tsx");
  for (const token of ["onPointerEnter", "onPointerLeave", "onClick", "onBlur", 'event.key === "Escape"', 'event.key === "ArrowDown"', '"pointerdown"', "aria-expanded={open}", 'aria-controls="branding-submenu"', "hidden={!open}", 'aria-current={area === page.id ? "page"']) assert.ok(source.includes(token), token);
  assert.doesNotMatch(source, /role="menu"|role="menuitem"/);
  const frame = read("BrandFrame.tsx");
  assert.match(frame, /<BrandingMenu key=\{area\}/);
  assert.doesNotMatch(frame, /href="\/brand\/(questionnaire|design-brief)"/);
});

test("purpose pages preserve catalog data and legacy drafts without duplicating full content", () => {
  const source = read("BrandingDocuments.tsx");
  const products = read("products/ProductsPage.tsx");
  const deliverables = source.split("export function BrandingDeliverables")[1].split("export function BrandingGuide")[0];
  const guide = source.split("export function BrandingGuide")[1];
  assert.match(products, /productGroups.map/);
  assert.match(products, /productHeadings.map/);
  assert.match(products, /<CommercialGuide/);
  assert.doesNotMatch(products, /<WorkflowStages|<BriefEditor|<ReviewGuide/);
  assert.match(deliverables, /rows=\{deliverables.branding\[stage.id\]\}/);
  assert.match(deliverables, /<LaunchDeliveryList/);
  assert.doesNotMatch(deliverables, /<details|<summary|<OfferCatalog|<WorkflowStages/);
  assert.match(guide, /useBrandDraft\("branding"/);
  assert.equal(draftKey("branding"), "brand-workspace:v1:branding");
  assert.match(guide, /<WorkflowStages[^>]*showDeliverables=\{false\}/);
  for (const component of ["DeliveryChecklist", "ReviewGuide", "BriefEditor"]) assert.ok(guide.includes(`<${component}`));
  assert.doesNotMatch(guide, /<OfferCatalog|<CommercialGuide|<LaunchPackages/);
  assert.doesNotMatch(read("BrandingIndex.tsx"), /<OfferCatalog|<WorkflowStages|<CommercialGuide/);
});
