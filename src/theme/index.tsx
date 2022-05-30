import { extendTheme } from '@chakra-ui/react';

import { DSColors } from './colors';

export const DSTheme = extendTheme({
  ...DSColors,
  initialColorMode: 'dark',
  styles: {
    global: {
      html: {
        bgGradient: `linear(0deg, ${DSColors.colors.green[400]} -29.22%, ${DSColors.colors.green[800]} 107.53%)`,
        scrollBehavior: 'smooth',
      },
      body: {
        bgGradient: `linear(0deg, ${DSColors.colors.green[400]} -29.22%, ${DSColors.colors.green[800]} 107.53%)`,
        color: 'white',
        fontFamily: '"Exo 2", sans-serif',
        fontSize: '16px',
        fontWeight: 500,
        p: 0,
        m: '0 auto',
        minH: '100vh',
        width: '100%',
        overflowX: 'hidden',
        // overflowY: "auto",

        '.dom-loader': {
          position: 'fixed',
          opacity: 0,
          top: 0,
          left: 0,
          zIndex: -200,
          transition: 'all 0.5s ease',
        },
      },
      a: {
        color: 'green.700',
        textDecoration: 'none',
        transition: 'color 0.2s ease',
        _hover: {
          color: 'green.600',
          textDecoration: 'none',
        },
        '&.chakra-link': {
          color: 'green.100',
          filter: 'none',
          _hover: {
            color: 'green.600',
            textDecoration: 'none',
          },
          '&:focus': {
            boxShadow: 'none',
          },
        },
      },
      h1: {
        color: 'green.100',
        fontSize: '4vw',
        lineHeight: '1.2',
        fontWeight: 900,
        '& + p': {
          fontSize: { base: '2.8vmin', md: '1.3vmax' },
          lineHeight: { base: '1.2', md: 'inherit' },
          mt: 0,
          mb: 1,
        },
      },
      h2: {
        color: 'blue.100',
        fontSize: '3vw',
        fontWeight: '900',
        filter: 'drop-shadow(0 0 1px rgba(0,0,0,0.9))',
        '& + p': {
          fontSize: { base: '2.8vmin', md: '1.3vmax' },
          lineHeight: { base: '1.2', md: 'inherit' },
          mt: 0,
          mb: 1,
        },
      },
      h3: {
        color: 'blue.100',
        fontSize: { base: '4vmin', md: '1.5vmax' },
        fontWeight: 700,
        mt: { base: 2, md: 5 },
        '& + p': {
          fontSize: { base: '2.8vmin', md: '1vmax' },
          lineHeight: { base: '1.2', md: 'inherit' },
          fontWeight: 500,
          mt: 0,
          mb: 1,
        },
      },
      h4: {
        color: 'cyan.100',
        fontSize: '1vmax',
        fontWeight: 700,
      },
      p: {
        fontSize: { base: '2.6vmin', md: '.8vmax' },
        lineHeight: { base: '1.2', md: '1.6' },
        mb: { base: 2, md: 3 },
        // filter: "drop-shadow(0 0 1px rgba(0,0,0,0.6))",
      },
      menu: {
        button: {},
        a: {
          fontSize: { base: '2.6vmin', md: '1.2vmax' },
          fontWeight: 500,
          transition: 'all 0.2s ease',
          _hover: {
            bgGradient: `linear(-90deg, ${DSColors.colors.green[100]} -29.22%, ${DSColors.colors.green[800]} 107.53%)`,
            bgClip: 'text',
          },
          '&:focus': {
            boxShadow: 'none',
          },
        },
      },
      section: {
        position: 'relative',
        bgGradient: `linear(0deg, ${DSColors.colors.dark} -29.22%, ${DSColors.colors.darkish} 107.53%)`,
        display: 'flex',
        alignItems: 'center',
        h: '100vh',
        w: '100vw',
        m: 0,
        py: 0,
        px: { base: 4, lg: '10%' },
        overflowY: { base: 'auto', md: 'hidden' },
        overflowX: 'hidden',
        zIndex: 10,
      },
      button: {
        svg: {
          filter: `drop-shadow(0 0 2px ${DSColors.colors.black})`,
        },
        '&.--no-shadow': {
          svg: {
            filter: 'none',
          },
        },
      },

      '.loading-bar': {
        bg: DSColors.colors.green[400],
      },
    },
  },
});
