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

const isDirectRun = process.argv[1] === fileURLToPath(import.meta.url);

if (isDirectRun) {
  const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  const { HANDBOOK_ITEMS } = await import("../src/handbook/catalog.mjs");
  await generateHandbookDocuments({ rootDir, documents: HANDBOOK_ITEMS });
}
