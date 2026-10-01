import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../public/handbook/interactive-creative-graphics-handbook.html", import.meta.url), "utf8");

test("Creative Graphics explains every renderer as a distinct model", () => {
  for (const id of ["rendering-models", "dom", "svg", "canvas", "gpu-pipeline", "webgl", "webgpu", "cost-model", "threejs", "shader", "hybrid", "cases"]) {
    assert.ok(source.includes(`id="${id}"`), `missing section: ${id}`);
  }
  for (const concept of ["Retained", "Immediate", "Rasterization", "Draw call", "Fill rate", "Overdraw", "Texture memory", "Scene graph", "Compute shader"]) {
    assert.ok(source.includes(concept), `missing concept: ${concept}`);
  }
});

test("Creative Graphics connects renderer choices to examples and user experience", () => {
  for (const example of ["지하철 노선도", "대량 scatter plot", "인터랙티브 데이터 시각화", "캠페인 hero", "제품 3D configurator", "10,000개 particle"]) {
    assert.ok(source.includes(example), `missing example: ${example}`);
  }
  for (const requirement of ["screen reader", "keyboard", "reduced motion", "GPU 실패", "context loss", "device loss"]) {
    assert.ok(source.includes(requirement), `missing production requirement: ${requirement}`);
  }
});

test("Creative Graphics retains authored depth instead of generic learning-layer tables", () => {
  assert.ok((source.match(/<section id=/g) ?? []).length >= 18);
  assert.ok(source.length > 26000, `content is unexpectedly short: ${source.length}`);
  assert.doesNotMatch(source, /<th>학습 층위<\/th>/);
  assert.match(source, /DOM[\s\S]*SVG[\s\S]*Canvas 2D[\s\S]*WebGL[\s\S]*WebGPU/);
  assert.match(source, /Three\.js[\s\S]*Vertex shader[\s\S]*Fragment shader/);
});
