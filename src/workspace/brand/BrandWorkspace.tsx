import { ArrowUpRight, Check } from "lucide-react";
import { BrandFrame } from "./BrandFrame";
import { BriefEditor } from "./BriefEditor";
import { guides } from "./content";
import type { BrandArea } from "./content";
import { useBrandDraft } from "./useBrandDraft";
import { OfferCatalog, LaunchPackages } from "./OfferCatalog";
import { CommercialGuide, ReviewGuide } from "./OperationsGuide";
import { DeliveryChecklist, WorkflowStages } from "./BrandWorkflow";

export function BrandWorkspace({ area }: { area: BrandArea }) {
  const guide = guides[area];
  const { draft, storageError, updateDraft } = useBrandDraft(area, guide.stages.map((stage) => stage.id));
  const completed = draft.checked.length;

  return (
    <BrandFrame area={area}>
      <main id="brand-content" className="brand-main">
        <section className="brand-intro" aria-labelledby="brand-title">
          <div><p className="workspace-eyebrow">FREELANCE PLAYBOOK / {area === "branding" ? "01" : "02"}</p><h1 id="brand-title" tabIndex={-1} data-route-heading>{guide.title}</h1><p>{guide.intro}</p></div>
          <div className="brand-start"><span>먼저, 범위를 명확하게.</span><p>{guide.boundary}</p><a href="#project-brief">프로젝트 브리프 작성 <ArrowUpRight size={17} aria-hidden /></a></div>
        </section>
        <div className="brand-editorial-layout">
          <aside className="brand-outline">
            <p className="workspace-eyebrow">PLAYBOOK INDEX</p>
            <nav aria-label={`${guide.label} 작업 목차`}>
              <a href="#offers">상품과 가격</a>
              <a href="#launch-packages">통합 런칭 패키지</a>
              <a className="brand-outline-divider" href="#commercial">견적·수정·거래 기준</a>
              {guide.stages.map((stage, index) => <a key={stage.id} href={`#stage-${stage.id}`}><span>{String(index + 1).padStart(2, "0")}</span>{stage.title}{draft.checked.includes(stage.id) && <Check size={14} aria-label="완료" />}</a>)}
              <a href="#delivery">납품 파일 점검</a>
              <a href="#review">리뷰와 중단 기준</a>
              <a href="#project-brief">프로젝트 브리프</a>
            </nav>
            <div className="brand-progress"><span>단계 확인 {completed} / {guide.stages.length}</span><progress value={completed} max={guide.stages.length} aria-label="작업 단계 확인" /><p>완료 기준을 충족한 단계를 체크하세요.</p></div>
          </aside>
          <div className="brand-guide">
            <OfferCatalog area={area} />
            <LaunchPackages />
            <CommercialGuide />
            <WorkflowStages area={area} draft={draft} onChange={updateDraft} />
            <DeliveryChecklist area={area} />
            <ReviewGuide />
            <BriefEditor label={guide.label} draft={draft} storageError={storageError} onChange={updateDraft} />
          </div>
        </div>
      </main>
    </BrandFrame>
  );
}
