import { Box, HStack, Button, Text } from "@chakra-ui/react"
import { FC } from "react"
import ChakraNextLink from "./ChakraNextLink"
import { Web3Connect } from "./Web3Connect"

export const Header: FC = () => {

  return (
    <Box as="header" position="fixed" top={0} left={0} width="100%" height={12} px={5} py={3} zIndex="1000">
      <HStack spacing={0} align="center" justify="space-between">
        <Box w="25%">
          <Text>Daoism Systems dApp</Text>
        </Box>
        <HStack as="menu" w="auto"  justify="center" spacing={8} px={0}>
          <ChakraNextLink href="/">Home</ChakraNextLink>
          <ChakraNextLink href="/about">About</ChakraNextLink>
        </HStack>
        <HStack w="25%" justify="flex-end" >
          <Web3Connect />
        </HStack>
      </HStack>
    </Box>
  )
}