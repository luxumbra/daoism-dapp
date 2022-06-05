import { FC } from 'react';

import { Box, StackProps, useColorModeValue } from '@chakra-ui/react';

import { DSTheme } from '@daoism/theme';
//

export const PageSection: FC<StackProps> = ({ children }) => (
  <Box as="main" display="flex" flexFlow="column nowrap" w="full" data-test="pageSection-component">
    <Box
      as="section"
      display="flex"
      position="relative"
      w="full"
      maxW="100vw"
      maxH="100vh"
      h="100vh"
      alignItems="center"
      justifyContent="center"
      bgGradient={useColorModeValue(
        `linear(0deg, ${DSTheme.colors.gray[300]} -29.22%, ${DSTheme.colors.gray[50]} 107.53%)`,
        `linear(0deg, ${DSTheme.colors.dark} -29.22%, ${DSTheme.colors.darkish} 107.53%)`
      )}
      color={useColorModeValue('gray.700', 'gray.300')}
      transition="all 0.5s ease-in-out"
    >
      {children}
    </Box>
  </Box>
);
