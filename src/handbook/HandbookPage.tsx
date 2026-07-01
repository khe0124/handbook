import { createRoot, type Root } from "react-dom/client";
import { CheckCircle2, Eye, Menu, RotateCcw, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChecklistCard, type ChecklistItem } from "./ChecklistCard";
import { HANDBOOK_DOCUMENT_LOADERS } from "./documentLoaders";
import { InlineCodeCopyButton } from "./InlineCodeCopyButton";
import { PRACTICAL_EXAMPLES, getPracticalExampleLens } from "./practicalExamples";
import { SerialCardCopyButton } from "./SerialCardCopyButton";
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

const learningFilters: Array<{ id: LearningFilter; label: string }> = [
  { id: "all", label: "전체" },
  { id: "concept", label: "개념" },
  { id: "checklist", label: "체크리스트" },
  { id: "interview", label: "면접 답변" },
  { id: "failure", label: "실패 신호" },
  { id: "artifact", label: "산출물" },
];

const studyCardStoragePrefix = "dev-handbook:study-card:";

function getStudyCardStorageKey(itemId: string, cardId: string) {
  return `${studyCardStoragePrefix}${itemId}:${cardId}`;
}

function getStoredMasteredCardIds(itemId: string, cards: StudyCard[]) {
  if (typeof window === "undefined") return new Set<string>();

  return new Set(
    cards
      .filter((card) => {
        try {
          return window.localStorage.getItem(getStudyCardStorageKey(itemId, card.id)) === "mastered";
        } catch {
          return false;
        }
      })
      .map((card) => card.id),
  );
}

function setStoredMasteredCard(itemId: string, cardId: string, isMastered: boolean) {
  try {
    const key = getStudyCardStorageKey(itemId, cardId);
    if (isMastered) {
      window.localStorage.setItem(key, "mastered");
    } else {
      window.localStorage.removeItem(key);
    }
  } catch {
    // Learning state should not block reading when storage is unavailable.
  }
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

function StudyCardsPanel({ itemId, cards }: { itemId: string; cards: StudyCard[] }) {
  const [openCardIds, setOpenCardIds] = useState<Set<string>>(() => new Set());
  const [masteredCardIds, setMasteredCardIds] = useState<Set<string>>(() => getStoredMasteredCardIds(itemId, cards));

  useEffect(() => {
    setOpenCardIds(new Set());
    setMasteredCardIds(getStoredMasteredCardIds(itemId, cards));
  }, [cards, itemId]);

  const masteredCount = cards.filter((card) => masteredCardIds.has(card.id)).length;

  const toggleAnswer = (cardId: string) => {
    setOpenCardIds((currentIds) => {
      const nextIds = new Set(currentIds);
      if (nextIds.has(cardId)) nextIds.delete(cardId);
      else nextIds.add(cardId);
      return nextIds;
    });
  };

  const toggleMastered = (cardId: string) => {
    setMasteredCardIds((currentIds) => {
      const nextIds = new Set(currentIds);
      const isMastered = !nextIds.has(cardId);

      if (isMastered) nextIds.add(cardId);
      else nextIds.delete(cardId);

      setStoredMasteredCard(itemId, cardId, isMastered);
      return nextIds;
    });
  };

  const resetMasteredCards = () => {
    cards.forEach((card) => setStoredMasteredCard(itemId, card.id, false));
    setMasteredCardIds(new Set());
  };

  if (!cards.length) return null;

  return (
    <section className="handbook-study-cards" aria-labelledby="handbook-study-cards-title">
      <div className="learning-panel-head">
        <div>
          <span className="learning-kicker">RECALL CARDS</span>
          <h2 id="handbook-study-cards-title">암기 카드</h2>
        </div>
        <button type="button" className="learning-reset-button" onClick={resetMasteredCards}>
          <RotateCcw size={14} aria-hidden />
          초기화
        </button>
      </div>
      <p className="learning-progress">
        {cards.length}개 중 {masteredCount}개 외움
      </p>
      <div className="study-card-list">
        {cards.map((card) => {
          const isOpen = openCardIds.has(card.id);
          const isMastered = masteredCardIds.has(card.id);

          return (
            <article key={card.id} className="study-card" data-mastered={isMastered ? "true" : undefined}>
              <div className="study-card-meta">
                <span>{card.label}</span>
                <a href={`#${card.sectionId}`}>원문 보기</a>
              </div>
              <h3>{card.question}</h3>
              {isOpen ? <p className="study-card-answer">{card.answer}</p> : null}
              <div className="study-card-actions">
                <button type="button" onClick={() => toggleAnswer(card.id)} aria-expanded={isOpen}>
                  <Eye size={14} aria-hidden />
                  {isOpen ? "답 숨기기" : "답 보기"}
                </button>
                <button type="button" onClick={() => toggleMastered(card.id)} aria-pressed={isMastered}>
                  <CheckCircle2 size={14} aria-hidden />
                  {isMastered ? "다시 보기" : "외웠음"}
                </button>
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
  const [failed, setFailed] = useState(false);
  const [isTocOpen, setIsTocOpen] = useState(false);
  const mainRef = useRef<HTMLElement | null>(null);
  const practicalExample = PRACTICAL_EXAMPLES[item.id];
  const practicalLens = getPracticalExampleLens(item.id);
  const learningModel = useMemo(
    () => (document ? createLearningModel(document.mainHtml) : null),
    [document],
  );

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
        if (!cancelled) setDocument(module.default);
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
    if (!document) return;

    onReady?.(item.id);
  }, [document, item.id, onReady]);

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
        {learningModel ? (
          <div className="handbook-learning-panels" aria-label="학습 도구">
            <LearningSearchPanel sections={learningModel.sections} />
            <StudyCardsPanel itemId={item.id} cards={learningModel.studyCards} />
          </div>
        ) : null}
        <div dangerouslySetInnerHTML={{ __html: learningModel?.bodyHtml ?? document.mainHtml }} />
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
