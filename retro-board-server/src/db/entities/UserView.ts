import { ViewEntity, ViewColumn } from 'typeorm';
import { AccountType, FullUser, Currency, Plan } from '@retrospected/common';

@ViewEntity({
  expression: `
select 
  u.id,
  u.name,
  u."accountType",
  u.username,
  u.currency,
  u."stripeId",
  u.photo,
  u.language,
  u.email,
  u.trial,
  s.id as "ownSubscriptionsId",
  s.plan as "ownPlan",
  coalesce(s.id, s2.id, s3.id) as "subscriptionsId",
  coalesce(s.active, s2.active, s3.active, false) as "pro",
  coalesce(s.plan, s2.plan, s3.plan) as "plan",
  coalesce(s.domain, s2.domain, s3.domain) as "domain"
from users u 

left join subscriptions s on s."ownerId" = u.id and s.active is true
left join subscriptions s2 on u.email = ANY(s2.members) and s2.active is true
left join subscriptions s3 on s3.domain = split_part(u.email, '@', 2) and s3.active is true
  `,
})
export default class UserView {
  @ViewColumn()
  public id: string;
  @ViewColumn()
  public name: string;
  @ViewColumn()
  public accountType: AccountType;
  @ViewColumn()
  public username: string | null;
  @ViewColumn()
  public email: string | null;
  @ViewColumn()
  public stripeId: string | null;
  @ViewColumn()
  public photo: string | null;
  @ViewColumn()
  public language: string;
  @ViewColumn()
  public ownSubscriptionsId: string | null;
  @ViewColumn()
  public ownPlan: Plan | null;
  @ViewColumn()
  public subscriptionsId: string | null;
  @ViewColumn()
  public plan: Plan | null;
  @ViewColumn()
  public domain: string | null;
  @ViewColumn()
  public currency: Currency | null;
  @ViewColumn()
  public pro: boolean;
  @ViewColumn()
  public trial: Date | null;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
    this.language = 'en';
    this.accountType = 'anonymous';
    this.username = null;
    this.photo = null;
    this.stripeId = null;
    this.subscriptionsId = null;
    this.pro = false;
    this.email = null;
    this.currency = null;
    this.ownPlan = null;
    this.ownSubscriptionsId = null;
    this.plan = null;
    this.domain = null;
    this.trial = null;
  }

  toJson(): FullUser {
    return {
      id: this.id,
      name: this.name,
      photo: this.photo,
      email: this.email,
      pro: this.pro,
      subscriptionsId: this.subscriptionsId,
      accountType: this.accountType,
      language: this.language,
      username: this.username,
      stripeId: this.stripeId,
      currency: this.currency,
      plan: this.plan,
      domain: this.domain,
      ownPlan: this.ownPlan,
      ownSubscriptionsId: this.ownSubscriptionsId,
      trial: this.trial,
    };
  }
}
