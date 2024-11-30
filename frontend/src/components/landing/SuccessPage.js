// frontend/src/components/landing/SuccessPage.js
import React, { useEffect, useState } from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

const SuccessPage = () => {
  const [status, setStatus] = useState('loading');
  const location = useLocation();

  useEffect(() => {
    const sessionId = new URLSearchParams(location.search).get('session_id');
    if (sessionId) {
      // Verify payment status with backend
      // Update user status to lifetime member
    }
  }, [location]);

  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading>Thank you for your purchase!</Heading>
      <Text mt={4}>
        You now have lifetime access to Atomik Trading. Check your email for next steps.
      </Text>
    </Box>
  );
};