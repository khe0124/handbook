import { useMemo } from "react";
import { HANDBOOK_GROUPS } from "./catalog.mjs";
import { PERSONAL_NOTES } from "./personalNotes.mjs";
import { QUESTION_BANK } from "./questionBank.mjs";
import { isDue, isSettled } from "./srs.mjs";
import { getTodayIso, loadAllReviews, loadVisitedItemIds } from "./studyStorage.mjs";

type HandbookGroup = {
  key: string;
  label: string;
  items: Array<{ id: string }>;
};

type GroupProgress = {
  key: string;
  label: string;
  visitedCount: number;
  totalCount: number;
};

type StudyProgress = {
  groups: GroupProgress[];
  settledCount: number;
  dueCount: number;
  bankSize: number;
  noteCount: number;
};

function buildStudyProgress(): StudyProgress {
  const todayIso = getTodayIso();
  const visitedIds = loadVisitedItemIds();
  const reviews = loadAllReviews();
  const reviewByKey = new Map(reviews.map(({ itemId, cardId, review }) => [`${itemId}:${cardId}`, review]));

  const groups = (HANDBOOK_GROUPS as HandbookGroup[])
    .filter((group) => group.key !== "home")
    .map((group) => ({
      key: group.key,
      label: group.label,
      visitedCount: group.items.filter((item) => visitedIds.has(item.id)).length,
      totalCount: group.items.length,
    }));

  let settledCount = 0;
  let dueCount = 0;

  for (const card of QUESTION_BANK as Array<{ id: string; docId: string }>) {
    const review = reviewByKey.get(`${card.docId}:${card.id}`) ?? null;

    if (isSettled(review)) {
      settledCount += 1;
    }

    if (review && isDue(review, todayIso)) {
      dueCount += 1;
    }
  }

  return {
    groups,
    settledCount,
    dueCount,
    bankSize: (QUESTION_BANK as unknown[]).length,
    noteCount: PERSONAL_NOTES.length,
  };
}

export function StudyDashboardPanel() {
  const progress = useMemo(buildStudyProgress, []);

  return (
    <section className="study-dashboard" aria-labelledby="study-dashboard-title">
      <div className="learning-panel-head">
        <div>
          <span className="learning-kicker">PROGRESS</span>
          <h2 id="study-dashboard-title">학습 진도</h2>
        </div>
      </div>
      <div className="study-dashboard-stats">
        <div className="study-dashboard-stat">
          <strong>
            {progress.settledCount}
            <span className="study-dashboard-stat-total"> / {progress.bankSize}</span>
          </strong>
          <span>정착한 카드 (간격 7일 이상)</span>
        </div>
        <div className="study-dashboard-stat">
          <strong>{progress.dueCount}</strong>
          <span>오늘 복습 대기</span>
        </div>
        <div className="study-dashboard-stat">
          <strong>{progress.noteCount}</strong>
          <span>기록한 내 사례</span>
        </div>
      </div>
      <div className="study-dashboard-groups">
        {progress.groups.map((group) => (
          <div key={group.key} className="study-dashboard-group">
            <div className="study-dashboard-group-head">
              <span>{group.label}</span>
              <span className="study-dashboard-group-count">
                {group.visitedCount}/{group.totalCount}
              </span>
            </div>
            <div
              className="study-dashboard-bar"
              role="img"
              aria-label={`${group.label} ${group.totalCount}개 중 ${group.visitedCount}개 읽음`}
            >
              <div
                className="study-dashboard-bar-fill"
                style={{ width: `${group.totalCount ? Math.round((group.visitedCount / group.totalCount) * 100) : 0}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
