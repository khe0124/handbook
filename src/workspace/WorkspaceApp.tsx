import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { resolveWorkspace } from "./routes.mjs";
import { BrandWorkspace } from "./brand/BrandWorkspace";
import "./workspace.css";

const DevHandbook = lazy(() => import("../App"));

export default function WorkspaceApp() {
  const [pathname, setPathname] = useState(() => window.location.pathname);
  const previousPath = useRef(pathname);
  const route = resolveWorkspace(pathname);

  useEffect(() => {
    const sync = () => setPathname(window.location.pathname);
    const navigate = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[data-workspace-link]") : null;
      if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target === "_blank") return;
      event.preventDefault();
      if (window.location.pathname === link.pathname) return;
      window.history.pushState(null, "", link.href);
      sync();
    };
    window.addEventListener("popstate", sync);
    document.addEventListener("click", navigate);
    return () => {
      window.removeEventListener("popstate", sync);
      document.removeEventListener("click", navigate);
    };
  }, []);

  useEffect(() => {
    document.title = route === "dev" ? "Dev Handbook" : route === "home" ? "Dev / Brand — Workspace" : route === "not-found" ? "페이지를 찾을 수 없습니다" : `${route === "web" ? "Web" : "Branding"} — Brand Workspace`;
    if (pathname !== previousPath.current) {
      window.scrollTo({ top: 0, behavior: "instant" });
      document.querySelector<HTMLElement>("[data-route-heading]")?.focus({ preventScroll: true });
      previousPath.current = pathname;
    }
  }, [pathname, route]);

  if (route === "dev") return <Suspense fallback={<main className="workspace-loading" role="status">Dev Handbook을 불러오는 중입니다.</main>}><DevHandbook /></Suspense>;
  if (route === "branding" || route === "web") return <BrandWorkspace key={route} area={route} />;

  return (
    <div className="workspace-landing">
      <header className="workspace-masthead"><span>HAEUN / WORKSPACE</span><span>DESIGN & DEVELOPMENT</span></header>
      <main className="workspace-entry">
        <p className="workspace-eyebrow">TWO WAYS TO MAKE.</p>
        <h1 tabIndex={-1} data-route-heading>{route === "not-found" ? "페이지를 찾을 수 없습니다." : <>오늘은 무엇을<br />만들어 볼까요?</>}</h1>
        <p className="workspace-intro">{route === "not-found" ? "주소를 확인하거나 아래에서 작업 공간을 선택해 주세요." : "개발의 깊이를 쌓는 공간과, 브랜드를 만들고 전달하는 공간."}</p>
        <nav className="workspace-choices" aria-label="작업 공간 선택">
          <a className="workspace-choice workspace-choice-dev" href="/dev" data-workspace-link>
            <span className="workspace-choice-index">01 / ENGINEERING</span>
            <span className="workspace-choice-title">Dev <ArrowUpRight aria-hidden /></span>
            <span>개발과 커리어를 위한 핸드북</span>
            <span className="workspace-choice-detail">기술 문서 · 로드맵 · 면접 · 커리어</span>
          </a>
          <a className="workspace-choice workspace-choice-brand" href="/brand" data-workspace-link>
            <span className="workspace-choice-index">02 / INDEPENDENT PRACTICE</span>
            <span className="workspace-choice-title">Brand <ArrowUpRight aria-hidden /></span>
            <span>브랜딩 프리랜싱을 위한 작업실</span>
            <span className="workspace-choice-detail">Branding · Web · 브리프 · 납품</span>
          </a>
        </nav>
      </main>
      <footer className="workspace-entry-footer"><span>생각을 정리하고, 실제로 만듭니다.</span><span>LEARN. BUILD. DELIVER.</span></footer>
    </div>
  );
}
