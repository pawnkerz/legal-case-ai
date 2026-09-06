import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createLegalResponse, responseText } from "@/lib/openai";
import { jsonError, requireSameOrigin } from "@/lib/api";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    requireSameOrigin(request);
    const { id } = await params;
    const supabase = await createServerSupabaseClient();
    const { data: claimsData } = await supabase.auth.getClaims();
    const userId = claimsData?.claims?.sub;
    if (!userId) return jsonError("Authentication required", 401);
    const [{ data: legalCase, error: caseError }, { data: intake }, { data: timeline }, { data: evidence }] = await Promise.all([
      supabase.from("cases").select("*").eq("id", id).single(),
      supabase.from("case_intake_answers").select("section,answer_key,answer_value").eq("case_id", id),
      supabase.from("case_timeline_events").select("occurred_at,label,description,is_deadline,confidence").eq("case_id", id).order("occurred_at"),
      supabase.from("evidence_items").select("label,kind,status,notes").eq("case_id", id),
    ]);
    if (caseError || !legalCase) return jsonError("Case not found", 404);
    const context = JSON.stringify({ legalCase, intake: intake ?? [], timeline: timeline ?? [], evidence: evidence ?? [] });
    const { payload } = await createLegalResponse({ question: "Create a structured case-preparation summary. Separate established user-provided facts, disputed/uncertain facts, missing information, possible issues requiring research, evidence gaps, deadlines that need verification, and practical preparation tasks. Do not invent facts or legal rules.", jurisdiction: [legalCase.jurisdiction_country, legalCase.jurisdiction_state, legalCase.jurisdiction_county, legalCase.court_name].filter(Boolean).join(" / "), caseContext: context });
    return Response.json({ summary: responseText(payload) });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Unable to summarize case", 500);
  }
}
