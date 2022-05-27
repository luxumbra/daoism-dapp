import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  IconButton,
  SimpleGrid,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import { ChainId, Mainnet, Polygon, Rinkeby, useChainMeta, useEtherBalance, useEthers, useLookupAddress, useTokenBalance } from "@usedapp/core";
import { utils } from "ethers";
import { formatEther } from '@ethersproject/units'
import { FC, useRef } from "react";
import { MdAccountBalanceWallet } from "react-icons/md";
import { useDisplayAccount } from "../lib/hooks/useDisplayAccount";

import { rinkebyTokens } from "../lib/constants"

interface ProfileProps {
  user: string;
}

export const Profile: FC<ProfileProps> = ({ user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef<HTMLButtonElement>(null);
  const { ens, isLoading, error } = useLookupAddress(user)
  const displayUser = useDisplayAccount(user, ens);
  const { chainId } = useEthers()
  const networkBalance = useEtherBalance(user, { chainId: chainId });
  const waffleBalance = useTokenBalance(rinkebyTokens.waffle, user);
  const wethBalance = useTokenBalance(rinkebyTokens.weth, user);
  const gloveBalance = useTokenBalance(rinkebyTokens.glove, user);
  const { formatUnits } = utils;
  const currentChainName = (id: number) => {
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
  console.log(Rinkeby);


  const isValidNetwork = chainId && currentChainName(chainId) !== 'Unsupported' ? true : false;

  console.log(waffleBalance, wethBalance, gloveBalance);


  return (
    <>
      <IconButton icon={<MdAccountBalanceWallet size="3xl" />} aria-label="Open wallet" colorScheme="ghost" onClick={onOpen} />
      <Drawer placement="right" isOpen={isOpen} onClose={onClose} finalFocusRef={btnRef} size="md" colorScheme="blue">
        <DrawerOverlay bgColor="blueGlassAlpha" backdropFilter="blur(7px)" />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader bgColor="blue.900" alignItems="center">
            <Text as="h3" color="blue.200" my={0}>{displayUser}{"'s"} profile</Text>
          </DrawerHeader>
          <DrawerBody bgColor="blue.700">
            <Box>
              <HStack>
                <Box>
                  <SimpleGrid>
                    {!isLoading ? (
                      <Box>
                        {isValidNetwork && networkBalance ? (
                          <>
                          <Text as="h4">Balances:</Text>
                            <Text>{`Current chain (${chainId && currentChainName(chainId)}) ${formatEther(networkBalance)}`}</Text>
                        <Text>{`wETH: ${wethBalance ? formatUnits(wethBalance, 18) : '0'}`}</Text>
                        <Text>{`Waffle: ${waffleBalance ? formatUnits(waffleBalance, 18) : '0'}`}</Text>
                            <Text>{`Glove: ${gloveBalance ? formatUnits(gloveBalance, 18) : '0'}`}</Text>
                            </>
                        ) : (
                            <Text>Unsupported network</Text>
                        )}
                      </Box>
                    ) : (
                      <Text>Loading...</Text>
                    )}
                  </SimpleGrid>

                </Box>
              </HStack>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}