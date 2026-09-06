"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export function ResearchSearch() {
  const [query, setQuery] = useState("");
  const [jurisdiction, setJurisdiction] = useState("US");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function run() {
    if (!query.trim()) return;
    setLoading(true); setError(""); setResult(null);
    try {
      const response = await fetch("/api/research", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ query, jurisdiction }) });
      const data = await response.json();
      if (response.status === 401) { window.location.assign("/login"); return; }
      if (response.status === 402) { window.location.assign("/pricing"); return; }
      if (!response.ok) throw new Error(data.error ?? "Research failed");
      setResult(data);
    } catch (err) { setError(err instanceof Error ? err.message : "Research failed"); }
    finally { setLoading(false); }
  }

  return <div className="researchTool"><div className="researchBox"><Search size={20}/><input value={query} onChange={(event)=>setQuery(event.target.value)} placeholder="Search statutes, rules, cases, forms, or agency guidance…" aria-label="Research query"/><input className="researchJurisdiction" value={jurisdiction} onChange={(event)=>setJurisdiction(event.target.value)} aria-label="Research jurisdiction" placeholder="Jurisdiction"/><button onClick={()=>void run()} disabled={loading || !query.trim()}>{loading ? "Researching…" : "Search"}</button></div>{error && <div className="formAlert errorAlert">{error}</div>}{result?.mode === "live" && <div className="researchResult"><h2>Research result</h2><div className="answerText">{result.answer}</div></div>}{result?.mode === "indexed" && <div className="researchResult"><h2>Authorities</h2>{result.authorities.map((item:any)=><article className="authorityResult" key={item.id}><strong>{item.citation || item.title}</strong><span>{item.title}</span><a href={item.official_url} target="_blank" rel="noreferrer">Official source</a></article>)}</div>}</div>;
}
