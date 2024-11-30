import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    primary: '#00C6E0', // Blue
    secondary: '#10B981', // Green
    background: '#000000',
    text: {
      primary: '#F9FAFB', // Very light gray
      secondary: '#D1D5DB', // Light gray
    },
  },
  fonts: {
    body: 'Inter, sans-serif',
    heading: 'Inter, sans-serif',
  },
  styles: {
    global: {
      body: {
        bg: 'background',
        color: 'text.primary',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'medium',
      },
    },
  },
});

export default theme;