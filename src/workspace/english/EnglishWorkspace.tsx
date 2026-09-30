import { ArrowLeft, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { grammarCategories, grammarExamples, greWords, speakingGroups } from "./content.mjs";
import { PortfolioPage } from "./PortfolioPage";
import "./english.css";

type Section = "word" | "writing" | "speaking" | "portfolio";
const sections: {id:Section; label:string; description:string}[] = [
  {id:"word",label:"Word",description:"GRE 수준 핵심 어휘"},{id:"writing",label:"Writing",description:"문법 case별 예문"},{id:"speaking",label:"Speaking",description:"Business conversation"},{id:"portfolio",label:"Portfolio",description:"Case study writing"},
];

function WordPage(){
  const [query,setQuery]=useState("");
  const words=useMemo(()=>greWords.map((item,index)=>({item,index})).filter(({item:[word,korean,english,phonetic]})=>`${word} ${korean} ${english} ${phonetic}`.toLowerCase().includes(query.toLowerCase())),[query]);
  return <><h1 className="sr-only" tabIndex={-1} data-route-heading>GRE Word</h1><div className="english-toolbar"><label><span className="sr-only">단어 검색</span><Search size={16} aria-hidden/><input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="단어·한국어·영어 뜻 검색"/></label><span>{words.length.toLocaleString()} / {greWords.length.toLocaleString()} words</span></div><ol className="word-grid">{words.map(({item:[word,korean,english,phonetic],index})=><li key={word}><span>{String(index+1).padStart(4,"0")}</span><div><h2>{word}</h2><p className="word-korean">{korean}</p><p className="word-english">{english}</p>{phonetic&&<em>{phonetic}</em>}</div></li>)}</ol>{!words.length&&<p className="english-empty">일치하는 단어가 없습니다.</p>}<p className="word-source">한국어 뜻: <a href="https://github.com/jhseo1211/open-english-korean-dict" target="_blank" rel="noreferrer">Open English–Korean Dictionary</a> (CC BY-SA 4.0) 기반 · 미수록 고급 어휘는 영어 정의를 번역해 보완</p></>;
}

function WritingPage(){
  const [query,setQuery]=useState(""); const [category,setCategory]=useState("all");
  const examples=useMemo(()=>grammarExamples.filter(item=>(category==="all"||item.category===category)&&item.sentence.toLowerCase().includes(query.toLowerCase())),[query,category]);
  return <><h1 className="sr-only" tabIndex={-1} data-route-heading>Grammar Case Examples</h1><div className="english-toolbar english-writing-toolbar"><label><span className="sr-only">문장 검색</span><Search size={16}/><input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="문장 검색"/></label><select aria-label="문법 유형" value={category} onChange={e=>setCategory(e.target.value)}><option value="all">모든 문법 유형</option>{grammarCategories.map(name=><option key={name}>{name}</option>)}</select><span>{examples.length.toLocaleString()} / {grammarExamples.length.toLocaleString()}</span></div><ol className="sentence-list">{examples.map(item=><li key={item.id}><span>{String(item.id).padStart(4,"0")}</span><div><small>{item.category}</small><p>{item.sentence}</p></div></li>)}</ol>{!examples.length&&<p className="english-empty">조건에 맞는 문장이 없습니다.</p>}</>;
}

function SpeakingPage(){
  const [query,setQuery]=useState("");
  const groups=useMemo(()=>speakingGroups.map(([name,phrases])=>[name,phrases.filter(([en,ko])=>`${en} ${ko}`.toLowerCase().includes(query.toLowerCase()))]).filter(([,phrases])=>phrases.length),[query]);
  return <><h1 className="sr-only" tabIndex={-1} data-route-heading>Business Conversation</h1><div className="english-toolbar"><label><span className="sr-only">회화 검색</span><Search size={16}/><input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="영어·한국어 표현 검색"/></label><span>{groups.reduce((n,[,p])=>n+p.length,0).toLocaleString()} phrases</span></div><div className="speaking-groups">{groups.map(([name,phrases],index)=><section key={name}><div className="speaking-heading"><span>{String(index+1).padStart(2,"0")}</span><h2>{name}</h2></div><ul>{phrases.map(([en,ko])=><li key={en}><p>{en}</p><span>{ko}</span></li>)}</ul></section>)}</div>{!groups.length&&<p className="english-empty">일치하는 표현이 없습니다.</p>}</>;
}

export function EnglishWorkspace({pathname}:{pathname:string}){
  const part=pathname.replace(/\/+$/,"").split("/")[2] as Section|undefined;
  const active:Section=sections.some(s=>s.id===part)?part!:"word";
  return <div className="english-workspace"><a className="english-skip" href="#english-content">본문 바로가기</a><header className="english-header"><a className="english-wordmark" href="/english" data-workspace-link>English<span>LANGUAGE NOTES</span></a><nav aria-label="영어 학습 메뉴">{sections.map(section=><a key={section.id} href={`/english/${section.id}`} data-workspace-link aria-current={active===section.id?"page":undefined}>{section.label}<small>{section.description}</small></a>)}</nav><a className="english-back" href="/" data-workspace-link><ArrowLeft size={14}/>공간 선택</a></header><main id="english-content" className="english-main">{active==="word"?<WordPage/>:active==="writing"?<WritingPage/>:active==="speaking"?<SpeakingPage/>:<PortfolioPage/>}</main><footer className="english-footer"><span>READ · WRITE · SPEAK · PRESENT</span><span>매일 조금씩, 정확하게.</span></footer></div>;
}
