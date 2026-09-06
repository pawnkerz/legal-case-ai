export type VerificationStatus = "unverified" | "verified" | "rejected";

export interface CitationClaim {
  claim: string;
  authorityId: string;
  quote?: string;
  pinpoint?: string;
  verification: VerificationStatus;
}

export function verifyCitationClaims(claims: CitationClaim[]) {
  const rejected = claims.filter((c) => c.verification === "rejected");
  const unverified = claims.filter((c) => c.verification === "unverified");
  return { canPublish: rejected.length === 0 && unverified.length === 0, rejected, unverified };
}
