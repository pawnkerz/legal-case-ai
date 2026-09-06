const requiredPublic = ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"] as const;

export function publicEnvReady() {
  return requiredPublic.every((key) => Boolean(process.env[key]));
}

export function requireServerEnv(name: "OPENAI_API_KEY" | "STRIPE_SECRET_KEY" | "STRIPE_WEBHOOK_SECRET") {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required server environment variable: ${name}`);
  return value;
}
