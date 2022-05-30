import { Box, Text } from '@chakra-ui/react';
import { useEthers } from '@usedapp/core';

/**
 * TODO: Buidl a custom component that can be used to mint tokens
 * @returns {JSX.Element}
 */

const Mint = (): JSX.Element => {
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
