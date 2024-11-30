import React from 'react';
import { Box, Container, VStack, Heading, Text, Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const HowItWorks = () => {
  const steps = [
    {
      title: "Connect Your Platform",
      description: "Link TradingView or any other platform using our simple webhook integration",
      icon: "🔌",
      color: "primary"
    },
    {
      title: "Set Up Auto-Execution",
      description: "Configure your execution parameters once, then let automation handle the rest",
      icon: "⚡",
      color: "secondary"
    },
    {
      title: "Trade Automatically",
      description: "Your signals are executed in milliseconds, 24/7, without manual intervention",
      icon: "🚀",
      color: "primary"
    }
  ];

  return (
    <Box py={16} bg="whiteAlpha.50">
      <Container maxW="6xl">
        <VStack spacing={12}>
          <VStack spacing={3}>
            <Heading
              fontSize={{ base: "3xl", md: "4xl" }}
              textAlign="center"
              bgGradient="linear(to-r, primary, secondary)"
              bgClip="text"
            >
              How It Works
            </Heading>
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color="whiteAlpha.900"
              textAlign="center"
              maxW="2xl"
            >
              Three simple steps to automated trading success
            </Text>
          </VStack>

          <Flex 
            gap={8} 
            w="full" 
            justify="center" 
            direction={{ base: 'column', md: 'row' }}
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                style={{ width: '100%', maxWidth: '300px' }}
              >
                <VStack
                  bg="whiteAlpha.100"
                  p={6}
                  borderRadius="lg"
                  spacing={4}
                  h="full"
                  position="relative"
                  overflow="hidden"
                  _before={{
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    bg: step.color,
                    opacity: 0.7
                  }}
                >
                  <Text fontSize="3xl">{step.icon}</Text>
                  <Heading size="md" color="white">
                    {step.title}
                  </Heading>
                  <Text color="whiteAlpha.800" textAlign="center">
                    {step.description}
                  </Text>
                  
                  {index < steps.length - 1 && (
                    <Box
                      display={{ base: 'none', md: 'block' }}
                      position="absolute"
                      right="-40px"
                      top="50%"
                      transform="translateY(-50%)"
                      color="whiteAlpha.400"
                      fontSize="24px"
                    >
                      →
                    </Box>
                  )}
                </VStack>
              </motion.div>
            ))}
          </Flex>
        </VStack>
      </Container>
    </Box>
  );
};

export default HowItWorks;