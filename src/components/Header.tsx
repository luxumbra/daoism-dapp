import { FC, useRef } from 'react';

import {
  Box,
  Button,
  HStack,
  IconButton,
  Text,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

import { DesktopMenu, MobileMenu } from '@daoism/components/SiteNav';
import { Web3Connect } from '@daoism/components/Web3Connect';

export const Header: FC = () => {
  const { toggleColorMode } = useColorMode();
  const buttonColor = useColorModeValue('yellow.500', 'grey.500');
  const toggleIcon = useColorModeValue(<MdLightMode />, <MdDarkMode />);
  const isMobile = useBreakpointValue({ base: true, sm: false });

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
        <Box w="25%" display="inherit" alignContent="center" order={{ base: 2, lg: 1 }} zIndex={10}>
          <Text fontSize="inherit" fontWeight={700}>
            DAOism
          </Text>
        </Box>
        {!isMobile ? <DesktopMenu /> : <MobileMenu />}
        <HStack w="25%" justify="flex-end" order={3}>
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
