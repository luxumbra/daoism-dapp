import {render, RenderOptions} from '@testing-library/react';
import {ThemeProvider, ColorModeProvider} from '@chakra-ui/react';
import '@testing-library/jest-dom';
import 'mutationobserver-shim';
import { DSTheme } from '@daoism/theme';
import { ReactElement, JSXElementConstructor, FC, PropsWithChildren } from 'react';

import type { ThemeProviderProps } from '@chakra-ui/react';


// const ChakraRenderer: Render = ({children}) => {
//     return (
//         <ThemeProvider theme={DSTheme}>
//             <ColorModeProvider value="dark">{children}</ColorModeProvider>
//         </ThemeProvider>
//     );
// };

// const customRender = (ui, options) =>
//     render(ui, {
//         wrapper: ChakraRenderer,
//         ...options
//     });

// export * from '@testing-library/react';
// export {customRender as render};