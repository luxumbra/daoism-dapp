import { useState } from 'react';

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
import { useContractFunction, useEthers, useSendTransaction } from '@usedapp/core';
// import { useEthers, useSendTransaction } from '@usedapp/core';
// import { utils } from 'ethers';

/**
 * TODO: Buidl a custom component that can be used to send transactions
 * @returns {JSX.Element}
 */

const Transfer = (): JSX.Element => (
  // store the form values
  // const [formData, setFormData] = useState({
  //   contract: '',
  //   to: '',
  //   amount: '',
  // });
  // const { chainId } = useEthers();
  // const { sendTransaction } = useSendTransaction();
  // const { state, send } = useContractFunction(contract, 'transfer', { transactionName: 'Transfer' });

  // async function transferTokens(contract: string, to: string, quantity: number): Promise<void> {
  //   console.log('transferTokens', { address, quantity });
  //   try {
  //     const walletSigner = wallet.connect(window.ethersProvider);
  //     const gasPrice = await walletSigner.provider.getGasPrice();
  //   } catch (error) {
  //     throw new Error(`Transfer failed: ${error.message}`);
  //   }
  // }

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
      <Tooltip label="Please please ensure this is the correct address" aria-label="Check address" hasArrow>
        <FormControl id="transfer-receiving-address" isRequired>
          <FormLabel>Receiving wallet</FormLabel>
          <Input placeholder="0x..." _placeholder={{ color: 'gray.500' }} type="text" />
        </FormControl>
      </Tooltip>
      <Tooltip label="How many?" aria-label="Check address" hasArrow>
        <FormControl id="transfer-amount" isRequired>
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
          // onClick={(e) => transferTokens(to, amount)}
        >
          Submit
        </Button>
      </Stack>
    </Stack>
  </Flex>
);
export default Transfer;
