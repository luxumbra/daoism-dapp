import { FC, useRef } from 'react';

import { Box, IconButton, useColorModeValue, useDisclosure, VStack } from '@chakra-ui/react';
import { MdMenu, MdMenuOpen } from 'react-icons/md';

import ChakraNextLink from '@daoism/components/ChakraNextLink';

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
        aria-label="Toggle menu"
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
        bgColor={useColorModeValue('yellow.500', 'gray.700')}
        opacity={disclosureProps.hidden ? 0 : 1}
        transition="all 0.2s"
        transform={`translateY(${disclosureProps.hidden ? '-100%' : '0'})`}
        zIndex={0}
      >
        <VStack as="menu" className="mobile-nav" spacing={8} px={0} height="auto">
          <ChakraNextLink href="/">Home</ChakraNextLink>
          <ChakraNextLink href="/about">About</ChakraNextLink>
        </VStack>
      </Box>
    </>
  );
};

export const DesktopMenu: FC = () => {
  const desktopMenu = useRef<HTMLDivElement>(null);

  return (
    <VStack
      ref={desktopMenu}
      display={{ base: 'initial', xl: 'none' }}
      as="menu"
      position="fixed"
      top={0}
      left={0}
      w="100vw"
      height="100vh"
      maxH="100vh"
      justify="center"
      alignContent="center"
      spacing={8}
      px={0}
      className="gradient"
      border="1px solid"
      zIndex={9}
    >
      <ChakraNextLink href="/">Home</ChakraNextLink>
      <ChakraNextLink href="/about">About</ChakraNextLink>
    </VStack>
  );
};
