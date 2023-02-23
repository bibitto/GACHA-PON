import Link from 'next/link';
import { Box, Flex, HStack, Text, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { IconBolloon } from '../icon-balloon';
import { useState } from 'react';
import { UserContainer } from '../../../containers';
import { MenuButton } from '../menu-button';

export const headerHeight = '75px';

export const HeaderLinks = [
  {
    title: 'Home',
    to: '/',
  },
  {
    title: 'Market',
    to: '/market',
  },
  {
    title: 'Account',
    to: '/account',
  },
];

export const Header = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((prev) => !prev);
  const router = useRouter();
  const currentPath = router.pathname === '/' ? 'home' : router.pathname;
  const { userAddress, provider, connectWallet, disconnectWallet } = UserContainer.useContainer();
  const logout = () => {
    disconnectWallet();
    router.push('/');
  };
  return (
    <Box h={headerHeight} px={12} borderY={'4px solid black'} display="flex" alignItems={'center'}>
      <Box
        sx={{
          position: 'fixed',
          top: '60px',
          left: open ? '50px' : '-500px',
          zIndex: 998,
          textDecoration: 'none',
          transition: 'all 1.0s ease',
        }}
      >
        <Button
          className="nes-btn"
          zIndex={999}
          px={0.5}
          py={0}
          position="relative"
          top="25px"
          left="395px"
          onClick={handleOpen}
        >
          ✖️
        </Button>
        <Link target="_blank" href={'https://slash.fi/payment-merchant/8da1d1da6cba212865fa3a38186bd38a'}>
          <IconBolloon
            text="We appreciate your donation!!"
            icon="octocat animate"
            side="left"
            space={'20px'}
            width={320}
            subIcon={<i className="nes-icon coin is-medium" style={{ marginBottom: '20px', marginRight: '16px' }}></i>}
          />
        </Link>
      </Box>
      <Flex width={'100%'} alignItems={'center'} justifyContent={'space-between'}>
        <HStack
          sx={{
            fontWeight: 700,
            fontSize: 20,
            '&:hover': {
              color: '#007bff',
            },
          }}
          onClick={handleOpen}
        >
          <Text>Gacha-Pon</Text>
        </HStack>

        <Flex alignItems={'center'} display={{ base: 'none', md: 'flex' }}>
          {userAddress && provider ? (
            <>
              <HStack as={'nav'} spacing={8} mr={12}>
                {HeaderLinks.map((link, i) => (
                  <NavLink key={i} title={link.title} to={link.to} path={currentPath} />
                ))}
              </HStack>
              <Button className="nes-btn is-error" onClick={logout} w={200}>
                Disconnect
              </Button>
            </>
          ) : (
            <Button className="nes-btn is-primary" onClick={connectWallet}>
              Connect Wallet
            </Button>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

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
