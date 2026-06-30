import { createRoot, type Root } from "react-dom/client";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
};

function shouldAttachInlineCodeCopy(itemId: string, code: HTMLElement) {
  const text = code.textContent?.trim() ?? "";

  return (
    itemId === "practice-cheat-sheets" &&
    text.length > 0 &&
    text.length <= 90 &&
    !code.closest("pre") &&
    !code.closest(".serial-card") &&
    !code.nextElementSibling?.classList.contains("inline-code-copy-mount")
  );
}

function getSerialCardText(card: HTMLElement) {
  return card.textContent?.replace(/\u00a0/g, " ").trim() ?? "";
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

export function HandbookPage({ item, onReady }: HandbookPageProps) {
  const [document, setDocument] = useState<HandbookDocumentContent | null>(null);
  const [failed, setFailed] = useState(false);
  const [isTocOpen, setIsTocOpen] = useState(false);
  const mainRef = useRef<HTMLElement | null>(null);
  const practicalExample = PRACTICAL_EXAMPLES[item.id];
  const practicalLens = getPracticalExampleLens(item.id);

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
      mount.className = "serial-card-copy-mount";
      card.append(mount);

      const root = createRoot(mount);
      root.render(<SerialCardCopyButton card={card} />);

      roots.push(root);
      mounts.push(mount);
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
        <div dangerouslySetInnerHTML={{ __html: document.mainHtml }} />
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
