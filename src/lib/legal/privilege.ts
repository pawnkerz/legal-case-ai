export interface ConfidentialityNotice {
  attorneyRelationshipExists: boolean;
  professionalProviderName?: string;
}

export function privilegeLabel(context: ConfidentialityNotice) {
  if (context.attorneyRelationshipExists && context.professionalProviderName) return "Professional communication — privilege depends on applicable law and relationship scope.";
  return "AI workspace communication — do not assume attorney-client privilege.";
}
