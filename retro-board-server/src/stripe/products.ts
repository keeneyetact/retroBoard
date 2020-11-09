import { InternalProduct } from './types';
import { Plan } from 'retro-board-common';

export const teamPlan: InternalProduct = {
  name: 'Team',
  plan: 'team',
  productId: 'prod_IGlKc0QrEh2tiv',
  priceId: 'price_1HgDnuCpRjtjIslJCUMeS8pF',
  seats: 20,
  eur: 990,
  gbp: 990,
  usd: 1190,
};

export const companyPlan: InternalProduct = {
  name: 'Company',
  plan: 'company',
  productId: 'prod_IHBsQDjbPWHuJp',
  priceId: 'price_1HgdUcCpRjtjIslJuYOnNBXY',
  seats: null,
  eur: 4990,
  gbp: 4990,
  usd: 5990,
};

export const plans: InternalProduct[] = [teamPlan, companyPlan];

export function getProduct(plan: Plan): InternalProduct {
  return plans.find((p) => p.plan === plan)!;
}
