export interface AuthorityConflict {
  higherAuthorityId: string;
  lowerAuthorityId: string;
  reason: string;
}

export function resolveAuthorityConflicts(conflicts: AuthorityConflict[]) {
  return conflicts.map((conflict) => ({ ...conflict, resolution: `Prefer ${conflict.higherAuthorityId} unless a later controlling authority changes the rule.` }));
}
