// 개인 사례 레이어. 문서의 판단 기준을 실무에서 적용한 기록을 남긴다.
// 규칙: 주 1건 이상. situation(상황) → judgment(판단과 근거) → result(수치 변화·실패 원인)
// 순으로 쓰고, 면접 답변으로 압축되면 interviewLine을 채운다.
// 회사 기밀 수치는 상대값·규모감으로 치환해 기록한다.

export const PERSONAL_NOTES = [
  {
    id: "note-example-01",
    docId: "engineering-frontend-performance",
    sectionId: null,
    date: "2026-07-02",
    situation: "(작성 예시 — 본인 사례로 교체) 운영 화면 목록에서 스크롤이 눈에 띄게 버벅였다.",
    judgment:
      "(작성 예시) 문서의 트리아지 순서대로 memo를 붙이기 전에 React Profiler로 commit 시간을 먼저 측정하고, state fan-out이 원인인지 확인했다.",
    result: "(작성 예시) commit 시간 상대 개선 폭, 남은 병목, 실패했다면 왜 실패했는지를 수치로 남긴다.",
    interviewLine: null,
  },
];

export function getPersonalNotes(docId) {
  return PERSONAL_NOTES.filter((note) => note.docId === docId);
}
