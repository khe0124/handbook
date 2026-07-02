import { Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

type SearchIndexEntry = {
  docId: string;
  docLabel: string;
  groupLabel: string;
  sectionId: string;
  code: string;
  title: string;
  summary: string;
};

type SearchIndexModule = {
  SEARCH_INDEX: SearchIndexEntry[];
};

type GlobalSearchProps = {
  onSelectSection: (docId: string, sectionId: string) => void;
};

const MAX_RESULTS = 20;

function scoreEntry(entry: SearchIndexEntry, tokens: string[]) {
  const title = entry.title.toLowerCase();
  const code = entry.code.toLowerCase();
  const docLabel = entry.docLabel.toLowerCase();
  const summary = entry.summary.toLowerCase();
  let score = 0;

  for (const token of tokens) {
    if (title.includes(token)) {
      score += 3;
      continue;
    }

    if (code.includes(token) || docLabel.includes(token)) {
      score += 2;
      continue;
    }

    if (summary.includes(token)) {
      score += 1;
      continue;
    }

    return 0;
  }

  return score;
}

function searchIndexEntries(index: SearchIndexEntry[], query: string) {
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);

  if (!tokens.length) {
    return [];
  }

  return index
    .map((entry) => ({ entry, score: scoreEntry(entry, tokens) }))
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_RESULTS)
    .map((result) => result.entry);
}

export function GlobalSearch({ onSelectSection }: GlobalSearchProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState<SearchIndexEntry[] | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen || index) {
      return;
    }

    let cancelled = false;

    import("./searchIndex.mjs")
      .then((module: SearchIndexModule) => {
        if (!cancelled) {
          setIndex(module.SEARCH_INDEX);
        }
      })
      .catch(() => {
        // 인덱스 로드 실패 시 검색만 비활성화되고 읽기는 계속돼야 한다.
      });

    return () => {
      cancelled = true;
    };
  }, [index, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("mousedown", closeOnOutsideClick);
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      window.removeEventListener("mousedown", closeOnOutsideClick);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  const results = useMemo(
    () => (index ? searchIndexEntries(index, query) : []),
    [index, query],
  );

  const handleSelect = (entry: SearchIndexEntry) => {
    setIsOpen(false);
    setQuery("");
    onSelectSection(entry.docId, entry.sectionId);
  };

  return (
    <div className="global-search" ref={containerRef}>
      <label className="global-search-input">
        <Search size={15} aria-hidden />
        <span className="sr-only">전체 핸드북에서 검색</span>
        <input
          type="search"
          value={query}
          placeholder="전체 문서 검색"
          onFocus={() => setIsOpen(true)}
          onChange={(event) => {
            setQuery(event.target.value);
            setIsOpen(true);
          }}
        />
      </label>
      {isOpen && query.trim() ? (
        <div className="global-search-panel" role="listbox" aria-label="검색 결과">
          {!index ? <p className="global-search-empty">검색 인덱스를 불러오는 중입니다.</p> : null}
          {index && !results.length ? (
            <p className="global-search-empty">결과가 없습니다.</p>
          ) : null}
          {results.map((entry) => (
            <button
              key={`${entry.docId}:${entry.sectionId}`}
              type="button"
              className="global-search-result"
              role="option"
              aria-selected="false"
              onClick={() => handleSelect(entry)}
            >
              <span className="global-search-result-path">
                {entry.groupLabel} · {entry.docLabel}
              </span>
              <strong>
                {entry.code ? `${entry.code} · ` : ""}
                {entry.title}
              </strong>
              {entry.summary ? <span className="global-search-result-summary">{entry.summary}</span> : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
