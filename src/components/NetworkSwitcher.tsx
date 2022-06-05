import { FC, useEffect, useState } from 'react';

import { Button, Box, Text, HStack, VStack, Spinner } from '@chakra-ui/react';
import { useEthers } from '@usedapp/core';

import { AppDrawer } from '@daoism/components/AppDrawer';
import { getValidChainName } from '@daoism/lib/helpers';

interface NetworkSwitcherProps {
  isValid?: boolean | undefined;
  networks?: number[] | undefined;
}
export const NetworkSwitcher: FC<NetworkSwitcherProps> = ({ isValid, networks }): JSX.Element => {
  const [isSwitching, setIsSwitching] = useState(false);
  const [switched, setSwitched] = useState<boolean>(false);
  const [toChainId, setToChainId] = useState<number | undefined>();
  const { chainId, switchNetwork, isLoading, error: ethersError } = useEthers();

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
    if (chainId === toChainId && !isSwitching) {
      setSwitched(true);
    }
    setSwitched(false);
  }, [chainId, isValid, networks, isSwitching, toChainId]);

  return (
    <AppDrawer headerTitle="Change network" isValidNetwork={isValid} type="network" closeDrawer={switched}>
      <Box
        sx={{
          button: {
            colorScheme: 'blue',
          },
        }}
      >
        <HStack spacing={5}>
          {networks && networks.length > 0 && (
            <>
              {networks.map((network) => (
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
    </AppDrawer>
  );
};

NetworkSwitcher.defaultProps = {
  isValid: undefined,
  networks: [1, 4, 137],
};
