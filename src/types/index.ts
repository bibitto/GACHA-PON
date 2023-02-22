import { ReactNode } from 'react';

export type StatsCardProps = {
  title: string;
  stat: string;
  unit: string;
  icon: ReactNode;
};

export type NFTMetadata = {
  address: string;
  id: number;
  name: string;
  description: string;
  image: string;
};

export type UploadMetadata = {
  name: string;
  description: string;
  image: string;
  external_url: string;
};

// export type FetchedNFT = {
//   balance: string;
//   contractAddress: string;
//   decimals: string;
//   name: string;
//   symbol: string;
//   type: string;
// };

export type Gacha = {
  id: number;
  name: string;
  description: string;
  image: string;
  slashLink: string;
  fee: number;
  rootOwner: string;
  isOpened: boolean;
};

export type Collection = {
  address: string;
  name: string;
  symbol: string;
  balance: string;
};
