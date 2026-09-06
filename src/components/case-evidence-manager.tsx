"use client";

import { useEffect, useState } from "react";

type Evidence = { id: string; label: string; kind: string; status: string; notes?: string | null };

export function CaseEvidenceManager({ caseId }: { caseId: string }) {
  const [items, setItems] = useState<Evidence[]>([]);
  const [label, setLabel] = useState("");
  const [kind, setKind] = useState("document");
  const [status, setStatus] = useState("collected");
  const [error, setError] = useState("");

  async function load() {
    const response = await fetch(`/api/cases/${caseId}/evidence`);
    const data = await response.json();
    if (response.ok) setItems(data.evidence ?? []);
  }
  useEffect(()=>{void load()},[caseId]);

  async function add() {
    if (!label.trim()) return;
    setError("");
    const response = await fetch(`/api/cases/${caseId}/evidence`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ label, kind, status }) });
    const data = await response.json();
    if (!response.ok) { setError(data.error ?? "Unable to add evidence"); return; }
    setLabel(""); await load();
  }

  return <section className="casePanel"><h2>Evidence</h2><div className="inlineForm"><input value={label} onChange={(e)=>setLabel(e.target.value)} placeholder="Evidence item" aria-label="Evidence item"/><select value={kind} onChange={(e)=>setKind(e.target.value)}><option value="document">Document</option><option value="photo">Photo</option><option value="video">Video</option><option value="audio">Audio</option><option value="message">Message</option><option value="testimony">Testimony</option><option value="other">Other</option></select><select value={status} onChange={(e)=>setStatus(e.target.value)}><option value="collected">Collected</option><option value="missing">Missing</option><option value="disputed">Disputed</option></select><button className="button buttonSmall" onClick={()=>void add()}>Add</button></div>{error && <div className="formAlert errorAlert">{error}</div>}<div className="listStack">{items.length === 0 ? <p className="muted">No evidence items yet.</p> : items.map((item)=><article className="listRow" key={item.id}><div><strong>{item.label}</strong><span>{item.kind}</span></div><span className={`pill pill-${item.status}`}>{item.status}</span></article>)}</div></section>;
}
