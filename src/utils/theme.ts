import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    transparent: 'transparent',
    black: '#000',
    white: '#fff',
  },
  fonts: {
    heading: `'Press Start 2P', sans-serif`,
    body: `'Press Start 2P', sans-serif`,
  },
  components: {
    Link: {
      textDecoration: 'none',
    },
  },
});
