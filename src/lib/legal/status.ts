export type BuildReadiness = "blocked_backend" | "development" | "staging" | "production";

export function readinessLabel(state: BuildReadiness) {
  return state.replaceAll("_", " ");
}
