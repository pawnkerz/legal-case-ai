const prohibitedConductPatterns = [
  /hide\s+(the\s+)?evidence/i,
  /destroy\s+(the\s+)?evidence/i,
  /fabricate\s+(an?\s+)?evidence/i,
  /forge\s+(a\s+)?document/i,
  /lie\s+under\s+oath/i,
  /bribe\s+(the\s+)?judge/i,
];

export function requestsProhibitedLegalConduct(text: string) {
  return prohibitedConductPatterns.some((pattern) => pattern.test(text));
}
