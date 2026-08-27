import { requireStripe } from "./stripe";
import type Stripe from "stripe";

/**
 * Subscription mode = reader/institution pays.
 * Authors on the subscription route do NOT pay an APC.
 * Access to non-OA articles requires an active individual or institutional subscription.
 */

export type AccessReason =
  | "open_access"
  | "individual_subscription"
  | "institutional_subscription"
  | "staff"
  | "denied";

export interface AccessResult {
  allowed: boolean;
  reason: AccessReason;
  message?: string;
}

/** Create a Stripe Checkout Session in subscription mode for an individual */
export async function createIndividualSubscriptionCheckout(params: {
  journalId: string;
  journalTitle: string;
  priceCents: number;
  currency: string;
  customerEmail: string;
  userId: string;
  successUrl: string;
  cancelUrl: string;
  /** Existing Stripe Price ID if you created products in Dashboard */
  stripePriceId?: string;
}): Promise<Stripe.Checkout.Session> {
  const s = requireStripe();

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
    params.stripePriceId
      ? [{ price: params.stripePriceId, quantity: 1 }]
      : [
          {
            quantity: 1,
            price_data: {
              currency: params.currency.toLowerCase(),
              unit_amount: params.priceCents,
              recurring: { interval: "year" },
              product_data: {
                name: `Subscription – ${params.journalTitle}`,
                description: `Annual individual subscription to ${params.journalTitle}`,
                metadata: {
                  journalId: params.journalId,
                  type: "INDIVIDUAL_SUBSCRIPTION",
                },
              },
            },
          },
        ];

  return s.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    customer_email: params.customerEmail,
    client_reference_id: params.userId,
    line_items: lineItems,
    metadata: {
      journalId: params.journalId,
      userId: params.userId,
      type: "INDIVIDUAL_SUBSCRIPTION",
    },
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
  });
}

/** Demo access check used when DB is offline */
export function demoAccessCheck(opts: {
  isOpenAccess: boolean;
  hasIndividualSub?: boolean;
  hasInstitutionalSub?: boolean;
  isStaff?: boolean;
}): AccessResult {
  if (opts.isOpenAccess) {
    return { allowed: true, reason: "open_access" };
  }
  if (opts.isStaff) {
    return { allowed: true, reason: "staff" };
  }
  if (opts.hasIndividualSub) {
    return { allowed: true, reason: "individual_subscription" };
  }
  if (opts.hasInstitutionalSub) {
    return { allowed: true, reason: "institutional_subscription" };
  }
  return {
    allowed: false,
    reason: "denied",
    message:
      "This article is available via institutional or individual subscription. Choose Subscribe or request institutional access.",
  };
}
