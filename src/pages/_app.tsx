import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraBaseProvider } from '@chakra-ui/react';
import { Layout } from '../components/common/layout';
import '@fontsource/press-start-2p/400.css';
import { theme } from '../utils/theme';
import { UserContainer, DataContainer } from '../containers';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraBaseProvider theme={theme}>
      <UserContainer.Provider>
        <DataContainer.Provider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </DataContainer.Provider>
      </UserContainer.Provider>
    </ChakraBaseProvider>
  );
}
