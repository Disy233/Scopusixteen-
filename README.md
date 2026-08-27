# Scopusixteen Publishing

Academic publishing with **Subscription** and **APC** modes, article paywall, AI tools, and production scaffolding.

## Run

```bash
npm install
npm run dev
```

Optional real Postgres:
```bash
docker compose up -d
# .env: DATABASE_URL="postgresql://scopusixteen:scopusixteen@localhost:5432/scopusixteen"
npx prisma generate && npx prisma db push && npm run db:seed
```

Health check: `GET /api/health`

## Demo login (password `demo1234`)

author@ · editor@ · reviewer@ · admin@scopusixteen.com

## Try the paywall

- OA full text: `/articles/art-001`, `/articles/art-004`, `/articles/art-007`
- Paywalled (subscription route): `/articles/art-002`, `/articles/art-003`, `/articles/art-005`, `/articles/art-006`
- Subscribe: `/subscribe` or journal pages
- Journals: 8 titles (APC / HYBRID / SUBSCRIPTION)

## Stack

Auth + ORCID · Prisma · Stripe (APC + subscriptions) · S3 presign · Resend · Crossref DOI · OpenAI pre-check · Article paywall
