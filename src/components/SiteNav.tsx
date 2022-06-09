import { FC, useRef } from 'react';

import {
  Box,
  HStack,
  IconButton,
  // useBreakpointValue,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { MdDarkMode, MdLightMode, MdMenu, MdMenuOpen } from 'react-icons/md';

import ChakraRouterLink from '@daoism/components/ChakraRouterLink';
import { Web3Connect } from '@daoism/components/Web3Connect';

export const HeaderTools: FC = () => {
  const { toggleColorMode } = useColorMode();
  const buttonColor = useColorModeValue('yellow.500', 'grey.500');
  const toggleIcon = useColorModeValue(<MdLightMode />, <MdDarkMode />);
  // const isMobile = useBreakpointValue({ base: true, sm: false });

  return (
    <HStack
      w="25%"
      justify="flex-end"
      position={{ base: 'fixed', xl: 'relative' }}
      top={{ base: '10%', xl: 'initial' }}
      right={{ base: 5, xl: 'initial' }}
      data-testid="header-tools"
    >
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
  );
};

export const MobileMenu: FC = () => {
  const { getDisclosureProps, getButtonProps } = useDisclosure();
  const mobileMenu = useRef<HTMLDivElement>(null);
  const btnProps = getButtonProps();
  const disclosureProps = getDisclosureProps();

  return (
    <>
      <IconButton
        icon={disclosureProps.hidden ? <MdMenu /> : <MdMenuOpen />}
        colorScheme="ghost"
        aria-label={disclosureProps.hidden ? 'Open menu' : 'Close menu'}
        color="inherit"
        fontSize="3xl"
        zIndex={10}
        {...btnProps}
      />
      <Box
        ref={mobileMenu}
        display={{ base: 'flex', xl: 'none' }}
        position="fixed"
        top={0}
        left={0}
        w="100vw"
        height="100vh"
        maxH="100vh"
        justifyContent="center"
        alignItems="center"
        px={0}
        bgColor={useColorModeValue('gray.200', 'gray.700')}
        opacity={disclosureProps.hidden ? 0 : 1}
        transition="all 0.2s"
        transform={`translateY(${disclosureProps.hidden ? '-100%' : '0'})`}
        zIndex={0}
        data-testid="mobile-menu"
      >
        <VStack as="menu" className="mobile-nav" spacing={8} px={0} height="auto">
          <ChakraRouterLink href="/">Home</ChakraRouterLink>
          <ChakraRouterLink href="/about">About</ChakraRouterLink>
        </VStack>
      </Box>
      {disclosureProps.hidden ? undefined : <HeaderTools />}
    </>
  );
};

export const DesktopMenu: FC = () => {
  const desktopMenu = useRef<HTMLDivElement>(null);

  return (
    <>
      <HStack
        ref={desktopMenu}
        as="menu"
        justify="center"
        alignContent="center"
        spacing={8}
        px={0}
        zIndex={9}
        data-testid="sitenav"
      >
        <ChakraRouterLink href="/">Home</ChakraRouterLink>
        <ChakraRouterLink href="/about">About</ChakraRouterLink>
      </HStack>
      <HeaderTools />
    </>
  );
};
