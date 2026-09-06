export type LegalSource = {
  id: string;
  name: string;
  jurisdiction: "federal" | "washington";
  domain: "statutes" | "regulations" | "court_rules" | "immigration" | "case_law" | "forms";
  authority: "primary" | "official_guidance";
  url: string;
  refresh: "daily" | "weekly" | "monthly";
  notes?: string;
};

/**
 * Seed registry for source adapters. Only official/primary government sources belong here.
 * The ingestion layer will store fetched versions, hashes, effective dates and provenance.
 */
export const LEGAL_SOURCES: readonly LegalSource[] = [
  {
    id: "uscode",
    name: "United States Code",
    jurisdiction: "federal",
    domain: "statutes",
    authority: "primary",
    url: "https://uscode.house.gov/",
    refresh: "weekly",
  },
  {
    id: "ecfr",
    name: "Electronic Code of Federal Regulations",
    jurisdiction: "federal",
    domain: "regulations",
    authority: "primary",
    url: "https://www.ecfr.gov/",
    refresh: "daily",
  },
  {
    id: "uscis-policy-manual",
    name: "USCIS Policy Manual",
    jurisdiction: "federal",
    domain: "immigration",
    authority: "official_guidance",
    url: "https://www.uscis.gov/policy-manual",
    refresh: "daily",
  },
  {
    id: "uscis-forms",
    name: "USCIS Forms",
    jurisdiction: "federal",
    domain: "forms",
    authority: "official_guidance",
    url: "https://www.uscis.gov/forms/all-forms",
    refresh: "daily",
  },
  {
    id: "eoir-policy-manual",
    name: "EOIR Policy Manual",
    jurisdiction: "federal",
    domain: "immigration",
    authority: "official_guidance",
    url: "https://www.justice.gov/eoir/policy-manual-eoir",
    refresh: "daily",
  },
  {
    id: "wa-rcw",
    name: "Revised Code of Washington",
    jurisdiction: "washington",
    domain: "statutes",
    authority: "primary",
    url: "https://app.leg.wa.gov/rcw/",
    refresh: "weekly",
    notes: "Track certified archive versions and current online compilation separately.",
  },
  {
    id: "wa-court-rules",
    name: "Washington State Court Rules",
    jurisdiction: "washington",
    domain: "court_rules",
    authority: "primary",
    url: "https://www.courts.wa.gov/court_rules/index.cfm",
    refresh: "daily",
    notes: "Local rules require court/clerk-level verification because the statewide site is not the official record for every local rule.",
  },
] as const;

export function sourcesFor(jurisdiction: LegalSource["jurisdiction"], domain?: LegalSource["domain"]) {
  return LEGAL_SOURCES.filter((source) => source.jurisdiction === jurisdiction && (!domain || source.domain === domain));
}
