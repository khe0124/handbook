import { ArrowLeft, ArrowRight, ArrowUp, ChevronDown, Menu, X } from "lucide-react";
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

const getGroupKeyForItemId = (itemId: string) =>
  groups.find((group) => group.items.some((item) => item.id === itemId))?.key ?? groups[0]?.key ?? "";

export default function App() {
  const [activeId, setActiveId] = useState(DEFAULT_HANDBOOK_ID);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMobileGroupKeys, setOpenMobileGroupKeys] = useState<string[]>([
    getGroupKeyForItemId(DEFAULT_HANDBOOK_ID),
  ]);

  const activeItem = useMemo(
    () => items.find((item) => item.id === activeId) ?? items[0],
    [activeId],
  );
  const activeGroupKey = useMemo(() => getGroupKeyForItemId(activeItem.id), [activeItem.id]);
  const activeIndex = useMemo(
    () => items.findIndex((item) => item.id === activeItem.id),
    [activeItem.id],
  );
  const previousItem = activeIndex > 0 ? items[activeIndex - 1] : null;
  const nextItem = activeIndex >= 0 && activeIndex < items.length - 1 ? items[activeIndex + 1] : null;
  const homeItem = useMemo(
    () => items.find((item) => item.id === DEFAULT_HANDBOOK_ID) ?? items[0],
    [],
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

  useEffect(() => {
    if (!mobileMenuOpen) {
      return;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    const scroller = document.documentElement;
    const previousOverflow = scroller.style.overflow;
    scroller.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      scroller.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    setOpenMobileGroupKeys((currentKeys) => {
      if (!activeGroupKey || currentKeys.includes(activeGroupKey)) {
        return currentKeys;
      }

      return [...currentKeys, activeGroupKey];
    });
  }, [activeGroupKey]);

  const handleScrollTop = () => {
    const scrollBehavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth";

    window.scrollTo({ top: 0, behavior: scrollBehavior });
  };

  const handleSelectItem = (item: HandbookItem) => {
    setActiveId(item.id);
    setMobileMenuOpen(false);
    handleScrollTop();
  };

  const handleSelectHome = () => {
    handleSelectItem(homeItem);
  };

  const handleToggleMobileGroup = (groupKey: string) => {
    setOpenMobileGroupKeys((currentKeys) =>
      currentKeys.includes(groupKey)
        ? currentKeys.filter((key) => key !== groupKey)
        : [...currentKeys, groupKey],
    );
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1>
            <button
              type="button"
              className="home-title-button"
              onClick={handleSelectHome}
              aria-label="홈으로 이동"
              title="홈으로 이동"
            >
              Dev Handbook
            </button>
          </h1>
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
                      onClick={() => handleSelectItem(item)}
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

      {mobileMenuOpen ? (
        <button
          type="button"
          className="mobile-menu-backdrop"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="전체 메뉴 닫기"
          tabIndex={-1}
        />
      ) : null}

      <div className="bottom-doc-nav" role="navigation" aria-label="문서 이동">
        {mobileMenuOpen ? (
          <div className="mobile-menu-sheet" id="mobile-handbook-menu">
            <div className="mobile-menu-sheet-header">
              <span>전체 메뉴</span>
              <button
                type="button"
                className="mobile-menu-close"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="전체 메뉴 닫기"
                title="전체 메뉴 닫기"
              >
                <X size={18} aria-hidden />
              </button>
            </div>
            <div className="mobile-menu-groups">
              {groups.map((group) => {
                const groupOpen = openMobileGroupKeys.includes(group.key);
                const groupActive = group.key === activeGroupKey;
                const panelId = `mobile-menu-group-${group.key}`;

                return (
                  <section className="mobile-menu-group" key={group.key}>
                    <h2>
                      <button
                        type="button"
                        className="mobile-menu-group-trigger"
                        onClick={() => handleToggleMobileGroup(group.key)}
                        aria-expanded={groupOpen}
                        aria-controls={panelId}
                        data-active={groupActive ? "true" : undefined}
                      >
                        <span>{group.label}</span>
                        <ChevronDown size={16} aria-hidden />
                      </button>
                    </h2>
                    <div className="mobile-menu-items" id={panelId} hidden={!groupOpen}>
                      {group.items.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          className="mobile-menu-item"
                          onClick={() => handleSelectItem(item)}
                          aria-current={activeItem.id === item.id ? "page" : undefined}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
        ) : null}
        <div className="bottom-doc-nav-inner">
          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-handbook-menu"
            aria-label={mobileMenuOpen ? "전체 메뉴 닫기" : "전체 메뉴 열기"}
            title={mobileMenuOpen ? "전체 메뉴 닫기" : "전체 메뉴 열기"}
          >
            {mobileMenuOpen ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
          </button>

          <button
            type="button"
            className="doc-nav-button"
            onClick={() => previousItem && handleSelectItem(previousItem)}
            disabled={!previousItem}
            aria-label={previousItem ? `이전 항목: ${previousItem.label}` : "이전 항목 없음"}
            title={previousItem ? `이전 항목: ${previousItem.label}` : "이전 항목 없음"}
          >
            <ArrowLeft size={17} aria-hidden />
            <span className="doc-nav-copy">
              <span className="doc-nav-kicker">이전</span>
              <span className="doc-nav-label">{previousItem?.label ?? "없음"}</span>
            </span>
          </button>

          <button
            type="button"
            className="scroll-top-button"
            onClick={handleScrollTop}
            disabled={!showScrollTop}
            aria-label="맨 위로 이동"
            title="맨 위로 이동"
          >
            <ArrowUp size={18} aria-hidden />
            <span>Top</span>
          </button>

          <button
            type="button"
            className="doc-nav-button doc-nav-button-next"
            onClick={() => nextItem && handleSelectItem(nextItem)}
            disabled={!nextItem}
            aria-label={nextItem ? `다음 항목: ${nextItem.label}` : "다음 항목 없음"}
            title={nextItem ? `다음 항목: ${nextItem.label}` : "다음 항목 없음"}
          >
            <span className="doc-nav-copy">
              <span className="doc-nav-kicker">다음</span>
              <span className="doc-nav-label">{nextItem?.label ?? "없음"}</span>
            </span>
            <ArrowRight size={17} aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}
