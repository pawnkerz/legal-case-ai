import type { LegalSourceConfig } from "./sources";

export interface SourceFetchResult {
  sourceId: string;
  fetchedAt: string;
  contentHash: string;
  changed: boolean;
  status: "ok" | "not_modified" | "error";
  error?: string;
}

export function shouldFetch(source: LegalSourceConfig, lastFetchedAt?: string) {
  if (!lastFetchedAt) return true;
  const last = new Date(lastFetchedAt).getTime();
  const ageHours = (Date.now() - last) / 3_600_000;
  if (source.refresh === "daily") return ageHours >= 24;
  if (source.refresh === "weekly") return ageHours >= 24 * 7;
  if (source.refresh === "monthly") return ageHours >= 24 * 30;
  return true;
}
