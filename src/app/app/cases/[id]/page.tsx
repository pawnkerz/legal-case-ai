import Link from "next/link";
import { notFound } from "next/navigation";
import { Scale, ShieldCheck } from "lucide-react";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { CaseDashboard } from "@/components/case-dashboard";

export default async function CaseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();
  const { data: legalCase } = await supabase.from("cases").select("*").eq("id", id).maybeSingle();
  if (!legalCase) notFound();
  const [{ count: documents }, { count: evidence }, { count: issues }, { count: deadlines }] = await Promise.all([
    supabase.from("case_documents").select("id", { count: "exact", head: true }).eq("case_id", id),
    supabase.from("evidence_items").select("id", { count: "exact", head: true }).eq("case_id", id),
    supabase.from("case_issues").select("id", { count: "exact", head: true }).eq("case_id", id),
    supabase.from("case_timeline_events").select("id", { count: "exact", head: true }).eq("case_id", id).eq("is_deadline", true),
  ]);
  return <main className="sectionPage"><div className="sectionTopbar"><Link href="/app" className="brand"><Scale size={20}/> Legal Case AI</Link><Link href="/app/cases">Back to cases</Link></div><section className="sectionShell"><div className="sectionHeading"><div><span className="eyebrow">{String(legalCase.matter_type).replaceAll("_", " ")}</span><h1>{legalCase.title}</h1><p>{[legalCase.jurisdiction_country, legalCase.jurisdiction_state, legalCase.jurisdiction_county, legalCase.court_name].filter(Boolean).join(" · ")}</p></div><div className="status"><ShieldCheck size={16}/> Self-help mode</div></div><div className="metricGrid"><article className="metricCard"><strong>{documents ?? 0}</strong><span>Documents</span></article><article className="metricCard"><strong>{evidence ?? 0}</strong><span>Evidence items</span></article><article className="metricCard"><strong>{issues ?? 0}</strong><span>Issues identified</span></article><article className="metricCard"><strong>{deadlines ?? 0}</strong><span>Deadlines</span></article></div><CaseDashboard caseId={id}/></section></main>;
}
