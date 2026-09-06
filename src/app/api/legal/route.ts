import { createLegalResponse, responseText } from "@/lib/openai";
import { classifyLegalRequest, complianceNotice } from "@/lib/compliance";
import { requestsProhibitedLegalConduct } from "@/lib/legal/ethical-boundaries";
import { normalizeUserText } from "@/lib/security";
import { jsonError, requireSameOrigin } from "@/lib/api";
import { localRateLimit } from "@/lib/rate-limit";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    requireSameOrigin(request);
    const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (!localRateLimit(`legal:${forwarded}`, 12, 60_000).allowed) return jsonError("Too many requests. Try again shortly.", 429);

    const body = await request.json().catch(() => null) as { question?: string; jurisdiction?: string; caseContext?: string } | null;
    const question = normalizeUserText(body?.question ?? "", 12000);
    const jurisdiction = normalizeUserText(body?.jurisdiction ?? "", 120);
    const caseContext = normalizeUserText(body?.caseContext ?? "", 30000);
    if (!question) return jsonError("Question is required.");
    if (requestsProhibitedLegalConduct(question)) {
      return Response.json({
        answer: "I can help you understand lawful legal options, preserve evidence, organize your case, and prepare accurate filings. I cannot help conceal, destroy, falsify, forge, or fabricate evidence or mislead a court.",
        classification: "high_risk",
        notice: "The platform will only assist with lawful case preparation and accurate representations to courts and agencies.",
      });
    }

    const supabaseReady = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
    if (supabaseReady) {
      const supabase = await createServerSupabaseClient();
      const { data: claimsData } = await supabase.auth.getClaims();
      if (!claimsData?.claims?.sub) return jsonError("Sign in to use your five free legal interactions.", 401);
      const { error: trialError } = await supabase.rpc("consume_trial_interaction");
      if (trialError) {
        const { data: entitlement } = await supabase.from("product_entitlements").select("plan,active").eq("user_id", claimsData.claims.sub).maybeSingle();
        if (!(entitlement?.plan === "pro" && entitlement.active)) return jsonError("Your five free interactions are complete. Subscribe for $59/month to continue.", 402);
      }
    }

    const classification = classifyLegalRequest(question);
    if (classification === "representation_required") {
      return Response.json({
        answer: "I can help you research the law, organize your facts and evidence, prepare questions and drafts, and understand the procedure. I cannot appear as your lawyer, sign as counsel, or represent you in court or before an agency.",
        classification,
        notice: complianceNotice(classification),
      });
    }

    const { payload, requestId } = await createLegalResponse({ question, jurisdiction: jurisdiction || undefined, caseContext: caseContext || undefined });
    const answer = responseText(payload);
    if (!answer) return jsonError("The legal research service returned no answer.", 502);
    return Response.json({ answer, classification, notice: complianceNotice(classification), requestId });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to process the legal request";
    return jsonError(message, message.includes("configured") ? 503 : 500);
  }
}
