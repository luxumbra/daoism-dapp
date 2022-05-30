import { FC, useState } from 'react';

import { Button, Box, SimpleGrid, Text } from '@chakra-ui/react';
import { useEthers, Mainnet, Rinkeby, Polygon } from '@usedapp/core';

import { AppDrawer } from '@daoism/components/AppDrawer';

interface NetworkSwitcherProps {
  isValid: boolean | undefined;
}
export const NetworkSwitcher: FC<NetworkSwitcherProps> = ({ isValid }): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const { chainId, switchNetwork } = useEthers();

  const handleNetworkSwitch = async (network: number) => {
    try {
      switchNetwork(network);
    } catch (error) {
      console.log('switchNetwork error', error);
    }
  };

  return (
    <AppDrawer headerTitle="Change network" isValidNetwork={isValid} type="network">
      <Box>
        {!isLoading ? (
          <SimpleGrid columns={3} spacing={5}>
            <Box>
              <Button onClick={() => handleNetworkSwitch(Mainnet.chainId)}>Eth Mainnet</Button>
            </Box>
            <Box>
              <Button onClick={() => handleNetworkSwitch(Rinkeby.chainId)}>Rinkeby</Button>
            </Box>
            <Box>
              <Button onClick={() => handleNetworkSwitch(Polygon.chainId)}>Polygon</Button>
            </Box>
          </SimpleGrid>
        ) : (
          <Text>Loading...</Text>
        )}
      </Box>
    </AppDrawer>
  );
};
