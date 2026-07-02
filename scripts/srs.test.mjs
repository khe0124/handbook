import assert from "node:assert/strict";
import test from "node:test";

import {
  daysBetween,
  gradeReview,
  isDue,
  isSettled,
  reviewFromLegacyMastered,
} from "../src/handbook/srs.mjs";

test("새 카드를 '알았음'으로 채점하면 3일 뒤 복습으로 잡힌다", () => {
  const review = gradeReview(null, "good", "2026-07-02");

  assert.equal(review.lastReviewedAt, "2026-07-02");
  assert.equal(review.intervalDays, 3);
  assert.equal(review.lapses, 0);
});

test("'알았음'을 반복하면 간격이 ease 배수로 늘어난다", () => {
  const first = gradeReview(null, "good", "2026-07-02");
  const second = gradeReview(first, "good", "2026-07-05");

  assert.equal(second.intervalDays, Math.round(3 * first.ease));
  assert.ok(second.intervalDays > first.intervalDays);
});

test("'모름'으로 채점하면 간격이 1일로 리셋되고 lapse가 기록된다", () => {
  const settled = { lastReviewedAt: "2026-06-01", intervalDays: 16, ease: 2.5, lapses: 0 };
  const review = gradeReview(settled, "again", "2026-07-02");

  assert.equal(review.intervalDays, 1);
  assert.equal(review.lapses, 1);
  assert.ok(review.ease < settled.ease);
});

test("'애매함'은 간격을 크게 늘리지 않고 ease를 조금 낮춘다", () => {
  const review = gradeReview({ lastReviewedAt: "2026-06-25", intervalDays: 7, ease: 2.5, lapses: 0 }, "hard", "2026-07-02");

  assert.equal(review.intervalDays, Math.round(7 * 1.2));
  assert.equal(review.ease, 2.45);
});

test("ease는 최소값 1.3 아래로 내려가지 않는다", () => {
  let review = { lastReviewedAt: "2026-07-01", intervalDays: 1, ease: 1.35, lapses: 0 };
  review = gradeReview(review, "again", "2026-07-02");

  assert.equal(review.ease, 1.3);
});

test("간격이 지난 카드만 복습 대상이 된다", () => {
  const review = { lastReviewedAt: "2026-07-01", intervalDays: 3, ease: 2.5, lapses: 0 };

  assert.equal(isDue(review, "2026-07-02"), false);
  assert.equal(isDue(review, "2026-07-04"), true);
  assert.equal(isDue(null, "2026-07-02"), true, "기록 없는 새 카드는 항상 학습 대상이다");
});

test("간격 7일 이상에 도달한 카드를 정착으로 판정한다", () => {
  assert.equal(isSettled({ lastReviewedAt: "2026-07-01", intervalDays: 7, ease: 2.5, lapses: 0 }), true);
  assert.equal(isSettled({ lastReviewedAt: "2026-07-01", intervalDays: 3, ease: 2.5, lapses: 0 }), false);
  assert.equal(isSettled(null), false);
});

test("구세대 '외웠음' 플래그는 3일 간격 레코드로 승격된다", () => {
  const review = reviewFromLegacyMastered("2026-07-02");

  assert.equal(review.intervalDays, 3);
  assert.equal(review.lastReviewedAt, "2026-07-02");
});

test("daysBetween은 ISO 날짜 차이를 일 단위로 계산한다", () => {
  assert.equal(daysBetween("2026-07-01", "2026-07-02"), 1);
  assert.equal(daysBetween("2026-06-25", "2026-07-02"), 7);
  assert.equal(daysBetween("잘못된값", "2026-07-02"), 0);
});

test("알 수 없는 채점 값은 예외를 던진다", () => {
  assert.throws(() => gradeReview(null, "perfect", "2026-07-02"), /Unknown SRS grade/);
});
