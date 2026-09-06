import Link from "next/link";
import { FileText, Gavel, Scale, Search, ShieldCheck } from "lucide-react";
import { LegalChat } from "@/components/legal-chat";

export default function LegalWorkspace() {
  return <main className="workspace"><aside className="sidebar"><Link href="/" className="brand"><Scale size={22}/> Legal Case AI</Link><Link className="newCase" href="/app/cases/new">+ New case</Link><nav><Link className="active" href="/app">Ask Legal AI</Link><Link href="/app/cases">My cases</Link><Link href="/documents"><FileText size={16}/> Documents</Link><Link href="/immigration">Immigration</Link><Link href="/research"><Search size={16}/> Legal research</Link><Link href="/court-prep"><Gavel size={16}/> Court prep</Link></nav><div className="trialBadge"><strong>$59/month</strong><span>after 5 free interactions</span><Link href="/account">Account</Link></div></aside><section className="chat"><header><div><strong>Legal AI</strong><span>Jurisdiction-aware legal information & case preparation</span></div><div className="status"><ShieldCheck size={16}/> Compliance protected</div></header><LegalChat/></section></main>;
}
