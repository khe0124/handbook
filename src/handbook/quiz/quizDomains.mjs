// 퀴즈 허브 / 통합 랜덤 퀴즈가 공유하는 도메인 묶음.
// 프론트·백엔드·인프라·운영에서 빠져나와 "퀴즈" 메뉴로 옮겨진 목록에서 -quiz 항목만 골라 쓴다.
// 새 Q&A 문서에 퀴즈가 추가되면 이 목록도 자동으로 따라간다.
import {
  FRONTEND_QA_QUIZ_HANDBOOKS,
  BACKEND_QA_QUIZ_HANDBOOKS,
  INFRA_QA_QUIZ_HANDBOOKS,
  OPERATIONS_QA_QUIZ_HANDBOOKS,
} from "../catalog.mjs";

function quizItems(items) {
  return items.filter((item) => item.id.endsWith("-quiz"));
}

export const QUIZ_DOMAINS = [
  { label: "프론트엔드", items: quizItems(FRONTEND_QA_QUIZ_HANDBOOKS) },
  { label: "백엔드", items: quizItems(BACKEND_QA_QUIZ_HANDBOOKS) },
  { label: "인프라", items: quizItems(INFRA_QA_QUIZ_HANDBOOKS) },
  { label: "운영", items: quizItems(OPERATIONS_QA_QUIZ_HANDBOOKS) },
];
