import React from 'react';
import { Box, Container, VStack, Heading, Text, SimpleGrid, HStack, Icon } from '@chakra-ui/react';
import { Timer, DollarSign, Zap, Trophy, Users, Star } from 'lucide-react';

const FeatureCard = ({ icon, title, description, gradient }) => (
  <Box
    bg="whiteAlpha.100"
    borderRadius="lg"
    p={6}
    position="relative"
    overflow="hidden"
    border="1px solid"
    borderColor="whiteAlpha.200"
    _hover={{
      transform: "translateY(-4px)",
      bg: "whiteAlpha.200",
      transition: "all 0.3s ease"
    }}
  >
    <Box
      position="absolute"
      top={0}
      left={0}
      right={0}
      height="2px"
      bgGradient={gradient}
    />
    <VStack align="flex-start" spacing={4}>
      <Box
        p={2}
        borderRadius="lg"
        bg="whiteAlpha.100"
        color="primary"
      >
        <Icon as={icon} size={24} />
      </Box>
      <Heading size="md" color="white">
        {title}
      </Heading>
      <Text color="whiteAlpha.900">
        {description}
      </Text>
    </VStack>
  </Box>
);

const WhyNowSection = () => {
  const features = [
    {
      icon: DollarSign,
      title: "85% Lifetime Discount",
      description: "Lock in the lowest price ever at $299 instead of $1,999/year. This pre-launch offer will never be repeated.",
      gradient: "linear(to-r, green.400, primary)"
    },
    {
      icon: Timer,
      title: "Limited Time & Spots",
      description: "Only 100 pre-launch spots available. Once they're gone, you'll have to wait for public launch at full price.",
      gradient: "linear(to-r, red.400, orange.400)"
    },
    {
      icon: Zap,
      title: "Priority Access",
      description: "Be among the first to automate your trading. Get early access and exclusive onboarding support.",
      gradient: "linear(to-r, primary, purple.400)"
    },
    {
      icon: Trophy,
      title: "Founding Member Status",
      description: "Join our exclusive founding members group. Get direct access to our development team and influence future features.",
      gradient: "linear(to-r, yellow.400, red.400)"
    },
    {
      icon: Users,
      title: "Premium Support",
      description: "Pre-launch members receive dedicated priority support and personalized automation setup assistance.",
      gradient: "linear(to-r, blue.400, primary)"
    },
    {
      icon: Star,
      title: "Guaranteed Best Price",
      description: "This is the lowest price we'll ever offer. If we ever offer a better deal, we'll refund the difference.",
      gradient: "linear(to-r, primary, green.400)"
    }
  ];

  return (
    <Box py={16} bg="whiteAlpha.50">
      <Container maxW="7xl">
        <VStack spacing={12}>
          <VStack spacing={4} textAlign="center">
            <Text
              color="primary"
              fontWeight="semibold"
              fontSize="sm"
              textTransform="uppercase"
              letterSpacing="wide"
            >
              Limited Time Opportunity
            </Text>
            <Heading
              fontSize={{ base: "3xl", md: "4xl" }}
              bgGradient="linear(to-r, primary, secondary)"
              bgClip="text"
            >
              Why Join During Pre-Launch?
            </Heading>
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color="whiteAlpha.900"
              maxW="2xl"
            >
              Secure your spot in the future of automated trading at our lowest price ever
            </Text>
          </VStack>

          <SimpleGrid 
            columns={{ base: 1, md: 2, lg: 3 }} 
            spacing={8}
            w="full"
          >
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default WhyNowSection;