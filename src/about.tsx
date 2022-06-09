import { Box, Link, Text } from '@chakra-ui/react';

import { PageSection } from '@daoism/components/PageSection';
//

const About = () => (
  <PageSection>
    <Box maxW="3xl">
      <Text as="h1" color="inherit">
        About this challenge
      </Text>
      <Text textAlign="right">
        More info in the{' '}
        <Link href="https://github.com/luxumbra/daoism-dapp" isExternal>
          README.md
        </Link>
      </Text>
    </Box>
  </PageSection>
);

export default About;
