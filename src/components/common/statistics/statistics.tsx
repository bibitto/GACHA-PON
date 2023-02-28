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
      className="nes-container"
      px={{ base: 2, md: 4 }}
      py={'5'}
      shadow={'xl'}
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
        <StatsCard title={'Community'} stat={'1,204'} unit={''} icon={<i className="nes-pokeball"></i>} />
        <StatsCard title={'Total Cupsule'} stat={'29'} unit={''} icon={<i className="nes-pokeball"></i>} />
        <StatsCard title={'TradingVolume'} stat={'7'} unit={'jpy'} icon={<i className="nes-pokeball"></i>} />
        <StatsCard title={'Community'} stat={'1,204'} unit={''} icon={<BsPerson size={'3em'} />} />
        <StatsCard title={'TotalStaked'} stat={'29'} unit={''} icon={<BsCardImage size={'3em'} />} />
        <StatsCard title={'TradingVolume'} stat={'7'} unit={'jpy'} icon={<AiOutlineBarChart size={'3em'} />} />
      </SimpleGrid>
    </Box>
  );
};
