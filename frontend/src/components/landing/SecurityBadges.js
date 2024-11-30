import React from 'react';
import { 
  Box, 
  Container, 
  Flex, 
  VStack, 
  Text, 
  HStack,
  Tooltip,
  useBreakpointValue
} from '@chakra-ui/react';
import { 
  ShieldCheck, 
  Lock, 
  Server, 
  Award,
  KeyRound,
  Clock
} from 'lucide-react';

const SecurityBadge = ({ icon: Icon, title, description }) => (
  <Tooltip
    label={description}
    placement="top"
    hasArrow
    bg="gray.800"
    color="white"
  >
    <VStack
      spacing={2}
      p={4}
      bg="whiteAlpha.100"
      borderRadius="lg"
      border="1px solid"
      borderColor="whiteAlpha.200"
      transition="all 0.2s"
      cursor="pointer"
      _hover={{
        bg: "whiteAlpha.200",
        transform: "translateY(-2px)"
      }}
    >
      <Box
        p={2}
        borderRadius="full"
        bg="whiteAlpha.100"
        color="primary"
      >
        <Icon size={24} />
      </Box>
      <Text 
        fontWeight="medium" 
        color="white"
        textAlign="center"
      >
        {title}
      </Text>
    </VStack>
  </Tooltip>
);

const SecurityBadges = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  const badges = [
    {
      icon: ShieldCheck,
      title: "Bank-Grade Security",
      description: "Enterprise-level encryption and security protocols protect your data and connections"
    },
    {
      icon: Lock,
      title: "Data Protection",
      description: "Your trading data is encrypted and secured using military-grade encryption standards"
    },
    {
      icon: Server,
      title: "99.99% Uptime",
      description: "Our infrastructure ensures reliable automation with near-perfect uptime"
    },
    {
      icon: Award,
      title: "Money-Back Guarantee",
      description: "30-day risk-free guarantee. Not satisfied? Get a full refund, no questions asked"
    },
    {
      icon: KeyRound,
      title: "Secure API Keys",
      description: "Your broker connections are protected with secure API key management"
    },
    {
      icon: Clock,
      title: "24/7 Monitoring",
      description: "Continuous system monitoring and automated threat detection"
    }
  ];

  return (
    <Box py={12} bg="whiteAlpha.50">
      <Container maxW="7xl">
        <VStack spacing={8}>
          <VStack spacing={3} textAlign="center">
            <Text
              color="primary"
              fontWeight="semibold"
              fontSize="sm"
              textTransform="uppercase"
              letterSpacing="wide"
            >
              Enterprise-Grade Security
            </Text>
            <Text
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="bold"
              color="white"
            >
              Your Trading, Protected
            </Text>
            <Text
              fontSize={{ base: "md", md: "lg" }}
              color="whiteAlpha.800"
              maxW="2xl"
            >
              Advanced security measures and protocols safeguard your trading automation
            </Text>
          </VStack>

          <Flex
            wrap="wrap"
            gap={4}
            justify="center"
            w="full"
          >
            {badges.map((badge, index) => (
              <Box
                key={index}
                flex={{ base: '1 1 calc(50% - 8px)', md: '1 1 calc(33.333% - 16px)' }}
                minW={{ base: '150px', md: '200px' }}
              >
                <SecurityBadge {...badge} />
              </Box>
            ))}
          </Flex>

          {/* Additional Trust Elements */}
          <HStack 
            spacing={4} 
            pt={6}
            justify="center"
            flexWrap="wrap"
            opacity={0.8}
          >
            <Text 
              fontSize="sm" 
              color="whiteAlpha.900"
              px={4}
              py={2}
              bg="whiteAlpha.100"
              borderRadius="full"
            >
              🔒 SOC2 Compliant
            </Text>
            <Text 
              fontSize="sm" 
              color="whiteAlpha.900"
              px={4}
              py={2}
              bg="whiteAlpha.100"
              borderRadius="full"
            >
              🛡️ GDPR Ready
            </Text>
            <Text 
              fontSize="sm" 
              color="whiteAlpha.900"
              px={4}
              py={2}
              bg="whiteAlpha.100"
              borderRadius="full"
            >
              🔐 256-bit SSL
            </Text>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
};


export default SecurityBadges;