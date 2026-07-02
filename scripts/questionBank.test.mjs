import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

import { HANDBOOK_ITEMS } from "../src/handbook/catalog.mjs";
import { QUESTION_BANK, getQuestionBankCards } from "../src/handbook/questionBank.mjs";

const CORE_DOC_IDS = [
  "practice-visual-design-foundations",
  "practice-color-typography-brand",
  "practice-data-visualization",
  "design-ai-product-ux",
  "engineering-frontend-performance",
  "engineering-java-spring",
];

test("질문 은행 카드는 공식 문서를 가리키고 id가 겹치지 않는다", () => {
  const officialIds = new Set(HANDBOOK_ITEMS.map((item) => item.id));
  const seenIds = new Set();
  const validTypes = new Set(["recall", "judgment", "critique"]);
  const validTiers = new Set(["must", "good"]);

  for (const card of QUESTION_BANK) {
    assert.ok(officialIds.has(card.docId), `${card.id}: unknown docId ${card.docId}`);
    assert.ok(!seenIds.has(card.id), `duplicate card id: ${card.id}`);
    seenIds.add(card.id);
    assert.ok(validTypes.has(card.type), `${card.id}: unknown type ${card.type}`);
    assert.ok(validTiers.has(card.tier), `${card.id}: unknown tier ${card.tier}`);
    assert.ok(card.question.trim().length > 10, `${card.id}: question is too short`);
    assert.ok(card.answer.trim().length > 20, `${card.id}: answer is too short`);
  }
});

test("핵심 6개 문서는 각각 15개 이상 카드와 8개 이상 must 카드를 갖는다", () => {
  for (const docId of CORE_DOC_IDS) {
    const cards = getQuestionBankCards(docId);
    const mustCards = cards.filter((card) => card.tier === "must");

    assert.ok(cards.length >= 15, `${docId}: ${cards.length} cards (< 15)`);
    assert.ok(mustCards.length >= 8, `${docId}: ${mustCards.length} must cards (< 8)`);
  }
});

test("판단·크리틱 카드가 전체의 40% 이상이다", () => {
  const judgmentCount = QUESTION_BANK.filter((card) => card.type !== "recall").length;

  assert.ok(
    judgmentCount / QUESTION_BANK.length >= 0.4,
    `judgment+critique ratio: ${Math.round((judgmentCount / QUESTION_BANK.length) * 100)}%`,
  );
});

test("카드 질문은 자동 생성 템플릿 문형을 쓰지 않는다", () => {
  for (const card of QUESTION_BANK) {
    assert.doesNotMatch(card.question, /의 핵심 판단 기준은 무엇인가\?$/, `${card.id}: template question`);
  }
});

test("카드 sectionId는 해당 문서 HTML에 실제로 존재한다", async () => {
  const fileByDocId = new Map(HANDBOOK_ITEMS.map((item) => [item.id, item.file]));
  const htmlCache = new Map();

  for (const card of QUESTION_BANK) {
    if (!card.sectionId) {
      continue;
    }

    const file = fileByDocId.get(card.docId);

    if (!htmlCache.has(file)) {
      htmlCache.set(file, await readFile(path.join("public", "handbook", file), "utf8"));
    }

    assert.ok(
      htmlCache.get(file).includes(`id="${card.sectionId}"`),
      `${card.id}: sectionId ${card.sectionId} not found in ${file}`,
    );
  }
});
