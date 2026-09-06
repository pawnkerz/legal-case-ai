export type CorpusMode = "current_law" | "historical_law";

export interface CorpusScope {
  mode: CorpusMode;
  asOfDate?: string;
}

export function canMixCorpus(scope: CorpusScope) {
  return scope.mode === "historical_law";
}

export function requireAsOfDateForHistorical(scope: CorpusScope) {
  if (scope.mode === "historical_law" && !scope.asOfDate) throw new Error("Historical legal research requires an as-of date.");
  return scope;
}
