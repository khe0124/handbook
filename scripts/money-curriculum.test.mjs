import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { moneyTracks } from "../src/workspace/money/curriculum.mjs";
import { moneyLessons } from "../src/workspace/money/content.mjs";
import { moneyCategories, moneyHref, resolveMoneyPage } from "../src/workspace/money/navigation.mjs";
import { moneySources } from "../src/workspace/money/sources.mjs";

const lessons = Object.entries(moneyLessons).flatMap(([category, list]) => list.filter(lesson => lesson.practice && !["tax", "crypto"].includes(category) && lesson.id !== "three-year-plan").map(lesson => ({ category, ...lesson })));
const read = name => readFileSync(new URL(`../src/workspace/money/${name}`, import.meta.url), "utf8");

test("twelve substantial lessons serve retirement, long-term research and cycle-aware operation", () => {
  assert.equal(lessons.length, 12);
  assert.deepEqual(lessons.map(lesson => lesson.id), ["roadmap", "policy", "retirement", "withdrawal", "portfolio-link", "tenbagger", "business", "financials", "valuation", "holding", "review", "rebalancing"]);
  for (const lesson of lessons) {
    assert.equal(lesson.explanations.length, 3, lesson.id);
    assert.equal(new Set(lesson.explanations.map(section => section.id)).size, 3);
    for (const section of lesson.explanations) {
      assert.equal(section.paragraphs.length, 2, lesson.id);
      for (const paragraph of section.paragraphs) assert.ok(paragraph.length >= 110, `${lesson.id}/${section.id}: ${paragraph.length}`);
      for (const key of section.sources) assert.ok(moneySources[key] && lesson.sources.includes(key));
    }
    assert.ok(lesson.guide.rows.length >= 4, lesson.id);
    for (const row of lesson.guide.rows) assert.equal(row.length, lesson.guide.columns.length, lesson.id);
    assert.ok(lesson.example.length >= 100);
    assert.ok(lesson.practice.steps.length >= 3);
    assert.ok(lesson.practice.template.length >= 4);
    assert.ok(lesson.practice.output.length >= 10);
    assert.ok(lesson.practice.answer.length >= 55);
    assert.equal(lesson.reviewedAt, "2026-09-30");
  }
});

test("three goal paths and every next-learning link resolve without requiring personal records", () => {
  assert.deepEqual(moneyTracks.map(track => track.id), ["retirement", "long-term", "cycle"]);
  const reached = new Set();
  for (const track of moneyTracks) {
    assert.ok(track.lessons.length >= 5);
    assert.ok(track.output.length > 10);
    for (const [category, id] of track.lessons) {
      assert.ok(resolveMoneyPage(moneyHref(category, id)));
      assert.notEqual(id, "plan");
      reached.add(`${category}/${id}`);
    }
  }
  for (const lesson of lessons) {
    assert.ok(reached.has(`${lesson.category}/${lesson.id}`), lesson.id);
    for (const [category, id] of lesson.related) {
      assert.ok(resolveMoneyPage(moneyHref(category, id)));
      assert.notEqual(`${category}/${id}`, `${lesson.category}/${lesson.id}`);
    }
  }
  for (const category of moneyCategories) assert.equal(new Set(category.lessons.map(([id]) => id)).size, category.lessons.length);
});

test("home leads with the three goals; all explanations and worked exercises remain readable without input", () => {
  const page = read("MoneyWorkspace.tsx");
  assert.ok(page.indexOf("<LearningTracks />") < page.indexOf('className="money-foundation"'));
  assert.match(page, /<LearningPractice key=/);
  assert.match(page, /sourceDate.*lesson.reviewedAt/);
  const tracks = read("LearningTracks.tsx");
  assert.match(tracks, /파일 입력 없이/);
  assert.match(tracks, /학습의|학습한 내용을 내 상황/);
  const practice = read("LearningPractice.tsx");
  for (const token of ["<h2", "<h3", "practice.steps.map", "practice.template.map", "practice.answer", "navigator.clipboard.writeText", 'role="status"']) assert.ok(practice.includes(token));
  assert.doesNotMatch(practice, /<input|<textarea|localStorage|fetch\(|<details/);
  assert.match(practice, /자동 복사를 사용할 수 없습니다/);
});

test("teaching cases retain explicit assumptions and distinguish valuation from guaranteed outcomes", () => {
  const get = id => lessons.find(lesson => lesson.id === id);
  assert.match(get("retirement").example, /4.03억.*5.4억.*보장값이 아닙니다/);
  assert.match(get("withdrawal").example, /7,750만.*8,200만.*450만/);
  assert.match(get("tenbagger").example, /EPS.*4배.*PER.*1.6배/);
  assert.match(get("financials").example, /100\+20−40−30\+10=60/);
  assert.match(get("valuation").example, /12,418원.*9,935원/);
  assert.match(get("rebalancing").example, /63.64%.*6,600만.*400만.*개인 추천 배분이 아닙니다/);
  assert.match(get("portfolio-link").example, /14.5%.*주가 하락률을 구할 수는 없습니다/);
  assert.match(get("policy").pitfall, /문서의 길이보다/);
});

test("worked-case arithmetic is reproducible independently of the prose", () => {
  assert.equal((18000000 * (1 - Math.pow(1.02, -30)) / .02 / 1e8).toFixed(2), "4.03");
  assert.equal((1e8 * .8 - 1e7) * 1.25 - 1e7, 77500000);
  assert.equal((1e8 * 1.25 - 1e7) * .8 - 1e7, 82000000);
  assert.equal(Math.round(20000 / Math.pow(1.1, 5)), 12418);
  assert.equal(Math.round(16000 / Math.pow(1.1, 5)), 9935);
  assert.equal(70000000 - 110000000 * .6, 4000000);
  assert.equal((70000000 / 110000000 * 100).toFixed(2), "63.64");
  assert.equal(((1 - .9 * .95) * 100).toFixed(1), "14.5");
});
