import { useMemo } from "react";
import { getQuiz } from "./quizBank.mjs";
import { QuizRunner } from "./QuizRunner";
import type { Quiz } from "./quizTypes";

type QuizPageProps = {
  quizId: string;
};

export function QuizPage({ quizId }: QuizPageProps) {
  const quiz = useMemo(() => getQuiz(quizId) as Quiz | null, [quizId]);

  if (!quiz) {
    return (
      <section className="quiz-empty">
        <p>퀴즈 데이터를 찾을 수 없습니다: {quizId}</p>
      </section>
    );
  }

  return <QuizRunner quiz={quiz} />;
}

export default QuizPage;
