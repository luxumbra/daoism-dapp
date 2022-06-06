import { FC } from 'react';

import { Box, HStack, Text, useColorModeValue } from '@chakra-ui/react';

export const Footer: FC = () => (
  <Box as="footer" position="fixed" bottom={0} left={0} minH="5%" w="100%" zIndex={1000} data-testid="footer-component">
    <HStack align="center" justify="center" color={useColorModeValue('gray.700', 'gray.300')}>
      <Text>Made with 💓 by lux</Text>
    </HStack>
  </Box>
);
