import assert from "node:assert/strict";
import { readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import test from "node:test";

import { HANDBOOK_ITEMS } from "../src/handbook/catalog.mjs";
import { buildMixedQuiz } from "../src/handbook/quiz/mixedQuiz.mjs";

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

test("every quiz item is a hidden React page with a matching Q&A document", () => {
  for (let index = 0; index < HANDBOOK_ITEMS.length; index += 1) {
    const item = HANDBOOK_ITEMS[index];
    if (!item.id.endsWith("-quiz")) continue;

    assert.equal(item.pageType, "react", `${item.id} should be a react page`);

    const qaId = item.id.replace(/-quiz$/, "-qa");
    assert.ok(HANDBOOK_ITEMS.some((candidate) => candidate.id === qaId));
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

// buildMixedQuiz용 4개 도메인 픽스처. 실제 quizDomains.mjs와 같은 도메인 4개로,
// 각 도메인에 퀴즈 2개씩만 배정해 도메인 간 풀 크기 차이를 단순화한다.
function quizzesByFile(...names) {
  return names.map((name) => quizzes.find(({ file }) => file === name)?.quiz).filter(Boolean);
}

const domainFixture = [
  {
    label: "프론트엔드",
    items: quizzesByFile("engineering-frontend-core-qa.quiz.mjs", "engineering-frontend-quality-qa.quiz.mjs").map(
      (quiz) => ({ id: quiz.id }),
    ),
  },
  {
    label: "백엔드",
    items: quizzesByFile("engineering-backend-core-qa.quiz.mjs", "engineering-data-qa.quiz.mjs").map((quiz) => ({
      id: quiz.id,
    })),
  },
  {
    label: "인프라",
    items: quizzesByFile("operations-dns-tls-qa.quiz.mjs", "operations-vpc-routing-qa.quiz.mjs").map((quiz) => ({
      id: quiz.id,
    })),
  },
  {
    label: "운영",
    items: quizzesByFile("operations-incident-dr-qa.quiz.mjs", "operations-observability-slo-qa.quiz.mjs").map(
      (quiz) => ({ id: quiz.id }),
    ),
  },
];

function fixtureGetQuiz(quizId) {
  return quizzes.find(({ quiz }) => quiz.id === quizId)?.quiz ?? null;
}

test("domain fixture actually resolves to real quiz data", () => {
  for (const domain of domainFixture) {
    assert.ok(domain.items.length === 2, `${domain.label} fixture should have 2 quizzes`);
    for (const item of domain.items) {
      assert.ok(fixtureGetQuiz(item.id), `${item.id} should resolve via fixtureGetQuiz`);
    }
  }
});

test("buildMixedQuiz returns exactly targetCount questions distributed evenly across selected domains", () => {
  for (const domainCount of [1, 2, 3, 4]) {
    const selectedLabels = domainFixture.slice(0, domainCount).map((domain) => domain.label);
    const mixed = buildMixedQuiz(domainFixture, selectedLabels, fixtureGetQuiz, 20);

    assert.equal(mixed.questions.length, 20, `${domainCount} domain(s) should yield 20 questions`);

    const ids = mixed.questions.map((question) => question.id);
    assert.equal(new Set(ids).size, ids.length, `${domainCount} domain(s) should have no duplicate question ids`);
  }
});

test("buildMixedQuiz splits the remainder across the first domains", () => {
  const selectedLabels = domainFixture.slice(0, 3).map((domain) => domain.label);
  const mixed = buildMixedQuiz(domainFixture, selectedLabels, fixtureGetQuiz, 20);

  // 20 / 3 = base 6, remainder 2 → 앞 두 도메인은 7개, 마지막은 6개씩 나와야 한다.
  const perDomainCount = domainFixture.slice(0, 3).map((domain) => {
    const domainQuizIds = new Set(domain.items.map((item) => item.id));
    return mixed.questions.filter((question) => domainQuizIds.has(question.id.split(":")[0])).length;
  });

  assert.deepEqual(perDomainCount, [7, 7, 6]);
});

test("buildMixedQuiz returns an empty question list when no domain is selected", () => {
  const mixed = buildMixedQuiz(domainFixture, [], fixtureGetQuiz, 20);
  assert.deepEqual(mixed.questions, []);
});

test("buildMixedQuiz namespaces question ids by source quiz to avoid collisions", () => {
  const selectedLabels = domainFixture.map((domain) => domain.label);
  const mixed = buildMixedQuiz(domainFixture, selectedLabels, fixtureGetQuiz, 20);

  for (const question of mixed.questions) {
    assert.match(question.id, /^.+-quiz:.+$/, `question id ${question.id} should be namespaced as <quizId>:<originalId>`);
  }
});
