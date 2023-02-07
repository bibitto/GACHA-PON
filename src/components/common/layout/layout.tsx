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
        <title>Gacha-Gacha Community</title>
        <meta name="description" content="VWBL-NFT ガチャ" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Box
        minH={`calc(100vh - ${headerHeight} - ${footerHeight})`}
        display="flex"
        flexDirection={'column'}
        justifyContent={'center'}
        py={8}
        px={14}
      >
        {children}
      </Box>
      <Footer />
    </>
  );
};
