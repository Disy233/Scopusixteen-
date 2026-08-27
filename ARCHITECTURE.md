# Scopusixteen – Full Architecture & Product Specification

**Site name:** Scopusixteen  
**Vision:** A modern, AI-augmented academic publishing platform combining the rigor of Springer-style journals with transparent dual business models (Subscription + APC/Open Access) and deep AI support throughout the research lifecycle.

## 1. Publishing Modes

### 1.1 Subscription Mode
- Content is paywalled.
- Access via institutional subscriptions, individual subscriptions, or pay-per-view.
- Authors typically transfer copyright or grant exclusive licence; no APC required for standard publication.
- Revenue from libraries, consortia, and individuals.
- Features: IP-based authentication, Shibboleth/SAML, COUNTER usage statistics, perpetual access options.

### 1.2 APC Mode (Gold Open Access)
- Article is immediately free to read under a Creative Commons licence (default CC-BY).
- Author (or funder/institution) pays an Article Processing Charge upon acceptance.
- Transparent pricing per journal / article type.
- Support for institutional agreements, transformative deals, waivers (low-income countries, hardship), and membership discounts.
- Payment via Stripe (card) + invoice option.

### 1.3 Hybrid Journals
- Most journals support both routes.
- Author chooses (or funder requires) OA at acceptance.
- Clear labelling on journal and article pages.

## 2. Core User Roles

| Role              | Key Capabilities |
|-------------------|------------------|
| Reader / Public   | Search, browse, read OA content, subscribe, pay-per-view |
| Author            | Submit, track, revise, pay APC, manage profile + ORCID |
| Reviewer          | Accept/decline invitations, submit reviews, AI-assisted review tools |
| Handling Editor   | Manage assigned manuscripts, invite reviewers, make recommendations |
| Editor-in-Chief   | Oversee journal, final decisions, scope & policy |
| Journal Admin     | Configure journal (APCs, prices, review model, scope) |
| Publisher Admin   | Multi-journal management, finances, compliance, users |
| Librarian         | Manage institutional subscriptions, usage reports |

## 3. Key Feature Modules

### 3.1 Discovery & Content Delivery
- Full-text + metadata search (keyword + semantic)
- Journal & article landing pages
- Metrics (citations, downloads, views, Altmetric-style)
- AI recommendations (“Related articles / authors / topics”)
- Alerts, saved searches, personal library
- HTML + PDF + XML (JATS) delivery
- Accessibility (WCAG 2.2 AA target)

### 3.2 Submission & Peer Review Workflow
- Multi-step submission form (files, metadata, cover letter, suggested reviewers)
- AI pre-checks: language quality, structure, reference completeness, similarity/plagiarism signals, image integrity flags
- Editorial triage dashboard
- Automated + manual reviewer matching (semantic embeddings + expertise graph)
- Review forms (structured + free text)
- Decision letters, revision cycles, version control
- Double-blind / single-blind / open peer review options

### 3.3 Production Pipeline
- Copy-editing / typesetting hand-off
- Proof generation & author proofing
- DOI registration (Crossref)
- Final Version of Record publication
- Correction / retraction / expression-of-concern workflows

### 3.4 AI Support Layer
- Pre-submission coaching & quality scoring
- Reviewer finding & ranking
- Desk-reject triage signals
- Language polishing suggestions
- Citation & reference checking
- Plain-language summaries & visual abstract drafts
- Integrity suite (plagiarism, paper-mill patterns, image manipulation)
- Conversational assistant for status queries and guidance

### 3.5 Payments & Subscriptions
- APC checkout + invoice generation
- Waiver / discount request workflow
- Institutional subscription management
- Individual subscriptions & renewals
- Revenue dashboards (APC vs Subscription split)
- Tax handling (VAT/GST where applicable)

### 3.6 Admin & Compliance
- Journal configuration UI
- Editorial performance analytics
- Financial reporting
- Plan S / funder mandate compliance helpers
- Data availability & ethics statement capture
- Audit logs

## 4. Technical Architecture

### 4.1 High-Level Diagram (Text)

