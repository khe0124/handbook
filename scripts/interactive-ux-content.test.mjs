import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../public/handbook/interactive-ux-handbook.html", import.meta.url), "utf8");

test("Interactive UX covers the complete interaction loop and core concepts", () => {
  for (const id of ["north-star", "loop", "discoverability", "state", "direct-manipulation", "errors", "async", "motion-role", "inclusive", "case-studies", "evaluation", "practice-loop", "mastery-gate", "glossary", "sources"]) {
    assert.ok(source.includes(`id="${id}"`), `missing section: ${id}`);
  }
  for (const term of ["Affordance", "Signifier", "Feedforward", "Feedback", "Mapping", "Constraint", "Object permanence", "Optimistic UI", "Interruptibility"]) {
    assert.ok(source.includes(term), `missing concept: ${term}`);
  }
});

test("Interactive UX includes concrete user scenarios, failure states and evaluation evidence", () => {
  for (const scenario of ["중복 결제", "검색 자동완성", "장바구니 수량 변경", "모바일 carousel", "댓글 작성"]) {
    assert.ok(source.includes(scenario), `missing scenario: ${scenario}`);
  }
  for (const failure of ["offline", "timeout", "stale response", "rollback", "rapid input"]) {
    assert.ok(source.includes(failure), `missing failure fixture: ${failure}`);
  }
  assert.match(source, /행동[\s\S]*지각[\s\S]*운영/);
  assert.match(source, /pointer·touch·keyboard/);
});

test("Interactive UX does not regress to the former two-table outline", () => {
  const sectionCount = (source.match(/<section id=/g) ?? []).length;
  assert.ok(sectionCount >= 15, `expected at least 15 sections, got ${sectionCount}`);
  assert.ok(source.length > 20000, `content is unexpectedly short: ${source.length}`);
  assert.doesNotMatch(source, /<th>학습 층위<\/th>/);
});
