import { Plan, Currency } from './types';

export interface RegisterPayload {
  name: string;
  username: string;
  password: string;
  language: string;
}

export interface ValidateEmailPayload {
  email: string;
  code: string;
}

export interface ResetPasswordPayload {
  email: string;
}

export interface ResetChangePasswordPayload {
  email: string;
  password: string;
  code: string;
}

export interface CreateCustomerPayload {
  email: string;
}

export interface CreateSubscriptionPayload {
  plan: Plan;
  currency: Currency;
  domain: string | null;
}
