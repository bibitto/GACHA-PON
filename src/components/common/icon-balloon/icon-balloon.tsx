import { HStack, Box } from '@chakra-ui/react';
import { FC } from 'react';

type Props = {
  text: string;
  icon: string;
  side: string;
  space: number;
  width: number;
};

export const IconBolloon: FC<Props> = ({ text, icon, side, space, width }) => {
  return (
    <HStack spacing={5} alignItems="start">
      <i className={`nes-${icon}`} style={{ marginTop: space }}></i>
      <Box className={`nes-balloon from-${side}`} w={width}>
        {text}
      </Box>
    </HStack>
  );
};
