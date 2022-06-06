import { StrictMode } from 'react';

import { Box, Text } from '@chakra-ui/react';
import ReactDOM from 'react-dom';

import { PageSection } from '@daoism/components/PageSection';
//

ReactDOM.render(
  <StrictMode>
    <Box className="wrapper">
      <PageSection>
        <Box maxW="3xl">
          <Text as="h1" color="inherit">
            About this challenge
          </Text>
        </Box>
      </PageSection>
    </Box>
  </StrictMode>,
  document.querySelector('#root')
);
