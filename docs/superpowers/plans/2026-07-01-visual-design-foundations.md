# Visual Design Foundations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add three specialist visual design foundation documents under the `디자인 실무` menu.

**Architecture:** Follow the existing handbook pattern: one source document module per handbook, catalog entries in `DESIGN_PRACTICE_HANDBOOKS`, generated public HTML, practical examples, and coverage tests. The new documents are appended after the current two design-practice documents so existing product UX and design-system learning order remains stable.

**Tech Stack:** TypeScript document modules, Vite/React handbook app, Node test runner, generated static HTML in `public/handbook`.

---

## File Map

- Create `src/handbook/documents/practice-visual-design-foundations.ts`: visual design and composition foundations.
- Create `src/handbook/documents/practice-color-typography-brand.ts`: color, typography, and brand visual language foundations.
- Create `src/handbook/documents/practice-photography-image-literacy.ts`: photography and image literacy foundations.
- Create `public/handbook/practice-visual-design-foundations-handbook.html`: generated/static public HTML for the first source document.
- Create `public/handbook/practice-color-typography-brand-handbook.html`: generated/static public HTML for the second source document.
- Create `public/handbook/practice-photography-image-literacy-handbook.html`: generated/static public HTML for the third source document.
- Modify `src/handbook/catalog.mjs`: append three `DESIGN_PRACTICE_HANDBOOKS` items.
- Modify `src/handbook/practicalExamples.ts`: add three design lens mappings and practical examples.
- Modify `scripts/handbook-html.test.mjs`: update design-practice counts, expected files, and content markers.

## Task 1: Add Failing Coverage Tests

**Files:**
- Modify: `scripts/handbook-html.test.mjs`

- [ ] **Step 1: Update design-practice bundle expectations**

In `test("AX, design, and practical tool menus group consistent handbook bundles", ...)`, add these entries to `designBundles` after `practice-design-systems-handbook.html`:

```js
{
  file: "practice-visual-design-foundations-handbook.html",
  sources: ["시각디자인 기초·조형 원리"],
  evidence: ["VISUAL DESIGN FOUNDATION MAP", "GESTALT PRINCIPLES", "COMPOSITION CRITIQUE CHECKLIST", "VISUAL HIERARCHY AUDIT"],
},
{
  file: "practice-color-typography-brand-handbook.html",
  sources: ["색채·타이포그래피·브랜드 시각 언어"],
  evidence: ["COLOR TYPOGRAPHY BRAND SYSTEM", "COLOR PALETTE DECISION TABLE", "TYPOGRAPHY SCALE CHECKLIST", "BRAND VISUAL LANGUAGE AUDIT"],
},
{
  file: "practice-photography-image-literacy-handbook.html",
  sources: ["사진학·이미지 리터러시"],
  evidence: ["PHOTOGRAPHY IMAGE LITERACY MAP", "EXPOSURE TRIANGLE", "IMAGE QUALITY REVIEW RUBRIC", "AI STOCK IMAGE RISK CHECKLIST"],
},
```

Change:

```js
assert.equal(designGroup?.items.length, 2);
```

to:

```js
assert.equal(designGroup?.items.length, 5);
```

- [ ] **Step 2: Add a focused visual-foundation source coverage test**

Add this test after the AX/design/practical bundle test:

