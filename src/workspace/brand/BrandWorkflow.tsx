import type { BrandArea } from "./content";
import { guides } from "./content";
import type { BrandDraft } from "./useBrandDraft";
import { BrandTable } from "./BrandTable";
import { deliverables, deliverableHeadings, deliveryGates } from "./deliverables.mjs";

export function WorkflowStages({ area, draft, onChange, showDeliverables = true }: { area: BrandArea; draft: BrandDraft; onChange: (draft: BrandDraft) => void; showDeliverables?: boolean }) {
  return <>{guides[area].stages.map((stage, index) => <section className="brand-stage" id={`stage-${stage.id}`} key={stage.id} aria-labelledby={`title-${stage.id}`}>
    <div className="brand-stage-title"><span>{String(index + 1).padStart(2, "0")}</span><h2 id={`title-${stage.id}`}>{stage.title}</h2></div>
    <p>{stage.purpose}</p><h3>확인할 질문</h3><ul>{stage.questions.map(question => <li key={question}>{question}</li>)}</ul>
    <dl className="brand-output"><dt>남길 결과</dt><dd>{stage.output}</dd></dl>
    {showDeliverables && <details className={`brand-details brand-stage-deliverables${area === "branding" ? " brand-deliverable-formats" : ""}`}><summary>{area === "branding" ? "산출물 양식·파일 확장자 확인" : "산출물·파일 형식 확인"}</summary><p className="brand-muted">일반 실무 기준입니다. 선택 상품에 포함된 항목만 적용하고, 추가 범위는 별도 합의하세요.</p><BrandTable label={`${stage.title} 산출물 기준`} headings={deliverableHeadings[area]} rows={deliverables[area][stage.id]} /></details>}
    <label className="brand-check"><input type="checkbox" checked={draft.checked.includes(stage.id)} onChange={event => onChange({ ...draft, checked: event.target.checked ? [...draft.checked, stage.id] : draft.checked.filter(id => id !== stage.id) })} /><span>{stage.done}</span></label>
  </section>)}</>;
}

export function DeliveryChecklist({ area }: { area: BrandArea }) {
  return <section id="delivery" className="brand-delivery" aria-labelledby="delivery-title">
    <p className="workspace-eyebrow">FINAL CHECK</p><h2 id="delivery-title">납품 파일 점검</h2>
    <BrandTable label="납품 파일 점검표" headings={["구분", "전달할 것", "확인할 것"]} rows={guides[area].handoff} />
    <p className="brand-muted">실제 제공 범위와 사용 조건은 프로젝트별 합의에 맞춰 조정하세요.</p>
    <dl className="brand-output"><dt>최종 완료 기준</dt><dd>{deliveryGates[area]}</dd></dl>
  </section>;
}
