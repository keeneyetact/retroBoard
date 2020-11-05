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
        !product.seats ? domain : null
      );

      if (session && stripe) {
        await stripe.redirectToCheckout({
          sessionId: session.id,
        });
      }
    }
  }, [stripe, product, currency, domain]);

  return (
    <Container>
      {user && user.pro && !user.subscriptionsId ? (
        <Alert severity="info">
          You already are a Pro user, so you might not need another
          subscription.
        </Alert>
      ) : null}
      {user && user.subscriptionsId ? (
        <Alert severity="info">
          You already have a subscription, so you might not need another
          subscription.
        </Alert>
      ) : null}
      <Step
        index={1}
        title="Currency"
        description="Pick a currency you would like to be billed with"
      >
        {user && !!user.currency ? (
          <Alert severity="warning" style={{ marginBottom: 10 }}>
            Your account is already set to use {currency.toUpperCase()}, so you
            cannot change the currency anymore.
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
        title="Plan"
        description="Choose the plan that fits your use case!"
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
          title="Domain"
          description="Your unlimited subscription applies to a given domain."
        >
          <Input
            value={domain}
            onChangeValue={setDomain}
            error={!validDomain}
            helperText={!validDomain ? 'Please provide a valid domain' : null}
            required
          />
        </Step>
      ) : null}
      <Step
        index={needDomain ? 4 : 3}
        title="Checkout"
        description="You will be redirected to our partner, Stripe, for payment"
      >
        {!user || user.accountType === 'anonymous' ? (
          <Alert severity="info" style={{ marginBottom: 10 }}>
            You cannot register with an anonymous account. Please register with
            a Social Media or a Password account before continuing.
          </Alert>
        ) : null}
        <Button
          onClick={handleCheckout}
          variant="contained"
          color="primary"
          disabled={!validForm}
        >
          Checkout
        </Button>
      </Step>
    </Container>
  );
}

const Container = styled.div``;

export default SubscriberPage;
