# Operations Handbook Playbook Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the repetitive operations handbook template with practical, topic-specific infrastructure operations playbooks.

**Architecture:** Fix the source generator `scripts/generate-operations-handbooks.mjs` so generated operation documents no longer repeat generic judgment tables. Add reusable rendering primitives for evidence, commands, triage, mitigation, incident packets, and topic-specific answer frames, then regenerate all operations HTML and TypeScript document modules.

**Tech Stack:** Node.js static generation scripts, static HTML handbook sources, generated TypeScript handbook modules, Node test runner, Vite build.

---

### Task 1: Remove Template-Like Repetition

**Files:**
- Modify: `scripts/generate-operations-handbooks.mjs`

- [ ] Remove generic phrases such as `말로는 이해했지만 장애 시 어느 계층을 볼지 정해지지 않음`.
- [ ] Remove generic evidence cells such as `설정, 로그, 지표, 변경 이력, 재현 명령`.
- [ ] Replace `X이 실제 서비스 경로에서...` tables with topic-specific operating questions.

### Task 2: Add Practical Playbook Sections

**Files:**
- Modify: `scripts/generate-operations-handbooks.mjs`

- [ ] Add `PLAYBOOK` nav and section for every operations document.
- [ ] Include command/evidence rows for DNS/TLS, VPC, security boundary, VPN, CI/CD, runtime, IaC, observability, incident response, cloud scenarios, and operations handoff.
- [ ] Include triage stage, immediate mitigation, durable fix, and review artifact content.

### Task 3: Regenerate and Validate

**Files:**
- Modify generated `public/handbook/operations-*-handbook.html`
- Modify generated `src/handbook/documents/operations-*.ts`
- Modify: `scripts/handbook-html.test.mjs`

- [ ] Run `node scripts/generate-operations-handbooks.mjs`.
- [ ] Run `npm run generate:handbook`.
- [ ] Add tests that reject the previous generic phrases and assert new playbook markers.
- [ ] Run `npm test`.
- [ ] Run `npm run build`.
