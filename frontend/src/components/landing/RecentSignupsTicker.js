import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Text, 
  HStack,
  Badge,
  useBreakpointValue
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

const RecentSignupsTicker = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  // Simulated recent signups data
  const signups = [
    {
      name: "Alex",
      location: "New York",
      action: "secured lifetime access",
      timeAgo: "2 minutes ago"
    },
    {
      name: "Maria",
      location: "California",
      action: "joined the waitlist",
      timeAgo: "just now"
    },
    {
      name: "John",
      location: "Texas",
      action: "secured their spot",
      timeAgo: "1 minute ago"
    },
    {
      name: "Justin",
      location: "Toronto",
      action: "purchased lifetime access",
      timeAgo: "3 minutes ago"
    },
    {
      name: "Mike",
      location: "Florida",
      action: "purchased lifetime access",
      timeAgo: "just now"
    }
  ];

  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % signups.length);
      }, 4000);

      return () => clearInterval(timer);
    }
  }, [isPaused, signups.length]);

  const variants = {
    enter: {
      y: 20,
      opacity: 0
    },
    center: {
      y: 0,
      opacity: 1
    },
    exit: {
      y: -20,
      opacity: 0
    }
  };

  const currentSignup = signups[currentIndex];

  return (
    <Box
      position="fixed"
      bottom="4"
      left="4"
      zIndex="999"
      maxW={{ base: "calc(100% - 32px)", md: "400px" }}
    >
      <Box
        bg="rgba(0, 0, 0, 0.8)"
        borderRadius="lg"
        py={2}
        px={4}
        position="relative"
        overflow="hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        border="1px solid"
        borderColor="whiteAlpha.200"
        backdropFilter="blur(8px)"
        boxShadow="lg"
        _hover={{
          bg: "rgba(0, 0, 0, 0.9)",
          borderColor: "whiteAlpha.300"
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.5,
              ease: "easeInOut"
            }}
          >
            <HStack 
              spacing={3} 
              justify="flex-start"
              flexWrap="wrap"
            >
              <Badge 
                colorScheme="green" 
                variant="subtle"
                fontSize="xs"
              >
                New {currentSignup.action.includes('lifetime') ? 'Purchase' : 'Signup'}
              </Badge>
              
              <Text 
                color="whiteAlpha.900" 
                fontSize="sm"
                noOfLines={2}
              >
                {currentSignup.name} from {currentSignup.location} {currentSignup.action}
                <Text as="span" color="whiteAlpha.700" ml={2} fontSize="xs">
                  • {currentSignup.timeAgo}
                </Text>
              </Text>
            </HStack>
          </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default RecentSignupsTicker;