"use client";

import { useEffect, useState } from "react";

type Timeline = { id: string; occurred_at: string; label: string; description?: string | null; is_deadline: boolean; confidence: string };

export function CaseTimelineManager({ caseId }: { caseId: string }) {
  const [items, setItems] = useState<Timeline[]>([]);
  const [date, setDate] = useState("");
  const [label, setLabel] = useState("");
  const [deadline, setDeadline] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    const response = await fetch(`/api/cases/${caseId}/timeline`);
    const data = await response.json();
    if (response.ok) setItems(data.timeline ?? []);
  }
  useEffect(()=>{void load()},[caseId]);

  async function add() {
    if (!date || !label.trim()) return;
    setError("");
    const response = await fetch(`/api/cases/${caseId}/timeline`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ occurred_at: date, label, is_deadline: deadline }) });
    const data = await response.json();
    if (!response.ok) { setError(data.error ?? "Unable to add timeline event"); return; }
    setDate(""); setLabel(""); setDeadline(false); await load();
  }

  return <section className="casePanel"><h2>Timeline & deadlines</h2><div className="inlineForm timelineForm"><input type="date" value={date} onChange={(e)=>setDate(e.target.value)} aria-label="Event date"/><input value={label} onChange={(e)=>setLabel(e.target.value)} placeholder="Event or deadline" aria-label="Event label"/><label className="checkLabel"><input type="checkbox" checked={deadline} onChange={(e)=>setDeadline(e.target.checked)}/> Deadline</label><button className="button buttonSmall" onClick={()=>void add()}>Add</button></div>{error && <div className="formAlert errorAlert">{error}</div>}<div className="listStack">{items.length === 0 ? <p className="muted">No timeline events yet.</p> : items.map((item)=><article className="listRow" key={item.id}><div><strong>{item.label}</strong><span>{new Date(item.occurred_at).toLocaleDateString()}</span></div>{item.is_deadline && <span className={`pill ${item.confidence === "confirmed" ? "pill-collected" : "pill-missing"}`}>{item.confidence === "confirmed" ? "deadline" : "verify deadline"}</span>}</article>)}</div></section>;
}
