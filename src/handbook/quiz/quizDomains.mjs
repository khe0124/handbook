// 퀴즈 허브 / 통합 랜덤 퀴즈가 공유하는 도메인 묶음.
// 각 도메인 그룹의 -quiz 항목을 그대로 필터링해서 만들기 때문에,
// 새 Q&A 문서에 퀴즈가 추가되면 이 목록도 자동으로 따라간다.
import {
  ENGINEERING_FRONTEND_HANDBOOKS,
  ENGINEERING_BACKEND_HANDBOOKS,
  INFRA_MENU_HANDBOOKS,
  OPERATIONS_GROUP_HANDBOOKS,
} from "../catalog.mjs";

function quizItems(items) {
  return items.filter((item) => item.id.endsWith("-quiz"));
}

export const QUIZ_DOMAINS = [
  { label: "프론트엔드", items: quizItems(ENGINEERING_FRONTEND_HANDBOOKS) },
  { label: "백엔드", items: quizItems(ENGINEERING_BACKEND_HANDBOOKS) },
  { label: "인프라", items: quizItems(INFRA_MENU_HANDBOOKS) },
  { label: "운영", items: quizItems(OPERATIONS_GROUP_HANDBOOKS) },
];
