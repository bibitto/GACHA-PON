import Link from 'next/link';
import { Box, Flex, HStack, Link as ChakraLink, Text } from '@chakra-ui/react';
import { MdOutlineAccountBalanceWallet } from 'react-icons/md';
import { BsBoxArrowUpRight } from 'react-icons/bs';
import { TbWalletOff } from 'react-icons/tb';
import { Button } from '../button';
import { theme } from '../../../utils/theme';

type Link = {
  title: string;
  to: string;
  target?: string;
};

const NavLink = ({ title, to, target }: Link) => (
  <Link href={to} passHref>
    <ChakraLink
      rounded={'md'}
      _hover={{
        opacity: 0.7,
      }}
      _focus={{
        boxShadow: 'none',
      }}
      target={target}
      rel="noopener noreferrer"
    >
      <HStack>
        {target === '_blank' && <BsBoxArrowUpRight />}
        <Text>{title}</Text>
      </HStack>
    </ChakraLink>
  </Link>
);

export const Header = () => {
  const HeaderLinks: Link[] = [
    {
      title: 'Market',
      to: '/',
    },
    {
      title: 'Create',
      to: '/',
    },
    {
      title: 'Home',
      to: '/',
    },
  ];
  return (
    <Box px={8} border={'1px solid black'}>
      <Flex h="60px" alignItems={'center'} justifyContent={'space-between'}>
        <Link href="/" style={{ fontWeight: 700, fontSize: 20 }}>
          VWBLガチャ
        </Link>
        <HStack />

        <Flex alignItems={'center'} display={{ base: 'none', md: 'flex' }}>
          <HStack as={'nav'} spacing={6} mr={6}>
            {HeaderLinks.map((link, i) => (
              <NavLink key={i} title={link.title} to={link.to} target={link.target} />
            ))}
          </HStack>
          {/* <HStack spacing={6}>
            <Link href="/account" passHref>
              <Button as="a" text="My Wallet" borderRadius={'3xl'} icon={MdOutlineAccountBalanceWallet} />
            </Link>
            <Button text="Disconnect" borderRadius={'3xl'} icon={TbWalletOff} isReversed />
          </HStack> */}
          <Button text="Connect Wallet" borderRadius={'3xl'} icon={MdOutlineAccountBalanceWallet} />
        </Flex>
      </Flex>
    </Box>
  );
};
