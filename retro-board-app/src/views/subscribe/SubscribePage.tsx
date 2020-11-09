import React, { useState, useMemo } from 'react';
import { useStripe } from '@stripe/react-stripe-js';
import { createCheckoutSession } from './api';
import { useCallback } from 'react';
import styled from 'styled-components';
import Step from './components/Step';
import { Button } from '@material-ui/core';
import { Currency, Product, FullUser } from 'retro-board-common';
import CurrencyPicker from './components/CurrencyPicker';
import ProductPicker from './components/ProductPicker';
import Input from '../../components/Input';
import useUser from '../../auth/useUser';
import { Alert } from '@material-ui/lab';
import { useEffect } from 'react';
import useTranslations, { useLanguage } from '../../translations';

function guessDomain(user: FullUser): string {
  if (user.email) {
    const parts = user.email.split('@');
    if (parts.length === 2) {
      return parts[1];
    }
  }
  return DEFAULT_DOMAIN;
}

const DEFAULT_DOMAIN = 'acme.com';

function SubscriberPage() {
  const user = useUser();
  const [currency, setCurrency] = useState<Currency>('eur');
  const [product, setProduct] = useState<Product | null>(null);
  const [domain, setDomain] = useState<string>(DEFAULT_DOMAIN);
  const stripe = useStripe();
  const { SubscribePage: translations } = useTranslations();
  const language = useLanguage();
  const needDomain = product && product.seats === null;

  const validDomain = useMemo(() => {
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-_]{0,61}[a-zA-Z0-9]{0,1}\.([a-zA-Z]{1,6}|[a-zA-Z0-9-]{1,30}\.[a-zA-Z]{2,3})$/g;
    return domainRegex.test(domain);
  }, [domain]);

  const validForm =
    (!needDomain || validDomain) &&
    !!product &&
    user &&
    user.accountType !== 'anonymous';

  useEffect(() => {
    if (user && domain === DEFAULT_DOMAIN) {
      if (user.currency) {
        setCurrency(user.currency);
      }
      setDomain(guessDomain(user));
    }
  }, [user, domain]);

  const handleCheckout = useCallback(async () => {
    if (product) {
      const session = await createCheckoutSession(
        product.plan,
        currency,
        language.stripeLocale,
        !product.seats ? domain : null
      );

      if (session && stripe) {
        await stripe.redirectToCheckout({
          sessionId: session.id,
        });
      }
    }
  }, [stripe, product, currency, domain, language]);

  return (
    <Container>
      {user && user.pro && !user.subscriptionsId ? (
        <Alert severity="info">{translations.alertAlreadyPro}</Alert>
      ) : null}
      {user && user.subscriptionsId ? (
        <Alert severity="info">{translations.alertAlreadySubscribed}</Alert>
      ) : null}
      <Step
        index={1}
        title={translations.currency.title}
        description={translations.currency.description}
      >
        {user && !!user.currency ? (
          <Alert severity="warning" style={{ marginBottom: 10 }}>
            {translations.currency.warning!(currency.toUpperCase())}
          </Alert>
        ) : null}
        <CurrencyPicker
          disabled={(user && !!user.currency) || false}
          value={currency}
          onChange={setCurrency}
        />
      </Step>
      <Step
        index={2}
        title={translations.plan.title}
        description={translations.plan.description}
      >
        <ProductPicker
          value={product}
          currency={currency}
          onChange={setProduct}
        />
      </Step>
      {needDomain ? (
        <Step
          index={3}
          title={translations.domain.title}
          description={translations.domain.description}
        >
          <Input
            value={domain}
            onChangeValue={setDomain}
            error={!validDomain}
            helperText={!validDomain ? translations.domain.invalidDomain : null}
            required
          />
        </Step>
      ) : null}
      <Step
        index={needDomain ? 4 : 3}
        title={translations.subscribe.title}
        description={translations.subscribe.description}
      >
        {!user || user.accountType === 'anonymous' ? (
          <Alert severity="info" style={{ marginBottom: 10 }}>
            {translations.subscribe.cannotRegisterWithAnon}
          </Alert>
        ) : null}
        <Button
          onClick={handleCheckout}
          variant="contained"
          color="primary"
          disabled={!validForm}
        >
          {translations.subscribe.checkout}
        </Button>
      </Step>
    </Container>
  );
}

const Container = styled.div``;

export default SubscriberPage;
