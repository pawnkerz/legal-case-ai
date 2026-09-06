import { createSubscriptionCheckout } from "@/lib/stripe";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { jsonError, requireSameOrigin } from "@/lib/api";

export async function POST(request: Request) {
  try {
    requireSameOrigin(request);
    const supabase = await createServerSupabaseClient();
    const { data: claimsData, error } = await supabase.auth.getClaims();
    const userId = claimsData?.claims?.sub;
    if (error || !userId) return jsonError("Sign in before subscribing.", 401);
    const { data: userData } = await supabase.auth.getUser();
    const origin = new URL(request.url).origin;
    const session = await createSubscriptionCheckout({
      userId,
      email: userData.user?.email,
      successUrl: `${origin}/account?subscription=success`,
      cancelUrl: `${origin}/pricing?subscription=cancelled`,
    });
    return Response.json({ url: session.url });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Unable to create checkout session", 500);
  }
}
