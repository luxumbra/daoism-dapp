import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react';
// import { useEthers, useSendTransaction } from '@usedapp/core';
// import { utils } from 'ethers';

/**
 * TODO: Buidl a custom component that can be used to send transactions
 * @returns {JSX.Element}
 */
const Transfer = (): JSX.Element => (
  <Flex align="center" justify="center">
    <Stack
      spacing={4}
      w="full"
      maxW="md"
      bg={useColorModeValue('blue.200', 'gray.700')}
      rounded="xl"
      boxShadow="lg"
      p={6}
      mb={6}
      sx={{
        h4: {
          color: useColorModeValue('gray.700', 'blue.200'),
        },
      }}
    >
      <Text as="h4" lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
        Send tokens
      </Text>
      <Tooltip label="Please ensure this is the correct contract address" aria-label="Check address" hasArrow>
        <FormControl id="email" isRequired>
          <FormLabel>Token Contract</FormLabel>
          <Input placeholder="0x..." _placeholder={{ color: 'gray.500' }} type="text" />
        </FormControl>
      </Tooltip>
      <Tooltip label="The tokens will be minted to the connected wallet" aria-label="Check address" hasArrow>
        <FormControl id="password" isRequired>
          <FormLabel>Amount</FormLabel>
          <Input type="number" />
        </FormControl>
      </Tooltip>
      <Stack spacing={6}>
        <Button
          bg="blue.400"
          color="white"
          _hover={{
            bg: 'blue.500',
          }}
        >
          Submit
        </Button>
      </Stack>
    </Stack>
  </Flex>
);
export default Transfer;
