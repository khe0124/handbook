import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../public/handbook/interactive-art-direction-handbook.html", import.meta.url), "utf8");

test("Art Direction covers the agency process from brief to presentation", () => {
  for (const id of ["brief", "concept", "references", "narrative", "visual-language", "typography", "image", "motion", "interaction", "technology", "signature", "system", "production", "critique", "award-case", "case-study", "practice-loop", "mastery-gate", "glossary"]) {
    assert.ok(source.includes(`id="${id}"`), `missing section: ${id}`);
  }
  assert.match(source, /STRATEGY → CREATIVE THESIS → VISUAL LANGUAGE → MOTION \/ INTERACTION LANGUAGE → SIGNATURE MOMENTS → SYSTEM → PRODUCTION → EDIT → PRESENTATION/);
});

test("Art Direction includes directing concepts, production artifacts and award-case evidence", () => {
  for (const concept of ["Creative thesis", "Creative tension", "Visual language", "Motion language", "Interaction language", "Key frame", "Beat sheet", "Signature moment", "Rupture", "Case film"]) {
    assert.ok(source.includes(concept), `missing concept: ${concept}`);
  }
  for (const artifact of ["Creative brief", "Direction board", "Key-frame set", "Motion/interaction spec", "Asset plan", "Quality matrix"]) {
    assert.ok(source.includes(artifact), `missing artifact: ${artifact}`);
  }
  for (const lens of ["Concept", "Art direction", "Interaction", "Craft", "Usability", "Technology", "Content"]) {
    assert.ok(source.includes(`<td>${lens}</td>`), `missing review lens: ${lens}`);
  }
});

test("Art Direction retains authored depth and a complete campaign case", () => {
  assert.ok((source.match(/<section id=/g) ?? []).length >= 21);
  assert.ok(source.length > 30000, `content is unexpectedly short: ${source.length}`);
  assert.doesNotMatch(source, /<th>학습 층위<\/th>/);
  assert.match(source, /Material remembers touch[\s\S]*Typography[\s\S]*Image[\s\S]*Motion[\s\S]*Interaction[\s\S]*Sound[\s\S]*Fallback/);
});
