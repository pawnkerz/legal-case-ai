export type ProductCapability = "legal_chat" | "case_workspace" | "document_analysis" | "drafting" | "court_prep" | "live_court_assist" | "representation";

export function capabilityRequiresProfessional(capability: ProductCapability) {
  return capability === "representation";
}

export function capabilityRequiresCourtPolicy(capability: ProductCapability) {
  return capability === "live_court_assist";
}
