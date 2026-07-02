import { createRoot, type Root } from "react-dom/client";
import { Eye, Menu, RotateCcw, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChecklistCard, type ChecklistItem } from "./ChecklistCard";
import { HANDBOOK_DOCUMENT_LOADERS } from "./documentLoaders";
import { InlineCodeCopyButton } from "./InlineCodeCopyButton";
import { getPersonalNotes } from "./personalNotes.mjs";
import { PRACTICAL_EXAMPLES, getPracticalExampleLens } from "./practicalExamples";
import { getQuestionBankCards } from "./questionBank.mjs";
import { SerialCardCopyButton } from "./SerialCardCopyButton";
import { gradeReview, isDue, isSettled } from "./srs.mjs";
import { StudyDashboardPanel } from "./StudyDashboardPanel";
import { StudyQueuePanel } from "./StudyQueuePanel";
import { clearReviewsForItem, getTodayIso, loadReview, saveReview } from "./studyStorage.mjs";
import type { HandbookDocumentContent } from "./types";
import "./handbook.css";

type HandbookItem = {
  id: string;
  label: string;
  kind: string;
};

type HandbookPageProps = {
  item: HandbookItem;
  onReady?: (itemId: string) => void;
  onSelectHandbook?: (itemId: string) => void;
};

type LearningFilter = "all" | "concept" | "checklist" | "interview" | "failure" | "artifact";

type LearningSection = {
  id: string;
  code: string;
  title: string;
  summary: string;
  text: string;
  filters: LearningFilter[];
};

type StudyCard = {
  id: string;
  sectionId: string;
  label: string;
  question: string;
  answer: string;
};

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

type SrsGrade = "again" | "hard" | "good";

const bankCardTypeLabels: Record<BankCard["type"], string> = {
  recall: "회상",
  judgment: "판단",
  critique: "크리틱",
};

const srsGradeButtons: Array<{ grade: SrsGrade; label: string }> = [
  { grade: "again", label: "모름" },
  { grade: "hard", label: "애매함" },
  { grade: "good", label: "알았음" },
];

function toStudyCard(card: BankCard): StudyCard {
  return {
    id: card.id,
    sectionId: card.sectionId ?? "",
    label: `${card.tier === "must" ? "MUST" : "GOOD"} · ${bankCardTypeLabels[card.type]}`,
    question: card.question,
    answer: card.answer,
  };
}

const learningFilters: Array<{ id: LearningFilter; label: string }> = [
  { id: "all", label: "전체" },
  { id: "concept", label: "개념" },
  { id: "checklist", label: "체크리스트" },
  { id: "interview", label: "면접 답변" },
  { id: "failure", label: "실패 신호" },
  { id: "artifact", label: "산출물" },
];

function loadCardReviews(itemId: string, cards: StudyCard[]) {
  const reviews = new Map<string, CardReview | null>();

  for (const card of cards) {
    reviews.set(card.id, loadReview(itemId, card.id) as CardReview | null);
  }

  return reviews;
}

function getPlainText(element: Element | null) {
  return element?.textContent?.replace(/\s+/g, " ").trim() ?? "";
}

function buildLearningFilters(section: Element, text: string, title: string, code: string) {
  const haystack = `${code} ${title} ${text}`.toLowerCase();
  const filters = new Set<LearningFilter>();

  if (/개념|원리|정의|모델|핵심|foundation|principle|model/.test(haystack)) filters.add("concept");
  if (/checklist|체크리스트|gate|rubric|audit|drill|loop|점검|기준/.test(haystack)) filters.add("checklist");
  if (/면접|답변|꼬리질문|30초|90초|interview|answer/.test(haystack)) filters.add("interview");
  if (/실패|위험|주의|미달|오답|반례|dangerous|risk|warn|failure/.test(haystack)) filters.add("failure");
  if (/산출물|증거|제출|packet|artifact|template|evidence|deliverable/.test(haystack)) filters.add("artifact");

  if (section.querySelector(".callout.warn, .callout.risk")) filters.add("failure");
  if (section.querySelector(".serial-card, .semantic-card, table")) filters.add("artifact");

  return Array.from(filters);
}

