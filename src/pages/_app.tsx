import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraBaseProvider } from '@chakra-ui/react';
import { Layout } from '../components/common/layout';
import '@fontsource/press-start-2p/400.css';
import { theme } from '../utils/theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraBaseProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraBaseProvider>
  );
}
