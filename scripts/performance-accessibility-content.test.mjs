import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../public/handbook/interactive-performance-accessibility-handbook.html", import.meta.url), "utf8");

test("Performance and Accessibility covers the complete input-to-perception path", () => {
  for (const id of ["experience-path", "frame", "responsiveness", "diagnostics", "gpu-memory", "adaptive", "semantics", "keyboard-focus", "motion-safety", "perception", "cases", "testing", "release-gate", "practice-loop", "glossary"]) {
    assert.ok(source.includes(`id="${id}"`), `missing section: ${id}`);
  }
  assert.match(source, /INPUT → EVENT → STATE → RENDER → PRESENT → PERCEIVE → NEXT ACTION/);
});

test("Performance and Accessibility includes mechanisms, user cases and failure fixtures", () => {
  for (const concept of ["Long task", "Forced layout", "Rasterization", "Compositing", "Input latency", "Accessibility tree", "Accessible name", "Focus order", "Live region", "Reduced motion"]) {
    assert.ok(source.includes(concept), `missing concept: ${concept}`);
  }
  for (const example of ["Scroll narrative", "대량 데이터 dashboard", "WebGL 제품 hero", "Animated modal", "virtualized list"]) {
    assert.ok(source.includes(example), `missing example: ${example}`);
  }
  for (const fixture of ["keyboard", "screen reader", "context loss", "mount/unmount", "200% 이상 zoom", "Full / Reduced / No-animation"]) {
    assert.ok(source.includes(fixture), `missing fixture: ${fixture}`);
  }
});

test("Performance and Accessibility retains authored depth and a combined release gate", () => {
  assert.ok((source.match(/<section id=/g) ?? []).length >= 17);
  assert.ok(source.length > 25000, `content is unexpectedly short: ${source.length}`);
  assert.doesNotMatch(source, /<th>학습 층위<\/th>/);
  assert.match(source, /입력 반응[\s\S]*프레임 안정성[\s\S]*자원 수명[\s\S]*Semantic 상태[\s\S]*Keyboard와 focus[\s\S]*Motion safety/);
});
