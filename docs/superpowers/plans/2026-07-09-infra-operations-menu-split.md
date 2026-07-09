# Infra Operations Menu Split Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Split the long `인프라·운영` handbook menu into two top-level groups, `인프라` and `운영`, without changing document ids or routes.

**Architecture:** Keep `OPERATIONS_HANDBOOKS` and `OPERATIONS_QA_HANDBOOKS` as the source catalog. Add derived subsets for infrastructure-focused and operations-focused items, then update `HANDBOOK_GROUPS` to expose two groups while preserving all existing handbook files.

**Tech Stack:** JavaScript catalog modules, Node test runner, Vite build.

---

### Task 1: Catalog Split

**Files:**
- Modify: `src/handbook/catalog.mjs`

- [ ] **Step 1: Add derived menu subsets**

Add helper predicates after `OPERATIONS_MENU_HANDBOOKS`:

```js
const INFRA_OPERATIONS_IDS = new Set([
  "operations-roadmap",
  "operations-request-path",
  "operations-vpc-routing",
  "operations-security-boundary",
  "operations-dns-tls",
  "operations-private-connectivity",
  "operations-cloud-scenarios",
]);

const isMenuItemForBaseIds = (baseIds, item) => {
  const baseId = item.id.endsWith("-qa") ? item.id.replace(/-qa$/, "") : item.id;
  return baseIds.has(baseId);
};

export const INFRA_MENU_HANDBOOKS = OPERATIONS_MENU_HANDBOOKS.filter((item) =>
  isMenuItemForBaseIds(INFRA_OPERATIONS_IDS, item),
);

export const OPERATIONS_RUNTIME_MENU_HANDBOOKS = OPERATIONS_MENU_HANDBOOKS.filter(
  (item) => !isMenuItemForBaseIds(INFRA_OPERATIONS_IDS, item),
);
```

- [ ] **Step 2: Update top-level groups**

Replace the single `operations` group with:

```js
  {
    key: "infra",
    label: "인프라",
    items: INFRA_MENU_HANDBOOKS,
  },
  {
    key: "operations",
    label: "운영",
    items: [...OPERATIONS_RUNTIME_MENU_HANDBOOKS, ...ENGINEERING_CONTEXT_HANDBOOKS],
  },
```

### Task 2: Test Expectations

**Files:**
- Modify: `scripts/handbook-html.test.mjs`

- [ ] **Step 1: Update operations grouping tests**

Change tests that assume all operations documents live under the `operations` group so they accept `infra` for infrastructure items and `operations` for runtime/operational items.

- [ ] **Step 2: Update top-level catalog expectations**

Change group key expectation from:

```js
["cs-basic", "frontend", "backend", "operations", "llm", "ai-native", "design", "practice", "career"]
```

to:

```js
["cs-basic", "frontend", "backend", "infra", "operations", "llm", "ai-native", "design", "practice", "career"]
```

Assert `infraGroup.items.length === 14` and `operationsGroup.items.length === 22`.

### Task 3: Verification

**Files:**
- Read/verify generated and built outputs only.

- [ ] **Step 1: Generate handbook document modules**

Run:

```bash
npm run generate:handbook
```

Expected: exit code 0.

- [ ] **Step 2: Run tests**

Run:

```bash
npm test
```

Expected: 104 passing tests, 0 failures.

- [ ] **Step 3: Build**

Run:

```bash
npm run build
```

Expected: exit code 0. Existing Vite chunk-size warnings are acceptable.
