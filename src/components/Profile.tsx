import { FC, useEffect, useRef, useState } from 'react';

import {
  Badge,
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  IconButton,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { useConfig, useEthers } from '@usedapp/core';
import { MdAccountBalanceWallet } from 'react-icons/md';

import Balances from '@daoism/components/Balances';
import Mint from '@daoism/components/Mint';
import { NetworkSwitcher } from '@daoism/components/NetworkSwitcher';
import Transfer from '@daoism/components/Transfer';
import { tokenList } from '@daoism/lib/constants';
import { getNetworkValidity, getSupportedChains, getValidChainName, NetworkValidity } from '@daoism/lib/helpers';
import { useDisplayAccount } from '@daoism/lib/hooks/useDisplayAccount';

interface ProfileProps {
  user: string;
}

export const Profile: FC<ProfileProps> = ({ user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);
  const userAccountString = useDisplayAccount(user, 'string');
  const { active, chainId, error: ethersError } = useEthers();
  const { readOnlyUrls } = useConfig();
  const supportedChains = getSupportedChains(readOnlyUrls);
  const [isValidNetwork, setIsValidNetwork] = useState<NetworkValidity>(false);
  const profileIconColor = useColorModeValue('gray.700', 'gray.300');
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
    <>
      <IconButton
        ref={btnRef}
        icon={<MdAccountBalanceWallet />}
        aria-label="Open wallet"
        colorScheme="ghost"
        color={profileIconColor}
        fontSize={{ base: '3xl', lg: '3xl' }}
        onClick={onOpen}
      />
      <Drawer
        placement="right"
        isOpen={isOpen}
        onClose={onClose}
        finalFocusRef={btnRef}
        size="md"
        colorScheme="blue"
        blockScrollOnMount
        data-testid="profile-component"
      >
        <DrawerOverlay bgColor={useColorModeValue('blueGlassAlpha', 'blueGlassAlphaDark')} backdropFilter="blur(7px)" />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader bgColor={useColorModeValue('blue.300', 'blue.900')} alignItems="center">
            <HStack justify="space-between" pr={6}>
              <Text as="h3" color={useColorModeValue('blue.600', 'blue.100')} my={0}>
                {`${userAccountString}`}
              </Text>
              {chainId && (
                <Badge colorScheme="green" fontSize="lg" variant="subtle">
                  {getValidChainName(chainId)}
                </Badge>
              )}
            </HStack>
          </DrawerHeader>
          <DrawerBody
            bgColor={useColorModeValue('blue.200', 'blue.800')}
            color={useColorModeValue('blue.600', 'blue.100')}
          >
            <NetworkSwitcher />
            <Box>
              {chainId && isValidNetwork ? (
                <Balances user={user} network={chainId} tokens={tokenList} />
              ) : (
                <Text>Unsupported network</Text>
              )}
            </Box>
            <Transfer />
            <Mint />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
