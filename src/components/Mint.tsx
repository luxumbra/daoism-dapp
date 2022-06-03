import { FC, useRef, useState } from 'react';

import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  ToastId,
  Tooltip,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { Contract } from '@ethersproject/contracts';
import { parseEther } from '@ethersproject/units';
import { useContractFunction, useEthers, useSendTransaction, TransactionStatus } from '@usedapp/core';
import { TypedContract } from '@usedapp/core/dist/esm/src/model/types';
import { utils } from 'ethers';
import { Formik, Field, Form, FormikHelpers, FormikState, FieldInputProps } from 'formik';

import ERC20_ABI from '@daoism/abis/erc20.abi.json';
import { FormDataProps } from '@daoism/components/Transfer';
import { contractAddress } from '@daoism/lib/constants';
import { copyString, validateAddress, validateAmount } from '@daoism/lib/helpers';

/**
 * TODO: Buidl a custom component that can be used to mint tokens
 * @returns JSX.Element
 * */
const Mint: FC = () => {
  const toast = useToast();
  // store the form values
  const [formData, setFormData] = useState<FormDataProps>({
    contract: contractAddress,
    toAddress: '',
    amount: 0,
  });
  const btnRef = useRef<HTMLButtonElement>(null);

  // const { parseUnits, formatUnits } = utils;
  const contract = new Contract(contractAddress, ERC20_ABI);
  const { state, send, events, resetState } = useContractFunction(contract as unknown as TypedContract, 'transfer');

  const bgColor = useColorModeValue('blue.200', 'gray.700');
  const headingColor = useColorModeValue('gray.700', 'blue.200');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    const clean: number | string = typeof value === 'number' ? +value : value;
    // console.log('handleChange', name, value, clean);

    setFormData((oldData) => ({ ...oldData, [name]: clean }));
  };

  const handleSubmit = async (values: FormDataProps, helpers: FormikHelpers<FormDataProps>) => {
    toast({
      title: `Mint token`,
      description: `Minting token to ${values.toAddress}`,
      status: 'info',
      duration: 5000,
    });
    const { toAddress, amount } = formData;

    try {
      if (amount && amount > 0 && toAddress) {
        await send(toAddress, parseEther(amount.toString()));
        if (state.status === 'Exception') {
          throw new Error(`Error minting tokens: ${state.errorMessage}`);
        }

        toast({ title: `Transfer complete 🎉`, status: 'success', duration: 5000 });
        helpers.setSubmitting(false);
      }
    } catch {
      toast({ title: `Transfer failed 😬`, description: `${state.errorMessage}`, status: 'error', duration: 5000 });
      helpers.setSubmitting(false);
    }
  };

  return (
    <Flex align="center" justify="center">
      <Formik initialValues={formData} onSubmit={handleSubmit}>
        {(helpers) => (
          <Stack
            spacing={4}
            w="full"
            maxW="md"
            bg={bgColor}
            rounded="xl"
            boxShadow="lg"
            p={6}
            mb={6}
            sx={{
              h4: {
                color: headingColor,
              },
            }}
          >
            <Heading as="h4" lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
              Mintaru
            </Heading>
            <Tooltip label="Click to copy contract address" aria-label="Check address" hasArrow>
              <Text
                as="span"
                fontSize="sm"
                color="blue.500"
                onClick={() => copyString(contractAddress)}
              >{`Contract: ${contractAddress}`}</Text>
            </Tooltip>
            <Form>
              <Field name="toAddress" validate={() => validateAddress(formData.toAddress)}>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {({ field, form }: { field: FieldInputProps<any>; form: FormikState<any> }) => (
                  <FormControl isInvalid={!!(form.errors.toAddress && form.touched.toAddress)} isRequired>
                    <FormLabel htmlFor="toAddress">Receiving wallet</FormLabel>
                    <Tooltip
                      label="Please ensure to use the correct address 🙏"
                      aria-label="Recipient address"
                      hasArrow
                    >
                      <Input
                        {...field}
                        id="toAddress"
                        placeholder="0x..."
                        _placeholder={{ color: 'gray.500' }}
                        type="text"
                        value={formData.toAddress}
                        onChange={handleChange}
                      />
                    </Tooltip>
                    <FormErrorMessage>{helpers.errors.toAddress}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="amount" validate={() => validateAmount(formData.amount)}>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {({ field, form }: { field: FieldInputProps<any>; form: FormikState<any> }) => (
                  <FormControl id="amount" isInvalid={!!(form.errors.amount && form.touched.amount)} isRequired>
                    <FormLabel htmlFor="amount">Amount</FormLabel>
                    <Tooltip label="How many tokens?" aria-label="Amount of tokens to send" hasArrow>
                      <Input {...field} id="amount" type="number" value={formData.amount} onChange={handleChange} />
                    </Tooltip>
                    <FormErrorMessage>{helpers.errors.amount}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Stack spacing={6} mt={3}>
                <Button
                  ref={btnRef}
                  bg="blue.400"
                  color="white"
                  _hover={{
                    bg: 'blue.500',
                  }}
                  isLoading={helpers.isSubmitting}
                  isDisabled={helpers.isSubmitting || !helpers.isValid}
                  type="submit"
                >
                  Submit
                </Button>
              </Stack>
            </Form>
          </Stack>
        )}
      </Formik>
    </Flex>
  );
};
export default Mint;
