"use client";

import { useState } from "react";
import { ArrowUp, FilePlus2, Sparkles } from "lucide-react";

type Message = { role: "user" | "assistant"; text: string; notice?: string };

export function LegalChat() {
  const [input, setInput] = useState("");
  const [jurisdiction, setJurisdiction] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [paywalled, setPaywalled] = useState(false);

  async function submit() {
    const question = input.trim();
    if (!question || loading || paywalled) return;
    setMessages((current) => [...current, { role: "user", text: question }]);
    setInput("");
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/legal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, jurisdiction: jurisdiction.trim() || undefined }),
      });
      const data = await response.json();
      if (response.status === 401) {
        window.location.assign("/login");
        return;
      }
      if (response.status === 402) {
        setPaywalled(true);
        setError(data.error ?? "Your trial is complete.");
        return;
      }
      if (!response.ok) throw new Error(data.error ?? "Unable to answer your legal question");
      setMessages((current) => [...current, { role: "assistant", text: data.answer, notice: data.notice }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to answer your legal question");
    } finally {
      setLoading(false);
    }
  }

  return <><div className="conversation">{messages.length === 0 ? <div className="welcome"><h1>What legal matter can I help you understand?</h1><p>Choose or enter your jurisdiction, then describe what happened. Material legal rules are researched against current sources before they are presented.</p><input className="jurisdictionInput" value={jurisdiction} onChange={(event)=>setJurisdiction(event.target.value)} placeholder="Jurisdiction, e.g. Washington or U.S. Immigration" aria-label="Jurisdiction"/><div className="suggestions"><button onClick={()=>setInput("I received an eviction notice. Help me understand what it says and what deadlines may apply.")}>Housing notice</button><button onClick={()=>{setJurisdiction("U.S. Immigration");setInput("I received a USCIS Request for Evidence. Help me understand the notice and organize my response.")}}>Immigration RFE</button><button onClick={()=>setInput("Help me identify the facts, evidence, and legal issues I should organize for my civil case.")}>Build a case</button></div></div> : messages.map((message,index)=> message.role === "user" ? <div className="messageGroup" key={index}><div className="userMessage">{message.text}</div></div> : <div className="messageGroup" key={index}><div className="aiMessage"><Sparkles size={18}/><div><div className="answerText">{message.text}</div>{message.notice && <div className="notice">{message.notice}</div>}</div></div></div>)}</div><div className="composerWrap">{paywalled && <div className="paywall"><strong>Your 5 free interactions are complete.</strong><span>Continue your legal workspace for $59/month.</span><a href="/pricing">Unlock full access</a></div>}{error && <div className="formAlert errorAlert">{error}</div>}<div className="composer"><button aria-label="Attach document" disabled title="Open Documents to attach case files"><FilePlus2 size={20}/></button><textarea aria-label="Legal question" value={input} disabled={loading || paywalled} onChange={(event)=>setInput(event.target.value)} onKeyDown={(event)=>{if(event.key === "Enter" && !event.shiftKey){event.preventDefault();void submit();}}} placeholder="Describe your legal question or case…" rows={2}/><button className="send" onClick={()=>void submit()} disabled={loading || paywalled || !input.trim()} aria-label="Send"><ArrowUp size={20}/></button></div><p>Legal information and self-help software. Not a law firm and not a substitute for licensed representation when representation is required.</p></div></>;
}
