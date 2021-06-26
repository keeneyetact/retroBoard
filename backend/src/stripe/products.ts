import { InternalProduct } from './types';
import { Plan } from '@retrospected/common';
import config from '../config';

export const teamPlan: InternalProduct = {
  name: 'Pro Team',
  plan: 'team',
  productId: config.STRIPE_TEAM_PRODUCT,
  priceId: config.STRIPE_TEAM_PRICE,
  recurring: true,
  seats: 20,
  eur: 995,
  gbp: 895,
  usd: 995,
};

export const companyPlan: InternalProduct = {
  name: 'Pro Unlimited',
  plan: 'unlimited',
  productId: config.STRIPE_UNLIMITED_PRODUCT,
  priceId: config.STRIPE_UNLIMITED_PRICE,
  recurring: true,
  seats: null,
  eur: 4995,
  gbp: 3995,
  usd: 4995,
};

export const selfHostedPlan: InternalProduct = {
  name: 'Self-Hosted',
  plan: 'self-hosted',
  productId: config.STRIPE_SELF_HOSTED_PRODUCT,
  priceId: '',
  recurring: false,
  seats: null,
  eur: 59900,
  gbp: 49900,
  usd: 59900,
  paymentsUrls: {
    eur: config.STRIPE_SELF_HOSTED_URL_EUR,
    gbp: config.STRIPE_SELF_HOSTED_URL_GBP,
    usd: config.STRIPE_SELF_HOSTED_URL_USD,
  },
};

export const plans: InternalProduct[] = [teamPlan, companyPlan, selfHostedPlan];

export function getProduct(plan: Plan): InternalProduct {
  return plans.find((p) => p.plan === plan)!;
}
