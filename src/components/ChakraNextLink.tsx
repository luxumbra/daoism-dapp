import { Link as ChakraLink } from "@chakra-ui/react"
import NextLink, { LinkProps as NextLinkProps } from "next/link"
import { FC, ReactElement, ReactNode } from "react"


export interface LinkProps {
  href: string;
  as?: React.ElementType;
  nextLinkProps?: NextLinkProps
  children: ReactNode;
}
const ChakraNextLink: FC<LinkProps> = ({href, as: Component = ChakraLink, nextLinkProps, children, ...props}) => {
  return (
    <NextLink href={href} passHref>
      <ChakraLink {...props}>{children}</ChakraLink>
    </NextLink>
  )
}

export default ChakraNextLink