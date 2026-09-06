"use client";

import { useState } from "react";

export function DraftStudio({ caseId }: { caseId: string }) {
  const [kind, setKind] = useState("declaration");
  const [instructions, setInstructions] = useState("");
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generate() {
    if (!instructions.trim()) return;
    setLoading(true); setError(""); setDraft("");
    try {
      const response = await fetch(`/api/cases/${caseId}/draft`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ kind, instructions }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Unable to generate draft");
      setDraft(data.draft);
    } catch (err) { setError(err instanceof Error ? err.message : "Unable to generate draft"); }
    finally { setLoading(false); }
  }

  return <section className="casePanel"><h2>Document studio</h2><div className="draftControls"><select value={kind} onChange={(e)=>setKind(e.target.value)}><option value="declaration">Declaration</option><option value="response">Response</option><option value="motion">Motion draft</option><option value="demand letter">Demand letter</option><option value="discovery request">Discovery request</option><option value="research brief">Research brief</option><option value="form support">Form support</option></select><textarea value={instructions} onChange={(e)=>setInstructions(e.target.value)} rows={4} placeholder="What should the draft cover? Describe the purpose and any facts you want included."/><button className="button" onClick={()=>void generate()} disabled={loading || !instructions.trim()}>{loading ? "Preparing draft…" : "Generate draft"}</button></div>{error && <div className="formAlert errorAlert">{error}</div>}{draft && <div className="researchResult"><h2>Draft for your review</h2><div className="answerText">{draft}</div><p className="finePrint">Review every fact, citation, deadline, and filing requirement before use. This is self-help drafting software, not attorney representation.</p></div>}</section>;
}
