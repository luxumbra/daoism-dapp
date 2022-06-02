import { useEffect, useState } from 'react';

import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react';
import { formatEther, formatUnits } from '@ethersproject/units';
import { useEtherBalance, useToken, useTokenBalance } from '@usedapp/core';
import { TokenInfo } from '@usedapp/core/dist/esm/src/model/TokenInfo';
import { BigNumber } from 'ethers';

import { TokenProps } from '@daoism/lib/constants';
import { getValidChainName } from '@daoism/lib/helpers';

interface BalanceCardProps {
  token: string;
  user: string;
}
function BalanceCard(props: BalanceCardProps) {
  const [infoLoading, setInfoLoading] = useState<boolean>(false);
  const { token, user } = props;
  const tokenInfo = useToken(token);
  const balance: BigNumber | undefined = useTokenBalance(token, user);

  function displayBalance(num: BigNumber | undefined, info: TokenInfo | undefined) {
    if (!num) {
      return { short: '0', full: '0' };
    }
    const short = Number.parseInt(formatUnits(num, info?.decimals), 10).toFixed(5);
    const full = formatUnits(num, info?.decimals);
    return {
      short,
      full,
    };
  }

  useEffect(() => {
    if (!balance) {
      setInfoLoading(true);
    }
    setInfoLoading(false);
  }, [balance, tokenInfo]);

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
              {infoLoading && 'Loading balance...'}
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
  const networkBalance = useEtherBalance(user, { chainId: network });
  const currentNetworkTokens = tokens.filter((token) => token.chainId === network);

  return (
    <Box w="100%" mx="auto" py={{ base: 2, sm: 4, md: 6 }}>
      <>
        <Heading as="h3" color="inherit" mt={0} mb={3}>
          Balances
        </Heading>
        {networkBalance && (
          <Text>
            Native ({getValidChainName(network)}) balance: {formatEther(networkBalance)}
          </Text>
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
