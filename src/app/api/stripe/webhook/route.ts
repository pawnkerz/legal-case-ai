import { verifyStripeSignature } from "@/lib/stripe-webhook";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { jsonError } from "@/lib/api";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) return jsonError("Stripe webhook is not configured", 503);
  const rawBody = await request.text();
  const signature = request.headers.get("stripe-signature");
  if (!signature || !verifyStripeSignature(rawBody, signature, secret)) return jsonError("Invalid Stripe signature", 400);

  let event: any;
  try { event = JSON.parse(rawBody); } catch { return jsonError("Invalid webhook payload", 400); }
  const object = event?.data?.object ?? {};
  const admin = createAdminSupabaseClient();

  if (event.type === "checkout.session.completed" && object.mode === "subscription") {
    const userId = object.client_reference_id ?? object.metadata?.user_id;
    if (userId) {
      await admin.from("product_entitlements").upsert({
        user_id: userId,
        plan: "pro",
        active: true,
        stripe_customer_id: typeof object.customer === "string" ? object.customer : object.customer?.id,
        stripe_subscription_id: typeof object.subscription === "string" ? object.subscription : object.subscription?.id,
        subscription_status: "active",
        updated_at: new Date().toISOString(),
      }, { onConflict: "user_id" });
    }
  }

  if (["customer.subscription.created", "customer.subscription.updated", "customer.subscription.deleted"].includes(event.type)) {
    const subscriptionId = object.id;
    if (subscriptionId) {
      const status = String(object.status ?? "unknown");
      const active = ["active", "trialing"].includes(status);
      await admin.from("product_entitlements").update({
        plan: active ? "pro" : "trial",
        active,
        subscription_status: status,
        current_period_end: object.current_period_end ? new Date(object.current_period_end * 1000).toISOString() : null,
        updated_at: new Date().toISOString(),
      }).eq("stripe_subscription_id", subscriptionId);
    }
  }

  return Response.json({ received: true });
}
