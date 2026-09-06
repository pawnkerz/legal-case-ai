export interface StrategyOption {
  id: string;
  label: string;
  legalBasisAuthorityIds: string[];
  supportingEvidenceIds: string[];
  risks: string[];
  unknowns: string[];
}

export function compareStrategyOptions(options: StrategyOption[]) {
  return options.map((option) => ({
    ...option,
    supportCount: option.legalBasisAuthorityIds.length + option.supportingEvidenceIds.length,
    uncertaintyCount: option.risks.length + option.unknowns.length,
  }));
}
