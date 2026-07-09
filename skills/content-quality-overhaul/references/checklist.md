# Content Quality Overhaul Checklist

Use this checklist when the scope is large or the user is explicitly upset about content quality.

## Scope

- All target menu items/documents identified.
- Source files and generated files mapped.
- Total sections/questions counted.
- Out-of-scope neighboring content noted.
- Prior related work is not treated as proof; the current requested scope is independently re-audited.

## Audit

- Repeated phrases searched with `rg`.
- Generic titles searched.
- Source generator fallback paths located.
- Per-item quality verdict recorded.
- Concrete examples saved in the audit report.
- If the user challenged a previous pass, the audit names what was insufficient before new edits start.

## Plan

- Quality bar written before edits.
- Editing order chosen.
- Generated artifact flow documented.
- Regression tests specified.
- The plan explicitly rejects shortcut fixes such as phrase-only cleanup, renderer-only cleanup, or tests that do not force explicit content.

## Implementation

- Explicit answers replace generic fallback answers.
- Follow-up answers are unique within each question.
- Each answer names concrete criteria, risk, or evidence.
- Generator fallback removed or converted to fail-fast.
- Q&A follow-ups use explicit question/answer data instead of string prompts that need a fallback answer generator.
- Broad pattern-match answer helpers, reusable generic answer maps, and shorthand filler constructors are removed after conversion.

## Verification

- Targeted content scan passes.
- Every target section count matches expected count.
- Every target section has the expected number of explicit follow-up answers.
- No banned filler phrases, generic title molds, duplicate follow-up answers, fallback helpers, or shorthand prompt constructors remain in the source or generated output.
- Full test suite passes.
- Build passes when available.
- Final report lists exact commands and results.

## Stop Conditions

Do not report completion if any of these are true:

- Only a subset was sampled while the user requested exhaustive inspection.
- The generator can still synthesize Q&A answers from strings.
- The improvement mostly changed wording but not answer specificity.
- Tests passed without checking the entire target count.
- Generated files were not refreshed after source changes.
