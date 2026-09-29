import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { productGroups, productHeadings } from "../src/workspace/brand/products/catalog.mjs";
import { offers, bundles, addOns } from "../src/workspace/brand/offers.mjs";
import { productDelivery, deliveryGroup } from "../src/workspace/brand/products/deliveryCatalog.mjs";

test("product comparison has the seven requested columns and all 25 products", () => {
  assert.deepEqual(productHeadings, ["분류", "상품명", "상품설명", "가격", "산출물 목록", "제외 및 협의목록", "비고"]);
  assert.deepEqual(productGroups.map(group => group.rows.length), [4, 3, 3, 9, 4, 2]);
  const rows = productGroups.flatMap(group => group.rows);
  assert.equal(new Set(rows.map(row => row.id)).size, 25);
  for (const row of rows) {
    for (const field of ["category", "name", "description", "price"]) assert.ok(row[field]);
    for (const field of ["scope", "exclude", "notes"]) assert.ok(row[field].length > 0 && row[field].every(Boolean));
  }
});

test("primary products reuse exact existing prices, deliverables and exclusions", () => {
  ["branding", "web"].forEach((area, groupIndex) => {
    offers[area].forEach((offer, index) => {
      const row = productGroups[groupIndex].rows[index];
      assert.equal(row.name, offer.name);
      assert.equal(row.price, `${offer.price}만 원`);
      assert.deepEqual(row.scope, offer.scope);
      assert.deepEqual(row.exclude, offer.exclude);
      assert.deepEqual(row.notes, [offer.tier, ...offer.terms]);
    });
  });
});

test("bundles retain component deliverables and unresolved support conditions", () => {
  const componentPairs = [[offers.branding[2], offers.web[0]], [offers.branding[2], offers.web[1]], [offers.branding[3], offers.web[2]]];
  productGroups[2].rows.forEach((row, index) => {
    assert.equal(row.name, bundles[index][0]);
    assert.equal(row.price, `${bundles[index][1].split(" · ")[1]}만 원`);
    for (const component of componentPairs[index]) {
      for (const item of component.scope) assert.ok(row.scope.includes(`${component.name} · ${item}`));
      for (const item of component.exclude) assert.ok(row.exclude.includes(item));
    }
  });
  assert.match(productGroups[2].rows[1].notes.join(" "), /2주 \/ 1개월.*계약 전 확정/);
});

test("add-ons preserve monthly and starting price qualifiers without inventing included files", () => {
  ["branding", "web", "shared"].forEach((area, index) => {
    productGroups[index + 3].rows.forEach((row, itemIndex) => {
      assert.equal(row.name, addOns[area][itemIndex][0]);
      assert.deepEqual(row.scope, addOns[area][itemIndex][2].split(" · "));
      assert.match(row.exclude.join(" "), /원문 미명시.*합의/);
    });
  });
  assert.equal(productGroups[3].rows.at(-1).price, "월 60만 원");
  assert.equal(productGroups[4].rows[0].price, "50만 원부터");
  assert.equal(productGroups[4].rows[2].price, "월 25만 원");
});

test("dedicated products route renders accessible expanded table and preserves legacy anchors", () => {
  const page = readFileSync(new URL("../src/workspace/brand/products/ProductsPage.tsx", import.meta.url), "utf8");
  const app = readFileSync(new URL("../src/workspace/WorkspaceApp.tsx", import.meta.url), "utf8");
  assert.match(app, /route === "products"\) return <ProductsPage/);
  for (const token of ['scope="col"', 'scope="row"', '<caption>', 'role="region"', 'tabIndex={0}', 'aria-describedby=', 'event.target !== event.currentTarget', '"ArrowLeft"', '"ArrowRight"', 'id="offers"', '<CommercialGuide']) assert.ok(page.includes(token), token);
  assert.equal(productGroups[2].id, "launch-packages");
  assert.doesNotMatch(page, /<details|<summary|<OfferCatalog|<LaunchPackages/);
});

