export interface JurisdictionContext {
  country: "US";
  state?: string;
  county?: string;
  court?: string;
  federalCircuit?: string;
  agency?: string;
}

export function jurisdictionKey(ctx: JurisdictionContext) {
  return [ctx.country, ctx.state, ctx.county, ctx.court, ctx.agency].filter(Boolean).join(":");
}
