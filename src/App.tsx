import { FC } from 'react';

import { Box, ChakraProvider, CSSReset, Text } from '@chakra-ui/react';
import { DAppProvider } from '@usedapp/core';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Footer } from '@daoism/components/Footer';
import { Header } from '@daoism/components/Header';
import { PageSection } from '@daoism/components/PageSection';
import { networksConfig } from '@daoism/lib/constants';
import { DSTheme } from '@daoism/theme';

const App: FC = () => (
  <DAppProvider config={networksConfig}>
    {/* <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    </Head> */}
    <CSSReset />
    <ChakraProvider theme={DSTheme}>
      <Header />
      <PageSection>
        <Box maxW="3xl">
          <Text as="h1" color="inherit">
            Daoism Systems Challenge
          </Text>
        </Box>
      </PageSection>
      <Footer />
    </ChakraProvider>
  </DAppProvider>
);

export default App;
