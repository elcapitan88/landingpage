import React from 'react';
import { Box, Flex, Text, Input } from '@chakra-ui/react';
import Button from '../common/Button';

const EmailSignup = ({ email, setEmail, isSubmitting, handleEarlyAccess }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleEarlyAccess(e);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Flex gap={2} maxW="md" mx="auto">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            bg="whiteAlpha.50"
            borderColor="whiteAlpha.200"
            color="whiteAlpha.900"
            _placeholder={{ color: 'whiteAlpha.700' }}
            _hover={{ borderColor: "whiteAlpha.300" }}
            _focus={{ borderColor: "primary", boxShadow: "0 0 0 1px var(--chakra-colors-primary)" }}
            height="40px"
            required
          />
          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
            height="40px"
            fontSize="sm"
            px={4}
          >
            Join Waitlist
          </Button>
        </Flex>
      </form>
      <Text mt={2} fontSize="sm" color="whiteAlpha.900">
        Not ready to commit? Join the waitlist for free
      </Text>
    </Box>
  );
};

export default EmailSignup;