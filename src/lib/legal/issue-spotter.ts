export interface IssueCandidate {
  title: string;
  reason: string;
  jurisdiction: string;
  confidence: number;
  requiresAuthorityResearch: boolean;
}

export function filterIssueCandidates(candidates: IssueCandidate[], minConfidence = 0.45) {
  return candidates.filter((candidate) => candidate.confidence >= minConfidence).sort((a, b) => b.confidence - a.confidence);
}
