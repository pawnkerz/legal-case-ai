export interface CaseAccess {
  caseId: string;
  userId: string;
  role: "owner" | "professional_reviewer";
}

export function canMutateCase(access: CaseAccess, userId: string) {
  return access.userId === userId && access.role === "owner";
}
