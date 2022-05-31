import { FC } from 'react';

import { Box, Text } from '@chakra-ui/react';
import { NodeUrls, useConfig, useEthers, useLookupAddress } from '@usedapp/core';

import { AppDrawer } from '@daoism/components/AppDrawer';
import Balances from '@daoism/components/Balances';
import Mint from '@daoism/components/Mint';
import { NetworkSwitcher } from '@daoism/components/NetworkSwitcher';
import Transfer from '@daoism/components/Transfer';
import { tokenList } from '@daoism/lib/constants';
import { getValidChainName } from '@daoism/lib/helpers';
import { useDisplayAccount } from '@daoism/lib/hooks/useDisplayAccount';

interface ProfileProps {
  user: string;
  networks: number[] | undefined;
}

export const Profile: FC<ProfileProps> = ({ user, networks }) => {
  const { ens } = useLookupAddress(user);
  const displayUser = useDisplayAccount(user, ens);
  const { chainId } = useEthers();
  const isValidNetwork: boolean | undefined = !!(chainId && getValidChainName(chainId) !== 'Unsupported');

  return (
    <AppDrawer type="profile" isValidNetwork headerTitle={`${displayUser}'s profile`}>
      <Box>
        <NetworkSwitcher isValid={isValidNetwork} currentNetwork={chainId} networks={networks} />
        <Box>
          {chainId && isValidNetwork ? (
            <Balances user={user} network={chainId} tokens={tokenList} />
          ) : (
            <Text>Unsupported network</Text>
          )}
        </Box>
        <Transfer />
        <Mint />
      </Box>
    </AppDrawer>
  );
};
