import { rankAuthorities, type LegalAuthorityRecord } from "./authority";

export interface RetrievalQuery {
  query: string;
  jurisdiction: string;
  asOfDate?: string;
  matterType?: string;
}

export function selectAuthorities(records: LegalAuthorityRecord[], limit = 12) {
  return rankAuthorities(records)
    .filter((record) => record.verified && !record.supersededDate)
    .slice(0, limit);
}
