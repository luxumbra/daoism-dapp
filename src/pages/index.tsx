import { Box, Text } from '@chakra-ui/react';
//

const Home = (): JSX.Element => (
  <Box className="wrapper">
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
          <Text as="h1">Daoism Systems Challenge</Text>
        </Box>
      </Box>
    </Box>
  </Box>
);

export default Home;
