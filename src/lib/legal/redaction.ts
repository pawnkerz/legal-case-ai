const SENSITIVE_PATTERNS: Array<[RegExp, string]> = [
  [/\b\d{3}-\d{2}-\d{4}\b/g, "[SSN REDACTED]"],
  [/\bA\d{8,9}\b/gi, "[A-NUMBER REDACTED]"],
];

export function redactSensitiveText(text: string) {
  return SENSITIVE_PATTERNS.reduce((value, [pattern, replacement]) => value.replace(pattern, replacement), text);
}
