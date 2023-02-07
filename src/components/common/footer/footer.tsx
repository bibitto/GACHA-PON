import { Box, HStack, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';

export const footerHeight = '70px';

export const Footer = () => {
  return (
    <Box h={footerHeight} borderY={'4px solid black'} display="flex" justifyContent={'center'}>
      <HStack as={Stack} w={'70%'} m="auto" justify={'space-between'} align="center">
        <Text>
          <Text as={'span'} _hover={{ color: 'red' }}>
            Enjoy{' '}
          </Text>
          <Text as={'span'} _hover={{ color: 'orange' }}>
            your{' '}
          </Text>
          <Text as={'span'} _hover={{ color: 'green' }}>
            web3{' '}
          </Text>
          <Text as={'span'} _hover={{ color: 'blue' }}>
            life
          </Text>
          <Text as={'span'} _hover={{ color: 'purple' }}>
            .
          </Text>
        </Text>
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
