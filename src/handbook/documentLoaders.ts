import { createElement, type ComponentType } from "react";
import { HANDBOOK_ITEMS } from "./catalog.mjs";
import type { HandbookDocumentContent } from "./types";

type HandbookItem = {
  id: string;
};

type HandbookDocumentModule = {
  default: HandbookDocumentContent;
};

type HandbookDocumentLoader = () => Promise<HandbookDocumentModule>;
type ReactPageModule = {
  default: ComponentType;
};

const documentModules = import.meta.glob<HandbookDocumentModule>("./documents/*.ts");
const roadmapModules = import.meta.glob<ReactPageModule>("./roadmaps/*RoadmapPage.tsx");

const ROADMAP_PAGE_LOADERS: Record<string, () => Promise<ReactPageModule>> = {
  "engineering-frontend-roadmap": roadmapModules["./roadmaps/FrontendRoadmapPage.tsx"],
  "engineering-backend-roadmap": roadmapModules["./roadmaps/BackendRoadmapPage.tsx"],
  "infra-roadmap": roadmapModules["./roadmaps/InfraRoadmapPage.tsx"],
};

function createReactPageLoader(loadPage: () => Promise<ReactPageModule>): HandbookDocumentLoader {
  return async () => {
    const module = await loadPage();

    return {
      default: {
        navHtml: "",
        mainHtml: "",
        ReactPage: module.default,
        hideLearningTools: true,
      },
    };
  };
}

function createQuizPageLoader(id: string): HandbookDocumentLoader {
  return async () => {
    if (id === "quiz-hub") {
      const module = await import("./quiz/QuizHubPage");

      return {
        default: {
          navHtml: "",
          mainHtml: "",
          ReactPage: module.default,
          hideLearningTools: true,
        },
      };
    }

    if (id === "quiz-mixed") {
      const module = await import("./quiz/MixedQuizPage");

      return {
        default: {
          navHtml: "",
          mainHtml: "",
          ReactPage: module.default,
          hideLearningTools: true,
        },
      };
    }

    const module = await import("./quiz/QuizPage");
    const QuizDocumentPage = () => createElement(module.default, { quizId: id.replace(/-quiz$/, "") });

    return {
      default: {
        navHtml: "",
        mainHtml: "",
        ReactPage: QuizDocumentPage,
        hideLearningTools: true,
      },
    };
  };
}

function getDocumentLoader(id: string): HandbookDocumentLoader {
  const roadmapLoader = ROADMAP_PAGE_LOADERS[id];

  if (roadmapLoader) {
    return createReactPageLoader(roadmapLoader);
  }

  if (id === "quiz-hub" || id === "quiz-mixed" || id.endsWith("-quiz")) {
    return createQuizPageLoader(id);
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
