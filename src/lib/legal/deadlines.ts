export interface LegalDeadline {
  id: string;
  caseId: string;
  label: string;
  dueAt: string;
  sourceAuthorityId?: string;
  sourceDocumentId?: string;
  confidence: "confirmed" | "needs_review";
}

export function sortDeadlines(deadlines: LegalDeadline[]) {
  return [...deadlines].sort((a, b) => new Date(a.dueAt).getTime() - new Date(b.dueAt).getTime());
}

export function deadlineIsActionable(deadline: LegalDeadline) {
  return deadline.confidence === "confirmed" && Boolean(deadline.sourceAuthorityId || deadline.sourceDocumentId);
}
