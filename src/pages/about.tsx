import { Box, Text } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';

import { PageSection } from '@daoism/components/PageSection';
//

const Home: NextPage = () => (
  <Box className="wrapper">
    <Head>
      <title>Daoism Systems dApp</title>
      <meta name="description" content="An interview challenge set by Daoism Systems 😱" />
    </Head>
    <PageSection>
      <Box maxW="3xl">
        <Text as="h1" color="inherit">
          About this challenge
        </Text>
      </Box>
    </PageSection>
  </Box>
);

export default Home;