function createLearningModel(mainHtml: string) {
  if (typeof window === "undefined") {
    return { sections: [] as LearningSection[], studyCards: [] as StudyCard[], heroHtml: "", bodyHtml: mainHtml };
  }

  const parser = new window.DOMParser();
  const parsedDocument = parser.parseFromString(mainHtml, "text/html");
  const sections = Array.from(parsedDocument.body.querySelectorAll("section"))
    .map((section, index): LearningSection | null => {
      const title = getPlainText(section.querySelector("h2")) || `섹션 ${index + 1}`;
      const code = getPlainText(section.querySelector(".ch-code"));
      const summary =
        getPlainText(section.querySelector(".lede")) ||
        getPlainText(section.querySelector("p")) ||
        getPlainText(section.querySelector(".serial-card, .semantic-card, .callout"));
      const text = getPlainText(section);
      const id = section.id || `learning-section-${index + 1}`;

      if (!text) return null;

      if (!section.id) section.id = id;

      return {
        id,
        code,
        title,
        summary,
        text,
        filters: buildLearningFilters(section, text, title, code),
      };
    })
    .filter((section): section is LearningSection => Boolean(section));

  const studyCards = sections
    .filter((section) => section.title && section.summary)
    .slice(0, 8)
    .map((section) => {
      const label = section.code || "RECALL";
      const question = section.title.endsWith("?")
        ? section.title
        : `${section.title}의 핵심 판단 기준은 무엇인가?`;

      return {
        id: section.id,
        sectionId: section.id,
        label,
        question,
        answer: section.summary,
      };
    });

  const hero = parsedDocument.body.querySelector("header.hero");
  const heroHtml = hero?.outerHTML ?? "";
  hero?.remove();

  return {
    sections,
    studyCards,
    heroHtml,
    bodyHtml: heroHtml ? parsedDocument.body.innerHTML : mainHtml,
  };
}

function shouldAttachInlineCodeCopy(itemId: string, code: HTMLElement) {
  const text = code.textContent?.trim() ?? "";

  return (
    itemId === "practice-cheat-sheets" &&
    text.length > 0 &&
    text.length <= 90 &&
    !code.closest("pre") &&
    !code.closest(".serial-card") &&
    !code.closest(".snippet-card") &&
    !code.nextElementSibling?.classList.contains("inline-code-copy-mount")
  );
}

function getSerialCardText(card: HTMLElement) {
  return card.textContent?.replace(/\u00a0/g, " ").trim() ?? "";
}

function attachSnippetCopyButton(card: HTMLElement, roots: Root[], mounts: HTMLElement[]) {
  const mount = window.document.createElement("div");
  mount.className = "snippet-card-copy-mount";
  card.append(mount);

  const root = createRoot(mount);
  root.render(<SerialCardCopyButton card={card} />);

  roots.push(root);
  mounts.push(mount);
}

function getDifficultyLabel(difficulty: string) {
  const labels: Record<string, string> = {
    intro: "입문",
    practice: "실습",
    independent: "독립 수행",
    lead: "리드",
  };

  return labels[difficulty] ?? difficulty;
}