```js
test("design practice includes specialist visual design, typography, and photography foundations", async () => {
  assert.deepEqual(
    DESIGN_PRACTICE_HANDBOOKS.map((item) => item.label),
    [
      "00 디자인 기반·사용자 흐름",
      "01 디자인 실행·시스템 품질",
      "02 시각디자인 기초·조형 원리",
      "03 색채·타이포그래피·브랜드 시각 언어",
      "04 사진학·이미지 리터러시",
    ],
  );

  const sourceMarkers = [
    ["src/handbook/documents/practice-visual-design-foundations.ts", ["Point, line, plane", "Gestalt", "visual hierarchy", "grid systems", "composition critique"]],
    ["src/handbook/documents/practice-color-typography-brand.ts", ["Hue, saturation, value", "typography fundamentals", "font pairing", "brand visual language", "accessibility contrast"]],
    ["src/handbook/documents/practice-photography-image-literacy.ts", ["Exposure triangle", "focal length", "depth of field", "light direction", "AI image"]],
  ];

  for (const [sourcePath, markers] of sourceMarkers) {
    const source = await readFile(sourcePath, "utf8");

    for (const marker of markers) {
      assert.match(source, new RegExp(marker, "i"), `${sourcePath} should include ${marker}`);
    }
  }
});
```

- [ ] **Step 3: Run the focused test and confirm it fails**

Run:

```bash
npm test -- --test-name-pattern "design practice"
```

Expected:

- Fails because `DESIGN_PRACTICE_HANDBOOKS` still has 2 items.
- Fails because the three new public HTML files and three source modules do not exist yet.

## Task 2: Add Catalog Entries and Practical Examples

**Files:**
- Modify: `src/handbook/catalog.mjs`
- Modify: `src/handbook/practicalExamples.ts`

- [ ] **Step 1: Append catalog entries**

In `src/handbook/catalog.mjs`, change `DESIGN_PRACTICE_HANDBOOKS` to:

```js
export const DESIGN_PRACTICE_HANDBOOKS = [
  { id: "practice-design-foundation", label: "00 디자인 기반·사용자 흐름", kind: "디자인 실무", file: "practice-design-foundation-handbook.html" },
  { id: "practice-design-systems", label: "01 디자인 실행·시스템 품질", kind: "디자인 실무", file: "practice-design-systems-handbook.html" },
  { id: "practice-visual-design-foundations", label: "02 시각디자인 기초·조형 원리", kind: "디자인 실무", file: "practice-visual-design-foundations-handbook.html" },
  { id: "practice-color-typography-brand", label: "03 색채·타이포그래피·브랜드 시각 언어", kind: "디자인 실무", file: "practice-color-typography-brand-handbook.html" },
  { id: "practice-photography-image-literacy", label: "04 사진학·이미지 리터러시", kind: "디자인 실무", file: "practice-photography-image-literacy-handbook.html" },
];
```

- [ ] **Step 2: Add design lens mappings**

In `src/handbook/practicalExamples.ts`, add after `"practice-design-systems": "design",`:

```ts
  "practice-visual-design-foundations": "design",
  "practice-color-typography-brand": "design",
  "practice-photography-image-literacy": "design",
```

- [ ] **Step 3: Add practical examples**

In `PRACTICAL_EXAMPLES`, add after `"practice-design-systems": example(...),`:

```ts
  "practice-visual-design-foundations": example("랜딩 페이지 시안을 조형 원리로 비평하고 개선한다.", ["점·선·면, 대비, 균형, 리듬, 여백을 기준으로 시선 흐름을 표시한다.", "게슈탈트 원리와 그리드 기준으로 정보 묶음과 강조 지점을 다시 정한다.", "수정 전후 화면에 visual hierarchy audit과 composition critique를 남긴다."], "시각 판단이 취향 평가가 아니라 조형 원리와 사용자의 읽기 순서로 설명된다."),
  "practice-color-typography-brand": example("브랜드 소개 화면의 색채와 타이포그래피를 정리한다.", ["색상, 명도, 채도, 대비, 접근성 기준으로 팔레트를 검토한다.", "폰트 조합, 자간, 행간, 줄 길이, 계층을 typography scale로 고정한다.", "브랜드 톤, 이미지 방향, 아이콘 스타일을 visual language audit으로 연결한다."], "브랜드 표현이 감각적 선호가 아니라 반복 가능한 색채·타이포 시스템으로 정리된다."),
  "practice-photography-image-literacy": example("제품 상세 페이지의 이미지를 사진학 기준으로 고른다.", ["노출, 초점거리, 심도, 빛 방향, 왜곡을 보고 이미지 품질을 평가한다.", "구도, crop tension, negative space가 제품 이해를 돕는지 확인한다.", "스톡·AI 이미지 사용 시 진정성, 저작권, 편집 윤리, 브랜드 적합성을 점검한다."], "이미지 선택이 분위기 맞추기가 아니라 정보 전달과 브랜드 신뢰를 높이는 판단이 된다."),
```

