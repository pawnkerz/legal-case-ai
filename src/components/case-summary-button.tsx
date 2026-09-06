"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";

export function CaseSummaryButton({ caseId }: { caseId: string }) {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");
  async function generate() {
    setLoading(true); setError("");
    try {
      const response = await fetch(`/api/cases/${caseId}/summary`, { method: "POST" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Unable to analyze case");
      setSummary(data.summary);
    } catch (err) { setError(err instanceof Error ? err.message : "Unable to analyze case"); }
    finally { setLoading(false); }
  }
  return <div className="caseSummaryTool"><button className="button" onClick={()=>void generate()} disabled={loading}><Sparkles size={17}/>{loading ? "Analyzing case…" : "Analyze my case"}</button>{error && <div className="formAlert errorAlert">{error}</div>}{summary && <div className="researchResult"><h2>Case analysis</h2><div className="answerText">{summary}</div></div>}</div>;
}
