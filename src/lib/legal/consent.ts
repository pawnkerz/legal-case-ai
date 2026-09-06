export interface ConsentState {
  termsAcceptedAt?: string;
  privacyAcceptedAt?: string;
  aiDisclosureAcceptedAt?: string;
  recordingConsentAcceptedAt?: string;
}

export function baseConsentComplete(consent: ConsentState) {
  return Boolean(consent.termsAcceptedAt && consent.privacyAcceptedAt && consent.aiDisclosureAcceptedAt);
}
