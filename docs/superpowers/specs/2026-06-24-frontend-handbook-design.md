# Frontend Handbook Design

## Goal

Add a dedicated frontend handbook area so the app is no longer backend-heavy. Rename the current `개발핸드북` menu to `백엔드`, add a new `프론트엔드` menu, and create one production-quality `프론트엔드 엔지니어링 핸드북` document.

## Scope

The new handbook targets 실무 프론트엔드 개발자. It should match the existing backend handbook tone: concept-first, tradeoff-oriented, and practical enough to guide engineering judgment. It should not be a basic tutorial or a framework-only React cheatsheet.

Out of scope for this pass:

- Separate React, TypeScript, Vite, or CSS example recipe pages.
- Reintroducing previously excluded carbon/LCA/business-status menus.
- Changing the overall visual style of the current handbook app.

## Information Architecture

Top-level menu groups after the change:

- `백엔드`: existing backend-oriented documents currently under `개발핸드북`.
- `프론트엔드`: new frontend-oriented documents.
- `예시 사례`: existing Java/JPA/Spring/Docker/nginx/Redis/PostgreSQL examples.
- `실무 가이드`: existing setup, workflow, package, config, CI/CD, logs, and DB guides.

Initial frontend menu contents:

- `프론트엔드 개요`: new `frontend-engineering-handbook.html` source document, generated into a TS document module.

## Frontend Handbook Outline

The new document will use the existing handbook template style: local TOC, hero, chapter sections, tables, callouts, serial cards, and glossary blocks.

Chapters:

- `FE-01` 실무 프론트엔드의 역할
- `FE-02` 브라우저 런타임과 렌더링 모델
- `FE-03` HTML/CSS/접근성의 기본 계약
- `FE-04` 컴포넌트 설계와 합성
- `FE-05` 상태 관리와 서버 상태
- `FE-06` API 연동과 에러/로딩 UX
- `FE-07` 폼, 검증, 사용자 입력
- `FE-08` 성능: 번들, 렌더링, 메모이제이션
- `FE-09` 디자인 시스템과 UI 품질
- `FE-10` 테스트 전략
- `FE-11` 배포와 관측가능성
- `FE-12` 보안: XSS, CSRF, 토큰 저장
- `FE-13` 용어집

## Implementation Design

Add `public/handbook/frontend-engineering-handbook.html` as the source document. Update `src/handbook/catalog.mjs` by renaming `DEV_HANDBOOKS` conceptually to backend-facing data, changing the menu label from `개발핸드북` to `백엔드`, and adding a `FRONTEND_HANDBOOKS` group with the new document.

Run `npm run generate:handbook` so the new HTML source is converted into `src/handbook/documents/frontend.ts` and `src/handbook/documentLoaders.ts` is updated. Keep the existing TSX rendering path unchanged: `App.tsx` chooses a catalog item, `HandbookPage.tsx` lazy-loads the document module, and shared CSS renders the document style.

## Testing

Update the existing Node test in `scripts/handbook-html.test.mjs` so it expects the new frontend catalog item and still asserts that excluded menus (`업무현황`, `탄소회계`, `탄소핸드북`, `LCA`) are absent.

Verification commands:

- `npm test`
- `npm run generate:handbook`
- `npm run build`
- targeted `rg` checks for excluded labels in app/catalog/runtime sources

## Risks

The frontend handbook will be content-heavy. To keep bundle size controlled, it should continue using the existing per-document dynamic import pipeline.

The current HTML-to-TS extraction is regex-based. This is acceptable because source documents follow a stable template with one `nav` and one `main`, and there is already a regression test for missing regions.
