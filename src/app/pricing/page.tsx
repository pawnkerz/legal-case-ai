import Link from "next/link";
import { Check, Scale } from "lucide-react";

const included = ["Full legal AI access", "Case workspaces", "Document uploads and analysis", "Case timelines and evidence organization", "Jurisdiction-aware legal research", "Citation-backed answers", "Draft document assistance", "Immigration workflows", "Court preparation and mock hearing tools"];

export default function PricingPage() {
  return <main className="shell pricingPage"><Link href="/" className="brand"><Scale size={24}/> Legal Case AI</Link><div className="pricingHeader"><span className="eyebrow">SIMPLE PRICING</span><h1>Five interactions to try it.<br/>Then one plan.</h1><p>No confusing tiers. Use the core experience first, then unlock the complete legal workspace.</p></div><section className="priceCard"><div><span className="planLabel">FULL ACCESS</span><div className="price"><strong>$59</strong><span>/month</span></div><p>Cancel anytime. Your case workspace remains tied to your account.</p></div><ul>{included.map(item => <li key={item}><Check size={18}/>{item}</li>)}</ul><Link href="/app" className="button">Start free interactions</Link><p className="finePrint">Usage limits may apply to exceptionally large document-processing workloads. This is legal self-help software, not legal representation.</p></section></main>;
}
