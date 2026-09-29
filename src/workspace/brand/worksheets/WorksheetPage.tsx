import { useRef, useState } from "react";
import { Copy } from "lucide-react";
import { BrandFrame } from "../BrandFrame";
import { formatWorksheet } from "./storage.mjs";
import { useWorksheetDraft } from "./useWorksheetDraft";
import { WorksheetField } from "./WorksheetField";
import type { WorksheetDefinition } from "./types";

export function WorksheetPage({ doc }: {doc: WorksheetDefinition}) {
  const {answers, storageError, update} = useWorksheetDraft(doc);
  const [copyStatus, setCopyStatus] = useState("");
  const [copyTarget, setCopyTarget] = useState<string | undefined>(undefined);
  const [exportGroup, setExportGroup] = useState<string | null>(null);
  const exportRef = useRef<HTMLTextAreaElement>(null);
  const copy = async (groupId?: string) => {
    setCopyTarget(groupId);
    try {
      await navigator.clipboard.writeText(formatWorksheet(doc,answers,groupId));
      setCopyStatus(groupId ? `${doc.groups.find(group=>group.id===groupId)?.title}를 복사했습니다.` : "전체 문서를 복사했습니다.");
      setExportGroup(null);
    } catch {
      setCopyStatus("자동 복사를 사용할 수 없습니다. 복사용 텍스트를 직접 선택해 복사하세요.");
      setExportGroup(groupId || "");
      requestAnimationFrame(()=>exportRef.current?.focus());
    }
  };
  return <BrandFrame area={doc.id}>
    <main id="brand-content" className="brand-main worksheet-page">
      <section className="brand-intro" aria-labelledby="worksheet-title">
        <div><p className="workspace-eyebrow">{doc.eyebrow}</p><h1 id="worksheet-title" tabIndex={-1} data-route-heading>{doc.title}</h1><p>{doc.intro}</p></div>
        <div className="brand-start"><span>작성 → 확인 → 합의</span><p>응답은 이 브라우저에만 자동 저장됩니다. 서버 제출·고객 공유 링크·기기 간 동기화 기능은 없습니다. 비밀번호나 민감한 개인정보는 적지 마세요.</p><a href={doc.id === "questionnaire" ? "/brand/design-brief" : "/brand/questionnaire"} data-workspace-link>{doc.id === "questionnaire" ? "다음 단계: Design Brief" : "사전설문·인터뷰로 돌아가기"}</a></div>
      </section>
      <div className="worksheet-toolbar">
        <p className="brand-muted">페이지별로 한 문서가 저장됩니다. 다른 프로젝트를 작성하기 전 기존 내용을 복사해 보관하세요. 두 문서의 답변은 자동으로 옮겨지지 않습니다.</p>
        <button type="button" className="brand-action" onClick={()=>copy()}><Copy size={15} aria-hidden />전체 문서 복사</button>
      </div>
      {doc.id === "questionnaire" && <p className="brand-muted">전체 문서에는 내부 인터뷰·디자이너 요약도 포함됩니다. 고객에게 전달할 때는 CLIENT PRE-QUESTIONNAIRE의 ‘이 부분 복사’를 사용하세요.</p>}
      {storageError ? <p className="brand-storage-error" role="alert">{storageError}</p> : <p className="brand-save-status">입력 내용과 선택 항목은 이 브라우저에 자동 저장됩니다.</p>}
      <p className="brand-copy-status" role="status">{copyStatus}</p>
      {exportGroup !== null && <div className="worksheet-export"><label htmlFor="worksheet-export">복사용 텍스트</label><textarea id="worksheet-export" ref={exportRef} rows={10} readOnly value={formatWorksheet(doc,answers,exportGroup || undefined)} onFocus={event=>event.target.select()} /><button type="button" className="brand-action" onClick={()=>{exportRef.current?.focus();exportRef.current?.select();}}>텍스트 전체 선택</button></div>}
      <div className="brand-editorial-layout">
        <aside className="brand-outline worksheet-outline"><p className="workspace-eyebrow">WORKSHEET INDEX</p><nav aria-label={`${doc.title} 목차`}>
          {doc.groups.map(group=><div key={group.id}><a className="worksheet-group-link" href={`#${group.id}`}>{group.title}</a>{group.sections.map(section=><a key={section.id} href={`#${section.id}`}>{section.title}</a>)}</div>)}
        </nav></aside>
        <div className="brand-guide">
          {doc.groups.map(group=><section id={group.id} className="worksheet-group" key={group.id} aria-labelledby={`${group.id}-title`}>
            <div className="brand-section-heading"><div><p className="workspace-eyebrow">{group.audience}</p><h2 id={`${group.id}-title`}>{group.title}</h2></div><button type="button" className="brand-action" onClick={()=>copy(group.id)} aria-label={`${group.title}만 복사`}><Copy size={15} aria-hidden />이 부분 복사</button></div>
            {copyTarget === group.id && copyStatus && <p className="brand-muted">{copyStatus}</p>}
            <p className="worksheet-group-intro">{group.intro}</p>
            {group.sections.map(section=><section id={section.id} className="worksheet-section" key={section.id} aria-labelledby={`${section.id}-title`}>
              <h3 id={`${section.id}-title`}>{section.title}</h3>{section.description && <p className="worksheet-description">{section.description}</p>}
              {section.fields.map(field=><WorksheetField key={field.id} field={field} value={answers[field.id]} onChange={value=>{update(field.id,value);setCopyStatus("");}} />)}
            </section>)}
          </section>)}
        </div>
      </div>
    </main>
  </BrandFrame>;
}
