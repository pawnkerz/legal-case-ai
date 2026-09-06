export interface CaseSummaryInput {
  jurisdiction: string;
  matterType: string;
  proceduralPosture?: string;
  facts: string[];
  disputedFacts: string[];
  evidenceGaps: string[];
  upcomingDeadlines: string[];
}

export function buildCaseSummary(input: CaseSummaryInput) {
  return {
    heading: `${input.matterType} · ${input.jurisdiction}`,
    proceduralPosture: input.proceduralPosture ?? "Not yet established",
    facts: input.facts,
    disputedFacts: input.disputedFacts,
    evidenceGaps: input.evidenceGaps,
    upcomingDeadlines: input.upcomingDeadlines,
  };
}
