import Stripe from 'stripe';

function getStripeClient() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key, { apiVersion: '2024-12-18.acacia' as Stripe.LatestApiVersion });
}

export const stripe = getStripeClient();

export const isStripeConfigured = !!process.env.STRIPE_SECRET_KEY;
