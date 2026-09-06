import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createLegalResponse, responseText } from "@/lib/openai";
import { jsonError, requireSameOrigin } from "@/lib/api";
import { normalizeUserText } from "@/lib/security";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    requireSameOrigin(request);
    const { id } = await params;
    const supabase = await createServerSupabaseClient();
    const { data: claimsData } = await supabase.auth.getClaims();
    const userId = claimsData?.claims?.sub;
    if (!userId) return jsonError("Authentication required", 401);
    const { data: entitlement } = await supabase.from("product_entitlements").select("plan,active").eq("user_id", userId).maybeSingle();
    if (!(entitlement?.plan === "pro" && entitlement.active)) return jsonError("Document drafting is included with the $59/month plan.", 402);
    const { data: legalCase } = await supabase.from("cases").select("*").eq("id", id).maybeSingle();
    if (!legalCase) return jsonError("Case not found", 404);
    const body = await request.json().catch(() => null) as { kind?: string; instructions?: string } | null;
    const kind = normalizeUserText(body?.kind ?? "document", 100);
    const instructions = normalizeUserText(body?.instructions ?? "", 6000);
    if (!instructions) return jsonError("Drafting instructions are required.");
    const [{ data: intake }, { data: timeline }, { data: evidence }] = await Promise.all([
      supabase.from("case_intake_answers").select("section,answer_key,answer_value").eq("case_id", id),
      supabase.from("case_timeline_events").select("occurred_at,label,description,is_deadline,confidence").eq("case_id", id),
      supabase.from("evidence_items").select("label,kind,status,notes").eq("case_id", id),
    ]);
    const context = JSON.stringify({ legalCase, intake: intake ?? [], timeline: timeline ?? [], evidence: evidence ?? [] });
    const { payload } = await createLegalResponse({ question: `Prepare a ${kind} draft for self-represented user review. Follow these instructions: ${instructions}. Do not invent facts. Clearly mark placeholders and facts that require verification. Include legal citations for material legal rules. Do not sign as an attorney or imply representation.`, jurisdiction: [legalCase.jurisdiction_country, legalCase.jurisdiction_state, legalCase.jurisdiction_county, legalCase.court_name].filter(Boolean).join(" / "), caseContext: context });
    return Response.json({ draft: responseText(payload) });
  } catch (error) { return jsonError(error instanceof Error ? error.message : "Unable to create draft", 500); }
}
