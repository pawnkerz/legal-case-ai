export type JurisdictionLevel = "federal" | "state" | "county" | "city" | "court" | "agency";
export type CaseDomain =
  | "immigration"
  | "family"
  | "housing"
  | "criminal"
  | "traffic"
  | "employment"
  | "consumer"
  | "civil"
  | "injury"
  | "probate"
  | "business"
  | "real_estate"
  | "bankruptcy"
  | "benefits"
  | "other";

export type ComplianceClass = "self_help" | "high_risk" | "representation_required";

export interface LegalAuthority {
  id: string;
  jurisdiction: string;
  level: JurisdictionLevel;
  citation: string;
  title: string;
  sourceUrl: string;
  authorityScore: number;
  effectiveAt?: string;
  supersededAt?: string;
  retrievedAt: string;
  contentHash: string;
}

export interface CaseRecord {
  id: string;
  title: string;
  domain: CaseDomain;
  stateCode?: string;
  county?: string;
  court?: string;
  status: "intake" | "active" | "closed";
  nextDeadline?: string;
}
