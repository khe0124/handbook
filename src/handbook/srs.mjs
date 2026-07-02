// 간격 반복(SRS) 스케줄 순수 로직. SM-2를 단순화한 3단 채점 모델.
// again(모름) → 간격 리셋, hard(애매함) → 간격 유지에 가깝게, good(알았음) → 간격 확장.

export const SRS_GRADES = ["again", "hard", "good"];

const MIN_EASE = 1.3;
const DEFAULT_EASE = 2.5;
const FIRST_GOOD_INTERVAL_DAYS = 3;
const MAX_INTERVAL_DAYS = 120;

// 로컬 날짜 기준. UTC로 자르면 KST 오전 9시 전의 복습이 전날로 기록된다.
export function toIsoDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function daysBetween(fromIso, toIso) {
  const from = Date.parse(`${fromIso}T00:00:00Z`);
  const to = Date.parse(`${toIso}T00:00:00Z`);

  if (!Number.isFinite(from) || !Number.isFinite(to)) {
    return 0;
  }

  return Math.round((to - from) / 86_400_000);
}

export function gradeReview(review, grade, todayIso) {
  if (!SRS_GRADES.includes(grade)) {
    throw new Error(`Unknown SRS grade: ${grade}`);
  }

  const ease = review?.ease ?? DEFAULT_EASE;
  const intervalDays = review?.intervalDays ?? 0;
  const lapses = review?.lapses ?? 0;

  if (grade === "again") {
    return {
      lastReviewedAt: todayIso,
      intervalDays: 1,
      ease: Math.max(MIN_EASE, ease - 0.2),
      lapses: review ? lapses + 1 : 0,
    };
  }

  if (grade === "hard") {
    return {
      lastReviewedAt: todayIso,
      intervalDays: Math.max(1, Math.round(intervalDays * 1.2)),
      ease: Math.max(MIN_EASE, ease - 0.05),
      lapses,
    };
  }

  const nextIntervalDays =
    intervalDays < FIRST_GOOD_INTERVAL_DAYS
      ? FIRST_GOOD_INTERVAL_DAYS
      : Math.min(MAX_INTERVAL_DAYS, Math.round(intervalDays * ease));

  return {
    lastReviewedAt: todayIso,
    intervalDays: nextIntervalDays,
    ease,
    lapses,
  };
}

export function isDue(review, todayIso) {
  if (!review) {
    return true;
  }

  return daysBetween(review.lastReviewedAt, todayIso) >= review.intervalDays;
}

export function isSettled(review) {
  return Boolean(review && review.intervalDays >= 7);
}

// 과거 "외웠음" boolean 플래그를 SRS 레코드로 승격할 때 쓰는 변환.
export function reviewFromLegacyMastered(todayIso) {
  return {
    lastReviewedAt: todayIso,
    intervalDays: FIRST_GOOD_INTERVAL_DAYS,
    ease: DEFAULT_EASE,
    lapses: 0,
  };
}
