export interface LegalQueryContext {
  userId?: string;
  caseId?: string;
  jurisdiction: string;
  matterType?: string;
  question: string;
}

export function legalQueryCacheKey(input: LegalQueryContext) {
  const stable = `${input.jurisdiction}|${input.matterType ?? ""}|${input.question.trim().toLowerCase()}`;
  let hash = 2166136261;
  for (let i = 0; i < stable.length; i++) hash = Math.imul(hash ^ stable.charCodeAt(i), 16777619);
  return `legal:${(hash >>> 0).toString(16)}`;
}
