const STRIPE_API = "https://api.stripe.com/v1";

function stripeKey() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not configured");
  return key;
}

async function stripePost(path: string, body: URLSearchParams) {
  const response = await fetch(`${STRIPE_API}${path}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${stripeKey()}`, "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data?.error?.message ?? `Stripe request failed (${response.status})`);
  return data;
}

export async function createSubscriptionCheckout(input: { userId: string; email?: string; successUrl: string; cancelUrl: string }) {
  const priceId = process.env.STRIPE_PRICE_ID;
  if (!priceId) throw new Error("STRIPE_PRICE_ID is not configured");
  const body = new URLSearchParams();
  body.set("mode", "subscription");
  body.set("line_items[0][price]", priceId);
  body.set("line_items[0][quantity]", "1");
  body.set("success_url", input.successUrl);
  body.set("cancel_url", input.cancelUrl);
  body.set("client_reference_id", input.userId);
  body.set("metadata[user_id]", input.userId);
  if (input.email) body.set("customer_email", input.email);
  return stripePost("/checkout/sessions", body);
}

export async function createBillingPortalSession(customerId: string, returnUrl: string) {
  const body = new URLSearchParams();
  body.set("customer", customerId);
  body.set("return_url", returnUrl);
  return stripePost("/billing_portal/sessions", body);
}
