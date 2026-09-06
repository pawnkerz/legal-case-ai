import Link from "next/link";
import { ArrowLeft, Scale, ShieldCheck } from "lucide-react";
import { ImmigrationIntakeForm } from "@/components/immigration-intake-form";

export default function ImmigrationPage(){
  return <main className="sectionPage"><div className="sectionTopbar"><Link className="brand" href="/app"><Scale size={20}/> Legal Case AI</Link><Link href="/app"><ArrowLeft size={16}/> Legal AI</Link></div><section className="sectionShell narrowSection"><div className="sectionHeading"><div><span className="eyebrow">IMMIGRATION WORKSPACE</span><h1>Start with the right immigration pathway.</h1><p>USCIS applications, EOIR proceedings, BIA appeals, consular matters, and federal-court issues are modeled as distinct procedural systems inside the same case platform.</p></div></div><div className="securityNote"><ShieldCheck size={16}/> The platform provides immigration self-help and legal-information assistance. It does not claim to be an attorney or accredited representative or appear on the user's behalf.</div><ImmigrationIntakeForm/></section></main>;
}
