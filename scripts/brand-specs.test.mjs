import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { resolveWorkspace } from "../src/workspace/routes.mjs";
import { convertSpec, formatDimensions, PPI_OPTIONS, printAreas, productionTableRows, specGroups, specSources, specTableRows } from "../src/workspace/brand/specs.mjs";

test("size reference has a distinct directly accessible Brand route and menu", () => {
  for (const path of ["/brand/specs", "/brand/specs/"]) assert.equal(resolveWorkspace(path), "specs");
  assert.equal(resolveWorkspace("/brand/specs/unknown"), "not-found");
  const frame = readFileSync(new URL("../src/workspace/brand/BrandFrame.tsx", import.meta.url), "utf8");
  assert.ok(frame.includes('href="/brand/specs"'));
  assert.ok(frame.includes('area === "specs"'));
});

test("A4 has correct three-unit conversion and resolution-dependent pixel dimensions", () => {
  const a4 = {width:210,height:297};
  assert.deepEqual(convertSpec(a4, "print", 300), {mm:[210,297],cm:[21,29.7],px:[2480,3508],density:300});
  assert.deepEqual(convertSpec(a4, "print", 150).px, [1240,1754]);
  assert.deepEqual(convertSpec(a4, "print", 600).px, [4961,7016]);
  assert.equal(formatDimensions([2480,3508]), "2,480 × 3,508");
});

test("CSS dimensions are fixed at 96 px/in while image physical dimensions depend on PPI", () => {
  const frame = {width:96,height:192};
  const css = convertSpec(frame, "css", 300);
  assert.deepEqual(css.px, [96,192]);
  for (const [index, expected] of [25.4,50.8].entries()) assert.ok(Math.abs(css.mm[index] - expected) < 1e-10);
  assert.deepEqual(css, convertSpec(frame,"css",600));
  assert.equal(formatDimensions(convertSpec({width:300,height:600},"raster",300).mm),"25.4 × 50.8");
  assert.equal(formatDimensions(convertSpec({width:300,height:600},"raster",150).mm),"50.8 × 101.6");
});

test("every print row displays calculated trim, bleed and safe sizes in all three units", () => {
  for(const group of specGroups.filter(group=>group.kind==="print")) {
    for(const row of productionTableRows(group,300,3,3)) {
      assert.equal(row.length,5);
      for(const cell of row.slice(1,4)) for(const unit of ["mm","cm","px"]) assert.ok(cell.includes(unit));
      assert.ok(!row.join(" ").includes("재단 후 크기 · 도련 별도"));
    }
  }
  const group={items:[{name:"명함",width:90,height:50,note:"예시"}]};
  const row=productionTableRows(group,300,3,3)[0];
  assert.equal(row[1],"90 × 50 mm\n9 × 5 cm\n1,063 × 591 px");
  assert.equal(row[2],"96 × 56 mm\n9.6 × 5.6 cm\n1,134 × 661 px");
  assert.equal(row[3],"84 × 44 mm\n8.4 × 4.4 cm\n992 × 520 px");
  assert.match(productionTableRows(group,300,5,3)[0][2],/^100 × 60 mm/);
});

test("print catalogue contains papers, business cards, brochures and publications with valid rows", () => {
  assert.equal(new Set(specGroups.map(group=>group.id)).size,specGroups.length);
  for(const id of ["paper-a","paper-b","paper-c"]) assert.equal(specGroups.find(group=>group.id===id).items.length,11);
  for(const id of ["print-products","brochures","publications","web-frames","web-assets","web-icons"]) assert.ok(specGroups.find(group=>group.id===id).items.length>0);
  for(const group of specGroups) {
    if(group.source) assert.ok(specSources[group.source]);
    assert.equal(new Set(group.items.map(item=>item.name)).size,group.items.length);
    for(const ppi of PPI_OPTIONS) {
      const rows=specTableRows(group,ppi);
      assert.equal(rows.length,group.items.length);
      for(const row of rows) { assert.equal(row.length,5); assert.ok(row.every(cell=>cell.length>0)); }
    }
  }
  const iso=specGroups.find(group=>group.id==="paper-b").items.find(item=>item.name==="ISO B5");
  const jis=specGroups.find(group=>group.id==="other-paper").items.find(item=>item.name==="JIS B5");
  assert.deepEqual([iso.width,iso.height],[176,250]);
  assert.deepEqual([jis.width,jis.height],[182,257]);
});

test("trim, bleed and safety margins use both edges without altering the source", () => {
  const card={width:90,height:50};
  assert.deepEqual(printAreas(card,3,3).map(({width,height})=>[width,height]),[[90,50],[96,56],[84,44]]);
  assert.deepEqual(printAreas(card,0,0).map(({width,height})=>[width,height]),[[90,50],[90,50],[90,50]]);
  assert.deepEqual(printAreas({width:210,height:297},3,5).map(({width,height})=>[width,height]),[[210,297],[216,303],[200,287]]);
  assert.deepEqual(card,{width:90,height:50});
  for(const group of specGroups.filter(group=>group.kind==="print")) {
    for(const item of group.items) assert.ok(printAreas(item,5,10).every(row=>row.width>0&&row.height>0));
  }
});

test("invalid dimensions, densities and impossible safety areas are rejected", () => {
  const item={width:90,height:50};
  for(const value of [0,-1,NaN,Infinity]) assert.throws(()=>convertSpec(item,"print",value),RangeError);
  assert.throws(()=>convertSpec({width:0,height:50},"print"),RangeError);
  assert.throws(()=>convertSpec(item,"unknown"),TypeError);
  for(const [bleed,safe] of [[-1,3],[3,-1],[3,25],[NaN,3]]) assert.throws(()=>printAreas(item,bleed,safe),RangeError);
});
