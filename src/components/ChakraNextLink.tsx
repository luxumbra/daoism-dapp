import { ReactNode } from 'react';

import { Link as ChakraLink } from '@chakra-ui/react';
import NextLink from 'next/link';

export interface LinkProps {
  href: string;
  children: ReactNode;
}
const ChakraNextLink = ({ href, children, ...props }: LinkProps) => (
  <NextLink href={href} passHref>
    <ChakraLink {...props}>{children}</ChakraLink>
  </NextLink>
);

export default ChakraNextLink;
