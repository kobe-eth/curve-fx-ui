// Network chain ids
export const CHAIN_ID = {
  POLYGON: 137,
};

// Network labels
export const NETWORK_LABEL = {
  [CHAIN_ID.POLYGON]: "BNB Chain",
};

// Network RPC nodes
export const NETWORK_RPC = {
  [CHAIN_ID.POLYGON]: [process.env.NEXT_PUBLIC_BNB_MAINNET],
};

// Network block explorers
export const BLOCK_EXPLORER = {
  [CHAIN_ID.POLYGON]: "https://polygonscan.com",
};

export const CHAIN_PARAMS = {
  [CHAIN_ID.POLYGON]: {
    chainId: "0x89",
    chainName: "Polygon",
    nativeCurrency: {
      name: "matic",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: NETWORK_RPC[CHAIN_ID.POLYGON],
    blockExplorerUrls: [BLOCK_EXPLORER[CHAIN_ID.POLYGON]],
  },
};
