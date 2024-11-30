import React from 'react';
import { Button as ChakraButton, Box } from '@chakra-ui/react';

const Button = ({ children, onClick, width = 'auto', variant = 'primary', ...props }) => {
  const baseStyles = {
    color: "white",
    fontWeight: "medium",
    borderRadius: "md",
    position: "relative",
    overflow: "hidden",
    height: variant === 'primary' ? "60px" : "auto",
    fontSize: variant === 'primary' ? "xl" : "md",
  };

  const variants = {
    primary: {
      ...baseStyles,
      bg: "transparent",
      border: "1px solid",
      borderColor: "rgba(0, 198, 224, 1)",
      width: width,
      _before: {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bg: 'linear-gradient(90deg, transparent, rgba(0, 198, 224, 1) 20%, rgba(0, 198, 224, 1) 80%, transparent)',
        opacity: 0.3,
      },
      _hover: {
        _before: {
          opacity: 0.5,
        }
      },
      _active: {
        _before: {
          opacity: 0.7,
        }
      }
    },
    secondary: {
      ...baseStyles,
      bg: "whiteAlpha.200",
      _hover: { bg: "whiteAlpha.300" },
      _active: { bg: "whiteAlpha.400" },
      borderColor: "whiteAlpha.400",
    }
  };

  return (
    <ChakraButton {...variants[variant]} onClick={onClick} {...props}>
      <Box as="span" position="relative" zIndex={1}>
        {children}
      </Box>
    </ChakraButton>
  );
};

export default Button;