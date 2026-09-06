import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, FileText, Plus, Scale } from "lucide-react";

const caseTypes = ["Immigration", "Housing", "Family", "Civil", "Employment", "Consumer / debt", "Criminal", "Traffic", "Probate", "Business", "Real estate", "Other"];

export default function CasesPage() {
  return (
    <main className="portalPage">
      <header className="portalHeader shell">
        <Link className="brand" href="/"><Scale size={22}/> Legal Case AI</Link>
        <Link className="button buttonSmall" href="/cases/new"><Plus size={16}/> New case</Link>
      </header>

      <section className="portalHero shell">
        <div>
          <span className="eyebrow">CASE WORKSPACE</span>
          <h1>My cases</h1>
          <p>Keep each legal matter separate by jurisdiction, court, documents, evidence, deadlines, research, and drafts.</p>
        </div>
        <Link className="button" href="/cases/new">Create your first case <ArrowRight size={18}/></Link>
      </section>

      <section className="emptyCase shell">
        <BriefcaseBusiness size={34}/>
        <h2>No cases yet</h2>
        <p>Start a structured intake so the system can determine jurisdiction, matter type, procedural posture, and the authoritative sources that should govern its analysis.</p>
        <Link className="button secondary" href="/cases/new">Start case intake</Link>
      </section>

      <section className="caseTypeGrid shell">
        <div className="sectionLead"><FileText size={22}/><div><strong>Supported case architecture</strong><span>These domains share the same evidence, document, timeline, citation, and compliance infrastructure.</span></div></div>
        <div className="chipGrid">{caseTypes.map((type)=><span key={type}>{type}</span>)}</div>
      </section>
    </main>
  );
}
