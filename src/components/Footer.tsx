import { FC } from 'react';

import { Box, HStack, Text } from '@chakra-ui/react';

export const Footer: FC = () => (
  <Box as="footer" position="fixed" bottom={0} left={0} w="100%">
    <HStack align="center" justify="center">
      <Box>
        <Text>Footer</Text>
      </Box>
    </HStack>
  </Box>
);
