import { ArrowLeft, ArrowRight } from "lucide-react";
import { MoneyNavigation } from "./MoneyNavigation";
import { LearningGuide } from "./LearningGuide";
import { LearningExplanations } from "./LearningExplanations";
import { getMoneyLessonGroups, moneyCategories, moneyHref, moneyLessonCount, resolveMoneyPage } from "./navigation.mjs";
import { foundation, moneyLessons } from "./content.mjs";
import { moneySources, reviewedAt } from "./sources.mjs";
import "./money.css";

function LearningHome() {
  return <>
    <header className="money-intro"><p className="workspace-eyebrow">MONEY / UNDERSTAND BEFORE INVESTING</p><h1 tabIndex={-1} data-route-heading>내 자산을 이해하는 힘.</h1><p>무엇을 살지보다, 내 돈이 어떻게 움직이는지부터.<br />계좌·세금·경제·투자자산의 기본 구조를 차근차근 정리합니다.</p></header>
    <section className="money-foundation" aria-labelledby="money-first"><h2 id="money-first">투자 전에, 내 자산의 기준점</h2><ol>{foundation.map(([number, title, text]) => <li key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol></section>
    <section aria-labelledby="money-directory-title"><h2 id="money-directory-title">{moneyCategories.length}개 카테고리 · {moneyLessonCount}개 학습 주제</h2><p className="money-muted">처음이라면 ISA/연금저축 → 절세 → 거시경제를 읽고, 관심 자산으로 이어가세요. 각 주제는 독립적으로 읽어도 됩니다.</p><div className="money-directory">{moneyCategories.map((category, index) => <section key={category.id} aria-labelledby={`category-${category.id}`}><span className="money-number">{String(index + 1).padStart(2, "0")}</span><div><h3 id={`category-${category.id}`}>{category.title}</h3><p>{category.description}</p>{getMoneyLessonGroups(category).map(group => <div className="money-directory-group" key={group.title ?? category.id}>
      {group.title && <h4>{group.title}</h4>}
      <ul>{group.lessons.map(([id, title]) => <li key={id}><a href={moneyHref(category.id, id)} data-workspace-link>{title}<ArrowRight size={14} aria-hidden /></a></li>)}</ul>
    </div>)}</div></section>)}</div></section>
  </>;
}

function LearningArticle({ pathname }: { pathname: string }) {
  const page = resolveMoneyPage(pathname);
  if (!page?.category || !page.lesson) return null;
  const category = page.category;
  const lessons = moneyLessons[category.id as keyof typeof moneyLessons];
  const index = lessons.findIndex(item => item.id === page.lesson?.[0]);
  const lesson = lessons[index];
  return <>
    <header className="money-intro"><p className="workspace-eyebrow"><a href="/money" data-workspace-link>재테크 기초</a> / {category.title} / {String(index + 1).padStart(2, "0")}</p><h1 tabIndex={-1} data-route-heading>{lesson.title}</h1><p>{lesson.summary}</p></header>
    <div className="money-reading-layout">
      <aside className="money-outline"><p>{category.title}</p><nav aria-label={`${category.title} 학습 순서`}>{getMoneyLessonGroups(category).map(group => <div className="money-outline-group" key={group.title ?? category.id}>
        {group.title && <p>{group.title}</p>}
        {group.lessons.map(([id, title]) => <a key={id} href={moneyHref(category.id, id)} data-workspace-link aria-current={id === lesson.id ? "page" : undefined}>{title}</a>)}
      </div>)}</nav><a href="/money" data-workspace-link>전체 학습 목차</a></aside>
      <article className="money-article" aria-label={lesson.title}>
        <section><h2>먼저 알아둘 개념</h2><dl className="money-concepts">{lesson.concepts.map(([term, description]) => <div key={term}><dt>{term}</dt><dd>{description}</dd></div>)}</dl></section>
        {"explanations" in lesson && <LearningExplanations sections={lesson.explanations} lessonId={lesson.id} />}
        {"guide" in lesson && <LearningGuide guide={lesson.guide} />}
        <section className="money-example"><h2>예시로 이해하기</h2><p className="money-muted">학습용 가정 · 실제 수익률·세율·대출 승인·추천 비중이 아닙니다.</p><p>{lesson.example}</p></section>
        <section><h2>흔한 오해와 위험</h2><p>{lesson.pitfall}</p></section>
        <section><h2>내 상황에서 확인할 질문</h2><ul className="money-checks">{lesson.checks.map(check => <li key={check}>{check}</li>)}</ul></section>
        {"update" in lesson && <section className="money-rule-note"><h2>제도·적용 조건 확인</h2><p>{lesson.update}</p></section>}
        <section className="money-sources"><h2>근거 자료와 더 읽기</h2><p className="money-muted">자료 확인일 <time dateTime={reviewedAt}>{reviewedAt}</time> · 자료의 게시일과 현재 시행일은 다를 수 있습니다. 관찰표·시나리오·예시·점검 질문은 학습을 위해 구성했으며, 출처 기관의 현재 시장 전망이 아닙니다.</p><ul>{lesson.sources.map(key => { const source = moneySources[key as keyof typeof moneySources]; return <li key={key}><a href={source.url} target="_blank" rel="noreferrer">{source.title} ↗</a><p>{source.note}</p></li>; })}</ul></section>
        <nav className="money-pagination" aria-label="이전 다음 학습">{index > 0 ? <a href={moneyHref(category.id, lessons[index - 1].id)} data-workspace-link>← {lessons[index - 1].title}</a> : <a href="/money" data-workspace-link>← 전체 목차</a>}{index < lessons.length - 1 && <a href={moneyHref(category.id, lessons[index + 1].id)} data-workspace-link>{lessons[index + 1].title} →</a>}</nav>
      </article>
    </div>
  </>;
}

export function MoneyWorkspace({ pathname }: { pathname: string }) {
  const isHome = pathname.replace(/\/+$/, "") === "/money";
  return <div className="money-workspace">
    <a className="money-skip" href="#money-content">본문 바로가기</a>
    <header className="money-header"><a className="money-wordmark" href="/money" data-workspace-link>재테크<span>MONEY NOTES</span></a><a className="money-back" href="/" data-workspace-link><ArrowLeft size={14} aria-hidden />공간 선택</a><MoneyNavigation key={pathname} pathname={pathname} /></header>
    <main id="money-content" className="money-main">
      {isHome ? <LearningHome /> : <LearningArticle pathname={pathname} />}
      <p className="money-disclaimer">한국 거주자의 기초 학습을 위한 일반 정보입니다. 개인별 투자·세무·법률 자문이나 특정 상품의 매수 추천이 아닙니다. 원금 손실 가능성이 있으며, 거래·가입·신고 전 최신 공식 안내와 상품 설명서를 확인하세요. 실제 자산·계좌 연결이나 개인정보 입력 기능은 없습니다.</p>
    </main>
    <footer className="money-footer"><span>이해하고, 비교하고, 결정하기.</span><a href="/" data-workspace-link>Dev · Brand · 재테크</a></footer>
  </div>;
}
