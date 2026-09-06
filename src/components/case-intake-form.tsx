"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function CaseIntakeForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setError("");
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    try {
      const response = await fetch("/api/cases", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await response.json();
      if (response.status === 401) { window.location.assign("/login"); return; }
      if (response.status === 402) { window.location.assign("/pricing"); return; }
      if (!response.ok) throw new Error(data.error ?? "Unable to create case");
      router.push(`/app/cases/${data.case.id}`);
      router.refresh();
    } catch (err) { setError(err instanceof Error ? err.message : "Unable to create case"); setLoading(false); }
  }

  return <form className="caseIntakeForm" onSubmit={submit}><div className="formGrid"><label>Case title<input name="title" required maxLength={180} placeholder="e.g. Smith v. Jones or My USCIS matter" /></label><label>Matter type<select name="matter_type" required defaultValue=""><option value="" disabled>Select matter type</option><option value="immigration">Immigration</option><option value="family">Family / custody / divorce</option><option value="housing">Landlord / tenant</option><option value="criminal">Criminal</option><option value="traffic">Traffic</option><option value="employment">Employment</option><option value="consumer_debt">Consumer / debt</option><option value="small_claims">Small claims</option><option value="civil">Civil lawsuit</option><option value="personal_injury">Personal injury</option><option value="probate_estate">Probate / estate</option><option value="business">Business</option><option value="real_estate">Real estate</option><option value="bankruptcy">Bankruptcy</option><option value="benefits_administrative">Benefits / administrative</option><option value="other">Other</option></select></label><label>Country<input name="jurisdiction_country" defaultValue="US" required /></label><label>State<input name="jurisdiction_state" placeholder="Washington" /></label><label>County<input name="jurisdiction_county" placeholder="Pierce" /></label><label>Court / agency<input name="court_name" placeholder="Pierce County Superior Court, USCIS, EOIR…" /></label></div><label>What happened?<textarea name="summary" rows={7} maxLength={12000} placeholder="Describe the matter in your own words. The AI will later turn this into a structured timeline, facts, issues, and evidence checklist." /></label>{error && <div className="formAlert errorAlert">{error}</div>}<button className="button" disabled={loading}>{loading ? "Creating case…" : "Create secure case workspace"}</button></form>;
}