function LearningSearchPanel({ sections }: { sections: LearningSection[] }) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<LearningFilter>("all");
  const normalizedQuery = query.trim().toLowerCase();
  const results = sections
    .filter((section) => activeFilter === "all" || section.filters.includes(activeFilter))
    .filter((section) => {
      if (!normalizedQuery) return true;
      return `${section.code} ${section.title} ${section.summary} ${section.text}`.toLowerCase().includes(normalizedQuery);
    })
    .slice(0, 8);

  return (
    <section className="handbook-learning-search" aria-labelledby="handbook-learning-search-title">
      <div className="learning-panel-head">
        <div>
          <span className="learning-kicker">LEARNING SEARCH</span>
          <h2 id="handbook-learning-search-title">섹션 단위 검색</h2>
        </div>
        <span className="learning-count">{results.length}개 결과</span>
      </div>
      <label className="learning-search-input">
        <Search size={16} aria-hidden />
        <span className="sr-only">문서 안에서 검색</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="개념, 산출물, 실패 신호를 검색"
        />
      </label>
      <div className="learning-filter-row" aria-label="학습 검색 필터">
        {learningFilters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            className="learning-filter-button"
            aria-pressed={activeFilter === filter.id}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>
      <div className="learning-search-results">
        {results.length ? (
          results.map((section) => (
            <a key={section.id} className="learning-search-result" href={`#${section.id}`}>
              <span className="learning-result-code">{section.code || "SECTION"}</span>
              <strong>{section.title}</strong>
              <span>{section.summary || section.text}</span>
            </a>
          ))
        ) : (
          <p className="learning-empty">해당 조건에 맞는 섹션이 없습니다.</p>
        )}
      </div>
    </section>
  );
}

function getCardDueLabel(review: CardReview | null, todayIso: string) {
  if (!review) return "새 카드";
  if (isDue(review, todayIso)) return "오늘 복습";
  return `${review.intervalDays}일 간격`;
}

