import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@chakra-ui/react';
import { FC, useState } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};
export const InfoModal: FC<Props> = ({ isOpen, onClose }) => {
  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        className="nes-container is-rounded"
        sx={{ m: 'atuo', backgroundColor: 'white', w: '800px', h: '800px' }}
      >
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>hoge</ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
