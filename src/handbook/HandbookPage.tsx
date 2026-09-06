import { createRoot, type Root } from "react-dom/client";
import { Menu, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChecklistCard, type ChecklistItem } from "./ChecklistCard";
import { HANDBOOK_DOCUMENT_LOADERS } from "./documentLoaders";
import { InlineCodeCopyButton } from "./InlineCodeCopyButton";
import { getPersonalNotes } from "./personalNotes.mjs";
import { PRACTICAL_EXAMPLES, getPracticalExampleLens } from "./practicalExamples";
import { SerialCardCopyButton } from "./SerialCardCopyButton";
import type { HandbookDocumentContent } from "./types";
import "./handbook.css";

type HandbookItem = {
  id: string;
  label: string;
  kind: string;
  pageType?: string;
};

type HandbookPageProps = {
  item: HandbookItem;
  onReady?: (itemId: string) => void;
  onSelectHandbook?: (itemId: string) => void;
};

// 홈 화면은 남은 기간 계획과 메뉴 바로가기 섹션만 노출한다. 나머지 홈 콘텐츠는 소스에 남겨두고 렌더에서만 제외한다.
function extractHomeSections(mainHtml: string) {
  const sections = mainHtml.match(/<section\b[\s\S]*?<\/section>/g) ?? [];
  const yearPlan = sections.find((section) => section.includes('id="year-plan"')) ?? "";
  const standard = sections.find((section) => section.includes('id="standard"')) ?? "";
  const shortcut = sections.find((section) => section.includes("shortcut-grid")) ?? "";
  return yearPlan + standard + shortcut;
}

function getPlainText(element: Element | null) {
  return element?.textContent?.replace(/\s+/g, " ").trim() ?? "";
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
  const personalNotes = useMemo(() => getPersonalNotes(item.id), [item.id]);
  const isHome = item.id === "home";
  const homeShortcutHtml = useMemo(
    () => (isHome && document ? extractHomeSections(document.mainHtml) : ""),
    [isHome, document],
  );
  const ReactPage = document?.ReactPage;

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
    <div className={`handbook-shell${isHome ? " is-home" : ""}`}>
      {!isHome ? (
        <>
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
        </>
      ) : null}
      <main
        ref={mainRef}
        className="handbook-main"
      >
        {ReactPage ? <ReactPage /> : null}
        {ReactPage ? null : (
          <div
            dangerouslySetInnerHTML={{
              __html: isHome ? homeShortcutHtml : document.mainHtml,
            }}
          />
        )}
        {!isHome && personalNotes.length ? (
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
        {!isHome && practicalExample ? (
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
