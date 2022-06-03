import { FC, useEffect, useRef, useState } from 'react';

import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Text,
  Tooltip,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { Contract } from '@ethersproject/contracts';
import { formatUnits, parseEther, parseUnits } from '@ethersproject/units';
import { useContractFunction, useEthers, useLookupAddress, useTokenBalance } from '@usedapp/core';
import { Falsy, TypedContract } from '@usedapp/core/dist/esm/src/model/types';
import { BigNumber } from 'ethers';
import { Formik, Field, Form, FormikHelpers, FormikState, FieldInputProps } from 'formik';

import ERC20_ABI from '@daoism/abis/erc20.abi.json';
import { contractAddress } from '@daoism/lib/constants';
import { copyString, validateAddress, validateAmount } from '@daoism/lib/helpers';

export interface FormDataProps {
  contract: Falsy | TypedContract | string | undefined;
  toAddress: string | undefined;
  amount: number | undefined;
}

/**
 * TODO: Buidl a custom component that can be used to send transactions
 * @returns JSX.Element
 * */
const Transfer: FC = () => {
  const toast = useToast();
  // store the form values
  const [formData, setFormData] = useState<FormDataProps>({
    contract: contractAddress,
    toAddress: '',
    amount: 0,
  });
  const [hasBalance, setHasBalance] = useState(false);
  // const { chainId, library } = useEthers();
  const btnRef = useRef<HTMLButtonElement>(null);
  const contract = new Contract(contractAddress, ERC20_ABI);
  const { account } = useEthers();
  const { state, send } = useContractFunction(contract as unknown as TypedContract, 'transfer');
  const { ens, isLoading, error: addressError } = useLookupAddress(formData.toAddress);
  const tokenBalance = useTokenBalance(contractAddress, account);
  const balance = tokenBalance && formatUnits(tokenBalance as BigNumber, 18);
  const bgColor = useColorModeValue('blue.200', 'gray.700');
  const headingColor = useColorModeValue('gray.700', 'blue.200');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    const clean: number | string = typeof value === 'number' ? +value : value;
    console.log('handleChange', name, value, clean);
    setFormData((oldData) => ({ ...oldData, [name]: clean }));
  };

  const handleSubmit = async (values: FormDataProps, helpers: FormikHelpers<FormDataProps>) => {
    helpers.setSubmitting(true);
    const { toAddress, amount } = formData;
    console.log({ values, toAddress, amount });
    console.log('tokenBalance', balance);

    toast({
      title: `Transfer...${JSON.stringify(formData, null, 2)}`,
      status: 'info',
      duration: 5000,
    });

    try {
      if (!balance) {
        throw new Error('No token balance');
      }
      if (balance && amount && amount > 0 && toAddress) {
        await send(toAddress, parseEther(amount.toString()));
        if (state.status === 'Exception') {
          throw new Error(`Error transfering tokens: ${state.errorMessage}`);
        }
        toast({ title: `Transfer complete 🎉`, status: 'success', duration: 5000 });
        helpers.setSubmitting(false);
      }
    } catch {
      toast({
        title: 'Error',
        description: `${state.errorMessage}`,
        status: 'error',
        duration: 5000,
      });
      helpers.setSubmitting(false);
    }
  };

  useEffect(() => {
    console.log('tokenBalance', balance);

    if (balance && (balance as unknown as number) > 0) {
      setHasBalance(true);
    }
  }, [btnRef, balance]);

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
            <Tooltip label="Click to copy contract address" aria-label="Check address" hasArrow>
              <Text
                as="span"
                fontSize="sm"
                color="blue.500"
                onClick={() => copyString(contractAddress)}
              >{`Contract: ${formData.contract}`}</Text>
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
                  isDisabled={helpers.isSubmitting || !helpers.isValid || !hasBalance}
                  type="submit"
                >
                  {!hasBalance ? 'No token balance' : 'Transfer'}
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
