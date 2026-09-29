import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { CAREER_HANDBOOKS, HANDBOOK_ITEMS } from "../src/handbook/catalog.mjs";

const readCareer = async () => new Map(await Promise.all(
  CAREER_HANDBOOKS.map(async (item) => [item.id, await readFile(`public/handbook/${item.file}`, "utf8")]),
));

test("career tables of contents and cross-document section links resolve", async () => {
  const docs = await readCareer();
  const catalog = new Map(HANDBOOK_ITEMS.map((item) => [item.id, item]));
  for (const [id, html] of docs) {
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
    assert.equal(ids.length, new Set(ids).size, `Duplicate anchors in ${id}`);
    for (const [, anchor] of html.matchAll(/href="#([^"]+)"/g)) {
      assert.ok(ids.includes(anchor), `Unresolved local anchor: ${id}#${anchor}`);
    }
    for (const [link] of html.matchAll(/<a\b[^>]*data-handbook-id="[^"]+"[^>]*>/g)) {
      const targetId = link.match(/data-handbook-id="([^"]+)"/)[1];
      const section = link.match(/data-handbook-section="([^"]+)"/)?.[1];
      const target = catalog.get(targetId);
      assert.ok(target, `Unknown document: ${targetId}`);
      const targetHtml = docs.get(targetId) ?? await readFile(`public/handbook/${target.file}`, "utf8");
      if (section) {
        assert.ok(targetHtml.includes(`id="${section}"`), `Unresolved destination: ${targetId}#${section}`);
      }
      const href = link.match(/href="([^"]+)"/)?.[1];
      assert.equal(href, "/handbook/" + target.file + (section ? `#${section}` : ""), "Standalone and app destinations must agree");
    }
  }
});

test("moved career subjects have one canonical owner", async () => {
  const docs = await readCareer();
  const owners = [
    ["north-star", "career-strategic-thinking-2027"],
    ["execution", "career-strategic-thinking-2027"],
    ["team-selection", "career-growth-plan"],
    ["position-evidence", "career-growth-plan"],
    ["company-q2", "career-growth-plan"],
    ["company-q11", "career-growth-plan"],
    ["visual-archive", "career-ai-native-portfolio"],
    ["artifact-map", "career-ai-native-portfolio"],
    ["history-answer-cards", "career-strategy-foundation"],
    ["history-evidence-map", "career-strategy-foundation"],
    ["personalb2b-ch3", "career-frontend-interview"],
    ["personalb2b-ch6", "career-frontend-interview"],
    ["personalb2b-ch7", "career-culture-collaboration"],
  ];
  for (const [section, owner] of owners) {
    const matches = [...docs].filter(([, html]) => html.includes(`<section id="${section}">`)).map(([id]) => id);
    assert.deepEqual(matches, [owner], `Canonical owner of ${section}`);
  }
  assert.doesNotMatch(docs.get("career-personal-history"), /<h2>(?:ANSWER CARDS|PERSONAL POSITIONING MAP|POSITION PRIORITY MATRIX|STRENGTH WEAKNESS APPEAL MATRIX)<\/h2>/);
  assert.doesNotMatch(docs.get("career-backend-interview"), /NEXT (?:30|60) DAYS/);
  assert.doesNotMatch(docs.get("career-job-change-playbook"), /01R-[A-D]/);
});

test("archived interview merger cannot overwrite curated career publications", async () => {
  const generator = await readFile("scripts/generate-engineering-bundles.mjs", "utf8");
  assert.match(generator, /for \(const bundle of BUNDLES\) \{[\s\S]*?if \(bundle\.id\.startsWith\("career-"\)\) continue;[\s\S]*?const firstHtml/);
});
