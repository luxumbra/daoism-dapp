import { FC, useEffect, useRef, useState } from 'react';

import {
  Button,
  Box,
  Text,
  HStack,
  VStack,
  Spinner,
  Badge,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { useConfig, useEthers } from '@usedapp/core';

import { getNetworkValidity, getSupportedChains, getValidChainName, NetworkValidity } from '@daoism/lib/helpers';

export const NetworkSwitcher: FC = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);
  const networkBtnRef = useRef<HTMLButtonElement>(null);
  const mismatchRef = useRef<HTMLParagraphElement>(null);
  const [isSwitching, setIsSwitching] = useState(false);
  const { readOnlyUrls } = useConfig();
  const [switched, setSwitched] = useState<boolean>(false);
  const [toChainId, setToChainId] = useState<number | undefined>();
  const { active, chainId, switchNetwork, isLoading, error: ethersError } = useEthers();
  const supportedChains = getSupportedChains(readOnlyUrls);
  const [isValidNetwork, setIsValidNetwork] = useState<NetworkValidity>(false);

  const handleNetworkSwitch = async (toNetwork: number): Promise<void> => {
    setIsSwitching(true);
    setToChainId(toNetwork);

    try {
      if (toNetwork !== chainId) {
        await switchNetwork(toNetwork);
        setSwitched(true);
      }

      if (!isLoading) {
        setIsSwitching(false);
      }

      setIsSwitching(false);
    } catch (error) {
      setIsSwitching(false);
      setSwitched(false);
      // eslint-disable-next-line no-console
      console.log('handleNetworkSwitch error', { ethersError, error });
    }
  };

  useEffect(() => {
    if (chainId) {
      setIsValidNetwork(() => getNetworkValidity(chainId, supportedChains));
    }
  }, [chainId, supportedChains, setIsValidNetwork, active]);

  useEffect(() => {
    if (chainId === toChainId && !isSwitching) {
      setSwitched(true);
    }
    setSwitched(false);
  }, [chainId, isValidNetwork, isSwitching, toChainId]);

  useEffect(() => {
    if (switched) {
      onClose();
    }
  }, [switched, onClose]);

  return (
    <>
      <HStack align="center" justify="flex-end">
        {!isValidNetwork && (
          <Text ref={mismatchRef} as="span" fontSize="sm" color="red.600">
            r0ng network
          </Text>
        )}
        <Button ref={networkBtnRef} colorScheme={isValidNetwork ? 'blue' : 'red'} size="sm" onClick={onOpen}>
          Change network
        </Button>
      </HStack>
      <Drawer
        placement="right"
        isOpen={isOpen}
        onClose={onClose}
        finalFocusRef={btnRef}
        size="md"
        colorScheme="blue"
        blockScrollOnMount
      >
        <DrawerOverlay bgColor={useColorModeValue('blueGlassAlpha', 'blueGlassAlphaDark')} backdropFilter="blur(7px)" />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader bgColor={useColorModeValue('blue.300', 'blue.900')} alignItems="center">
            <HStack justify="space-between" pr={6}>
              <Text as="h3" color={useColorModeValue('blue.600', 'blue.100')} my={0}>
                Change network
              </Text>
              {chainId && (
                <Badge colorScheme="green" fontSize="lg" variant="subtle">
                  {getValidChainName(chainId)}
                </Badge>
              )}
            </HStack>
          </DrawerHeader>
          <DrawerBody
            bgColor={useColorModeValue('blue.200', 'blue.800')}
            color={useColorModeValue('blue.600', 'blue.100')}
          >
            <Box
              sx={{
                button: {
                  colorScheme: 'blue',
                },
              }}
            >
              <HStack spacing={5}>
                {supportedChains && supportedChains.length > 0 && (
                  <>
                    {supportedChains.map((network) => (
                      <Button
                        key={`networkbtn-${network}`}
                        onClick={() => handleNetworkSwitch(network)}
                        isDisabled={!!(chainId === network)}
                      >
                        {getValidChainName(network)}
                      </Button>
                    ))}
                  </>
                )}
              </HStack>
              <VStack spacing={2} mt={5}>
                {isSwitching && toChainId && (
                  <>
                    <Spinner />
                    <Text fontSize="inherit">Switching network to {getValidChainName(toChainId)}</Text>
                  </>
                )}
              </VStack>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

NetworkSwitcher.defaultProps = {
  isValid: undefined,
  networks: [1, 4, 137],
};
