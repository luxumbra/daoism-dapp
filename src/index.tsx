import { Box, Text } from '@chakra-ui/react';

import { PageSection } from '@daoism/components/PageSection';
//

const Home = () => (
  <Box className="wrapper">
    <PageSection>
      <Box maxW="3xl">
        <Text as="h1" color="inherit">
          Daoism Systems
        </Text>
        <Text textAlign="right">Coding challenge</Text>
      </Box>
    </PageSection>
  </Box>
);
export default Home;
