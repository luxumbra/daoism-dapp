import { ReactNode } from 'react';

import { Link as ChakraLink } from '@chakra-ui/react';
// import NextLink from 'next/link';

export interface LinkProps {
  href: string;
  children: ReactNode;
}
const ChakraNextLink = ({ href, children, ...props }: LinkProps) => (
  <ChakraLink href={href} {...props}>
    {children}
  </ChakraLink>
);

export default ChakraNextLink;
