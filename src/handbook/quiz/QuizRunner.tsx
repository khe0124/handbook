import { useState } from "react";
import type { Quiz } from "./quizTypes";

type QuizRunnerProps = {
  quiz: Quiz;
  onRestart?: () => void;
};

const LABELS = ["A", "B", "C", "D"];

function choiceState(
  choiceIndex: number,
  selectedIndex: number | undefined,
  answerIndex: number,
): "idle" | "correct" | "wrong" | "missed" {
  if (selectedIndex === undefined) return "idle";
  if (choiceIndex === answerIndex) return "correct";
  if (choiceIndex === selectedIndex) return "wrong";
  return "idle";
}

export function QuizRunner({ quiz, onRestart }: QuizRunnerProps) {
  // 문항 id → 선택한 보기 index. 선택하면 채점이 잠기고 다시 바꾸지 않는다.
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const total = quiz.questions.length;
  const answeredIds = Object.keys(answers);
  const answeredCount = answeredIds.length;
  const correctCount = quiz.questions.filter(
    (question) => answers[question.id] === question.answerIndex,
  ).length;
  const isComplete = answeredCount === total;

  const select = (questionId: string, choiceIndex: number) => {
    setAnswers((prev) =>
      questionId in prev ? prev : { ...prev, [questionId]: choiceIndex },
    );
  };

  const reset = () => {
    setAnswers({});
    onRestart?.();
  };

  return (
    <div className="quiz">
      <header className="quiz-head">
        <span className="quiz-kicker">QUIZ · 4지선다</span>
        <h1>{quiz.title}</h1>
        <p className="quiz-sub">
          각 문항의 보기를 고르면 즉시 정답과 해설이 표시됩니다. 원본 Q&amp;A 본문을 근거로 출제되었습니다.
        </p>
        <div className="quiz-progress" role="status" aria-live="polite">
          <span>
            진행 {answeredCount}/{total}
          </span>
          <span>
            정답 {correctCount}/{answeredCount || 0}
          </span>
          {isComplete ? (
            <button type="button" className="quiz-reset" onClick={reset}>
              다시 풀기
            </button>
          ) : null}
        </div>
      </header>

      {isComplete ? (
        <div
          className={`quiz-result ${correctCount === total ? "is-perfect" : ""}`}
          role="status"
        >
          <strong>
            {total}문항 중 {correctCount}문항 정답
          </strong>
          <span>
            {correctCount === total
              ? "전부 맞혔습니다. 오답 해설도 한 번 훑어보세요."
              : "틀린 문항의 해설을 다시 읽고 원본 Q&A로 돌아가 확인하세요."}
          </span>
        </div>
      ) : null}

      <ol className="quiz-list">
        {quiz.questions.map((question, questionIndex) => {
          const selectedIndex = answers[question.id];
          const isAnswered = selectedIndex !== undefined;
          const isCorrect = selectedIndex === question.answerIndex;

          return (
            <li key={question.id} className="quiz-item">
              <div className="quiz-q">
                <span className="quiz-q-num">
                  Q{String(questionIndex + 1).padStart(2, "0")}
                </span>
                <h2>{question.question}</h2>
              </div>
              <ul className="quiz-choices">
                {question.choices.map((choice, choiceIndex) => {
                  const state = choiceState(
                    choiceIndex,
                    selectedIndex,
                    question.answerIndex,
                  );
                  return (
                    <li key={choiceIndex}>
                      <button
                        type="button"
                        className={`quiz-choice is-${state}`}
                        disabled={isAnswered}
                        aria-pressed={selectedIndex === choiceIndex}
                        onClick={() => select(question.id, choiceIndex)}
                      >
                        <span className="quiz-choice-label">
                          {LABELS[choiceIndex] ?? choiceIndex + 1}
                        </span>
                        <span className="quiz-choice-text">{choice}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
              {isAnswered ? (
                <div
                  className={`quiz-explain ${isCorrect ? "is-correct" : "is-wrong"}`}
                >
                  <span className="quiz-verdict">
                    {isCorrect ? "정답" : "오답"}
                  </span>
                  <p>{question.explanation}</p>
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default QuizRunner;
