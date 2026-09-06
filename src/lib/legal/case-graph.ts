export interface CaseTimelineEvent {
  id: string;
  caseId: string;
  occurredAt: string;
  label: string;
  description?: string;
  sourceDocumentId?: string;
  isDeadline?: boolean;
}

export interface EvidenceItem {
  id: string;
  caseId: string;
  label: string;
  kind: "document" | "photo" | "video" | "audio" | "message" | "testimony" | "other";
  status: "collected" | "missing" | "disputed";
  supports?: string[];
  contradicts?: string[];
}

export interface CaseIssue {
  id: string;
  caseId: string;
  title: string;
  status: "possible" | "supported" | "disputed" | "resolved";
  elements: string[];
  evidenceIds: string[];
  authorityIds: string[];
  notes?: string;
}

export function caseReadiness(input: { issues: CaseIssue[]; evidence: EvidenceItem[]; deadlines: CaseTimelineEvent[] }) {
  const supported = input.issues.filter((i) => i.status === "supported").length;
  const missing = input.evidence.filter((e) => e.status === "missing").length;
  const deadlineCount = input.deadlines.filter((d) => d.isDeadline).length;
  return { supportedIssues: supported, missingEvidence: missing, trackedDeadlines: deadlineCount };
}
