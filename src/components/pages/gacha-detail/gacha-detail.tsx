import { Box, Image, VStack, HStack, Text, Input, List, ListItem, Button } from '@chakra-ui/react';
import Moralis from 'moralis';
import { EvmChain } from '@moralisweb3/common-evm-utils';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { testNfts } from '../../../utils/test-data';
import { IconBolloon } from '../../common/icon-balloon';
import { NftList } from '../../common/nft-list';
import { Statistics } from '../../common/statistics';
import { UserContainer } from '../../../containers';
import { BackButton } from '../../common/back-button';
import { NFTMetadata } from '../../../types';

export const GachaDetail = () => {
  const [tabIndex, setTabIndex] = useState(1);
  const [stockedCapsules, setStockedCapsules] = useState<NFTMetadata[]>();

  return (
    <Box h={650} px={14} display={'flex'} justifyContent={'space-around'}>
      <BackButton />
      <VStack w={900} alignItems={'center'}>
        {tabIndex === 1 && <About />}
        {tabIndex === 2 && <Provide />}
        {tabIndex === 3 && <NftList title="Stocked Items" nfts={ownedNfts || []} />}
        {tabIndex === 4 && <Roll />}
      </VStack>
      <VStack justify={'space-between'}>
        <Image src="/gacha.jpg" alt="ガチャ" w={280} h={400} mt={'30px'} />
        <Box className="nes-container is-dark with-title is-centered" h={150} w={400}>
          <Text className="title">Command</Text>
          <HStack justify={'space-between'} h={'100%'}>
            <VStack alignItems={'start'} w={'48%'} gap={4}>
              <HStack justify={'center'}>
                <Input type="radio" className="nes-radio is-dark" checked={tabIndex === 1} readOnly />
                <Text
                  as="span"
                  fontSize={18}
                  onClick={() => setTabIndex(1)}
                  _before={{ top: '2px !important', left: '-25px !important' }}
                >
                  About
                </Text>
              </HStack>
              <HStack>
                <Input type="radio" className="nes-radio is-dark" checked={tabIndex === 2} readOnly />
                <Text
                  as="span"
                  fontSize={18}
                  onClick={() => setTabIndex(2)}
                  _before={{ top: '2px !important', left: '-25px !important' }}
                >
                  Provide
                </Text>
              </HStack>
            </VStack>
            <VStack alignItems={'start'} w={'45%'} gap={4}>
              <HStack>
                <Input type="radio" className="nes-radio is-dark" checked={tabIndex == 3} readOnly />
                <Text
                  as="span"
                  fontSize={18}
                  onClick={() => setTabIndex(3)}
                  _before={{ top: '2px !important', left: '-25px !important' }}
                >
                  Items
                </Text>
              </HStack>
              <HStack textAlign={'end'}>
                <Input type="radio" className="nes-radio is-dark" checked={tabIndex === 4} readOnly />
                <Text
                  as="span"
                  fontSize={18}
                  onClick={() => setTabIndex(4)}
                  _before={{ top: '2px !important ', left: '-25px !important' }}
                >
                  Roll
                </Text>
              </HStack>
            </VStack>
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
};

const About = () => {
  return (
    <Box w={'100%'} h={'100%'}>
      <Text fontSize={22}>About Community Gacha</Text>
      <VStack pt={10} pb={5} justify={'space-between'} textAlign="left" alignItems="flex-start" h={'100%'}>
        <Text>Wellcome to Community Gacha.</Text>
        <Text>stats</Text>
        <Statistics />
      </VStack>
    </Box>
  );
};

const Provide = () => {
  return (
    <Box w={'100%'} h={'100%'}>
      <Text fontSize={22}>Provide Your NFT</Text>
      <VStack pt={10} pb={5} justify={'space-between'} textAlign="left" alignItems="flex-start" h={'100%'}>
        <Text>You can provide your NFT by staking it to the Community Gacha Contract.</Text>
        <Text>
          The provided NFT will be used as gacha capsules, and anyone in the community will get these capsules by
          rolling the gacha.
        </Text>
        <Box>
          <Text>{"Providers's Benefits:"}</Text>
          <List className="nes-list is-disc" pl={8} pt={3}>
            {/* TODO */}
            <ListItem>Good morning.</ListItem>
            <ListItem>Thou hast had a good nights sleep, I hope.</ListItem>
            <ListItem>Thou hast had a good afternoon</ListItem>
            <ListItem>Good night.</ListItem>
          </List>
        </Box>
        <Box display={'flex'} justifyContent={'right'} w={'100%'}>
          {/* TODO */}
          {false ? (
            <Link href={'/accout'}>
              <IconBolloon
                text="Let's go to account page and stake your NFTs !!"
                icon="kirby"
                side="right"
                space={'50px'}
                width={450}
              />
            </Link>
          ) : (
            <IconBolloon
              text="You wanna stake NFTs ? Please connect a wallet."
              icon="kirby"
              side="right"
              space={'50px'}
              width={450}
            />
          )}
        </Box>
      </VStack>
    </Box>
  );
};

const Roll = () => {
  return (
    <Box w={'100%'} h={'100%'}>
      <Text fontSize={22}>Roll Community Gacha</Text>
      <VStack pt={10} pb={5} justify={'space-between'} textAlign="left" alignItems="flex-start" h={'100%'}>
        <Text>Wellcome to Community Gacha.</Text>
        <Text>stats</Text>
        <Button className="nes-btn ">Roll the gacha</Button>
      </VStack>
    </Box>
  );
};
