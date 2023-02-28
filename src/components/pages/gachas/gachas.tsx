import { Box, Flex, HStack, VStack, Text, Image, Button } from '@chakra-ui/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { DataContainer, UserContainer } from '../../../containers';
import { BackButton } from '../../common/back-button';
import { IconBolloon } from '../../common/icon-balloon';
import { NftList, NftItem } from '../../common/nft-list';
import { ethers, BigNumber } from 'ethers';
import data from '../../../utils/abi/GachaPon.json';
import axios from 'axios';
import { Gacha } from '../../../types';
import { GachaList } from '../../common/gacha-list';

export const Gachas = () => {
  const { marketGachas, allGachas } = DataContainer.useContainer();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const onSelect = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <Box px={'80px'}>
      {marketGachas.length ? (
        <Flex display="flex" justify={'space-between'}>
          <Box w={750} borderY={'8px solid black'} py={4}>
            <GachaList gachas={marketGachas} size={200} scroll={true} setCreateCard={false} onSelect={onSelect} />
          </Box>
          <Box w={'45%'} h={650}>
            <Box className="nes-container is-dark " w={'100%'} h={400} display="flex" justifyContent={'center'}>
              <Image src={marketGachas[selectedIndex].image} alt="gacha-logo" h={'100%'} />
            </Box>
            <Box pt={6} px={8}>
              <Box pb={8}>
                <Text fontSize={14} color="gray">
                  Gacha Name
                </Text>
                <Text fontSize={20}>
                  {marketGachas[selectedIndex].name.length >= 20
                    ? marketGachas[selectedIndex].name.slice(0, 19) + '…'
                    : marketGachas[selectedIndex].name}
                </Text>
              </Box>
              <Box pb={8}>
                <Text fontSize={14} pb={1} color="gray">
                  Description
                </Text>
                <Text fontSize={20} overflowWrap={'break-word'} wordBreak="keep-all">
                  {marketGachas[selectedIndex].description.length >= 25
                    ? marketGachas[selectedIndex].description.slice(0, 24) + '…'
                    : marketGachas[selectedIndex].description}
                </Text>
              </Box>
              <HStack>
                <Flex w={'100%'} justify={'space-between'}>
                  <Box>
                    <Text fontSize={14} pb={1} color="gray">
                      Fee
                    </Text>
                    <HStack>
                      <Text fontSize={20}>{marketGachas[selectedIndex].fee}</Text>
                      <Text>USD</Text>
                    </HStack>
                  </Box>
                  <Box pt={2}>
                    <Link href={`/market/${marketGachas[selectedIndex].id}`}>
                      <Button className="nes-btn">{'Detail >'}</Button>
                    </Link>
                  </Box>
                </Flex>
              </HStack>
            </Box>
          </Box>
        </Flex>
      ) : (
        <Box display="flex" justifyContent={'center'}>
          <Text>Now Loading ...</Text>
        </Box>
      )}
    </Box>
  );
};
