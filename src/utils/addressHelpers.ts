import contracts from "config/contracts";

export const getAddress = (address, chainId: number): string => {
  return contracts[chainId] ? address[chainId] : address[137];
};

export const getMulticallAddress = (chainId: number) => {
  return getAddress(contracts.multicall, chainId);
};

export const getSynthereumFinderAddress = (chainId: number) => {
  return getAddress(contracts.synthereumFinder, chainId);
};
