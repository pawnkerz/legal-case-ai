export interface RetentionPolicy {
  caseDataDays: number | null;
  auditLogDays: number;
  deletedFileGraceDays: number;
}

export const DEFAULT_RETENTION_POLICY: RetentionPolicy = {
  caseDataDays: null,
  auditLogDays: 365,
  deletedFileGraceDays: 0,
};
