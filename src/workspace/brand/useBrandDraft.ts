import { useState } from "react";
import { draftKey, emptyDraft, parseDraft } from "./draft.mjs";
import type { BrandArea } from "./content";

export type BrandDraft = { fields: Record<string, string>; checked: string[] };

export function useBrandDraft(area: BrandArea, stageIds: string[]) {
  const [initial] = useState(() => {
    try {
      return { draft: parseDraft(localStorage.getItem(draftKey(area)), stageIds) as BrandDraft, error: "" };
    } catch {
      return { draft: emptyDraft() as BrandDraft, error: "저장된 노트를 불러오지 못했습니다. 새 입력을 시작하면 이 작업 공간의 노트가 다시 저장됩니다." };
    }
  });
  const [draft, setDraft] = useState(initial.draft);
  const [storageError, setStorageError] = useState(initial.error);

  const updateDraft = (next: BrandDraft) => {
    setDraft(next);
    try {
      localStorage.setItem(draftKey(area), JSON.stringify(next));
      setStorageError("");
    } catch {
      setStorageError("브라우저에 저장하지 못했습니다. 페이지를 닫기 전에 브리프를 복사해 보관해 주세요.");
    }
  };

  return { draft, storageError, updateDraft };
}
