import { FC, useEffect, useState } from 'react';

import { HStack, IconButton } from '@chakra-ui/react';
import { useConfig, useEthers } from '@usedapp/core';
import { MdLogin, MdLogout } from 'react-icons/md';

import { NetworkSwitcher } from '@daoism/components/NetworkSwitcher';
import { Profile } from '@daoism/components/Profile';
import { getSupportedChains, getNetworkValidity, NetworkValidity } from '@daoism/lib/helpers';
import { useDisplayAccount } from '@daoism/lib/hooks/useDisplayAccount';

/**
 * Connects to a Web3 wallet (only Metamask for now) and enables the users profile
 * @returns JSX.Element
 */
export const Web3Connect: FC = () => {
  const { active, chainId, account, activateBrowserWallet, deactivate, error: ethersError } = useEthers();
  const accountDisplay = useDisplayAccount(account);
  const { readOnlyUrls } = useConfig();
  const supportedChains = getSupportedChains(readOnlyUrls);
  const [activationError, setActivationError] = useState<string>('');
  const [isValidNetwork, setIsValidNetwork] = useState<NetworkValidity>(false);
  const activateUser = async () => {
    setActivationError('');
    activateBrowserWallet();
  };

  const deactivateUser = async () => {
    await deactivate();
    setActivationError('');
  };
  const toggleConnect = async () => {
    try {
      await (!account ? activateUser() : deactivateUser());
    } catch {
      setActivationError('Error activating user');
      // eslint-disable-next-line no-console
      console.log('Account toggle error:', { ethersError });
      // TODO: add in Sentry/Honeybadger integration
    }
  };

  try {
    if (!isValidNetwork && ethersError) {
      throw new Error("Can't connect to a network that isn't supported");
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Web3Connect errors:', { error, ethersError });
  }

  useEffect(() => {
    if (active) {
      setIsValidNetwork(() => getNetworkValidity(chainId, supportedChains));
    }
  }, [chainId, supportedChains, active, setIsValidNetwork, isValidNetwork]);

  return (
    <HStack justify="flex-end" px={0}>
      {active && account !== undefined && activationError.length === 0 && isValidNetwork && (
        <>
          {accountDisplay}
          <Profile user={account} />
        </>
      )}
      {!isValidNetwork && active && account && <NetworkSwitcher isValid={isValidNetwork} networks={supportedChains} />}

      <IconButton
        icon={account ? <MdLogout /> : <MdLogin />}
        aria-label={account ? 'Logout' : 'Login'}
        data-testid="connect-button"
        color="inherit"
        colorScheme="ghost"
        fontSize={{ base: '3xl', lg: '3xl' }}
        onClick={toggleConnect}
      />
    </HStack>
  );
};
