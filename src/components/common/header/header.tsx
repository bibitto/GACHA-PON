import Link from 'next/link';
import { Box, Flex, HStack, Link as ChakraLink, Text, Button } from '@chakra-ui/react';
import { theme } from '../../../utils/theme';
import { useRouter } from 'next/router';
import { VwblContainer } from '../../../containers/vwbl-container';

type Link = {
  title: string;
  to: string;
};

const NavLink = ({ title, to }: Link) => {
  const router = useRouter();
  const currentPage = router.pathname === '/' ? 'home' : router.pathname.replace('/', '');
  return (
    <Link href={to}>
      <Box as="input" type="radio" className="nes-radio" checked={currentPage === title.toLowerCase()} />
      <Text as="span">{title}</Text>
    </Link>
  );
};

export const Header = () => {
  const HeaderLinks: Link[] = [
    {
      title: 'Home',
      to: '/',
    },
    {
      title: 'Gacha',
      to: '/gacha',
    },
    {
      title: 'Create',
      to: '/create',
    },
  ];
  return (
    <Box px={8} borderY={'1px solid black'}>
      <Flex h="60px" alignItems={'center'} justifyContent={'space-between'}>
        <Link href="/" style={{ fontWeight: 700, fontSize: 20 }}>
          Gacha DAO
        </Link>
        <HStack />

        <Flex alignItems={'center'} display={{ base: 'none', md: 'flex' }}>
          <HStack as={'nav'} spacing={6} mr={12}>
            {HeaderLinks.map((link, i) => (
              <NavLink key={i} title={link.title} to={link.to} />
            ))}
          </HStack>
          {true ? (
            <HStack spacing={6}>
              <Button className="nes-btn is-success">My Wallet</Button>
              <Button className="nes-btn is-error">Disconnect</Button>
            </HStack>
          ) : (
            <Button className="nes-btn">Connect Wallet</Button>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};
