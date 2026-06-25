# AX Handbook Restructure Design

## Goal

Restructure and enrich the `AX` handbook so it works as both a training curriculum and an organizational adoption playbook. The target reader is not only an individual AI tool user, but an AX specialist engineer who introduces AI-augmented execution into a team, teaches others, defines safety boundaries, and operates measurable workflows.

The revised AX section should help readers answer four practical questions:

- What does AX mean beyond prompt writing?
- What capabilities must an AX engineer build?
- How should a team introduce, teach, verify, and govern AX workflows?
- What concrete artifacts should be produced during adoption?

## Audience

Use a combined audience model:

- Senior or lead engineers designing AX adoption for their teams.
- Developers learning AX as a practical engineering discipline.
- Engineering managers, CTOs, or platform leaders evaluating rollout, governance, and operating metrics.

The primary framing is `AX specialist engineer training and organizational adoption`. Content should be written for engineers, but each document should also expose the management and rollout concerns needed for adoption.

## Current Context

The AX section already has 12 documents:

1. `AX 개요`
2. `AX 엔지니어 역량 모델`
3. `AX 업무 자동화 설계`
4. `AI Harness Engineering`
5. `Context Engineering`
6. `Loop Engineering`
7. `Multi-Agent Workflow`
8. `검증과 평가`
9. `AI Governance & Security`
10. `AX 조직 적용 패턴`
11. `AX 실전 적용 사례`
12. `AX 실무 플레이북`

The current breadth is useful, but the order reads more like a concept catalog than a learning and adoption journey. In particular, organizational adoption appears late even though it should frame why the technical practices matter.

## Information Architecture

Keep the existing 12 documents and URLs, but reorder the AX menu around the journey of training and rollout:

1. `AX 개요`
2. `AX 엔지니어 역량 모델`
3. `AX 조직 적용 패턴`
4. `AX 업무 자동화 설계`
5. `Context Engineering`
6. `AI Harness Engineering`
7. `Loop Engineering`
8. `검증과 평가`
9. `Multi-Agent Workflow`
10. `AI Governance & Security`
11. `AX 실전 적용 사례`
12. `AX 실무 플레이북`

This order moves from foundation, to role capability, to organizational adoption context, then into technical execution systems, validation, governance, examples, and final training playbooks.

## Shared Document Pattern

Each AX document should be enriched using a common practical pattern. Do not force every document into identical chapter names, but every document should include these concerns:

1. Concept and standard
   Explain why the topic matters in AX and how a specialist approach differs from low-level AI tool usage.

2. Practical procedure
   Define the steps, decision criteria, escalation points, and stop conditions for applying the topic in a real organization.

3. Standard artifacts
   Include concrete outputs an AX engineer can reuse: task specs, context packages, harness policies, eval rubrics, autonomy ladders, rollout checklists, workshop plans, or operating dashboards.

4. Training practice
   Add exercises, workshop prompts, review questions, or assessment criteria that can be used in internal education.

5. Organizational checkpoint
   State who owns the practice, what approval gate is required, what metric should be watched, and what warning signals mean adoption should pause.

## Document-Level Direction

### AX 개요

Purpose: introduce AX as an operating discipline, not a prompt technique.

Add or strengthen:

- AX system model: task spec, context, model, tools, permissions, verification, audit.
- Differences between AI usage, AI-assisted work, and AX engineering.
- Learning map for the rest of the AX section.
- Adoption principle: AI can execute, but responsibility remains with the system owner.

### AX 엔지니어 역량 모델

Purpose: define the role, capability levels, and growth path of an AX specialist.

Add or strengthen:

- Skill matrix across workflow mining, task specification, context engineering, harness design, evaluation, governance, and change management.
- Level progression from practitioner to workflow owner to platform/adoption lead.
- Training rubric for evaluating whether someone can own an AX workflow.
- Portfolio artifacts: episode log, automation scorecard, eval set, governance memo, rollout note.

### AX 조직 적용 패턴

Purpose: explain how to introduce AX into an organization before discussing deeper technical systems.

Add or strengthen:

- Adoption stages: baseline, pilot, guarded workflow, team standard, platform support, scaled governance.
- Stakeholder map: engineers, security, legal, EMs, platform, data owners, reviewers.
- Pilot selection criteria and anti-patterns.
- Education path for different roles.
- Metrics and decision gates for expanding or stopping adoption.

### AX 업무 자동화 설계

Purpose: teach how to select and shape work that can be safely assisted or automated.

Add or strengthen:

- Workflow mining procedure.
- Automation scorecard using repeatability, verifiability, context stability, permission risk, failure cost, and expert bottleneck.
- Autonomy ladder from read-only analysis to proposal, patch, PR draft, merge, deploy, or prohibited.
- Standard task spec template.
- Classroom exercise using real repeated team work episodes.

### Context Engineering

Purpose: teach how to build reliable context packages instead of dumping raw information into a model.

Add or strengthen:

