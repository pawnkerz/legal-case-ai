import Link from "next/link";
import { CalendarDays, FileText, Gavel, ListChecks, Scale, ShieldCheck } from "lucide-react";

export default async function CaseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <main className="sectionPage">
      <div className="sectionTopbar"><Link href="/app" className="brand"><Scale size={20}/> Legal Case AI</Link><Link href="/app/cases">Back to cases</Link></div>
      <section className="sectionShell">
        <div className="sectionHeading"><div><span className="eyebrow">CASE WORKSPACE</span><h1>Case {id}</h1><p>Your facts, authorities, documents, evidence, deadlines, and preparation tools stay scoped to this matter.</p></div><div className="status"><ShieldCheck size={16}/> Self-help mode</div></div>
        <div className="metricGrid">
          <article className="metricCard"><strong>0</strong><span>Documents</span></article>
          <article className="metricCard"><strong>0</strong><span>Evidence items</span></article>
          <article className="metricCard"><strong>0</strong><span>Issues identified</span></article>
          <article className="metricCard"><strong>0</strong><span>Deadlines</span></article>
        </div>
        <div className="caseToolGrid">
          <Link href="/documents" className="card"><FileText size={22}/><h2>Documents</h2><p>Upload and analyze pleadings, notices, correspondence, forms, and exhibits.</p></Link>
          <article className="card"><ListChecks size={22}/><h2>Evidence</h2><p>Map evidence to disputed facts, claims, defenses, and missing proof.</p></article>
          <article className="card"><CalendarDays size={22}/><h2>Timeline & deadlines</h2><p>Track events, filing dates, hearings, response deadlines, and procedural milestones.</p></article>
          <article className="card"><Gavel size={22}/><h2>Court preparation</h2><p>Build hearing checklists, likely questions, opposing arguments, and mock-hearing practice.</p></article>
        </div>
      </section>
    </main>
  );
}
