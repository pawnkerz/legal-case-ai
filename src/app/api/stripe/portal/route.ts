import { createBillingPortalSession } from "@/lib/stripe";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { jsonError, requireSameOrigin } from "@/lib/api";

export async function POST(request: Request) {
  try {
    requireSameOrigin(request);
    const supabase = await createServerSupabaseClient();
    const { data: claimsData, error } = await supabase.auth.getClaims();
    const userId = claimsData?.claims?.sub;
    if (error || !userId) return jsonError("Sign in to manage billing.", 401);
    const { data: entitlement } = await supabase.from("product_entitlements").select("stripe_customer_id").eq("user_id", userId).maybeSingle();
    if (!entitlement?.stripe_customer_id) return jsonError("No active billing customer was found.", 404);
    const session = await createBillingPortalSession(entitlement.stripe_customer_id, `${new URL(request.url).origin}/account`);
    return Response.json({ url: session.url });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Unable to open billing portal", 500);
  }
}
