import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  VStack,
  Text,
  useToast,
} from '@chakra-ui/react';
import Button from '../common/Button';

const STRIPE_KEY = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;
console.log('Stripe key available:', !!STRIPE_KEY);

const stripePromise = (() => {
  if (!STRIPE_KEY) {
    console.error('Stripe publishable key is missing');
    return null;
  }
  return loadStripe(STRIPE_KEY);
})();

const StripePayment = ({ email = '', onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    console.log('Environment check:', {
      hasStripeKey: !!process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY,
      hasPriceId: !!process.env.REACT_APP_STRIPE_PRICE_ID,
      apiUrl: process.env.REACT_APP_API_URL
    });
  }, []);

  const handlePayment = async () => {
    if (!stripePromise) {
      toast({
        title: 'Error',
        description: 'Payment system is currently unavailable. Please check the console for details.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      setIsLoading(true);
      
      const payload = {
        priceId: process.env.REACT_APP_STRIPE_PRICE_ID
      };

      // Only add email to payload if it exists
      if (email) {
        payload.email = email;
      }

      console.log('Making payment request with:', {
        url: `${process.env.REACT_APP_API_URL}/api/prelaunch/create-checkout-session/`,
        payload
      });

      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/prelaunch/create-checkout-session/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create checkout session');
      }

      const session = await response.json();
      console.log('Received session:', session);

      const stripe = await stripePromise;
      
      const result = await stripe.redirectToCheckout({
        sessionId: session.sessionId,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: 'Payment Error',
        description: error.message || 'An error occurred during payment',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <VStack spacing={4} width="100%">
      <Button
        onClick={handlePayment}
        isLoading={isLoading}
        variant="primary"
        width="100%"
      >
        Get Started TODAY!
      </Button>
      <Text fontSize="xs" color="whiteAlpha.600">
        🔒 Secure payment processed by Stripe
      </Text>
    </VStack>
  );
};

export default StripePayment;