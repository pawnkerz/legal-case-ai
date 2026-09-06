export type AuditAction = "case.created" | "document.uploaded" | "legal.query" | "draft.generated" | "court_prep.started" | "subscription.changed";

export interface AuditEventInput {
  action: AuditAction;
  caseId?: string;
  metadata?: Record<string, string | number | boolean | null>;
}

export function sanitizeAuditMetadata(metadata: AuditEventInput["metadata"] = {}) {
  const blocked = /password|token|secret|ssn|social_security|a_number|receipt_number/i;
  return Object.fromEntries(Object.entries(metadata).filter(([key]) => !blocked.test(key)));
}
