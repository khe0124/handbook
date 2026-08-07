# Handbook Table-to-Prose Conversion Methodology

Date: 2026-08-07

This process records the workflow used to convert table-heavy handbook documents into readable prose, using the "운영" (Operations) top-level menu (15 documents: 7 operations-core + 8 engineering-context) as the worked example. Use this as the playbook for applying the same treatment to other menus (인프라, 백엔드, 프론트엔드, etc.) in future sessions.

## 0. Why this exists

The user's original complaint: chapter content was organized as dense 3-column tables ("운영 질문 / 확인할 증거 / 판단 기준" style) that were hard to parse. First pass converted tables to prose but kept sentences terse — just table cells concatenated with periods. Second pass (after feedback: "설명이 불친절해, 더 자세히 풀어서 설명해") rewrote every paragraph in a genuinely explanatory voice. Both passes are folded into this methodology; do the explanatory version from the start next time.

## 1. Resolve the Scope

Do not guess which files back a menu. Trace it through the actual wiring:

1. Open `src/handbook/catalog.mjs`. Find `HANDBOOK_GROUPS` — this defines the top-level nav menus in order, each with a `key`, `label`, and `items`.
2. The `items` array for a group often isn't a literal list — trace backward through intermediate consts (e.g. `OPERATIONS_GROUP_HANDBOOKS = renumberMenuItems([...OPERATIONS_CORE_HANDBOOKS, ...ENGINEERING_CONTEXT_HANDBOOKS])`) until you reach the literal `{ id, label, file }` entries.
3. Cross-check membership with `scripts/handbook-html.test.mjs` — it usually has a test asserting exact group membership and counts (e.g. `assert.equal(operationsGroup?.items.length, 15)`), which is a reliable ground truth.

For the "운영" menu, the resolved scope was 15 documents:
- 7 operations-core: `operations-delivery-pipeline`, `operations-runtime-orchestration`, `operations-iac-change`, `operations-observability-slo`, `operations-incident-dr`, `operations-checklist-interview`, `operations-ai-llm-operations`
- 8 engineering-context: `context-scale-systems`, `context-platform-productivity`, `context-quality-release`, `context-performance-metrics`, `context-library-oss`, `context-migration-compatibility`, `context-frontend-runtime-ecosystem`, `context-operational-ownership`

When scope is ambiguous (e.g. a menu draws from two different sub-groups), ask the user to confirm which sub-groups are in scope before starting. Also ask whether to do one pilot document first and get sign-off before batch-applying — this caught real problems (test breakage, tone calibration) before they multiplied across 15 files.

## 2. Find the Real Source of Truth Before Editing Anything

