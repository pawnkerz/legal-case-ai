export interface OfficialFormRecord {
  formId: string;
  jurisdiction: string;
  agency?: string;
  title: string;
  editionDate?: string;
  feeCents?: number;
  officialUrl: string;
  instructionsUrl?: string;
  verifiedAt: string;
}

export function formNeedsRefresh(form: OfficialFormRecord, maxAgeDays = 7) {
  const age = Date.now() - new Date(form.verifiedAt).getTime();
  return age > maxAgeDays * 24 * 60 * 60 * 1000;
}
