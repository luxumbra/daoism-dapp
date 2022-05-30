import { FC } from 'react';

import { Box, Text } from '@chakra-ui/react';
import { useEthers, useLookupAddress } from '@usedapp/core';

import { AppDrawer } from '@daoism/components/AppDrawer';
import Balances from '@daoism/components/Balances';
import Mint from '@daoism/components/Mint';
import Transfer from '@daoism/components/Transfer';
import { tokenList } from '@daoism/lib/constants';
import { getCurrentChainName } from '@daoism/lib/helpers';
import { useDisplayAccount } from '@daoism/lib/hooks/useDisplayAccount';

interface ProfileProps {
  user: string;
}

export const Profile: FC<ProfileProps> = ({ user }) => {
  const { ens, isLoading, error } = useLookupAddress(user);
  const displayUser = useDisplayAccount(user, ens, error);
  const { chainId } = useEthers();
  const isValidNetwork: boolean | undefined = !!(chainId && getCurrentChainName(chainId) !== 'Unsupported');

  return (
    <AppDrawer type="profile" isValidNetwork headerTitle={`${displayUser}'s profile`}>
      <Box>
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
