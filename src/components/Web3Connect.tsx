import { FC, useEffect, useState } from 'react';

import { HStack, Button, Text, useColorModeValue } from '@chakra-ui/react';
import { useConfig, useEthers, useLookupAddress } from '@usedapp/core';

import { NetworkSwitcher } from '@daoism/components/NetworkSwitcher';
import { Profile } from '@daoism/components/Profile';
import { useDisplayAccount } from '@daoism/lib/hooks/useDisplayAccount';

export type NetworkValidity = boolean | undefined;
export const getNetworkValidity = (id: number | undefined, networks: number[] | undefined): NetworkValidity => {
  const check = () => !!id && networks?.includes(id);

  try {
    return check();
  } catch (error) {
    console.log('Network validity error', error);
    throw error;
  }
};

export const Web3Connect: FC = () => {
  const { active, chainId, account, activateBrowserWallet, deactivate, error } = useEthers();
  const { ens, isLoading, error: ensError } = useLookupAddress(account);
  const accountDisplay = useDisplayAccount(account, ens, ensError);
  const { readOnlyUrls } = useConfig();
  const validNetworkIds: number[] | undefined =
    readOnlyUrls && Object.keys(readOnlyUrls).map((key) => Number.parseInt(key, 10));
  const [isValidNetwork, setIsValidNetwork] = useState<NetworkValidity>(false);

  const toggleConnect = async () => {
    try {
      if (!account) {
        activateBrowserWallet();
      } else {
        deactivate();
      }
    } catch (error_) {
      throw new Error(`Error activating wallet ${error_}`);
    }
  };

  useEffect(() => {
    if (active) {
      setIsValidNetwork(() => getNetworkValidity(chainId, validNetworkIds));
    }
  }, [chainId, validNetworkIds, active, setIsValidNetwork]);

  return (
    <HStack>
      {!isLoading && account && isValidNetwork && (
        <>
          <Text as="span" size="sm">
            {accountDisplay}
          </Text>
          <Profile user={account} />
        </>
      )}
      {!isLoading && !isValidNetwork && account && <NetworkSwitcher isValid={isValidNetwork} />}
      {isLoading && account && <Text size="sm">Loading account...</Text>}
      <Button
        size="sm"
        variant="solid"
        bgColor={useColorModeValue('gray.700', 'gray.400')}
        color={useColorModeValue('gray.400', 'gray.700')}
        _hover={{
          bgColor: useColorModeValue('gray.600', 'gray.300'),
        }}
        onClick={toggleConnect}
      >
        {!account ? 'Connect' : 'Disconnect'}
      </Button>
    </HStack>
  );
};
