// 퀴즈 데이터 집계. data/*.quiz.mjs 파일을 모아 quizId로 조회한다.
// import.meta.glob은 Vite 전용이므로 이 모듈은 앱(브라우저)에서만 소비한다.
// node 테스트는 파일 시스템에서 직접 data/*.quiz.mjs를 로드해 검증한다.

const quizModules = import.meta.glob("./data/*.quiz.mjs", { eager: true });

/** @type {Record<string, import("./quizTypes").Quiz>} */
export const QUIZ_BANK = Object.fromEntries(
  Object.values(quizModules)
    .map((module) => module.default)
    .filter(Boolean)
    .map((quiz) => [quiz.id, quiz]),
);

export function getQuiz(quizId) {
  return QUIZ_BANK[quizId] ?? null;
}