- [ ] **Step 4: Run the focused test and confirm catalog/example progress**

Run:

```bash
npm test -- --test-name-pattern "design practice"
```

Expected:

- The label/order assertion passes.
- The test still fails on missing source modules and public HTML files.

## Task 3: Create Source Document Modules

**Files:**
- Create: `src/handbook/documents/practice-visual-design-foundations.ts`
- Create: `src/handbook/documents/practice-color-typography-brand.ts`
- Create: `src/handbook/documents/practice-photography-image-literacy.ts`

- [ ] **Step 1: Create `practice-visual-design-foundations.ts`**

Use the established `HandbookDocumentContent` export shape:

```ts
import type { HandbookDocumentContent } from "../types";

const document: HandbookDocumentContent = {
  navHtml: "<div class=\"nav-brand\">PRACTICE · VISUAL DESIGN</div>\n  <div class=\"nav-title\">시각디자인 기초 · 조형 원리</div>\n  <a href=\"#visual-foundation-map\"><span class=\"code\">MAP</span>시각디자인 기본 개념</a>\n  <a href=\"#visual-elements\"><span class=\"code\">ELEM</span>점·선·면·형태·공간</a>\n  <a href=\"#visual-principles\"><span class=\"code\">PRIN</span>균형·대비·리듬·통일</a>\n  <a href=\"#gestalt-principles\"><span class=\"code\">GESTALT</span>게슈탈트 원리</a>\n  <a href=\"#visual-hierarchy-audit\"><span class=\"code\">AUDIT</span>Visual hierarchy audit</a>\n  <a href=\"#composition-critique\"><span class=\"code\">CRIT</span>Composition critique checklist</a>",
  mainHtml: "<header class=\"hero\">\n  <div class=\"hero-serial\">\n    <span>DOC : PRACTICE-VISUAL-DESIGN-FOUNDATIONS</span>\n    <span>SCOPE : VISUAL ARTS · COMPOSITION · HIERARCHY</span>\n    <span>LANG : KO</span>\n  </div>\n  <h1>시각디자인 기초·조형 원리</h1>\n  <p class=\"hero-sub\">Point, line, plane, shape, form, space, scale, proportion부터 Gestalt, grid systems, visual hierarchy, composition critique까지 시각디자인 기본 개념을 실무 비평 언어로 정리합니다.</p>\n  <div class=\"hero-meta\">VISUAL DESIGN FOUNDATION MAP · MARKER: artifact-ready · UPDATED 2026-07</div>\n</header>\n\n<section id=\"visual-foundation-map\">\n<div class=\"ch-head\"><span class=\"ch-code\">MAP</span><h2>시각디자인 기초·조형 원리</h2></div>\n<p class=\"lede\">시각디자인은 예쁜 화면을 만드는 감각이 아니라 요소를 선택하고 관계를 조직해 사용자의 시선, 이해, 감정, 행동을 통제하는 기술입니다.</p>\n<table>\n<tr><th>영역</th><th>핵심 질문</th><th>실무 산출물</th></tr>\n<tr><td>Visual elements</td><td>무엇을 화면의 기본 재료로 쓰는가</td><td>점·선·면·형태·공간 분석</td></tr>\n<tr><td>Design principles</td><td>요소 사이의 관계를 어떻게 조직하는가</td><td>균형, 대비, 리듬, 통일 비평</td></tr>\n<tr><td>Gestalt principles</td><td>사용자가 요소를 어떤 묶음으로 인식하는가</td><td>proximity, similarity, closure 점검</td></tr>\n<tr><td>Hierarchy</td><td>무엇을 먼저 보고 다음에 무엇을 읽는가</td><td>visual hierarchy audit</td></tr>\n<tr><td>Composition</td><td>여백, 무게, 긴장, 흐름이 목표에 맞는가</td><td>composition critique checklist</td></tr>\n</table>\n</section>\n\n<section id=\"visual-elements\">\n<div class=\"ch-head\"><span class=\"ch-code\">ELEM</span><h2>Point, line, plane, shape, form, space</h2></div>\n<p class=\"lede\">점은 위치와 강조를 만들고, 선은 방향과 분리를 만들며, 면은 정보의 덩어리와 배경을 만듭니다. 형태와 공간은 사용자가 화면을 어떤 구조로 해석하는지 결정합니다.</p>\n<table>\n<tr><th>요소</th><th>시각 기능</th><th>실무 판단</th></tr>\n<tr><td>Point</td><td>초점, 위치, 시작점</td><td>배지, 알림점, 강조 표시가 과도하면 시선이 분산된다.</td></tr>\n<tr><td>Line</td><td>방향, 분리, 연결</td><td>구분선보다 간격과 정렬로 관계를 만들 수 있는지 먼저 본다.</td></tr>\n<tr><td>Plane</td><td>영역, 그룹, 배경</td><td>카드와 패널은 정보 묶음이 분명할 때만 쓴다.</td></tr>\n<tr><td>Shape</td><td>인식 가능한 실루엣</td><td>아이콘과 버튼 형태가 기능 의미와 충돌하지 않아야 한다.</td></tr>\n<tr><td>Space</td><td>여백, 거리, 숨 쉴 틈</td><td>여백은 빈 곳이 아니라 관계와 중요도를 설명하는 정보다.</td></tr>\n</table>\n</section>\n\n<section id=\"visual-principles\">\n<div class=\"ch-head\"><span class=\"ch-code\">PRIN</span><h2>Balance, contrast, repetition, rhythm, alignment</h2></div>\n<table>\n<tr><th>원리</th><th>전문 개념</th><th>실무 실패 신호</th></tr>\n<tr><td>Balance</td><td>대칭·비대칭 무게 배분</td><td>한쪽 영역만 과밀해 화면이 기울어 보인다.</td></tr>\n<tr><td>Contrast</td><td>차이로 중요도와 구분을 만든다</td><td>제목, 본문, 보조 정보가 같은 세기로 보인다.</td></tr>\n<tr><td>Repetition</td><td>반복으로 패턴과 일관성을 만든다</td><td>같은 의미의 요소가 매번 다른 스타일로 나타난다.</td></tr>\n<tr><td>Rhythm</td><td>반복과 변주로 읽기 흐름을 만든다</td><td>모든 섹션이 같은 밀도라 스캔 포인트가 없다.</td></tr>\n<tr><td>Alignment</td><td>정렬로 보이지 않는 질서를 만든다</td><td>텍스트, 버튼, 이미지의 기준선이 서로 어긋난다.</td></tr>\n<tr><td>Unity</td><td>개별 요소가 하나의 의도로 읽힌다</td><td>좋은 요소가 많지만 화면 목적이 흐려진다.</td></tr>\n<tr><td>Tension</td><td>의도적 불균형으로 주목을 만든다</td><td>긴장이 아니라 실수처럼 보이는 어긋남이 생긴다.</td></tr>\n</table>\n</section>\n\n<section id=\"gestalt-principles\">\n<div class=\"ch-head\"><span class=\"ch-code\">GESTALT</span><h2>GESTALT PRINCIPLES</h2></div>\n<p class=\"lede\">Gestalt principles는 사용자가 낱개 요소를 어떻게 묶고 해석하는지 설명합니다. UI와 편집 디자인 모두에서 proximity, similarity, continuity, closure, figure-ground, common fate를 점검해야 합니다.</p>\n<table>\n<tr><th>원리</th><th>의미</th><th>디자인 점검</th></tr>\n<tr><td>Proximity</td><td>가까운 요소는 한 그룹으로 보인다</td><td>라벨과 입력, 제목과 본문 거리가 관계를 설명하는가.</td></tr>\n<tr><td>Similarity</td><td>비슷한 형태는 같은 기능으로 보인다</td><td>같은 스타일의 버튼이 서로 다른 위험도를 갖지 않는가.</td></tr>\n<tr><td>Continuity</td><td>연속된 방향을 하나의 흐름으로 읽는다</td><td>시선 흐름이 다음 행동으로 자연스럽게 이어지는가.</td></tr>\n<tr><td>Closure</td><td>불완전한 형태도 완성해 인식한다</td><td>아이콘 축약이 의미를 잃지 않는가.</td></tr>\n<tr><td>Figure-ground</td><td>전경과 배경을 분리해 본다</td><td>모달, 카드, 이미지 위 텍스트가 배경과 충분히 분리되는가.</td></tr>\n<tr><td>Common fate</td><td>같이 움직이는 요소를 같은 그룹으로 본다</td><td>애니메이션과 상태 변화가 같은 객체의 행동으로 읽히는가.</td></tr>\n</table>\n</section>\n\n<section id=\"visual-hierarchy-audit\">\n<div class=\"ch-head\"><span class=\"ch-code\">AUDIT</span><h2>VISUAL HIERARCHY AUDIT</h2></div>\n<div class=\"serial-card\">\n<span class=\"sc-label\">VISUAL HIERARCHY AUDIT</span>\n1. 사용자가 3초 안에 가장 먼저 봐야 할 정보를 하나 고른다.<br>\n2. 크기, 굵기, 색, 위치, 여백, 대비 중 어떤 수단으로 강조했는지 표시한다.<br>\n3. 두 번째와 세 번째 읽기 대상을 화살표로 연결한다.<br>\n4. 같은 계층인데 다르게 보이는 요소와 다른 계층인데 같게 보이는 요소를 찾는다.<br>\n5. 모바일 폭에서 시선 순서가 바뀌는지 확인한다.\n</div>\n</section>\n\n<section id=\"composition-critique\">\n<div class=\"ch-head\"><span class=\"ch-code\">CRIT</span><h2>COMPOSITION CRITIQUE CHECKLIST</h2></div>\n<table>\n<tr><th>체크</th><th>질문</th><th>수정 방향</th></tr>\n<tr><td>무게</td><td>시각적 무게가 한쪽으로 쏠리는가</td><td>크기, 밀도, 색의 무게를 재분배한다.</td></tr>\n<tr><td>흐름</td><td>시선이 목표 행동으로 이동하는가</td><td>정렬선과 대비를 사용해 읽기 순서를 만든다.</td></tr>\n<tr><td>밀도</td><td>정보가 과밀하거나 지나치게 비어 있는가</td><td>그룹 단위로 압축하거나 여백의 역할을 명확히 한다.</td></tr>\n<tr><td>초점</td><td>가장 중요한 요소가 실제로 가장 강한가</td><td>불필요한 강조 색과 장식을 줄인다.</td></tr>\n<tr><td>증거</td><td>수정 전후가 왜 좋아졌는지 설명 가능한가</td><td>before/after와 판단 근거를 portfolio evidence packet에 남긴다.</td></tr>\n</table>\n</section>",
};

export default document;
```

