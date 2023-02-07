import { Box, CloseButton, FormLabel, Input, Image, Text, VStack, AspectRatio } from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type Props = {
  labelText: string;
  url?: string;
  onClear: () => void;
  inputId: string;
  onChange: (e: ChangeEvent<{ value: unknown }>) => void;
  acceptType?: string;
  opt?: UseFormRegisterReturn;
};

export const FilePreviewer: React.FC<Props> = ({ labelText, url, onClear, inputId, onChange, acceptType, opt }) => {
  return (
    <AspectRatio maxW={480} ratio={1} position={'relative'} bg="black">
      <Box>
        {url && (
          <>
            <CloseButton onClick={onClear} position={'absolute'} right={2} top={2} zIndex={3} color="white" />
            <Box
              w={'85%'}
              h={'85%'}
              position={'absolute'}
              top={'50%'}
              left={'50%'}
              transform={'translate(-50%, -50%)'}
              rounded={30}
              zIndex={1}
              _hover={{ zIndex: 0 }}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Image src={url} alt="selectedFile" maxH="100%" maxW="100%" />
            </Box>
          </>
        )}

        {!url && (
          <Box position={'absolute'} top={'50%'} left={'50%'} transform={'translate(-50%, -60%)'} w={'100%'}>
            <VStack gap={2}>
              <Text color={'white'} fontSize={'sm'} textAlign={'center'}>
                {labelText}
                <br />
                Max 1.5GB
              </Text>
              <FormLabel
                display={'flex'}
                htmlFor={inputId}
                w={'80%'}
                h={'48px'}
                zIndex={1}
                borderRadius={5}
                alignItems={'center'}
                justifyContent={'center'}
                bgColor={'white'}
                _hover={{ bgColor: 'gray.200' }}
                fontWeight={'bold'}
                cursor="pointer"
                {...opt}
              >
                Choose File
                <Input hidden id={inputId} type="file" {...opt} onChange={onChange} accept={acceptType} />
              </FormLabel>
            </VStack>
          </Box>
        )}
      </Box>
    </AspectRatio>
  );
};
