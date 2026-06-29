# Experience Simulation Training Improvement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add practical simulation content that partially substitutes for missing real-world experience by forcing capstone execution, incident drills, review defense, and evidence-based evaluation.

**Architecture:** Use existing static handbook source files as the source of truth, then regenerate bundled HTML and TypeScript handbook documents with the existing scripts. Keep the new content focused on executable scenarios and review artifacts rather than broad conceptual explanation.

**Tech Stack:** Static HTML handbook sources, Node.js generation scripts, Vite build, `node:test` regression checks.

---

### Task 1: Add a Central Experience Simulator to the Fullstack Roadmap

**Files:**
- Modify: `public/handbook/fullstack-growth-roadmap-handbook.html`
- Test: `scripts/handbook-html.test.mjs`

- [ ] Add a new roadmap chapter after the existing training loop.
- [ ] Include a 6-week simulation track with constraints, artifacts, review gates, and scoring.
- [ ] Add markers for regression tests: `FS-09`, `EXPERIENCE SIMULATOR`, `Senior Simulation Scorecard`, `Week 4 Game Day`.

### Task 2: Add Domain-Specific Drills to Operations, DB, Security, and AX Evaluation

**Files:**
- Modify: `public/handbook/operations-roadmap-handbook.html`
- Modify: `public/handbook/db-handbook.html`
- Modify: `public/handbook/auth-security-handbook.html`
- Modify: `public/handbook/ax-verification-evaluation-handbook.html`
- Test: `scripts/handbook-html.test.mjs`

- [ ] Add an operations game-day drill matrix for deployment rollback, regional degradation, alert fatigue, and cost spike response.
- [ ] Add DB incident drills for slow query regression, connection pool exhaustion, lock contention, and failed migration recovery.
- [ ] Add security tabletop drills for IDOR, leaked token, webhook replay, and admin abuse.
- [ ] Add AX peer-review simulation content for using agents while preserving human accountability.

### Task 3: Regenerate Derived Handbook Documents

**Files:**
- Modify generated HTML under `public/handbook/*-handbook.html`
- Modify generated TS modules under `src/handbook/documents/*.ts`

- [ ] Run `node scripts/generate-engineering-bundles.mjs`.
- [ ] Run `npm run generate:handbook`.
- [ ] Confirm generated bundles include the new markers.

### Task 4: Add Regression Coverage and Verify

**Files:**
- Modify: `scripts/handbook-html.test.mjs`

- [ ] Add assertions for the new experience simulator, game-day, DB drill, security tabletop, and AX peer-review markers.
- [ ] Run `npm test`.
- [ ] Run `npm run build`.
- [ ] Report exact verification results.
