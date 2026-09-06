# Legal Case AI

Production foundation for a jurisdiction-aware legal research, case-preparation, and self-help SaaS.

## Business model
- 5 trial interactions
- $59/month single paid plan
- No permanent free tier

## Core product constraints
- Never represents itself as a lawyer, law firm, counsel, or authorized representative.
- Legal propositions must be grounded in retrieved authority and citation verification.
- Current controlling law is kept separate from historical/superseded law.
- Representation-required functions are gated to licensed/authorized professionals where applicable.
- Immigration is a first-class legal domain.

## Stack
Next.js 16 / React 19 / TypeScript / Supabase / Vercel.

See `docs/ROADMAP.md` for phased delivery and `supabase/migrations/0001_foundation.sql` for the RLS-first initial schema.
