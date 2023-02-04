import Link from 'next/link';
import { Box, Flex, HStack, Text, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';

type Props = {
  title: string;
  to: string;
  path: string;
};

const NavLink = ({ title, to, path }: Props) => {
  return (
    <Link href={to}>
      <Box as="input" type="radio" className="nes-radio" checked={path.indexOf(title.toLowerCase()) !== -1} readOnly />
      <Text as="span" sx={{ color: 'black' }}>
        {title}
      </Text>
    </Link>
  );
};

export const headerHeight = '75px';

export const Header = () => {
  const HeaderLinks = [
    {
      title: 'Home',
      to: '/',
    },
    {
      title: 'Gachas',
      to: '/gachas',
    },
    {
      title: 'Community',
      to: '/community',
    },
  ];
  const router = useRouter();
  const currentPath = router.pathname === '/' ? 'home' : router.pathname;
  return (
    <Box h={headerHeight} px={12} borderY={'4px solid black'} display="flex" alignItems={'center'}>
      <Flex width={'100%'} alignItems={'center'} justifyContent={'space-between'}>
        <Link href="/" style={{ fontWeight: 700, fontSize: 20 }}>
          Gacha DAO
        </Link>
        <HStack />

        <Flex alignItems={'center'} display={{ base: 'none', md: 'flex' }}>
          <HStack as={'nav'} spacing={6} mr={12}>
            {HeaderLinks.map((link, i) => (
              <NavLink key={i} title={link.title} to={link.to} path={currentPath} />
            ))}
          </HStack>
          {true ? <Button className="nes-btn">My Wallet</Button> : <Button className="nes-btn">Connect Wallet</Button>}
        </Flex>
      </Flex>
    </Box>
  );
};
