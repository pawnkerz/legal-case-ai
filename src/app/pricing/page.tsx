import Link from "next/link";
import { Check, Scale } from "lucide-react";
import { SubscribeButton } from "@/components/subscribe-button";

const included = ["Full legal AI access", "Persistent case workspaces", "Private document uploads and analysis", "Case timelines and evidence organization", "Jurisdiction-aware legal research", "Citation-backed answers", "Draft document assistance", "Immigration workflows", "Court preparation and mock hearing tools"];

export default function PricingPage() {
  return <main className="shell pricingPage"><Link href="/" className="brand"><Scale size={24}/> Legal Case AI</Link><div className="pricingHeader"><span className="eyebrow">SIMPLE PRICING</span><h1>Five interactions to try it.<br/>Then one plan.</h1><p>No permanent free tier and no confusing packages. Create an account, try five legal interactions, then unlock the complete workspace.</p></div><section className="priceCard"><div><span className="planLabel">FULL ACCESS</span><div className="price"><strong>$59</strong><span>/month</span></div><p>Cancel anytime through the billing portal.</p></div><ul>{included.map(item => <li key={item}><Check size={18}/>{item}</li>)}</ul><SubscribeButton/><Link href="/login" className="secondaryLink">Need an account? Sign in or create one</Link><p className="finePrint">Usage limits may apply to exceptionally large document-processing workloads. Legal Case AI is legal information and self-help software, not legal representation.</p></section></main>;
}
