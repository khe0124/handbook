// 여러 도메인의 퀴즈 문제 풀에서 균등 배분으로 무작위 추출해 합성 퀴즈를 만든다.
// buildMixedQuiz 자체는 브라우저 API에 의존하지 않으므로 node 테스트에서 직접 검증한다.

function shuffled(list) {
  const copy = list.slice();
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function sample(list, count) {
  return shuffled(list).slice(0, count);
}

/**
 * @param {{ label: string, items: { id: string }[] }[]} domains - 선택 가능한 전체 도메인 정의 (quizDomains.mjs의 QUIZ_DOMAINS 형태)
 * @param {string[]} selectedDomainLabels - 사용자가 고른 도메인 label 목록
 * @param {(quizId: string) => import("./quizTypes").Quiz | null} getQuiz - id로 퀴즈를 조회하는 함수
 * @param {number} [targetCount]
 * @returns {import("./quizTypes").Quiz}
 */
export function buildMixedQuiz(domains, selectedDomainLabels, getQuiz, targetCount = 20) {
  const selected = domains.filter((domain) => selectedDomainLabels.includes(domain.label));

  if (selected.length === 0) {
    return { id: "quiz-mixed-session", title: "통합 랜덤 퀴즈", sourceQaId: "", questions: [] };
  }

  const base = Math.floor(targetCount / selected.length);
  const remainder = targetCount % selected.length;

  const sampledPerDomain = selected.map((domain, index) => {
    const pool = domain.items
      .map((item) => ({ quizId: item.id, quiz: getQuiz(item.id) }))
      .filter((entry) => entry.quiz)
      .flatMap((entry) =>
        entry.quiz.questions.map((question) => ({
          ...question,
          id: `${entry.quizId}:${question.id}`,
        })),
      );

    // 나머지(remainder)는 앞쪽 도메인부터 1개씩 더 배분한다.
    const share = base + (index < remainder ? 1 : 0);

    return sample(pool, Math.min(share, pool.length));
  });

  const questions = shuffled(sampledPerDomain.flat());

  return {
    id: "quiz-mixed-session",
    title: `통합 랜덤 퀴즈 (${selected.map((domain) => domain.label).join("·")})`,
    sourceQaId: "",
    questions,
  };
}
