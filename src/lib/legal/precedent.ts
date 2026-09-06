export interface PrecedentContext {
  court: string;
  jurisdiction: string;
  bindingCourts: string[];
}

export function precedentWeight(caseCourt: string, context: PrecedentContext) {
  if (context.bindingCourts.includes(caseCourt)) return "binding" as const;
  return "persuasive" as const;
}
