import { Box, Text } from '@chakra-ui/react';
import { useEthers, useSendTransaction } from '@usedapp/core';
import { utils } from 'ethers';

/**
 * TODO: Buidl a custom component that can be used to send transactions
 * @returns {JSX.Element}
 */
const Transfer = () => {
  const { account, activateBrowserWallet, deactivate } = useEthers();
  const { sendTransaction, state } = useSendTransaction();

  return (
    <Box>
      <Text as="h3" color="inherit">
        Transfer
      </Text>
    </Box>
  );
};

export default Transfer;
