import { RefObject } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';
import { nftAbi } from './const';
import { NFTMetadata, UploadMetadata } from '../types';
import Web3 from 'web3';
import { Blob, File, NFTStorage } from 'nft.storage';

type DOMRectProperty = keyof Omit<DOMRect, 'toJSON'>;

export const getElementProperty = <T extends HTMLElement>(
  elementRef: RefObject<T>,
  property: DOMRectProperty
): number => {
  const clientRect = elementRef.current?.getBoundingClientRect();
  if (clientRect) return clientRect[property];
  return 0;
};

export const sliceNftsByCount = (arr: NFTMetadata[], count: number) => {
  const sliceNum = Math.ceil(arr.length / count);
  const slicedNfts = new Array(sliceNum).fill('', 0).map((_, i) => arr.slice(i * count, (i + 1) * count));
  return { sliceNum, slicedNfts };
};

export const uploadMetadata = async (data: UploadMetadata) => {
  if (!process.env.NEXT_PUBLIC_NFT_STORAGE_KEY) {
    console.log('invalid env setting');
    return;
  }
  const client = new NFTStorage({ token: process.env.NEXT_PUBLIC_NFT_STORAGE_KEY });
  const metadata = JSON.stringify(data);
  const metaDataBlob = new Blob([metadata]);

  let cid;
  try {
    cid = await client.storeBlob(metaDataBlob);
  } catch (err: any) {
    throw new Error(err);
  }
  return `https://nftstorage.link/ipfs/${cid}`;
};

export const uploadImage = async (imageFile: File) => {
  if (!process.env.NEXT_PUBLIC_NFT_STORAGE_KEY) {
    console.log('invalid env setting');
    return;
  }
  const client = new NFTStorage({ token: process.env.NEXT_PUBLIC_NFT_STORAGE_KEY });
  const thumbnailblob = new Blob([imageFile]);

  let cid;
  try {
    cid = await client.storeBlob(thumbnailblob);
  } catch (err: any) {
    throw new Error(err);
  }

  return `https://nftstorage.link/ipfs/${cid}`;
};

// export const getAllNftsByAddress = async (address: string, chain: string) => {
//   let cursor = null;
//   const nfts: any[] = [];
//   do {
//     let url = `https://deep-index.moralis.io/api/v2/${address}/nft?chain=${chain}&format=decimal`;
//     if (cursor) url = url + '&cursor=' + cursor;
//     const headers = {
//       accept: 'application/json',
//       'X-API-Key': process.env.NEXT_PUBLIC_MORALIS_API_KEY,
//     };
//     const res = await axios.get(url, { headers });
//     const data = res.data;
//     if (data.result && data.result.length) {
//       nfts.push(...data.result);
//     }
//     cursor = data.cursor;
//   } while (cursor != '' && cursor != null);
//   return nfts;
// };

// export const getTokenInfoByAddress = async (address: string) => {
//   const nfts: NFTMetadata[] = [];
//   const provider = new ethers.providers.JsonRpcProvider(`https://astar.public.blastapi.io`);
//   const tokenApiUrl = `https://blockscout.com/astar/api?module=account&action=tokenlist&address=${address}`;
//   const headers = {
//     accept: 'application/json',
//   };
//   const {
//     data: { result },
//   } = await axios.get(tokenApiUrl, { headers });
//   for (const nft of result.filter((n: FetchedNFT) => n.type == 'ERC-721')) {
//     const nftContract = new ethers.Contract(nft.contractAddress, nftAbi, provider);
//     const tokenIds = await getTokenIds(address, nft.contractAddress);
//     for (const id of tokenIds) {
//       try {
//         const { data: metadata } = await axios.get(await nftContract.tokenURI(id));
//         nfts.push({
//           address: nft.contractAddress,
//           id,
//           name: metadata.name,
//           description: metadata.description,
//           image: metadata.image,
//         });
//       } catch {}
//     }
//   }
//   console.log(nfts);
//   return nfts;
// };

// export const getTokenIds = async (address: string, nftContract: string) => {
//   const tokenIds = new Set<number>();
//   const logApiUrl = `https://blockscout.com/astar/api?module=account&action=tokentx&address=${address}&contractaddress=${nftContract}`;
//   const headers = {
//     accept: 'application/json',
//   };
//   const {
//     data: { result },
//   } = await axios.get(logApiUrl, { headers });
//   for (const log of result) {
//     const { from, to, tokenID } = log;
//     if (to.toLowerCase() === address.toLowerCase()) {
//       tokenIds.add(Number(tokenID));
//     } else if (from.toLowerCase() === address.toLowerCase()) {
//       tokenIds.delete(Number(tokenID));
//     }
//   }
//   return Array.from(tokenIds);
// };
