import { foundationExplanations } from "./macro-foundation-explanations.mjs";
import { observationExplanations } from "./macro-observation-explanations.mjs";
import { regimeExplanations } from "./macro-regime-explanations.mjs";
import { industryExplanations } from "./macro-industry-explanations.mjs";

export const macroExplanations = {
  ...foundationExplanations,
  ...observationExplanations,
  ...regimeExplanations,
  ...industryExplanations,
};
