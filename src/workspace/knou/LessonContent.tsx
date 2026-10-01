import { ExternalLink } from "lucide-react";
import jiraContent from "./jira-content.json";
import type { KnouItem, KnouSubject } from "./courses";
import { dataStructuresContent } from "./data-structures-content";

export type JiraBlock =
  | { type: "heading"; level: number; text: string }
  | { type: "paragraph" | "code"; text: string }
  | { type: "bullets" | "ordered" | "tasks"; items: string[] }
  | { type: "table"; rows: string[][] };
export type JiraEntry = { summary: string; status: string; blocks: JiraBlock[] };

const entries = { ...(jiraContent as Record<string, JiraEntry>), ...dataStructuresContent };
const urlPattern = /(https?:\/\/[^\s]+)/g;

function RichText({ text }: { text: string }) {
  return <>{text.split(urlPattern).map((part, index) => {
    if (!part.match(/^https?:\/\//)) return part;
    const url = part.replace(/[),.]$/, "");
    return <a key={index} href={url} target="_blank" rel="noreferrer">{url}<ExternalLink size={12} aria-hidden /></a>;
  })}</>;
}

function Block({ block }: { block: JiraBlock }) {
  if (block.type === "heading") return block.level <= 2 ? <h2>{block.text}</h2> : <h3>{block.text}</h3>;
  if (block.type === "paragraph") return <p><RichText text={block.text} /></p>;
  if (block.type === "code") return <pre><code>{block.text}</code></pre>;
  if (block.type === "table") return <div className="knou-table-wrap"><table><tbody>{block.rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => rowIndex === 0 ? <th key={cellIndex}>{cell}</th> : <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody></table></div>;
  const List = block.type === "ordered" ? "ol" : "ul";
  return <List className={block.type === "tasks" ? "knou-checks" : undefined}>{block.items.map((entry, index) => <li key={index}>{block.type === "tasks" && <span aria-hidden>□</span>}<RichText text={entry} /></li>)}</List>;
}

export function LessonContent({ item, subject }: { item: KnouItem; subject: KnouSubject }) {
  const entry = entries[item.key];
  const isDataStructures = subject.slug === "data-structures" && item.kind === "강의";
  return <div className="knou-lesson-body">
    <article className="knou-lesson-copy">
      <div className="knou-lesson-intro"><p>{isDataStructures ? "COURSE STUDY GUIDE" : "JIRA STUDY NOTE"}</p><strong>{entry?.summary ?? item.title}</strong><span>{isDataStructures ? "방송대 공식 교재 범위와 웹 학습자료를 교차 확인해 한 페이지로 정리했습니다." : "Jira에 기록된 학습 내용을 읽기 좋은 문서 구조로 옮겼습니다."}</span></div>
      {entry?.blocks.length ? entry.blocks.map((block, index) => <Block key={index} block={block} />) : <p className="knou-empty">아직 Jira에 작성된 상세 학습 내용이 없습니다.</p>}
    </article>
    <aside className="knou-sources" aria-labelledby="source-title">
      <p>OFFICIAL REFERENCE</p><h2 id="source-title">과목 자료</h2>
      <a href={subject.source.url} target="_blank" rel="noreferrer"><strong>{subject.source.label}</strong><span>{subject.source.description}</span><ExternalLink size={15} aria-hidden /></a>
      <small>회차 내용과 개인 학습 기록은 Jira 기준, 과목 범위는 방송대 공식 교과과정·출판문화원 자료를 기준으로 확인했습니다.</small>
    </aside>
  </div>;
}
