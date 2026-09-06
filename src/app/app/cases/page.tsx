import Link from "next/link";
import { BriefcaseBusiness, Plus, Scale } from "lucide-react";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { listCases } from "@/lib/repositories/cases";

export default async function CasesPage() {
  const supabase = await createServerSupabaseClient();
  const cases = await listCases(supabase).catch(() => []);
  return <main className="sectionPage"><div className="sectionTopbar"><Link href="/app" className="brand"><Scale size={20}/> Legal Case AI</Link><Link className="button buttonSmall" href="/app/cases/new"><Plus size={16}/> New case</Link></div><section className="sectionShell"><div className="sectionHeading"><div><span className="eyebrow">CASE WORKSPACE</span><h1>My cases</h1><p>Each matter stays separate by jurisdiction, documents, evidence, timeline, legal research, and drafts.</p></div></div>{cases.length === 0 ? <div className="emptyState"><BriefcaseBusiness size={34}/><h2>No cases yet</h2><p>Your five free interactions let you try Legal AI. Persistent case workspaces are included with the $59/month plan.</p><Link className="button" href="/app/cases/new">Create a case</Link></div> : <div className="caseListGrid">{cases.map((legalCase:any)=><Link className="caseListCard" href={`/app/cases/${legalCase.id}`} key={legalCase.id}><div><span className="eyebrow">{String(legalCase.matter_type).replaceAll("_"," ")}</span><h2>{legalCase.title}</h2><p>{[legalCase.jurisdiction_state,legalCase.jurisdiction_county,legalCase.court_name].filter(Boolean).join(" · ") || legalCase.jurisdiction_country}</p></div><span className="pill">{legalCase.status}</span></Link>)}</div>}</section></main>;
}
