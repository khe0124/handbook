import type { ReactNode } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { BrandingMenu } from "./BrandingMenu";

export function BrandFrame({ area, children }: { area: "core" | "branding" | "web" | "specs" | "questionnaire" | "design-brief" | "products" | "deliverables" | "guide"; children: ReactNode }) {
  return (
    <div className="brand-workspace">
      <a className="brand-skip" href="#brand-content">본문 바로가기</a>
      <header className="brand-header">
        <a className="brand-wordmark" href="/brand" data-workspace-link>Brand<span>WORKROOM</span></a>
        <nav className="brand-navigation" aria-label="Brand 메뉴">
          <a href="/core" data-workspace-link aria-current={area === "core" ? "page" : undefined}>Core</a>
          <BrandingMenu key={area} area={area} />
          <a href="/brand/web" data-workspace-link aria-current={area === "web" ? "page" : undefined}>Web</a>
          <a href="/brand/specs" data-workspace-link aria-current={area === "specs" ? "page" : undefined}>규격</a>
        </nav>
        <a className="brand-switch" href="/" data-workspace-link><ArrowLeft size={15} aria-hidden />공간 선택</a>
      </header>
      {children}
      <footer className="brand-footer"><span>BRAND WORKROOM / 생각에서 납품까지.</span><a href="/dev" data-workspace-link>개발 자료는 Dev Handbook <ArrowUpRight size={14} aria-hidden /></a></footer>
    </div>
  );
}
