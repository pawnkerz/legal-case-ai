export interface ClaimEvidenceLink {
  issueId: string;
  element: string;
  evidenceIds: string[];
  authorityIds: string[];
  status: "supported" | "partial" | "unsupported" | "disputed";
}

export function elementCoverage(links: ClaimEvidenceLink[]) {
  const total = links.length;
  const covered = links.filter((link) => link.status === "supported" || link.status === "partial").length;
  return total === 0 ? 0 : Math.round((covered / total) * 100);
}
