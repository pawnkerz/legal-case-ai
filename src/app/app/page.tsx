"use client";

import { useMemo, useState } from "react";
import { ArrowUp, FilePlus2, Scale, ShieldCheck, Sparkles } from "lucide-react";
import { classifyLegalRequest, complianceNotice } from "@/lib/compliance";
import { FREE_INTERACTION_LIMIT, remainingTrialInteractions } from "@/lib/trial";

export default function LegalWorkspace() {
  const [input, setInput] = useState("");
  const [used, setUsed] = useState(0);
  const [messages, setMessages] = useState<Array<{q:string; notice:string}>>([]);
  const remaining = remainingTrialInteractions(used);
  const disabled = remaining === 0;
  const classification = useMemo(() => classifyLegalRequest(input), [input]);

  function submit() {
    if (!input.trim() || disabled) return;
    setMessages((m) => [...m, { q: input.trim(), notice: complianceNotice(classification) }]);
    setUsed((u) => u + 1);
    setInput("");
  }

  return <main className="workspace"><aside className="sidebar"><LinkBrand/><button className="newCase">+ New case</button><nav><span className="active">Ask Legal AI</span><span>My cases</span><span>Documents</span><span>Immigration</span></nav><div className="trialBadge"><strong>{remaining} of {FREE_INTERACTION_LIMIT}</strong><span>free interactions left</span></div></aside><section className="chat"><header><div><strong>Legal AI</strong><span>Jurisdiction-aware self-help assistant</span></div><div className="status"><ShieldCheck size={16}/> Compliance protected</div></header><div className="conversation">{messages.length === 0 ? <div className="welcome"><Scale size={38}/><h1>What legal matter can I help you understand?</h1><p>Ask a legal question or describe what happened. I’ll help identify the jurisdiction, issues, documents, and authoritative sources that may apply.</p><div className="suggestions"><button onClick={()=>setInput("I received an eviction notice in Washington. Help me understand it.")}>Housing notice</button><button onClick={()=>setInput("I have an immigration case and received a USCIS request for evidence.")}>Immigration RFE</button><button onClick={()=>setInput("Help me organize evidence for a civil case.")}>Build a case</button></div></div> : messages.map((m,i)=><div className="messageGroup" key={i}><div className="userMessage">{m.q}</div><div className="aiMessage"><Sparkles size={18}/><div><strong>Case intake captured.</strong><p>The production legal-retrieval engine will answer here after jurisdiction resolution and citation verification.</p><div className="notice">{m.notice}</div></div></div></div>)}</div><div className="composerWrap">{disabled && <div className="paywall"><strong>Your 5 free interactions are complete.</strong><span>Unlock the full case workspace for $59/month.</span><a href="/pricing">Unlock full access</a></div>}<div className="composer"><button aria-label="Attach document"><FilePlus2 size={20}/></button><textarea aria-label="Legal question" value={input} disabled={disabled} onChange={(e)=>setInput(e.target.value)} placeholder="Describe your legal question or case..." rows={2}/><button className="send" onClick={submit} disabled={disabled || !input.trim()} aria-label="Send"><ArrowUp size={20}/></button></div><p>Legal information and self-help assistance only. Not a law firm or substitute for licensed representation.</p></div></section></main>;
}

function LinkBrand(){return <a className="brand" href="/"><Scale size={22}/> Legal Case AI</a>}
