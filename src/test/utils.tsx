import React, { ReactElement, FC, ReactNode } from 'react';

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import '@testing-library/jest-dom';
import { render, RenderOptions } from '@testing-library/react';

import 'mutationobserver-shim';
import { DSTheme } from '@daoism/theme';

const ChakraRenderer: FC<{ children: ReactNode }> = ({ children }) => (
  <ChakraProvider theme={DSTheme}>
    <>
      <ColorModeScript initialColorMode={DSTheme.config.initialColorMode} />
      {children}
    </>
  </ChakraProvider>
);

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, {
    wrapper: ChakraRenderer,
    ...options,
  });

// eslint-disable-next-line import/no-extraneous-dependencies
export * from '@testing-library/react';
export { customRender as render };
