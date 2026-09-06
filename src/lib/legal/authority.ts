export type LegalAuthorityLevel = "constitution" | "statute" | "regulation" | "court_rule" | "binding_case" | "persuasive_case" | "agency_guidance" | "form" | "secondary";

export interface LegalAuthorityRecord {
  id: string;
  jurisdiction: string;
  authorityLevel: LegalAuthorityLevel;
  title: string;
  citation?: string;
  officialUrl: string;
  effectiveDate?: string;
  supersededDate?: string;
  retrievedAt: string;
  contentHash: string;
  verified: boolean;
}

const score: Record<LegalAuthorityLevel, number> = {
  constitution: 1,
  statute: 1,
  regulation: .98,
  court_rule: .97,
  binding_case: .97,
  persuasive_case: .72,
  agency_guidance: .7,
  form: .7,
  secondary: .4,
};

export function authorityScore(record: LegalAuthorityRecord) {
  let value = score[record.authorityLevel];
  if (!record.verified) value -= .25;
  if (record.supersededDate) value -= .5;
  return Math.max(0, value);
}

export function rankAuthorities(records: LegalAuthorityRecord[]) {
  return [...records].sort((a, b) => authorityScore(b) - authorityScore(a));
}

export function assertCurrentVerified(record: LegalAuthorityRecord) {
  if (!record.verified) throw new Error(`Authority ${record.id} is not verified`);
  if (record.supersededDate) throw new Error(`Authority ${record.id} is superseded`);
  if (!record.officialUrl.startsWith("https://")) throw new Error(`Authority ${record.id} has no secure official source URL`);
  return record;
}
