import { Box, HStack, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';

export const footerHeight = '60px';

export const Footer = () => {
  return (
    <Box h={footerHeight} borderY={'4px solid black'} display="flex" justifyContent={'center'}>
      <HStack as={Stack} w={'70%'} m="auto" justify={'space-between'} align="center">
        <Text>Enjoy your web3 life.</Text>
        <HStack>
          <Text>Build by </Text>
          <Link href="https://twitter.com/Deep_in_Crypto" target="_blank" className="nes-text is-primary">
            <HStack sx={{ pl: 2, '&:hover': { color: '#0070f3' } }}>
              <Text>bibitto</Text>
              <i className="nes-icon twitter" style={{ transformOrigin: 'left' }}></i>
            </HStack>
          </Link>
        </HStack>
      </HStack>
    </Box>
  );
};
