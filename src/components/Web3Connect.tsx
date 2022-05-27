import { Box, HStack, Button, Text, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, SimpleGrid, useDisclosure } from "@chakra-ui/react"
import { FC, useEffect, useRef, useState } from "react"
import { Mainnet, DAppProvider, useEtherBalance, useEthers, Config, useLookupAddress, Polygon, Rinkeby } from '@usedapp/core'
import { Profile } from "./Profile"
import { useDisplayAccount } from "../lib/hooks/useDisplayAccount"


export const Web3Connect: FC = () => {
  const { account, activateBrowserWallet, deactivate } = useEthers()
  const { ens, isLoading, error } = useLookupAddress(account)
  const accountDisplay = useDisplayAccount(account, ens)
  const { active, chainId, switchNetwork } = useEthers()
  const [networkSwitcher, setNetworkSwitcher] = useState(false)
  const currentChainName = (id: number): string | null => {
    switch (id) {
      case Mainnet.chainId:
        return "Mainnet"
      case Rinkeby.chainId:
        return "Rinkeby"
      case Polygon.chainId:
        return "Polygon"
      default:
        return "Unsupported"
    }
  }
  const isValidNetwork = useRef<boolean>(chainId && currentChainName(chainId) !== 'Unsupported' ? true : false);


  const toggleConnect = () => {
    !account ? activateBrowserWallet() : deactivate()
    console.log(!account ? 'activateBrowserWallet' : 'deactivate');
    return
  }


  useEffect(() => {
    if (!isValidNetwork.current) {
      console.log('Unsupported network');
    } else {
      console.log('Valid network');
    }
    if (account && isValidNetwork.current) {
      console.log('Account: ', account);
    }

  }, [account, isValidNetwork]);

  return (
    <HStack >
      {!isLoading && isValidNetwork.current && account && (
        <>
          <Text as="span" size="sm">{accountDisplay}</Text>
          <Profile user={account} />
        </>
      )}
      {!isLoading && !isValidNetwork.current && account && (
        <>
          <Text as="span" fontSize="sm">Unsupported network</Text>
          <NetworkSwitcher />
        </>
      )}
      {isLoading && (
          <Text size="sm">Loading account...</Text>
      )}
      <Button size="sm" colorScheme="blue" onClick={toggleConnect}>{!account ? 'Connect' : 'Disconnect'}</Button>
    </HStack>
  )
}

export const NetworkSwitcher: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef<HTMLButtonElement>(null);
  const [isLoading, setIsLoading] = useState(false)
  const { chainId, switchNetwork } = useEthers()

  const handleNetworkSwitch = async (network: number) => {
    try {
      await switchNetwork(network)
      return true

    } catch (error) {
      console.log('switchNetwork error', error);
      return false

    }
  }

  return (
    <>
      <Button colorScheme="blue" size="sm" onClick={onOpen}>Change network</Button>
      <Drawer placement="right" isOpen={isOpen} onClose={onClose} finalFocusRef={btnRef} size="md" colorScheme="blue">
        <DrawerOverlay bgColor="blueGlassAlpha" backdropFilter="blur(7px)" />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader bgColor="blue.900" alignItems="center">
            <Text as="h3" color="blue.200" my={0}>Choose your network</Text>
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
  )
}