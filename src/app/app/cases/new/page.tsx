import Link from "next/link";
import { ArrowLeft, Scale, ShieldCheck } from "lucide-react";
import { CaseIntakeForm } from "@/components/case-intake-form";

export default function NewCasePage() {
  return <main className="sectionPage"><div className="sectionTopbar"><Link href="/app" className="brand"><Scale size={20}/> Legal Case AI</Link><Link href="/app/cases"><ArrowLeft size={16}/> My cases</Link></div><section className="sectionShell narrowSection"><div className="sectionHeading"><div><span className="eyebrow">NEW CASE</span><h1>Tell us what happened.</h1><p>Create a structured, jurisdiction-aware workspace for your legal matter.</p></div></div><div className="securityNote"><ShieldCheck size={16}/> Persistent case workspaces require the $59/month plan. Creating a workspace does not establish an attorney-client relationship.</div><CaseIntakeForm/></section></main>;
}
