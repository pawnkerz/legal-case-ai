"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Scale, ShieldCheck } from "lucide-react";

const GOALS = ["Green card / adjustment of status", "Family petition", "Naturalization / citizenship", "Employment immigration", "Work authorization", "Asylum", "TPS", "DACA-related matter", "Visa / consular processing", "Removal / deportation proceedings", "Cancellation of removal", "Immigration bond", "BIA appeal", "Motion to reopen / reconsider", "Humanitarian relief", "Replace or renew a document", "Unsure"];

export default function ImmigrationPage(){
  const [goal,setGoal]=useState("");
  const [stage,setStage]=useState("");
  const [notice,setNotice]=useState("");
  const [hearing,setHearing]=useState("");

  return <main className="intakePage"><header className="portalHeader shell"><Link className="brand" href="/"><Scale size={22}/> Legal Case AI</Link><Link href="/app"><ArrowLeft size={16}/> Legal AI</Link></header><section className="intakeWrap shell"><div className="intakeIntro"><span className="eyebrow">IMMIGRATION WORKSPACE</span><h1>Start with the right immigration pathway.</h1><p>USCIS applications, EOIR proceedings, BIA appeals, consular matters, and federal-court issues require different sources and procedures. This intake keeps those systems separate.</p><div className="intakeSecurity"><ShieldCheck size={18}/><span>The platform does not claim to be an attorney or accredited representative and does not appear on a user's behalf.</span></div></div><form className="intakeForm" onSubmit={(e)=>e.preventDefault()}><label>What are you trying to accomplish?<select value={goal} onChange={(e)=>setGoal(e.target.value)}><option value="">Select a goal</option>{GOALS.map((g)=><option key={g}>{g}</option>)}</select></label><label>Where is the matter currently pending?<select value={stage} onChange={(e)=>setStage(e.target.value)}><option value="">Select if known</option><option>USCIS</option><option>Immigration Court / EOIR</option><option>Board of Immigration Appeals</option><option>Department of State / U.S. consulate</option><option>Federal court</option><option>Not filed yet</option><option>Unsure</option></select></label><label>Have you received a notice, request, charge, or decision?<textarea rows={5} value={notice} onChange={(e)=>setNotice(e.target.value)} placeholder="Describe the document and date, or upload it later in the document vault."/></label><label>Next known hearing or deadline<input type="date" value={hearing} onChange={(e)=>setHearing(e.target.value)}/></label><div className="sourcePreview"><strong>Authority set for this module</strong><span>INA / U.S. Code, Title 8 CFR, USCIS Policy Manual and current forms, EOIR Policy Manual, BIA materials, Department of State sources, and controlling federal case law.</span></div><button className="button" type="button" disabled={!goal}>Continue immigration intake</button></form></section></main>;
}
