# Platform Tools Operating Model Improvement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the "플랫폼 도구와 운영 기본기" handbook useful as an operations workflow, not only a merged tool reference.

**Architecture:** Add a bundle-specific intro extension to `scripts/generate-engineering-bundles.mjs` for `engineering-platform-tools`. The extension renders practical operating model, change safety checklist, tool responsibility matrix, and troubleshooting playbook before source documents. Tests lock the markers, then generated HTML and TS modules are refreshed.

**Tech Stack:** Node.js generation scripts, static handbook HTML, `node:test`, Vite build.

---

### Task 1: Lock Platform Operating Markers In Tests

**Files:**
- Modify: `scripts/handbook-html.test.mjs`

- [ ] **Step 1: Add assertions for platform operating content**

Add markers to the existing engineering bundle test for `engineering-platform-tools-handbook.html`:

```js
platformEvidence: [
  "PLATFORM OPERATING MODEL",
  "CHANGE SAFETY CHECKLIST",
  "TOOL RESPONSIBILITY MATRIX",
  "PRODUCTION TROUBLESHOOTING PLAYBOOK",
]
```

- [ ] **Step 2: Run the test to verify it fails before implementation**

Run: `npm test`

Expected: FAIL because the new markers are not yet present in `engineering-platform-tools-handbook.html`.

### Task 2: Add Bundle-Specific Platform Intro

**Files:**
- Modify: `scripts/generate-engineering-bundles.mjs`

- [ ] **Step 1: Add an `afterIndexHtml` field to `engineering-platform-tools`**

The content must include:

```html
<section id="platform-operating-model">
...
<span class="sc-label">PLATFORM OPERATING MODEL</span>
...
<span class="sc-label">CHANGE SAFETY CHECKLIST</span>
...
<h3><span class="h3-tag">MODEL</span>TOOL RESPONSIBILITY MATRIX</h3>
...
<h3><span class="h3-tag">RUNBOOK</span>PRODUCTION TROUBLESHOOTING PLAYBOOK</h3>
...
</section>
```

- [ ] **Step 2: Render `afterIndexHtml` after the bundle index**

Update `mainParts` construction:

```js
const mainParts = [bundleIntro(bundle)];
if (bundle.afterIndexHtml) {
  mainParts.push(bundle.afterIndexHtml.trim());
}
```

### Task 3: Regenerate And Verify

**Files:**
- Regenerate: `public/handbook/engineering-platform-tools-handbook.html`
- Regenerate: `src/handbook/documents/engineering-platform-tools.ts`

- [ ] **Step 1: Regenerate bundle HTML**

Run: `node scripts/generate-engineering-bundles.mjs`

Expected: `public/handbook/engineering-platform-tools-handbook.html` includes the new platform operating section.

- [ ] **Step 2: Regenerate document modules**

Run: `npm run generate:handbook`

Expected: `src/handbook/documents/engineering-platform-tools.ts` matches the public HTML.

- [ ] **Step 3: Run verification**

Run:

```bash
npm test
npm run build
```

Expected: both commands pass.