- [ ] **Step 2: Create `practice-color-typography-brand.ts`**

Create the module with the same export shape. It must include these exact marker strings in `mainHtml`: `COLOR TYPOGRAPHY BRAND SYSTEM`, `Hue, saturation, value`, `COLOR PALETTE DECISION TABLE`, `TYPOGRAPHY SCALE CHECKLIST`, `BRAND VISUAL LANGUAGE AUDIT`, `accessibility contrast`, `font pairing`, `optical alignment`.

- [ ] **Step 3: Create `practice-photography-image-literacy.ts`**

Create the module with the same export shape. It must include these exact marker strings in `mainHtml`: `PHOTOGRAPHY IMAGE LITERACY MAP`, `Exposure triangle`, `aperture`, `shutter speed`, `ISO`, `focal length`, `depth of field`, `light direction`, `IMAGE QUALITY REVIEW RUBRIC`, `AI STOCK IMAGE RISK CHECKLIST`, `retouching ethics`.

- [ ] **Step 4: Run focused source tests**

Run:

```bash
npm test -- --test-name-pattern "design practice includes specialist"
```

Expected:

- Source marker test passes.
- Public HTML bundle test still fails until generated HTML files exist.

## Task 4: Generate Public HTML

**Files:**
- Create: `public/handbook/practice-visual-design-foundations-handbook.html`
- Create: `public/handbook/practice-color-typography-brand-handbook.html`
- Create: `public/handbook/practice-photography-image-literacy-handbook.html`

