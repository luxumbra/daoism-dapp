import { Box, Text } from '@chakra-ui/react';
import { useEthers } from '@usedapp/core';

const Mint = () => {
  const { account, activateBrowserWallet, deactivate } = useEthers();

  return (
    <Box>
      <Text as="h3" color="inherit">
        Mint
      </Text>
    </Box>
  );
};

export default Mint;
