import type { ComplianceClass } from "@/types/domain";

export interface JurisdictionPolicy {
  jurisdiction: string;
  allowSelfHelp: boolean;
  allowFormAssistance: boolean;
  allowDraftPreparation: boolean;
  allowLiveCourtAssist: boolean;
  requiresProfessionalForRepresentation: boolean;
}

export const DEFAULT_POLICY: JurisdictionPolicy = {
  jurisdiction: "US",
  allowSelfHelp: true,
  allowFormAssistance: true,
  allowDraftPreparation: true,
  allowLiveCourtAssist: false,
  requiresProfessionalForRepresentation: true,
};

export function featureAllowed(policy: JurisdictionPolicy, classification: ComplianceClass) {
  if (classification === "representation_required") return !policy.requiresProfessionalForRepresentation;
  if (classification === "high_risk") return policy.allowSelfHelp;
  return policy.allowSelfHelp;
}
