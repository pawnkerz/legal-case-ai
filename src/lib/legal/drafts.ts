export interface DraftArtifact {
  id: string;
  caseId: string;
  kind: "declaration" | "motion" | "response" | "demand_letter" | "discovery" | "brief" | "form_support" | "other";
  title: string;
  content: string;
  sourceAuthorityIds: string[];
  sourceDocumentIds: string[];
  status: "draft" | "reviewed" | "finalized";
}

export function draftHasSources(draft: DraftArtifact) {
  return draft.sourceAuthorityIds.length > 0 || draft.sourceDocumentIds.length > 0;
}
