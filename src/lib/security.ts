export const SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "X-Frame-Options": "DENY",
};

export function normalizeUserText(value: string, maxLength = 12000) {
  return value.replace(/\u0000/g, "").trim().slice(0, maxLength);
}
