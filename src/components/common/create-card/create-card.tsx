import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Text,
  List,
  ListItem,
} from '@chakra-ui/react';
import Link from 'next/link';
import { FC } from 'react';
import { hoveredNesPointer } from '../../../utils/const';

export const CreateCard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <CreateModal isOpen={isOpen} onClose={onClose} />
      <Box
        className="nes-container is-rounded"
        bgColor="black"
        w={300}
        h={300}
        display="flex"
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems="center"
      >
        <Button className="nes-btn" w={200} onClick={onOpen}>
          + Create
        </Button>
      </Box>
    </>
  );
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const CreateModal: FC<Props> = ({ isOpen, onClose }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay sx={{ bgColor: 'rgba(0, 0, 0, 0.5)' }} />
        <ModalContent
          className="nes-container is-rounded"
          h={500}
          w={650}
          bgColor="white"
          display={'flex'}
          flexDirection="column"
          justifyContent={'space-between'}
          p={'32px !important'}
          position={'absolute'}
          top={'25%'}
          left={'30.5%'}
        >
          <ModalCloseButton
            position={'absolute'}
            top={2}
            right={2}
            _focus={{ outline: 'none' }}
            _hover={{
              cursor: hoveredNesPointer,
            }}
          />
          <ModalHeader fontSize={22}>Mint Your Gacha NFT</ModalHeader>

          <ModalBody>
            <Box display={'flex'} flexDirection={'column'} gap={8}>
              <Box>
                <Text mb={3}>About Gacha NFTs:</Text>
                <List className="nes-list is-disc" pl={6} spacing={3} fontSize={14}>
                  <ListItem>ERC998 (NFT taht can have NFTs)</ListItem>
                  <ListItem>Launch NFT-Gacha Project easily</ListItem>
                  <ListItem>Enable collaboration with other artists</ListItem>
                  <ListItem>Can be used for various purposes</ListItem>
                </List>
              </Box>
              <Box>Mint Price: 30 USD</Box>
            </Box>
          </ModalBody>

          <ModalFooter justifyContent={'center'}>
            <Link href={'https://slash.fi/payment-merchant/11bf6ebacfdc39566358d69bb81aa746'} target="_blank">
              <Button className="nes-btn is-primary" variant="ghost" w={'100%'}>
                Payment with Slash
              </Button>
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
