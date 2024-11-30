import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Flex, 
  HStack, 
  Badge, 
  Image, 
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../common/Button';

const StickyHeader = ({ remainingSpots, onOpen }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        // Show header after scrolling down 300px
        if (window.scrollY > 300) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
        // Update last scroll position
        setLastScrollY(window.scrollY);
      }
    };

    // Add scroll event listener
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);

      // Cleanup
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  // Framer motion variants for smooth animation
  const headerVariants = {
    hidden: {
      y: -100,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={headerVariants}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
          }}
        >
          <Box
            bg="rgba(0, 0, 0, 0.95)"
            backdropFilter="blur(10px)"
            borderBottom="1px solid"
            borderColor="whiteAlpha.100"
            boxShadow="lg"
            transition="all 0.3s ease-in-out"
          >
            <Container maxW="7xl">
              <Flex
                justify="space-between"
                align="center"
                height="60px"
                px={{ base: 4, md: 6 }}
              >
                {/* Logo */}
                <Image
                  src="/logo/AtomikLogo.png"
                  alt="Atomik Trading"
                  height="40px"
                  objectFit="contain"
                />

                {/* Center Stats - Hidden on mobile */}
                <HStack 
                  spacing={8} 
                  display={{ base: 'none', md: 'flex' }}
                  color="whiteAlpha.900"
                >
                  <Text fontSize="sm">
                    <Text as="span" color="primary" fontWeight="bold">
                      50ms
                    </Text>
                    {' '}Execution
                  </Text>
                  <Text fontSize="sm">
                    <Text as="span" color="primary" fontWeight="bold">
                      24/7
                    </Text>
                    {' '}Automation
                  </Text>
                </HStack>

                {/* CTA Section */}
                <HStack spacing={4}>
                  <Badge 
                    colorScheme="red" 
                    px={2} 
                    py={1}
                    display={{ base: 'none', sm: 'block' }}
                  >
                    Only {remainingSpots} spots left!
                  </Badge>
                  
                  <Button
                    onClick={onOpen}
                    height="40px"
                    px={6}
                    fontSize="sm"
                  >
                    Get Lifetime Access - $299
                  </Button>
                </HStack>
              </Flex>
            </Container>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyHeader;