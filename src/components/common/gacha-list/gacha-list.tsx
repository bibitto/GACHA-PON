import { Box, VStack, Image, Text, Button } from '@chakra-ui/react';
import { ethers } from 'ethers';
import { FC, useState } from 'react';
import { UserContainer } from '../../../containers';
import { Gacha } from '../../../types';
import { hoveredNesPointer } from '../../../utils/const';
import { CreateCard } from '../create-card';
import GachaPon from '../../../utils/abi/GachaPon.json';

type Props = {
  gachas: Gacha[];
  size: number;
  scroll: boolean;
  setCreateCard: boolean;
  onSelect?: (arg1: number) => void;
};

export const GachaList: FC<Props> = ({ gachas, size, scroll, setCreateCard, onSelect }) => {
  const { provider } = UserContainer.useContainer();
  const [isLoading, setIsLoading] = useState(false);
  const onOpenToMarket = async (gacha: Gacha) => {
    try {
      if (!process.env.NEXT_PUBLIC_NFT_CONTRACT) {
        throw new Error('invalid env setting');
      } else if (!provider) {
        throw new Error('there is no privider');
      }
      setIsLoading(true);
      const signer = provider.getSigner();
      const gachaPon = new ethers.Contract(process.env.NEXT_PUBLIC_NFT_CONTRACT, GachaPon.abi, signer);
      const res = await gachaPon.openGachaPon('0x5E7E1747b2A3c90Bbf4e7a93639009Cd0Da65944', gacha.id); // not work → payment コントラクトに登録する必要がある
      console.log(res);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Box>
      <Box
        overflowY={scroll ? 'scroll' : undefined}
        display="flex"
        flexWrap="wrap"
        columnGap="40px"
        rowGap="40px"
        w="100%"
        h={scroll && gachas.length >= 7 ? 620 : '100%'}
        m="auto"
        sx={!gachas.length ? { justifyContent: 'center' } : {}}
      >
        {gachas &&
          gachas.map((gacha, i) => {
            return (
              <VStack spacing={3} key={gacha.id}>
                <Box
                  onClick={() => {
                    onSelect && onSelect(i);
                  }}
                >
                  <GachaItem gacha={gacha} size={size} />
                </Box>
                {gacha.isOpened ? (
                  <Button className="nes-btn" w={'100%'}>
                    Close
                  </Button>
                ) : (
                  <Button className="nes-btn" w={'100%'} onClick={() => onOpenToMarket(gacha)}>
                    Open to Market
                  </Button>
                )}
              </VStack>
            );
          })}
        {setCreateCard && <CreateCard />}
      </Box>
    </Box>
  );
};

type ItemProps = {
  gacha: Gacha;
  size: number;
};
export const GachaItem: FC<ItemProps> = ({ gacha, size }) => {
  return (
    <Box>
      <VStack
        className="nes-container is-rounded"
        p={'0px !important'}
        _hover={{
          transition: '0.4s',
          opacity: 0.7,
          cursor: hoveredNesPointer,
        }}
      >
        <Image src={gacha.image} alt="NFT" w={size} h={size} />
      </VStack>
    </Box>
  );
};
