import { ArrowLeft, ExternalLink } from "lucide-react";
import { resolveKnouPath, subjects } from "./courses";
import { LessonContent } from "./LessonContent";
import "./knou.css";

const jiraBase = "https://khe0124.atlassian.net/browse";

export function KnouWorkspace({ pathname }: { pathname: string }) {
  const resolved = resolveKnouPath(pathname)!;
  const active = resolved.subject;
  const item = resolved.item;

  return <div className="knou-workspace">
    <a className="knou-skip" href="#knou-content">본문 바로가기</a>
    <header className="knou-header">
      <a className="knou-wordmark" href="/knou" data-workspace-link>방통대<span>2026 · 2학기</span></a>
      <nav className="knou-menubar" aria-label="방통대 과목 메뉴">
        {subjects.map(subject => <div className="knou-menu" key={subject.slug}>
          <button type="button" className="knou-menu-trigger" aria-haspopup="true" data-active={active.slug === subject.slug ? "true" : undefined}>{subject.title}<span aria-hidden>▾</span></button>
          <div className="knou-menu-panel" role="menu">
            <a href={`/knou/${subject.slug}`} data-workspace-link role="menuitem" aria-current={active.slug === subject.slug && !item ? "page" : undefined}><small>INDEX</small>과목 개요</a>
            {subject.items.map(entry => <a key={entry.key} href={`/knou/${subject.slug}/${entry.key.toLowerCase()}`} data-workspace-link role="menuitem" aria-current={item?.key === entry.key ? "page" : undefined}><small>{entry.kind === "평가" ? "평가" : entry.title.split(" · ")[0]}</small>{entry.title.replace(/^\d+회차 · /, "")}</a>)}
          </div>
        </div>)}
      </nav>
      <a className="knou-back" href="/" data-workspace-link><ArrowLeft size={14} aria-hidden />공간 선택</a>
    </header>
    <main id="knou-content" className="knou-main">
      <header className="knou-subject-heading">
        <div><p>KNOU · {active.title}{item ? ` · ${item.key}` : ""}</p><h1 tabIndex={-1} data-route-heading>{item?.title ?? active.title}</h1></div>
        <a href={`${jiraBase}/${item?.key ?? active.issue}`} target="_blank" rel="noreferrer">{item?.key ?? active.issue}에서 학습 기록 보기 <ExternalLink size={15} aria-hidden /></a>
      </header>
      {item ? <section className="knou-item-page" aria-labelledby="item-status">
        <div><span>구분</span><strong>{item.kind}</strong></div><div><span>학습 기간</span><strong>{item.period}</strong></div><div><span id="item-status">Jira 상태</span><strong className={item.status === "완료" ? "is-done" : "is-todo"}>{item.status}</strong></div>
      </section> : <><section className="knou-status" aria-labelledby="current-schedule">
        <div><span>평가 방식</span><strong>{active.assessment}</strong></div>
        <div><span id="current-schedule">현재 일정</span><strong>{active.schedule}</strong></div>
        <div><span>확인 사항</span><p>{active.note}</p></div>
      </section>
      <section className="knou-index" aria-labelledby="study-title"><p>SUBJECT WORKSPACE</p><h2 id="study-title">강의 회차와 평가</h2><ol>{active.items.map(entry => <li key={entry.key}><a href={`/knou/${active.slug}/${entry.key.toLowerCase()}`} data-workspace-link><span>{entry.period}</span><strong>{entry.title}</strong><em className={entry.status === "완료" ? "is-done" : "is-todo"}>{entry.status}</em></a></li>)}</ol></section></>}
      {item && <LessonContent item={item} subject={active} />}
    </main>
    <footer className="knou-footer"><span>출처 · Jira TODO-116</span><span>확인일 · 2026.10.01</span></footer>
  </div>;
}
