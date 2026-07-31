# Quiz Hub + Mixed Random Quiz Mode Design

## Goal

The handbook already has 27 domain-scoped 4-choice quizzes (`*-qa.quiz.mjs`), one per Q&A document, spread across the 프론트엔드/백엔드/인프라/운영 menus. There is no single place to see all quizzes at once, and no way to practice across domains in one session.

Add:

1. A **Quiz Hub** page that lists every existing quiz grouped by domain, as a single navigation entry point.
2. A **Mixed Random Quiz** mode that lets the user pick one or more domains and take a 20-question quiz drawn evenly from the selected domains' question pools.

Both features are additive. No existing catalog item, quiz data file, or document is modified or removed.

## Non-goals

- No change to per-domain quiz content or the existing `-quiz` catalog entries.
- No persistence of mixed-quiz results across sessions (matches existing `QuizPage` behavior, which also does not persist).
- No difficulty weighting or spaced-repetition logic — plain uniform random sampling per domain.

## Catalog Changes

Add one new group to `HANDBOOK_GROUPS` in `src/handbook/catalog.mjs`, positioned after `operations` (last domain-content group) and before `llm`:

```js
{ key: "quiz", label: "퀴즈", items: QUIZ_TOOL_HANDBOOKS }
```

```js
export const QUIZ_TOOL_HANDBOOKS = [
  { id: "quiz-hub", label: "00 퀴즈 허브", kind: "퀴즈", pageType: "react" },
  { id: "quiz-mixed", label: "01 통합 랜덤 퀴즈", kind: "퀴즈", pageType: "react" },
];
```

Both items are `pageType: "react"` — no `public/handbook/*.html` source file, matching the existing roadmap-page pattern. `npm run generate:handbook` must **not** be run to wire these up (it regenerates `documentLoaders.ts` from scratch and drops the hand-maintained `ROADMAP_PAGE_LOADERS`/quiz-loader logic, as observed earlier this session). Instead, loaders are added by hand to `documentLoaders.ts`, following the existing `ROADMAP_PAGE_LOADERS` pattern.

`src/handbook/practicalExamples.ts` must get entries for both new ids (`LENS_BY_ITEM_ID` + a scenario in `PRACTICAL_EXAMPLES`), otherwise the existing "every handbook item has a rendered practical example" test fails for them, same as the pre-existing gap found for `career-linkedin-resume`.

## Components

### `QuizRunner` (extracted, new file `src/handbook/quiz/QuizRunner.tsx`)

The question-rendering, answer-locking, and scoring UI currently inside `QuizPage` is extracted into a presentational component:

```ts
type QuizRunnerProps = { quiz: Quiz; onRestart?: () => void };
function QuizRunner({ quiz, onRestart }: QuizRunnerProps): JSX.Element
```

It owns the `answers` state (question id → selected choice index) and all rendering currently in `QuizPage`. `onRestart` is called when the user clicks "다시 풀기" — `QuizPage` can ignore it (falls back to internal `reset`), `MixedQuizPage` uses it to re-run the sampling step for a fresh mixed set instead of repeating the same 20 questions.

### `QuizPage` (existing file, simplified)

Unchanged props/behavior. Internally becomes: look up `quiz` via `getQuiz(quizId)`, render "not found" state, else render `<QuizRunner quiz={quiz} />`.

### `QuizHubPage` (new file `src/handbook/quiz/QuizHubPage.tsx`)

`pageType: "react"` page, no props. Renders:

