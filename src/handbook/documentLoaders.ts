import { HANDBOOK_ITEMS } from "./catalog.mjs";
import type { HandbookDocumentContent } from "./types";
import type { ComponentType } from "react";

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

function getDocumentLoader(id: string): HandbookDocumentLoader {
  if (ROADMAP_PAGE_LOADERS[id]) {
    return ROADMAP_PAGE_LOADERS[id];
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
