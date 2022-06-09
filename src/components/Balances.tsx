import { useEffect, useState } from 'react';

import {
  Box,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Spinner,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react';
import { formatEther } from '@ethersproject/units';
import { useEtherBalance, useToken, useTokenBalance } from '@usedapp/core';
import { BigNumber } from 'ethers';

import { TokenProps } from '@daoism/lib/constants';
import { displayBalance, getValidChainName } from '@daoism/lib/helpers';

export interface BalanceCardProps {
  token: string;
  user: string;
}
export function BalanceCard(props: BalanceCardProps) {
  const [infoLoading, setInfoLoading] = useState<boolean>(true);
  const { token, user } = props;
  const tokenInfo = useToken(token);
  const balance: BigNumber | undefined = useTokenBalance(token, user);

  useEffect(() => {
    try {
      if (user && balance) {
        setInfoLoading(false);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Balance card error', error);
      setInfoLoading(false);
    }
  }, [balance, token, tokenInfo, user]);

  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py="5"
      shadow="lg"
      borderWidth={0}
      borderColor={useColorModeValue('gray.300', 'gray.700')}
      rounded="lg"
      transition="all 0.3s"
      _hover={{
        transform: 'translateY(2px)',
        shadow: 'xl',
        cursor: 'pointer',
      }}
    >
      <Flex justifyContent="space-between">
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight="medium" color={useColorModeValue('blue.500', 'blue.300')}>
            {tokenInfo?.name}
          </StatLabel>
          <Tooltip
            label={`${tokenInfo?.symbol}: ${displayBalance(balance, tokenInfo).full}`}
            hasArrow
            aria-label={`Balance upto to ${tokenInfo?.decimals} decimals`}
          >
            <StatNumber fontSize="2xl" fontWeight="medium">
              {infoLoading && !balance && <Spinner size="md" />}
              {!infoLoading && balance !== undefined && displayBalance(balance, tokenInfo).short}
            </StatNumber>
          </Tooltip>
        </Box>
        {/* TODO: Add some token info from the CoinGecko API and a link to the token page on CG */}
      </Flex>
    </Stat>
  );
}

export interface BalancesProps {
  user: string;
  network: number;
  tokens: TokenProps[];
}

export default function Balances({ user, network, tokens }: BalancesProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const networkBalance = useEtherBalance(user, { chainId: network });
  const currentNetworkTokens = tokens.filter((token) => token.chainId === network);

  useEffect(() => {
    try {
      if (currentNetworkTokens.length <= 0) {
        throw new Error('Not a valid network');
      }
      setLoading(false);
    } catch {
      setLoading(false);
      // eslint-disable-next-line no-console
      // console.log(error);
    }
  }, [network, networkBalance, user]);

  return (
    <Box w="100%" mx="auto" py={{ base: 2, sm: 4, md: 6 }}>
      <>
        <Heading as="h3" color="inherit" mt={0} mb={3}>
          Balances
        </Heading>
        {!loading && networkBalance !== undefined ? (
          <Text>
            Native ({getValidChainName(network)}) balance: {formatEther(networkBalance)}
          </Text>
        ) : (
          <HStack>
            <Text as="span" fontSize="md">
              Native ({getValidChainName(network)}) balance:
            </Text>
            <Spinner />
          </HStack>
        )}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 5, lg: 3 }}>
          {currentNetworkTokens &&
            currentNetworkTokens.length > 0 &&
            currentNetworkTokens.map((token) => (
              <BalanceCard key={`balancecard-${token.contract}`} token={token.contract} user={user} />
            ))}
        </SimpleGrid>
      </>
    </Box>
  );
}
