import React from 'react';
import { Grid, VStack, Heading, Text } from '@chakra-ui/react';
import { Code, Zap, Users, Lock, TrendingUp, CheckCircle } from 'lucide-react';
import FeatureCard from './FeatureCard';

const Features = () => {
  const features = [
    {
      icon: Code,
      title: "Universal Webhook Integration",
      description: "Connect TradingView, TrendSpider, or any platform that supports webhooks. No coding required."
    },
    {
      icon: Zap,
      title: "Lightning-Fast Execution",
      description: "Your signals are processed and executed in milliseconds, ensuring you never miss an opportunity."
    },
    {
      icon: Users,
      title: "Multi-Account Management",
      description: "Manage multiple accounts and execute trades across different brokers simultaneously."
    },
    {
      icon: Lock,
      title: "Bank-Grade Security",
      description: "Your connections are protected with enterprise-grade encryption and security protocols."
    },
    {
      icon: TrendingUp,
      title: "Performance Analytics",
      description: "Track your strategy performance with detailed analytics and real-time monitoring."
    },
    {
      icon: CheckCircle,
      title: "Reliable Automation",
      description: "Set it and forget it. Our system handles millions of signals with 99.99% uptime."
    }
  ];

  return (
    <VStack spacing={12} py={20}>
      <VStack spacing={3}>
        <Heading
          fontSize={{ base: "3xl", md: "4xl" }}
          textAlign="center"
          bgGradient="linear(to-r, primary, secondary)"
          bgClip="text"
        >
          Transform Your Trading Strategy
        </Heading>
        <Text
          fontSize={{ base: "lg", md: "xl" }}
          color="whiteAlpha.900"
          textAlign="center"
          maxW="2xl"
        >
          Everything you need to automate your trading success
        </Text>
      </VStack>

      <Grid
        templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
        gap={8}
      >
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </Grid>
    </VStack>
  );
};

export default Features;