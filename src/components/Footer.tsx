import { Box, HStack, Button, Text } from "@chakra-ui/react"
import { FC } from "react"

export const Footer: FC = () => {

  return (
    <Box as="footer" position="fixed" bottom={0} left={0} w="100%">
    <HStack align="center" justify="center">
      <Box><Text>Footer</Text></Box>
    </HStack>
  </Box>
  )
}
