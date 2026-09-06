import Link from "next/link";
import { FileText, LockKeyhole, Upload } from "lucide-react";

export default function DocumentsPage() {
  return (
    <main className="sectionPage">
      <div className="sectionTopbar"><Link href="/app" className="brand">Legal Case AI</Link><Link href="/app/cases">Cases</Link></div>
      <section className="sectionShell">
        <div className="sectionHeading"><div><span className="eyebrow">DOCUMENT VAULT</span><h1>Case documents</h1><p>Store pleadings, notices, evidence, correspondence, forms, and supporting records inside the correct case.</p></div></div>
        <div className="emptyState"><div className="emptyIcon"><FileText size={30}/></div><h2>Secure uploads activate with the isolated backend</h2><p>The upload UI will only accept files after private object storage and per-user access policies are live. This prevents accidental storage in a shared or unprotected location.</p><button className="button" disabled><Upload size={17}/> Upload document</button><div className="securityNote"><LockKeyhole size={16}/> Files will be private by default and scoped to the owning case.</div></div>
      </section>
    </main>
  );
}
