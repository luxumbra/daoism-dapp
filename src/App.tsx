import { FC } from 'react';

import { Box, ChakraProvider, CSSReset, Text } from '@chakra-ui/react';
import { DAppProvider } from '@usedapp/core';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Footer } from '@daoism/components/Footer';
import { Header } from '@daoism/components/Header';
import { networksConfig } from '@daoism/lib/constants';
import { DSTheme } from '@daoism/theme';

import About from './about';
import Home from './index';

const App: FC = () => (
  <DAppProvider config={networksConfig}>
    <CSSReset />
    <ChakraProvider theme={DSTheme}>
      <Router>
        <Header />
        <Box className="wrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Box>
        <Footer />
      </Router>
    </ChakraProvider>
  </DAppProvider>
);

export default App;