test("catalog width rules override shared mobile table styles without changing other pages", () => {
  const css = readFileSync(new URL("../src/workspace/brand/products/products.css", import.meta.url), "utf8");
  assert.match(css, /\.products-page \.products-table table \{ min-width: 1280px; table-layout: fixed/);
  assert.match(css, /\.products-page \.products-table th:first-child \{ width: auto/);
  assert.match(css, /\.products-table thead th \{ position: sticky; top: 0/);
});

test("all products provide itemized delivery contents, formats and scope qualifications", () => {
  assert.equal(Object.keys(productDelivery).length, 22);
  for (const row of productGroups.flatMap(group => group.rows)) {
    assert.ok(row.deliveryGroups.length > 0, row.name);
    for (const group of row.deliveryGroups) {
      assert.ok(group.title && group.items.length);
      assert.equal(new Set(group.items.map(item => item.title)).size, group.items.length);
      for (const item of group.items) {
        for (const field of ["title", "detail", "format", "status"]) assert.ok(typeof item[field] === "string" && item[field].trim(), `${row.name}: ${field}`);
      }
    }
  }
  assert.throws(() => deliveryGroup("unknown"), /정의 누락/);
});

test("detailed delivery keeps Starter restrictions, source conditions and product quantities", () => {
  const text = name => JSON.stringify(productDelivery[name]);
  assert.doesNotMatch(text("Logo Starter"), /\.ai|\.fig/);
  assert.match(text("Logo Starter"), /\.svg \+ \.pdf/);
  assert.match(text("Logo Starter"), /\.png/);
  assert.match(text("Brand Essentials"), /8–12페이지/);
  assert.match(text("Brand Essentials"), /아래 중 1종 선택/);
  assert.match(text("Brand System"), /2–4종/);
  for (const name of ["Website Starter", "Brand Website", "Brand Experience"]) {
    assert.match(text(name), /직접 코드 개발 시/);
    assert.match(text(name), /Git 저장소 또는 \.zip/);
  }
  assert.match(text("Brand Website"), /1,000자 이내/);
  assert.match(text("Brand Experience"), /5–8페이지/);
  assert.match(text("Brand Experience"), /CMS 또는 콘텐츠 운영 구조 · 택1/);
  assert.match(text("재사용 템플릿"), /원본 포함 · 도구 합의/);
  assert.match(text("SNS·디지털 홍보"), /각각에 3규격을 제공한다는 뜻은 아닙니다/);
  assert.match(text("메뉴판"), /A3 양면/);
  assert.match(text("명함"), /인쇄용 \.pdf/);
  assert.match(text("브랜드 카피·콘텐츠"), /5,000자 이내/);
});

test("bundle detail reuses exact component groups without inventing extra Quick Launch outputs", () => {
  const expected = [["Brand Essentials", "Website Starter"], ["Brand Essentials", "Brand Website"], ["Brand System", "Brand Experience"]];
  productGroups[2].rows.forEach((row, index) => {
    expected[index].forEach((name, component) => assert.deepEqual(row.deliveryGroups[component], deliveryGroup(name)));
  });
  assert.equal(productGroups[2].rows[0].deliveryGroups.length, 2);
  assert.equal(productGroups[2].rows[1].deliveryGroups.at(-1).title, "통합 런칭 추가 항목");
});

test("delivery UI keeps expanded lists, format labels and slate-50 independent of table header", () => {
  const read = file => readFileSync(new URL(`../src/workspace/brand/products/${file}`, import.meta.url), "utf8");
  const page = read("ProductsPage.tsx");
  const component = read("ProductDeliverables.tsx");
  assert.match(page, /<ProductDeliverables groups=\{product.deliveryGroups\}/);
  assert.match(page, /파일 확장자가 아닌 전달 방식/);
  assert.match(page, /모든 형식의 동시 제공을 뜻하지 않습니다/);
  for (const token of ["item.title", "item.detail", "item.format", "item.status"]) assert.ok(component.includes(token));
  assert.doesNotMatch(component, /<details|<summary/);
  assert.match(read("products.css"), /--products-included-bg: #f8fafc/);
  assert.match(read("products.css"), /products-included \{ background: var\(--products-included-bg\)/);
});
