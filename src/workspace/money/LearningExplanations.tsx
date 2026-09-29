import { moneySources } from "./sources.mjs";

type Explanation = { id: string; title: string; paragraphs: string[]; sources: string[] };

export function LearningExplanations({ sections, lessonId }: { sections: Explanation[]; lessonId: string }) {
  return <section className="money-explanations" aria-labelledby="money-explanations-title">
    <h2 id="money-explanations-title">원리와 해석 과정</h2>
    <nav className="money-explanation-index" aria-label="이 페이지의 상세 해설">
      {sections.map((section, index) => <a key={section.id} href={`#explain-${lessonId}-${section.id}`} data-workspace-link>
        {String(index + 1).padStart(2, "0")} · {section.title}
      </a>)}
    </nav>
    {sections.map((section, index) => <section className="money-explanation" key={section.id} aria-labelledby={`explain-${lessonId}-${section.id}`}>
      <h3 id={`explain-${lessonId}-${section.id}`} tabIndex={-1}>{String(index + 1).padStart(2, "0")}. {section.title}</h3>
      {section.paragraphs.map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph}</p>)}
      <p className="money-explanation-sources">참고 자료 · {section.sources.map(key => {
        const source = moneySources[key as keyof typeof moneySources];
        return <a key={key} href={source.url} target="_blank" rel="noreferrer">{source.title} ↗</a>;
      })}</p>
    </section>)}
  </section>;
}
