"use client";

import { useState } from "react";
import { Gavel } from "lucide-react";

export function MockHearing() {
  const [caseContext, setCaseContext] = useState("");
  const [response, setResponse] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  async function practice() {
    if (!caseContext.trim() || !response.trim()) return;
    setLoading(true);
    try {
      const question = `Run a mock hearing exercise. Based only on the supplied case context, act as a neutral hearing simulator. Evaluate the user's proposed response for clarity, factual support, missing evidence, and procedural preparation. Do not act as their attorney. CASE CONTEXT: ${caseContext}\nUSER PRACTICE RESPONSE: ${response}`;
      const result = await fetch("/api/legal", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ question }) });
      const data = await result.json();
      if (result.status === 401) { window.location.assign("/login"); return; }
      if (result.status === 402) { window.location.assign("/pricing"); return; }
      if (!result.ok) throw new Error(data.error ?? "Mock hearing failed");
      setFeedback(data.answer);
    } catch (error) { setFeedback(error instanceof Error ? error.message : "Mock hearing failed"); }
    finally { setLoading(false); }
  }

  return <div className="mockHearing"><label>Case context<textarea value={caseContext} onChange={(e)=>setCaseContext(e.target.value)} rows={6} placeholder="Paste or summarize the facts, hearing type, disputed issues, and evidence you want to practice with."/></label><label>Your practice answer<textarea value={response} onChange={(e)=>setResponse(e.target.value)} rows={5} placeholder="Practice what you would say in your own words."/></label><button className="button" onClick={()=>void practice()} disabled={loading || !caseContext.trim() || !response.trim()}><Gavel size={17}/>{loading ? "Evaluating…" : "Evaluate my practice response"}</button>{feedback && <div className="researchResult"><h2>Practice feedback</h2><div className="answerText">{feedback}</div></div>}</div>;
}
