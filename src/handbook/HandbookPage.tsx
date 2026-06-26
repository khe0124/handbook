import { createRoot, type Root } from "react-dom/client";
import { useEffect, useRef, useState } from "react";
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

export function HandbookPage({ item, onReady }: HandbookPageProps) {
  const [document, setDocument] = useState<HandbookDocumentContent | null>(null);
  const [failed, setFailed] = useState(false);
  const mainRef = useRef<HTMLElement | null>(null);
  const practicalExample = PRACTICAL_EXAMPLES[item.id];
  const practicalLens = getPracticalExampleLens(item.id);

  useEffect(() => {
    let cancelled = false;
    const loader = HANDBOOK_DOCUMENT_LOADERS[item.id];

    setDocument(null);
    setFailed(false);

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

    main.querySelectorAll<HTMLElement>(".serial-card").forEach((card) => {
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
    };
  }, [document, item.id]);

  useEffect(() => {
    if (!document) return;

    onReady?.(item.id);
  }, [document, item.id, onReady]);

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
      <nav
        className="handbook-toc"
        aria-label={`${item.label} 목차`}
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
