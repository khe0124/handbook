import { mkdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

export function extractHandbookDocument(html) {
  const nav = html.match(/<nav\b[^>]*>([\s\S]*?)<\/nav>/i);
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);

  if (!nav || !main) {
    throw new Error("Expected handbook HTML to include nav and main regions");
  }

  return {
    navHtml: nav[1].trim(),
    mainHtml: main[1].trim(),
  };
}

function tsString(value) {
  return JSON.stringify(value);
}

export async function generateHandbookDocuments({ rootDir, documents }) {
  const outDir = path.join(rootDir, "src", "handbook", "documents");
  const tempOutDir = path.join(rootDir, "src", "handbook", `.documents-tmp-${process.pid}`);
  const records = [];

  for (const doc of documents) {
    const source = path.join(rootDir, "public", "handbook", doc.file);
    const html = await readFile(source, "utf8");
    const extracted = extractHandbookDocument(html);
    records.push({ doc, extracted });
  }

  await rm(tempOutDir, { recursive: true, force: true });
  await mkdir(tempOutDir, { recursive: true });

  for (const { doc, extracted } of records) {
    const output = `import type { HandbookDocumentContent } from "../types";

const document: HandbookDocumentContent = {
  navHtml: ${tsString(extracted.navHtml)},
  mainHtml: ${tsString(extracted.mainHtml)},
};

export default document;
`;

    await writeFile(path.join(tempOutDir, `${doc.id}.ts`), output);
  }

  const loaderOutput = `import { HANDBOOK_ITEMS } from "./catalog.mjs";
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
  const loader = documentModules[\`./documents/\${id}.ts\`];

  if (!loader) {
    return () => Promise.reject(new Error(\`Missing handbook document module: \${id}\`));
  }

  return loader;
}

export const HANDBOOK_DOCUMENT_LOADERS: Record<
  string,
  HandbookDocumentLoader
> = Object.fromEntries(
  (HANDBOOK_ITEMS as HandbookItem[]).map((item) => [item.id, getDocumentLoader(item.id)]),
);
`;

  await writeFile(path.join(rootDir, "src", "handbook", "documentLoaders.ts"), loaderOutput);
  await rm(outDir, { recursive: true, force: true });
  await rename(tempOutDir, outDir);
}

function decodeHtmlEntities(text) {
  return text
    .replace(/&nbsp;|&#160;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");
}

function toPlainText(html) {
  return decodeHtmlEntities(html.replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

export function extractSearchSections(mainHtml) {
  const chunks = mainHtml.split(/<section\b/).slice(1);

  return chunks
    .map((chunk) => {
      const sectionId = chunk.match(/^[^>]*\bid="([^"]+)"/)?.[1];

      if (!sectionId) {
        return null;
      }

      const title = toPlainText(chunk.match(/<h2[^>]*>([\s\S]*?)<\/h2>/)?.[1] ?? "");
      const code = toPlainText(chunk.match(/<span class="ch-code">([\s\S]*?)<\/span>/)?.[1] ?? "");
      const summarySource =
        chunk.match(/<p class="lede"[^>]*>([\s\S]*?)<\/p>/)?.[1] ??
        chunk.match(/<p[^>]*>([\s\S]*?)<\/p>/)?.[1] ??
        "";
      const summary = toPlainText(summarySource).slice(0, 200);

      if (!title && !summary) {
        return null;
      }

      return { sectionId, code, title, summary };
    })
    .filter(Boolean);
}

export async function generateSearchIndex({ rootDir, documents, groups }) {
  const groupLabelByItemId = new Map();

  for (const group of groups) {
    for (const item of group.items) {
      groupLabelByItemId.set(item.id, group.label);
    }
  }

  const entries = [];

  for (const doc of documents) {
    const source = path.join(rootDir, "public", "handbook", doc.file);
    const html = await readFile(source, "utf8");
    const { mainHtml } = extractHandbookDocument(html);

    for (const section of extractSearchSections(mainHtml)) {
      entries.push({
        docId: doc.id,
        docLabel: doc.label,
        groupLabel: groupLabelByItemId.get(doc.id) ?? "",
        ...section,
      });
    }
  }

  const output = `// 자동 생성 파일. npm run generate:handbook 이 갱신한다. 직접 수정 금지.
export const SEARCH_INDEX = ${JSON.stringify(entries)};
`;

  await writeFile(path.join(rootDir, "src", "handbook", "searchIndex.mjs"), output);

  return entries;
}

const isDirectRun = process.argv[1] === fileURLToPath(import.meta.url);

if (isDirectRun) {
  const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  const { HANDBOOK_GROUPS, HANDBOOK_ITEMS } = await import("../src/handbook/catalog.mjs");
  await generateHandbookDocuments({ rootDir, documents: HANDBOOK_ITEMS });
  await generateSearchIndex({ rootDir, documents: HANDBOOK_ITEMS, groups: HANDBOOK_GROUPS });
}
