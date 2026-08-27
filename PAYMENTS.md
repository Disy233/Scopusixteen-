# Scopusixteen Payments – APC & Subscriptions

## APC (Article Processing Charge) Flow

1. Manuscript accepted under APC / Open Access route.
2. Author dashboard shows “APC due” with amount, currency, and due date.
3. Author can:
   - Pay immediately via Stripe Checkout (card / supported methods).
   - Request invoice (for institutions).
   - Apply for waiver / discount (low-income country or hardship).
4. On successful payment:
   - Payment record created (status = paid).
   - Licence set (default CC-BY).
   - Production pipeline unlocked / continues.
5. Institutional agreements checked first (auto-apply coverage or discount where possible).

## Subscription Flow

1. Individual: choose journal or package → Stripe Subscription.
2. Institutional: sales / librarian portal → quote → contract → access activation (IP ranges, SAML, or token).
3. Usage tracked for COUNTER reports.
4. Renewals and cancellations managed via Stripe Customer Portal or admin tools.

## Technical Notes

- Use Stripe Products / Prices per journal APC and per subscription tier.
- Webhooks: `checkout.session.completed`, `invoice.paid`, `customer.subscription.*`.
- Store `stripePaymentId` / `stripeSubId` on Payment and Subscription models.
- Support multi-currency display; settle in a primary currency.
- Tax (VAT/GST) via Stripe Tax where applicable.
- Never expose secret keys; use server-side API routes or a dedicated payments service.

## Waiver Policy (example)

- Automatic eligibility for authors corresponding from World Bank low-income countries.
- Case-by-case hardship waivers reviewed by journal / publisher admin.
- Partial discounts via transformative / read-and-publish agreements.

## Demo Status

UI placeholders exist in the author dashboard. Full Stripe integration is the next implementation step after authentication and real manuscript persistence.

## Subscription mode (reader / institution pays)

### Individual
- `POST /api/stripe/subscribe` creates Stripe Checkout in **`mode: "subscription"`** (annual).
- UI: `/subscribe` tab “Individual” + `SubscribeButton` on journal pages.
- Webhook records `Subscription` row and handles `customer.subscription.deleted`.

### Institutional
- `POST /api/subscriptions/institutional` – quote request (no card).
- Emails sales + contact. Supports single journal, package, read-and-publish.

### Access control
- `GET /api/subscriptions/access?journalId=&isOpenAccess=`
- OA articles always allowed; otherwise requires active individual/institutional sub or staff role.

### Author side
- Choosing **Subscription** on hybrid/subscription journals → **no APC** at acceptance.
- Author dashboard shows “No APC (subscription route)” instead of Pay APC.
