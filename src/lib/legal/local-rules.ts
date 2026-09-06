export interface LocalRuleSource {
  courtName: string;
  jurisdiction: string;
  centralizedUrl?: string;
  clerkOfficialUrl?: string;
  authoritativeSource: "clerk" | "centralized" | "unknown";
  verifiedAt?: string;
}

export function preferredLocalRuleUrl(source: LocalRuleSource) {
  if (source.authoritativeSource === "clerk" && source.clerkOfficialUrl) return source.clerkOfficialUrl;
  return source.centralizedUrl ?? source.clerkOfficialUrl;
}
