import {
  Box,
  chakra,
  Flex,
  SimpleGrid,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from '@chakra-ui/react';
import { BsPerson } from 'react-icons/bs';
import { BsCardImage } from 'react-icons/bs';
import { AiOutlineBarChart } from 'react-icons/ai';
import { StatsCardProps } from '../../../types';

const StatsCard = (props: StatsCardProps) => {
  const { title, stat, unit, icon } = props;
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={'5'}
      shadow={'xl'}
      border={'1px solid'}
      borderColor={useColorModeValue('gray.800', 'gray.500')}
      rounded={'lg'}
    >
      <Flex justifyContent={'space-between'}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={'medium'} isTruncated>
            {title}
          </StatLabel>
          <Flex alignItems={'end'} gap={2}>
            <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
              {stat}
            </StatNumber>
            <StatLabel fontWeight={'medium'} isTruncated>
              {unit}
            </StatLabel>
          </Flex>
        </Box>
        <Box my={'auto'} color={useColorModeValue('gray.800', 'gray.200')} alignContent={'center'}>
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
};

export const Statistics = () => {
  return (
    <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard title={'Community'} stat={'1,204'} unit={'人'} icon={<BsPerson size={'3em'} />} />
        <StatsCard title={'ArtWork'} stat={'29'} unit={'個'} icon={<BsCardImage size={'3em'} />} />
        <StatsCard title={'TradingVolume'} stat={'7'} unit={'＄'} icon={<AiOutlineBarChart size={'3em'} />} />
      </SimpleGrid>
    </Box>
  );
};
