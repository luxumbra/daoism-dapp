import { useCallback, useEffect, useState } from 'react';

import { Box, Spinner, Text } from '@chakra-ui/react';
import { shortenAddress, useEthers, useLookupAddress } from '@usedapp/core';

export const useDisplayAccount = (
  account: string | undefined,
  returnType?: string | undefined
): string | JSX.Element | undefined => {
  const { active, account: accountToReset, error: ethersError } = useEthers();
  const { ens, isLoading, error: ensError } = useLookupAddress(account);
  const [accountDisplay, setAccountDisplay] = useState<string | undefined>(account && shortenAddress(account));

  // defineDisplayName
  const defineDN = useCallback(
    (userAccount: string | undefined, userEns: string | null | undefined) => {
      try {
        if (!isLoading && userEns && userAccount) {
          setAccountDisplay(userEns);
        } else if (!isLoading && !userEns && userAccount) {
          setAccountDisplay(shortenAddress(userAccount));
        }

        if (accountToReset === undefined || !active) {
          setAccountDisplay('');
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('defineDN errors:', { error, ensError, ethersError });
      }
    },
    [accountToReset, active, ensError, ethersError, isLoading]
  );

  useEffect(() => {
    if (!isLoading && account) defineDN(account, ens);
  }, [ens, isLoading, account, defineDN]);

  if (returnType === 'string') {
    return !isLoading ? accountDisplay : 'Loading...';
  }
  return (
    <Box>
      {isLoading ? (
        <Spinner size="sm" />
      ) : (
        <Text as="span" fontSize={{ base: 'md', xl: 'sm' }}>
          {accountDisplay}
        </Text>
      )}
    </Box>
  );
};
