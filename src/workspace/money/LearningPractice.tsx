import { useState } from "react";

type Practice = { title: string; steps: string[]; output: string; template: string[]; answer: string };

export function LearningPractice({ practice }: { practice: Practice }) {
  const [message, setMessage] = useState("");
  async function copyTemplate() {
    try {
      await navigator.clipboard.writeText(`# ${practice.title}\n\n${practice.template.map(line => `${line}\n: `).join("\n\n")}`);
      setMessage("작성 양식을 복사했습니다. 개인 노트나 스프레드시트에 붙여 넣어 작성하세요.");
    } catch {
      setMessage("자동 복사를 사용할 수 없습니다. 아래 양식의 텍스트를 직접 선택해 복사하세요.");
    }
  }
  return <section className="money-practice" aria-labelledby="money-practice-title">
    <h2 id="money-practice-title">직접 해보기 · {practice.title}</h2>
    <ol className="money-checks">{practice.steps.map(step => <li key={step}>{step}</li>)}</ol>
    <p><strong>완료 결과물</strong> · {practice.output}</p>
    <h3>작성 양식</h3>
    <p className="money-muted">개인 노트에서 작성하는 학습 양식입니다. 이 페이지는 입력값을 수집하거나 저장하지 않습니다.</p>
    <pre className="money-practice-template">{practice.template.map(line => `${line}\n: `).join("\n\n")}</pre>
    <button type="button" onClick={copyTemplate}>작성 양식 복사</button><p role="status">{message}</p>
    <h3>예시 해설과 검산 포인트</h3><p>{practice.answer}</p>
  </section>;
}
