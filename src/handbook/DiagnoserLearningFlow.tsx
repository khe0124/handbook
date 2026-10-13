import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

type Lesson = {
  id: string;
  title: string;
  purpose: string;
  questions: [string, string, string];
  recall: [string, string, string];
};

export const DIAGNOSER_LESSONS: Lesson[] = [
  { id:"diagnoser-roadmap",title:"시험 구조와 학습 지도",purpose:"합격 조건과 전체 학습 경로를 먼저 고정한다.",questions:["이론·실습의 배점과 과락 조건은?","설계 20개와 구현 49개는 어떻게 연결되는가?","읽기·판정·서술 훈련은 왜 분리하는가?"],recall:["가중 종합점수 공식을 말해보자.","진단원이 제출해야 할 증거를 세 가지 말해보자.","다음 페이지에서 먼저 배울 큰 개념은 무엇인가?"]},
  { id:"diagnoser-guide-part1",title:"개발보안이 필요한 이유",purpose:"보안약점·취약점과 개발단계 제거의 의미를 이해한다.",questions:["보안약점과 취약점은 어떻게 다른가?","운영 패치보다 개발단계 제거가 유리한 이유는?","가이드 PART1~5는 어떤 증거를 다루는가?"],recall:["보안약점을 한 문장으로 정의하자.","개발보안의 목표를 비용·위험 관점에서 설명하자.","PART1~5의 역할을 순서대로 말하자."]},
  { id:"diagnoser-guide-part2",title:"개발보안 체계와 역할",purpose:"발주기관·개발자·진단원의 책임과 단계별 절차를 연결한다.",questions:["세 주체의 책임은 어떻게 다른가?","설계 진단과 구현 진단의 입력은?","1차·2차 진단은 무엇을 확인하는가?"],recall:["진단원이 개발자와 다른 이유를 말하자.","착수부터 이행확인까지 순서를 말하자.","기준본이 필요한 이유를 설명하자."]},
  { id:"diagnoser-process",title:"증거 중심 진단 프로세스",purpose:"범위 확정부터 재진단까지 반복 가능한 절차를 만든다.",questions:["진단범위는 어떻게 확정하는가?","도구 결과를 왜 바로 정탐이라 할 수 없는가?","재진단은 수정 line 외에 무엇을 보는가?"],recall:["Source–Sink 판정 순서를 말하자.","오탐에 필요한 증거 네 가지를 말하자.","유지보수 사업의 영향범위를 설명하자."]},
  { id:"diagnoser-design-criteria",title:"설계 20개 공통 판정법",purpose:"설계기준을 자산·위협·통제·실패·검수의 구조로 이해한다.",questions:["좋은 보안요구사항의 조건은?","문서가 있어도 부적합한 경우는?","설계와 구현은 어떻게 추적되는가?"],recall:["4분류와 20개 구조를 재현하자.","추상적 설계문장을 구체화해보자.","적합 판정 증거 다섯 칸을 말하자."]},
  { id:"diagnoser-guide-part3",title:"분석·설계 원문 심화",purpose:"20개 기준을 원문 순서와 산출물 적용 위치로 깊게 익힌다.",questions:["정보와 기능은 어떻게 식별하는가?","요구사항부터 시험계획까지 무엇을 추적하는가?","정책값 불일치는 어떻게 보고하는가?"],recall:["임의의 설계기준 하나를 다섯 칸으로 설명하자.","관련 구현약점을 두 개 연결하자.","부정 testcase를 하나 만들자."]},
  { id:"diagnoser-design-workbook",title:"설계 산출물 적용",purpose:"20개 기준을 실제 문서 불일치 판정과 답안으로 바꾼다.",questions:["현황과 문제점은 어떻게 구분하는가?","부분점수를 받는 개선안은 어떤 문장인가?","검수 가능한 testcase는 어떻게 쓰는가?"],recall:["무작위 사례의 불일치를 한 문장으로 쓰자.","원인·영향·개선을 각각 쓰자.","5점 채점표로 빠진 항목을 확인하자."]},
  { id:"diagnoser-implementation-weaknesses",title:"구현 49개 공통 원리",purpose:"49개를 7분류와 데이터 흐름으로 구조화한다.",questions:["7분류는 어떤 실패를 묶는가?","Source·propagation·Sink란 무엇인가?","안전 API 이름만으로 충분하지 않은 이유는?"],recall:["7분류를 순서대로 말하자.","혼동하기 쉬운 약점 두 쌍을 구분하자.","정탐 답안의 필수 요소를 말하자."]},
  { id:"diagnoser-guide-part4",title:"구현 49개 원문 심화",purpose:"각 약점의 원인·영향·진단·개선·오탐을 완결한다.",questions:["각 약점에서 최초로 찾을 증거는?","통제 우회 가능성은 어떻게 확인하는가?","개선 후 어떤 입력을 재시험하는가?"],recall:["무작위 약점 하나를 여섯 문장으로 설명하자.","오탐 조건과 증거를 말하자.","같은 패턴의 확장점검 범위를 정하자."]},
  { id:"diagnoser-code-casebook",title:"49개 코드 판정",purpose:"취약·안전·오탐 코드를 나란히 비교해 판정력을 만든다.",questions:["외부 통제 입력은 어디서 시작하는가?","위험 연산은 어떤 보안속성을 깨뜨리는가?","수정이 원인을 직접 제거했는가?"],recall:["코드 없이 Source–Sink를 그려보자.","취약 코드를 안전 코드로 바꾸어 설명하자.","정상·악성·경계 재시험을 만들자."]},
  { id:"diagnoser-language-guide",title:"언어·프레임워크 변형",purpose:"언어가 바뀌어도 같은 원리로 진단한다.",questions:["MyBatis ${}와 #{}의 차이는?","Path.Combine·PreparedStatement가 실패하는 조건은?","C/C++와 PHP의 고유 진단점은?"],recall:["세 언어에서 SQL 삽입 Sink를 말하자.","안전 API 함정 두 개를 설명하자.","언어 공통 5문장 답안을 재현하자."]},
  { id:"diagnoser-report-practice",title:"정·오탐과 보고서",purpose:"분석 결과를 채점 가능한 진단 문장으로 작성한다.",questions:["정탐과 오탐의 증거 구조는?","보고서 6칸에는 무엇이 들어가는가?","개선안은 어느 수준까지 구체적이어야 하는가?"],recall:["정탐 보고문을 60초에 말하자.","오탐 보고문을 반례와 함께 말하자.","재진단 완료조건을 적어보자."]},
  { id:"diagnoser-guide-part5",title:"부록과 추적표",purpose:"기준표와 산출물 예시를 실전 증적 관리도구로 사용한다.",questions:["부록은 암기표와 어떻게 다른가?","20개·49개를 기능에 어떻게 mapping하는가?","잔여위험은 어디에 남기는가?"],recall:["요구–설계–구현–시험 추적선을 그리자.","누락된 증적을 찾는 방법을 말하자.","보완 결과 기록 항목을 말하자."]},
  { id:"diagnoser-theory-qa",title:"이론 회상 A",purpose:"기본 개념을 답 없이 자기 말로 설명한다.",questions:["정의만 말하지 않고 어떤 근거를 붙여야 하는가?","혼동쌍은 어떻게 비교하는가?","60초 답변 구조는 무엇인가?"],recall:["열 질문 중 막힌 질문을 다시 답하자.","빠진 핵심어를 세 개 적자.","틀린 개념의 반례를 만들자."]},
  { id:"diagnoser-theory-b-qa",title:"이론 회상 B",purpose:"경계조건과 예외를 중심으로 개념을 심화한다.",questions:["binding과 allowlist의 경계는?","암호화·MAC·서명은 어떻게 다른가?","오류 유형들은 어떻게 구분하는가?"],recall:["심화 질문 세 개를 60초씩 답하자.","비슷한 개념 하나를 반례로 구분하자.","판정 증거와 개선을 함께 말하자."]},
  { id:"diagnoser-theory-quiz",title:"이론 모의 A",purpose:"기본 범위의 회상과 구분 능력을 60분에 측정한다.",questions:["답을 보기 전 근거를 말했는가?","오답이 지식·구분·흐름 중 무엇인가?","80점에 도달했는가?"],recall:["틀린 선택지가 왜 틀렸는지 설명하자.","오답 개념을 새 사례에 적용하자.","점수와 오류코드를 기록하자."]},
  { id:"diagnoser-theory-b-quiz",title:"이론 모의 B",purpose:"함정과 경계조건을 독립된 30문항으로 검증한다.",questions:["A형 암기가 아닌 원리로 풀고 있는가?","안전 API 함정을 구분하는가?","가중점수 계산을 정확히 하는가?"],recall:["A/B 공통 오답 유형을 찾자.","반복 오답 세 개를 구술하자.","두 시험 모두 80점인지 확인하자."]},
  { id:"diagnoser-practical-mock-a",title:"실습 모의 A",purpose:"코드 15문항을 100분 안에 완주한다.",questions:["판정을 먼저 선언했는가?","Source–Sink와 영향이 연결됐는가?","개선·재시험이 구체적인가?"],recall:["빈 문항 없이 완주했는가?","부분점수 누락을 계산하자.","반복된 오류코드를 표시하자."]},
  { id:"diagnoser-practical-mock-b",title:"실습 모의 B",purpose:"설계·오탐·보고서 혼합 문제로 전이 능력을 검증한다.",questions:["문서 불일치와 코드약점을 구분했는가?","오탐을 객관적 증거로 입증했는가?","추상적 개선안을 피했는가?"],recall:["A/B 모두 70점인지 확인하자.","가장 큰 감점 원인을 고치자.","시간이 부족한 문항 유형을 기록하자."]},
  { id:"diagnoser-error-review",title:"오답 1·3·7일 회독",purpose:"틀린 이유를 분류하고 새 사례로 기억을 고정한다.",questions:["오류 8분류 중 어디에 해당하는가?","원문항 기억과 개념 숙달을 어떻게 구분하는가?","D+7 통과조건은 무엇인가?"],recall:["미해결 오류를 우선순위로 정하자.","D+1·3·7 일정을 기록하자.","최종 gate 미충족 항목을 찾자."]},
  { id:"diagnoser-final-review",title:"시험 직전 압축",purpose:"새 내용을 멈추고 회상 속도와 답안 완결성을 안정화한다.",questions:["숫자·분류·혼동쌍이 즉시 나오는가?","15문항 시간배분은 준비됐는가?","제출 전 확인할 여섯 칸은?"],recall:["빈 종이에 전체 지도를 재현하자.","가장 약한 세 항목만 복습하자.","시험 당일 행동 순서를 말하자."]},
  { id:"diagnoser-curriculum-plan",title:"완료도와 응시 결정",purpose:"읽기 완료가 아닌 점수와 회상 증거로 응시 여부를 결정한다.",questions:["모든 학습 산출물이 갖춰졌는가?","이론·실습·회상 gate를 통과했는가?","남은 위험과 보완일정은 무엇인가?"],recall:["최종 점수를 기록하자.","미통과 gate의 다음 행동을 정하자.","모든 조건을 통과했을 때만 준비 완료로 표시하자."]},
];

