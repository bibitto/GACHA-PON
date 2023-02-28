import { Button, Box, Popover, PopoverTrigger, PopoverContent, PopoverArrow } from '@chakra-ui/react';
import Link from 'next/link';
import { useState } from 'react';
import { UserContainer } from '../../../containers';

export const MenuButton = () => {
  const { disconnectWallet } = UserContainer.useContainer();
  return (
    <Popover>
      <PopoverTrigger>
        <Button className="nes-btn" w={150}>
          Menu
        </Button>
      </PopoverTrigger>
      <PopoverContent mt={3}>
        <Box className="nes-container" p={0} position={'relative'} zIndex={'999px !important'}>
          <Link href={'/account'}>
            <Box borderBottom="4px solid black" py={2} px={8}>
              My Wallet
            </Box>
          </Link>
          <Link href={'/'}>
            <Box className="nes-text is-error" onClick={disconnectWallet} py={2} px={8} _hover={{ color: 'red' }}>
              Disconnect
            </Box>
          </Link>
        </Box>
      </PopoverContent>
    </Popover>
  );
};
