import { FC, useEffect, useRef, useState } from 'react';

import { Button, Box, useToast, ToastId, HStack } from '@chakra-ui/react';
import { useEthers } from '@usedapp/core';

import { AppDrawer } from '@daoism/components/AppDrawer';
import { getValidChainName } from '@daoism/lib/helpers';

interface NetworkSwitcherProps {
  isValid: boolean | undefined;
  currentNetwork?: number | undefined;
  networks: number[] | undefined;
}
export const NetworkSwitcher: FC<NetworkSwitcherProps> = ({ isValid, currentNetwork, networks }): JSX.Element => {
  const [isSwitching, setIsSwitching] = useState(false);
  const { chainId, switchNetwork, error } = useEthers();
  const toast = useToast();
  const toastId = 'switch-network';
  const toastRef = useRef<ToastId>();
  console.log('NetworkSwitcher', { isValid, currentNetwork, networks });
  console.log('NetworkSwitcher', { chainId, error, isSwitching });

  // const createToast = () => {
  //   toastRef.current = toast({
  //     id: toastId,
  //     description: `Switching network...`,
  //     status: 'info',
  //     variant: 'subtle',
  //     duration: null,
  //   });
  // };

  const handleNetworkSwitch = (network: number) => {
    console.log('handleNetworkSwitch', { network });

    // try {
    //   // if (!isSwitching) {
    //   // }
    //   if (!isSwitching) {
    //     setIsSwitching(true);
    //     switchNetwork(network);
    //     toast({
    //       id: toastId,
    //       description: `Switching network...`,
    //       status: 'info',
    //       variant: 'subtle',
    //       duration: 5000,
    //     });
    //     // return;
    //   }

    //   if (currentNetwork === network && toastRef.current) {
    //     setIsSwitching(false);
    //     toast.update(toastRef.current, {
    //       description: `Switched to ${network}`,
    //       status: 'success',
    //       duration: 3000,
    //     });
    //     // return;
    //   }
    //   throw new Error(`Switching to ${getValidChainName(network)} failed`);
    // } catch (error_) {
    //   setIsSwitching(false);
    //   // console.log('chainId after error', chainId, network, error);

    //   // if (toastRef.current)
    //   //   toast.update(toastId, {
    //   //     title: `Switch network: description: Error: ${error_}`,
    //   //     status: 'error',
    //   //     duration: 5000,
    //   //   });
    // } finally {
    //   if (toastRef.current) {
    //     toast.update(toastRef.current, { duration: 3000 });
    //   }
    //   setIsSwitching(false);
    // }
  };

  useEffect(() => {
    if (chainId === currentNetwork && toastRef.current) {
      toast.update(toastRef.current, {
        description: `Switched to ${chainId}`,
        status: 'success',
        duration: 3000,
      });
    }
  }, [chainId, currentNetwork, toast]);

  return (
    <AppDrawer headerTitle="Change network" isValidNetwork={isValid} type="network">
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
      </Box>
    </AppDrawer>
  );
};

NetworkSwitcher.defaultProps = {
  currentNetwork: 4,
};
