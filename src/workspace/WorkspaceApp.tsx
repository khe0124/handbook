import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { resolveWorkspace } from "./routes.mjs";
import { BrandWorkspace } from "./brand/BrandWorkspace";
import { SizeReference } from "./brand/SizeReference";
import { WorksheetPage } from "./brand/worksheets/WorksheetPage";
import { questionnaire } from "./brand/worksheets/questionnaire.mjs";
import { designBrief } from "./brand/worksheets/designBrief.mjs";
import { CorePage } from "./core/CorePage";
import { BrandingIndex } from "./brand/BrandingIndex";
import { BrandingDeliverables, BrandingGuide } from "./brand/BrandingDocuments";
import { ProductsPage } from "./brand/products/ProductsPage";
import { legacyBrandingDestination } from "./brand/navigation.mjs";
import { MoneyWorkspace } from "./money/MoneyWorkspace";
import { resolveMoneyPage } from "./money/navigation.mjs";
import { EnglishWorkspace } from "./english/EnglishWorkspace";
import { KnouWorkspace } from "./knou/KnouWorkspace";
import "./workspace.css";

const DevHandbook = lazy(() => import("../App"));

export default function WorkspaceApp() {
  const [pathname, setPathname] = useState(() => window.location.pathname);
  const previousPath = useRef(pathname);
  const route = resolveWorkspace(pathname);

  useEffect(() => {
    const sync = () => {
      const destination = legacyBrandingDestination(window.location.pathname, window.location.hash);
      if (destination) window.history.replaceState(null, "", destination);
      setPathname(window.location.pathname);
    };
    const navigate = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[data-workspace-link]") : null;
      if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target === "_blank") return;
      event.preventDefault();
      if (window.location.pathname === link.pathname) {
        if (link.hash) window.location.hash = link.hash;
        return;
      }
      window.history.pushState(null, "", link.href);
      sync();
    };
    window.addEventListener("popstate", sync);
    window.addEventListener("hashchange", sync);
    document.addEventListener("click", navigate);
    sync();
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener("hashchange", sync);
      document.removeEventListener("click", navigate);
    };
  }, []);

  useEffect(() => {
    document.title = route === "money" ? `${resolveMoneyPage(pathname)?.lesson?.[1] || "재테크 기초"} — Money Notes` : route === "english" ? `${pathname.split("/")[2] || "Word"} — English Notes` : route === "knou" ? "방통대 — 2026학년도 2학기" : route === "core" ? "Core — Design & Development" : route === "dev" ? "Dev Handbook" : route === "home" ? "Dev / Brand / 재테크 / English / 방통대 — Workspace" : route === "not-found" ? "페이지를 찾을 수 없습니다" : `${route === "products" ? "상품과 가격" : route === "deliverables" ? "산출물 목록" : route === "guide" ? "가이드와 인계" : route === "questionnaire" ? "사전설문" : route === "design-brief" ? "Design Brief" : route === "specs" ? "인쇄 / Web 규격" : route === "web" ? "Web" : "Branding"} — Brand Workspace`;
    if (pathname !== previousPath.current) {
      window.scrollTo({ top: 0, behavior: "instant" });
      document.querySelector<HTMLElement>("[data-route-heading]")?.focus({ preventScroll: true });
      previousPath.current = pathname;
    }
    if (window.location.hash) document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ behavior: "instant" });
  }, [pathname, route]);

  if (route === "dev") return <Suspense fallback={<main className="workspace-loading" role="status">Dev Handbook을 불러오는 중입니다.</main>}><DevHandbook /></Suspense>;
  if (route === "core") return <CorePage />;
  if (route === "money") return <MoneyWorkspace pathname={pathname} />;
  if (route === "english") return <EnglishWorkspace pathname={pathname} />;
  if (route === "knou") return <KnouWorkspace pathname={pathname} />;
  if (route === "branding") return <BrandingIndex />;
  if (route === "web") return <BrandWorkspace area="web" />;
  if (route === "products") return <ProductsPage />;
  if (route === "deliverables") return <BrandingDeliverables />;
  if (route === "guide") return <BrandingGuide />;
  if (route === "specs") return <SizeReference />;
  if (route === "questionnaire" || route === "design-brief") return <WorksheetPage key={route} doc={route === "questionnaire" ? questionnaire : designBrief} />;

  return (
    <div className="workspace-landing">
      <header className="workspace-masthead"><span>HAEUN / WORKSPACE</span><span>DESIGN · DEVELOPMENT · MONEY · ENGLISH · KNOU</span></header>
      <main className="workspace-entry">
        <p className="workspace-eyebrow">LEARN. MAKE. MANAGE.</p>
        {route === "not-found" && <h1 tabIndex={-1} data-route-heading>페이지를 찾을 수 없습니다.</h1>}
        <p className="workspace-intro">{route === "not-found" ? "주소를 확인하거나 아래에서 작업 공간을 선택해 주세요." : "개발의 깊이, 브랜드의 완성도, 내 자산과 언어를 이해하는 힘을 쌓는 공간."}</p>
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
          <a className="workspace-choice workspace-choice-money" href="/money" data-workspace-link>
            <span className="workspace-choice-index">03 / FINANCIAL LITERACY</span>
            <span className="workspace-choice-title">재테크 <ArrowUpRight aria-hidden /></span>
            <span>내 자산을 이해하는 기초 학습</span>
            <span className="workspace-choice-detail">계좌 · 절세 · 경제 · 투자자산</span>
          </a>
          <a className="workspace-choice workspace-choice-english" href="/english" data-workspace-link>
            <span className="workspace-choice-index">04 / LANGUAGE PRACTICE</span>
            <span className="workspace-choice-title">English <ArrowUpRight aria-hidden /></span>
            <span>읽고, 쓰고, 말하기 위한 영어 학습</span>
            <span className="workspace-choice-detail">Word · Writing · Speaking</span>
          </a>
          <a className="workspace-choice workspace-choice-knou" href="/knou" data-workspace-link>
            <span className="workspace-choice-index">05 / COMPUTER SCIENCE</span>
            <span className="workspace-choice-title">방통대 <ArrowUpRight aria-hidden /></span>
            <span>2026학년도 2학기 학습 공간</span>
            <span className="workspace-choice-detail">6개 과목 · 수업 · 과제 · 시험 일정</span>
          </a>
        </nav>
        <p className="workspace-core-link"><a href="/core" data-workspace-link>Core — 디자인과 개발을 연결하는 나의 방향 <ArrowUpRight size={15} aria-hidden /></a></p>
      </main>
      <footer className="workspace-entry-footer"><span>생각을 정리하고, 실제로 만듭니다.</span><span>LEARN. BUILD. DELIVER.</span></footer>
    </div>
  );
}
