import { FC } from 'react';

import { Box, HStack, Text, useBreakpointValue, useColorModeValue } from '@chakra-ui/react';

import { DesktopMenu, MobileMenu } from '@daoism/components/SiteNav';

export const Header: FC = () => {
  const isMobile = useBreakpointValue({ base: true, lg: false });

  return (
    <Box
      as="header"
      position="fixed"
      top={0}
      left={0}
      width="100%"
      height={20}
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
      data-testid="header-component"
    >
      <HStack spacing={0} align="center" justify="space-between" flex="0 0 100%">
        <Box
          w={{ base: 'auto', xl: '25%' }}
          display="inherit"
          alignContent="center"
          alignItems="center"
          order={{ base: 0, lg: 0 }}
          pl={{ base: 3, xl: 5 }}
          zIndex={10}
        >
          <Text as="span" fontWeight={700} fontSize={{ base: '6vmin', md: '1.2vmax' }}>
            {isMobile ? 'DS' : 'Daoism Systems'}
          </Text>
        </Box>
        {!isMobile ? <DesktopMenu /> : <MobileMenu />}
      </HStack>
    </Box>
  );
};
