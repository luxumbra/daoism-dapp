import { shortenAddress,  } from '@usedapp/core'


interface DisplayAccountProps {
  account: string | null
  ens: string | null
}
export const useDisplayAccount = (account: string|undefined, ens: string|null|undefined): string => {
  const displayAddress = account ? shortenAddress(account) : undefined

  try {
    const accountDisplay = ens ?? displayAddress
    return accountDisplay && accountDisplay.length > 0 ? accountDisplay : ''

  } catch (error) {
    console.log('Error: useDisplayAccount: ', error);
    return 'Error. Check the console. '
  }
}