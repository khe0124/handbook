export const BRIEF_FIELDS = [
  ["project", "프로젝트명", "예: 독립 서점 브랜드 리뉴얼"],
  ["audience", "대상과 사용 맥락", "누구에게, 어떤 상황에서 필요한 작업인가요?"],
  ["goal", "해결할 문제와 목표", "이번 작업 후 무엇이 달라져야 하나요?"],
  ["scope", "포함 · 제외 범위", "산출물, 수량, 수정 범위와 하지 않을 작업"],
  ["schedule", "일정과 준비물", "검토일, 납품일, 클라이언트가 제공할 자료"],
  ["approval", "피드백 · 승인 방식", "최종 승인자, 의견 취합 방식과 검토 기한"],
];

export const emptyDraft = () => ({ fields: Object.fromEntries(BRIEF_FIELDS.map(([key]) => [key, ""])), checked: [] });
export const draftKey = (area) => `brand-workspace:v1:${area}`;

export function parseDraft(raw, stageIds) {
  if (raw === null) return emptyDraft();
  const value = JSON.parse(raw);
  if (!value || typeof value !== "object" || !value.fields || !Array.isArray(value.checked)) throw new Error("Invalid draft");
  return {
    fields: Object.fromEntries(BRIEF_FIELDS.map(([key]) => [key, typeof value.fields[key] === "string" ? value.fields[key] : ""])),
    checked: [...new Set(value.checked.filter((id) => stageIds.includes(id)))],
  };
}

export function formatBrief(label, draft) {
  return `# ${label} 프로젝트 브리프\n\n` + BRIEF_FIELDS.map(([key, title]) => `## ${title}\n${draft.fields[key].trim() || "(미정)"}`).join("\n\n");
}
