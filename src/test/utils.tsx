import React, { ReactElement, FC, ReactNode } from 'react';

import { ChakraProps, ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import '@testing-library/jest-dom';
import { render, RenderOptions } from '@testing-library/react';
import { DAppProvider } from '@usedapp/core';
import { networksConfig } from '@daoism/lib/constants';
import 'mutationobserver-shim';
import { DSTheme } from '@daoism/theme';

const AllTheProviders: FC<{ children: ReactNode }> = ({ children }) => (
  <DAppProvider config={networksConfig}>
    <ChakraProvider theme={DSTheme}>{children}</ChakraProvider>
  </DAppProvider>
);

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, {
    wrapper: AllTheProviders, ...options
  });

// eslint-disable-next-line import/no-extraneous-dependencies
export * from '@testing-library/react';
export { customRender as render };