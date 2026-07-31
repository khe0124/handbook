import { getQuiz } from "./quizBank.mjs";
import { QUIZ_DOMAINS } from "./quizDomains.mjs";

export function QuizHubPage() {
  const totalCount = QUIZ_DOMAINS.reduce((sum, domain) => sum + domain.items.length, 0);

  return (
    <article className="quiz-hub">
      <header className="hero">
        <div className="hero-serial">
          <span>DOC : QUIZ-HUB</span>
          <span>FORMAT : LINK INDEX</span>
        </div>
        <h1>퀴즈 허브</h1>
        <p className="hero-sub">
          프론트엔드·백엔드·인프라·운영 Q&amp;A에 딸린 퀴즈 {totalCount}개를 한 곳에 모았습니다. 도메인별로 하나씩 풀거나,
          아래 통합 랜덤 퀴즈로 여러 도메인을 섞어서 연습할 수 있습니다.
        </p>
      </header>

      <div className="ch-head">
        <span className="ch-code">MIX</span>
        <h2>통합 랜덤 퀴즈</h2>
      </div>
      <p className="lede">
        원하는 도메인을 골라 20문제를 무작위로 뽑아 풉니다. 선택한 도메인 수만큼 균등하게 배분됩니다.
      </p>
      <a className="quiz-hub-mixed-link" href="#" data-handbook-id="quiz-mixed">
        통합 랜덤 퀴즈 시작 →
      </a>

      <div className="ch-head">
        <span className="ch-code">LIST</span>
        <h2>도메인별 퀴즈</h2>
      </div>
      <div className="quiz-hub-domains">
        {QUIZ_DOMAINS.map((domain) => (
          <section className="quiz-hub-domain" key={domain.label}>
            <h3>{domain.label}</h3>
            <ul className="quiz-hub-domain-list">
              {domain.items.map((item) => {
                const quiz = getQuiz(item.id);
                return (
                  <li key={item.id}>
                    <a href="#" data-handbook-id={item.id}>
                      {item.label.replace(/^\d+\s*/, "")}
                    </a>
                    <span className="quiz-hub-domain-count">{quiz?.questions.length ?? 0}문항</span>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </article>
  );
}

export default QuizHubPage;
