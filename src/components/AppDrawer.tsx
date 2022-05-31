import { ElementRef, FC, useRef } from 'react';

import {
  Text,
  useDisclosure,
  IconButton,
  useColorModeValue,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  HStack,
  Button,
  DrawerProps,
} from '@chakra-ui/react';
import { MdAccountBalanceWallet } from 'react-icons/md';

export interface AppDrawerProps {
  headerTitle: string;
  type?: string;
  isValidNetwork?: boolean;
  children: JSX.Element;
}

export const AppDrawer: FC<AppDrawerProps> = ({ headerTitle, type, isValidNetwork, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);
  const networkBtnRef = useRef<HTMLButtonElement>(null);
  const mismatchRef = useRef<HTMLParagraphElement>(null);
  const profileIconColor = useColorModeValue('gray.700', 'gray.300');

  return (
    <>
      {type === 'network' && (
        <HStack align="center" justify="flex-end">
          {!isValidNetwork && (
            <Text ref={mismatchRef} as="span" fontSize="sm" color="red.600">
              r0ng network
            </Text>
          )}
          <Button ref={networkBtnRef} colorScheme={isValidNetwork ? 'blue' : 'red'} size="sm" onClick={onOpen}>
            Change network
          </Button>
        </HStack>
      )}

      {type === 'profile' && (
        <IconButton
          ref={btnRef}
          icon={<MdAccountBalanceWallet />}
          aria-label="Open wallet"
          colorScheme="ghost"
          color={profileIconColor}
          fontSize={{ base: '3xl', lg: '3xl' }}
          onClick={onOpen}
        />
      )}
      <Drawer placement="right" isOpen={isOpen} onClose={onClose} finalFocusRef={btnRef} size="md" colorScheme="blue">
        <DrawerOverlay bgColor={useColorModeValue('blueGlassAlpha', 'blueGlassAlphaDark')} backdropFilter="blur(7px)" />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader bgColor={useColorModeValue('blue.300', 'blue.900')} alignItems="center">
            <Text as="h3" color={useColorModeValue('blue.600', 'blue.100')} my={0}>
              {headerTitle}
            </Text>
          </DrawerHeader>
          <DrawerBody
            bgColor={useColorModeValue('blue.200', 'blue.800')}
            color={useColorModeValue('blue.600', 'blue.100')}
          >
            {children}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

AppDrawer.defaultProps = {
  type: 'network',
  isValidNetwork: true,
};
