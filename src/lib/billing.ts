export interface BillingEntitlement {
  plan: "trial" | "pro";
  trialInteractionsUsed: number;
  active: boolean;
  renewsAt?: string;
}

export const MONTHLY_PRICE_USD = 59;
export const TRIAL_INTERACTIONS = 5;

export function canUsePaidFeature(entitlement: BillingEntitlement) {
  return entitlement.plan === "pro" && entitlement.active;
}

export function canChat(entitlement: BillingEntitlement) {
  if (canUsePaidFeature(entitlement)) return true;
  return entitlement.trialInteractionsUsed < TRIAL_INTERACTIONS;
}
