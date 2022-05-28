import { Box, Text } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
//

const Home: NextPage = () => (
  <Box className="wrapper">
    <Head>
      <title>Daoism Systems dApp</title>
      <meta name="description" content="An interview challenge set by Daoism Systems 😱" />
    </Head>

    <Box as="main" display="flex" flexFlow="column nowrap" w="full">
      <Box
        as="section"
        display="flex"
        position="relative"
        w="full"
        maxW="100vw"
        maxH="100vh"
        h="100vh"
        alignItems="center"
        justifyContent="center"
      >
        <Box maxW="3xl">
          <Text as="h1">About this challenge</Text>
        </Box>
      </Box>
    </Box>
  </Box>
);

export default Home;
