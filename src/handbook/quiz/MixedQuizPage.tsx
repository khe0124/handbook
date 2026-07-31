import { useState } from "react";
import { getQuiz } from "./quizBank.mjs";
import { QUIZ_DOMAINS } from "./quizDomains.mjs";
import { buildMixedQuiz } from "./mixedQuiz.mjs";
import { QuizRunner } from "./QuizRunner";
import type { Quiz } from "./quizTypes";

const ALL_LABELS = QUIZ_DOMAINS.map((domain) => domain.label);

export function MixedQuizPage() {
  const [selectedLabels, setSelectedLabels] = useState<Set<string>>(() => new Set(ALL_LABELS));
  const [quiz, setQuiz] = useState<Quiz | null>(null);

  const toggle = (label: string) => {
    setSelectedLabels((prev) => {
      const next = new Set(prev);
      if (next.has(label)) {
        next.delete(label);
      } else {
        next.add(label);
      }
      return next;
    });
  };

  const start = () => {
    setQuiz(buildMixedQuiz(QUIZ_DOMAINS, [...selectedLabels], getQuiz) as Quiz);
  };

  const backToSelection = () => setQuiz(null);

  if (quiz) {
    return (
      <article className="quiz-mixed">
        <a className="quiz-mixed-back" href="#" onClick={(event) => { event.preventDefault(); backToSelection(); }}>
          ← 도메인 다시 선택
        </a>
        <QuizRunner quiz={quiz} onRestart={start} />
      </article>
    );
  }

  return (
    <article className="quiz-mixed">
      <header className="hero">
        <div className="hero-serial">
          <span>DOC : QUIZ-MIXED</span>
          <span>FORMAT : RANDOM 20</span>
        </div>
        <h1>통합 랜덤 퀴즈</h1>
        <p className="hero-sub">
          도메인을 하나 이상 고르면, 선택한 도메인에서 균등하게 배분해 20문제를 무작위로 뽑습니다.
        </p>
      </header>

      <ul className="quiz-mixed-domain-picker">
        {QUIZ_DOMAINS.map((domain) => (
          <li key={domain.label}>
            <label>
              <input
                type="checkbox"
                checked={selectedLabels.has(domain.label)}
                onChange={() => toggle(domain.label)}
              />
              {domain.label}
              <span className="quiz-mixed-domain-count">{domain.items.length}개 퀴즈</span>
            </label>
          </li>
        ))}
      </ul>

      <button type="button" className="quiz-mixed-start" disabled={selectedLabels.size === 0} onClick={start}>
        {selectedLabels.size === 0 ? "도메인을 하나 이상 선택하세요" : "20문제 시작"}
      </button>
    </article>
  );
}

export default MixedQuizPage;
