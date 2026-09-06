# Legal Case AI — Production Roadmap

## Phase 1 — Foundation
- Next.js App Router, TypeScript, responsive shell
- Supabase Auth, RLS-first database, encrypted/private document storage
- Five-interaction trial and single $59/month entitlement model
- Compliance classification layer and immutable audit events
- Case/domain/jurisdiction data model

## Phase 2 — Legal Intelligence
- Canonical legal source registry
- Federal + 50-state source adapters
- Official API/bulk/feed first; structured crawl only when needed
- Content hashing, effective dates, supersession, source versioning
- Hybrid legal retrieval, authority ranking, citation verification
- Separate historical-law corpus from current controlling law

## Phase 3 — Case AI
- Guided case intake and jurisdiction resolution
- Fact extraction, chronology, evidence graph, issue spotting
- Document ingestion/OCR pipeline and case-scoped retrieval
- Deadline and missing-information detection
- Next-action workflow without representing the software as counsel

## Phase 4 — Immigration
- USCIS + EOIR + DOJ + DOS + Title 8 source adapters
- Receipt/A-number handling with sensitive-field controls
- RFE/NOID, adjustment, family, naturalization, asylum, EOIR workflows
- Current-form-edition, filing-location, fee, and instruction validation
- Immigration court/BIA preparation workflow

## Phase 5 — Drafting + Court Preparation
- Draft workspace with source/fact provenance
- Exhibits, declarations, letters, discovery assistance, form preparation
- Mock hearings and courtroom preparation
- Live-assist capability kept behind jurisdiction/court-policy controls

## Phase 6 — Commercialization + Hardening
- Stripe $59/month subscription
- Trial conversion and saved-work unlock
- Security review, rate limits, abuse prevention, observability
- Data retention/export/deletion controls
- CI, unit, integration, E2E, accessibility and mobile regression suites
- Vercel production deployment