const STORAGE_KEY="diagnoser-learning-completed-v1";
function readCompleted(){try{return new Set<string>(JSON.parse(localStorage.getItem(STORAGE_KEY)??"[]"));}catch{return new Set<string>();}}

type Props={itemId:string;position:"start"|"end";onSelect?:(id:string)=>void};
export function DiagnoserLearningFlow({itemId,position,onSelect}:Props){
  const index=DIAGNOSER_LESSONS.findIndex((lesson)=>lesson.id===itemId);
  const [completed,setCompleted]=useState<Set<string>>(()=>readCompleted());
  useEffect(()=>setCompleted(readCompleted()),[itemId]);
  if(index<0)return null;
  const lesson=DIAGNOSER_LESSONS[index];
  const previous=DIAGNOSER_LESSONS[index-1];
  const next=DIAGNOSER_LESSONS[index+1];
  const isDone=completed.has(itemId);
  const toggle=()=>setCompleted((current)=>{const updated=new Set(current);isDone?updated.delete(itemId):updated.add(itemId);localStorage.setItem(STORAGE_KEY,JSON.stringify([...updated]));return updated;});
  if(position==="start")return <aside className="diagnoser-study-start" aria-labelledby="diagnoser-study-title">
    <div className="diagnoser-study-progress"><span>선형 교재 {index+1} / {DIAGNOSER_LESSONS.length}</span><progress value={index+1} max={DIAGNOSER_LESSONS.length} aria-label={`진단원 학습 ${index+1}/${DIAGNOSER_LESSONS.length}`}/></div>
    <div className="diagnoser-study-heading"><span className="diagnoser-study-kicker">READ · RECALL · CONNECT</span><h2 id="diagnoser-study-title">{lesson.title}</h2><p>{lesson.purpose}</p></div>
    <div className="diagnoser-study-grid"><div><h3>먼저 3분 복습</h3>{previous?<><p className="diagnoser-study-muted">답을 보지 말고 이전 장을 떠올립니다.</p><ul>{previous.recall.map((q)=><li key={q}>{q}</li>)}</ul></>:<p>첫 장입니다. 합격조건과 전체 지도를 만들 준비를 합니다.</p>}</div><div><h3>이번 장의 핵심 질문</h3><ol>{lesson.questions.map((q)=><li key={q}>{q}</li>)}</ol></div></div>
    <p className="diagnoser-study-instruction"><strong>읽는 법:</strong> 본문을 읽다가 핵심 질문의 답을 찾으면 잠시 멈춰 자기 말로 설명합니다. 외우려고 되읽기보다 원인 → 흐름 → 증거 → 개선을 연결합니다.</p>
  </aside>;
  return <section className="diagnoser-study-end" aria-labelledby="diagnoser-recall-title"><div className="ch-head"><span className="ch-code">RECALL</span><h2 id="diagnoser-recall-title">책을 덮기 전 5분 회상</h2></div><p className="lede">아래 질문에 자료를 보지 않고 답한 다음, 막힌 부분만 본문에서 다시 찾습니다.</p><ol className="diagnoser-recall-list">{lesson.recall.map((q)=><li key={q}>{q}</li>)}</ol><button type="button" className={`diagnoser-complete${isDone?" is-complete":""}`} onClick={toggle} aria-pressed={isDone}><Check size={18} aria-hidden/>{isDone?"회상까지 완료함":"세 질문에 답했으면 완료 표시"}</button><nav className="diagnoser-lesson-nav" aria-label="진단원 선형 학습 이동"><button type="button" disabled={!previous} onClick={()=>previous&&onSelect?.(previous.id)}><ChevronLeft size={17} aria-hidden/><span><small>이전 학습</small>{previous?.title??"첫 장"}</span></button><button type="button" disabled={!next} onClick={()=>next&&onSelect?.(next.id)}><span><small>다음 학습</small>{next?.title??"과정 완료"}</span><ChevronRight size={17} aria-hidden/></button></nav></section>;
}
