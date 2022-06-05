import { Box, Text } from '@chakra-ui/react';
import Head from 'next/head';

import { PageSection } from '@daoism/components/PageSection';
//

const Home = (): JSX.Element => (
  <Box className="wrapper" data-test="home-component">
    <Head>
      <title>Daoism Systems dApp</title>
      <meta name="description" content="An interview challenge set by Daoism Systems 😱" />
    </Head>
    <PageSection>
      <Box maxW="3xl">
        <Text as="h1" color="inherit">
          Daoism Systems Challenge
        </Text>
      </Box>
    </PageSection>
  </Box>
);

export default Home;
