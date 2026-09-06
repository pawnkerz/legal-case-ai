export interface TenantScope {
  userId: string;
  caseId?: string;
}

export function storagePrefix(scope: TenantScope) {
  return scope.caseId ? `${scope.userId}/${scope.caseId}/` : `${scope.userId}/`;
}
