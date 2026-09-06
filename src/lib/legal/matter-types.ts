export const MATTER_TYPES = [
  "immigration",
  "family",
  "housing",
  "criminal",
  "traffic",
  "employment",
  "consumer_debt",
  "small_claims",
  "civil",
  "personal_injury",
  "probate_estate",
  "business",
  "real_estate",
  "bankruptcy",
  "benefits_administrative",
  "other",
] as const;

export type MatterType = (typeof MATTER_TYPES)[number];
