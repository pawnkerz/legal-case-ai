"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function ImmigrationIntakeForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setError("");
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    try {
      const response = await fetch("/api/immigration/cases", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await response.json();
      if (response.status === 401) { window.location.assign("/login"); return; }
      if (response.status === 402) { window.location.assign("/pricing"); return; }
      if (!response.ok) throw new Error(data.error ?? "Unable to create immigration matter");
      router.push(`/app/cases/${data.case.id}`); router.refresh();
    } catch (err) { setError(err instanceof Error ? err.message : "Unable to create immigration matter"); setLoading(false); }
  }

  return <form className="caseIntakeForm" onSubmit={submit}><div className="formGrid"><label>What are you trying to accomplish?<select name="goal" required defaultValue=""><option value="" disabled>Select goal</option><option value="adjustment">Green card / adjustment of status</option><option value="family">Family petition</option><option value="naturalization">Citizenship / naturalization</option><option value="employment">Employment immigration</option><option value="ead">Work authorization</option><option value="asylum">Asylum</option><option value="tps">TPS</option><option value="visa">Visa / consular processing</option><option value="removal">Removal / deportation proceedings</option><option value="bond">Immigration bond</option><option value="bia">BIA appeal</option><option value="reopen">Motion to reopen / reconsider</option><option value="humanitarian">Humanitarian relief</option><option value="document">Replace / renew immigration document</option><option value="unsure">Unsure</option></select></label><label>Current immigration status<input name="current_status" placeholder="e.g. LPR, visitor, pending asylum, unknown" /></label><label>Country of citizenship<input name="country_of_citizenship" /></label><label>Are you in immigration court?<select name="in_removal" defaultValue="false"><option value="false">No / unsure</option><option value="true">Yes</option></select></label><label>Immigration court<input name="court_name" placeholder="If applicable" /></label><label>Next hearing date<input name="next_hearing" type="date" /></label></div><label>Describe what happened<textarea name="summary" rows={7} maxLength={12000} placeholder="Include notices received, applications filed, deadlines, entries, denials, or court proceedings you know about." /></label><div className="securityNote">Do not enter an A-Number, Social Security number, passport number, or other high-sensitivity identifier here until the dedicated encrypted backend is active.</div>{error && <div className="formAlert errorAlert">{error}</div>}<button className="button" disabled={loading}>{loading ? "Creating immigration workspace…" : "Create immigration workspace"}</button></form>;
}
