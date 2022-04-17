import { Contract } from "@ethersproject/contracts";
import { ethers } from "ethers";

// Addresses

// ABI
import erc20Abi from "config/abi/erc20.json";
import fixedRateRegistryAbi from "config/abi/fixedRateRegistry.json";
import floatingRateRegistryAbi from "config/abi/floatingRateRegistry.json";
import lpAbi from "config/abi/lp.json";
import multicallAbi from "config/abi/multicall.json";
import {
  getFixedRateRegistryAddress,
  getFloatingRateRegistryAddress,
  getMulticallAddress,
} from "utils/addressHelpers";
import { getProvider } from "web3";

const getContract = (
  chainId: number,
  abi: any,
  address: string,
  signer?: ethers.Signer | ethers.providers.Provider
) => {
  const signerOrProvider = signer ?? getProvider(chainId);
  return new Contract(address, abi, signerOrProvider);
};

export const getErc20Contract = (
  chainId: number,
  address: string,
  signer?: ethers.Signer | ethers.providers.Provider
) => {
  return getContract(chainId, erc20Abi, address, signer);
};

export const getLpContract = (
  chainId: number,
  address: string,
  signer?: ethers.Signer | ethers.providers.Provider
) => {
  return getContract(chainId, lpAbi, address, signer);
};

export const getMulticallContract = (
  chainId: number,
  signer?: ethers.Signer | ethers.providers.Provider
) => {
  return getContract(
    chainId,
    multicallAbi,
    getMulticallAddress(chainId),
    signer
  );
};

export const getFloatingRateRegistryContract = (
  chainId: number,
  signer?: ethers.Signer | ethers.providers.Provider
) => {
  return getContract(
    chainId,
    floatingRateRegistryAbi,
    getFloatingRateRegistryAddress(chainId),
    signer
  );
};

export const getFixedRateRegistryContract = (
  chainId: number,
  signer?: ethers.Signer | ethers.providers.Provider
) => {
  return getContract(
    chainId,
    fixedRateRegistryAbi,
    getFixedRateRegistryAddress(chainId),
    signer
  );
};