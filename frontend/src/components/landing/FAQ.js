import React from 'react';
import { Box, VStack, Heading, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react';

const FAQ = () => {
  const faqs = [
    {
      question: "What makes this pre-launch offer special?",
      answer: "This is a one-time opportunity to secure lifetime access at 85% off the regular price. Once we launch, the price will increase to $1,999/year. Only 100 traders will get access to this exclusive pre-launch offer."
    },
    {
      question: "How fast can I start automating my trades?",
      answer: "Setup takes less than 5 minutes. Simply connect your favorite platform via webhook, configure your execution parameters, and you're ready to automate your trading strategy."
    },
    {
      question: "What trading platforms do you support?",
      answer: "We support any platform that can send webhook signals, including TradingView, TrendSpider, and custom solutions. Our universal webhook integration makes it compatible with most trading platforms."
    },
    {
      question: "Is my money safe? What about my trading data?",
      answer: "We implement bank-grade security protocols and never store your sensitive trading data. All connections are encrypted using industry-standard SSL/TLS, and we use secure API keys for broker connections."
    },
    {
      question: "What if I change my mind?",
      answer: "We offer a 30-day money-back guarantee, no questions asked. If you're not satisfied with Atomik Trading for any reason, simply reach out to our support team for a full refund."
    },
    {
      question: "When will the platform launch?",
      answer: "The platform will launch in December 2024. As a pre-launch member, you'll get priority access before the public launch and exclusive onboarding support from our team."
    }
  ];

  return (
    <Box py={16} bg="whiteAlpha.50">
      <VStack spacing={8} maxW="4xl" mx="auto" px={4}>
        <Heading
          fontSize={{ base: "3xl", md: "4xl" }}
          textAlign="center"
          bgGradient="linear(to-r, primary, secondary)"
          bgClip="text"
        >
          Frequently Asked Questions
        </Heading>

        <Accordion allowMultiple width="100%">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              border="none"
              mb={4}
              bg="whiteAlpha.100"
              borderRadius="lg"
            >
              <AccordionButton 
                p={4} 
                _hover={{ bg: 'whiteAlpha.200' }}
                borderRadius="lg"
              >
                <Box flex="1" textAlign="left" fontWeight="medium">
                  {faq.question}
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4} px={4}>
                {faq.answer}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </VStack>
    </Box>
  );
};

export default FAQ;