```
┌─────────────────────────────────────────────────────────────┐
│                     Clients (Web / Mobile)                  │
│              Next.js App Router + React 19                  │
└───────────────────────────┬─────────────────────────────────┘
                            │ HTTPS / API
┌───────────────────────────▼─────────────────────────────────┐
│                     API Gateway / BFF                       │
│              NestJS (or FastAPI) + Auth Middleware          │
└───────┬──────────────┬──────────────┬──────────────┬────────┘
        │              │              │              │
   ┌────▼────┐   ┌─────▼─────┐  ┌─────▼─────┐  ┌─────▼─────┐
   │ Auth &  │   │ Workflow  │  │ Content & │  │ Payments  │
   │ Roles   │   │ Engine    │  │ Search    │  │ & Billing │
   └────┬────┘   └─────┬─────┘  └─────┬─────┘  └─────┬─────┘
        │              │              │              │
   ┌────▼──────────────▼──────────────▼──────────────▼────┐
   │              PostgreSQL (primary) + Redis             │
   │         + Object Storage (S3 / R2 / MinIO)            │
   │         + Search (Meilisearch / OpenSearch)           │
   │         + Vector DB (pgvector or Pinecone)            │
   └───────────────────────────────────────────────────────┘
                            │
               ┌────────────▼────────────┐
               │   AI Orchestration      │
               │  (LangChain / Vercel AI │
               │   + LLMs + embeddings)  │
               └─────────────────────────┘
```

### 4.2 Recommended Stack

- **Frontend:** Next.js 15/16 (App Router), TypeScript, Tailwind CSS 4, shadcn/ui, Framer Motion
- **Backend:** NestJS (preferred for modularity) or FastAPI
- **Database:** PostgreSQL + Prisma / Drizzle
- **Auth:** Better Auth or Clerk + ORCID OAuth 2.0
- **Search:** Meilisearch (fast, typo-tolerant) or OpenSearch
- **Files:** Cloudflare R2 / AWS S3 / MinIO
- **Payments:** Stripe (APC + subscriptions) + optional invoice system
- **AI:** Vercel AI SDK / LangChain + OpenAI / Anthropic / open-weight models; pgvector or dedicated vector store
- **Jobs:** BullMQ or Inngest / Temporal
- **Email:** Resend / Postmark / Amazon SES
- **Hosting:** Vercel (frontend) + Railway / Fly.io / Render / Kubernetes for backend services
- **Monitoring:** Sentry, PostHog / Plausible, OpenTelemetry

### 4.3 Data Model (High-Level Entities)

- User (with roles, ORCID, affiliation)
- Journal (scope, APCs, subscription prices, review model, hybrid flag)
- Manuscript / Submission (versions, status, files, metadata)
- Review (invitation, report, recommendation)
- Decision / Editorial Note
- Article (published Version of Record, DOI, licence, metrics)
- Subscription (institutional / individual)
- Invoice / Payment (APC or subscription)
- Institution / Agreement
- AI Job / Analysis Result

(See `docs/SCHEMA.md` for detailed Prisma-style schema.)

## 5. Security & Compliance

- Role-based access control (RBAC) + attribute-based where needed
- GDPR / CCPA ready (data export, deletion, consent)
- Secure file handling (virus scan, signed URLs)
- Audit logging of editorial & financial actions
- Research integrity policies published and enforced
- Regular penetration testing & dependency scanning

## 6. Phased Roadmap

**Phase 0 – Foundation (2–3 weeks)**  
Branding, auth, basic journal listing, landing page, user profiles.

**Phase 1 – Submission & Editorial MVP (4–6 weeks)**  
Manuscript upload, simple workflow, editor/reviewer dashboards, basic decisions.

**Phase 2 – Dual Modes & Payments (3–4 weeks)**  
APC checkout, subscription management, hybrid flags, waivers.

**Phase 3 – AI Layer (3–5 weeks)**  
Pre-checks, reviewer matching, language tools, chatbot.

**Phase 4 – Production & Discovery (ongoing)**  
Full production pipeline, advanced search, metrics, DOI, indexing readiness.

**Phase 5 – Scale & Polish**  
Multi-journal publisher console, analytics, institutional SSO, mobile experience, open-source components if desired.

## 7. Success Metrics

- Time-to-first-decision
- Reviewer acceptance rate
- Author satisfaction (NPS)
- % of articles published OA vs Subscription
- APC collection rate & waiver volume
- Search-to-read conversion
- AI feature usage & impact on quality/speed

---

This document is the single source of truth for Scopusixteen. Update it as decisions solidify.
