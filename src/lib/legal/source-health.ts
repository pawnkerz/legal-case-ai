export interface SourceHealth {
  sourceId: string;
  lastSuccessAt?: string;
  lastFailureAt?: string;
  consecutiveFailures: number;
  lastContentChangeAt?: string;
}

export function sourceIsHealthy(health: SourceHealth) {
  return health.consecutiveFailures < 3 && Boolean(health.lastSuccessAt);
}
