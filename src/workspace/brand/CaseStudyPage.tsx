import { useEffect, useMemo, useState } from "react";
import { Check, ClipboardCopy, RotateCcw } from "lucide-react";
import { BrandFrame } from "./BrandFrame";

const STORAGE_KEY = "brand-workspace:v1:case-study";

const chapters = [
  { id: "background", title: "Background", intent: "프로젝트가 시작된 맥락과 해결할 문제를 짧고 분명하게 정의합니다.", prompts: ["클라이언트와 브랜드는 누구인가?", "어떤 문제나 기회 때문에 프로젝트가 시작됐나?", "목표, 범위, 기간, 나의 역할과 제약은 무엇이었나?"], evidence: "프로젝트 개요 · 목표 · 역할 · 범위 · 일정 · Before 자료" },
  { id: "research", title: "Research", intent: "무엇을 조사했고, 그 과정에서 무엇을 발견했는지 보여줍니다.", prompts: ["어떤 사용자·시장·경쟁사를 어떤 방법으로 조사했나?", "관찰과 인터뷰에서 반복된 행동이나 언어는 무엇이었나?", "가설과 달랐던 사실은 무엇이었나?"], evidence: "인터뷰 인용 · 서베이 · 경쟁사 맵 · 현장 사진 · 데스크 리서치 출처" },
  { id: "analysis", title: "Analysis", intent: "수집한 자료를 디자인 판단으로 바꾸는 논리를 설명합니다.", prompts: ["정보를 어떤 기준으로 묶고 우선순위를 정했나?", "핵심 인사이트와 기회 영역은 무엇인가?", "결국 해결해야 할 한 문장은 무엇인가?"], evidence: "어피니티 맵 · 핵심 인사이트 · 페르소나/여정 · How might we 문장" },
  { id: "concept", title: "Concept Direction", intent: "선택한 방향과 선택하지 않은 방향을 판단 기준과 함께 기록합니다.", prompts: ["프로젝트를 이끄는 핵심 콘셉트 문장은 무엇인가?", "어떤 원칙·키워드·무드가 결정을 안내했나?", "대안 중 이 방향을 선택한 이유는 무엇인가?"], evidence: "콘셉트 문장 · 디자인 원칙 · 무드보드 · 방향 비교와 선택 근거" },
  { id: "explore", title: "Ideation I — Explore", intent: "답을 빨리 정하지 않고 가능성을 넓힌 과정을 보여줍니다.", prompts: ["어떤 범위의 아이디어를 탐색했나?", "수량과 다양성을 위해 사용한 방법은 무엇인가?", "흥미로웠지만 탈락한 시도와 이유는 무엇인가?"], evidence: "러프 스케치 · 워드맵 · 스타일 실험 · 초기 프로토타입 · 탈락안" },
  { id: "develop", title: "Ideation II — Develop", intent: "가능성 있는 아이디어를 실제 시스템으로 발전시킨 과정을 담습니다.", prompts: ["어떤 후보를 어떤 기준으로 좁혔나?", "피드백과 테스트로 무엇을 바꿨나?", "개별 결과물이 하나의 시스템으로 어떻게 연결됐나?"], evidence: "후보안 비교 · 피드백 기록 · 반복 시안 · 컴포넌트/시각 시스템" },
  { id: "refine", title: "Ideation III — Refine", intent: "완성도를 높인 세부 결정과 검증 과정을 설명합니다.", prompts: ["가독성·일관성·접근성을 어떻게 다듬었나?", "실제 크기와 매체에서 어떤 문제를 발견했나?", "최종안의 디테일이 목표에 어떻게 기여하나?"], evidence: "Before/After · 디테일 확대 · 사용성/접근성 검증 · 최종 스펙" },
  { id: "launch", title: "Build & Launch", intent: "최종 결과뿐 아니라 구현, 공개, 성과와 배운 점까지 정리합니다.", prompts: ["어떻게 제작·구현하고 품질을 검수했나?", "출시 결과와 정량·정성 성과는 무엇인가?", "다시 한다면 무엇을 다르게 할 것인가?"], evidence: "최종 결과물 · 라이브 링크 · QA · 성과 지표 · 회고 · 다음 단계" },
] as const;

type ChapterId = typeof chapters[number]["id"];
type Draft = { project: string; summary: string; chapters: Record<ChapterId, string> };

const emptyDraft = (): Draft => ({
  project: "",
  summary: "",
  chapters: Object.fromEntries(chapters.map(({ id }) => [id, ""])) as Record<ChapterId, string>,
});

function loadDraft(): Draft {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    return saved ? { ...emptyDraft(), ...saved, chapters: { ...emptyDraft().chapters, ...saved.chapters } } : emptyDraft();
  } catch { return emptyDraft(); }
}

