import { FC, useCallback, useEffect, useRef, useState } from 'react';

import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
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
import { parseEther } from '@ethersproject/units';
import { Rinkeby, useContractFunction, useEthers } from '@usedapp/core';
import { TypedContract } from '@usedapp/core/dist/esm/src/model/types';
import { Formik, Field, Form, FormikHelpers, FormikState, FieldInputProps } from 'formik';

import ERC20_ABI from '@daoism/abis/erc20.abi.json';
import { NetworkSwitcher } from '@daoism/components/NetworkSwitcher';
import { FormDataProps } from '@daoism/components/Transfer';
import { contractAddress } from '@daoism/lib/constants';
import { copyString, validateAddress, validateAmount } from '@daoism/lib/helpers';

/**
 * TODO: Buidl a custom component that can be used to mint tokens
 * @returns JSX.Element
 * */
const Mint: FC = () => {
  // store the form values
  const [formData, setFormData] = useState<FormDataProps>({
    contract: contractAddress,
    toAddress: '',
    amount: 0,
  });
  const toast = useToast();
  const toastRef = useRef<ToastId>();
  const btnRef = useRef<HTMLButtonElement>(null);
  const { chainId, error: ethersError } = useEthers();
  const contract = new Contract(contractAddress, ERC20_ABI);
  const { state, send } = useContractFunction(contract as unknown as TypedContract, 'mintTo');

  const bgColor = useColorModeValue('blue.200', 'gray.700');
  const headingColor = useColorModeValue('blue.600', 'blue.200');

  const isRinkeby = chainId === Rinkeby.chainId;

  const addToast = () => {
    toastRef.current = toast({
      id: 'mint-toast',
      title: `Mint token 💰`,
      description: `Minting ${formData.amount} token to ${formData.toAddress}`,
      status: 'info',
      variant: 'subtle',
      duration: null,
    });
  };
  const updateToast = useCallback(
    (options: Omit<UseToastOptions, 'id'>) => {
      if (toastRef.current) {
        toast.update(toastRef.current, { ...options });
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
      if (amount && amount > 0 && toAddress) {
        await send(toAddress, parseEther(amount.toString()));
      }
      helpers.setSubmitting(false);
    } catch {
      helpers.setSubmitting(false);
    }
  };

  useEffect(() => {
    try {
      switch (state.status) {
        case 'Exception': {
          throw new Error(`Error minting tokens: ${state.errorMessage}`);
        }
        case 'Fail': {
          throw new Error(`Error minting tokens: ${state.errorMessage}`);
        }
        case 'Success': {
          updateToast({
            title: `Token mint 💰`,
            description: (
              <VStack fontSize="md" align="flex-start" justify="left">
                <Text as="span">
                  🎉 Token mint complete 🎉
                  <br />
                  {formData.amount} tokens minted &amp; sent to {formData.toAddress}
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
            title: `Token mint 💰`,
            description: `Waiting for confirmations 🕑 `,
            status: 'info',
          });

          break;
        }
        case 'PendingSignature': {
          updateToast({
            title: `Token mint 💰`,
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
        title: `Token mint 💰`,
        description: `${state.errorMessage}`,
        status: 'error',
        duration: 5000,
      });
    }
  }, [formData, state, state.status, toast, updateToast]);

  return (
    <Flex align="center" justify="center" data-testid="mint-component">
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
            {isRinkeby ? (
              <Form>
                <Field
                  name="toAddress"
                  validate={helpers.touched.toAddress && (() => validateAddress(formData.toAddress))}
                >
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
                <Field name="amount" validate={helpers.touched.amount && (() => validateAmount(formData.amount))}>
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
                    Mint
                  </Button>
                </Stack>
              </Form>
            ) : (
              <VStack>
                <Text fontSize="inherit">Minting only supported on Rinkeby</Text>
                <NetworkSwitcher />
              </VStack>
            )}
          </Stack>
        )}
      </Formik>
    </Flex>
  );
};
export default Mint;
