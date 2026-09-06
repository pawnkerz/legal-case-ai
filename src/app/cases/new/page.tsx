"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Scale, ShieldCheck } from "lucide-react";

const MATTERS = ["Immigration", "Housing / landlord-tenant", "Family / custody / divorce", "Civil lawsuit", "Employment", "Consumer / debt", "Criminal", "Traffic", "Probate / estate", "Business", "Real estate", "Bankruptcy", "Benefits / administrative", "Other"];
const STATES = ["Washington", "California", "Oregon", "Texas", "Florida", "New York", "Other / unsure"];

type Intake = { matter:string; state:string; county:string; court:string; summary:string };

export default function NewCasePage(){
  const [data,setData]=useState<Intake>({matter:"",state:"",county:"",court:"",summary:""});
  const ready=useMemo(()=>Boolean(data.matter&&data.state&&data.summary.trim().length>=20),[data]);
  const set=(field:keyof Intake,value:string)=>setData((current)=>({...current,[field]:value}));

  return <main className="intakePage"><header className="portalHeader shell"><Link className="brand" href="/"><Scale size={22}/> Legal Case AI</Link><Link href="/cases"><ArrowLeft size={16}/> My cases</Link></header><section className="intakeWrap shell"><div className="intakeIntro"><span className="eyebrow">NEW CASE</span><h1>Tell us what happened.</h1><p>This intake creates structured case context. It does not establish an attorney-client relationship or promise a legal outcome.</p><div className="intakeSecurity"><ShieldCheck size={18}/><span>Case-specific legal functions are checked by the compliance layer before they are exposed.</span></div></div><form className="intakeForm" onSubmit={(event)=>event.preventDefault()}><label>Type of legal matter<select value={data.matter} onChange={(e)=>set("matter",e.target.value)}><option value="">Select a matter</option>{MATTERS.map((m)=><option key={m}>{m}</option>)}</select></label><div className="formGrid"><label>State / jurisdiction<select value={data.state} onChange={(e)=>set("state",e.target.value)}><option value="">Select</option>{STATES.map((s)=><option key={s}>{s}</option>)}</select></label><label>County<input value={data.county} onChange={(e)=>set("county",e.target.value)} placeholder="e.g. Pierce County"/></label></div><label>Court or agency, if known<input value={data.court} onChange={(e)=>set("court",e.target.value)} placeholder="e.g. Pierce County Superior Court, USCIS, EOIR"/></label><label>What happened?<textarea rows={8} value={data.summary} onChange={(e)=>set("summary",e.target.value)} placeholder="Describe the events in your own words. Include important dates, notices, hearings, deadlines, and what you are trying to accomplish."/><span className="fieldHelp">At least 20 characters. The production intake engine will convert this into facts, dates, parties, issues, and follow-up questions.</span></label><button className="button" disabled={!ready} type="button">Continue case intake <ArrowRight size={18}/></button>{data.matter==="Immigration"&&<Link className="inlineCallout" href="/immigration">Open the specialized immigration intake →</Link>}</form></section></main>;
}
