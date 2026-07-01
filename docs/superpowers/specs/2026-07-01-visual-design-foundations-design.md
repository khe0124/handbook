# Visual Design Foundations for Design Practice

## Goal

Add three specialist documents under the `디자인 실무` menu so the handbook covers concrete visual arts and visual design foundations, not only product UX, flows, systems, and handoff.

## Menu Structure

The `디자인 실무` menu should keep the existing two practical product design entries and append three new visual foundation entries:

1. `02 시각디자인 기초·조형 원리`
2. `03 색채·타이포그래피·브랜드 시각 언어`
3. `04 사진학·이미지 리터러시`

This keeps the existing product design learning path intact while adding a visual arts foundation path after it.

## Document 1: Visual Design Foundations

File target:
`src/handbook/documents/practice-visual-design-foundations.ts`

Public output:
`public/handbook/practice-visual-design-foundations-handbook.html`

Core coverage:

- Point, line, plane, shape, form, space, scale, proportion.
- Balance, contrast, repetition, rhythm, alignment, proximity, emphasis, unity, tension.
- Gestalt principles: proximity, similarity, continuity, closure, figure-ground, common fate.
- Visual hierarchy and attention design.
- Grid systems, composition, layout density, whitespace, scanning order.
- Practical critique language for explaining why a composition works or fails.

Required practical artifacts:

- Visual hierarchy audit.
- Composition critique checklist.
- Layout revision drill.
- Portfolio evidence packet for before/after visual decisions.

## Document 2: Color, Typography, and Brand Visual Language

File target:
`src/handbook/documents/practice-color-typography-brand.ts`

Public output:
`public/handbook/practice-color-typography-brand-handbook.html`

Core coverage:

- Hue, saturation, value, chroma, temperature, contrast, harmony.
- Color systems: monochromatic, analogous, complementary, split-complementary, triadic.
- Accessibility-aware color contrast and semantic color usage.
- Typography fundamentals: type classification, font pairing, hierarchy, tracking, leading, line length, optical alignment.
- Brand visual language: tone, motif, imagery direction, icon style, layout rhythm.
- Differences between UI, editorial, presentation, and print-oriented decisions.

Required practical artifacts:

- Color palette decision table.
- Typography scale and readability checklist.
- Brand visual language audit.
- Accessibility contrast review.

## Document 3: Photography and Image Literacy

File target:
`src/handbook/documents/practice-photography-image-literacy.ts`

Public output:
`public/handbook/practice-photography-image-literacy-handbook.html`

Core coverage:

- Exposure triangle: aperture, shutter speed, ISO.
- Focal length, perspective, depth of field, lens distortion.
- Light direction, quality, color temperature, shadows, highlights.
- Composition: rule of thirds, frame within frame, leading lines, negative space, crop tension.
- Image selection and editing: resolution, compression, color correction, retouching ethics.
- Stock image, AI image, generated image, and product image evaluation criteria.
- Image usage in product UI, landing pages, portfolios, reports, and brand materials.

Required practical artifacts:

- Image quality review rubric.
- Photo brief template.
- AI/stock image risk checklist.
- Before/after image treatment critique.

## Integration

Update these areas:

- `src/handbook/catalog.mjs`: append three items to `DESIGN_PRACTICE_HANDBOOKS`.
- `src/handbook/practicalExamples.ts`: add design-lens mappings and practical examples.
- `scripts/handbook-html.test.mjs`: update menu counts and add coverage tests for visual design, color/typography, and photography markers.
- Generate or add the corresponding public handbook HTML files.

## Testing

Verification should include:

- `npm test`
- `npm run build`
- A staged diff review to ensure only the design-practice visual foundation work is included, because the repository currently contains unrelated dirty files.

## Scope Boundaries

This change does not redesign the UI, change navigation behavior, or rewrite the broader `DESIGN_HANDBOOKS` product design documents. It only adds three concrete visual design foundation documents to the `디자인 실무` menu.
