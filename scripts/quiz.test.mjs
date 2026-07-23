import assert from "node:assert/strict";
import { readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import test from "node:test";

import { HANDBOOK_ITEMS } from "../src/handbook/catalog.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(here, "..", "src", "handbook", "quiz", "data");
const MIN_QUESTIONS = 30;
const CHOICE_COUNT = 4;

async function loadQuizzes() {
  const files = (await readdir(dataDir)).filter((file) => file.endsWith(".quiz.mjs"));
  const quizzes = [];
  for (const file of files) {
    const module = await import(pathToFileURL(path.join(dataDir, file)).href);
    quizzes.push({ file, quiz: module.default });
  }
  return quizzes;
}

const quizzes = await loadQuizzes();
const catalogQuizIds = HANDBOOK_ITEMS.filter((item) => item.id.endsWith("-quiz")).map(
  (item) => item.id,
);

test("every catalog quiz item has a data file, and vice versa", () => {
  const dataIds = quizzes.map(({ quiz }) => quiz.id).sort();
  assert.deepEqual(dataIds, [...catalogQuizIds].sort());
});

test("every quiz item is a React page placed right after its Q&A page", () => {
  for (let index = 0; index < HANDBOOK_ITEMS.length; index += 1) {
    const item = HANDBOOK_ITEMS[index];
    if (!item.id.endsWith("-quiz")) continue;

    assert.equal(item.pageType, "react", `${item.id} should be a react page`);

    const qaId = item.id.replace(/-quiz$/, "-qa");
    const previous = HANDBOOK_ITEMS[index - 1];
    assert.equal(
      previous?.id,
      qaId,
      `${item.id} should immediately follow ${qaId}`,
    );
  }
});

test("each quiz has a valid shape and enough questions", () => {
  for (const { file, quiz } of quizzes) {
    assert.ok(quiz, `${file} should export a default quiz`);
    assert.match(quiz.id, /-quiz$/, `${file} id should end with -quiz`);
    assert.match(quiz.sourceQaId, /-qa$/, `${file} sourceQaId should end with -qa`);
    assert.equal(
      quiz.id,
      quiz.sourceQaId.replace(/-qa$/, "-quiz"),
      `${file} id should derive from sourceQaId`,
    );
    assert.ok(
      typeof quiz.title === "string" && quiz.title.trim().length > 0,
      `${file} should have a non-empty title`,
    );
    assert.ok(
      Array.isArray(quiz.questions) && quiz.questions.length >= MIN_QUESTIONS,
      `${file} should have at least ${MIN_QUESTIONS} questions`,
    );

    const ids = new Set();
    for (const question of quiz.questions) {
      assert.ok(
        typeof question.id === "string" && question.id.length > 0,
        `${file} question needs an id`,
      );
      assert.ok(!ids.has(question.id), `${file} has duplicate question id ${question.id}`);
      ids.add(question.id);

      assert.ok(
        typeof question.question === "string" && question.question.trim().length > 0,
        `${file}:${question.id} needs question text`,
      );
      assert.ok(
        Array.isArray(question.choices) && question.choices.length === CHOICE_COUNT,
        `${file}:${question.id} needs exactly ${CHOICE_COUNT} choices`,
      );
      for (const choice of question.choices) {
        assert.ok(
          typeof choice === "string" && choice.trim().length > 0,
          `${file}:${question.id} has an empty choice`,
        );
      }
      assert.equal(
        new Set(question.choices).size,
        CHOICE_COUNT,
        `${file}:${question.id} has duplicate choices`,
      );
      assert.ok(
        Number.isInteger(question.answerIndex) &&
          question.answerIndex >= 0 &&
          question.answerIndex < CHOICE_COUNT,
        `${file}:${question.id} answerIndex must be 0..${CHOICE_COUNT - 1}`,
      );
      assert.ok(
        typeof question.explanation === "string" && question.explanation.trim().length > 0,
        `${file}:${question.id} needs an explanation`,
      );
    }
  }
});
