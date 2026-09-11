import { HANDBOOK_ITEMS } from "./catalog.mjs";
import type { HandbookDocumentContent } from "./types";

type HandbookItem = {
  id: string;
};

type HandbookDocumentModule = {
  default: HandbookDocumentContent;
};

type HandbookDocumentLoader = () => Promise<HandbookDocumentModule>;

const documentModules = import.meta.glob<HandbookDocumentModule>("./documents/*.ts");

function getDocumentLoader(id: string): HandbookDocumentLoader {
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
