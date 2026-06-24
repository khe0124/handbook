import { createRoot, type Root } from "react-dom/client";
import { useEffect, useRef, useState } from "react";
import { HANDBOOK_DOCUMENT_LOADERS } from "./documentLoaders";
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
};

export function HandbookPage({ item }: HandbookPageProps) {
  const [document, setDocument] = useState<HandbookDocumentContent | null>(null);
  const [failed, setFailed] = useState(false);
  const mainRef = useRef<HTMLElement | null>(null);

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

    return () => {
      roots.forEach((root) => root.unmount());
      mounts.forEach((mount) => mount.remove());
    };
  }, [document]);

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
        dangerouslySetInnerHTML={{ __html: document.mainHtml }}
      />
    </div>
  );
}
