import { FC, useCallback, useEffect, useRef, useState } from 'react';

import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Link,
  Stack,
  Text,
  ToastId,
  Tooltip,
  useColorModeValue,
  useToast,
  UseToastOptions,
  VStack,
} from '@chakra-ui/react';
import { Contract } from '@ethersproject/contracts';
import { formatUnits, parseEther } from '@ethersproject/units';
import { Rinkeby, useContractFunction, useEthers, useTokenBalance } from '@usedapp/core';
import { Falsy, TypedContract } from '@usedapp/core/dist/esm/src/model/types';
import { BigNumber } from 'ethers';
import { Formik, Field, Form, FormikHelpers, FormikState, FieldInputProps } from 'formik';

import ERC20_ABI from '@daoism/abis/erc20.abi.json';
import { NetworkSwitcher } from '@daoism/components/NetworkSwitcher';
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
  // store the form values
  const [formData, setFormData] = useState<FormDataProps>({
    contract: contractAddress,
    toAddress: '',
    amount: 0,
  });
  const toast = useToast();
  const toastRef = useRef<ToastId>();
  const btnRef = useRef<HTMLButtonElement>(null);

  const [hasBalance, setHasBalance] = useState(false);
  // const { chainId, library } = useEthers();
  const contract = new Contract(contractAddress, ERC20_ABI);
  const { account, chainId } = useEthers();
  const { state, send } = useContractFunction(contract as unknown as TypedContract, 'transfer');
  const tokenBalance = useTokenBalance(contractAddress, account);
  const balance = tokenBalance && formatUnits(tokenBalance as BigNumber, 18);
  const isRinkeby = chainId === Rinkeby.chainId;
  const bgColor = useColorModeValue('blue.200', 'gray.700');
  const headingColor = useColorModeValue('blue.600', 'blue.200');

  const addToast = () => {
    toastRef.current = toast({
      title: `Token transfer 💰`,
      description: `Sending ${formData.amount} token to ${formData.toAddress}`,
      status: 'info',
      variant: 'subtle',
      // eslint-disable-next-line unicorn/no-null
      duration: null,
    });
  };
  const updateToast = useCallback(
    (options: Omit<UseToastOptions, 'variant'>) => {
      if (toastRef.current) {
        toast.update(toastRef.current, options);
      }
    },
    [toast]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    const clean: number | string = typeof value === 'number' ? +value : value;
    setFormData((oldData) => ({ ...oldData, [name]: clean }));
  };

  const handleSubmit = async (values: FormDataProps, helpers: FormikHelpers<FormDataProps>) => {
    const { toAddress, amount } = formData;
    helpers.setSubmitting(true);

    addToast();

    try {
      if (!balance) {
        throw new Error('No token balance');
      }
      if (balance && amount && amount > 0) {
        await send(toAddress, parseEther(amount.toString()));
        helpers.setSubmitting(false);
      }
    } catch {
      helpers.setSubmitting(false);
    }
  };

  useEffect(() => {
    if (balance && (balance as unknown as number) > 0) {
      setHasBalance(true);
    }
  }, [balance, setHasBalance]);

  useEffect(() => {
    // console.log('state', state.status);
    try {
      switch (state.status) {
        case 'Exception': {
          throw new Error(`Error transfering tokens: ${state.errorMessage}`);
        }
        case 'Fail': {
          throw new Error(`Error transfering tokens: ${state.errorMessage}`);
        }
        case 'Success': {
          updateToast({
            title: `Token transfer 💰 `,
            description: (
              <VStack fontSize="md" align="flex-start" justify="left">
                <Text as="span">
                  🎉 Transfer complete 🎉
                  <br />
                  {formData.amount} tokens sent to {formData.toAddress}
                </Text>
                <Text as="span">Block number: {state.receipt?.blockNumber}</Text>
                <Text as="span">
                  <Link href={`https://rinkeby.etherscan.io/tx/${state.receipt?.transactionHash}`} isExternal>
                    View receipt
                  </Link>
                </Text>
              </VStack>
            ),
            status: 'success',
            duration: 9000,
            isClosable: true,
          });

          break;
        }
        case 'Mining': {
          updateToast({
            title: `Token transfer 💰`,
            description: `Waiting for confirmations 🕑 `,
            status: 'info',
          });

          break;
        }
        case 'PendingSignature': {
          updateToast({
            title: `Token transfer 💰`,
            description: `Signature pending 🕑...please sign the transaction`,
            status: 'info',
          });

          break;
        }
        case 'None': {
          break;
        }
        default: {
          throw new Error(`Unknown state: ${state.status}`);
        }
      }
    } catch {
      updateToast({
        title: `Token transfer 💰`,
        description: `${state.errorMessage}`,
        status: 'error',
        duration: 5000,
      });
    }
  }, [formData, state, state.status, toast, updateToast]);

  // useEffect(() => {
  //   if (state.status === 'PendingSignature') {
  //     throw new Error('Success');
  //   }
  // }, [state.status]);

  return (
    <Flex align="center" justify="center" data-testid="transfer">
      <Formik initialValues={formData} onSubmit={handleSubmit} validateOnBlur>
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
            {isRinkeby ? (
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
                    name="transfer-btn"
                    _hover={{
                      bg: 'blue.500',
                    }}
                    isLoading={helpers.isSubmitting}
                    isDisabled={helpers.isSubmitting || !helpers.isValid || !hasBalance}
                    type="submit"
                    aria-label="Transfer tokens"
                  >
                    {!hasBalance ? 'No token balance' : 'Transfer'}
                  </Button>
                </Stack>
              </Form>
            ) : (
              <VStack>
                <Text fontSize="inherit">Transfers only supported on Rinkeby</Text>
                <NetworkSwitcher />
              </VStack>
            )}
          </Stack>
        )}
      </Formik>
    </Flex>
  );
};

export default Transfer;
