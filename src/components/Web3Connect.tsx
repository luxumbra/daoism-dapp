import { FC, useRef, useState } from 'react';

import { HStack, Button, Text } from '@chakra-ui/react';
import { useEthers, useLookupAddress } from '@usedapp/core';

import { NetworkSwitcher } from '@daoism/components/NetworkSwitcher';
import { Profile } from '@daoism/components/Profile';
import { getCurrentChainName } from '@daoism/lib/helpers';
import { useDisplayAccount } from '@daoism/lib/hooks/useDisplayAccount';

export const Web3Connect: FC = () => {
  const { account, activateBrowserWallet, deactivate } = useEthers();
  const { ens, isLoading, error } = useLookupAddress(account);
  const accountDisplay = useDisplayAccount(account, ens);
  const { active, chainId, switchNetwork } = useEthers();
  const [networkSwitcher, setNetworkSwitcher] = useState(false);

  const isValidNetwork = useRef<boolean>(!!(chainId && getCurrentChainName(chainId) !== 'Unsupported'));

  const toggleConnect = () => {
    !account ? activateBrowserWallet() : deactivate();
  };

  return (
    <HStack>
      {!isLoading && isValidNetwork.current && account && (
        <>
          <Text as="span" size="sm">
            {accountDisplay}
          </Text>
          <Profile user={account} />
        </>
      )}
      {!isLoading && !isValidNetwork.current && account && (
        <>
          <Text as="span" fontSize="sm">
            Unsupported network
          </Text>
          <NetworkSwitcher />
        </>
      )}
      {isLoading && <Text size="sm">Loading account...</Text>}
      <Button size="sm" colorScheme="blue" onClick={toggleConnect}>
        {!account ? 'Connect' : 'Disconnect'}
      </Button>
    </HStack>
  );
};
