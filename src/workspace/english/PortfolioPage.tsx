import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { caseStudySteps, editingChecklist, phraseGroups, weakWriting } from "./portfolioContent.mjs";

function CopyButton({text}:{text:string}){
  const [copied,setCopied]=useState(false);
  const copy=async()=>{try{await navigator.clipboard.writeText(text);setCopied(true);window.setTimeout(()=>setCopied(false),1500);}catch{setCopied(false);}};
  return <button type="button" className="portfolio-copy" onClick={copy} aria-label={copied?"복사됨":"영문 템플릿 복사"}>{copied?<Check size={13}/>:<Copy size={13}/>}<span>{copied?"Copied":"Copy"}</span></button>;
}

export function PortfolioPage(){
  return <><h1 className="sr-only" tabIndex={-1} data-route-heading>Portfolio and case study writing</h1>
    <nav className="portfolio-jump" aria-label="Case study writing 목차"><a href="#case-study">Case study structure</a><a href="#phrases">Useful phrases</a><a href="#rewrite">Write with evidence</a><a href="#checklist">Editing checklist</a></nav>
    <div className="portfolio-layout">
      <aside className="portfolio-aside"><p>CASE STUDY WRITING</p><strong>Show the decision,<br/>not the decoration.</strong><span>좋은 case study는 화면 수가 아니라 문제를 어떻게 정의하고, 무엇을 근거로 결정했으며, 결과를 어디까지 확인했는지 보여줍니다.</span></aside>
      <article className="portfolio-content">
        <section id="case-study"><div className="portfolio-section-title"><span>01</span><div><h2>Case study structure</h2><p>각 섹션은 하나의 질문에 답해야 합니다. 모든 프로젝트에 같은 분량을 배정하지 말고, 중요한 판단에 가장 많은 공간을 사용하세요.</p></div></div><ol className="case-study-steps">{caseStudySteps.map((step,index)=><li key={step.id} id={`portfolio-${step.id}`}><div className="case-step-heading"><span>{String(index+1).padStart(2,"0")}</span><div><h3>{step.label}</h3><p>{step.purpose}</p></div></div><div className="case-step-body"><ul>{step.questions.map(question=><li key={question}>{question}</li>)}</ul><div className="portfolio-template"><small>SENTENCE FRAME</small><p>{step.template}</p><CopyButton text={step.template}/></div><div className="portfolio-example"><small>EXAMPLE</small><p>{step.example}</p></div></div></li>)}</ol></section>
        <section id="phrases"><div className="portfolio-section-title"><span>02</span><div><h2>Useful phrases</h2><p>강한 동사와 제한된 주장을 사용해 관찰, 해석, 결정, 결과를 구분합니다.</p></div></div><div className="phrase-groups">{phraseGroups.map(([title,phrases])=><section key={title}><h3>{title}</h3><ul>{phrases.map(([phrase,use])=><li key={phrase}><div><p>{phrase}</p><span>{use}</span></div><CopyButton text={phrase}/></li>)}</ul></section>)}</div></section>
        <section id="rewrite"><div className="portfolio-section-title"><span>03</span><div><h2>Write with evidence</h2><p>막연한 자기평가를 행동, 근거, 범위가 있는 문장으로 바꿉니다.</p></div></div><div className="rewrite-table" role="table" aria-label="피해야 할 문장과 개선 문장"><div className="rewrite-row rewrite-head" role="row"><span role="columnheader">AVOID</span><span role="columnheader">WRITE INSTEAD</span></div>{weakWriting.map(([weak,strong])=><div className="rewrite-row" role="row" key={weak}><p role="cell">{weak}</p><div role="cell"><p>{strong}</p><CopyButton text={strong}/></div></div>)}</div></section>
        <section id="checklist"><div className="portfolio-section-title"><span>04</span><div><h2>Editing checklist</h2><p>게시 전에는 예쁜 화면보다 주장의 근거와 읽는 순서를 먼저 확인하세요.</p></div></div><ol className="portfolio-checklist">{editingChecklist.map((item,index)=><li key={item}><span>{String(index+1).padStart(2,"0")}</span><p>{item}</p></li>)}</ol></section>
      </article>
    </div>
  </>;
}
