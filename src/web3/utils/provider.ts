import { ethers } from "ethers";

import { CHAIN_ID } from "web3/config";

import getRpc from "./rpc";

const DEFAULT_RPC_URL = getRpc(CHAIN_ID.POLYGON);

export const simpleRpcProvider = new ethers.providers.JsonRpcProvider(
  DEFAULT_RPC_URL,
  CHAIN_ID.POLYGON
);

export const getStaticProvider = (chainId: number) => {
  switch (chainId) {
    case CHAIN_ID.POLYGON:
      return simpleRpcProvider;
  }
};

const activeWeb3Instance = {};

const getProvider = (chainId: number) => {
  if (!activeWeb3Instance[chainId]) {
    const RPC_URL = getRpc(chainId);
    activeWeb3Instance[chainId] = new ethers.providers.JsonRpcProvider(
      RPC_URL,
      chainId
    );
  }
  return activeWeb3Instance[chainId];
};

export default getProvider;
