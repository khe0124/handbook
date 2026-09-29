import { Check } from "lucide-react";
import { BrandFrame } from "./BrandFrame";
import { BrandTable } from "./BrandTable";
import { BriefEditor } from "./BriefEditor";
import { DeliveryChecklist, WorkflowStages } from "./BrandWorkflow";
import { LaunchDeliveryList } from "./OfferCatalog";
import { ReviewGuide } from "./OperationsGuide";
import { guides } from "./content";
import { deliverables, deliverableHeadings } from "./deliverables.mjs";
import { useBrandDraft } from "./useBrandDraft";

const stages = guides.branding.stages;

export function BrandingDeliverables() {
  return <BrandFrame area="deliverables"><main id="brand-content" className="brand-main">
    <header className="brand-intro"><div><p className="workspace-eyebrow">BRANDING / 04</p><h1 tabIndex={-1} data-route-heading>산출물 목록</h1><p>작업 단계별 산출물의 권장 양식·구성, 파일 확장자와 전달·사용 조건을 한곳에서 확인합니다.</p></div><div className="brand-start"><span>전체 목록이 기본 제공 범위는 아닙니다.</span><p>선택 상품에 포함된 항목만 적용하고 추가 범위는 별도 합의합니다. 양식은 작성 구성 제안이며 다운로드 템플릿이 아닙니다.</p><a href="/brand/products" data-workspace-link>상품별 포함·제외 범위 확인</a></div></header>
    <div className="brand-editorial-layout"><aside className="brand-outline"><p className="workspace-eyebrow">DELIVERABLE INDEX</p><nav aria-label="산출물 목록 목차">{stages.map((stage, index) => <a key={stage.id} href={`#deliverables-${stage.id}`}><span>{String(index + 1).padStart(2, "0")}</span>{stage.title}</a>)}<a href="#launch-deliverables">통합 런칭 추가 산출물</a></nav></aside><div className="brand-guide">
      <p className="brand-muted">Notion·Figma·Drive 공유 링크는 파일 확장자가 아닌 전달 방식입니다. 좁은 화면에서는 표를 좌우로 스크롤하세요.</p>
      {stages.map((stage, index) => <section key={stage.id} id={`deliverables-${stage.id}`} className="brand-reference brand-deliverable-formats" aria-labelledby={`deliverables-${stage.id}-title`}><div className="brand-stage-title"><span>{String(index + 1).padStart(2, "0")}</span><h2 id={`deliverables-${stage.id}-title`}>{stage.title}</h2></div><BrandTable label={`${stage.title} 산출물 기준`} headings={deliverableHeadings.branding} rows={deliverables.branding[stage.id]} /></section>)}
      <section id="launch-deliverables" className="brand-reference" aria-labelledby="launch-deliverables-title"><h2 id="launch-deliverables-title">통합 런칭 추가 산출물</h2><p>Branding + Web 패키지에 합의한 경우 적용합니다. 실제 포함 항목과 지원 기간은 견적에서 확정하세요.</p><LaunchDeliveryList /></section>
      <p className="brand-resource-links"><a href="/brand/specs" data-workspace-link>인쇄 / Web 규격</a><a href="/brand/guide" data-workspace-link>가이드와 인계로 이동</a></p>
    </div></div>
  </main></BrandFrame>;
}

export function BrandingGuide() {
  const { draft, storageError, updateDraft } = useBrandDraft("branding", stages.map(stage => stage.id));
  return <BrandFrame area="guide"><main id="brand-content" className="brand-main">
    <header className="brand-intro"><div><p className="workspace-eyebrow">BRANDING / 05</p><h1 tabIndex={-1} data-route-heading>가이드와 인계</h1><p>상담부터 최종 전달까지의 작업 순서와 승인 기준을 확인하고, 클라이언트가 실제로 사용할 수 있는 상태로 인계합니다.</p></div><div className="brand-start"><span>작성 문서와 실행 기준을 구분합니다.</span><p>질문·답변은 사전설문에, 디자인 방향은 Design Brief에 정리합니다. 이 페이지에서는 단계 완료와 납품 상태를 점검합니다.</p><a href="/brand/design-brief" data-workspace-link>Design Brief 열기</a></div></header>
    <div className="brand-editorial-layout"><aside className="brand-outline"><p className="workspace-eyebrow">GUIDE INDEX</p><nav aria-label="가이드와 인계 목차">{stages.map((stage, index) => <a key={stage.id} href={`#stage-${stage.id}`}><span>{String(index + 1).padStart(2, "0")}</span>{stage.title}{draft.checked.includes(stage.id) && <Check size={14} aria-label="완료" />}</a>)}<a href="#delivery">납품 파일 점검</a><a href="#review">리뷰와 중단 기준</a><a href="#project-brief">작업 범위 메모</a></nav><div className="brand-progress"><span>단계 확인 {draft.checked.length} / {stages.length}</span><progress value={draft.checked.length} max={stages.length} aria-label="작업 단계 확인" /><p>기존 Branding 체크 상태를 이어 사용합니다. 이 브라우저에만 저장됩니다.</p></div></aside><div className="brand-guide">
      {storageError && <p className="brand-storage-error" role="alert">{storageError}</p>}
      <p className="brand-resource-links"><a href="/brand/questionnaire" data-workspace-link>사전설문 · 인터뷰</a><a href="/brand/deliverables" data-workspace-link>산출물 양식 · 확장자</a><a href="/brand/products" data-workspace-link>가격 · 거래 기준</a></p>
      <WorkflowStages area="branding" draft={draft} onChange={updateDraft} showDeliverables={false} />
      <DeliveryChecklist area="branding" /><ReviewGuide />
      <p className="brand-muted">아래는 이전 Branding 페이지의 간단한 브리프를 보존한 작업 범위 메모입니다. 별도 Design Brief의 응답과 자동 동기화되지 않습니다.</p>
      <BriefEditor label="Branding" title="작업 범위 메모" draft={draft} storageError={storageError} onChange={updateDraft} />
    </div></div>
  </main></BrandFrame>;
}
