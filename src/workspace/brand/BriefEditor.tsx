import { useState } from "react";
import { Copy } from "lucide-react";
import { BRIEF_FIELDS, formatBrief } from "./draft.mjs";
import type { BrandDraft } from "./useBrandDraft";

type BriefEditorProps = {
  label: string;
  draft: BrandDraft;
  storageError: string;
  onChange: (draft: BrandDraft) => void;
};

export function BriefEditor({ label, draft, storageError, onChange }: BriefEditorProps) {
  const [copyStatus, setCopyStatus] = useState("");
  const [showExport, setShowExport] = useState(false);
  const text = formatBrief(label, draft);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus("브리프를 복사했습니다.");
      setShowExport(false);
    } catch {
      setCopyStatus("자동 복사를 사용할 수 없습니다. 아래 텍스트를 직접 선택해 복사해 주세요.");
      setShowExport(true);
    }
  };

  return (
    <section id="project-brief" className="brand-brief" aria-labelledby="brief-title">
      <div className="brand-section-heading"><div><p className="workspace-eyebrow">YOUR WORKING NOTES</p><h2 id="brief-title">프로젝트 브리프</h2></div><button type="button" className="brand-action" onClick={copy}><Copy size={16} aria-hidden />브리프 복사</button></div>
      <p className="brand-muted">아직 정하지 못한 내용은 비워 두고 미팅에서 확인하세요. 노트와 체크 상태는 이 브라우저에만 저장되며, 다른 기기와 동기화되지 않습니다. 비밀번호·민감한 고객 정보는 적지 마세요.</p>
      <div className="brand-brief-fields">
        {BRIEF_FIELDS.map(([key, title, placeholder]) => (
          <label key={key} htmlFor={`brief-${key}`}>
            <span>{title}</span>
            <textarea id={`brief-${key}`} rows={key === "project" ? 2 : 3} placeholder={placeholder} value={draft.fields[key]} onChange={(event) => { onChange({ ...draft, fields: { ...draft.fields, [key]: event.target.value } }); setCopyStatus(""); }} />
          </label>
        ))}
      </div>
      {storageError ? <p className="brand-storage-error" role="alert">{storageError}</p> : <p className="brand-save-status">입력 내용은 이 브라우저에 자동 저장됩니다.</p>}
      <p className="brand-copy-status" role="status">{copyStatus}</p>
      {showExport && <label className="brand-export">복사용 브리프<textarea readOnly value={text} rows={12} onFocus={(event) => event.target.select()} /></label>}
    </section>
  );
}
