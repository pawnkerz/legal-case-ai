import Link from "next/link";
import { ArrowRight, BookOpenCheck, FileText, Scale, ShieldCheck } from "lucide-react";

const features = [
  { icon: BookOpenCheck, title: "Research with sources", text: "Find applicable statutes, rules, cases, agency guidance, and official forms with source-level citations." },
  { icon: FileText, title: "Build your case", text: "Organize facts, documents, evidence, timelines, deadlines, and drafts in one persistent workspace." },
  { icon: ShieldCheck, title: "Built-in legal boundaries", text: "A compliance layer separates legal self-help from functions reserved for licensed professionals." }
];

export default function Home() {
  return (
    <main>
      <nav className="nav shell">
        <Link href="/" className="brand"><Scale size={24} /> Legal Case AI</Link>
        <div className="navActions"><Link href="/pricing">Pricing</Link><Link className="button buttonSmall" href="/app">Try 5 interactions</Link></div>
      </nav>

      <section className="hero shell">
        <div className="eyebrow">LEGAL INTELLIGENCE + CASE PREPARATION</div>
        <h1>Understand your case.<br />Prepare with confidence.</h1>
        <p className="heroText">A jurisdiction-aware legal workspace that helps you understand documents, research law, organize evidence, prepare drafts, and get ready for court—without pretending to be a law firm.</p>
        <div className="heroActions">
          <Link className="button" href="/app">Start with 5 free interactions <ArrowRight size={18} /></Link>
          <Link className="button secondary" href="/pricing">See the $59 plan</Link>
        </div>
        <p className="finePrint">Legal information and self-help assistance only. Not a law firm. No attorney-client relationship is created.</p>
      </section>

      <section className="featureGrid shell">
        {features.map(({ icon: Icon, title, text }) => <article className="card" key={title}><Icon size={24}/><h2>{title}</h2><p>{text}</p></article>)}
      </section>

      <section className="caseTypes shell">
        <div><span className="eyebrow">BUILT FOR REAL LEGAL MATTERS</span><h2>One platform. Multiple legal domains.</h2></div>
        <p>Immigration is a first-class workflow alongside housing, family, civil, employment, consumer, bankruptcy, probate, criminal, traffic, business, and other matters.</p>
      </section>
    </main>
  );
}
