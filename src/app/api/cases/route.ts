import { createCase, listCases } from "@/lib/repositories/cases";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { jsonError, requireSameOrigin } from "@/lib/api";
import { normalizeUserText } from "@/lib/security";

export async function GET() {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: claimsData } = await supabase.auth.getClaims();
    if (!claimsData?.claims?.sub) return jsonError("Authentication required", 401);
    return Response.json({ cases: await listCases(supabase) });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Unable to load cases", 500);
  }
}

export async function POST(request: Request) {
  try {
    requireSameOrigin(request);
    const supabase = await createServerSupabaseClient();
    const { data: claimsData } = await supabase.auth.getClaims();
    const userId = claimsData?.claims?.sub;
    if (!userId) return jsonError("Authentication required", 401);
    const { data: entitlement } = await supabase.from("product_entitlements").select("plan,active").eq("user_id", userId).maybeSingle();
    if (!(entitlement?.plan === "pro" && entitlement.active)) return jsonError("A $59/month subscription is required for persistent case workspaces.", 402);
    const body = await request.json().catch(() => null) as Record<string, unknown> | null;
    const title = normalizeUserText(String(body?.title ?? ""), 180);
    const matterType = normalizeUserText(String(body?.matter_type ?? ""), 80);
    if (!title || !matterType) return jsonError("Case title and matter type are required.");
    const legalCase = await createCase(supabase, {
      title,
      matter_type: matterType,
      jurisdiction_country: normalizeUserText(String(body?.jurisdiction_country ?? "US"), 40) || "US",
      jurisdiction_state: normalizeUserText(String(body?.jurisdiction_state ?? ""), 80) || null,
      jurisdiction_county: normalizeUserText(String(body?.jurisdiction_county ?? ""), 120) || null,
      court_name: normalizeUserText(String(body?.court_name ?? ""), 200) || null,
    });
    const summary = normalizeUserText(String(body?.summary ?? ""), 12000);
    if (summary) await supabase.from("case_intake_answers").insert({ case_id: legalCase.id, user_id: userId, section: "matter", answer_key: "user_summary", answer_value: summary });
    return Response.json({ case: legalCase }, { status: 201 });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Unable to create case", 500);
  }
}
