import React from 'react';
import { HStack, VStack, Text, Container, Heading } from '@chakra-ui/react';

const SocialProof = () => {
  const stats = [
    {
      value: "10+",
      label: "Years Trading Experience"
    },
    {
      value: "<50ms",
      label: "Execution Speed"
    },
    {
      value: "99.99%",
      label: "Uptime SLA"
    }
  ];

  return (
    <VStack spacing={8} py={12}>
      <VStack spacing={3}>
        <Heading
          fontSize={{ base: "3xl", md: "4xl" }}
          textAlign="center"
          bgGradient="linear(to-r, primary, secondary)"
          bgClip="text"
        >
          Built By Traders, For Traders
        </Heading>
        <Text
          fontSize={{ base: "lg", md: "xl" }}
          color="whiteAlpha.900"
          textAlign="center"
          maxW="2xl"
        >
          Enterprise-grade performance meets seamless automation
        </Text>
      </VStack>

      <Container maxW="full">
        <HStack 
          spacing={{ base: 4, md: 12, lg: 16 }} 
          justify="center"
          px={{ base: 4, md: 8, lg: 12 }}
          py={4}
          bg="whiteAlpha.100"
          borderRadius="xl"
          borderWidth="1px"
          borderColor="whiteAlpha.200"
          backdropFilter="blur(8px)"
          mx="auto"
          flexWrap={{ base: "wrap", md: "nowrap" }}
        >
          {stats.map((stat, index) => (
            <VStack 
              key={index} 
              flex={{ base: '1 1 auto', md: '1' }}
              minW={{ base: '120px', md: 'auto' }}
              spacing={1}
            >
              <Text 
                fontSize={{ base: "2xl", md: "4xl", lg: "5xl" }} 
                fontWeight="bold" 
                color="primary"
                lineHeight="1"
              >
                {stat.value}
              </Text>
              <Text 
                fontSize={{ base: "sm", md: "md" }} 
                textAlign="center" 
                color="whiteAlpha.900" 
                lineHeight="1.2"
              >
                {stat.label}
              </Text>
            </VStack>
          ))}
        </HStack>
      </Container>
    </VStack>
  );
};

export default SocialProof;