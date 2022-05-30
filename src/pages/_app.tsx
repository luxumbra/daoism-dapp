import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { DAppProvider } from '@usedapp/core';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import { Footer } from '@daoism/components/Footer';
import { Header } from '@daoism/components/Header';
import { networksConfig } from '@daoism/lib/constants';
import { DSTheme } from '@daoism/theme';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <DAppProvider config={networksConfig}>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    </Head>
    <CSSReset />
    <ChakraProvider theme={DSTheme}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </ChakraProvider>
  </DAppProvider>
);

export default MyApp;
