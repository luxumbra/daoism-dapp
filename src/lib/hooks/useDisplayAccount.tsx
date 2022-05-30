import { useRef } from 'react';

import { useToast } from '@chakra-ui/react';
import { shortenAddress } from '@usedapp/core';

export const useDisplayAccount = (
  account: string | undefined,
  ens: string | null | undefined,
  ensError?: Error | null
): string => {
  const toast = useToast();
  const displayAddress = account ? shortenAddress(account) : undefined;
  const shown = useRef<boolean>(false);

  try {
    const accountDisplay = ens ?? displayAddress;

    if (ensError && !shown.current) {
      toast({ description: `ENS lookup failed: ${ensError}`, status: 'error' });
      shown.current = true;
    }

    return accountDisplay && accountDisplay.length > 0 ? accountDisplay : '';
  } catch (error) {
    toast({ description: `Error: ${error}`, status: 'info', duration: 5000 });
    return 'No user';
  }
};
