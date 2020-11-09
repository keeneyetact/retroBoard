import { SubscriptionRepository, UserRepository } from '../repositories';
import { Plan, Currency } from 'retro-board-common/src';
import { SubscriptionEntity } from '../entities';
import { Connection } from 'typeorm';

export async function activateSubscription(
  connection: Connection,
  userId: string,
  stripeSubscriptionId: string,
  plan: Plan,
  domain: string | null,
  currency: Currency
): Promise<SubscriptionEntity> {
  const userRepository = connection.getCustomRepository(UserRepository);
  const subscriptionRepository = connection.getCustomRepository(
    SubscriptionRepository
  );
  const user = await userRepository.findOne(userId);
  if (!user) {
    throw Error('Cannot activate subscription on a non existing user');
  }
  const existingSubscription = await subscriptionRepository.activate(
    stripeSubscriptionId,
    user,
    plan,
    domain
  );
  user.currency = currency;
  await userRepository.save(user);
  return existingSubscription;
}

export async function cancelSubscription(
  connection: Connection,
  stripeSubscriptionId: string
): Promise<SubscriptionEntity> {
  const subscriptionRepository = connection.getCustomRepository(
    SubscriptionRepository
  );
  const existingSubscription = await subscriptionRepository.cancel(
    stripeSubscriptionId
  );
  return existingSubscription;
}
