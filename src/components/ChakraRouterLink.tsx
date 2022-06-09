import { ReactNode } from 'react';

import { Link } from 'react-router-dom';

export interface LinkProps {
  href: string;
  children: ReactNode;
}
const ChakraRouterLink = ({ href, children }: LinkProps) => <Link to={href}>{children}</Link>;

export default ChakraRouterLink;