- [ ] **Step 1: Run the handbook generator or build command**

Run:

```bash
npm run build
```

Expected:

- Build succeeds.
- The three new `public/handbook/practice-*-handbook.html` files are created or refreshed.

- [ ] **Step 2: If the generator does not create the files, inspect generation wiring**

Run:

```bash
rg -n "generateHandbookDocuments|HANDBOOK_ITEMS|documents" scripts src
```

Expected:

- Find the generator path that maps `HANDBOOK_ITEMS` to document modules.
- If imports are needed, add imports following the existing document registry pattern.

- [ ] **Step 3: Verify generated HTML markers**

Run:

```bash
rg -n "VISUAL DESIGN FOUNDATION MAP|COLOR TYPOGRAPHY BRAND SYSTEM|PHOTOGRAPHY IMAGE LITERACY MAP" public/handbook
```

Expected:

- Each marker appears in exactly one of the new public HTML files.

## Task 5: Full Verification and Commit

**Files:**
- All files changed in Tasks 1-4.

- [ ] **Step 1: Run full tests**

Run:

```bash
npm test
```

Expected:

- All tests pass.

- [ ] **Step 2: Run production build**

Run:

```bash
npm run build
```

Expected:

- Build exits successfully.

- [ ] **Step 3: Review staged scope**