This codebase has a **generated-file trap**: `src/handbook/documents/{id}.ts` looks like normal source (it's committed, it's TypeScript, it's what the React app imports) but it is **fully regenerated** from `public/handbook/{id}-handbook.html` by `scripts/handbook-html.mjs`.

- **Edit `public/handbook/{id}-handbook.html` directly.** It's plain HTML with a `<nav>` and `<main>` region — readable, diffable, and the actual source of truth.
- Never hand-edit `src/handbook/documents/*.ts` — it will be silently overwritten the next time anyone runs `npm run generate:handbook`, and your edit will look reverted with no diff to explain why.
- `src/handbook/searchIndex.mjs` is also generated (from the same HTML, extracting section titles/summaries for search).

### Critical gotcha: `npm run generate:handbook` corrupts `documentLoaders.ts`

`scripts/handbook-html.mjs` regenerates `src/handbook/documentLoaders.ts` from a hardcoded template that **does not know about** hand-added loader logic — specifically the quiz page loaders (`buildQuizLoader`, `QUIZ_TOOL_PAGE_LOADERS`) and the React roadmap page loaders (`ROADMAP_PAGE_LOADERS`) that some prior session added directly to that file. Running the generator wipes ~107 lines of that logic with no warning.

**Every time you run `npm run generate:handbook`, immediately run `git checkout -- src/handbook/documentLoaders.ts` afterward** and confirm `git status` shows no diff on that file. Do this before you consider the regeneration step done. This bug is out of scope to fix during a content pass — just work around it every time.

## 3. Understand the Test Coupling Before Converting

`scripts/handbook-html.test.mjs` is a large (3000+ line) regression suite that, for some document families, hardcodes literal markup shape, not just content — e.g. requiring a `<table>` with specific header text ("Command / Query", "정상 출력", "즉시 완화"), or an exact TERM glossary `<table>` with five specific Korean column headers. This is a real contract, not incidental — but it encodes the *previous* structural decision (tables), which is exactly what this task changes.

Before converting a document family, grep the test file for anything referencing that family's document ids, unique headings, or literal phrases from its lede/case sections. Classify each hit:

- **(a) Structural/markup assertions** — requires `<table>`, a specific div class, or literal column-header text. These *will* break when you remove tables and must be rewritten to check substance instead of shape (see §5).
- **(b) Content/vocabulary assertions** — requires a technical term or phrase to appear *somewhere* in the document/combined source. These survive a prose rewrite automatically as long as you keep the vocabulary — no action needed.
- **(c) Exact-sentence assertions** — requires one specific sentence to appear byte-for-byte (usually from a `<p class="lede">`). **Never touch `<p class="lede">` paragraphs when rewriting** — treat them as frozen. All rewriting in this project touched only the paragraphs *after* the lede.

For the operations menu, the relevant tests were:
- `"operations handbooks include command interpretation and practice labs"` (~line 451) — has a `.filter(entry => entry.id !== "operations-ai-llm-operations")`, i.e. one document is already exempted from the strict format; check for exemptions like this before assuming uniform rules.
- `"operations handbook follows a service operations lifecycle roadmap"` (~line 3300) — the big one, loops over all 14 base operations docs (7 infra-classified + 7 core) with per-file TERM/PRACTICE-LAB structural checks.
- `"engineering context handbooks include metric anchor packets"` and `"...teach product-organization engineering literacy"` — for context docs, these only check for `context_metric_anchor_packet` YAML markers and specific vocabulary/numbers inside `CASE` sections. No table requirement at all — context docs needed **zero test-file changes**, only content changes, as long as `<div class="case-grid">` sections and exact numbers inside them were left untouched.

## 4. Convert Tables to Prose: Section-by-Section Rules

Read the whole document first. Structure is consistent within a document family (operations-core docs all follow ch1..ch10 + CHECK/PLAYBOOK/PRACTICE/TERM/CASE/RISK/EVIDENCE; context docs follow own-01..06/scale-01..06 style + METRIC/CASE/OUTPUT).

- **Chapter tables** (`운영 질문 / 확인할 증거 / 판단 기준`, 3 rows): fold each row into flowing prose that states *why the check matters*, *what evidence proves it*, and *what to do about a concrete failure case* — not a mechanical "X는 Y다" concatenation of the three cells. See §6 for the tone bar.
- **CHECK section**: keep the `<ul>` checklist items as-is (lists are already clear); convert only the trailing 3-row "작업 단계/필수 산출물/차단 기준" table. This table's content was **identical boilerplate across all 7 operations-core docs** — verify with a quick `grep` across files before assuming this, but if true, write the prose once and reuse verbatim for consistency.
- **PLAYBOOK section**: keep the `<div class="serial-card">` (it's a flow diagram, not a table). Convert the "표면" tables and "확인 단계" tables to prose, in the same symptom→scope→evidence order the serial-card describes.
- **PRACTICE LAB**: keep every `<pre><code>` command/output block completely intact and in place — these are the single clearest, most-liked part of the whole document; do not summarize or remove them. Only convert the *table wrapper* around them into narrative sentences ("정상적인 경우라면 ~", "비정상적인 경우에는 ~", "즉시 완화는 ~, 영구 수정은 ~"). Keep the literal words "정상"/"비정상" and "즉시 완화"/"영구 수정" somewhere in the block — tests check for these tokens in order.
- **TERM glossary**: convert the 5-column table (용어/정의/운영 증거/자주 하는 오해/관련 항목) into the existing `.glossary > .g-row > .g-term + .g-def` card pattern already used elsewhere in this codebase (see `engineering-backend-core.ts` for precedent). Fold definition + evidence + misconception into one flowing `.g-def` paragraph per term. Keep at least 4-5 terms; each `.g-def` should read as a real explanation, not a compressed definition (aim 200+ characters per term after the "explain more" pass).
- **CASE section**: keep `.callout` and `.case-grid`/`.case-card` structures completely untouched (they already read as prose SITUATION/NUMBERS/LESSON) — only convert any trailing "처음 10분/다음 30분" or "Incident packet" 3-row tables that sit outside the case-grid.
- **EVIDENCE section**: keep `<pre class="snippet-card">` YAML blocks untouched. Convert the surrounding table(s) to prose. If a document has an extra sub-table (e.g. a "Rollout 실패 실습" 3-row table with inline `<code>`), convert it the same way as chapter tables.
- **Final SUMMARY table**: add exactly one new `<section id="ch-summary">` with `<span class="ch-code">SUMMARY</span>` right before `<footer>`, containing exactly one `<table>` that condenses the whole document (one row per major topic: 영역 / 핵심 판단 기준 / 확인할 증거). Add a matching nav `<a href="#ch-summary">`. This is the "표는 맨 마지막에 1개만" requirement — after conversion, the entire document should contain exactly one `<table>` tag, and it should be this one.

## 5. Update Tests to Check Content, Not Markup

Where §3 classified an assertion as (a) structural, replace it with a content-based check, scoped only to the documents actually being converted (use a `Set` of ids, e.g. `PROSE_OPERATIONS_IDS`), leaving the old table-based assertion in place for any siblings *not yet converted* (e.g. the infra-classified operations docs, which were out of scope this round).

Pattern used (see `scripts/handbook-html.test.mjs` for the live version):

```js
const PROSE_OPERATIONS_IDS = new Set([...]); // ids converted this round

function assertProseGlossary(file, termSection) {
  assert.match(termSection, /<div class="glossary">/, ...);
  const defs = [...termSection.matchAll(/<div class="g-def">([\s\S]*?)<\/div>/g)]
    .map(([, def]) => def.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
  assert.ok(defs.length >= 4, ...);
  for (const def of defs) assert.ok(def.length >= 60, ...);
}

function assertProsePracticeLab(file, labBlock) {
  assert.doesNotMatch(labBlock, /<table/, ...);
  assert.match(labBlock, /<pre><code>/, ...);
  assert.match(labBlock, /정상[\s\S]*비정상/, ...);
  assert.match(labBlock, /즉시 완화[\s\S]*영구 수정/, ...);
}

function assertSingleTrailingSummaryTable(file, source) {
  const tableCount = (source.match(/<table\b/g) ?? []).length;
  assert.equal(tableCount, 1, ...);
  assert.match(source, /<span class="ch-code">SUMMARY<\/span>[\s\S]*<table\b/, ...);
}

// in the test body:
if (PROSE_OPERATIONS_IDS.has(item.id)) {
  assertProseGlossary(...); assertProsePracticeLab(...); assertSingleTrailingSummaryTable(...);
} else {
  /* old table-shape assertions, unchanged */
}
```

Ask the user before doing this — it's a judgment call about whether to loosen a regression guardrail. In this project the user's answer was "fix the check to match content, don't skip it" (not "just delete the check").

## 6. Tone Bar for "Explain More" (from direct user feedback)

First-pass prose (converting table rows into sentences) was still judged "불친절" (unfriendly/terse) — because it just chained facts with periods:

> 압축된 버전(퇴짜): "pipeline stage가 실패 위치와 재시도 기준을 명확히 드러내는지는 install, lint, typecheck... 각 stage의 결과로 판단한다. 배포가 실패했을 때 어느 stage에서 멈췄는지 즉시 구분되지 않는다면 pipeline 설계 자체를 의심해야 한다."

The accepted, fuller version adds a "why does this matter" frame, a concrete misconception callout, and a worked example before stating the criterion:

> 풀어쓴 버전(승인): "pipeline을 하나로 뭉뚱그려진 '빌드 후 배포' 과정으로 보면, 뭔가 잘못됐을 때 원인을 찾기가 어렵다. 그래서 install, lint, typecheck, test, build, artifact publish, deploy, smoke test, metric gate처럼 각 단계를 독립적으로 나눠 두는 것이 중요하다. 이렇게 나눠두면 배포가 실패했을 때 설치 단계에서 죽었는지, 타입체크에서 걸렸는지, 아니면 실제 배포 이후 smoke test에서 걸렸는지를 즉시 구분할 수 있다. 반대로 stage가 뭉쳐 있으면 실패 로그 하나만 보고 어디서부터 잘못됐는지 처음부터 다시 추적해야 한다.
>
> 이 판단을 실제로 검증하려면 각 stage가 남긴 증거를 봐야 한다. ... 여기서 흔히 하는 착각이 'CI가 초록불이면 배포는 끝났다'는 생각이다. 하지만 CI green은 코드가 빌드되고 테스트를 통과했다는 뜻일 뿐이지, production에서 정상적으로 동작한다는 보장은 아니다..."

Recipe per paragraph group (usually 2-3 paragraphs replace what was one dense sentence-chain):
1. **Frame the problem** — what goes wrong if you *don't* do this, stated as a scenario, not a definition.
2. **Name a common misconception** ("여기서 흔히 하는 착각이...", "~라고 생각하기 쉽지만...") and correct it — this is the single highest-value addition per the user's feedback.
3. **Give the concrete verification path** — what to actually look at (kept from the original table's "확인할 증거" column).
4. **Close with a worked micro-scenario and its resolution** — reuse the original table's third row (the failure example) but narrate it instead of stating it.

For the lighter engineering-context docs (glossary-style, not judgment-playbook style), the same recipe applies but proportionally shorter — one wrapping sentence of "why" plus one closing sentence of "so what", not a full 3-paragraph treatment, since the underlying content is 3 short vocabulary items, not a judgment procedure. Don't inflate word count for its own sake — CLAUDE.md explicitly bans word-count inflation; the added length must be added reasoning, not padding.

Do **not** touch `<p class="lede">` paragraphs (frozen, see §3c) or `.case-grid` SITUATION/NUMBERS/LESSON text (already written in this voice) or `<pre><code>` blocks (already concrete).

## 7. Editing Mechanics

- Use `Edit` with exact `old_string`/`new_string` pairs against the `public/handbook/*.html` file, not `Write` for the whole file — these files carry a large duplicated inline `<style>` block (for the context-* docs) or are otherwise long; targeted edits are far less error-prone than retyping the whole file.
- Work one document at a time, running the test suite after each document, not after the whole batch — catching a broken literal phrase (e.g. accidentally paraphrasing away the required "즉시 완화"/"영구 수정" tokens) immediately is much cheaper than debugging it across 15 files at the end. This happened once in this session (see §4's PRACTICE LAB token requirement) and was caught this way.
- Do a pilot document first, show the user a concrete before/after excerpt, and get explicit confirmation on tone before batch-applying to the rest. This project needed two pilots: one to confirm the conversion approach (tables → prose) and a second to confirm the depth of explanation.

## 8. Regenerate and Verify

```bash
npm run generate:handbook
git checkout -- src/handbook/documentLoaders.ts   # mandatory, see §2
git status --short                                 # confirm only the expected files changed
node --test scripts/handbook-html.test.mjs 2>&1 | grep "^✖" | sort -u
```

Compare the failing-test list against a baseline captured *before* starting (`git stash && node --test ... && git stash pop`) — this project had 5 pre-existing, unrelated failures (career-menu content, a practical-examples check, a carbon-domain catalog check) that must not be conflated with regressions you introduced. Only investigate failures that are *new* relative to that baseline.

Do not skip visual/browser verification just because it's tedious — but note: **for this specific project, the user has asked not to use a dev server or browser (playwright/chrome-devtools) for verification at all going forward.** Rely on the test suite and reading the generated HTML directly instead. (See memory: `feedback_no-browser-verification`.)

## 9. Final Report Checklist

- Scope resolved and confirmed with the user (document ids, count).
- Pilot shown and approved before batch conversion (structure pass, then tone pass if requested).
- Source-of-truth files edited (`public/handbook/*.html`), generated files refreshed (`generate:handbook`), the `documentLoaders.ts` regression worked around.
- Test file changes, if any, scoped to only the converted document ids, with old assertions preserved for unconverted siblings.
- Full test suite result stated with pass/fail counts, and explicit confirmation that failing tests are the same pre-existing set as baseline.
- No `git commit` unless the user explicitly asks — leave changes staged for review via `/commit`.

## 10. Applying This to the Next Menu

To repeat this for another top-level menu (인프라, 백엔드, 프론트엔드, ...):

1. Re-run §1 against the new menu's `HANDBOOK_GROUPS` entry to get the exact document id list.
2. Read 1-2 representative documents fully before touching anything — table shapes and section names can differ between menus (e.g. infra docs may not have the same CHECK/PLAYBOOK/TERM/CASE/RISK/EVIDENCE skeleton the operations docs used).
3. Re-run §3's grep against the test file for the *new* menu's ids/headings — do not assume the same tests apply; each menu family may have its own bespoke assertions.
4. Reuse §4-§6 verbatim as the conversion and tone methodology — these are menu-agnostic.
5. Confirm with the user again whether they want a pilot-first approach (they did both times this session, and it caught real issues both times).
