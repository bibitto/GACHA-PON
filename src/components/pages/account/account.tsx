import {
  Box,
  Text,
  Container,
  HStack,
  VStack,
  Tabs,
  TabList,
  Tab,
  Badge,
  TabPanels,
  TabPanel,
  Image,
  Button,
  Link,
  Flex,
  Modal,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { DataContainer, UserContainer } from '../../../containers';
import { Gacha } from '../../../types';
import { hoveredNesPointer } from '../../../utils/const';
import { GachaList } from '../../common/gacha-list';
import { GachaModal } from '../../common/gacha-modal';
import { NftList } from '../../common/nft-list';

export const Account = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { userAddress } = UserContainer.useContainer();
  const { ownedOpenedGachas, ownedClosedGachas } = DataContainer.useContainer();
  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };
  const onSelectGacha = (index: number) => {
    setSelectedIndex(index);
    onOpen();
  };
  const tabOptions = [
    { name: 'Opened', length: ownedOpenedGachas.length },
    { name: 'Stocked', length: ownedClosedGachas.length },
  ];
  return (
    <Box h={'100%'} py={14} overflowY={'scroll'}>
      <Box>
        <Container>
          <VStack spacing={6} pb={12} fontWeight="bold" fontSize="md" overflowWrap="break-word" justifyContent="center">
            <Text fontSize={16}>Wallet Address</Text>
            <Text>{userAddress}</Text>
          </VStack>
        </Container>

        <Tabs size="md" index={tabIndex} onChange={handleTabsChange} colorScheme="black" variant="line" align="center">
          <TabList justifyContent={'center'} borderBottom="4px solid black">
            {tabOptions.map((tab, i) => (
              <Tab
                pt={3}
                pb={2}
                key={i}
                fontWeight="bold"
                position="relative"
                w={'180px'}
                sx={tabIndex === i ? { borderBottom: '6px solid black' } : {}}
                _focus={{ outline: 'none' }}
                cursor={hoveredNesPointer}
              >
                <Text>{`${tab.name}`}</Text>
                <Badge
                  bg="white"
                  color="gray.400"
                  size="md"
                  position="absolute"
                  top={0}
                  right={tab.length < 10 ? 3 : -1}
                  p={0}
                >
                  {tab.length}
                </Badge>
              </Tab>
            ))}
          </TabList>

          <TabPanels pt={6}>
            <TabPanel>
              <Box w={1050} m="auto" py={50}>
                {ownedOpenedGachas[selectedIndex] && (
                  <GachaModal isOpen={isOpen} onClose={onClose} gacha={ownedOpenedGachas[selectedIndex]} />
                )}

                <GachaList
                  size={300}
                  gachas={ownedOpenedGachas}
                  setCreateCard={true}
                  scroll={false}
                  onSelect={onSelectGacha}
                />
              </Box>
            </TabPanel>
            <TabPanel>
              <Box w={1050} m="auto" py={50}>
                {ownedClosedGachas[selectedIndex] && (
                  <GachaModal isOpen={isOpen} onClose={onClose} gacha={ownedClosedGachas[selectedIndex]} />
                )}

                <GachaList
                  size={300}
                  gachas={ownedClosedGachas}
                  setCreateCard={true}
                  scroll={false}
                  onSelect={onSelectGacha}
                />
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};
