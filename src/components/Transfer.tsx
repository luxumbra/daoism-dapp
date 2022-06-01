import { FC, useEffect, useRef, useState } from 'react';

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
  Toast,
  Tooltip,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { selectOptions } from '@testing-library/user-event/dist/types/utility';
import { useContractFunction, useEthers, useLookupAddress, useSendTransaction } from '@usedapp/core';
import { Falsy, TypedContract } from '@usedapp/core/dist/esm/src/model/types';
import { Contract, utils } from 'ethers';
import { Formik, Field, Form, FormikHelpers, FormikProps, FieldProps, FormikState, FieldInputProps } from 'formik';
// import { useEthers, useSendTransaction } from '@usedapp/core';

interface FormDataProps {
  contract: Falsy | TypedContract | string | undefined;
  toAddress: string | undefined;
  amount: number | undefined;
}
const testContract = '0xc778417E063141139Fce010982780140Aa0cD5Ab'; // Rinkeby wETH
const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const validateAddress = async (address: string | undefined): Promise<string | undefined> => {
  let error;
  try {
    await sleep(300);
    if (!address) {
      console.log('address is empty');

      error = 'Address is required';
    }
    if (address && !utils.getAddress(address)) {
      console.log('isInvalid', address);
      error = `Invalid address ${address}`;
      throw new Error(error);
    }
    console.log('validatedAddress', address, error);

    return error;
  } catch {
    return `Invalid address: ${address}`;
  }
};

const validateAmount = (amount: number | string | undefined) => {
  const number = amount && Number(amount);
  console.log('validateAmount', typeof amount, number);

  let error;
  if (!number || amount === '') {
    error = 'Amount is required';
  }
  if (number && number <= 0) {
    error = 'Amount must be greater than 0';
  }
  if (number && typeof number !== 'number') {
    console.log('invalid amount', typeof number, number);

    error = 'Amount must be a number';
  }

  return error;
};

/**
 * TODO: Buidl a custom component that can be used to send transactions
 * @returns JSX.Element
 * */
const Transfer: FC = () => {
  const toast = useToast();
  // store the form values
  const [formData, setFormData] = useState<FormDataProps>({
    contract: testContract,
    toAddress: '',
    amount: 0,
  });
  const { chainId, library } = useEthers();
  const btnRef = useRef<HTMLButtonElement>(null);

  const { sendTransaction, state: sendState } = useSendTransaction({ transactionName: 'Transfer wETH' });
  const { ens, isLoading, error: addressError } = useLookupAddress(formData.toAddress);

  const bgColor = useColorModeValue('blue.200', 'gray.700');
  const headingColor = useColorModeValue('gray.700', 'blue.200');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    const clean: number | string = typeof value === 'number' ? +value : value;
    console.log('handleChange', name, value, clean);

    // if (number)
    console.log('value', value);
    setFormData((oldData) => ({ ...oldData, [name]: clean }));
  };

  const handleSubmit = async (values: FormDataProps, helpers: FormikHelpers<FormDataProps>) => {
    console.log('values', { values, helpers });
    toast({ title: `Submitting...${JSON.stringify(values, null, 2)}`, status: 'info', duration: 5000 });
    await sleep(1000);
    helpers.setSubmitting(false);
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
            <Text as="h4" lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
              Send tokens
            </Text>
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
                {helpers.isSubmitting && <Text>Submitting...</Text>}
              </Stack>
            </Form>
          </Stack>
        )}
      </Formik>
    </Flex>
  );
};

export default Transfer;
