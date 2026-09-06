export interface AiUsageBudget {
  maxInputTokens: number;
  maxOutputTokens: number;
  maxDocumentsPerTurn: number;
}

export const DEFAULT_AI_USAGE_BUDGET: AiUsageBudget = {
  maxInputTokens: 80000,
  maxOutputTokens: 6000,
  maxDocumentsPerTurn: 20,
};
