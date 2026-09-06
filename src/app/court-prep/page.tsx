import Link from "next/link";
import { Gavel, Mic2, ShieldAlert } from "lucide-react";

export default function CourtPrepPage() {
  return (
    <main className="sectionPage">
      <div className="sectionTopbar"><Link href="/app" className="brand">Legal Case AI</Link><Link href="/app/cases">Cases</Link></div>
      <section className="sectionShell">
        <div className="sectionHeading"><div><span className="eyebrow">COURT PREPARATION</span><h1>Prepare before the hearing</h1><p>Practice likely questions, organize exhibits, identify disputed facts, and understand procedure without the software presenting itself as counsel.</p></div></div>
        <div className="caseToolGrid">
          <article className="card"><Gavel size={22}/><h2>Mock hearing</h2><p>Practice a structured hearing simulation using facts and authorities from the selected case.</p><button className="button" disabled>Choose a case first</button></article>
          <article className="card"><Mic2 size={22}/><h2>Live assist</h2><p>Future live transcription can surface case notes and sources only where court rules and permission allow electronic assistance.</p><button className="button secondary" disabled>Not enabled</button></article>
        </div>
        <div className="securityNote"><ShieldAlert size={16}/> The platform does not speak as counsel, enter an appearance, sign attorney filings, or represent the user in court.</div>
      </section>
    </main>
  );
}
