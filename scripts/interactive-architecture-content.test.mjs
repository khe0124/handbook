import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../public/handbook/interactive-architecture-handbook.html", import.meta.url), "utf8");

test("Interactive Architecture covers each system boundary", () => {
  for (const id of ["pipeline", "input", "state", "signals", "effects", "renderers", "ownership", "scheduling", "accessibility", "resilience", "observability", "case-study", "decision-system", "practice-loop", "mastery-gate", "glossary"]) {
    assert.ok(source.includes(`id="${id}"`), `missing section: ${id}`);
  }
  assert.match(source, /RAW INPUT → NORMALIZED INTENT → DISCRETE STATE → CONTINUOUS SIGNAL → EFFECT \/ SCHEDULER → RENDERER → PERCEPTION/);
});

test("Interactive Architecture explains state, cancellation, ownership and renderer contracts with failures", () => {
  for (const concept of ["Domain event", "State machine", "Guard", "Invariant", "Continuous signal", "Effect", "Cancellation", "Invalidation", "Ownership", "Stale result"]) {
    assert.ok(source.includes(concept), `missing concept: ${concept}`);
  }
  for (const fixture of ["Rapid toggle", "pointercancel", "Route leave", "mount/unmount", "motion preference 변경", "GPU renderer 생성 실패"]) {
    assert.ok(source.includes(fixture), `missing fixture: ${fixture}`);
  }
});

test("Interactive Architecture retains authored depth and the end-to-end gallery case", () => {
  assert.ok((source.match(/<section id=/g) ?? []).length >= 18);
  assert.ok(source.length > 25000, `content is unexpectedly short: ${source.length}`);
  assert.doesNotMatch(source, /<th>학습 층위<\/th>/);
  assert.match(source, /Gallery를 단계별로 설계하기[\s\S]*최소 의미 모델[\s\S]*Drag adapter[\s\S]*Spring과 renderer[\s\S]*Route, asset과 focus[\s\S]*Failure와 reduced mode/);
});
