import { createCase } from "@/lib/repositories/cases";
import { createServerSupabaseClient } from "@/lib/supabase/server";
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
    if (!(entitlement?.plan === "pro" && entitlement.active)) return jsonError("The immigration workspace is included with the $59/month plan.", 402);
    const body = await request.json().catch(() => null) as Record<string, unknown> | null;
    const goal = normalizeUserText(String(body?.goal ?? ""), 120);
    if (!goal) return jsonError("Immigration goal is required.");
    const legalCase = await createCase(supabase, { title: `Immigration — ${goal.replaceAll("_", " ")}`, matter_type: "immigration", jurisdiction_country: "US", court_name: normalizeUserText(String(body?.court_name ?? ""), 200) || null });
    const profile = {
      case_id: legalCase.id,
      user_id: userId,
      goal,
      current_status: normalizeUserText(String(body?.current_status ?? ""), 160) || null,
      country_of_citizenship: normalizeUserText(String(body?.country_of_citizenship ?? ""), 120) || null,
      proceedings: { inRemoval: String(body?.in_removal ?? "false") === "true", court: normalizeUserText(String(body?.court_name ?? ""), 200) || null, nextHearing: normalizeUserText(String(body?.next_hearing ?? ""), 40) || null },
    };
    const { error: profileError } = await supabase.from("immigration_profiles").insert(profile);
    if (profileError) throw profileError;
    const summary = normalizeUserText(String(body?.summary ?? ""), 12000);
    if (summary) await supabase.from("case_intake_answers").insert({ case_id: legalCase.id, user_id: userId, section: "matter", answer_key: "user_summary", answer_value: summary });
    return Response.json({ case: legalCase }, { status: 201 });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Unable to create immigration matter", 500);
  }
}
