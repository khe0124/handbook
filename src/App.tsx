import { ArrowUp } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  DEFAULT_HANDBOOK_ID,
  HANDBOOK_GROUPS,
  HANDBOOK_ITEMS,
} from "./handbook/catalog.mjs";
import { HandbookPage } from "./handbook/HandbookPage";
import "./App.css";

type HandbookItem = {
  id: string;
  label: string;
  kind: string;
  file: string;
};

type HandbookGroup = {
  key: string;
  label: string;
  items: HandbookItem[];
};

const groups = HANDBOOK_GROUPS as HandbookGroup[];
const items = HANDBOOK_ITEMS as HandbookItem[];

export default function App() {
  const [activeId, setActiveId] = useState(DEFAULT_HANDBOOK_ID);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const activeItem = useMemo(
    () => items.find((item) => item.id === activeId) ?? items[0],
    [activeId],
  );

  useEffect(() => {
    const syncScrollState = () => {
      setShowScrollTop(window.scrollY > 320);
    };

    syncScrollState();
    window.addEventListener("scroll", syncScrollState, { passive: true });

    return () => {
      window.removeEventListener("scroll", syncScrollState);
    };
  }, []);

  const handleScrollTop = () => {
    const scrollBehavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth";

    window.scrollTo({ top: 0, behavior: scrollBehavior });
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1>Dev Handbook</h1>
          <p>
            {activeItem.kind} · {activeItem.label}
          </p>
        </div>
        <nav aria-label="문서 분류" className="menubar">
          {groups.map((group) => {
            const groupActive = group.items.some((item) => item.id === activeItem.id);

            return (
              <div className="menu" key={group.key}>
                <button
                  type="button"
                  className="menu-trigger"
                  aria-haspopup="true"
                  data-active={groupActive ? "true" : undefined}
                >
                  {group.label} <span className="caret" aria-hidden>▾</span>
                </button>
                <div className="menu-panel" role="menu">
                  {group.items.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      role="menuitem"
                      className="menu-item"
                      onClick={() => setActiveId(item.id)}
                      aria-current={activeItem.id === item.id ? "page" : undefined}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </nav>
      </header>

      <HandbookPage item={activeItem} />

      {showScrollTop ? (
        <button
          type="button"
          className="scroll-top-button"
          onClick={handleScrollTop}
          aria-label="맨 위로 이동"
          title="맨 위로 이동"
        >
          <ArrowUp size={20} aria-hidden />
        </button>
      ) : null}
    </div>
  );
}
