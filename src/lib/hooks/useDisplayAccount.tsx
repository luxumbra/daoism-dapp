import { shortenAddress } from '@usedapp/core';

export const useDisplayAccount = (
  account: string | undefined,
  ens: string | null | undefined,
  ensError?: Error | null
): string => {
  const displayAddress = account ? shortenAddress(account) : undefined;

  try {
    const accountDisplay = ens ?? displayAddress;
    if (ensError) {
      throw ensError;
    }

    return accountDisplay && accountDisplay.length > 0 ? accountDisplay : '';
  } catch (error) {
    console.log('Error: useDisplayAccount:', error);
    return 'Error. Check the console. ';
  }
};
