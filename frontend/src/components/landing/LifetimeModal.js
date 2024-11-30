import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  Box,
  Text,
  List,
  ListItem,
  ListIcon,
  Divider,
} from '@chakra-ui/react';
import { CheckCircle } from 'lucide-react';
import StripePayment from './StripePayment';

const LifetimeModal = ({ isOpen, onClose, email, remainingSpots, onPaymentSuccess }) => {
  const benefits = [
    "Unlimited webhook integrations",
    "Priority support",
    "Early access to new features",
    "No monthly fees, ever",
    "Free upgrades for life",
    "Unlimited accounts & brokers"
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent bg="whiteAlpha.100" borderColor="whiteAlpha.200">
        <ModalHeader>🚀 Exclusive Lifetime Access</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <VStack spacing={6} align="stretch">
            <Box>
              <Text fontSize="4xl" fontWeight="bold" color="primary">$299</Text>
              <Text color="gray.400" textDecoration="line-through">$1,999/year</Text>
              <Text color="text.secondary">One-time payment, lifetime access</Text>
            </Box>

            <Divider borderColor="whiteAlpha.200" />

            <List spacing={3}>
              {benefits.map((benefit, index) => (
                <ListItem key={index} display="flex" alignItems="center">
                  <ListIcon as={CheckCircle} color="green.500" />
                  <Text>{benefit}</Text>
                </ListItem>
              ))}
            </List>

            <Box bg="blackAlpha.300" p={4} borderRadius="md">
              <Text fontSize="sm" color="yellow.200">
                🔥 Only {remainingSpots} lifetime memberships remaining at this price
              </Text>
            </Box>

            <StripePayment 
              email={email} 
              onSuccess={onPaymentSuccess} 
            />
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LifetimeModal;