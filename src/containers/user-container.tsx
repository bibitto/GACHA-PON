import { useState, useEffect, useCallback } from 'react';
import { createContainer } from 'unstated-next';
import { ethers, Signer } from 'ethers';
// import { getAllNftsByAddressForAstar } from '../utils/helper';
import { useRouter } from 'next/router';

declare global {
  interface Window {
    ethereum: any;
  }
}

const useUser = () => {
  const [userAddress, setUserAddress] = useState<string>();
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
  const [signer, setSigner] = useState<Signer>();

  const router = useRouter();

  const connectWallet = async () => {
    if (!process.env.NEXT_PUBLIC_CHAIN_ID) {
      throw new Error('please set env variables');
    }
    try {
      const { ethereum } = window;
      if (!ethereum) {
        throw new Error('Please install MetaMask!');
      } else {
        console.log('MetaMask is installed!', ethereum);
      }

      const provider = new ethers.providers.Web3Provider(ethereum as any);
      const accounts = await provider.send('eth_requestAccounts', []);
      setProvider(provider);
      setUserAddress(accounts[0]);

      const signer = provider.getSigner();
      setSigner(signer);
      const connectedChainId = await signer.getChainId();
      const properChainId = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID);
      if (connectedChainId !== properChainId) {
        await provider.send('wallet_switchEthereumChain', [{ chainId: ethers.utils.hexValue(properChainId) }]);
      }
    } catch (e: any) {
      if (e.code === 4001) {
        console.log('the sign was rejected');
        console.log(e);
        disconnectWallet();
      } else if (e.code === 4902) {
        console.log('astart network does not exist in MetaMask');
        const { ethereum } = window;
        const provider = new ethers.providers.Web3Provider(ethereum as any);
        try {
          await provider.send('wallet_addEthereumChain', [
            {
              chainId: '0x250',
              chainName: 'Astart Network',
              nativeCurrency: {
                name: 'Astar',
                symbol: 'ASTR',
                decimals: 18,
              },
              rpcUrls: [
                'https://evm.astar.network',
                'https://astar.public.blastapi.io',
                'https://astar-rpc.dwellir.com',
              ],
              blockExplorerUrls: ['https://astar.subscan.io/'],
            },
          ]);
        } catch (e: any) {
          if (e.code === 4001) {
            console.log('the sign was rejected');
            console.log(e);
          } else {
            console.log(e);
          }
          disconnectWallet();
        }
      } else {
        console.log(e);
        disconnectWallet();
      }
    }
  };

  const disconnectWallet = async () => {
    setUserAddress(undefined);
    setProvider(undefined);
    setSigner(undefined);
  };

  // const fetchOwnedNfts = useCallback(async () => {
  //   if (!userAddress || !provider) return;
  //   const nfts = await getAllNftsByAddressForAstar(userAddress, provider);
  //   setOwnedNfts(nfts);
  // }, [userAddress, provider]);

  useEffect(() => {
    if (!provider) {
      router.push('/');
    } else {
      // fetchOwnedNfts();
    }
  }, [provider]);

  return {
    userAddress,
    provider,
    signer,
    connectWallet,
    disconnectWallet,
    // fetchOwnedNfts,
  };
};

export const UserContainer = createContainer(useUser);
