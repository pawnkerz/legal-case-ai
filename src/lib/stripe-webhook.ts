import { createHmac, timingSafeEqual } from "node:crypto";

export function verifyStripeSignature(rawBody: string, signatureHeader: string, secret: string, toleranceSeconds = 300) {
  const parts = signatureHeader.split(",");
  const timestamp = parts.find((part) => part.startsWith("t="))?.slice(2);
  const signatures = parts.filter((part) => part.startsWith("v1=")).map((part) => part.slice(3));
  if (!timestamp || signatures.length === 0) return false;
  const age = Math.abs(Math.floor(Date.now() / 1000) - Number(timestamp));
  if (!Number.isFinite(age) || age > toleranceSeconds) return false;
  const expected = createHmac("sha256", secret).update(`${timestamp}.${rawBody}`, "utf8").digest("hex");
  const expectedBytes = Buffer.from(expected, "hex");
  return signatures.some((signature) => {
    try {
      const provided = Buffer.from(signature, "hex");
      return provided.length === expectedBytes.length && timingSafeEqual(provided, expectedBytes);
    } catch {
      return false;
    }
  });
}
