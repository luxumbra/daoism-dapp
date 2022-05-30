import { useEffect, useState } from 'react';

import { Box, Flex, SimpleGrid, Stat, StatLabel, StatNumber, Text, useColorModeValue } from '@chakra-ui/react';
import { formatEther, formatUnits } from '@ethersproject/units';
import { useEtherBalance, useToken, useTokenBalance } from '@usedapp/core';
import { BigNumber } from 'ethers';

import { TokenProps } from '@daoism/lib/constants';
import { getCurrentChainName } from '@daoism/lib/helpers';

interface BalanceCardProps {
  token: string;
  user: string;
}
function BalanceCard(props: BalanceCardProps) {
  const [infoLoading, setInfoLoading] = useState<boolean>(false);
  const { token, user } = props;
  const tokenInfo = useToken(token);
  const balance: BigNumber | undefined = useTokenBalance(token, user);

  useEffect(() => {
    if (!balance) {
      setInfoLoading(true);
    }
    setInfoLoading(false);
  }, [balance]);

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
          <StatNumber fontSize="2xl" fontWeight="medium">
            {infoLoading && 'Loading balance...'}
            {!infoLoading && balance !== undefined && formatUnits(balance, tokenInfo?.decimals)}
          </StatNumber>
        </Box>
        {/* <Box my="auto" color={useColorModeValue('gray.800', 'gray.200')} alignContent="center">
          {icon}
        </Box> */}
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

  return (
    <Box w="100%" mx="auto" py={{ base: 2, sm: 4, md: 6 }}>
      <>
        <Text as="h3" color="inherit" mb={3}>
          Balances
        </Text>
        {networkBalance && (
          <Text>
            Native ({getCurrentChainName(network)}) balance: {formatEther(networkBalance)}
          </Text>
        )}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 5, lg: 3 }}>
          {tokens &&
            tokens.length > 0 &&
            tokens.map((token) => <BalanceCard token={token.contract} user={user} />)}
        </SimpleGrid>
      </>
    </Box>
  );
}
