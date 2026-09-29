import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { BriefEditor } from "./BriefEditor";
import { guides } from "./content";
import type { BrandArea } from "./content";
import { useBrandDraft } from "./useBrandDraft";
import { OfferCatalog, LaunchPackages } from "./OfferCatalog";
import { CommercialGuide, ReviewGuide } from "./OperationsGuide";
import { BrandTable } from "./BrandTable";
import { deliverables, deliveryGates } from "./deliverables.mjs";

export function BrandWorkspace({ area }: { area: BrandArea }) {
  const guide = guides[area];
  const { draft, storageError, updateDraft } = useBrandDraft(area, guide.stages.map((stage) => stage.id));
  const completed = draft.checked.length;

  return (
    <div className="brand-workspace">
      <a className="brand-skip" href="#brand-content">본문 바로가기</a>
      <header className="brand-header">
        <a className="brand-wordmark" href="/brand" data-workspace-link>Brand<span>WORKROOM</span></a>
        <nav className="brand-navigation" aria-label="Brand 메뉴">
          <a href="/brand" data-workspace-link aria-current={area === "branding" ? "page" : undefined}>Branding</a>
          <a href="/brand/web" data-workspace-link aria-current={area === "web" ? "page" : undefined}>Web</a>
        </nav>
        <a className="brand-switch" href="/" data-workspace-link><ArrowLeft size={15} aria-hidden />공간 선택</a>
      </header>
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
            {guide.stages.map((stage, index) => (
              <section className="brand-stage" id={`stage-${stage.id}`} key={stage.id} aria-labelledby={`title-${stage.id}`}>
                <div className="brand-stage-title"><span>{String(index + 1).padStart(2, "0")}</span><h2 id={`title-${stage.id}`}>{stage.title}</h2></div>
                <p>{stage.purpose}</p>
                <h3>확인할 질문</h3>
                <ul>{stage.questions.map((question) => <li key={question}>{question}</li>)}</ul>
                <dl className="brand-output"><dt>남길 결과</dt><dd>{stage.output}</dd></dl>
                <details className="brand-details brand-stage-deliverables">
                  <summary>산출물·파일 형식 확인</summary>
                  <p className="brand-muted">일반 실무 기준입니다. 선택 상품에 포함된 항목만 적용하고, 추가 범위는 별도 합의하세요.</p>
                  <BrandTable label={`${stage.title} 산출물 기준`} headings={["산출물", "상세 내용", "형식 / 조건"]} rows={deliverables[area][stage.id]} />
                </details>
                <label className="brand-check"><input type="checkbox" checked={draft.checked.includes(stage.id)} onChange={(event) => updateDraft({ ...draft, checked: event.target.checked ? [...draft.checked, stage.id] : draft.checked.filter((id) => id !== stage.id) })} /><span>{stage.done}</span></label>
              </section>
            ))}
            <section id="delivery" className="brand-delivery" aria-labelledby="delivery-title">
              <p className="workspace-eyebrow">FINAL CHECK</p><h2 id="delivery-title">납품 파일 점검</h2>
              <div className="brand-table-scroll" tabIndex={0} role="region" aria-label="납품 파일 점검표">
                <table><thead><tr><th scope="col">구분</th><th scope="col">전달할 것</th><th scope="col">확인할 것</th></tr></thead><tbody>{guide.handoff.map(([name, files, check]) => <tr key={name}><th scope="row">{name}</th><td>{files}</td><td>{check}</td></tr>)}</tbody></table>
              </div>
              <p className="brand-muted">실제 제공 범위와 사용 조건은 프로젝트별 합의에 맞춰 조정하세요.</p>
              <dl className="brand-output"><dt>최종 완료 기준</dt><dd>{deliveryGates[area]}</dd></dl>
            </section>
            <ReviewGuide />
            <BriefEditor label={guide.label} draft={draft} storageError={storageError} onChange={updateDraft} />
          </div>
        </div>
      </main>
      <footer className="brand-footer"><span>BRAND WORKROOM / 생각에서 납품까지.</span><a href="/dev" data-workspace-link>개발 자료는 Dev Handbook <ArrowUpRight size={14} aria-hidden /></a></footer>
    </div>
  );
}
