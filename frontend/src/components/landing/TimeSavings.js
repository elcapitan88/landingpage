import React from 'react';
import { Box, Heading, Flex, VStack, Text } from '@chakra-ui/react';

const TimeSavings = () => {
  return (
    <Box w="full" textAlign="center">
      <VStack spacing={3} mb={8}>
        <Heading
          fontSize={{ base: "3xl", md: "4xl" }}
          textAlign="center"
          bgGradient="linear(to-r, primary, secondary)"
          bgClip="text"
        >
          Save 100+ Hours Monthly
        </Heading>
        <Text
          fontSize={{ base: "lg", md: "xl" }}
          color="whiteAlpha.900"
          textAlign="center"
          maxW="2xl"
        >
          Automate your trades and reclaim your valuable time
        </Text>
      </VStack>

      <Flex 
        justify="center" 
        gap={8} 
        direction={{ base: 'column', md: 'row' }}
      >
        <Box 
          bg="whiteAlpha.100" 
          p={6} 
          borderRadius="lg" 
          flex={1}
          maxW="400px"
          border="1px solid"
          borderColor="whiteAlpha.200"
          _hover={{
            bg: "whiteAlpha.200",
            transform: "translateY(-2px)",
            transition: "all 0.2s ease-in-out"
          }}
        >
          <Heading size="md" color="red.400" mb={4}>
            Manual Trading
          </Heading>
          <VStack spacing={3} align="start">
            <Text color="whiteAlpha.900">• 2-3 hours daily monitoring</Text>
            <Text color="whiteAlpha.900">• Delayed executions</Text>
            <Text color="whiteAlpha.900">• Prone to human error</Text>
            <Text color="whiteAlpha.900">• Limited to working hours</Text>
            <Text color="whiteAlpha.900">• Missed trading opportunities</Text>
            <Text color="whiteAlpha.900">• Emotional decision making</Text>
          </VStack>
        </Box>

        <Box 
          bg="whiteAlpha.100" 
          p={6} 
          borderRadius="lg" 
          flex={1}
          maxW="400px"
          border="1px solid"
          borderColor="whiteAlpha.200"
          _hover={{
            bg: "whiteAlpha.200",
            transform: "translateY(-2px)",
            transition: "all 0.2s ease-in-out"
          }}
        >
          <Heading size="md" color="green.400" mb={4}>
            With Atomik
          </Heading>
          <VStack spacing={3} align="start">
            <Text color="whiteAlpha.900">• Set once, runs forever</Text>
            <Text color="whiteAlpha.900">• 50ms execution speed</Text>
            <Text color="whiteAlpha.900">• 100% accurate execution</Text>
            <Text color="whiteAlpha.900">• 24/7 automated trading</Text>
            <Text color="whiteAlpha.900">• Never miss an opportunity</Text>
            <Text color="whiteAlpha.900">• Emotion-free trading</Text>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
};

export default TimeSavings;