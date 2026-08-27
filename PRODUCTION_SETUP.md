# Production Setup – Complete Stack

## Install & env

```bash
npm install
cp .env.example .env
# Fill AUTH_SECRET, DATABASE_URL, STRIPE_*, ORCID_*, S3_*, RESEND_API_KEY,
# CROSSREF_*, OPENAI_API_KEY as needed
```

Optional for real S3 presigning:
```bash
npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
```
Then implement `getSignedUrl` inside `src/lib/storage.ts` (comments included).

## Services map

| Concern | Module / Route | Env |
|---------|----------------|-----|
| Auth JWT | `src/lib/auth.ts`, middleware | `AUTH_SECRET` |
| ORCID | `/api/auth/orcid*` | `ORCID_CLIENT_*` |
| DB | Prisma | `DATABASE_URL` |
| APC pay | `/api/stripe/*`, PayApcButton | `STRIPE_*` |
| Uploads | `/api/upload/presign`, `lib/storage` | `S3_*` |
| Email | `lib/email`, notifications | `RESEND_API_KEY` |
| DOI | `lib/doi`, `/api/doi/register` | `CROSSREF_*`, `DOI_PREFIX` |
| AI | `/api/ai/precheck` | `OPENAI_API_KEY` |

## Database

```bash
npx prisma generate && npx prisma db push
npm run db:seed
```

## Demo accounts

Password `demo1234`: author@, editor@, reviewer@, admin@scopusixteen.com

## Test flows

1. Login as author → submit manuscript → email logged/sent  
2. Author dashboard → Pay APC (Stripe or demo URL)  
3. Editor → Register DOI (calls deposit when Crossref configured)  
4. `POST /api/notifications/test` – test email  
5. AI pre-check with/without OpenAI key  

## Feature matrix

- Homepage (design match) ✓  
- Subscription + APC modes ✓  
- Auth + middleware + ORCID ✓  
- Prisma + seed ✓  
- Manuscripts API + email on submit ✓  
- Stripe checkout + webhook + payment email ✓  
- Upload presign ✓  
- DOI registration API ✓  
- AI heuristic + OpenAI ✓  
- Role dashboards + Pay APC + logout ✓  

## Editorial decisions

- `POST /api/decisions` – accept / minor / major / reject / transfer
- Editor UI: **Record decision** on `/dashboard/editor`
- Emails author via `decisionEmail` template

## Production pipeline

- `GET /api/production/[manuscriptId]` – stage timeline
- Author dashboard shows chips for accepted manuscripts

## Institutional IP

- `INSTITUTIONAL_IP_RANGES` JSON in `.env`
- Dev default includes `127.0.0.1` → local may auto-unlock paywall
- Used by article pages and `/api/subscriptions/access`

## Peer review

- `POST /api/reviews/invite` – editor invites by email
- `POST /api/reviews/submit` – reviewer recommendation + comments
- UI: Invite reviewers (editor), Submit review (reviewer)

## Revisions

- `POST /api/revisions` – author response letter + optional file key
- UI: Upload revision on author dashboard when status is REVISION_REQUESTED

## COUNTER usage

- `GET /api/counter` – platform totals by journal (demo metrics)
- Librarian dashboard loads live report when signed in
