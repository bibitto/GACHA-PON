import { HStack, Box, VStack } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

type Props = {
  text: string;
  icon: string;
  side: string;
  space: number | string;
  width: number | string;
  subIcon?: ReactNode;
};

export const IconBolloon: FC<Props> = ({ text, icon, side, space, width, subIcon }) => {
  return (
    <HStack spacing={5} alignItems="start">
      {side === 'left' && (
        <VStack mt={space}>
          {subIcon}
          <i className={`nes-${icon}`}></i>
        </VStack>
      )}
      <Box className={`nes-balloon from-${side}`} w={width}>
        {text}
      </Box>
      {side === 'right' && (
        <VStack pt={space}>
          {subIcon}
          <i className={`nes-${icon}`}></i>
        </VStack>
      )}
    </HStack>
  );
};
