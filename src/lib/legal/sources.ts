export interface LegalSourceConfig {
  id: string;
  name: string;
  jurisdiction: string;
  authority: "official" | "secondary";
  url: string;
  refresh: "daily" | "weekly" | "monthly" | "change_triggered";
  parser: "html" | "pdf" | "api" | "rss" | "bulk";
}

export const LEGAL_SOURCES: LegalSourceConfig[] = [
  { id: "us-code", name: "U.S. Code", jurisdiction: "US", authority: "official", url: "https://uscode.house.gov/", refresh: "weekly", parser: "html" },
  { id: "ecfr", name: "eCFR", jurisdiction: "US", authority: "official", url: "https://www.ecfr.gov/", refresh: "daily", parser: "api" },
  { id: "supreme-court", name: "U.S. Supreme Court", jurisdiction: "US", authority: "official", url: "https://www.supremecourt.gov/", refresh: "daily", parser: "html" },
  { id: "uscis", name: "USCIS", jurisdiction: "US-IMMIGRATION", authority: "official", url: "https://www.uscis.gov/", refresh: "daily", parser: "html" },
  { id: "eoir", name: "EOIR", jurisdiction: "US-IMMIGRATION", authority: "official", url: "https://www.justice.gov/eoir", refresh: "daily", parser: "html" },
  { id: "wa-rcw", name: "Washington RCW", jurisdiction: "WA", authority: "official", url: "https://app.leg.wa.gov/rcw/", refresh: "weekly", parser: "html" },
  { id: "wa-court-rules", name: "Washington Court Rules", jurisdiction: "WA", authority: "official", url: "https://www.courts.wa.gov/court_rules/", refresh: "weekly", parser: "html" },
];
