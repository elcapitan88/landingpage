import React from 'react';
import { Card, CardBody, VStack, Heading, Text } from '@chakra-ui/react';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <Card bg="whiteAlpha.100" borderColor="whiteAlpha.200" variant="outline">
    <CardBody>
      <VStack spacing={3} align="flex-start">
        <Icon size={24} color="white" />
        <Heading size="md" color="primary">{title}</Heading>
        <Text color="text.secondary">{description}</Text>
      </VStack>
    </CardBody>
  </Card>
);

export default FeatureCard;