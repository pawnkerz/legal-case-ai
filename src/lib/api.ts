export function jsonError(message: string, status = 400) {
  return Response.json({ error: message }, { status });
}

export function requireSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (!origin || !host) return;
  const originHost = new URL(origin).host;
  if (originHost !== host) throw new Error("Cross-origin request rejected");
}
