export interface LaunchGates {
  backendIsolated: boolean;
  authVerified: boolean;
  rlsAdvisorsClean: boolean;
  aiKeyConfigured: boolean;
  stripeConfigured: boolean;
  webhookVerified: boolean;
  ciGreen: boolean;
  productionDeploymentHealthy: boolean;
}

export function launchReady(gates: LaunchGates) {
  return Object.values(gates).every(Boolean);
}
