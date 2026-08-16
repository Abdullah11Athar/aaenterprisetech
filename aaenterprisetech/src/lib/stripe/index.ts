import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || 'sk_test_mock_key_for_development';

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2024-04-10',
  appInfo: {
    name: 'PayLancer SaaS Platform',
    version: '1.0.0',
  },
});

/**
 * Creates a Stripe Connect Express account for a freelancer.
 */
export async function createStripeExpressAccount(email: string, country: string = 'US') {
  return await stripe.accounts.create({
    type: 'express',
    country,
    email,
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true },
    },
    business_type: 'individual',
  });
}

/**
 * Generates single-use account link for Stripe Express onboarding.
 */
export async function generateAccountOnboardingLink(accountId: string, returnUrl: string, refreshUrl: string) {
  return await stripe.accountLinks.create({
    account: accountId,
    refresh_url: refreshUrl,
    return_url: returnUrl,
    type: 'account_onboarding',
  });
}

/**
 * Creates a Checkout Session with destination charge & platform fee (e.g. 1%).
 */
export async function createInvoiceCheckoutSession({
  invoiceId,
  amount,
  currency,
  connectedAccountId,
  platformFeeRate = 0.01, // 1%
  clientEmail,
  successUrl,
  cancelUrl,
}: {
  invoiceId: string;
  amount: number; // in main currency units (e.g., 100.00 USD)
  currency: string;
  connectedAccountId: string;
  platformFeeRate?: number;
  clientEmail: string;
  successUrl: string;
  cancelUrl: string;
}) {
  const amountInCents = Math.round(amount * 100);
  const applicationFeeAmount = Math.round(amountInCents * platformFeeRate);

  return await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    customer_email: clientEmail,
    line_items: [
      {
        price_data: {
          currency: currency.toLowerCase(),
          product_data: {
            name: `Invoice #${invoiceId}`,
            description: 'International Freelance Services Payment',
          },
          unit_amount: amountInCents,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    payment_intent_data: {
      application_fee_amount: applicationFeeAmount,
      transfer_data: {
        destination: connectedAccountId,
      },
      metadata: {
        invoiceId,
        platformFeeAmount: (applicationFeeAmount / 100).toFixed(2),
      },
    },
    success_url: successUrl,
    cancel_url: cancelUrl,
  });
}
