import {
  Box,
  Text,
  HStack,
  Image,
  Button,
  Link,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  Textarea,
  Select,
} from '@chakra-ui/react';
import { FC, SetStateAction, useEffect, useState } from 'react';
import { Gacha } from '../../../types';
import { useForm } from 'react-hook-form';
import { DataContainer, UserContainer } from '../../../containers';
import { ethers } from 'ethers';
import NFT from '../../../utils/abi/TestNFT.json';
import GachaPon from '../../../utils/abi/GachaPon.json';
import { uploadImage, uploadMetadata } from '../../../utils/helper';
import { BiImageAdd } from 'react-icons/bi';
import { hoveredNesPointer } from '../../../utils/const';
import { useRouter } from 'next/router';
import { TbArrowBigUpLines } from 'react-icons/tb';
import { BsBoxArrowUpRight } from 'react-icons/bs';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  gacha: Gacha;
};

export const userOptions = [
  {
    title: 'Edit Data',
  },
  {
    title: 'Add Capsule',
  },
];

export const GachaModal: FC<Props> = ({ isOpen, onClose, gacha }) => {
  const [name, setName] = useState(gacha.name);
  const [description, setDescription] = useState(gacha.description);
  const [slashLink, setSlashLink] = useState(gacha.slashLink);
  const [fee, setFee] = useState(gacha.fee);
  const [imageFile, setImageFile] = useState();
  const [imageFileUrl, setImageFileUrl] = useState(gacha.image);
  const [isLoading, setIsLoading] = useState(false);
  const [userOptionIndex, setUserOptionIndex] = useState(0);
  const [capsuleContract, setCapsuleContract] = useState<string>();
  const [capsuleTokenId, setCapsuleTokenId] = useState<number>();
  const { provider, userAddress } = UserContainer.useContainer();
  const { ownedCollections } = DataContainer.useContainer();
  const router = useRouter();

  const onUpdate = async () => {
    try {
      if (!process.env.NEXT_PUBLIC_NFT_CONTRACT) {
        throw new Error('invalid env setting');
      } else if (!provider) {
        throw new Error('there is no provider');
      } else if (!name || !description || !slashLink || !imageFileUrl || !fee) {
        throw new Error('submitted data is invalid');
      }

      setIsLoading(true);
      const image = !imageFile ? gacha.image : await uploadImage(imageFile);
      const metadata = {
        name,
        description,
        image: image!,
        external_url: slashLink,
      };
      const metadataUri = await uploadMetadata(metadata);
      console.log(metadataUri);

      const signer = provider.getSigner();
      const gachaPon = new ethers.Contract(process.env.NEXT_PUBLIC_NFT_CONTRACT, GachaPon.abi, signer);
      await gachaPon.updateGachaInfo(gacha.id, metadataUri, fee);
      setIsLoading(false);
      router.reload();
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  };

  const onTransfer = async () => {
    try {
      if (!capsuleContract || !capsuleTokenId) {
        throw new Error('submitted data is invalid');
      } else if (!provider || !userAddress) {
        throw new Error('there is no provider');
      }

      const signer = provider.getSigner();
      const nft = new ethers.Contract(capsuleContract, NFT.abi, signer);
      const targetGachaData = ethers.utils.hexZeroPad(ethers.BigNumber.from(gacha.id).toHexString(), 32);
      await nft['safeTransferFrom(address,address,uint256,bytes)'](
        userAddress,
        capsuleContract,
        capsuleTokenId,
        ethers.utils.hexZeroPad(targetGachaData, 32)
      );
    } catch (e) {
      console.error(e);
    }
  };

  const onChangeImageFile = (e: any) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleNameChange = (e: any) => {
    setName(e.target.value);
  };
  const handleDescriptionChange = (e: any) => {
    setDescription(e.target.value);
  };
  const handleSlashLinkChange = (e: any) => {
    setSlashLink(e.target.value);
  };
  const handleFeeChange = (e: any) => {
    setFee(e.target.value);
  };
  const handleContractChange = (e: any) => {
    setCapsuleContract(e.target.value);
  };
  const handleTokenIdChange = (e: any) => {
    setCapsuleTokenId(e.target.value);
  };

  const onCancel = () => {
    setName(gacha.name);
    setDescription(gacha.description);
    setSlashLink(gacha.slashLink);
    setFee(gacha.fee);
    setImageFile(undefined);
    setImageFileUrl(gacha.image);
    setIsLoading(false);
    setUserOptionIndex(0);
    onClose();
  };

  useEffect(() => {
    let fileReaderForImage: any;
    let isCancel = false;
    if (imageFile) {
      fileReaderForImage = new FileReader();
      fileReaderForImage.onload = () => {
        const result = fileReaderForImage.result;
        if (result && !isCancel) {
          setImageFileUrl(result);
        }
      };
      fileReaderForImage.readAsDataURL(imageFile);
    }
    return () => {
      isCancel = true;
      if (fileReaderForImage && fileReaderForImage.readyState === 1) {
        fileReaderForImage.abort();
      }
    };
  }, [imageFile]);

  useEffect(() => {
    setName(gacha.name);
    setDescription(gacha.description);
    setSlashLink(gacha.slashLink);
    setFee(gacha.fee);
    setImageFile(undefined);
    setImageFileUrl(gacha.image);
  }, [gacha]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onCancel}>
        <ModalOverlay sx={{ bgColor: 'rgba(0, 0, 0, 0.5)' }} />
        <ModalContent
          className="nes-container is-rounded"
          w={600}
          bgColor="white"
          display={'flex'}
          flexDirection="column"
          justifyContent={'space-between'}
          p={'32px'}
          pt={0}
          position={'absolute'}
          top={'6%'}
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
          <ModalHeader pb={2} px={4} display={'flex'} gap={10}>
            {userOptions.map((option, i) => (
              <Box key={i} onClick={() => setUserOptionIndex(i)}>
                <Box as="input" type="radio" className="nes-radio" checked={userOptionIndex == i} readOnly />
                <Text
                  as="span"
                  fontSize={18}
                  color={userOptionIndex == i ? 'black' : 'gray'}
                  borderBottom={userOptionIndex == i ? '2px solid black' : 'none'}
                >
                  {option.title}
                </Text>
              </Box>
            ))}
          </ModalHeader>
          <ModalBody>
            <>
              {userOptionIndex == 0 && (
                <>
                  <Box
                    as="label"
                    fontSize={40}
                    color="white"
                    zIndex={99}
                    position={'absolute'}
                    top={325}
                    right={10}
                    _hover={{ cursor: hoveredNesPointer }}
                  >
                    <BiImageAdd />
                    <Input hidden type="file" onChange={onChangeImageFile} accept={'.jpeg,.jpg,.png,.gif'} />
                  </Box>
                  <Box display={'flex'} flexDirection={'column'} gap={8}>
                    <Box pt={4}>
                      <Box>
                        <Box pb={4}>
                          <Text mb={1} fontSize={12} color="gray">
                            NFT Image
                          </Text>
                          <Box
                            className="nes-container is-dark is-rounded"
                            w={'100%'}
                            h={300}
                            display="flex"
                            flexDirection={'column'}
                            justifyContent={'center'}
                            alignItems="center"
                          >
                            {gacha.image !== '' ? (
                              <Image src={imageFile ? imageFileUrl : gacha.image} alt="gacha-logo" h="100%" />
                            ) : (
                              <Box as="label" className="nes-btn">
                                Upload File
                                <Input
                                  hidden
                                  type="file"
                                  onChange={onChangeImageFile}
                                  accept={'.jpeg,.jpg,.png,.gif'}
                                />
                              </Box>
                            )}
                          </Box>
                        </Box>
                        <Box pb={4}>
                          <Text mb={1} fontSize={12} color="gray">
                            Gacha Name
                          </Text>
                          <Input
                            type="text"
                            value={name}
                            placeholder="Name of Your Gacha Project"
                            className="nes-input"
                            onChange={handleNameChange}
                            px={2}
                            py={0}
                            fontSize={14}
                            color="black"
                            _focus={{ outline: 'none' }}
                          />
                        </Box>
                        <Box pb={4}>
                          <Text fontSize={12} pb={1} color="gray">
                            Description
                          </Text>
                          <Textarea
                            className="nes-input"
                            value={description}
                            placeholder="Description of Your Gacha Project"
                            onChange={handleDescriptionChange}
                            px={2}
                            py={0}
                            fontSize={14}
                            h={'80px'}
                            overflowWrap={'break-word'}
                            wordBreak="keep-all"
                            _focus={{ outline: 'none' }}
                          />
                        </Box>
                        <Box pb={4}>
                          <Text fontSize={12} pb={1} color="gray">
                            Slash Payment URL
                          </Text>
                          <Input
                            type="text"
                            value={slashLink}
                            placeholder="Paste Slash Payment URL"
                            className="nes-input"
                            onChange={handleSlashLinkChange}
                            px={2}
                            py={0}
                            fontSize={14}
                            _focus={{ outline: 'none' }}
                          />
                        </Box>
                        <Box pb={12}>
                          <Text fontSize={12} pb={1} color="gray">
                            Fee (USD)
                          </Text>
                          <Input
                            type="number"
                            value={fee}
                            placeholder="Gacha Fee"
                            className="nes-input"
                            onChange={handleFeeChange}
                            px={2}
                            py={0}
                            fontSize={14}
                            w={300}
                            _focus={{ outline: 'none' }}
                          />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </>
              )}
              {userOptionIndex == 1 && (
                <>
                  <Box display={'flex'} flexDirection={'column'} gap={8}>
                    <Box pt={2}>
                      <Box>
                        <Box
                          className="nes-container is-rounded with-title"
                          pb={'2px !important'}
                          mt={'26px !important'}
                          mb={'18px !important'}
                        >
                          <Text className="title">GachaPon</Text>
                          <Box pb={4}>
                            <Text mb={1} fontSize={12} color="gray">
                              Gacha Name
                            </Text>
                            <Text>{gacha.name}</Text>
                          </Box>
                          <Box pb={4}>
                            <HStack justify={'space-between'}>
                              <Box>
                                <Text fontSize={12} pb={1} color="gray">
                                  Address
                                </Text>
                                <Text>{`${process.env.NEXT_PUBLIC_NFT_CONTRACT?.slice(
                                  0,
                                  7
                                )}...${process.env.NEXT_PUBLIC_NFT_CONTRACT?.slice(-5)}`}</Text>
                              </Box>
                              <Box textAlign="right">
                                <Text fontSize={12} pb={1} color="gray">
                                  TokenId
                                </Text>
                                <Text>{gacha.id}</Text>
                              </Box>
                            </HStack>
                          </Box>
                        </Box>
                        <Box display={'flex'} justifyContent="center">
                          <TbArrowBigUpLines fontSize={40} />
                        </Box>
                        <Box
                          className="nes-container is-rounded with-title is-dark"
                          pb={'2px !important'}
                          mt={'18px !important'}
                          mb={'32px !important'}
                        >
                          <Text className="title">Capsule(NFT)</Text>
                          <Box pb={4}>
                            <Text mb={2} fontSize={12} color="white">
                              Collection
                            </Text>
                            <Box className="nes-select">
                              <Select
                                required
                                id="default_select"
                                bgColor={'white'}
                                color="black"
                                onChange={handleContractChange}
                              >
                                <option value="" disabled selected hidden>
                                  Choose Your Collection
                                </option>
                                {ownedCollections?.map((collection, i) => {
                                  return (
                                    <option key={i} value={`${collection.address}`}>
                                      {`${collection.name}(${collection.symbol}) x${collection.balance}`}
                                    </option>
                                  );
                                })}
                              </Select>
                            </Box>
                            <Text pt={6} pb={1} fontSize={12} color="white">
                              TokenId
                            </Text>
                            <Input
                              type="number"
                              placeholder="Enter token id of your NFT"
                              className="nes-input"
                              px={4}
                              py={4}
                              fontSize={14}
                              color="black"
                              _focus={{ outline: 'none' }}
                              onChange={handleTokenIdChange}
                            />
                            <HStack pt={6} justify={'center'} spacing={4}>
                              <Text fontSize={11}>You can check tokenId at </Text>
                              <Link href={'https://tofunft.com/'} target="_blank">
                                <Box display={'flex'} gap={2} pb={1}>
                                  <BsBoxArrowUpRight fontSize={16} />
                                  <Text fontSize={12} fontWeight="bold" textDecoration={'underline'}>
                                    TofuNFT
                                  </Text>
                                </Box>
                              </Link>
                            </HStack>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </>
              )}
            </>
          </ModalBody>

          <ModalFooter justifyContent={'space-between'} px={4}>
            {userOptionIndex == 0 && (
              <>
                <Button className="nes-btn" variant="ghost" w={220} onClick={onCancel}>
                  Cancel
                </Button>
                {isLoading ? (
                  <Button className="nes-btn is-warning" variant="ghost" w={220}>
                    Loading...
                  </Button>
                ) : (
                  <Button className="nes-btn is-primary" variant="ghost" w={220} onClick={onUpdate}>
                    Update
                  </Button>
                )}
              </>
            )}
            {userOptionIndex == 1 && (
              <>
                <Button className="nes-btn" variant="ghost" w={220} onClick={onCancel}>
                  Cancel
                </Button>
                {isLoading ? (
                  <Button className="nes-btn is-warning" variant="ghost" w={220}>
                    Loading...
                  </Button>
                ) : (
                  <Button className="nes-btn is-primary" variant="ghost" w={220} onClick={onTransfer}>
                    Transfer
                  </Button>
                )}
              </>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
