import Stripe from "stripe";

export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-02-24.acacia",
      typescript: true,
    })
  : null;

export function requireStripe(): Stripe {
  if (!stripe) {
    throw new Error(
      "STRIPE_SECRET_KEY is not set. Add it to your .env file."
    );
  }
  return stripe;
}

/** Create a Stripe Checkout Session for an APC payment */
export async function createApcCheckoutSession(params: {
  manuscriptId: string;
  amountCents: number;
  currency: string;
  title: string;
  customerEmail: string;
  successUrl: string;
  cancelUrl: string;
}) {
  const s = requireStripe();

  const session = await s.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    customer_email: params.customerEmail,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: params.currency.toLowerCase(),
          unit_amount: params.amountCents,
          product_data: {
            name: `APC – ${params.title}`,
            description: `Article Processing Charge for manuscript ${params.manuscriptId}`,
            metadata: {
              manuscriptId: params.manuscriptId,
              type: "APC",
            },
          },
        },
      },
    ],
    metadata: {
      manuscriptId: params.manuscriptId,
      type: "APC",
    },
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
  });

  return session;
}
