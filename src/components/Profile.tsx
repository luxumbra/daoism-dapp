import { FC, useEffect, useState } from 'react';

import { Box, Text } from '@chakra-ui/react';
import { useConfig, useEthers } from '@usedapp/core';

import { AppDrawer } from '@daoism/components/AppDrawer';
import Balances from '@daoism/components/Balances';
import Mint from '@daoism/components/Mint';
import { NetworkSwitcher } from '@daoism/components/NetworkSwitcher';
import Transfer from '@daoism/components/Transfer';
import { tokenList } from '@daoism/lib/constants';
import { getNetworkValidity, getSupportedChains, NetworkValidity } from '@daoism/lib/helpers';
import { useDisplayAccount } from '@daoism/lib/hooks/useDisplayAccount';

interface ProfileProps {
  user: string;
}

export const Profile: FC<ProfileProps> = ({ user }) => {
  const userAccountString = useDisplayAccount(user, 'string');
  const { active, chainId, error: ethersError } = useEthers();
  const { readOnlyUrls } = useConfig();
  const supportedChains = getSupportedChains(readOnlyUrls);
  const [isValidNetwork, setIsValidNetwork] = useState<NetworkValidity>(false);

  try {
    if (!userAccountString) {
      throw new Error("Can't find user's account");
    }
    if (!active && chainId) {
      throw new Error('No account active');
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Profile ethers:', { error, ethersError });
  }

  useEffect(() => {
    if (chainId) {
      setIsValidNetwork(() => getNetworkValidity(chainId, supportedChains));
    }
  }, [chainId, supportedChains, setIsValidNetwork, active]);

  return (
    <AppDrawer type="profile" isValidNetwork headerTitle={`${userAccountString}`}>
      <Box>
        <NetworkSwitcher networks={supportedChains} />
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
