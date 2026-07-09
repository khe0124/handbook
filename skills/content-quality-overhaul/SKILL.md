---
name: content-quality-overhaul
description: Audit and improve low-quality, repetitive, generic, or templated content across a requested documentation/menu scope. Use when the user asks for exhaustive content quality inspection, Q&A quality diagnosis, copy-paste answer cleanup, content hardening, subagent-based review, improvement planning, or prevention tests for generated handbook/documentation content.
---

# Content Quality Overhaul

Use this skill to handle content quality complaints end to end. Do not jump straight to rewriting. First prove the scope, diagnose the content, write the plan, then improve and verify.

## Non-Negotiable Scope Discipline

Do not compress this workflow because the target appears similar to a previous overhaul. A prior backend/frontend/menu pass is context, not proof that the next scope is already clean.

If the user is dissatisfied, asks whether a full inspection really happened, or complains that work finished too quickly:

- Treat the previous pass as suspect until re-audited.
- Restart at scope resolution and per-item diagnosis for the requested scope.
- State explicitly what was insufficient in the previous pass before continuing.
- Do not count renderer cleanup, phrase replacement, or generic test additions as content-quality completion.
- Do not finish until every target item has explicit quality evidence and generated fallback paths are removed or fail-fast.

For Q&A content, “improved” means each question and follow-up answer is authored for that specific question. A generic answer generator, reusable answer map, phrase substitution layer, or broad pattern matcher is still filler unless the generated path is removed after explicit answers are written.

## Workflow

1. Resolve the scope exactly.
   - Identify every target document/menu item matching the user's scope.
   - Count items, sections, questions, generated files, source generators, and app-facing derived files.
   - Record exclusions explicitly if the user names a narrower scope.

2. Audit before editing.
   - Inspect every target item, not samples.
   - Search for repeated fallback phrases, templated titles, boilerplate answers, duplicated follow-up answers, shallow definitions, and answers that do not address the actual question.
   - Trace generated content back to the source generator or source data.
   - If the user requested subagents, split the audit by independent target item and ask each agent for findings only before implementation.

3. Produce a diagnosis report.
   - List all target items and counts.
   - Classify severity per item: acceptable, needs rewrite, severe/generated filler.
   - Include concrete repeated phrases, generation functions, and examples of weak answer patterns.
   - Separate content issues from pipeline issues.

4. Write an improvement plan.
   - Define quality bars before rewriting.
   - Specify which files will be edited and which files are generated outputs.
   - Plan prevention checks so the same filler cannot ship again.
   - For generated content, plan to update source data/generators first, then regenerate public/app artifacts.

5. Rewrite according to the plan.
   - Replace generic fallback answers with explicit question-specific answers.
   - Require each answer to include judgment criteria, mechanism, tradeoff, failure mode, and evidence when relevant.
   - Keep each follow-up answer specific to its follow-up question.
   - Do not preserve a fallback path that silently manufactures generic answers.
   - For Q&A, prefer a structured explicit shape such as `{ q, answer }` over string-only prompts that require answer synthesis later.

6. Add regression protection.
   - Add tests or deterministic checks for banned filler phrases, templated titles, duplicate follow-up answers, missing sections, and stale generated modules.
   - Make string fallback paths fail fast when explicit content is required.
   - Add a source-level check for leftover helper functions, shorthand constructors, broad pattern matchers, or fallback answer functions that could reintroduce filler.

7. Regenerate and verify.
   - Run source generators.
   - Regenerate derived app documents/search indexes if the project has them.
   - Run targeted content checks, full tests, and build when available.
   - Report exact counts and commands.

## Completion Gate

Before saying the work is complete, verify and report all of these:

- Exact target count audited, not sampled.
- Per-target diagnosis exists or is summarized from the audit.
- Improvement plan exists before the rewrite.
- Every target item was rewritten or explicitly marked acceptable with evidence.
- Generated content uses explicit authored data, not string prompts plus fallback synthesis.
- Fallback generation paths are removed or converted to fail-fast errors.
- Targeted checks cover all target files and all expected sections/questions.
- Full project tests and build were run when available, or the blocker is stated.

If any gate is missing, say the work is still incomplete and continue instead of giving a final completion answer.

## Quality Rubric

Treat content as failing if it has any of these signals:

- The same answer sentence appears across unrelated follow-up questions.
- The title is generated from a generic mold such as "X를 어떻게 설명하나요?" or "X: 리뷰에서 어떤 기준으로 판단하나요?" without a specific interview/review angle.
- Follow-up answers restate "selection criteria, failure modes, evidence" without naming the actual criteria or evidence for that topic.
- The answer defines a term but does not explain when it breaks, how to verify it, or what tradeoff it creates.
- Q&A content is rendered through a catch-all fallback instead of explicit authored answers.
- Generated HTML passes visually but source generator can still reintroduce filler later.
- The implementation only removes banned phrases while leaving answers structurally generic.
- Tests pass because they check wording patterns, but they do not prove every target section has explicit, unique follow-up answers.

Passing content should be specific enough that a reviewer can tell:

- what decision is being made,
- where the boundary or mechanism is,
- what can go wrong,
- what evidence proves the answer,
- how the answer changes under realistic operating conditions.

## Subagent Use

Use subagents when the requested scope contains multiple independent documents or sections.

- Give each subagent one target item or a disjoint group.
- Ask for diagnosis first, not edits, when the user asked for a staged quality process.
- For implementation, assign one writer at a time when all targets live in the same source file to avoid merge conflicts.
- After each worker returns, verify locally before starting the next source-file-overlapping worker.

## Generated Content Rules

When content is generated:

- Edit the generator/source data, not only generated HTML.
- Regenerate public output after every source update.
- Regenerate app-facing extracted modules and search indexes before final tests.
- Remove or fail fast on fallback generation paths after all explicit answers exist.

## Final Report

Report:

- target scope and total count audited,
- diagnosis and plan documents created,
- source files changed,
- generated artifacts updated,
- prevention tests added,
- verification commands and results,
- known out-of-scope issues discovered during search.
