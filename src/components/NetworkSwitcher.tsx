import { FC, useRef, useState } from 'react';

import {
  useDisclosure,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Box,
  HStack,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { useEthers, Mainnet, Rinkeby, Polygon } from '@usedapp/core';

export const NetworkSwitcher: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { chainId, switchNetwork } = useEthers();

  const handleNetworkSwitch = async (network: number) => {
    try {
      switchNetwork(network);
      return true;
    } catch (error) {
      console.log('switchNetwork error', error);
      return false;
    }
  };

  return (
    <>
      <Button colorScheme="blue" size="sm" onClick={onOpen}>
        Change network
      </Button>
      <Drawer placement="right" isOpen={isOpen} onClose={onClose} finalFocusRef={btnRef} size="md" colorScheme="blue">
        <DrawerOverlay bgColor="blueGlassAlpha" backdropFilter="blur(7px)" />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader bgColor="blue.900" alignItems="center">
            <Text as="h3" color="blue.200" my={0}>
              Choose your network
            </Text>
          </DrawerHeader>
          <DrawerBody bgColor="blue.700">
            <Box>
              <HStack>
                <Box>
                  {!isLoading ? (
                    <SimpleGrid>
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
              </HStack>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
