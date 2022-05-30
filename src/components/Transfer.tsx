import { Box, Text } from '@chakra-ui/react';
import { useEthers, useSendTransaction } from '@usedapp/core';
import { utils } from 'ethers';

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
