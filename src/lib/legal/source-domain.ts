import { LEGAL_SOURCES } from "./sources";

export function configuredOfficialDomains(jurisdiction?: string) {
  const relevant = LEGAL_SOURCES.filter((source) => source.authority === "official" && (!jurisdiction || source.jurisdiction === jurisdiction || source.jurisdiction === "US"));
  return [...new Set(relevant.map((source) => new URL(source.url).hostname.replace(/^www\./, "")))];
}
