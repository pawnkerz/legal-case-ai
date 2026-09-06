import { addEvidence, listEvidence } from "@/lib/repositories/evidence";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { jsonError, requireSameOrigin } from "@/lib/api";
import { normalizeUserText } from "@/lib/security";

async function authorizedCase(id: string) {
  const supabase = await createServerSupabaseClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  const userId = claimsData?.claims?.sub;
  if (!userId) return { error: jsonError("Authentication required", 401) } as const;
  const { data: legalCase } = await supabase.from("cases").select("id").eq("id", id).maybeSingle();
  if (!legalCase) return { error: jsonError("Case not found", 404) } as const;
  return { supabase, userId } as const;
}

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const auth = await authorizedCase(id);
  if ("error" in auth) return auth.error;
  try { return Response.json({ evidence: await listEvidence(auth.supabase, id) }); }
  catch (error) { return jsonError(error instanceof Error ? error.message : "Unable to load evidence", 500); }
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    requireSameOrigin(request);
    const { id } = await params;
    const auth = await authorizedCase(id);
    if ("error" in auth) return auth.error;
    const body = await request.json().catch(() => null) as { label?: string; kind?: string; status?: string; notes?: string } | null;
    const label = normalizeUserText(body?.label ?? "", 240);
    const kind = normalizeUserText(body?.kind ?? "other", 40);
    const status = normalizeUserText(body?.status ?? "collected", 40);
    if (!label) return jsonError("Evidence label is required.");
    if (!["document","photo","video","audio","message","testimony","other"].includes(kind)) return jsonError("Invalid evidence type.");
    if (!["collected","missing","disputed"].includes(status)) return jsonError("Invalid evidence status.");
    const evidence = await addEvidence(auth.supabase, { case_id: id, user_id: auth.userId, label, kind, status, notes: normalizeUserText(body?.notes ?? "", 4000) || null });
    return Response.json({ evidence }, { status: 201 });
  } catch (error) { return jsonError(error instanceof Error ? error.message : "Unable to add evidence", 500); }
}
