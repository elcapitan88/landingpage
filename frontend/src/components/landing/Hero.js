import React from 'react';
import { Box, VStack, Badge, Image, Heading, Text, HStack } from '@chakra-ui/react';
import Button from '../common/Button';
import SocialProof from './SocialProof';

const Hero = ({ onOpen, remainingSpots }) => {
  return (
    <Box as="main" py={12} position="relative">
      {/* Background Image */}
      <Box
        position="absolute"
        top="40%"
        left="50%"
        transform="translate(-50%, -50%)"
        width="100%"
        height="auto"
        zIndex={1}
        opacity={0.6}
        marginTop="100px"
      >
        <Image
          src="/images/AtomikTradinglandinghero.png"
          alt="Platform Preview"
          width="100%"
          height="auto"
          objectFit="contain"
        />
      </Box>

      {/* Content */}
      <VStack 
        spacing={0}
        align="center" 
        maxW="3xl" 
        mx="auto" 
        textAlign="center"
        position="relative"
        zIndex={2}
      >
        <HStack spacing={2}>
          <Badge 
            colorScheme="red" 
            px={3} 
            py={1} 
            borderRadius="full"
            mb={3}
          >
            Only {remainingSpots} Spots Left!
          </Badge>
        </HStack>

        <Image 
          src="/logo/AtomikLogo.png"
          alt="Atomik"
          height="140px"
          objectFit="contain"
          mb={2}
        />

        <Box
          position="relative"
          padding="8"
          borderRadius="xl"
          background="rgba(0, 0, 0, 0.4)"
          backdropFilter="blur(1px)"
        >
          <Heading
            as="h1"
            fontSize={{ base: "4xl", md: "6xl" }}
            fontWeight="extrabold"
            lineHeight="shorter"
            mb={6}
          >
            Your Trading Signals,{" "}
            <Text as="span" bgGradient="linear(to-r, primary, secondary)" bgClip="text">
              Automated
            </Text>
          </Heading>
          
          <Text fontSize="xl" color="text.secondary" mb={8}>
            Transform your trading strategies into automated execution. Connect any webhook-enabled platform to your favorite brokers.
          </Text>

          {/* CTA Section */}
          <VStack spacing={4} mb={8}>
            {/* Spots Counter */}
            <HStack 
              spacing={2} 
              bg="blackAlpha.500" 
              p={2} 
              borderRadius="md"
              border="1px solid"
              borderColor="red.500"
            >
              <Text color="red.300">🔥</Text>
              <Text color="red.300" fontSize="sm" fontWeight="semibold">
                Only {remainingSpots} spots remaining at this price!
              </Text>
            </HStack>

            <HStack spacing={2}>
              <Badge colorScheme="red" px={2} py={1}>ONE-TIME Pre-Launch OFFER</Badge>
              <Text color="yellow.200" fontWeight="semibold">
                Save $1,700 Today!
              </Text>
            </HStack>
            
            <Button
              variant="primary"
              width={{ base: "full", md: "75%" }}
              onClick={onOpen}
              isDisabled={remainingSpots === 0}
            >
              {remainingSpots === 0 
                ? "Sold Out!"
                : "Get Lifetime Access - $299"}
            </Button>
            
            <Text fontSize="sm" color="whiteAlpha.800">
              🔒 Risk-free 30-day money-back guarantee
            </Text>
          </VStack>
        </Box>

        <SocialProof />
      </VStack>
    </Box>
  );
};

export default Hero;