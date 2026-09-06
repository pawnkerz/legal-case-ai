import Link from "next/link";
import { Scale, ShieldCheck } from "lucide-react";
import { login, signup } from "./actions";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string; message?: string }> }) {
  const params = await searchParams;
  return (
    <main className="authPage">
      <section className="authCard">
        <Link href="/" className="brand"><Scale size={24}/> Legal Case AI</Link>
        <div className="authHeading"><span className="eyebrow">SECURE CASE WORKSPACE</span><h1>Sign in to your legal workspace</h1><p>Your persistent cases, documents, evidence, immigration matters, and paid access are tied to your account.</p></div>
        {params.error && <div className="formAlert errorAlert">{params.error}</div>}
        {params.message && <div className="formAlert successAlert">{params.message}</div>}
        <form className="authForm">
          <label>Email<input name="email" type="email" autoComplete="email" required placeholder="you@example.com" /></label>
          <label>Password<input name="password" type="password" autoComplete="current-password" required minLength={8} placeholder="8+ characters" /></label>
          <button className="button" formAction={login}>Sign in</button>
          <button className="button secondary" formAction={signup}>Create account</button>
        </form>
        <div className="securityNote"><ShieldCheck size={16}/> Legal Case AI is software, not a law firm. Do not assume AI workspace communications are attorney-client privileged.</div>
      </section>
    </main>
  );
}
