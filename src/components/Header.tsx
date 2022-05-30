import { FC, useEffect } from 'react';

import { Box, Button, HStack, IconButton, Text, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

import ChakraNextLink from '@daoism/components/ChakraNextLink';
import { Web3Connect } from '@daoism/components/Web3Connect';

export const Header: FC = () => {
  const { toggleColorMode } = useColorMode();
  const buttonColor = useColorModeValue('yellow.500', 'grey.500');
  const toggleIcon = useColorModeValue(<MdLightMode />, <MdDarkMode />);

  return (
    <Box
      as="header"
      position="fixed"
      top={0}
      left={0}
      width="100%"
      height={12}
      px={5}
      py={3}
      zIndex="1000"
      sx={{
        fontSize: { base: '2.6vmin', md: '1.2vmax' },
        color: useColorModeValue('gray.700', 'gray.300'),
        'a, .chakra-menu-item': {
          color: useColorModeValue('gray.700', 'gray.300'),
          _hover: {
            color: useColorModeValue('gray.500', 'gray.500'),
          },
        },
      }}
    >
      <HStack spacing={0} align="center" justify="space-between">
        <Box w="25%" display="inherit" alignContent="center">
          <Text fontSize="inherit">Daoism Systems dApp</Text>
        </Box>
        <HStack as="menu" w="auto" justify="center" spacing={8} px={0}>
          <ChakraNextLink href="/">Home</ChakraNextLink>
          <ChakraNextLink href="/about">About</ChakraNextLink>
        </HStack>
        <HStack w="25%" justify="flex-end">
          <IconButton
            icon={toggleIcon}
            aria-label="Toggle dark mode"
            className="--no-shadow"
            color={buttonColor}
            fontSize="3xl"
            colorScheme="ghost"
            onClick={toggleColorMode}
          />
          <Web3Connect />
        </HStack>
      </HStack>
    </Box>
  );
};
