import { extendBaseTheme } from '@chakra-ui/react';
import chakraTheme from '@chakra-ui/theme';

const { Link } = chakraTheme.components;

export const theme = extendBaseTheme({
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
