import { createServerSupabaseClient } from "@/lib/supabase/server";
import { jsonError, requireSameOrigin } from "@/lib/api";
import { normalizeUserText } from "@/lib/security";

async function scoped(id: string) {
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
  const auth = await scoped(id);
  if ("error" in auth) return auth.error;
  const { data, error } = await auth.supabase.from("case_timeline_events").select("*").eq("case_id", id).order("occurred_at");
  return error ? jsonError(error.message, 500) : Response.json({ timeline: data ?? [] });
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    requireSameOrigin(request);
    const { id } = await params;
    const auth = await scoped(id);
    if ("error" in auth) return auth.error;
    const body = await request.json().catch(() => null) as { occurred_at?: string; label?: string; description?: string; is_deadline?: boolean } | null;
    const label = normalizeUserText(body?.label ?? "", 240);
    const occurredAt = normalizeUserText(body?.occurred_at ?? "", 64);
    if (!label || !occurredAt || Number.isNaN(new Date(occurredAt).getTime())) return jsonError("A valid date and label are required.");
    const { data, error } = await auth.supabase.from("case_timeline_events").insert({ case_id: id, user_id: auth.userId, occurred_at: new Date(occurredAt).toISOString(), label, description: normalizeUserText(body?.description ?? "", 4000) || null, is_deadline: Boolean(body?.is_deadline), confidence: body?.is_deadline ? "needs_review" : "confirmed" }).select("*").single();
    if (error) throw error;
    return Response.json({ event: data }, { status: 201 });
  } catch (error) { return jsonError(error instanceof Error ? error.message : "Unable to add timeline event", 500); }
}