- Context source inventory: code, docs, tickets, logs, metrics, policies, architecture decisions, schemas, APIs.
- Relevance, sufficiency, isolation, provenance, freshness, and trust level.
- Untrusted content handling and prompt-injection-aware context boundaries.
- Context package template.
- Exercise for building a minimal context package for a bugfix, migration, or incident review.

### AI Harness Engineering

Purpose: define the execution layer around AI: tools, permissions, state, validation, and observability.

Add or strengthen:

- Harness architecture with model gateway, tool adapter, permission policy, context builder, verifier, audit logger, and reviewer handoff.
- Tool access policies by risk class.
- Sandboxing, dry-run, rollback, and approval gates.
- Harness design worksheet.
- Operational runbook for failed or unsafe harness execution.

### Loop Engineering

Purpose: make AX workflows iterative, measurable, and stoppable.

Add or strengthen:

- Plan, Act, Verify, Reflect loop with explicit state transitions.
- Stop conditions for repeated failure, unclear spec, missing tests, unsafe permission, or context gaps.
- Failure attribution taxonomy.
- Loop log template.
- Review practice for improving the workflow instead of only changing prompts.

### 검증과 평가

Purpose: define how AX results become trustworthy.

Add or strengthen:

- Episode package as the basic unit of evaluation.
- Eval set design for repeated workflow classes.
- Functional, regression, security, policy, and human-review checks.
- Quality metrics and organizational metrics: lead time, review latency, acceptance rate, rework rate, defect escape, cost per episode, learning retention.
- Evaluation rubric for training cohorts.

### Multi-Agent Workflow

Purpose: explain when and how multiple agents or roles are useful.

Add or strengthen:

- Use only when independent roles reduce risk or improve coverage.
- Role separation among planner, explorer, implementer, verifier, reviewer, and integrator.
- Worktree or branch isolation strategy.
- Integration checklist and conflict-handling rules.
- Exercise for running parallel review or implementation safely.

### AI Governance & Security

Purpose: make AX adoption safe, auditable, and compatible with organizational policy.

Add or strengthen:

- Data classification, secret handling, customer data boundaries, retention, audit, license, and supply-chain concerns.
- Prompt injection and untrusted content treatment.
- Permission boundary by workflow class.
- Exception approval flow and audit log requirements.
- Governance checklist for pilot launch.

### AX 실전 적용 사례

Purpose: show how the concepts combine in real team scenarios.

Add or strengthen:

- Cases should follow the same structure: problem, workflow, harness, context, permission, verification, metrics, failure mode, rollout lesson.
- Include examples for PR review, documentation sync, accessibility/performance review, incident analysis, migration review, security triage, and onboarding.
- Include failure cases where AX made work worse, and explain the root cause.

### AX 실무 플레이북

Purpose: provide the operational training and adoption curriculum.

Add or strengthen:

- 2-week AX automation sprint.
- 4-week AX engineer training curriculum.
- Role-specific workshops for developers, reviewers, managers, security, and platform owners.
- Capstone projects: trace-based eval harness, prompt injection defense, AI code review pipeline, autonomy ladder, and failure taxonomy.
- Templates index that links back to artifacts introduced across the AX documents.

## Implementation Scope

Expected files:

- `src/handbook/catalog.mjs`: reorder `AX_HANDBOOKS`.
- `src/handbook/documents/ax*.ts`: enrich AX document TOCs and body content.
- `src/handbook/practicalExamples.ts`: update AX practical examples to match the new learning and adoption flow.
- `scripts/handbook-html.test.mjs`: update AX label order and add assertions for training, rollout, artifacts, metrics, governance, and capstone coverage.
- `public/handbook/*.html`: regenerate using `npm run generate:handbook`.

Avoid changing the shared UI unless content volume exposes a real rendering issue. The current handbook layout can support this pass.

## Testing

Verification commands:

- `npm run generate:handbook`
- `npm test`
- `npm run build`

Tests should continue checking the existing AX concepts and add coverage for:

- `교육 과정`
- `파일럿`
- `조직 진단`
- `표준 산출물`
- `task spec`
- `context package`
- `harness policy`
- `eval rubric`
- `운영 지표`
- `거버넌스`
- `capstone`

## Risks and Controls

- Content bloat: keep each document dense but scannable. Use tables, serial cards, checklists, and concise prose.
- Duplicated ideas: allow repeated concepts only when they serve different stages. For example, autonomy appears in overview, automation design, governance, and playbook, but each should handle a different decision level.
- Broken test expectations: update tests with the new AX order and add semantic coverage instead of relying only on broad keyword presence.
- Generated file drift: regenerate public HTML and TS document modules from the source workflow, then verify with tests and build.
- Overclaiming AI outcomes: phrase productivity claims around measurable workflow outcomes, not generic AI speed promises.

## Success Criteria

- The AX menu reads as a coherent training and rollout journey.
- An AX specialist can use the section to run a workshop, choose a pilot, design a workflow, define a harness, evaluate results, and govern rollout.
- Each document includes practical procedures, reusable artifacts, training exercises, and organizational checkpoints.
- Existing handbook UI and document loading architecture remain unchanged.
- Tests and build pass after regeneration.
