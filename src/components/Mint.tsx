import { FC } from 'react';

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react';
// import { useEthers } from '@usedapp/core';

/**
 * TODO: Buidl a custom component that can be used to mint tokens
 * @returns JSX.Element
 * */
const Mint: FC = () => (
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
      <Heading as="h4" lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
        Mintaru
      </Heading>
      <Tooltip label="Please ensure this is the correct address" aria-label="Check address" hasArrow>
        <FormControl id="email" isRequired>
          <FormLabel>Receiving wallet</FormLabel>
          <Input placeholder="0x..." _placeholder={{ color: 'gray.500' }} type="text" />
        </FormControl>
      </Tooltip>
      <Tooltip label="How many tokens?" aria-label="Check address" hasArrow>
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
export default Mint;
