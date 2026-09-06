import Link from "next/link";
import { BookOpenCheck, ShieldCheck } from "lucide-react";
import { LEGAL_SOURCES } from "@/lib/legal/sources";
import { ResearchSearch } from "@/components/research-search";

export default function ResearchPage() {
  return <main className="sectionPage"><div className="sectionTopbar"><Link href="/app" className="brand">Legal Case AI</Link><Link href="/app/cases">Cases</Link></div><section className="sectionShell"><div className="sectionHeading"><div><span className="eyebrow">LEGAL RESEARCH</span><h1>Authority-first research</h1><p>Current verified authority is ranked above persuasive and secondary material. If the local indexed corpus has no result, the research engine can perform live official-source research.</p></div><div className="status"><ShieldCheck size={16}/> Citation verification required</div></div><ResearchSearch/><div className="sourceGrid">{LEGAL_SOURCES.map((source)=><article className="card" key={source.id}><BookOpenCheck size={20}/><h2>{source.name}</h2><p>{source.jurisdiction} · {source.authority} · refresh {source.refresh}</p><a href={source.url} target="_blank" rel="noreferrer">Official source</a></article>)}</div></section></main>;
}
