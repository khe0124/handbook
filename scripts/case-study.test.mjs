import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolveWorkspace } from "../src/workspace/routes.mjs";

const read = (file) => readFileSync(new URL(`../src/workspace/brand/${file}`, import.meta.url), "utf8");

test("Case Study has a direct Brand route after Web", () => {
  assert.equal(resolveWorkspace("/brand/case-study"), "case-study");
  assert.equal(resolveWorkspace("/brand/case-study/"), "case-study");
  const frame = read("BrandFrame.tsx");
  assert.ok(frame.indexOf(">Web</a>") < frame.indexOf(">Case Study</a>"));
  assert.match(frame, /href="\/brand\/case-study"/);
});

test("Case Study template includes the eight ordered chapters and writing support", () => {
  const source = read("CaseStudyPage.tsx");
  const titles = ["Background", "Research", "Analysis", "Concept Direction", "Ideation I — Explore", "Ideation II — Develop", "Ideation III — Refine", "Build & Launch"];
  let previous = -1;
  for (const title of titles) {
    const position = source.indexOf(`title: "${title}"`);
    assert.ok(position > previous, title);
    previous = position;
  }
  for (const token of ["바로 쓰는 질문", "함께 보여줄 증거", "자동 저장됨", "Markdown 복사", "나의 기여"]) assert.ok(source.includes(token), token);
});
