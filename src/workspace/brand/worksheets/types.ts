export type Answer = string | string[];
export type Answers = Record<string, Answer>;
export type WorksheetField = {
  id: string; label: string; type: string; hint?: string;
  count?: number; options?: string[]; left?: string; right?: string; inputType?: string;
};
export type WorksheetGroup = {
  id: string; title: string; audience: string; intro: string;
  sections: { id: string; title: string; description?: string; fields: WorksheetField[] }[];
};
export type WorksheetDefinition = { id: "questionnaire" | "design-brief"; title: string; eyebrow: string; intro: string; groups: WorksheetGroup[] };
