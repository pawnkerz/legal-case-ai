export type LegalResponseKind = "information" | "case_analysis" | "draft" | "court_prep";

export interface LegalResponseEnvelope {
  kind: LegalResponseKind;
  summary: string;
  reasoningNotes: string[];
  nextSteps: string[];
  citations: Array<{ label: string; url: string; authorityId: string }>;
  complianceClass: "self_help" | "high_risk" | "representation_required";
}

export function legalResponseIsPublishable(response: LegalResponseEnvelope) {
  return response.citations.length > 0 && response.citations.every((citation) => citation.url.startsWith("https://"));
}