export function CaseStudyPage() {
  const [draft, setDraft] = useState<Draft>(loadDraft);
  const [status, setStatus] = useState("자동 저장됨");
  const completed = useMemo(() => chapters.filter(({ id }) => draft.chapters[id].trim()).length, [draft]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(draft)); setStatus("자동 저장됨"); }
    catch { setStatus("이 브라우저에는 저장할 수 없습니다"); }
  }, [draft]);

  const exportText = () => [
    `# ${draft.project || "Project title"}`,
    draft.summary && `\n${draft.summary}`,
    ...chapters.map((chapter, index) => `\n## ${String(index + 1).padStart(2, "0")} ${chapter.title}\n\n${draft.chapters[chapter.id] || "[내용을 작성하세요]"}`),
  ].filter(Boolean).join("\n");

  const copyTemplate = async () => {
    await navigator.clipboard.writeText(exportText());
    setStatus("Markdown을 복사했습니다");
  };

  const reset = () => {
    if (window.confirm("작성한 Case Study 내용을 모두 비울까요?")) setDraft(emptyDraft());
  };

  return (
    <BrandFrame area="case-study">
      <main id="brand-content" className="brand-main case-study-page">
        <section className="brand-intro" aria-labelledby="case-study-title">
          <div><p className="workspace-eyebrow">CASE STUDY TEMPLATE / 8 CHAPTERS</p><h1 id="case-study-title" tabIndex={-1} data-route-heading>과정보다 판단이 보이는<br />Case Study.</h1><p>프로젝트의 배경부터 출시와 회고까지, 결과물이 만들어진 이유를 한 편의 이야기로 정리하는 작성 템플릿입니다.</p></div>
          <div className="brand-start"><span>먼저, 한 문장으로 요약하세요.</span><p>“누구의 어떤 문제를, 어떤 관점과 방법으로 해결해, 무엇을 바꿨는가?”가 전체 글의 기준이 됩니다.</p><a href="#background">템플릿 작성 시작</a></div>
        </section>

        <section className="case-study-setup" aria-labelledby="case-study-setup-title">
          <div><p className="workspace-eyebrow">PROJECT SETUP</p><h2 id="case-study-setup-title">프로젝트 기본 정보</h2></div>
          <label>프로젝트 이름<input value={draft.project} onChange={(event) => setDraft({ ...draft, project: event.target.value })} placeholder="예: 로컬 커피 브랜드 리디자인" /></label>
          <label>한 문장 요약<textarea value={draft.summary} onChange={(event) => setDraft({ ...draft, summary: event.target.value })} placeholder="누구의 어떤 문제를 어떻게 해결했고, 어떤 변화를 만들었는지 적어보세요." /></label>
        </section>

        <div className="brand-editorial-layout">
          <aside className="brand-outline case-study-outline">
            <p className="workspace-eyebrow">CASE STUDY INDEX</p>
            <nav aria-label="Case Study 목차">{chapters.map((chapter, index) => <a key={chapter.id} href={`#${chapter.id}`}><span>{String(index + 1).padStart(2, "0")}</span>{chapter.title}{draft.chapters[chapter.id].trim() && <Check size={14} aria-label="작성됨" />}</a>)}</nav>
            <div className="brand-progress"><span>작성 진행 {completed} / {chapters.length}</span><progress value={completed} max={chapters.length} aria-label="Case Study 작성 진행률" /><p>완벽한 문장보다 근거부터 채워보세요.</p></div>
            <div className="case-study-actions"><button className="brand-action" type="button" onClick={copyTemplate}><ClipboardCopy size={14} aria-hidden />Markdown 복사</button><button className="case-study-reset" type="button" onClick={reset}><RotateCcw size={13} aria-hidden />모두 비우기</button><span role="status">{status}</span></div>
          </aside>

          <div className="brand-guide case-study-chapters">
            <section className="case-study-writing-guide" aria-labelledby="writing-guide-title"><p className="workspace-eyebrow">WRITING GUIDE</p><h2 id="writing-guide-title">읽히는 Case Study의 원칙</h2><ul><li><strong>결과보다 이유:</strong> 무엇을 만들었는지보다 왜 그렇게 결정했는지 씁니다.</li><li><strong>주장보다 증거:</strong> 조사 자료, 비교안, 테스트, 지표를 문장 가까이에 배치합니다.</li><li><strong>나의 기여:</strong> 팀의 결과와 내가 맡은 판단·실행을 구분합니다.</li><li><strong>편집의 리듬:</strong> 한 챕터는 핵심 문장 → 과정 → 증거 → 배운 점 순으로 정리합니다.</li></ul></section>
            {chapters.map((chapter, index) => (
              <section className="brand-stage case-study-chapter" id={chapter.id} key={chapter.id}>
                <div className="brand-stage-title"><span>{String(index + 1).padStart(2, "0")}</span><h2>{chapter.title}</h2></div>
                <p>{chapter.intent}</p>
                <div className="case-study-guide-grid"><div><h3>바로 쓰는 질문</h3><ul>{chapter.prompts.map((prompt) => <li key={prompt}>{prompt}</li>)}</ul></div><div><h3>함께 보여줄 증거</h3><p>{chapter.evidence}</p></div></div>
                <label className="case-study-editor"><span>{chapter.title} 작성</span><textarea value={draft.chapters[chapter.id]} onChange={(event) => setDraft({ ...draft, chapters: { ...draft.chapters, [chapter.id]: event.target.value } })} placeholder="핵심 문장부터 적고, 그 판단을 뒷받침하는 과정과 증거를 이어서 작성하세요." /></label>
              </section>
            ))}
          </div>
        </div>
      </main>
    </BrandFrame>
  );
}
