import type { ComponentType } from "react";

export type HandbookDocumentContent = {
  navHtml: string;
  mainHtml: string;
  ReactPage?: ComponentType;
  hideLearningTools?: boolean;
};