Because the repository has unrelated dirty files, stage only this feature:

```bash
git add src/handbook/documents/practice-visual-design-foundations.ts \
  src/handbook/documents/practice-color-typography-brand.ts \
  src/handbook/documents/practice-photography-image-literacy.ts \
  public/handbook/practice-visual-design-foundations-handbook.html \
  public/handbook/practice-color-typography-brand-handbook.html \
  public/handbook/practice-photography-image-literacy-handbook.html
git add -p src/handbook/catalog.mjs
git add -p src/handbook/practicalExamples.ts
git add -p scripts/handbook-html.test.mjs
```

Expected:

- Stage only hunks related to the three new design-practice documents.

- [ ] **Step 4: Check staged diff**

Run:

```bash
git diff --cached --stat
git diff --cached --check
```

Expected:

- Staged files match this plan.
- No whitespace errors.

- [ ] **Step 5: Commit**

Run:

```bash
git commit -m "docs: add visual design practice foundations"
```

Expected:

- Commit succeeds and includes only the visual design practice foundation feature.

## Self-Review

- Spec coverage: all three requested documents are covered by Tasks 1-4; catalog, practical examples, public HTML, and tests are covered.
- Placeholder scan: the plan contains no `TBD`, `TODO`, or unspecified follow-up work.
- Type consistency: all new document modules use `HandbookDocumentContent`; catalog IDs match practical example IDs and public HTML filenames.
