import { Footer, footerHeight } from '../footer';
import Head from 'next/head';
import { FC, ReactNode } from 'react';
import { Box } from '@chakra-ui/react';
import { Header, headerHeight } from '../header';

type Props = {
  children: ReactNode;
};

export const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Gacha-Pon</title>
        <meta name="description" content="Gacha-Pon is community" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Box
        h={`calc(100vh - ${headerHeight} - ${footerHeight})`}
        display="flex"
        flexDirection={'column'}
        justifyContent={'center'}
        overflowY={'scroll'}
      >
        {children}
      </Box>
      <Footer />
    </>
  );
};
