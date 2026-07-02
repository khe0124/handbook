// 학습 상태 localStorage 접근 계층. 저장 실패는 읽기를 막지 않는다.
import { reviewFromLegacyMastered, toIsoDate } from "./srs.mjs";

const SRS_PREFIX = "dev-handbook:srs:";
const LEGACY_MASTERED_PREFIX = "dev-handbook:study-card:";
const VISITED_PREFIX = "dev-handbook:visited:";
const NEW_CARD_COUNT_PREFIX = "dev-handbook:srs-new-count:";

function getStorage() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

export function getTodayIso() {
  return toIsoDate(new Date());
}

function getSrsKey(itemId, cardId) {
  return `${SRS_PREFIX}${itemId}:${cardId}`;
}

function parseReview(rawValue) {
  if (!rawValue) {
    return null;
  }

  try {
    const parsed = JSON.parse(rawValue);

    if (typeof parsed?.lastReviewedAt === "string" && typeof parsed?.intervalDays === "number") {
      return parsed;
    }

    return null;
  } catch {
    return null;
  }
}

export function loadReview(itemId, cardId) {
  const storage = getStorage();

  if (!storage) {
    return null;
  }

  const review = parseReview(storage.getItem(getSrsKey(itemId, cardId)));

  if (review) {
    return review;
  }

  // 구세대 "외웠음" 플래그는 첫 조회 시 SRS 레코드로 승격한다.
  const legacyKey = `${LEGACY_MASTERED_PREFIX}${itemId}:${cardId}`;

  if (storage.getItem(legacyKey) === "mastered") {
    const migrated = reviewFromLegacyMastered(getTodayIso());
    saveReview(itemId, cardId, migrated);
    try {
      storage.removeItem(legacyKey);
    } catch {
      // 마이그레이션 실패는 무시한다.
    }
    return migrated;
  }

  return null;
}

export function saveReview(itemId, cardId, review) {
  const storage = getStorage();

  if (!storage) {
    return;
  }

  try {
    storage.setItem(getSrsKey(itemId, cardId), JSON.stringify(review));
  } catch {
    // 저장 실패는 읽기를 막지 않는다.
  }
}

export function clearReviewsForItem(itemId, cardIds) {
  const storage = getStorage();

  if (!storage) {
    return;
  }

  for (const cardId of cardIds) {
    try {
      storage.removeItem(getSrsKey(itemId, cardId));
      storage.removeItem(`${LEGACY_MASTERED_PREFIX}${itemId}:${cardId}`);
    } catch {
      // 저장 실패는 읽기를 막지 않는다.
    }
  }
}

export function loadAllReviews() {
  const storage = getStorage();

  if (!storage) {
    return [];
  }

  const reviews = [];

  for (let index = 0; index < storage.length; index += 1) {
    const key = storage.key(index);

    if (!key?.startsWith(SRS_PREFIX)) {
      continue;
    }

    const [itemId, cardId] = key.slice(SRS_PREFIX.length).split(":");
    const review = parseReview(storage.getItem(key));

    if (itemId && cardId && review) {
      reviews.push({ itemId, cardId, review });
    }
  }

  return reviews;
}

export function markVisited(itemId) {
  const storage = getStorage();

  if (!storage) {
    return;
  }

  const key = `${VISITED_PREFIX}${itemId}`;
  const todayIso = getTodayIso();

  try {
    const existing = storage.getItem(key);
    const firstVisitedAt = existing ? JSON.parse(existing)?.firstVisitedAt ?? todayIso : todayIso;
    storage.setItem(key, JSON.stringify({ firstVisitedAt, lastVisitedAt: todayIso }));
  } catch {
    // 방문 기록 실패는 읽기를 막지 않는다.
  }
}

export function loadVisitedItemIds() {
  const storage = getStorage();

  if (!storage) {
    return new Set();
  }

  const visitedIds = new Set();

  for (let index = 0; index < storage.length; index += 1) {
    const key = storage.key(index);

    if (key?.startsWith(VISITED_PREFIX)) {
      visitedIds.add(key.slice(VISITED_PREFIX.length));
    }
  }

  return visitedIds;
}

export function loadNewCardCount(todayIso) {
  const storage = getStorage();

  if (!storage) {
    return 0;
  }

  const parsed = Number.parseInt(storage.getItem(`${NEW_CARD_COUNT_PREFIX}${todayIso}`) ?? "0", 10);

  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

export function saveNewCardCount(todayIso, count) {
  const storage = getStorage();

  if (!storage) {
    return;
  }

  try {
    storage.setItem(`${NEW_CARD_COUNT_PREFIX}${todayIso}`, String(count));
  } catch {
    // 저장 실패는 읽기를 막지 않는다.
  }
}

export function exportStudyData() {
  const storage = getStorage();

  if (!storage) {
    return "{}";
  }

  const data = {};

  for (let index = 0; index < storage.length; index += 1) {
    const key = storage.key(index);

    if (
      key?.startsWith(SRS_PREFIX) ||
      key?.startsWith(VISITED_PREFIX) ||
      key?.startsWith(NEW_CARD_COUNT_PREFIX)
    ) {
      data[key] = storage.getItem(key);
    }
  }

  return JSON.stringify(data, null, 2);
}

export function importStudyData(json) {
  const storage = getStorage();

  if (!storage) {
    return 0;
  }

  let parsed;

  try {
    parsed = JSON.parse(json);
  } catch {
    return 0;
  }

  if (!parsed || typeof parsed !== "object") {
    return 0;
  }

  let importedCount = 0;

  for (const [key, value] of Object.entries(parsed)) {
    const isStudyKey =
      key.startsWith(SRS_PREFIX) || key.startsWith(VISITED_PREFIX) || key.startsWith(NEW_CARD_COUNT_PREFIX);

    if (!isStudyKey || typeof value !== "string") {
      continue;
    }

    try {
      storage.setItem(key, value);
      importedCount += 1;
    } catch {
      // 저장 실패는 읽기를 막지 않는다.
    }
  }

  return importedCount;
}
