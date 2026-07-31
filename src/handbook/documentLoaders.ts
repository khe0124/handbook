import { HANDBOOK_ITEMS } from "./catalog.mjs";
import { getQuiz } from "./quiz/quizBank.mjs";
import { QuizPage } from "./quiz/QuizPage";
import { QuizHubPage } from "./quiz/QuizHubPage";
import { MixedQuizPage } from "./quiz/MixedQuizPage";
import type { HandbookDocumentContent } from "./types";
import type { ComponentType } from "react";
import { createElement } from "react";

type HandbookItem = {
  id: string;
};

type HandbookDocumentModule = {
  default: HandbookDocumentContent;
};

type HandbookReactPageModule = {
  default: ComponentType;
};

type HandbookDocumentLoader = () => Promise<HandbookDocumentModule>;

const documentModules = import.meta.glob<HandbookDocumentModule>("./documents/*.ts");
const roadmapPageModules = import.meta.glob<HandbookReactPageModule>("./roadmaps/*RoadmapPage.tsx");

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// -quiz 페이지는 QuizPage를 quizId에 바인딩해 렌더한다. 정적 HTML을 만들지 않는 React 전용 페이지다.
function buildQuizLoader(quizId: string): HandbookDocumentLoader {
  return () =>
    Promise.resolve().then(() => {
      const quiz = getQuiz(quizId);
      const title = quiz?.title ?? "퀴즈";
      const navHtml =
        `<div class="nav-brand">QUIZ</div><div class="nav-title">${escapeHtml(title)}</div>` +
        '<a href="#top"><span class="code">4지선다</span>문항 풀이</a>';

      return {
        default: {
          navHtml,
          mainHtml: "",
          ReactPage: () => createElement(QuizPage, { quizId }),
          hideLearningTools: true,
        },
      };
    });
}

export const ROADMAP_PAGE_LOADERS: Record<string, HandbookDocumentLoader> = {
  "engineering-frontend-roadmap": () =>
    roadmapPageModules["./roadmaps/FrontendRoadmapPage.tsx"]().then((module) => ({
      default: {
        navHtml:
          '<div class="nav-brand">ROADMAP · FRONTEND</div><div class="nav-title">프론트엔드 전체 로드맵</div><a href="#roadmap-overview"><span class="code">MAP</span>개요</a><a href="#roadmap-diagram"><span class="code">FLOW</span>다이어그램</a><a href="#roadmap-sequence"><span class="code">SEQ</span>학습 순서</a><a href="#roadmap-gates"><span class="code">GATE</span>완료 기준</a>',
        mainHtml: "",
        ReactPage: module.default,
        hideLearningTools: true,
      },
    })),
  "engineering-backend-roadmap": () =>
    roadmapPageModules["./roadmaps/BackendRoadmapPage.tsx"]().then((module) => ({
      default: {
        navHtml:
          '<div class="nav-brand">ROADMAP · BACKEND</div><div class="nav-title">백엔드 전체 로드맵</div><a href="#roadmap-overview"><span class="code">MAP</span>개요</a><a href="#roadmap-diagram"><span class="code">FLOW</span>다이어그램</a><a href="#roadmap-sequence"><span class="code">SEQ</span>학습 순서</a><a href="#roadmap-gates"><span class="code">GATE</span>완료 기준</a>',
        mainHtml: "",
        ReactPage: module.default,
        hideLearningTools: true,
      },
    })),
  "infra-roadmap": () =>
    roadmapPageModules["./roadmaps/InfraRoadmapPage.tsx"]().then((module) => ({
      default: {
        navHtml:
          '<div class="nav-brand">ROADMAP · INFRA</div><div class="nav-title">인프라 전체 로드맵</div><a href="#roadmap-overview"><span class="code">MAP</span>개요</a><a href="#roadmap-diagram"><span class="code">FLOW</span>다이어그램</a><a href="#roadmap-sequence"><span class="code">SEQ</span>학습 순서</a><a href="#roadmap-gates"><span class="code">GATE</span>완료 기준</a>',
        mainHtml: "",
        ReactPage: module.default,
        hideLearningTools: true,
      },
    })),
};

// 도메인에 흩어진 기존 퀴즈를 모아 보여주는 허브와, 도메인을 섞어 무작위로 푸는 통합 모드.
// 둘 다 public/handbook/*.html 원본 없이 React 컴포넌트만으로 렌더한다.
export const QUIZ_TOOL_PAGE_LOADERS: Record<string, HandbookDocumentLoader> = {
  "quiz-hub": () =>
    Promise.resolve({
      default: {
        navHtml: '<div class="nav-brand">QUIZ</div><div class="nav-title">퀴즈 허브</div><a href="#top"><span class="code">HUB</span>전체 보기</a>',
        mainHtml: "",
        ReactPage: QuizHubPage,
        hideLearningTools: true,
      },
    }),
  "quiz-mixed": () =>
    Promise.resolve({
      default: {
        navHtml: '<div class="nav-brand">QUIZ</div><div class="nav-title">통합 랜덤 퀴즈</div><a href="#top"><span class="code">MIX</span>도메인 섞어 풀기</a>',
        mainHtml: "",
        ReactPage: MixedQuizPage,
        hideLearningTools: true,
      },
    }),
};

function getDocumentLoader(id: string): HandbookDocumentLoader {
  if (ROADMAP_PAGE_LOADERS[id]) {
    return ROADMAP_PAGE_LOADERS[id];
  }

  if (QUIZ_TOOL_PAGE_LOADERS[id]) {
    return QUIZ_TOOL_PAGE_LOADERS[id];
  }

  if (id.endsWith("-quiz")) {
    return buildQuizLoader(id);
  }

  const loader = documentModules[`./documents/${id}.ts`];

  if (!loader) {
    return () => Promise.reject(new Error(`Missing handbook document module: ${id}`));
  }

  return loader;
}

export const HANDBOOK_DOCUMENT_LOADERS: Record<
  string,
  HandbookDocumentLoader
> = Object.fromEntries(
  (HANDBOOK_ITEMS as HandbookItem[]).map((item) => [item.id, getDocumentLoader(item.id)]),
);
