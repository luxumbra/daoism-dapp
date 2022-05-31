import { FC, useEffect, useState } from 'react';

import { HStack, Text, IconButton, useToast } from '@chakra-ui/react';
import { useConfig, useEthers, useLookupAddress } from '@usedapp/core';
import { MdLogin, MdLogout } from 'react-icons/md';

import { NetworkSwitcher } from '@daoism/components/NetworkSwitcher';
import { Profile } from '@daoism/components/Profile';
import { getSupportedChains } from '@daoism/lib/helpers';
import { useDisplayAccount } from '@daoism/lib/hooks/useDisplayAccount';

export type NetworkValidity = boolean | undefined;
export const getNetworkValidity = (id: number | undefined, networks: number[] | undefined): NetworkValidity => {
  const check = () => !!id && networks?.includes(id);

  try {
    const test = check();
    return test;
  } catch (error) {
    console.log('Network Error:', error);

    return false;
    // TODO: Add sentry/honeybadger integration
  }
};

/**
 * Connects to a Web3 wallet (only Metamask for now) and enables the users profile
 * @returns {JSX.Element}
 */
export const Web3Connect: FC = () => {
  const { active, chainId, account, activateBrowserWallet, deactivate, error } = useEthers();
  const { ens, isLoading, error: ensError } = useLookupAddress(account);
  const accountDisplay = useDisplayAccount(account, ens, ensError);
  const { readOnlyUrls } = useConfig();
  const supportedChains = getSupportedChains(readOnlyUrls);
  const [isValidNetwork, setIsValidNetwork] = useState<NetworkValidity>(false);
  const toast = useToast();

  const toggleConnect = async () => {
    try {
      if (!account) {
        activateBrowserWallet();
        // if (error) {
        //   toast({
        //     title: 'Unsupported newtwork',
        //     description: `Error: ${error.message}`,
        //     status: 'error',
        //     duration: 5000,
        //   });
        // }
      } else {
        deactivate();
      }
    } catch (error_) {
      toast({
        title: 'Unsupported newtwork',
        description: `Error activating wallet ${error_}`,
        status: 'error',
        duration: 5000,
      });
      // TODO: add in Sentry/Honeybadger integration
    }
  };

  useEffect(() => {
    if (active) {
      setIsValidNetwork(() => getNetworkValidity(chainId, supportedChains));
    }
  }, [chainId, supportedChains, active, setIsValidNetwork]);

  return (
    <HStack justify="flex-end" px={0}>
      {!isLoading && account && isValidNetwork && (
        <>
          <Text as="span" fontSize={{ base: 'xl', xl: 'sm' }}>
            {accountDisplay}
          </Text>
          <Profile user={account} networks={supportedChains} />
        </>
      )}
      {!isLoading && !isValidNetwork && account && (
        <NetworkSwitcher isValid={isValidNetwork} networks={supportedChains} />
      )}
      {isLoading && account && (
        <Text as="span" size="xs">
          Loading account...
        </Text>
      )}
      <IconButton
        icon={account ? <MdLogout /> : <MdLogin />}
        aria-label={account ? 'Logout' : 'Login'}
        color="inherit"
        colorScheme="ghost"
        fontSize="3xl"
        onClick={toggleConnect}
      />
    </HStack>
  );
};
