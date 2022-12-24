import { Box, Container, Stack, Text, Link, useColorModeValue } from '@chakra-ui/react';

export const Footer = () => {
  return (
    <Box border={'1px solid black'}>
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <Stack direction={'row'} spacing={6}>
          <Link href={'/'}>Home</Link>
          <Link href={'/'}>Create</Link>
          <Link href={'/'}>Market</Link>
          <Link href={'https://twitter.com/Deep_in_Crypto'} target="_blank">
            Twitter
          </Link>
        </Stack>
        <Text>© 2022 VWBL ガチャ. All rights reserved</Text>
      </Container>
    </Box>
  );
};
