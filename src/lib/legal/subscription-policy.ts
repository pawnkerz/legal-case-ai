export function subscriptionFeatureAccess(plan: "trial" | "pro", active: boolean) {
  return {
    legalChat: plan === "pro" ? active : true,
    persistentCases: plan === "pro" && active,
    documentUpload: plan === "pro" && active,
    documentDrafting: plan === "pro" && active,
    courtPrep: plan === "pro" && active,
    immigrationWorkspace: plan === "pro" && active,
  };
}
