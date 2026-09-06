import { TRIAL_INTERACTIONS } from "@/lib/billing";

export function trialInteractionAllowed(used: number) {
  return used >= 0 && used < TRIAL_INTERACTIONS;
}

export function nextTrialCount(used: number) {
  if (!trialInteractionAllowed(used)) throw new Error("Trial interaction limit reached");
  return used + 1;
}
