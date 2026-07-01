# Development Handbook Snippet Semantics Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace ambiguous `.serial-card` usage in the development handbook with explicit code snippet and semantic explanation blocks.

**Architecture:** `public/handbook/engineering-*-handbook.html` remains the content source of truth. Actual code, commands, config, logs, and schemas move to `pre.snippet-card`; conceptual flows, checklists, answer templates, and evidence packets move to semantic card classes rendered by `src/handbook/handbook.css`.

**Tech Stack:** Vite, React, static handbook HTML extraction, Node test runner.

---

### Task 1: Guard The New Semantics

**Files:**
- Modify: `scripts/handbook-html.test.mjs`

- [ ] **Step 1: Add a failing test**

Add a test that scans `public/handbook/engineering-*-handbook.html` and asserts:

```js
assert.doesNotMatch(source, /class="serial-card"/);
assert.match(allEngineeringHtml, /class="snippet-card"/);
assert.match(allEngineeringHtml, /class="semantic-card/);
```

- [ ] **Step 2: Run the focused test**

Run: `npm test -- scripts/handbook-html.test.mjs`

Expected: FAIL because the engineering source files still use `.serial-card`.

### Task 2: Move Copy Behavior To Snippet Cards

**Files:**
- Modify: `src/handbook/HandbookPage.tsx`
- Modify: `src/handbook/SerialCardCopyButton.tsx`
- Modify: `src/handbook/handbook.css`
- Modify: `scripts/handbook-html.test.mjs`

- [ ] **Step 1: Mount copy buttons on `pre.snippet-card`**

Update the selector from `.serial-card` to `pre.snippet-card`.

- [ ] **Step 2: Keep checklist upgrades only for legacy non-engineering cards**

Leave legacy checklist upgrade logic in place for non-engineering documents that still use `.serial-card`.

- [ ] **Step 3: Add CSS for snippet and semantic cards**

Use dark monospace styling for `.snippet-card` and light sans-serif panels for `.semantic-card`.

### Task 3: Convert Development Handbook Cards

**Files:**
- Modify: `public/handbook/engineering-*-handbook.html`

- [ ] **Step 1: Convert code-like cards to `pre.snippet-card`**

Code-like means command, config, JSON/YAML, SQL, Java/TS/JS, HTTP payload, log, or schema content.

- [ ] **Step 2: Convert non-code cards to semantic classes**

Use:

```html
<div class="semantic-card concept-card">
<div class="semantic-card process-card">
<div class="semantic-card decision-card">
<div class="semantic-card evidence-card">
<div class="semantic-card answer-card">
```

- [ ] **Step 3: Preserve labels and readable structure**

Keep existing `<span class="sc-label">...</span>` labels so source markers remain searchable.

### Task 4: Regenerate And Verify

**Files:**
- Generate: `src/handbook/documents/*.ts`

- [ ] **Step 1: Regenerate documents**

Run: `npm run generate:handbook`

- [ ] **Step 2: Run tests**

Run: `npm test`

- [ ] **Step 3: Build**

Run: `npm run build`
