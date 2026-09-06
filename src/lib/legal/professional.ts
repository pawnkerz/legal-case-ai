export interface ProfessionalProvider {
  id: string;
  displayName: string;
  kind: "attorney" | "accredited_representative";
  jurisdictions: string[];
  verified: boolean;
}

export function providerCanHandle(provider: ProfessionalProvider, jurisdiction: string) {
  return provider.verified && provider.jurisdictions.includes(jurisdiction);
}