- A header/intro line.
- A prominent link/button to `quiz-mixed` (via `data-handbook-id="quiz-mixed"`, matching the existing cross-document link convention used in `home.ts` and handled by `HandbookPage`'s click-delegation effect).
- Four sections (프론트엔드/백엔드/인프라/운영), each listing its quizzes as `data-handbook-id` links with the quiz title and question count.

Domain grouping is derived at module load, not hardcoded:

```ts
const domainQuizItems = (items) => items.filter((item) => item.id.endsWith("-quiz"));

const DOMAINS = [
  { label: "프론트엔드", items: domainQuizItems(ENGINEERING_FRONTEND_HANDBOOKS) },
  { label: "백엔드", items: domainQuizItems(ENGINEERING_BACKEND_HANDBOOKS) },
  { label: "인프라", items: domainQuizItems(INFRA_MENU_HANDBOOKS) },
  { label: "운영", items: domainQuizItems(OPERATIONS_GROUP_HANDBOOKS) },
];
```

Each item's question count comes from `getQuiz(item.id).questions.length` for display only.

### `MixedQuizPage` (new file `src/handbook/quiz/MixedQuizPage.tsx`)

State: `selectedDomains: Set<string>` (defaults to all 4 labels selected), `quiz: Quiz | null`.

- Renders 4 checkboxes (도메인 labels above) and a "시작" button, disabled when `selectedDomains.size === 0`.
- On start (and on `QuizRunner`'s `onRestart`), calls `buildMixedQuiz(selectedDomainLabels)` (new pure function, see Data Flow) and sets `quiz` state.
- While `quiz` is null, shows the selection UI. Once set, renders `<QuizRunner quiz={quiz} onRestart={...} />` plus a "도메인 다시 선택" link that clears `quiz` back to the selection UI.

## Data Flow: `buildMixedQuiz`

New pure function in `src/handbook/quiz/mixedQuiz.mjs` (plain JS with JSDoc types, matching `quizBank.mjs`'s convention — this lets `scripts/quiz.test.mjs` import it directly via Node's native test runner, with no TS loader needed):

```js
/** @param {string[]} selectedDomainLabels @param {number} [targetCount] @returns {import("./quizTypes").Quiz} */
function buildMixedQuiz(selectedDomainLabels, targetCount = 20)
```

Algorithm:

1. For each selected domain, collect its full question pool (flatten `questions[]` from every quiz in that domain via `getQuiz`).
2. Compute per-domain share: `base = Math.floor(targetCount / domainCount)`, remainder `targetCount % domainCount` distributed one extra to the first N domains (by iteration order) — e.g. 3 domains → 7/7/6.
3. From each domain's pool, randomly sample `min(share, pool.length)` questions without replacement (Fisher-Yates partial shuffle).
4. Concatenate all sampled questions, shuffle the combined list once more (so domain order isn't predictable), and wrap:

```ts
{ id: "quiz-mixed-session", title: "통합 랜덤 퀴즈 (" + selectedDomainLabels.join("·") + ")", sourceQaId: "", questions: sampled }
```

Question `id` fields from the source quizzes are kept as-is (already unique across the whole `QUIZ_BANK` by construction — each quiz's questions use ids like `q1`, `q2`, scoped to that quiz object, not globally). Since the sampled list is a flat array consumed only by `QuizRunner`'s local `answers` map keyed by `question.id`, and multiple source quizzes could reuse `q1`/`q2` etc., **question ids must be re-namespaced during sampling** to `${sourceQuizId}:${question.id}` to avoid collisions in `QuizRunner`'s answer map. This is the one correctness-critical detail in the sampling step.

`Math.random` is used directly (this is browser runtime code, not a `Workflow` script — no restriction applies).

## Edge Cases

- Zero domains selected: start button disabled, no crash path needed.
- A domain's pool smaller than its computed share (not currently possible — every domain has 7 quizzes × several questions each, so pools are in the dozens-to-hundreds range): sample `min(share, pool.length)`, and do not redistribute the shortfall to other domains (accept a slightly-under-20 quiz rather than adding complexity for a case that can't occur today). Document this in the function's inline comment.
- `getQuiz(id)` returning `null` for some id (data file missing/misnamed): filter it out of the domain's pool silently; don't crash the page.

## Testing

- Unit test added to the existing `scripts/quiz.test.mjs` for `buildMixedQuiz`: 1/2/3/4 domains selected produce exactly `targetCount` questions (or fewer only if pools are actually smaller), no duplicate `(sourceQuizId, questionId)` pairs, per-domain share matches the floor+remainder formula.
- Existing `scripts/handbook-html.test.mjs` structural checks (`each public handbook nav links all main sections`, practical-example coverage, catalog item counts) will need their hardcoded counts bumped for the 2 new items — expect to touch a small number of assertions there, consistent with how `career-linkedin-resume` bumped `careerGroup?.items.length`.
- Manual check: `npm run dev`, navigate to Quiz Hub, click through to a couple of domain quizzes and back, run a mixed quiz with 1 domain and with all 4, verify scoring and restart.

## Files Touched

- `src/handbook/catalog.mjs` — new group + `QUIZ_TOOL_HANDBOOKS`.
- `src/handbook/documentLoaders.ts` — hand-added loaders for `quiz-hub`, `quiz-mixed`.
- `src/handbook/practicalExamples.ts` — two new entries.
- `src/handbook/quiz/QuizRunner.tsx` — new, extracted from `QuizPage.tsx`.
- `src/handbook/quiz/QuizPage.tsx` — simplified to use `QuizRunner`.
- `src/handbook/quiz/QuizHubPage.tsx` — new.
- `src/handbook/quiz/MixedQuizPage.tsx` — new.
- `src/handbook/quiz/mixedQuiz.mjs` — new, `buildMixedQuiz`.
- `scripts/handbook-html.test.mjs` — updated counts.
- `scripts/quiz.test.mjs` — new `buildMixedQuiz` test cases.

No `public/handbook/*.html` files are added or changed. `npm run generate:handbook` is not run as part of this work.
