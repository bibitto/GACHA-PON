import { Box, Text, VStack, Image, Wrap, WrapItem, Button, HStack } from '@chakra-ui/react';
import { FC, useState } from 'react';
import cx from 'classnames';
import { sliceNftsByCount } from '../../../utils/helper';
import { NFTMetadata } from '../../../types';
import { hoveredNesPointer } from '../../../utils/const';

type Props = {
  title?: string;
  nfts: NFTMetadata[];
};

export const NftList: FC<Props> = ({ title, nfts }) => {
  const [pageNum, setPageNum] = useState(1);
  const { sliceNum, slicedNfts } = sliceNftsByCount(nfts, 8);

  return (
    <Box>
      <HStack w="100%" justify={'space-between'} h={'60px'}>
        <Text fontSize={22} ml={2}>
          {title}
          <Box
            className="nes-badge"
            position="relative"
            zIndex={999}
            right={'35px'}
            top={'-20px'}
            margin={'0px !important'}
          >
            <Text
              as="span"
              className="is-primary"
              zIndex={999}
              fontSize={12}
              backgroundColor="#212529 !important"
              boxShadow="0 0.4em #212529, 0 -0.4em #212529, 0.4em 0 #212529, -0.4em 0 #212529 !important"
              width="auto !important"
              px={4}
            >
              {nfts.length}
            </Text>
          </Box>
        </Text>
        <Box className="nes-select" fontSize={14} w={180} pr={'5px'} _after={{ color: 'gray' }}>
          <select style={{ padding: '3px 0px 2px 15px' }} disabled={true}>
            <Box as="option">all</Box>
            <Box as="option">image</Box>
            <Box as="option">audio</Box>
            <Box as="option">video</Box>
          </select>
        </Box>
      </HStack>
      <Wrap spacing={3} w={900} h={480}>
        {nfts.length ? (
          slicedNfts[pageNum - 1].map((nft, i) => {
            return (
              <WrapItem key={i}>
                <NftItem {...nft} />
              </WrapItem>
            );
          })
        ) : (
          <Box>No NFTs ...</Box>
        )}
      </Wrap>
      <HStack justify={'center'} spacing={10} pt={5}>
        <Button
          className={cx('nes-btn', pageNum === 1 && 'is-disabled')}
          onClick={() => setPageNum((prev) => prev - 1)}
          disabled={pageNum === 1}
        >
          {'<'}
        </Button>
        <Text>{`${pageNum}/${sliceNum}`}</Text>
        <Button
          className={cx('nes-btn', sliceNum === pageNum && 'is-disabled')}
          onClick={() => setPageNum((prev) => prev + 1)}
          disabled={sliceNum === pageNum}
        >
          {'>'}
        </Button>
      </HStack>
    </Box>
  );
};

export const NftItem: FC<NFTMetadata> = (nft) => {
  return (
    <VStack
      className="nes-container is-rounded"
      p={'0px !important'}
      _hover={{
        transition: '0.4s',
        opacity: 0.7,
        cursor: hoveredNesPointer,
      }}
    >
      <Image src={nft.image} alt="NFT" w={200} h={180} />
      <Text py={'4px'} fontSize={12}>
        {nft.name.length >= 15 ? nft.name.slice(0, 14) + '…' : nft.name}
      </Text>
    </VStack>
  );
};
