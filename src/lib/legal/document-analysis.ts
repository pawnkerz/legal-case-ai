export interface DocumentAnalysisResult {
  documentId: string;
  documentType: string;
  extractedDates: string[];
  parties: string[];
  allegations: string[];
  obligations: string[];
  potentialDeadlines: Array<{ label: string; date: string; confidence: number }>;
  citedAuthorities: string[];
  warnings: string[];
}

export function highConfidenceDeadlines(result: DocumentAnalysisResult) {
  return result.potentialDeadlines.filter((deadline) => deadline.confidence >= 0.9);
}
