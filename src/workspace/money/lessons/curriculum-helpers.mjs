// The exercises and numerical cases are original teaching examples, not source forecasts.
export const explain = (id, title, ...paragraphs) => ({ id, title, paragraphs });
export function learningLesson(lesson) {
  return {
    ...lesson,
    reviewedAt: "2026-09-30",
    explanations: lesson.explanations.map(section => ({ ...section, sources: section.sources ?? lesson.sources })),
  };
}
