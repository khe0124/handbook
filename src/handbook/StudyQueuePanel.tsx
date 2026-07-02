import { CheckCircle2, Download, Eye, Upload } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { HANDBOOK_ITEMS } from "./catalog.mjs";
import { QUESTION_BANK } from "./questionBank.mjs";
import { gradeReview, isDue } from "./srs.mjs";
import {
  exportStudyData,
  getTodayIso,
  importStudyData,
  loadAllReviews,
  loadNewCardCount,
  saveNewCardCount,
  saveReview,
} from "./studyStorage.mjs";

type BankCard = {
  id: string;
  docId: string;
  sectionId: string | null;
  question: string;
  answer: string;
  type: "recall" | "judgment" | "critique";
  tier: "must" | "good";
};

type CardReview = {
  lastReviewedAt: string;
  intervalDays: number;
  ease: number;
  lapses: number;
};

type QueueEntry = {
  card: BankCard;
  review: CardReview | null;
};

type SrsGrade = "again" | "hard" | "good";

const DAILY_NEW_CARD_LIMIT = 10;

const cardTypeLabels: Record<BankCard["type"], string> = {
  recall: "회상",
  judgment: "판단",
  critique: "크리틱",
};

const gradeButtons: Array<{ grade: SrsGrade; label: string }> = [
  { grade: "again", label: "모름" },
  { grade: "hard", label: "애매함" },
  { grade: "good", label: "알았음" },
];

const docLabelById = new Map(
  (HANDBOOK_ITEMS as Array<{ id: string; label: string }>).map((item) => [item.id, item.label]),
);

function buildTodayQueue(todayIso: string): QueueEntry[] {
  const bankCards = QUESTION_BANK as BankCard[];
  const reviewByKey = new Map(
    loadAllReviews().map(({ itemId, cardId, review }) => [`${itemId}:${cardId}`, review as CardReview]),
  );

  const dueEntries: QueueEntry[] = [];
  const newEntries: QueueEntry[] = [];

  for (const card of bankCards) {
    const review = reviewByKey.get(`${card.docId}:${card.id}`) ?? null;

    if (review) {
      if (isDue(review, todayIso)) {
        dueEntries.push({ card, review });
      }
      continue;
    }

    newEntries.push({ card, review: null });
  }

  const remainingNewSlots = Math.max(0, DAILY_NEW_CARD_LIMIT - loadNewCardCount(todayIso));
  // must 카드를 먼저 새 카드 큐에 투입한다.
  newEntries.sort((a, b) => (a.card.tier === b.card.tier ? 0 : a.card.tier === "must" ? -1 : 1));

  return [...dueEntries, ...newEntries.slice(0, remainingNewSlots)];
}

export function StudyQueuePanel() {
  const todayIso = getTodayIso();
  const [queue, setQueue] = useState<QueueEntry[]>(() => buildTodayQueue(todayIso));
  const [isAnswerOpen, setIsAnswerOpen] = useState(false);
  const [gradedCount, setGradedCount] = useState(0);
  const [importMessage, setImportMessage] = useState<string | null>(null);
  const importInputRef = useRef<HTMLInputElement | null>(null);

  const currentEntry = queue[0] ?? null;
  const bankSize = useMemo(() => (QUESTION_BANK as BankCard[]).length, []);

  const handleGrade = (grade: SrsGrade) => {
    if (!currentEntry) {
      return;
    }

    const nextReview = gradeReview(currentEntry.review, grade, todayIso);
    saveReview(currentEntry.card.docId, currentEntry.card.id, nextReview);

    if (!currentEntry.review) {
      saveNewCardCount(todayIso, loadNewCardCount(todayIso) + 1);
    }

    setQueue((currentQueue) => {
      const [, ...rest] = currentQueue;

      // '모름'이면 오늘 큐 끝에 다시 넣어 같은 세션에서 재도전한다.
      if (grade === "again") {
        return [...rest, { card: currentEntry.card, review: nextReview }];
      }

      return rest;
    });
    setGradedCount((count) => count + 1);
    setIsAnswerOpen(false);
  };

  const handleExport = () => {
    const blob = new Blob([exportStudyData()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = window.document.createElement("a");

    anchor.href = url;
    anchor.download = `dev-handbook-study-${todayIso}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (file: File | null) => {
    if (!file) {
      return;
    }

    file
      .text()
      .then((json) => {
        const importedCount = importStudyData(json);
        setImportMessage(importedCount ? `${importedCount}개 항목을 불러왔습니다.` : "불러올 학습 데이터가 없습니다.");
        setQueue(buildTodayQueue(todayIso));
      })
      .catch(() => {
        setImportMessage("파일을 읽지 못했습니다.");
      });
  };

  if (!bankSize) {
    return null;
  }

  return (
    <section className="study-queue" aria-labelledby="study-queue-title">
      <div className="learning-panel-head">
        <div>
          <span className="learning-kicker">TODAY REVIEW</span>
          <h2 id="study-queue-title">오늘 복습 큐</h2>
        </div>
        <span className="learning-count">{queue.length}개 남음</span>
      </div>
      {currentEntry ? (
        <article className="study-queue-card">
          <div className="study-card-meta">
            <span>
              {docLabelById.get(currentEntry.card.docId) ?? currentEntry.card.docId} ·{" "}
              {cardTypeLabels[currentEntry.card.type]}
              {currentEntry.review ? "" : " · 새 카드"}
            </span>
          </div>
          <h3>{currentEntry.card.question}</h3>
          {isAnswerOpen ? <p className="study-card-answer">{currentEntry.card.answer}</p> : null}
          <div className="study-card-actions">
            {!isAnswerOpen ? (
              <button type="button" onClick={() => setIsAnswerOpen(true)}>
                <Eye size={14} aria-hidden />답 보기
              </button>
            ) : (
              gradeButtons.map(({ grade, label }) => (
                <button
                  key={grade}
                  type="button"
                  data-grade={grade}
                  onClick={() => handleGrade(grade)}
                >
                  {label}
                </button>
              ))
            )}
          </div>
        </article>
      ) : (
        <p className="study-queue-done">
          <CheckCircle2 size={15} aria-hidden />
          {gradedCount
            ? `오늘 복습 완료 — ${gradedCount}개 카드를 채점했습니다.`
            : "오늘 복습할 카드가 없습니다."}
        </p>
      )}
      <div className="study-queue-tools">
        <button type="button" onClick={handleExport}>
          <Download size={13} aria-hidden />
          학습 데이터 내보내기
        </button>
        <button type="button" onClick={() => importInputRef.current?.click()}>
          <Upload size={13} aria-hidden />
          불러오기
        </button>
        <input
          ref={importInputRef}
          type="file"
          accept="application/json"
          className="sr-only"
          onChange={(event) => {
            handleImportFile(event.target.files?.[0] ?? null);
            event.target.value = "";
          }}
        />
        {importMessage ? <span className="study-queue-import-message">{importMessage}</span> : null}
      </div>
    </section>
  );
}
