import { useState, useEffect, useCallback } from 'react';
import { createContainer } from 'unstated-next';
import { BigNumber, ethers, Signer } from 'ethers';
// import { getAllNftsByAddressForAstar } from '../utils/helper';
import { Gacha, NFTMetadata, Collection } from '../types';
import { useRouter } from 'next/router';
import axios from 'axios';
import data from '../utils/abi/GachaPon.json';
import { UserContainer } from './user-container';

declare global {
  interface Window {
    ethereum: any;
  }
}

const useDataStore = () => {
  const [allGachas, setAllGachas] = useState<Gacha[]>([]);
  const [marketGachas, setMarketGachas] = useState<Gacha[]>([]);
  const [ownedOpenedGachas, setOwnedOpenedGachas] = useState<Gacha[]>([]);
  const [ownedClosedGachas, setOwnedClosedGachas] = useState<Gacha[]>([]);
  const [ownedCollections, setOwnedCollections] = useState<Collection[]>();
  // const [ownedNfts, setOwnedNfts] = useState<NFTMetadata[]>();
  const { userAddress } = UserContainer.useContainer();

  const fetchGachaDatas = async () => {
    try {
      if (!process.env.NEXT_PUBLIC_NFT_CONTRACT || !process.env.NEXT_PUBLIC_PROVIDER_URL) {
        throw new Error('invalid env setting');
      }
      const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_PROVIDER_URL);
      const gachaPon = new ethers.Contract(process.env.NEXT_PUBLIC_NFT_CONTRACT, data.abi, provider);
      const fetchedGachas = await gachaPon.getAllGachaBoxDatas();
      const gachas: Gacha[] = [];
      for (let i = 0; i < fetchedGachas.length; i++) {
        const metadata = (await axios.get(fetchedGachas[i].uri).catch(() => undefined))?.data;
        if (metadata) {
          gachas.push({
            id: BigNumber.from(fetchedGachas[i].id._hex).toNumber(),
            name: metadata.name,
            description: metadata.description,
            image: metadata.image,
            slashLink: metadata.external_url,
            fee: BigNumber.from(fetchedGachas[i].fee._hex).toNumber(),
            rootOwner: fetchedGachas[i].rootOwner,
            isOpened: fetchedGachas[i].isOpened,
          });
        }
      }
      setAllGachas(gachas);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchCollectionDatas = async () => {
    try {
      const url = `https://blockscout.com/astar/api?module=account&action=tokenlist&address=${userAddress}`;
      const fetchedCollections = (await axios.get(url).catch(() => undefined))?.data.result.filter(
        (token: any) => token.type == 'ERC-721'
      );
      const collections: Collection[] = [];
      for (const elem of fetchedCollections) {
        collections.push({
          address: elem.contractAddress,
          name: elem.name,
          symbol: elem.symbol,
          balance: elem.balance,
        });
      }
      setOwnedCollections(collections);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchGachaDatas();
  }, []);

  useEffect(() => {
    if (allGachas) {
      const marketOpendGachas = allGachas.filter((g: Gacha) => g.isOpened === true);
      setMarketGachas(marketOpendGachas);
    }
  }, [allGachas]);

  useEffect(() => {
    if (userAddress && allGachas) {
      const ownedGachas = allGachas.filter((g: Gacha) => g.rootOwner.toLowerCase() == userAddress);
      setOwnedOpenedGachas(ownedGachas.filter((g: Gacha) => g.isOpened === true));
      setOwnedClosedGachas(ownedGachas.filter((g: Gacha) => g.isOpened === false));
      fetchCollectionDatas();
    }
  }, [userAddress, allGachas]);

  return {
    marketGachas,
    allGachas,
    ownedOpenedGachas,
    ownedClosedGachas,
    ownedCollections,
  };
};

export const DataContainer = createContainer(useDataStore);
