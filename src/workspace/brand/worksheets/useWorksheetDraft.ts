import { useState } from "react";
import { emptyAnswers, parseAnswers, worksheetKey } from "./storage.mjs";
import type { Answer, Answers, WorksheetDefinition } from "./types";

export function useWorksheetDraft(doc: WorksheetDefinition) {
  const [initial] = useState(() => {
    try {
      return {answers:parseAnswers(doc, localStorage.getItem(worksheetKey(doc.id))) as Answers, error:"", writable:true};
    } catch {
      return {answers:emptyAnswers(doc) as Answers, error:"기존 문서를 불러오지 못했습니다. 저장된 원본을 보호하기 위해 자동 저장을 중지했습니다. 이번 입력은 복사해서 보관하세요.", writable:false};
    }
  });
  const [answers, setAnswers] = useState(initial.answers);
  const [storageError, setStorageError] = useState(initial.error);
  const update = (id: string, value: Answer) => {
    const next = {...answers, [id]:value};
    setAnswers(next);
    if (!initial.writable) return;
    try {
      localStorage.setItem(worksheetKey(doc.id), JSON.stringify({version:1, answers:next}));
      setStorageError("");
    } catch {
      setStorageError("브라우저에 저장하지 못했습니다. 페이지를 닫기 전에 작성 내용을 복사해 보관하세요.");
    }
  };
  return {answers, storageError, update};
}
