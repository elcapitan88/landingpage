import React, { useState, useEffect } from 'react';
import { 
  ChakraProvider, 
  Container, 
  Box, 
  useToast, 
  VStack, 
  Heading, 
  Text, 
  HStack, 
  Badge 
} from '@chakra-ui/react';
import theme from './theme';
import Button from './components/common/Button';

// Component imports
import Hero from './components/landing/Hero';
import HowItWorks from './components/landing/HowItWorks';
import TimeSavings from './components/landing/TimeSavings';
import Features from './components/landing/Features';
import LifetimeModal from './components/landing/LifetimeModal';
import StickyHeader from './components/landing/StickyHeader';
import RecentSignupsTicker from './components/landing/RecentSignupsTicker';
import SecurityBadges from './components/landing/SecurityBadges';
import WhyNowSection from './components/landing/WhyNow';
import ExitIntentPopup from './components/landing/ExitIntent';
import FAQ from './components/landing/FAQ';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
const INITIAL_SPOTS = parseInt(process.env.REACT_APP_INITIAL_SPOTS || '100');

const App = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [remainingSpots, setRemainingSpots] = useState(INITIAL_SPOTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toast = useToast();

  const fetchRemainingSpots = async () => {
    try {
      const response = await fetch(`${API_URL}/api/prelaunch/remaining-spots/`);
      if (!response.ok) {
        throw new Error('Failed to fetch remaining spots');
      }
      const data = await response.json();
      setRemainingSpots(data.remaining_spots);
    } catch (error) {
      console.error('Error fetching remaining spots:', error);
    }
  };

  useEffect(() => {
    fetchRemainingSpots();
    const interval = setInterval(fetchRemainingSpots, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleEarlyAccess = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    setIsSubmitting(true);
    
    try {
      if (!email) {
        throw new Error('Email is required');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Please enter a valid email address');
      }

      const response = await fetch(`${API_URL}/api/prelaunch/subscribe/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to subscribe');
      }

      const data = await response.json();
      
      toast({
        title: "Success!",
        description: data.message || "You're on the list! Watch your inbox for exclusive updates.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      
      setEmail("");
      setIsModalOpen(false);

    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Error",
        description: error.message || "Unable to join waitlist. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentSuccess = async (orderId) => {
    try {
      console.log('Processing payment success:', orderId);
      
      const response = await fetch(`${API_URL}/api/prelaunch/verify-payment/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          email,
        }),
      });

      if (!response.ok) {
        throw new Error('Payment verification failed');
      }

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Payment Successful!",
          description: "Welcome to Atomik Trading! Check your email for next steps.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setIsModalOpen(false);
        fetchRemainingSpots();
      } else {
        throw new Error(data.error || 'Payment verification failed');
      }
    } catch (error) {
      console.error('Payment verification error:', error);
      toast({
        title: "Error",
        description: "There was a problem verifying your payment. Please contact support.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Box minH="100vh" bg="background">
        <StickyHeader 
          remainingSpots={remainingSpots} 
          onOpen={() => setIsModalOpen(true)} 
        />

        <Container maxW="7xl" pt={4}>
          <Hero
            onOpen={() => setIsModalOpen(true)}
            remainingSpots={remainingSpots}
          />

          <HowItWorks />
          <TimeSavings />
          <SecurityBadges />
          <Features />
          <WhyNowSection />
          <FAQ />

          <VStack spacing={6} py={20} textAlign="center">
            <HStack spacing={2}>
              <Badge colorScheme="red" px={2} py={1}>
                ONLY {remainingSpots} SPOTS LEFT
              </Badge>
              <Text color="yellow.200" fontWeight="semibold">
                Save $1,700 Today!
              </Text>
            </HStack>

            <Heading
              fontSize={{ base: "3xl", md: "4xl" }}
              bgGradient="linear(to-r, primary, secondary)"
              bgClip="text"
            >
              Ready to Automate Your Trading?
            </Heading>
            
            <Text fontSize="lg" color="whiteAlpha.900" maxW="2xl">
              Join the revolution in automated trading. Don't miss out on this one-time lifetime access offer.
            </Text>

            {remainingSpots <= 10 && (
              <Text color="red.300" fontSize="sm" fontWeight="bold">
                ⚠️ Almost sold out! Only {remainingSpots} spots remaining at this price
              </Text>
            )}

            <Button
              variant="primary"
              width={{ base: "full", md: "50%" }}
              onClick={() => setIsModalOpen(true)}
              isDisabled={remainingSpots === 0}
            >
              Get Started Now - $299
            </Button>
            
            <Text fontSize="sm" color="whiteAlpha.800">
              🔒 30-day money-back guarantee • Limited time offer
            </Text>
          </VStack>
        </Container>

        <LifetimeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          email={email}
          setEmail={setEmail}
          isSubmitting={isSubmitting}
          remainingSpots={remainingSpots}
          onPaymentSuccess={handlePaymentSuccess}
        />

        <ExitIntentPopup 
          onSubscribe={handleEarlyAccess}
          onPurchase={() => setIsModalOpen(true)}
          remainingSpots={remainingSpots}
        />

        <RecentSignupsTicker />
      </Box>
    </ChakraProvider>
  );
};

export default App;