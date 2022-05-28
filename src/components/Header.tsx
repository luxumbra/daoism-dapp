import { FC } from 'react';

import { Box, HStack, Text } from '@chakra-ui/react';

import ChakraNextLink from '@daoism/components/ChakraNextLink';
import { Web3Connect } from '@daoism/components/Web3Connect';

export const Header: FC = () => (
  <Box as="header" position="fixed" top={0} left={0} width="100%" height={12} px={5} py={3} zIndex="1000">
    <HStack spacing={0} align="center" justify="space-between">
      <Box w="25%">
        <Text>Daoism Systems dApp</Text>
      </Box>
      <HStack as="menu" w="auto" justify="center" spacing={8} px={0}>
        <ChakraNextLink href="/">Home</ChakraNextLink>
        <ChakraNextLink href="/about">About</ChakraNextLink>
      </HStack>
      <HStack w="25%" justify="flex-end">
        <Web3Connect />
      </HStack>
    </HStack>
  </Box>
);
