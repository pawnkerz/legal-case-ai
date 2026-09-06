import Link from "next/link";
import { redirect } from "next/navigation";
import { CreditCard, Scale, ShieldCheck } from "lucide-react";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export default async function AccountPage() {
  const supabase = await createServerSupabaseClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  if (!claimsData?.claims?.sub) redirect("/login");
  const { data: userData } = await supabase.auth.getUser();
  const { data: entitlement } = await supabase.from("product_entitlements").select("plan,active,trial_interactions_used,subscription_status,current_period_end").eq("user_id", claimsData.claims.sub).maybeSingle();
  const paid = entitlement?.plan === "pro" && entitlement.active;

  return <main className="sectionPage"><div className="sectionTopbar"><Link href="/app" className="brand"><Scale size={20}/> Legal Case AI</Link><form action="/auth/signout" method="post"><button className="textButton">Sign out</button></form></div><section className="sectionShell"><div className="sectionHeading"><div><span className="eyebrow">ACCOUNT</span><h1>Subscription & security</h1><p>{userData.user?.email}</p></div></div><div className="accountGrid"><article className="card"><CreditCard size={22}/><h2>{paid ? "$59/month Pro" : "Free trial"}</h2><p>{paid ? `Subscription status: ${entitlement?.subscription_status ?? "active"}` : `${Math.max(0, 5 - (entitlement?.trial_interactions_used ?? 0))} free interactions remaining.`}</p>{!paid && <Link className="button" href="/pricing">Upgrade to Pro</Link>}</article><article className="card"><ShieldCheck size={22}/><h2>Privacy boundary</h2><p>Your case workspace is isolated by user ownership policies once the dedicated backend is active. AI workspace communications are not automatically attorney-client privileged.</p></article></div></section></main>;
}
