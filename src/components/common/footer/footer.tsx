import { Box, Container, Icon, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <Box borderY={'1px solid black'}>
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
        alignItems="center"
      >
        <Stack direction={'row'} spacing={12}>
          <Link href={'/'}>Home</Link>
          <Link href={'/gacha'}>Gacha</Link>
          <Link href={'/create'}>Create</Link>
        </Stack>
        <Text>
          Build by{' '}
          <Link href="https://twitter.com/Deep_in_Crypto" target="_blank" className="nes-text is-primary">
            bibitto
          </Link>
        </Text>
      </Container>
    </Box>
  );
};
