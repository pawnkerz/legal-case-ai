export const FREE_INTERACTION_LIMIT = 5;
export const MONTHLY_PRICE_USD = 59;

export function remainingTrialInteractions(used: number) {
  return Math.max(0, FREE_INTERACTION_LIMIT - Math.max(0, used));
}

export function requiresSubscription(used: number, subscribed: boolean) {
  return !subscribed && used >= FREE_INTERACTION_LIMIT;
}
