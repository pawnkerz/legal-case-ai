import Link from "next/link";
import { BookOpenCheck, Search, ShieldCheck } from "lucide-react";
import { LEGAL_SOURCES } from "@/lib/legal/sources";

export default function ResearchPage() {
  return (
    <main className="sectionPage">
      <div className="sectionTopbar"><Link href="/app" className="brand">Legal Case AI</Link><Link href="/app/cases">Cases</Link></div>
      <section className="sectionShell">
        <div className="sectionHeading"><div><span className="eyebrow">LEGAL RESEARCH</span><h1>Authority-first research</h1><p>Research is designed to rank current controlling authority above persuasive and secondary material and to reject unverified citations.</p></div><div className="status"><ShieldCheck size={16}/> Citation verification required</div></div>
        <div className="researchBox"><Search size={20}/><input aria-label="Research query" placeholder="Search statutes, rules, cases, forms, or agency guidance…" disabled/><button disabled>Search</button></div>
        <div className="sourceGrid">{LEGAL_SOURCES.map((source)=><article className="card" key={source.id}><BookOpenCheck size={20}/><h2>{source.name}</h2><p>{source.jurisdiction} · {source.authority} · refresh {source.refresh}</p><a href={source.url} target="_blank" rel="noreferrer">Official source</a></article>)}</div>
      </section>
    </main>
  );
}