function StudyCardsPanel({ itemId, cards, isCurated }: { itemId: string; cards: StudyCard[]; isCurated: boolean }) {
  const todayIso = getTodayIso();
  const [openCardIds, setOpenCardIds] = useState<Set<string>>(() => new Set());
  const [reviews, setReviews] = useState<Map<string, CardReview | null>>(() => loadCardReviews(itemId, cards));

  useEffect(() => {
    setOpenCardIds(new Set());
    setReviews(loadCardReviews(itemId, cards));
  }, [cards, itemId]);

  const settledCount = cards.filter((card) => isSettled(reviews.get(card.id) ?? null)).length;
  const dueCount = cards.filter((card) => {
    const review = reviews.get(card.id) ?? null;
    return review && isDue(review, todayIso);
  }).length;

  const toggleAnswer = (cardId: string) => {
    setOpenCardIds((currentIds) => {
      const nextIds = new Set(currentIds);
      if (nextIds.has(cardId)) nextIds.delete(cardId);
      else nextIds.add(cardId);
      return nextIds;
    });
  };

  const handleGrade = (cardId: string, grade: SrsGrade) => {
    const nextReview = gradeReview(reviews.get(cardId) ?? null, grade, todayIso) as CardReview;

    saveReview(itemId, cardId, nextReview);
    setReviews((currentReviews) => new Map(currentReviews).set(cardId, nextReview));
    setOpenCardIds((currentIds) => {
      const nextIds = new Set(currentIds);
      nextIds.delete(cardId);
      return nextIds;
    });
  };

  const resetReviews = () => {
    clearReviewsForItem(
      itemId,
      cards.map((card) => card.id),
    );
    setReviews(loadCardReviews(itemId, cards));
  };

  if (!cards.length) return null;

  return (
    <section className="handbook-study-cards" aria-labelledby="handbook-study-cards-title">
      <div className="learning-panel-head">
        <div>
          <span className="learning-kicker">{isCurated ? "CURATED CARDS" : "RECALL CARDS"}</span>
          <h2 id="handbook-study-cards-title">암기 카드</h2>
        </div>
        <button type="button" className="learning-reset-button" onClick={resetReviews}>
          <RotateCcw size={14} aria-hidden />
          초기화
        </button>
      </div>
      <p className="learning-progress">
        정착 {settledCount} / 전체 {cards.length}
        {dueCount ? ` · 오늘 복습 ${dueCount}개` : ""}
      </p>
      <div className="study-card-list">
        {cards.map((card) => {
          const isOpen = openCardIds.has(card.id);
          const review = reviews.get(card.id) ?? null;

          return (
            <article key={card.id} className="study-card" data-mastered={isSettled(review) ? "true" : undefined}>
              <div className="study-card-meta">
                <span>
                  {card.label} · {getCardDueLabel(review, todayIso)}
                </span>
                {card.sectionId ? <a href={`#${card.sectionId}`}>원문 보기</a> : null}
              </div>
              <h3>{card.question}</h3>
              {isOpen ? <p className="study-card-answer">{card.answer}</p> : null}
              <div className="study-card-actions">
                <button type="button" onClick={() => toggleAnswer(card.id)} aria-expanded={isOpen}>
                  <Eye size={14} aria-hidden />
                  {isOpen ? "답 숨기기" : "답 보기"}
                </button>
                {isOpen
                  ? srsGradeButtons.map(({ grade, label }) => (
                      <button key={grade} type="button" data-grade={grade} onClick={() => handleGrade(card.id, grade)}>
                        {label}
                      </button>
                    ))
                  : null}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function shouldUpgradeChecklistCard(card: HTMLElement) {
  const label = card.querySelector<HTMLElement>(".sc-label")?.textContent?.trim() ?? "";

  return label.includes("CHECKLIST") && getChecklistItems(card).length > 0;
}

function getChecklistItems(card: HTMLElement): ChecklistItem[] {
  const label = card.querySelector<HTMLElement>(".sc-label");
  const lines: string[] = [];
  let currentLine = "";
  let foundLabel = false;

  const walk = (node: ChildNode) => {
    if (node.nodeType === Node.TEXT_NODE) {
      currentLine += node.textContent ?? "";
      return;
    }

    if (!(node instanceof HTMLElement)) return;
    if (node.classList.contains("serial-card-copy-mount")) return;
    if (node.classList.contains("serial-card-checklist-mount")) return;

    if (node.tagName === "BR") {
      lines.push(currentLine);
      currentLine = "";
      return;
    }

    node.childNodes.forEach(walk);
  };

  card.childNodes.forEach((node) => {
    if (node === label) {
      foundLabel = true;
      return;
    }

    if (!foundLabel) return;
    walk(node);
  });

  if (currentLine.trim()) lines.push(currentLine);

  return lines
    .map((line) => line.trim())
    .filter((line) => line.startsWith("□"))
    .map((text, index) => ({
      id: `${index}:${text}`,
      text,
    }));
}

export function HandbookPage({ item, onReady, onSelectHandbook }: HandbookPageProps) {
  const [document, setDocument] = useState<HandbookDocumentContent | null>(null);
  const [loadedItemId, setLoadedItemId] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const [isTocOpen, setIsTocOpen] = useState(false);
  const mainRef = useRef<HTMLElement | null>(null);
  const practicalExample = PRACTICAL_EXAMPLES[item.id];
  const practicalLens = getPracticalExampleLens(item.id);
  const learningModel = useMemo(
    () => (document ? createLearningModel(document.mainHtml) : null),
    [document],
  );
  const curatedCards = useMemo(
    () => (getQuestionBankCards(item.id) as BankCard[]).map(toStudyCard),
    [item.id],
  );
  const personalNotes = useMemo(() => getPersonalNotes(item.id), [item.id]);
  const isHome = item.id === "home";

  useEffect(() => {
    let cancelled = false;
    const loader = HANDBOOK_DOCUMENT_LOADERS[item.id];

    setDocument(null);
    setFailed(false);
    setIsTocOpen(false);

    if (!loader) {
      setFailed(true);
      return;
    }

    loader()
      .then((module) => {
        if (!cancelled) {
          setDocument(module.default);
          setLoadedItemId(item.id);
        }
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, [item.id]);

  useEffect(() => {
    const main = mainRef.current;

    if (!document || !main) return;

    const roots: Root[] = [];
    const mounts: HTMLElement[] = [];
    const restoredCards: Array<{ card: HTMLElement; html: string }> = [];

    main.querySelectorAll<HTMLElement>("pre.snippet-card").forEach((card) => {
      attachSnippetCopyButton(card, roots, mounts);
    });

    main.querySelectorAll<HTMLTableElement>("table").forEach((table) => {
      const headers = Array.from(table.querySelectorAll<HTMLTableCellElement>("tr:first-child th")).map((header) =>
        getPlainText(header),
      );

      if (!headers.length) return;

      table.classList.add("mobile-card-table");
      table.querySelectorAll<HTMLTableRowElement>("tr").forEach((row, rowIndex) => {
        if (rowIndex === 0) return;

        row.querySelectorAll<HTMLTableCellElement>("td").forEach((cell, cellIndex) => {
          const header = headers[cellIndex];
          if (header) cell.dataset.label = header;
        });
      });
    });

    main.querySelectorAll<HTMLElement>(".serial-card").forEach((card) => {
      if (shouldUpgradeChecklistCard(card)) {
        const html = card.innerHTML;
        const labelText = card.querySelector<HTMLElement>(".sc-label")?.textContent?.trim() ?? "CHECKLIST";
        const items = getChecklistItems(card);
        const label = window.document.createElement("span");
        const mount = window.document.createElement("div");

        label.className = "sc-label";
        label.textContent = labelText;
        mount.className = "serial-card-checklist-mount";
        card.dataset.copyText = getSerialCardText(card);
        card.replaceChildren(label, mount);

        const root = createRoot(mount);
        root.render(<ChecklistCard itemId={item.id} label={labelText} items={items} />);

        roots.push(root);
        mounts.push(mount);
        restoredCards.push({ card, html });
      }

      const mount = window.document.createElement("div");
      mount.className = "snippet-card-copy-mount serial-card-copy-mount";
      card.append(mount);

      const root = createRoot(mount);
      root.render(<SerialCardCopyButton card={card} />);

      roots.push(root);
      mounts.push(mount);
    });

    main.querySelectorAll<HTMLElement>(".serial-card, pre.snippet-card").forEach((card) => {
      if ((card.textContent?.trim().length ?? 0) < 360) return;
      if (card.querySelector(".learning-card-collapse-toggle")) return;

      const toggle = window.document.createElement("button");
      toggle.type = "button";
      toggle.className = "learning-card-collapse-toggle";
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "펼치기";
      card.classList.add("learning-collapsible-card", "is-collapsed");
      card.append(toggle);
      mounts.push(toggle);

      toggle.addEventListener("click", () => {
        const isCollapsed = card.classList.toggle("is-collapsed");
        toggle.setAttribute("aria-expanded", String(!isCollapsed));
        toggle.textContent = isCollapsed ? "펼치기" : "접기";
      });
    });

    main.querySelectorAll<HTMLElement>("code").forEach((code) => {
      if (!shouldAttachInlineCodeCopy(item.id, code)) return;

      const mount = window.document.createElement("span");
      mount.className = "inline-code-copy-mount";
      code.after(mount);

      const root = createRoot(mount);
      root.render(<InlineCodeCopyButton code={code} />);

      roots.push(root);
      mounts.push(mount);
    });

    return () => {
      roots.forEach((root) => root.unmount());
      mounts.forEach((mount) => mount.remove());
      restoredCards.forEach(({ card, html }) => {
        card.innerHTML = html;
        delete card.dataset.copyText;
      });
    };
  }, [document, item.id]);

  useEffect(() => {
    // 문서 전환 직후 이전 문서가 남아 있는 커밋에서 조기 호출되면
    // 앵커 이동 대상이 아직 DOM에 없다. 로드가 현재 항목과 일치할 때만 알린다.
    if (!document || loadedItemId !== item.id) return;

    onReady?.(item.id);
  }, [document, item.id, loadedItemId, onReady]);

  useEffect(() => {
    const main = mainRef.current;

    if (!document || !main || !onSelectHandbook) return;

    const handleClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const link = target?.closest<HTMLAnchorElement>("a[data-handbook-id]");
      const itemId = link?.dataset.handbookId;

      if (!itemId) return;

      event.preventDefault();
      onSelectHandbook(itemId);
    };

    main.addEventListener("click", handleClick);

    return () => {
      main.removeEventListener("click", handleClick);
    };
  }, [document, onSelectHandbook]);

  useEffect(() => {
    if (!isTocOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsTocOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isTocOpen]);

  if (failed) {
    return (
      <div className="handbook-empty" role="status">
        선택한 문서를 찾을 수 없습니다.
      </div>
    );
  }

  if (!document) {
    return (
      <div className="handbook-empty" role="status" aria-busy="true">
        문서를 불러오는 중입니다.
      </div>
    );
  }

  return (
    <div className="handbook-shell">
      <button
        type="button"
        className="handbook-mobile-toc-toggle"
        onClick={() => setIsTocOpen((isOpen) => !isOpen)}
        aria-expanded={isTocOpen}
        aria-controls="handbook-document-toc"
        aria-label={isTocOpen ? "목차 닫기" : "목차 열기"}
        title={isTocOpen ? "목차 닫기" : "목차 열기"}
      >
        {isTocOpen ? <X size={17} aria-hidden /> : <Menu size={17} aria-hidden />}
        <span>목차</span>
      </button>
      {isTocOpen ? (
        <button
          type="button"
          className="handbook-toc-backdrop"
          onClick={() => setIsTocOpen(false)}
          aria-label="목차 닫기"
        />
      ) : null}
      <nav
        id="handbook-document-toc"
        className={`handbook-toc${isTocOpen ? " is-open" : ""}`}
        aria-label={`${item.label} 목차`}
        onClick={(event) => {
          if ((event.target as HTMLElement).closest("a")) setIsTocOpen(false);
        }}
        dangerouslySetInnerHTML={{ __html: document.navHtml }}
      />
      <main
        ref={mainRef}
        className="handbook-main"
      >
        {learningModel?.heroHtml ? <div dangerouslySetInnerHTML={{ __html: learningModel.heroHtml }} /> : null}
        {isHome ? (
          <div className="handbook-learning-panels" aria-label="학습 현황">
            <StudyQueuePanel />
            <StudyDashboardPanel />
          </div>
        ) : null}
        {learningModel ? (
          <div className="handbook-learning-panels" aria-label="학습 도구">
            <LearningSearchPanel sections={learningModel.sections} />
            <StudyCardsPanel
              itemId={item.id}
              cards={curatedCards.length ? curatedCards : learningModel.studyCards}
              isCurated={curatedCards.length > 0}
            />
          </div>
        ) : null}
        <div dangerouslySetInnerHTML={{ __html: learningModel?.bodyHtml ?? document.mainHtml }} />
        {personalNotes.length ? (
          <section className="personal-notes" aria-labelledby="personal-notes-title">
            <div className="ch-head">
              <span className="ch-code">MY CASE</span>
              <h2 id="personal-notes-title">내 사례</h2>
            </div>
            <div className="personal-note-list">
              {personalNotes.map((note) => (
                <article key={note.id} className="personal-note">
                  <div className="personal-note-meta">
                    <span>{note.date}</span>
                    {note.sectionId ? <a href={`#${note.sectionId}`}>관련 섹션</a> : null}
                  </div>
                  <h3>{note.situation}</h3>
                  <dl>
                    <dt>판단</dt>
                    <dd>{note.judgment}</dd>
                    <dt>결과</dt>
                    <dd>{note.result}</dd>
                    {note.interviewLine ? (
                      <>
                        <dt>면접 답변</dt>
                        <dd>{note.interviewLine}</dd>
                      </>
                    ) : null}
                  </dl>
                </article>
              ))}
            </div>
          </section>
        ) : null}
        {practicalExample ? (
          <section className="handbook-practical-example" aria-labelledby="practical-example-title">
            <div className="ch-head">
              <span className="ch-code">PRACTICE</span>
              <h2 id="practical-example-title">실무 예시</h2>
            </div>
            <p className="lede">{practicalExample.scenario}</p>
            <div className="practical-example-grid">
              <div className="practical-example-block" aria-labelledby="practical-constraints-title">
                <h3 id="practical-constraints-title">현장 조건</h3>
                <ul>
                  {practicalLens.constraints.map((constraint) => (
                    <li key={constraint}>{constraint}</li>
                  ))}
                </ul>
              </div>
              <div className="practical-example-block" aria-labelledby="practical-actions-title">
                <h3 id="practical-actions-title">실행 절차</h3>
                <ol>
                  {practicalExample.actions.map((action) => (
                    <li key={action}>{action}</li>
                  ))}
                </ol>
              </div>
              <div className="practical-example-block" aria-labelledby="practical-artifacts-title">
                <h3 id="practical-artifacts-title">검증 증거</h3>
                <ul>
                  {practicalLens.artifacts.map((artifact) => (
                    <li key={artifact}>{artifact}</li>
                  ))}
                </ul>
              </div>
              <div className="practical-example-block" aria-labelledby="practical-failure-title">
                <h3 id="practical-failure-title">실패 신호</h3>
                <ul>
                  {practicalLens.failureSignals.map((failureSignal) => (
                    <li key={failureSignal}>{failureSignal}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="callout">
              <span className="co-label">완료 기준</span>
              <p>{practicalExample.outcome}</p>
            </div>
            {practicalExample.difficulty ||
            practicalExample.estimatedTime ||
            practicalExample.prerequisites?.length ||
            practicalExample.dataset ||
            practicalExample.failureFixtures?.length ||
            practicalExample.artifactsToSubmit?.length ||
            practicalExample.passCriteria?.length ||
            practicalExample.rubric?.length ? (
              <div className="practical-example-training" aria-labelledby="practical-training-title">
                <h3 id="practical-training-title">훈련 기준</h3>
                <div className="practical-example-grid">
                  {practicalExample.difficulty || practicalExample.estimatedTime || practicalExample.dataset ? (
                    <div className="practical-example-block">
                      <h3>실습 범위</h3>
                      <ul>
                        {practicalExample.difficulty ? <li>난이도: {getDifficultyLabel(practicalExample.difficulty)}</li> : null}
                        {practicalExample.estimatedTime ? <li>예상 시간: {practicalExample.estimatedTime}</li> : null}
                        {practicalExample.dataset ? <li>데이터셋: {practicalExample.dataset}</li> : null}
                      </ul>
                    </div>
                  ) : null}
                  {practicalExample.prerequisites?.length ? (
                    <div className="practical-example-block">
                      <h3>선행 조건</h3>
                      <ul>
                        {practicalExample.prerequisites.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  {practicalExample.failureFixtures?.length ? (
                    <div className="practical-example-block">
                      <h3>실패 Fixture</h3>
                      <ul>
                        {practicalExample.failureFixtures.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  {practicalExample.artifactsToSubmit?.length ? (
                    <div className="practical-example-block">
                      <h3>제출 산출물</h3>
                      <ul>
                        {practicalExample.artifactsToSubmit.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  {practicalExample.passCriteria?.length ? (
                    <div className="practical-example-block">
                      <h3>통과 기준</h3>
                      <ul>
                        {practicalExample.passCriteria.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  {practicalExample.rubric?.length ? (
                    <div className="practical-example-block">
                      <h3>리뷰 루브릭</h3>
                      <ul>
                        {practicalExample.rubric.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}
            <div className="practical-example-review">
              <span className="co-label">리뷰 질문</span>
              <ul>
                {practicalLens.reviewQuestions.map((question) => (
                  <li key={question}>{question}</li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}
      </main>
    </div>
  );
}
