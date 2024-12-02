import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  Text,
  Input,
  HStack,
  Box,
  useToast,
  Badge,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Button from '../common/Button';

const ExitIntentPopup = ({ onSubscribe, onPurchase, remainingSpots }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showEmailSignup, setShowEmailSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const toast = useToast();

  useEffect(() => {
    console.log('Setting up exit intent listener');

    // Separate mouseout and mouseleave detection
    const handleMouseOut = (e) => {
      // Check if the mouse is actually leaving the window
      if (!e.relatedTarget && !e.toElement) {
        console.log('Mouse has left the window entirely');
        handleExit();
      }
    };

    // Handle cursor going above the viewport
    const handleMouseLeave = (e) => {
      if (e.clientY <= 0) {
        console.log('Mouse has gone above viewport');
        handleExit();
      }
    };

    const handleExit = () => {
      if (!hasShown) {
        console.log('Showing exit intent popup');
        setIsOpen(true);
        setHasShown(true);
      }
    };

    // Add both event listeners
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasShown]);

  // For testing purposes - can be removed in production
  const resetExitIntent = () => {
    setHasShown(false);
    setIsOpen(false);
    setShowEmailSignup(false);
    console.log('Exit intent reset');
  };

  const handlePurchase = () => {
    setIsOpen(false);
    onPurchase();
  };

  const handleNotNow = () => {
    setShowEmailSignup(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      if (!email) {
        throw new Error('Email is required');
      }
      
      await onSubscribe(email);
      setIsOpen(false);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        motionPreset="slideInBottom"
        size={showEmailSignup ? "md" : "lg"}
      >
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent
          bg="whiteAlpha.100"
          borderColor="whiteAlpha.200"
          borderWidth={1}
          as={motion.div}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          {!showEmailSignup ? (
            // Lifetime Offer Step
            <>
              <ModalHeader pt={8} px={8}>
                <VStack spacing={2} align="flex-start">
                  <HStack>
                    <Badge colorScheme="red">Last Chance</Badge>
                    <Badge colorScheme="green">85% Off</Badge>
                  </HStack>
                  <Text fontSize="2xl" fontWeight="bold" color="white">
                    Wait! Don't Miss This Lifetime Deal
                  </Text>
                </VStack>
              </ModalHeader>
              <ModalCloseButton />
              
              <ModalBody pb={8} px={8}>
                <VStack spacing={6}>
                  <Text color="whiteAlpha.900" fontSize="lg">
                    This is your last chance to secure lifetime access at our special pre-launch price!
                  </Text>

                  <Box
                    bg="whiteAlpha.100"
                    p={4}
                    borderRadius="lg"
                    width="full"
                  >
                    <VStack spacing={3} align="flex-start">
                      <HStack justify="space-between" width="full">
                        <Text color="white" fontWeight="bold">Pre-Launch Price</Text>
                        <Text color="primary" fontWeight="bold">$299</Text>
                      </HStack>
                      <HStack justify="space-between" width="full">
                        <Text color="whiteAlpha.800">Regular Price</Text>
                        <Text color="whiteAlpha.800" textDecoration="line-through">$1,999/year</Text>
                      </HStack>
                      <Text color="green.400" fontSize="sm" fontWeight="bold">
                        Save $1,700 Today!
                      </Text>
                    </VStack>
                  </Box>

                  <VStack spacing={3} width="full">
                    <Button 
                      variant="primary"
                      width="full"
                      onClick={handlePurchase}
                    >
                      Secure Lifetime Access
                    </Button>
                    <Button
                      variant="ghost"
                      width="full"
                      onClick={handleNotNow}
                    >
                      Not ready? Join our waitlist instead
                    </Button>
                  </VStack>
                </VStack>
              </ModalBody>
            </>
          ) : (
            // Email Signup Step
            <>
              <ModalHeader pt={8} px={8}>
                <Text fontSize="xl" fontWeight="bold" color="white">
                  Stay Updated on Our Launch
                </Text>
              </ModalHeader>
              <ModalCloseButton />
              
              <ModalBody pb={8} px={8}>
                <VStack spacing={6}>
                  <Text color="whiteAlpha.900">
                    Join our pre-launch list to get notified about:
                  </Text>

                  <VStack spacing={2} align="flex-start" width="full">
                    <Text color="whiteAlpha.900" fontSize="sm">✨ Early access opportunities</Text>
                    <Text color="whiteAlpha.900" fontSize="sm">🎁 Exclusive launch bonuses</Text>
                    <Text color="whiteAlpha.900" fontSize="sm">💰 Special pricing offers</Text>
                  </VStack>

                  <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <VStack spacing={4}>
                      <Input
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        bg="whiteAlpha.50"
                        borderColor="whiteAlpha.200"
                        color="white"
                        _placeholder={{ color: 'whiteAlpha.700' }}
                        _hover={{ borderColor: "whiteAlpha.400" }}
                        _focus={{ borderColor: "primary" }}
                        required
                      />
                      <Button 
                        type="submit" 
                        variant="primary" 
                        width="100%"
                        isLoading={isSubmitting}
                      >
                        Join Pre-launch List
                      </Button>
                    </VStack>
                  </form>
                </VStack>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      
    </>
  );
};

export default ExitIntentPopup;