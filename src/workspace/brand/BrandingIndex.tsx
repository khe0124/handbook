import { ArrowUpRight } from "lucide-react";
import { BrandFrame } from "./BrandFrame";
import { brandingPages } from "./navigation.mjs";

export function BrandingIndex() {
  return <BrandFrame area="branding"><main id="brand-content" className="brand-main">
    <header className="brand-intro"><div><p className="workspace-eyebrow">BRANDING / FIVE WORKING DOCUMENTS</p><h1 tabIndex={-1} data-route-heading>Branding</h1><p>질문에서 방향을 정하고, 범위에 맞게 제작한 뒤 사용 가능한 결과물로 인계합니다. 필요한 문서를 목적별로 열어보세요.</p></div><div className="brand-start"><span>하나의 프로젝트, 다섯 가지 목적.</span><p>설문과 브리프는 작성 문서, 상품과 산출물은 범위 확인, 가이드와 인계는 실행·검수 기준입니다.</p><a href="/brand/questionnaire" data-workspace-link>사전설문부터 시작하기</a></div></header>
    <nav aria-label="Branding 페이지 선택" className="branding-directory"><ol>{brandingPages.map((page, index) => <li key={page.id}><a href={page.href} data-workspace-link><span className="branding-directory-number">{String(index + 1).padStart(2, "0")}</span><span><strong>{page.title}</strong><span className="branding-directory-description">{page.description}</span></span><ArrowUpRight size={18} aria-hidden /></a></li>)}</ol></nav>
  </main></BrandFrame>;
}
