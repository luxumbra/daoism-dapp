import { useRef } from 'react';

import { useToast } from '@chakra-ui/react';
import { shortenAddress } from '@usedapp/core';

export const useDisplayAccount = (account: string | undefined, ens: string | null | undefined): string | undefined => {
  const toast = useToast();
  const displayAddress = account && typeof account === 'string' ? shortenAddress(account) : undefined;
  const toastId = 'display-account';
  const accountDisplay = ens ?? displayAddress;

  try {
    if (accountDisplay && accountDisplay.length > 0) {
      return accountDisplay;
    }
    throw new Error('Failed to get account');
  } catch (error) {
    if (account && !toast.isActive(toastId)) {
      toast({
        id: toastId,
        description: `Error: ${error}`,
        status: 'info',
        variant: 'subtle',
        duration: 5000,
      });
    }
    return undefined;
  }
};
