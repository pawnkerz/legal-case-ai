import { createServerSupabaseClient } from "@/lib/supabase/server";
import { searchAuthorities } from "@/lib/repositories/legal";
import { createLegalResponse, responseText } from "@/lib/openai";
import { jsonError, requireSameOrigin } from "@/lib/api";
import { normalizeUserText } from "@/lib/security";

export async function POST(request: Request) {
  try {
    requireSameOrigin(request);
    const supabase = await createServerSupabaseClient();
    const { data: claimsData } = await supabase.auth.getClaims();
    const userId = claimsData?.claims?.sub;
    if (!userId) return jsonError("Authentication required", 401);
    const { data: entitlement } = await supabase.from("product_entitlements").select("plan,active").eq("user_id", userId).maybeSingle();
    if (!(entitlement?.plan === "pro" && entitlement.active)) return jsonError("Legal research is included with the $59/month plan.", 402);
    const body = await request.json().catch(() => null) as { query?: string; jurisdiction?: string } | null;
    const query = normalizeUserText(body?.query ?? "", 2000);
    const jurisdiction = normalizeUserText(body?.jurisdiction ?? "US", 120) || "US";
    if (!query) return jsonError("Research query is required.");

    const local = await searchAuthorities(supabase, { query, jurisdiction, limit: 20 }).catch(() => []);
    if (local.length > 0) return Response.json({ mode: "indexed", authorities: local });
    const { payload } = await createLegalResponse({ question: `Research this legal question and explain the current governing authorities: ${query}`, jurisdiction });
    return Response.json({ mode: "live", answer: responseText(payload) });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Unable to complete legal research", 500);
  }
}
