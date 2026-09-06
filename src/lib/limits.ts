export const MAX_DOCUMENT_BYTES = 25 * 1024 * 1024;
export const ALLOWED_DOCUMENT_MIME_TYPES = new Set([
  "application/pdf",
  "text/plain",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

export function validateDocumentUpload(file: File) {
  if (file.size > MAX_DOCUMENT_BYTES) return { ok: false as const, error: "File exceeds the 25 MB limit." };
  if (!ALLOWED_DOCUMENT_MIME_TYPES.has(file.type)) return { ok: false as const, error: "Unsupported file type." };
  return { ok: true as const };
}
